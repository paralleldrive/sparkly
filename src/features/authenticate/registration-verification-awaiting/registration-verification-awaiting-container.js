import { useCountdown } from '../use-countdown';
import { RegistrationVerificationAwaiting } from './registration-verification-awaiting-component';

export function RegistrationVerificationAwaitingContainer({
  email,
  isResending = false,
  isSubmitting = false,
}) {
  const { secondsLeft, reset } = useCountdown(60);

  const handleResendClick = () => {
    reset();
  };

  return (
    <RegistrationVerificationAwaiting
      email={email}
      secondsLeft={secondsLeft}
      isResending={isResending}
      isSubmitting={isSubmitting}
      onResendClick={handleResendClick}
    />
  );
}
