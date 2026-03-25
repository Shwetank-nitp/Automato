"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import google_icon from "@/public/images/google.svg";
import github_icon from "@/public/images/github.svg";

const loginFormSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z
    .string()
    .min(6, "Password length must have at least 6 characters")
    .max(15, "Please password of less than 15 characters"),
});

type FormSchema = z.infer<typeof loginFormSchema>;

export function LoginForm() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();

  const isPending = form.formState.isSubmitting;

  async function submitHandler(data: FormSchema) {
    await authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
        callbackURL: "/",
      },
      {
        onSuccess: () => {
          router.push("/");
        },

        onError: ({ error }) => {
          toast.error(error.message);
        },
      }
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Welcome Back</CardTitle>
          <CardDescription>Login To Continue</CardDescription>
        </CardHeader>

        <CardContent>
          <form id="form-rhf-login" onSubmit={form.handleSubmit(submitHandler)}>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <Button
                  variant={"outline"}
                  type="button"
                  className="w-full"
                  disabled={isPending}
                >
                  <Image
                    src={github_icon}
                    alt="github"
                    width={25}
                    height={25}
                  />
                  &nbsp;Continue with Github
                </Button>
                <Button
                  variant={"outline"}
                  type="button"
                  className="w-full"
                  disabled={isPending}
                >
                  <Image
                    src={google_icon}
                    alt="google"
                    width={25}
                    height={25}
                  />
                  &nbsp;Continue with Google
                </Button>
              </div>

              <FieldGroup>
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-input-email">
                        Email
                      </FieldLabel>
                      <Input
                        {...field}
                        id="form-rhf-input-email"
                        aria-invalid={fieldState.invalid}
                        placeholder="user@mail.com"
                      />
                      {fieldState.invalid && (
                        <FieldError>{fieldState.error?.message}</FieldError>
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>

              <FieldGroup>
                <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-input-password">
                        Password
                      </FieldLabel>
                      <Input
                        {...field}
                        id="form-rhf-input-password"
                        type="password"
                        aria-invalid={fieldState.invalid}
                        placeholder="********"
                      />
                      {fieldState.invalid && (
                        <FieldError>{fieldState.error?.message}</FieldError>
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>

              <Button className="w-full" type="submit" disabled={isPending}>
                Login
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <span>
            Register a new account?&ensp;
            <Link
              href={"/signup"}
              className="text-blue-600 hover:underline hover:cursor-pointer"
            >
              Click Here
            </Link>
          </span>
        </CardFooter>
      </Card>
    </div>
  );
}
