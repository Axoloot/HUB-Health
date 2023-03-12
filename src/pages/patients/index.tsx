import React, { useEffect } from 'react';
import { Text } from '@nextui-org/react';

import { useRouter } from 'next/router';
import { ROUTER } from '../../lib/utils';

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

type PatientsRo = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  sickness: SicknessRo[];
};

// const patients: PatientsRo[] = [{}];

const Patients = () => {
  const Router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem(`user`);
    if (!user) {
      Router.push(ROUTER.login);
    }
  }, []);

  return (
    <>
      <Text h1>Home</Text>
      <Text h1>Home</Text>
      <Text h1>Home</Text>
      <Text h1>Home</Text>
      <Text h1>Home</Text>
    </>
  );
};

export default Patients;
