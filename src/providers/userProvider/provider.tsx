import React, { useCallback, useState, useEffect } from 'react';
import UserContext from './context';
import { signIn, getSession, signOut } from 'next-auth/react';
import { IUser } from '../../lib/models/User';
export interface UserProviderProps {
  children: React.ReactNode;
}

function UserProvider({ children }: UserProviderProps): JSX.Element {
  const [user, setUser] = useState<IUser | null>(null);
  const [error, setError] = useState<string | null>(null);

  const logout = useCallback((): void => {
    setUser(null);
    signOut({ callbackUrl: `/` });
  }, [signOut]);

  const signup = useCallback(
    async (payload: SignUpPayload): Promise<boolean> => {
      const res = await fetch(`/api/users`, {
        method: `POST`,
        headers: {
          'Content-Type': `application/json`,
        },
        body: JSON.stringify(payload),
      });
      // setTimeout(() => signIn("credentials", { email: payload.email, password: payload.password, redirect: true, callbackUrl: '/home' }), 200);
      return !!res;
    },
    [setUser],
  );

  const login = useCallback(
    async (
      email: string,
      password: string,
      redirect = true,
      callbackUrl = `/home`,
    ): Promise<boolean> => {
      const signin = await signIn(`credentials`, {
        email,
        password,
        redirect,
        callbackUrl,
      });
      if (signin?.ok) {
        const session = await getSession();

        if (session?.user) {
          const newUser = session.user as unknown as IUser;
          setUser(newUser);
        }
        return true;
      }
      return false;
    },
    [],
  );

  useEffect(() => {
    const loadSession = async () => {
      const session = await getSession();
      if (session?.user) {
        const res = await fetch(`/api/users/me`);
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        }
      }
    };
    loadSession();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        error,
        isAuthenticated: !!user,
        login,
        logout,
        signup,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
