import { Loader2Icon, TriangleAlertIcon } from 'lucide-react';
import type { ComponentProps, FormEvent } from 'react';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type RegistrationVerificationAwaitingProps = {
  email: string;
  secondsLeft: number;
  isResending?: boolean;
  isSubmitting?: boolean;
  onResendClick?: () => void;
} & ComponentProps<'div'>;

export function RegistrationVerificationAwaiting({
  email,
  secondsLeft,
  isResending = false,
  isSubmitting = false,
  onResendClick,
  ...props
}: RegistrationVerificationAwaitingProps) {
  const waitingToResend = secondsLeft !== 0;

  // Generate countdown message based on secondsLeft
  const displayCountdownMessage =
    secondsLeft > 0
      ? `You can request a new registration link in ${secondsLeft} seconds.`
      : 'You can now request a new registration link.';

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (onResendClick) {
      onResendClick();
    }
  };

  return (
    <div {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Check your email</CardTitle>
          <CardDescription className="text-center">
            We&apos;ve sent a secure registration link to your email address.
            Please check your inbox and click the link to access your account.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4">
            <p className="text-muted-foreground text-xs">
              {displayCountdownMessage}
            </p>

            <form method="post" onSubmit={handleSubmit}>
              <fieldset
                disabled={waitingToResend || isSubmitting || isResending}
              >
                <input type="hidden" name="email" value={email} />

                <Button
                  className="w-full"
                  name="intent"
                  type="submit"
                  value="registerWithEmail"
                >
                  {isResending ? (
                    <>
                      <Loader2Icon className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Request new registration link'
                  )}
                </Button>
              </fieldset>
            </form>

            <Alert>
              <TriangleAlertIcon />
              <AlertDescription>
                Remember to check your spam folder.
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
