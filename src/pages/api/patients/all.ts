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
      case `GET`:
        const newPatient = new PatientModel(req.body);
        const patients = await newPatient.find({});
        return res.status(200).json(patients);
    }
  } catch (e) {
    console.error(e);
    res.status(500).send({ error: (e as Error).message });
  }
}
