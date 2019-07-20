import {Action, Dispatch} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {ILoginData, IProduct} from '../components/Model';
import history from '../history';
import {AppState} from '../reducers';
import checkService from '../service/Check';
import {loginService} from '../service/Login';
import logoutService from '../service/Logout';
import {deleteProductService, loadCategoryService, loadProductService, updateProductService} from '../service/Product';
import {
  DELETE_PRODUCT, ICategoryActionTypes, IProductActionTypes,
  LOAD_CATEGORY, LOAD_PRODUCT, LOG_IN, LOG_OUT, UPDATE_PRODUCT,
} from './types';

export const logIn = ({email, password}: ILoginData): ThunkAction<Promise<void>, AppState, null, Action<string>> =>
  async (dispatch: Dispatch) => {
    await loginService({email, password});

    const action = () => {
      return {type: LOG_IN};
    };
    dispatch(action());
  };

export const checkAuth = (): ThunkAction<Promise<void>, AppState, null, Action<string>> =>
  async (dispatch: Dispatch) => {
    await checkService();

    const action = () => {
      return {type: LOG_IN};
    };
    dispatch(action());
  };

export const logOut = (): ThunkAction<Promise<void>, AppState, null, Action<string>> =>
  async (dispatch: Dispatch) => {
    const data = await logoutService();

    if (!data.error) {
      const action = () => {
        return {type: LOG_OUT};
      };

      dispatch(action());
    }
  };

export const loadCategory = (): ThunkAction<Promise<void>, AppState, null, Action<string>> =>
  async (dispatch: Dispatch) => {
    const item = await loadCategoryService();

    const action = (item: IProduct[]): ICategoryActionTypes => {
      return {type: LOAD_CATEGORY, payload: item};
    };

    dispatch(action(item));
  };

export const loadProduct = (payload: object) => (dispatch: Dispatch) => {
  loadProductService(payload).then((item) => {
    dispatch({type: LOAD_PRODUCT, payload: item});
  });
};

export const updateProduct = (product: IProduct): ThunkAction<Promise<void>, AppState, null, Action<string>> =>
  async (dispatch: Dispatch): Promise<void> => {
    await updateProductService(product);

    const action = (): IProductActionTypes => {
      return {type: UPDATE_PRODUCT, payload: product};
    };

    dispatch(action());
  };

export const deleteProduct = (id: string) => (dispatch: Dispatch) => {
  deleteProductService(id).then((deleted: string) => {
    if (deleted) {
      dispatch({type: DELETE_PRODUCT, id});
      history.push('/');
    }
  });
};
