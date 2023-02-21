import 'src/lib/database';
import User from 'src/lib/models/User';
import { authOptions } from 'src/pages/api/auth/[...nextauth]';
import { unstable_getServerSession } from 'next-auth/next';

export default async function handler(req, res) {
  try {
    if (req.method != 'GET') {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }

    let user = null;
    const session = await unstable_getServerSession(req, res, authOptions);

    if (
      !session ||
      !(user = await User.findOne({ email: session.user?.email }).exec())
    ) {
      return res.status(401).json({ message: 'You must be logged in.' });
    }

    return res.status(200).json(user);
  } catch (err) {
    if ('statusCode' in err) {
      return res
        .writeHead(err.statusCode, err.headers)
        .json({ error: err.body });
    } else {
      console.error(err);
      return res.status(500).end();
    }
  }
}
