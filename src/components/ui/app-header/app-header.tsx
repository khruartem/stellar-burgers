import React, { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ location, userName }) => (
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      <div className={styles.menu_part_left}>
        <Link
          className={clsx(
            styles.link,
            location!.pathname === '/' && styles.link_active
          )}
          to={'/'}
        >
          <BurgerIcon type={'primary'} />
          <p className='text text_type_main-default ml-2 mr-10'>Конструктор</p>
        </Link>
        <Link
          className={clsx(
            styles.link,
            location!.pathname === '/feed' && styles.link_active
          )}
          to={'/feed'}
        >
          <ListIcon type={'primary'} />
          <p className='text text_type_main-default ml-2'>Лента заказов</p>
        </Link>
      </div>
      <div className={styles.logo}>
        <Logo className='' />
      </div>
      <Link
        className={clsx(
          styles.link,
          styles.link_position_last,
          location!.pathname === '/profile' && styles.link_active
        )}
        to={'/profile'}
      >
        <ProfileIcon type={'primary'} />
        <p className='text text_type_main-default ml-2'>
          {userName || 'Личный кабинет'}
        </p>
      </Link>
    </nav>
  </header>
);
