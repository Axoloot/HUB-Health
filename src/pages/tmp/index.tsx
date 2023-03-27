import { useEffect, useState } from 'react';
import { Input, Button } from '../../components';
import { ROUTER } from '../../lib/utils';
import { toast } from 'react-toastify';
import { Text } from '@nextui-org/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

type LoginFormProps = {
  email: string;
  password: string;
};

const Login = () => {
  const [age, setAge] = useState(0);
  const [sexe, setSexe] = useState(1);
  const [cp, setCp] = useState(0);
  const [bps, setBps] = useState(0);
  const [chol, setChol] = useState(0);
  const [fbs, setFbs] = useState(0);
  const [restecg, setRestecg] = useState(0);
  const [thalach, setThalach] = useState(0);
  const [exang, setExang] = useState(0);
  const [oldpeak, setOldpeak] = useState(0);
  const [slope, setSlope] = useState(0);
  const [ca, setCa] = useState(0);
  const [thal, setThal] = useState(0);
  const [target, setTarget] = useState(0);

  const submitForm = async () => {
    console.log(`FORM`);
  };

  return (
    <div className="h-screen flex bg-gray-bg1">
      <div className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16">
        <h1 className="text-2xl  font-medium text-primary mt-4 mb-12 text-center">
          Connexion a votre compte 🔐
        </h1>
        <div className="flex flex-col justify-center items-center">
          <Input
            placeholder="Age"
            onChange={(value) => setAge(parseInt(value))}
            value={String(age)}
            type="string"
            required
          />
          <Input
            placeholder="Sexe"
            onChange={(value) => setSexe(value === `h` ? 1 : 0)}
            value={sexe === 1 ? `h` : `f`}
            type="string"
            required
          />
          <Input
            placeholder="cavité pyélocalicielle"
            onChange={(value) => setCp(parseInt(value))}
            value={String(cp)}
            type="string"
            required
          />
          <Input
            placeholder="Battemment cardiaque par seconde"
            onChange={(value) => setBps(parseInt(value))}
            value={String(bps)}
            type="string"
            required
          />
          <Input
            placeholder="Cholestérol"
            onChange={(value) => setChol(value === `o` ? 1 : 0)}
            value={chol === 1 ? `o` : `n`}
            type="string"
            required
          />
          <Input
            placeholder="frequence cardiaque maximale atteinte"
            onChange={(value) => setFbs(parseInt(value))}
            value={String(fbs)}
            type="string"
            required
          />
          <Input
            placeholder="Age"
            onChange={(value) => setAge(parseInt(value))}
            value={String(age)}
            type="string"
            required
          />

          <div className="p-4">
            <Button label="Connexion" onClick={() => submitForm()} />
          </div>
          <Text className="text-center">
            Vous n&apos;avez pas de compte ?
            <Link href={ROUTER.register}> Créer un compte</Link>
          </Text>
        </div>
      </div>
    </div>
  );
};

export default Login;
