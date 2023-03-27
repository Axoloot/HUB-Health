import { Avatar } from '@nextui-org/react';
import { ROUTER } from '@/lib/utils';
import Router from 'next/router';

type PatientRo = {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  sickness: SicknessRo[];
};

type SicknessRo = {
  id: string;
  name: string;
  description: string;
  doctor_supposition: string;
  doctor_name: string;
  doctor_email: string;
  ai_supposition: string;
  date: string;
  result: string;
};

type PatientCardProps = {
  patient: PatientRo;
  key: string;
};

export const PatientCard = ({ patient }: PatientCardProps) => {
  console.log(`patient`, patient);
  return (
    <div
      key={patient._id}
      onClick={() =>
        Router.push({
          pathname: `${ROUTER.patientDetails}/${patient._id}`,
          query: { id: patient._id },
        })
      }
      className="bg-white shadow rounded-lg p-4 max-h-[200px]"
    >
      <Avatar text={`${patient.firstname}${patient.lastname}`} />
      <h3 className="text-lg font-medium mb-2">{`${patient.firstname} ${patient.lastname}`}</h3>
      <p className="text-gray-600 mb-4">{patient.email}</p>
      <ul className="list-disc pl-4">
        {patient.sickness.map((sickness) => (
          <li key={sickness.id}>{sickness.name}</li>
        ))}
      </ul>
    </div>
  );
};
