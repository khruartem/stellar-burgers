import { FC, SyntheticEvent, useEffect, useState } from 'react';

import { ProfileUI } from '@ui-pages';
import { updateUser, userDataSelector } from '../../features/user/userSlice';
import { useDispatch, useSelector } from '../../services/store';

export const Profile: FC = () => {
  const dispatch = useDispatch();

  /** TODO: взять переменную из стора */
  const user = useSelector(userDataSelector);

  const [formValue, setFormValue] = useState({
    name: user!.name,
    email: user!.email,
    password: ''
  });

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || ''
    }));
  }, [user]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(updateUser(formValue));
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user!.name,
      email: user!.email,
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );

  //return null;
};
