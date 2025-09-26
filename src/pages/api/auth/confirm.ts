import { type EmailOtpType } from '@supabase/supabase-js';
import type { NextApiRequest, NextApiResponse } from 'next';

import createClient from '@/lib/supabase/api';

function stringOrFirstString(item: string | string[] | undefined) {
  return Array.isArray(item) ? item[0] : item;
}

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method !== 'GET') {
    response.status(405).appendHeader('Allow', 'GET').end();
    return;
  }

  const queryParams = request.query;
  const token_hash = stringOrFirstString(queryParams.token_hash);
  const type = stringOrFirstString(queryParams.type);

  let next = '/error';

  if (token_hash && type) {
    const supabase = createClient(request, response);
    const { error } = await supabase.auth.verifyOtp({
      type: type as EmailOtpType,
      token_hash,
    });

    if (error) {
      console.error(error);
    } else {
      next = stringOrFirstString(queryParams.next) || '/';
    }
  }

  response.redirect(next);
}
