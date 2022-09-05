import React from 'react';
import {useReducer} from 'react';
import Context from './Context';
import Reducer from './Reducer';
import { ADD_TO_CART, REMOVE_ITEM,REMOVE_ALL, SET_ALL,SET_USER,LOG_OUT} from './Types';

const CartState = ({children}) => {
  const initialState = {
    cartItems: [],
    user:{}
  };
  const [state, dispatch] = useReducer(Reducer, initialState);
  const addToCart = (item,qty=1) => {
    dispatch({type: ADD_TO_CART, payload: {...item,qty}});
  };
  const removeItem = (id,qty=1) => {
    dispatch({type: REMOVE_ITEM, payload: {id,qty}});
  };
  const removeAll = () => {
    dispatch({type: REMOVE_ALL });
  };
  const setAll = (data) => {
    dispatch({type: SET_ALL,payload:{data} });
  };
  const setUser = (data) => {
    dispatch({type: SET_USER,payload:{data} });
  };
  const logOut = (data) => {
    dispatch({type: LOG_OUT });
  };
  return (
    <Context.Provider
      value={{
        // showCart: state.showCart,
        // cartItems: state.cartItems,
        user: state.user,
        // addToCart,
        setUser,
        logOut,
        // removeItem,
        // removeAll,setAll,
      }}>
      {children}
    </Context.Provider>
  );
};

export default CartState;
