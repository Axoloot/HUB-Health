import React from 'react';
import { Text } from '@nextui-org/react';
import { useUserContext } from '../../providers/userProvider';

const Login = () => {
  const { user } = useUserContext();

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
            display: `flex`,
            padding: `0 10em`,
            borderRadius: 15,
            alignItems: `center`,
            flexDirection: `column`,
            justifyContent: `center`,
            backgroundColor: `#2d002d`,
          }}
        >
          <Text h6 color="#F2F2F2" style={{ margin: `1em ` }}>
            {`Email: ${user?.email}`}
          </Text>
          <Text h6 color="#F2F2F2" style={{ margin: `1em ` }}>
            {`pseudo: ${user?.pseudo}`}
          </Text>
          <Text h6 color="#F2F2F2" style={{ margin: `1em ` }}>
            {`Password: ${user?.password}`}
          </Text>
          <Text h6 color="#F2F2F2" style={{ margin: `1em ` }}>
            {`createdAt: ${user?.createdAt} | modifiedAt: ${user?.modifiedAt}`}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default Login;
