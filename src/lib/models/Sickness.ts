import { Schema, model, models } from 'mongoose';

export interface SicknessRo {
  name: string;
  description: string;
  doctor_supposition: string;
  doctor_name: string;
  doctor_email: string;
  ai_supposition: string;
  date: string;
  result: string;
}

const sicknessRo = new Schema<SicknessRo>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    doctor_supposition: { type: String, required: true },
    doctor_name: { type: String, required: true },
    doctor_email: { type: String, required: true },
    ai_supposition: { type: String, required: true },
    date: { type: String, required: true },
    result: { type: String, required: true },
  },
  { timestamps: true, strictQuery: true },
);

export default models.Sickness || model(`Sickness`, sicknessRo);
