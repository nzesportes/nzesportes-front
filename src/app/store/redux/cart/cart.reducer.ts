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
  let newCartList = [];
  switch (action.type) {
    case CartActionsType.ADD_ITEM_CART:
      newCartList = [...state.items, action.payload];
      return {
        ...state,
        items: newCartList
      };

    case CartActionsType.REMOVE_ITEM_CART:
      newCartList = state.items.filter(item => {
        // @ts-ignore
        return item.id !== action.payload.id;
      });

      return {
        ...state,
        items: newCartList
      };

    default:
      return state;
  }
}
