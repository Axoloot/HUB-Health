import React, { useEffect } from 'react';
import { Text } from '@nextui-org/react';
import { useUserContext } from '../../providers/userProvider';
import { useRouter } from 'next/router';
import { ROUTER } from '../../lib/utils';
import { SicknessCard, Layout, Button } from '@/components';
import axios from 'axios';

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

type PatientsRo = {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  sickness: string[];
};

const FichePatient = () => {
  const Router = useRouter();
  const [patient, setPatient] = React.useState<PatientsRo>({} as PatientsRo);
  const [sicknessData, setSicknessData] = React.useState<SicknessRo[]>(
    [] as SicknessRo[],
  );
  const { isAuthenticated } = useUserContext();
  const patientId = Router.query.id;

  const fetchPatient = async () => {
    const response = await axios.get(`/api/patients`, {
      params: { id: patientId },
    });
    console.log(response.data);
    setPatient(response.data);
    setSicknessData(response.data.sickness);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      Router.push(ROUTER.login);
    }
    fetchPatient();
  }, [patientId]);

  return (
    <>
      <Layout>
        <div>
          <h1 className="text-3xl font-bold text-center">Fiche Patient</h1>
          <div className="p-8 rounded-lg shadow-xl">
            <h3 className="text-xl text-center">
              <Text h3>Prénom :{patient.firstname} </Text>
            </h3>
            <h3 className="text-xl text-center">
              <Text h3>Nom de Famille :{patient.lastname} </Text>
            </h3>
            <h3 className="text-xl text-center">
              <Text h3>Email :{patient.email} </Text>
            </h3>
          </div>
          <h1 className="text-3xl font-bold text-center mt-4">
            Précedentes maladie connu
          </h1>
          <div className="p-8 rounded-lg shadow-xl mt-4">
            {patient.sickness && patient.sickness.length === 0 && (
              <h3 className="text-xl text-center">
                <Text h3>Aucune maladie connu</Text>
              </h3>
            )}
            {sicknessData &&
              sicknessData.map((sickness) => (
                <SicknessCard key={sickness._id} sickness={sickness} />
              ))}
            <div className="p-4">
              <Button
                label="Ajouter un diagnostic torse"
                onClick={() =>
                  Router.push(`${ROUTER.createChest}/${patientId}`)
                }
              />
              <Button
                label="Ajouter un diagnostic cardiaque"
                onClick={() =>
                  Router.push(`${ROUTER.createHeart}/${patientId}`)
                }
              />
              <Button
                label="Ajouter un diagnostic foetal"
                onClick={() =>
                  Router.push(`${ROUTER.createFetal}/${patientId}`)
                }
              />
              <Button
                label="Ajouter un diagnostic cancer du sein"
                onClick={() =>
                  Router.push(`${ROUTER.createBreast}/${patientId}`)
                }
              />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default FichePatient;
