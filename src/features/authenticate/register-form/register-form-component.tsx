import { Loader2Icon } from 'lucide-react';
import Link from 'next/link';
import type { ComponentProps, FormEvent } from 'react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type RegisterFormProps = {
  emailError?: string;
  isSigningUp?: boolean;
  nameError?: string;
  onSignUpClicked?: (data: { name: string; email: string }) => void;
} & ComponentProps<'form'>;

export function RegisterForm({
  className,
  emailError,
  isSigningUp,
  nameError,
  onSignUpClicked,
  ...props
}: RegisterFormProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;

    if (onSignUpClicked) {
      onSignUpClicked({ name, email });
    }
  };

  return (
    <Form
      className={cn('flex flex-col gap-6', className)}
      onSubmit={handleSubmit}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create an account</h1>

        <p className="text-muted-foreground text-sm text-balance">
          Enter your information to get started
        </p>
      </div>

      <fieldset className="grid gap-6" disabled={isSigningUp}>
        <FormField name="name" error={nameError}>
          <FormItem>
            <FormLabel>Name</FormLabel>

            <FormControl>
              <Input type="text" placeholder="John Doe" required />
            </FormControl>

            <FormMessage />
          </FormItem>
        </FormField>

        <FormField name="email" error={emailError}>
          <FormItem>
            <FormLabel>Email</FormLabel>

            <FormControl>
              <Input type="email" placeholder="m@example.com" required />
            </FormControl>

            <FormMessage />
          </FormItem>
        </FormField>

        <Button type="submit" className="w-full">
          {isSigningUp ? (
            <>
              <Loader2Icon className="animate-spin" /> Signing up ...
            </>
          ) : (
            'Sign up'
          )}
        </Button>
      </fieldset>

      <div className="text-center text-sm">
        Already a member?{' '}
        <Link href="/login" className="underline underline-offset-4">
          Sign in
        </Link>
      </div>
    </Form>
  );
}
