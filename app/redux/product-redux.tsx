import {createActions, createReducer} from 'reduxsauce';
import Immutable from 'seamless-immutable';
import _ from 'lodash';

/* ------------- Types and Action Creators ------------- */
const {Types, Creators} = createActions({
  getProductRequest: ['success', 'failure'],
  getProductSuccess: ['getProductRp'],
  getProductFailure: ['getProductErr'],

  addProductToCart: ['product'],
  removeProductFromCart: ['product']
});

export const ProductTypes = Types;
export default Creators;

export interface ProductStateTypes {
  products: object;
  isFetchingGetProducts: boolean;
  errorGetProducts: null | string;

  cartList: any;

  merge: (params: object) => any;
}

/* ------------- Initial State ------------- */
export const INITIAL_STATE: ProductStateTypes = Immutable({
  products: [],
  cartList: [],

  isFetchingGetProducts: false,
  errorGetProducts: null,
});

/* ------------- Reducers ------------- */
// get product
export const getProductRequest = (state: ProductStateTypes) => {
  return state.merge({
    isFetchingGetProducts: true,
  });
};
export const getProductSuccess = (
  state: ProductStateTypes,
  {getProductRp}: any,
) => {
  return state.merge({
    isFetchingGetProducts: false,
    products: getProductRp,
  });
};
export const getProductFailure = (
  state: ProductStateTypes,
  {getProductErr}: any,
) => {
  return state.merge({
    isFetchingGetProducts: false,
    errorGetProducts: getProductErr,
  });
};

// add cart list
export const addProductToCart = (state: ProductStateTypes, {product}: any) => {
  const currentCartList = state?.cartList;

  // check is exist item in cart
  const isExistItem = currentCartList?.find(
    (item: any) => item?.product?.id === product?.product?.id,
  );

  // handle cart
  let handleCartList: any = [];
  if (isExistItem) {
    handleCartList = currentCartList.map((item: any) => {
      if (item?.product?.id === isExistItem?.product?.id) {
        return {
          ...item,
          quantity: product?.quantity,
        };
      } else {
        return item
      }
    });
  } else {
    handleCartList = [
      ...currentCartList,
      {
        product: product?.product,
        quantity: product?.quantity,
      },
    ];
  }

  return state.merge({
    ...state,
    cartList: handleCartList
  });
};

// remove cart item
export const removeProductFromCart = (
  state: ProductStateTypes,
  {product}: any,
) => {
  const currentCartList = state?.cartList;

  const handleRemoveList = currentCartList?.filter(
    (item: any) => item?.product?.id !== product?.product?.product?.id,
  );

  return state.merge({
    ...state,
    cartList: handleRemoveList
  });
};

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_PRODUCT_REQUEST]: getProductRequest,
  [Types.GET_PRODUCT_SUCCESS]: getProductSuccess,
  [Types.GET_PRODUCT_FAILURE]: getProductFailure,

  [Types.ADD_PRODUCT_TO_CART]: addProductToCart,
  [Types.REMOVE_PRODUCT_FROM_CART]: removeProductFromCart,
});
