/**
 * Интерфейс товара
 * @prop {string} id ИД товара.
 */
export interface IProduct {
  id: string;
  name: string;
  image: string;
  description: string;
  bigDescription: string;
}

export interface IProducts {
  [id: string]: IProduct;
}

export interface ILoginData {
  email: string;
  password: string;
}
