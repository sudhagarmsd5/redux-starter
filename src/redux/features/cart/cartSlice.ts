import {createSlice, current} from "@reduxjs/toolkit";
import {RootState} from "../../store.ts";

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
        error: (state, action) => {
            return {...state, isLoading: false}
        },
        startApi: (state) => {
            return {
                ...state,
                isApiCallInProgress: true,
            }
        },
        sucessApi: (state, action) => {
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
        addItem: (state, action,) => {
            let oldState = current(state.cartItems);
            let data = action.payload;
            const isId = obj => obj.id === data.id;
            let isDuplicate = oldState.some(isId)
            if (oldState.length == 0) {
                return {...state, cartItems: [...oldState, action.payload]}
            } else if (!isDuplicate) {
                return {...state, cartItems: [...oldState, action.payload]}
            }
        },
        incrementItem: (state, action) => {
            let oldState = current(state.cartItems);
            let data = action.payload;
            let quantity = oldState.map((value) => {
                if (value.id === data.id) {
                    return {...value, quantity: value.quantity + 1}
                }
                return value;
            })
            let finalData = oldState.map((value, index) => {
                if (value.id === quantity[index].id) {
                    return quantity[index]
                }
                return quantity
            })
            return {...state, cartItems: finalData}
        },
        decrementItem: (state, action) => {
            let oldState = current(state.cartItems);
            let data = action.payload;
            let quantity = oldState.map((value) => {
                if (value.id === data.id) {
                    if (value.quantity === 1) {
                        return {...value, quantity: 1}
                    } else {
                        return {...value, quantity: value.quantity - 1}
                    }
                }
                return value;
            })

            let finalData = oldState.map((value, index) => {
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
            let oldState = current(state.cartItems);
            let data = action.payload;
            let finalData = oldState.filter((value, index) => {
                return value.id !== data.id
            })
            return {...state, cartItems: finalData}

        }
    }
})

export const selectCartList = (state: RootState) => state.cart

export const {start, success, error, startApi, sucessApi, errorApi, addItem, incrementItem, decrementItem, clearItems, removeItem} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
