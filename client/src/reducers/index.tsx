import {combineReducers} from 'redux';

import {
  DELETE_PRODUCT,
  ICategoryActionTypes,
  IProductActionTypes,
  LOAD_CATEGORY,
  LOAD_PRODUCT, LOG_IN, LOG_OUT, UPDATE_PRODUCT,
} from '../actions/types';
import {IProduct, IProducts} from '../components/Model';

interface IAuthAction {
  type: string;
}

const authReducer = (state = false, action: IAuthAction) => {
  switch (action.type) {
    case LOG_IN:
      return true;
    case LOG_OUT:
      return false;
    default:
      return state;
  }
};

const categoryReducer = (state: IProduct[] = [], action: ICategoryActionTypes) => {
  switch (action.type) {
    case LOAD_CATEGORY: {
      return action.payload;
    }
    case UPDATE_PRODUCT: {
      return state.map((item) => {
        if (item.id === action.payload.id) {
          return {...item, ...action.payload};
        }

        return item;
      });
    }
    case DELETE_PRODUCT:
      return state.filter(({id}) => id !== action.id);
    default:
      return state;
  }
};

const productReducer = (state: IProducts = {}, action: IProductActionTypes) => {
  switch (action.type) {
    case LOAD_PRODUCT: {
      return {...state, [action.payload.id]: action.payload};
    }
    case UPDATE_PRODUCT:
      return {...state, [action.payload.id]: action.payload};
    case DELETE_PRODUCT:
      const key: string = action.id;
      const {[key]: {}, ...withoutSecond} = state;
      return action.id ? {...withoutSecond} : state;
    default:
      return state;
  }
};

const reducers = combineReducers({
  auth: authReducer,
  product: productReducer,
  products: categoryReducer,
});

export type AppState = ReturnType<typeof reducers>;

export default reducers;
