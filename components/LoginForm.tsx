"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail } from "lucide-react";
import { signIn } from "next-auth/react";
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
import { loginFormSchema } from "@/lib/schema";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (res?.error) {
        toast({
          description: "Wrong email or password",
          action: (
            <ToastAction altText="Try again" onClick={() => form.reset()}>
              Try again
            </ToastAction>
          ),
        });
        setLoading(false);
        return;
      }

      toast({ description: "Login successful" });
      router.push("/");
      router.refresh();
    } catch (error) {
      toast({ description: "Network error. Please try again." });
      console.error(error);
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
                    placeholder="E.g. alex@gmail.com"
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
                    placeholder="Enter Your Password"
                    className="pl-9 text-base text-charcoal active:outline-violet md:text-lg"
                    autoComplete="current-password"
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
            "Login"
          )}
        </Button>

        <div className="mx-auto flex flex-col items-center self-stretch md:flex-row">
          <p className="text-base font-normal text-gray">
            Don&apos;t have an account?
          </p>
          <Link
            href="/auth/signup"
            className="text-base font-normal text-violet md:ml-0.5"
          >
            Create account
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
