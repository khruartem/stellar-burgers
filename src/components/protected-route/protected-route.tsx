import { Preloader } from '@ui';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import {
  isAuthCheckingSelector,
  userDataSelector
} from '../../features/user/userSlice';
import { ProtectedRouteProps } from './type';

export const ProtectedRoute = ({
  children,
  onlyUnAuth = false
}: ProtectedRouteProps) => {
  const isAuthChecking = useSelector(isAuthCheckingSelector);
  const user = useSelector(userDataSelector);
  const location = useLocation();

  if (isAuthChecking) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return children;
};
