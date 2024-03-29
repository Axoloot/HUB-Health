import '@/lib/database';
import type { NextApiRequest, NextApiResponse } from 'next';
import PatientModel from '@/lib/models/Patients';
import '@/lib/models/Sickness';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    switch (req.method) {
      case `GET`:
        const patients = await PatientModel.find().populate(`sickness`);
        return res.status(200).json(patients);
    }
  } catch (e) {
    console.error(e);
    res.status(500).send({ error: (e as Error).message });
  }
}
