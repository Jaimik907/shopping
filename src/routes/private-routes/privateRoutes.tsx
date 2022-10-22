import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/authProvider';

interface IProps {
  children: JSX.Element;
}

const PrivateRoutes = ({ children }: IProps) => {
  const { user } = useAuth();
  if (!user) return <Navigate to='/' />;
  return children;
};

export default PrivateRoutes;
