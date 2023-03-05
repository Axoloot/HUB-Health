import Link from 'next/link';
import { useState } from 'react';
import { Text } from '@nextui-org/react';
import { useUserContext } from '../../providers/userProvider';
import { Input, Button } from '../../components';
import { toast } from 'react-toastify';
import { ROUTER } from '@/lib/utils';

type RegisterFormProps = {
  email: string;
  pseudo: string;
  password: string;
};

const Login = () => {
  const [email, setEmail] = useState(``);
  const [pseudo, setPseudo] = useState(``);
  const [password, setPassword] = useState(``);
  const { signup } = useUserContext();

  const submitForm = ({ email, password, pseudo }: RegisterFormProps) => {
    if (!email) {
      toast.error(`L'email est obligatoire`);
      return;
    }
    if (!password) {
      toast.error(`Le mot de passe est obligatoire`);
      return;
    }
    if (!pseudo) {
      toast.error(`Le pseudo est obligatoire`);
      return;
    }
    signup({ email, password, pseudo });
  };

  return (
    <div className="h-screen flex bg-gray-bg1">
      <div className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16">
        <h1 className="text-2xl  font-medium text-primary mt-4 mb-12 text-center">
          Création d&apos;un compte 🔐
        </h1>
        <div className="flex flex-col justify-center items-center">
          <Input
            placeholder="Pseudo"
            onChange={(value) => setPseudo(value)}
            value={pseudo}
            type="text"
            required
          />
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
              label="Créer un compte"
              onClick={() => submitForm({ email, password, pseudo })}
            />
          </div>

          <Text>
            Vous avez deja un compte ?
            <Link href={ROUTER.login}> Se Connecter</Link>
          </Text>
        </div>
      </div>
    </div>
  );
};

export default Login;
