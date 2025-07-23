"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ColorRing } from "react-loader-spinner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { signupFormSchema } from "@/lib/schema";

const SignupForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: z.infer<typeof signupFormSchema>) => {
    setLoading(true);
    try {
      // Check if user exists
      const resUserExists = await fetch("/api/userExists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: values.email }),
      });
      const { user } = await resUserExists.json();

      if (user) {
        toast({
          description:
            "Email is already in use! Please login or use another email address.",
          action: (
            <ToastAction
              altText="Go to login page"
              onClick={() => router.push("/auth/login")}
            >
              Log in
            </ToastAction>
          ),
        });
        setLoading(false);
        return;
      }

      // Register user
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      if (res.ok) {
        toast({ description: "Sign up successful!" });
        form.reset();
        router.push("/auth/login");
      } else {
        toast({
          description: "An error occurred, please try again.",
          action: (
            <ToastAction
              altText="Refresh page"
              onClick={() => router.refresh()}
            >
              Refresh
            </ToastAction>
          ),
        });
      }
    } catch (error) {
      toast({ description: "Network error. Please try again." });
      console.error("Error during registration: ", error);
    }
    setLoading(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col items-start gap-6 self-stretch"
        autoComplete="off"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full md:w-96">
              <FormLabel className="text-xs font-normal text-charcoal md:text-sm">
                Email address
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Mail
                    width="20px"
                    height="20px"
                    className="absolute left-3 top-2 text-gray"
                  />
                  <Input
                    type="email"
                    placeholder="e.g. alex@gmail.com"
                    className="pl-9 text-base text-charcoal active:outline-violet md:text-lg"
                    autoComplete="email"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full md:w-96">
              <FormLabel className="text-xs font-normal text-charcoal md:text-sm">
                Password
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Lock
                    width="20px"
                    height="20px"
                    className="absolute left-3 top-2 text-gray"
                  />
                  <Input
                    type="password"
                    placeholder="At least 8 characters"
                    className="pl-9 text-base text-charcoal active:outline-violet md:text-lg"
                    autoComplete="new-password"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="w-full md:w-96">
              <FormLabel className="text-xs font-normal text-charcoal md:text-sm">
                Confirm Password
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Lock
                    width="20px"
                    height="20px"
                    className="absolute left-3 top-2 text-gray"
                  />
                  <Input
                    type="password"
                    placeholder="Repeat password"
                    className="pl-9 text-base text-charcoal active:outline-violet md:text-lg"
                    autoComplete="new-password"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="h-11 w-full rounded-lg bg-violet font-semibold text-white hover:bg-mauve"
          disabled={loading}
        >
          {loading ? (
            <ColorRing
              visible={true}
              height="30"
              width="30"
              ariaLabel="color-ring-loading"
              wrapperClass="color-ring-wrapper"
              colors={["#737373", "#737373", "#737373", "#737373", "#737373"]}
            />
          ) : (
            "Create an account"
          )}
        </Button>

        <div className="mx-auto flex flex-col items-center self-stretch md:flex-row">
          <p className="text-base font-normal text-gray">
            Already have an account?
          </p>
          <Link
            href="/auth/login"
            className="text-base font-normal text-violet md:ml-0.5"
          >
            Login
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default SignupForm;
