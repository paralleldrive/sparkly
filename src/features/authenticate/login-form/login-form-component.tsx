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

type LoginFormProps = {
  emailError?: string;
  isSigningIn?: boolean;
  onSignInClicked?: (data: { email: string }) => void;
} & ComponentProps<'form'>;

export function LoginForm({
  className,
  emailError,
  isSigningIn,
  onSignInClicked,
  ...props
}: LoginFormProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;

    if (onSignInClicked) {
      onSignInClicked({ email });
    }
  };

  return (
    <Form
      className={cn('flex flex-col gap-6', className)}
      onSubmit={handleSubmit}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Sign in to your account</h1>

        <p className="text-muted-foreground text-sm text-balance">
          Enter your email to receive a secure sign-in link
        </p>
      </div>

      <fieldset className="grid gap-6" disabled={isSigningIn}>
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
          {isSigningIn ? (
            <>
              <Loader2Icon className="animate-spin" /> Sending link...
            </>
          ) : (
            'Send sign-in link'
          )}
        </Button>
      </fieldset>

      <div className="text-center text-sm">
        Need an account?{' '}
        <Link href="/register" className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </Form>
  );
}
