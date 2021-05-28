import {CartState} from './cart.state';
import {CartActionsType} from './cart.actions';

const initialState = {
  items: [],
  loading: false,
  error: undefined
};

export function cartReducer(
  state = initialState,
  action: { type: any; payload: any; }
): CartState {
  const statusCart = localStorage.getItem('state');
  const newInitialState = (statusCart && JSON.parse(statusCart)) ?? initialState;
  switch (action.type) {
    case CartActionsType.ADD_ITEM_CART:
      const newCartList = [...state.items, action.payload];
      return {
        ...state,
        items: newCartList
      };

    default:
      return state;
  }
}
