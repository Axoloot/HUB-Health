import { IUser } from '../../lib/models/User';
import createCtx from '../createCtx';

declare global {
  interface SignUpPayload {
    email: string;
    password: string;
    pseudo: string;
    profilImg?: string;
  }

  type UserCtxValue = {
    user: IUser | null;
    error: string | null;
    isAuthenticated: boolean;
    login: (
      email: string,
      password: string,
      redirect?: boolean,
      callback?: string,
    ) => Promise<boolean>;
    signup: (payload: SignUpPayload) => Promise<boolean>;
    logout: () => void;
  };
}

const { ctx: UserContext, useCtx: useUserContext } = createCtx<UserCtxValue>();

export { useUserContext };
export default UserContext;
