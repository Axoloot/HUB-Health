import mongoose, { Schema, model, models } from 'mongoose';

export interface IPatient {
  firstname: string;
  lastname: string;
  email: string;
  sickness: mongoose.Schema.Types.ObjectId[];
}

const patientSchema = new Schema<IPatient>(
  {
    email: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    sickness: [{ type: mongoose.Schema.Types.ObjectId, ref: `sickness` }],
  },
  { timestamps: true, strictQuery: `throw`, strict: `throw` },
);

export default models.Patient || model(`Patient`, patientSchema);
