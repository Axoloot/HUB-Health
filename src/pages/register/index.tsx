import Link from 'next/link';
import { useState } from 'react';
import { Text } from '@nextui-org/react';
import { useUserContext } from '../../providers/userProvider';

const Login = () => {
  const [email, setEmail] = useState(``);
  const [pseudo, setPseudo] = useState(``);
  const [password, setPassword] = useState(``);
  const [profilImg, setProfilImg] = useState(``);
  const { signup } = useUserContext();

  return (
    <div className="layout-container">
      <div
        style={{
          width: `100%`,
          height: `100vh`,
          display: `flex`,
          flexDirection: `column`,
          alignItems: `center`,
          justifyContent: `center`,
        }}
      >
        <div
          style={{
            // width: '30%',
            // height: '60%',
            display: `flex`,
            padding: `0 10em`,
            // marginTop: `5%`,
            borderRadius: 15,
            alignItems: `center`,
            flexDirection: `column`,
            justifyContent: `center`,
            backgroundColor: `#2d002d`,
          }}
        >
          <Text h6 color="#F2F2F2" style={{ margin: `1em ` }}>
            Pseudo
          </Text>
          <input
            type="text"
            className="form-input"
            onChange={(e) => setPseudo(e.target.value)}
          />
          <Text h6 color="#F2F2F2" style={{ margin: `1em ` }}>
            Email
          </Text>
          <input
            type="text"
            className="form-input"
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* <Text h6 color="#F2F2F2" style={{ margin: `1em ` }}>
            Photo de profile
          </Text>
          <input
            type="text"
            className="form-input"
            onChange={(e) => setProfilImg(e.target.value)}
          /> */}
          <Text h6 color="#F2F2F2" style={{ margin: `1em ` }}>
            Password
          </Text>
          <input
            type="password"
            className="form-input"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={() => signup({ email, password, pseudo, profilImg })}
            style={{
              backgroundColor: `#F2F2F2`,
              borderRadius: 15,
              width: 150,
              height: 50,
              cursor: `pointer`,
              margin: `1em`,
            }}
          >
            <Text h4 color="#2d002d" style={{ padding: 0, margin: 0 }}>
              CREER
            </Text>
          </button>
          <Link href="/">
            <Text
              h6
              color="#F2F2F2"
              style={{ textDecoration: `underline`, margin: `1em` }}
            >
              se connecter
            </Text>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
