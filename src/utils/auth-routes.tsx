import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/useAuth';

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const { token } = useAuthStore((state) => state);

  if (token) {
    return <> {children} </>;
  } else {
    return <Navigate to={'/auth'} replace />;
  }
};
export default AuthProvider;
