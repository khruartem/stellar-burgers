import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useLocation } from 'react-router-dom';

export const AppHeader: FC = () => {
  const location = useLocation();
  return <AppHeaderUI location={location} userName='' />;
};
