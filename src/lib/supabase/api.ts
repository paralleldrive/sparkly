import { createServerClient, serializeCookieHeader } from '@supabase/ssr';
import { type NextApiRequest, type NextApiResponse } from 'next';

export default function createClient(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return Object.keys(request.cookies).map(name => ({
            name,
            value: request.cookies[name] || '',
          }));
        },
        setAll(cookiesToSet) {
          response.setHeader(
            'Set-Cookie',
            cookiesToSet.map(({ name, value, options }) =>
              serializeCookieHeader(name, value, options),
            ),
          );
        },
      },
    },
  );

  return supabase;
}
