import {IProduct} from '../components/Model';

export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const LOAD_CATEGORY = 'LOAD_CATEGORY';
export const LOAD_PRODUCT = 'LOAD_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

interface ILoadCategoryAction {
  type: typeof LOAD_CATEGORY;
  payload: IProduct[];
}

interface IDeleteCategoryAction {
  type: typeof DELETE_PRODUCT;
  id: string;
}

interface IUpdateCategoryProductAction {
  type: typeof UPDATE_PRODUCT;
  payload: IProduct;
}

export type ICategoryActionTypes = ILoadCategoryAction | IDeleteCategoryAction | IUpdateCategoryProductAction;

export interface ILoadProductAction {
  type: typeof LOAD_PRODUCT;
  payload: IProduct;
}

export interface IUpdateProductAction {
  type: typeof UPDATE_PRODUCT;
  payload: IProduct;
}

export interface IDeleteProductAction {
  type: typeof DELETE_PRODUCT;
  id: string;
}

export type IProductActionTypes = ILoadProductAction | IUpdateProductAction | IDeleteProductAction;
