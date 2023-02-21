import UserModel from '../../../lib/models/User';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case 'POST':
        const salt = bcrypt.genSaltSync(3);
        var hash = bcrypt.hashSync(req.body.password, salt);
        req.body.password = hash;
        console.log(salt);

        const users = await UserModel.find({ email: req.body.email });

        if (users.length > 0) return res.status(400).end();

        const newUser = new UserModel(req.body);
        newUser.save();
        return res.status(200).json(newUser);

      case 'DELETE':
        if (!subscription) {
          return res.status(404).json({ error: 'Not found' });
        }
        db.subscriptions.remove(subscription);

        return res.status(200).json({ success: 'true' });

      default:
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
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
