import { useUserContext } from '../../providers/userProvider';
import { useState } from 'react';
import { Input, Button } from '../../components';
import { ROUTER } from '../../lib/utils';
import { toast } from 'react-toastify';
import { Text } from '@nextui-org/react';
import Link from 'next/link';

type LoginFormProps = {
  email: string;
  password: string;
};

const Login = () => {
  const [email, setEmail] = useState(``);
  const [password, setPassword] = useState(``);
  const { login } = useUserContext();

  const submitForm = ({ email, password }: LoginFormProps) => {
    if (!email) {
      toast.error(`L'email est obligatoire`);
      return;
    }
    if (!password) {
      toast.error(`Le mot de passe est obligatoire`);
      return;
    }
    login(email, password, true, ROUTER.home);
  };

  return (
    <div className="h-screen flex bg-gray-bg1">
      <div className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16">
        <h1 className="text-2xl  font-medium text-primary mt-4 mb-12 text-center">
          Connexion a votre compte 🔐
        </h1>
        <div className="flex flex-col justify-center items-center">
          <Input
            placeholder="Email"
            onChange={(value) => setEmail(value)}
            value={email}
            type="email"
            required
          />
          <Input
            placeholder="Password"
            onChange={(value) => setPassword(value)}
            value={password}
            type="password"
            required
          />
          <div className="p-4">
            <Button
              label="Connexion"
              onClick={() => submitForm({ email, password })}
            />
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
