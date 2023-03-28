import React from 'react';
import { Text } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { ROUTER } from '@/lib/utils';

type SicknessRo = {
  _id: string;
  name: string;
  description: string;
  doctor_supposition: string;
  doctor_name: string;
  doctor_email: string;
  ai_supposition: string;
  date: string;
  result: string;
};

type SicknessCardProps = {
  sickness: SicknessRo;
};

export const SicknessCard = ({ sickness }: SicknessCardProps) => {
  const Router = useRouter();
  return (
    <div
      key={sickness._id}
      onClick={() => Router.push(`${ROUTER.patientDetails}/${sickness._id}`)}
      className="bg-white shadow rounded-lg p-4 max-h-[200px]"
    >
      <h3 className="text-lg font-medium mb-2">maladie :{sickness.name}</h3>
      <p>AI Conclusion : {sickness.ai_supposition}</p>
      <p>result: {sickness.result}</p>
    </div>
  );
};
