import '@/lib/database';
import User from '@/lib/models/User';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method != `GET`) {
      return res.status(405).json({ error: `Method Not Allowed` });
    }

    let user = null;
    const session = await unstable_getServerSession(req, res, authOptions);

    if (
      !session ||
      !(user = await User.findOne({ email: session.user?.email }).exec())
    ) {
      return res.status(401).json({ message: `You must be logged in.` });
    }

    return res.status(200).json(user);
  } catch (e) {
    console.error(e);
    res.status(500).send({ error: (e as Error).message });
  }
}
