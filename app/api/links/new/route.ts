import { NextRequest, NextResponse } from "next/server";
import validator from "validator";

import { connectToDB } from "@/lib/database";
import User from "@/models/user";
import Link from "@/models/link";

export async function POST(request: NextRequest) {
  await connectToDB();

  const {
    userID,
    links,
    linksToRemove,
  }: {
    userID: string;
    links: { platform: string; link: string }[];
    linksToRemove: string[];
  } = await request.json();

  // Validate links
  for (const link of links) {
    if (!link.platform || !link.link) {
      return NextResponse.json(
        { message: "Platform and link are required." },
        { status: 400 },
      );
    }
    if (!validator.isURL(link.link)) {
      return NextResponse.json(
        { message: `Invalid URL: ${link.link}` },
        { status: 400 },
      );
    }
  }

  try {
    if (linksToRemove && linksToRemove.length > 0) {
      await Link.deleteMany({ _id: { $in: linksToRemove }, creator: userID });
    }

    const updatedLinks = await Promise.all(
      links.map(async (link) => {
        const updatedLink = await Link.findOneAndUpdate(
          { creator: userID, platform: link.platform },
          { $set: { link: link.link } },
          { new: true, upsert: true, setDefaultsOnInsert: true },
        );

        await User.findByIdAndUpdate(userID, {
          $addToSet: { links: updatedLink._id },
        });

        return updatedLink;
      }),
    );

    return NextResponse.json(updatedLinks);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
