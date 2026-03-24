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
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const SignupFormSchema = z
  .object({
    email: z.string().email("Please enter a valid email"),
    password: z
      .string()
      .min(6, "Password length must have at least 6 characters")
      .max(15, "Please enter a password of less than 15 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password length must have at least 6 characters")
      .max(15, "Please enter a password of less than 15 characters"),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "Confirm password should match the password",
    path: ["confirmPassword"],
  });

type FormSchemaType = z.infer<typeof SignupFormSchema>;

export default function SignUpForm() {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const router = useRouter();

  const isPending = form.formState.isSubmitting;

  async function submitHandler(formData: FormSchemaType) {
    try {
      // make a signup request
      await authClient.signUp.email(
        {
          name: formData.email,
          email: formData.email,
          password: formData.password,

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
    } catch (error) {
      form.setError("root", {
        message: "Something went wrong, please try again",
      });
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Create an Account</CardTitle>
          <CardDescription>Sign up to get started</CardDescription>
        </CardHeader>

        <CardContent>
          <form
            id="form-rhf-signup"
            onSubmit={form.handleSubmit(submitHandler)}
          >
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <Button
                  variant={"outline"}
                  type="button"
                  className="w-full"
                  disabled={isPending}
                >
                  Continue with Github
                </Button>
                <Button
                  variant={"outline"}
                  type="button"
                  className="w-full"
                  disabled={isPending}
                >
                  Continue with Google
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

              <FieldGroup>
                <Controller
                  name="confirmPassword"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-input-cnf-password">
                        Confirm Password
                      </FieldLabel>
                      <Input
                        {...field}
                        id="form-rhf-input-cnf-password"
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
                Sign Up
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <span>
            Already have an account?&ensp;
            <Link
              href={"/login"}
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
