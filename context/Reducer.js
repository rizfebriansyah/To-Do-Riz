import { logOut } from '../functions/FBAuth';
import { ADD_TO_CART, REMOVE_ITEM,REMOVE_ALL, SET_ALL, SET_USER, LOG_OUT} from './Types';

const Reducer = (state, action) => {
  switch (action.type) {

    // case ADD_TO_CART: {
    //   const {payload} = action;
    //   console.log(payload.qty);
    //   const finalItems = state.cartItems;
    //   let curIndex = finalItems.findIndex(item => item.id == payload.id);
    //   if (curIndex >= 0) {
    //     let info = finalItems[curIndex];
    //     info.qty = info.qty + payload.qty;
    //     finalItems[curIndex] = info;
    //   } else {
    //     finalItems.push(payload);
    //   }
    //   // let user = auth().currentUser;
    //   // if(user){
    //   //    firestore()
    //   //   .collection('Carts')
    //   //   .doc(user.uid)
    //   //   .set({...state,cartItems:finalItems},{merge:true});
    //   // }
    //   return {
    //     ...state,
    //     cartItems: finalItems,
    //   };
    // }

    // case REMOVE_ALL: {
    //   let user = auth().currentUser;
    //   if(user){
    //      firestore()
    //     .collection('Carts')
    //     .doc(user.uid)
    //     .set({...state,cartItems:[]},{merge:true});
    //   }
    //   return {
    //     ...state,
    //     cartItems: [],
    //   };
    // }

    // case SET_ALL: {
    //   return {
    //     ...state,
    //     cartItems: action.payload.data,
    //   };
    // }

    case SET_USER: {
      return {
        ...state,
        user: action.payload.data,
      };
    }
    case LOG_OUT: {
      logOut()
      return {
        ...state,
        user: {},
      };
    }

    // case REMOVE_ITEM: {
    //   const {payload} = action;
    //   let finalItems = state.cartItems;
    //   let curIndex = finalItems.findIndex(item => item.id == payload.id);
    //   let info = finalItems[curIndex];
    //   if ((info.qty > 1) && (payload.qty == 1)) {
    //     info.qty = info.qty - 1;
    //     finalItems[curIndex] = info;
    //   } else {
    //     finalItems = state.cartItems.filter(item => item.id !== payload.id);
    //   }
    //   // let user = auth().currentUser;
    //   // if(user){
    //   //    firestore()
    //   //   .collection('Carts')
    //   //   .doc(user.uid)
    //   //   .set({...state,cartItems:finalItems},{merge:true});
    //   // }
    //   return {
    //     ...state,
    //     cartItems: finalItems,
    //   };
    // }
    default:
      return state;
  }
};

export default Reducer;
