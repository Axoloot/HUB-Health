import '@/lib/database';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ApiError } from 'next/dist/server/api-utils';
import PatientModel from '@/lib/models/Patients';
import SicknessModel from '@/lib/models/Sickness';
import mongoose from 'mongoose';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    switch (req.method) {
      case `POST`:
        if (!req.body) throw new ApiError(500, `missing body`);
        req.body._id = new mongoose.Types.ObjectId();
        const newSickness = new SicknessModel(req.body);
        await newSickness.save();
        await PatientModel.findOneAndUpdate(
          { _id: req.body.patientId },
          { $push: { sickness: new mongoose.mongo.ObjectId(newSickness._id) } },
        );
        return res.status(200).json(newSickness);
      case `GET`:
        const sickness = await SicknessModel.find();
        return res.status(200).json(sickness);
      case `PATCH`:
        if (!req.body) throw new ApiError(500, `missing body`);
        const editedSickness = await SicknessModel.findOneAndUpdate(
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
