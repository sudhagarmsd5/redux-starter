import {createSlice, current, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../store.ts";
import {IProductItems} from "../product/interface.ts";

const initialState = {
    cartItems: [], cartTotal: 0, isLoading: false, isApiCallInProgress: false, apiCallSuccess: false,
    apiCallError: null
}
export const cartSlice = createSlice({
    name: 'cart', initialState, reducers: {
        start: (state) => {
            return {
                ...state,
                isLoading: true
            }
        },
        success: (state, action) => {
            return {
                ...state,
                ...action.payload,
                isLoading: false
            }
        },
        error: (state) => {
            return {...state, isLoading: false}
        },
        startApi: (state) => {
            return {
                ...state,
                isApiCallInProgress: true,
            }
        },
        successApi: (state, action) => {
            return {
                ...state,
                ...action.payload,
                isApiCallInProgress: false
            }
        },
        errorApi: (state) => {
            return {
                ...state,
                isApiCallInProgress: false
            }
        },
        addItem: (state, action: PayloadAction,) => {
            const oldState = current(state.cartItems);
            const data: any = action.payload;
            const isId = (obj: { id: string; }) => obj.id === data.id;
            const isDuplicate = oldState.some(isId)
            if (oldState.length == 0) {
                return {...state, cartItems: [...oldState, action.payload]}
            } else if (!isDuplicate) {
                return {...state, cartItems: [...oldState, action.payload]}
            }
        },
        incrementItem: (state, action) => {
            const oldState = current(state.cartItems);
            const data = action.payload;
            const quantity = oldState.map((value: IProductItems) => {
                if (value.id === data.id) {
                    return {...value, quantity: value.quantity + 1}
                }
                return value;
            })
            const finalData = oldState.map((value: IProductItems, index) => {
                if (value.id === quantity[index].id) {
                    return quantity[index]
                }
                return quantity
            })
            return {...state, cartItems: finalData}
        },
        decrementItem: (state, action) => {
            const oldState = current(state.cartItems);
            const data = action.payload;
            const quantity = oldState.map((value: IProductItems) => {
                if (value.id === data.id) {
                    if (value.quantity === 1) {
                        return {...value, quantity: 1}
                    } else {
                        return {...value, quantity: value.quantity - 1}
                    }
                }
                return value;
            })

            const finalData = oldState.map((value: IProductItems, index) => {
                if (value.id === quantity[index].id) {
                    return quantity[index]
                }
                return quantity
            })
            return {...state, cartItems: [...finalData]}
        },
        clearItems: (state,) => {
            return {...state, cartItems: []}
        },
        removeItem: (state, action) => {
            const oldState = current(state.cartItems);
            const data = action.payload;
            const finalData = oldState.filter((value: IProductItems) => {
                return value.id !== data.id
            })
            return {...state, cartItems: finalData}

        }
    }
})

export const selectCartList = (state: RootState) => state.cart

export const {
    addItem, incrementItem, decrementItem, clearItems, removeItem
}
    = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
