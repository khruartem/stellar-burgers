import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import {
  AppHeader,
  IngredientDetails,
  Modal,
  OrderInfo,
  ProtectedRoute
} from '@components';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../services/store';
import { getUser } from '../../features/user/userSlice';

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={location.state?.background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
      </Routes>
      <Routes location={location.state?.background || location}>
        <Route path='/feed'>
          <Route index element={<Feed />} />
          <Route path=':number' element={<OrderInfo />} />
        </Route>
      </Routes>
      <Routes location={location.state?.background || location}>
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Routes location={location.state?.background || location}>
        <Route path='/profile'>
          <Route
            index
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path='orders'>
            <Route
              index
              element={
                <ProtectedRoute>
                  <ProfileOrders />
                </ProtectedRoute>
              }
            />
            <Route path=':number' element={<OrderInfo />} />
          </Route>
        </Route>
      </Routes>

      <Routes>
        <Route
          path='/ingredients/:id'
          element={
            <Modal title='Детали ингредиента' onClose={() => navigate('/')}>
              <IngredientDetails />
            </Modal>
          }
        />
      </Routes>
      <Routes>
        <Route
          path='/feed/:number'
          element={
            <Modal
              title={location.state?.orderNumberFormatted}
              onClose={() => navigate('/feed')}
            >
              <OrderInfo />
            </Modal>
          }
        />
      </Routes>
      <Routes>
        <Route
          path='profile/orders/:number'
          element={
            <Modal
              title={location.state?.orderNumberFormatted}
              onClose={() => navigate('/profile/orders')}
            >
              <OrderInfo />
            </Modal>
          }
        />
      </Routes>
      <Routes location={{ pathname: '*' }}>
        <Route path='*' element={<NotFound404 />} />
      </Routes>
    </div>
  );
};

export default App;
