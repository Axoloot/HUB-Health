import React, { useEffect } from 'react';
import { useUserContext } from '@/providers/userProvider';
import { useRouter } from 'next/router';
import { ROUTER } from '../../lib/utils';
import { Layout, Input, Button } from '@/components';
import { toast } from 'react-toastify';
import axios from 'axios';
import { PatientCard } from '@/components/patientCard';

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
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  sickness: SicknessRo[];
};

type PatientFormProps = {
  firstname: string;
  lastname: string;
  email: string;
};

const Patients = () => {
  const { isAuthenticated } = useUserContext();
  const Router = useRouter();
  const [patients, setPatients] = React.useState<PatientsRo[]>([]);
  const [modal, setModal] = React.useState(false);
  const [searchInput, setSearchInput] = React.useState(``);
  const [searchResults, setSearchResults] = React.useState<PatientsRo[]>([]);
  const [firstname, setFirstname] = React.useState(``);
  const [lastname, setLastname] = React.useState(``);
  const [email, setEmail] = React.useState(``);

  useEffect(() => {
    const fetchPatients = async () => {
      const response = await axios.get(`api/patients/`);
      setPatients(response.data);
    };
    fetchPatients();
  }, []);

  const submitForm = async ({
    firstname,
    lastname,
    email,
  }: PatientFormProps) => {
    if (!firstname) {
      toast.error(`Le prénom est obligatoire`);
      return;
    }
    if (!lastname) {
      toast.error(`Le nom de famille est obligatoire`);
      return;
    }
    if (!email) {
      toast.error(`L&apos;email est obligatoire`);
      return;
    }
    const response = await axios.post(`/api/patients`, {
      firstname,
      lastname,
      email,
      sickness: [],
    });
    setPatients([...patients, response.data]);
    console.log(`submitForm`, { firstname, lastname });
  };

  const PatienForm = () => {
    return (
      <div className=" w-screen flex items-center justify-center bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16 flex-col">
        <h1 className="text-2xl  font-medium text-primary mt-4 mb-12 text-center">
          Création d&apos;un patient
        </h1>
        <div className="flex flex-col justify-center items-center">
          <Input
            placeholder="Email"
            onChange={(value) => setEmail(value)}
            value={email}
            required
          />
          <Input
            placeholder="Prénom du patient"
            onChange={(value) => setFirstname(value)}
            value={firstname}
            required
          />
          <Input
            placeholder="Nom de famille du patient"
            onChange={(value) => setLastname(value)}
            value={lastname}
            required
          />
          <div className="p-4">
            <Button
              label="Créer le patient"
              onClick={() => submitForm({ email, firstname, lastname })}
            />
          </div>
        </div>
      </div>
    );
  };

  const handleSearch = (value: string) => {
    setSearchInput(value);
    const results = patients.filter((patient) => {
      const patientName = `${patient.firstname} ${patient.lastname}`;
      return patientName.toLowerCase().includes(value.toLowerCase());
    });
    setSearchResults(results);
  };

  return (
    <>
      <Layout>
        <div className="h-screen flex bg-gray-bg1 flex-col">
          <div className="w-screen flex flex-row justify-around m-4">
            <Input
              placeholder="Rechercher un patient"
              onChange={(value) => handleSearch(value)}
              value={searchInput}
              key="search"
            />
            <Button
              label={
                modal ? `Voir la liste des patients` : `Ajouter un patient`
              }
              onClick={() => setModal(!modal)}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <>
              {!modal && (
                <>
                  {searchInput.length === 0 &&
                    patients.map((patient) => (
                      <PatientCard key={patient._id} patient={patient} />
                    ))}
                </>
              )}
            </>
            <>{modal && <PatienForm />}</>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Patients;
