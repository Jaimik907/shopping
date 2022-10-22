import { Route, Router, Routes } from 'react-router-dom';
import CartContainer from '../components/CartContainer';
import Login from '../screens/auth/Login';
import PrivateRoutes from './private-routes/privateRoutes';

const AppRouting = () => {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route
        path='/dashboard'
        element={
          <PrivateRoutes>
            <CartContainer />
          </PrivateRoutes>
        }
      />
    </Routes>
  );
};

export default AppRouting;
