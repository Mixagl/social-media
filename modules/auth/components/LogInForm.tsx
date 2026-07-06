"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
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
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export default function LogInForm() {
  const logInSchema = z.object({
    email: z.email(),
    password: z.string().min(8, "Password must be at least 8 characters."),
  });

  type logInSchemaType = z.infer<typeof logInSchema>;

  const form = useForm<logInSchemaType>({
    resolver: zodResolver(logInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: logInSchemaType) {
    const { error } = await authClient.signIn.email({
      email: data.email,
      password: data.password,
    });
    if (error) {
      toast.error(error.message, { position: "top-center" });
    } else {
      toast.success("Success", { position: "top-center" });
      window.location.href = "/";
    }
  }
  return (
    <Card className="w-full max-w-105 mx-auto p-10 border-0 shadow-none bg-background antialiased">
      <CardHeader className="text-center p-0 pb-8">
        <CardTitle className="text-[24px] font-semibold tracking-tight text-foreground/90">
          Log in
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <form id="signup-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="space-y-5">
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className="flex flex-col gap-2"
                >
                  <FieldLabel
                    htmlFor="email"
                    className="text-[14px] font-normal tracking-tight text-muted-foreground pl-0.5"
                  >
                    Email
                  </FieldLabel>
                  <Input
                    {...field}
                    id="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your email"
                    autoComplete="off"
                    className="h-11 px-4 rounded-xl border border-input bg-background text-[15px] tracking-tight placeholder:text-muted-foreground/40 outline-none transition-colors focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:border-blue-500"
                  />
                  {fieldState.invalid && (
                    <div className="pl-0.5 text-[12px] text-red-500 tracking-tight mt-0.5">
                      <FieldError errors={[fieldState.error]} />
                    </div>
                  )}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className="flex flex-col gap-2"
                >
                  <FieldLabel
                    htmlFor="password"
                    className="text-[14px] font-normal tracking-tight text-muted-foreground pl-0.5"
                  >
                    Password
                  </FieldLabel>
                  <Input
                    {...field}
                    id="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your password"
                    autoComplete="off"
                    className="h-11 px-4 rounded-xl border border-input bg-background text-[15px] tracking-tight placeholder:text-muted-foreground/40 outline-none transition-colors focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:border-blue-500"
                  />
                  {fieldState.invalid && (
                    <div className="pl-0.5 text-[12px] text-red-500 tracking-tight mt-0.5">
                      <FieldError errors={[fieldState.error]} />
                    </div>
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="p-0 pt-8 flex items-center justify-between gap-4">
        <Button
          type="button"
          variant="link"
          onClick={() => form.reset()}
          className="h-11 px-0 text-[15px] font-normal text-blue-600 hover:underline cursor-pointer"
        >
          Reset
        </Button>

        <Button
          type="submit"
          form="signup-form"
          className="h-11 px-6 rounded-full bg-blue-600 text-[15px] font-normal tracking-tight text-white transition-colors hover:bg-blue-500! cursor-pointer"
        >
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
}
