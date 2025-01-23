import { TIngredient } from '@utils-types';
import { Location } from 'react-router-dom';

export type OrderInfoUIProps = {
  orderInfo: TOrderInfo;
  location?: Location;
};

type TOrderInfo = {
  ingredientsInfo: {
    [key: string]: TIngredient & { count: number };
  };
  date: Date;
  total: number;
  _id: string;
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  ingredients: string[];
};
