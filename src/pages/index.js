import { LandingPage } from '@/features/landing/landing-page';
import { createClient } from '@/lib/supabase/server-side-props';

export default function LandingRoute() {
  return <LandingPage />;
}

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
