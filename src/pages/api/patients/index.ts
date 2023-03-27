import '@/lib/database';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ApiError } from 'next/dist/server/api-utils';
import PatientModel from '@/lib/models/Patients';
import SicknessModel from '@/lib/models/Sickness';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    switch (req.method) {
      case `POST`:
        if (!req.body) throw new ApiError(500, `missing body`);
        const newPatient = new PatientModel(req.body);
        await newPatient.save();
        return res.status(200).json(newPatient);
      case `GET`:
        const id = req.query.id;
        if (!id) {
          const patients = await PatientModel.find().populate(`sickness`);
          return res.status(200).json(patients);
        }
        const patient = await PatientModel.findOne({
          _id: id,
        }).populate(`sickness`);
        return res.status(200).json(patient);
      case `PATCH`:
        if (!req.body) throw new ApiError(500, `missing body`);
        const editedSickness = await PatientModel.findOneAndUpdate(
          { id: req.body._id },
          req.body,
        );
        return res.status(200).json(editedSickness);
    }
  } catch (e) {
    console.error(e);
    res.status(500).send({ error: (e as Error).message });
  }
}
