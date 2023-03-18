import '@/lib/database';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ApiError } from 'next/dist/server/api-utils';
import SicknessModel from '@/lib/models/Sickness';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (!req.body) throw new ApiError(500, `missing body`);
    switch (req.method) {
      case `POST`:
        const newSickness = new SicknessModel(req.body);
        newSickness.save();
        return res.status(200).json(newSickness);
      case `GET`:
        const sickness = await SicknessModel.find(req.body);
        return res.status(200).json(sickness);
      case `PATCH`:
        const editedSickness = await SicknessModel.findOneAndUpdate(
          { id: req.body.id },
          req.body,
        );
        return res.status(200).json(editedSickness);
    }
  } catch (e) {
    console.error(e);
    res.status(500).send({ error: (e as Error).message });
  }
}
