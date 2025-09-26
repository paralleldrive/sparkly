import { GalleryVerticalEnd } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { connect } from 'react-redux';

import LoginForm from '@/features/authenticate/login-form/login-form-container';
import { RegistrationVerificationAwaitingContainer } from '@/features/authenticate/registration-verification-awaiting/registration-verification-awaiting-container';
import { selectIsAwaitingVerification } from '@/features/authenticate/user-authentication-reducer';
import { createClient } from '@/lib/supabase/server-side-props';

function LoginPage({ isAwaitingVerification }) {
  return (
    <main className="grid min-h-svh lg:grid-cols-2">
      <div className="relative flex flex-col gap-4 p-6 md:p-10">
        <svg
          aria-hidden="true"
          className="stroke-border absolute inset-0 -z-10 h-full w-full mask-[radial-gradient(32rem_32rem_at_center,white,transparent)]"
        >
          <defs>
            <pattern
              x="50%"
              y={-1}
              id="login-grid-pattern"
              width={200}
              height={200}
              patternUnits="userSpaceOnUse"
            >
              <path d="M.5 200V.5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="fill-muted overflow-visible">
            <path
              d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect
            fill="url(#login-grid-pattern)"
            width="100%"
            height="100%"
            strokeWidth={0}
          />
        </svg>

        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Sparkly
          </Link>
        </div>

        <div className="bg-background/20 flex flex-1 items-center justify-center rounded-xl backdrop-blur-xs">
          {isAwaitingVerification ? (
            <RegistrationVerificationAwaitingContainer />
          ) : (
            <div className="w-full max-w-xs">
              <LoginForm />
            </div>
          )}
        </div>
      </div>

      <div className="bg-muted relative hidden lg:block">
        <Image
          src="/images/login-background.png"
          alt="Login background image"
          fill
          className="object-cover dark:brightness-[0.8]"
        />
      </div>
    </main>
  );
}

const mapStateToProps = state => ({
  isAwaitingVerification: selectIsAwaitingVerification(state),
});

export default connect(mapStateToProps)(LoginPage);

export async function getServerSideProps(context) {
  const supabase = createClient(context);

  const { data, error } = await supabase.auth.getUser();

  // If user is already authenticated, redirect to home
  if (!error && data?.user) {
    return {
      redirect: {
        destination: '/home',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
