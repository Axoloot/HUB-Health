import '@/lib/database';
import UserModel from '@/lib/models/User';
import bcrypt from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    switch (req.method) {
      case `POST`:
        const salt = bcrypt.genSaltSync(3);
        const hash = bcrypt.hashSync(req.body.password, salt);
        req.body.password = hash;

        const users = await UserModel.find({ email: req.body.email });

        if (users.length > 0) return res.status(400).end();

        const newUser = new UserModel(req.body);
        await newUser.save();
        return res.status(200).json(newUser);

      // case `DELETE`:
      //   if (!subscription) {
      //     return res.status(404).json({ error: `Not found` });
      //   }
      //   db.subscriptions.remove(subscription);

      //   return res.status(200).json({ success: `true` });

      default:
        return res.status(405).json({ error: `Method Not Allowed` });
    }
  } catch (e) {
    console.error(e);
    res.status(500).send({ error: (e as Error).message });
  }
}
