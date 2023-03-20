import '@/lib/database';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ApiError } from 'next/dist/server/api-utils';
import PatientModel from '@/lib/models/Patients';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (!req.body) throw new ApiError(500, `missing body`);
    switch (req.method) {
      case `POST`:
        const newPatient = new PatientModel(req.body);
        newPatient.save();
        return res.status(200).json(newPatient);
      case `GET`:
        const sickness = await PatientModel.find(req.body);
        return res.status(200).json(sickness);
      case `PATCH`:
        const editedSickness = await PatientModel.findOneAndUpdate(
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
