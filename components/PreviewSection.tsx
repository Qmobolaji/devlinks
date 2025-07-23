"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { MoveRight } from "lucide-react";

import { Button } from "./ui/button";

import OuterPhoneRectangle from "@/public/assets/OuterPhoneRectangle.svg";
import InnerPhoneRectangle from "@/public/assets/InnerPhoneRectangle.svg";
import ProfilePicPlaceholder from "@/public/assets/ProfilePicPlaceholder.jpg";
import NamePlaceholder from "@/public/assets/NamePlaceholder.svg";
import EmailPlaceholder from "@/public/assets/EmailPlaceholder.svg";
import LinkPlaceholder from "@/public/assets/LinkPlaceholder.svg";

interface LinkType {
  _id: string;
  platform: string;
  link: string;
  createdAt: string;
  updatedAt: string;
}

interface UserType {
  _id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  profilePicture?: string;
}

const PreviewSection = () => {
  const { data: session } = useSession();

  const [userData, setUserData] = useState<UserType | null>(null);
  const [links, setLinks] = useState<LinkType[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (session?.user.id) {
        try {
          const userResponse = await fetch("/api/user", {
            method: "POST",
            body: JSON.stringify({ ID: session.user.id }),
          });

          if (!userResponse.ok) {
            throw new Error("Failed to fetch user data");
          }
          const userData: UserType = await userResponse.json();
          setUserData(userData);

          // Fetch link details for each link ID
          const linksResponse = await fetch(`/api/links/${session.user.id}`);
          if (!linksResponse.ok) {
            throw new Error("Failed to fetch links");
          }
          const linksData: LinkType[] = await linksResponse.json();
          setLinks(linksData);
        } catch (err: any) {
          console.error(err);
        }
      }
    };

    fetchUserData();
  }, [session?.user.id]);

  return (
    <section className="my-4 rounded-xl bg-white p-4 sm:p-2">
      <div className="relative max-w-sm">
        <Image src={OuterPhoneRectangle} alt="phone case" className="w-full" />
        <Image
          src={InnerPhoneRectangle}
          alt="phone case"
          className="absolute left-[3%] top-[3%] h-[94%] w-[94%]"
        />
        <Image
          src={userData?.profilePicture || ProfilePicPlaceholder}
          alt="profile pic"
          priority
          className="absolute left-1/4 top-[15%] h-auto w-1/2 rounded-full object-cover"
          width={192}
          height={192}
        />
        <div className="absolute left-[20%] top-[40%] w-2/3 text-center text-black">
          {userData?.firstName && userData?.lastName ? (
            <h2 className="text-lg font-bold">
              {userData.firstName} {userData.lastName}
            </h2>
          ) : (
            <Image src={NamePlaceholder} alt="name placeholder" />
          )}
        </div>
        <div className="absolute left-1/4 top-[45%] w-1/2 text-center text-black">
          {userData?.email ? (
            <p className="text-gray-500 text-sm">{userData.email}</p>
          ) : (
            <Image src={EmailPlaceholder} alt="email placeholder" />
          )}
        </div>

        <div className="absolute left-2 top-1/2 flex w-full flex-col items-center gap-y-3">
          {Array.from({ length: 5 }).map((_, index) => {
            if (index < links.length) {
              const link = links[index];
              return (
                <Button
                  className="flex w-3/4 items-center justify-between bg-[#8A1A50] px-4"
                  key={link._id}
                >
                  <Link
                    href={link.link}
                    className="text-center capitalize text-white"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.platform}
                  </Link>
                  <MoveRight />
                </Button>
              );
            } else {
              return (
                <Image
                  key={index}
                  src={LinkPlaceholder}
                  alt="link placeholder"
                  className="h-auto w-3/4"
                />
              );
            }
          })}
        </div>
      </div>
    </section>
  );
};

export default PreviewSection;
