import { LogOut } from 'lucide-react';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { createClient } from '@/lib/supabase/component';
import { createClient as createServerClient } from '@/lib/supabase/server-side-props';

export default function HomePage({ user }) {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const supabase = createClient();

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error('Error logging out:', error);
        return;
      }

      // Redirect to landing page after successful logout
      router.push('/');
    } catch (error) {
      console.error('Unexpected error during logout:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <main className="bg-background flex min-h-svh items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome to Sparkly</CardTitle>

          <CardDescription>
            Hello, {user.email || user.user_metadata?.name || 'user'}!
            You&apos;re now part of the AI-powered learning revolution
          </CardDescription>
        </CardHeader>

        <CardContent className="text-center">
          <p className="text-muted-foreground">
            Get ready to ignite your learning journey with personalized AI
            mentorship. Dive into courses that adapt to your pace and help you
            master new skills faster than ever before.
          </p>
        </CardContent>

        <CardFooter className="justify-center">
          <Button
            variant="outline"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex items-center gap-2"
          >
            <LogOut className="size-4" />
            {isLoggingOut ? 'Logging out...' : 'Logout'}
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}

export async function getServerSideProps(context) {
  const supabase = createServerClient(context);

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: data.user,
    },
  };
}
