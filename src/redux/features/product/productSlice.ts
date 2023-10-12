import {IProductItems} from "./interface.ts";
import {createSlice, Dispatch} from "@reduxjs/toolkit";
import {RootState} from "../../store.ts";
import {productsData} from "../../../lib/consts/items.ts";

/* Initial State */

const initialState = {product: [], isLoadingProducts: false, cartItems: []}

/* Interface */

export interface ProductList {
    isLoadingProducts: boolean;
    productList: IProductItems[];
}

/* Slice */

export const productsSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        start: (state) => {
            return {
                ...state,
                isLoadingProducts: true,
            };
        },
        success: (state, action) => {
            return {
                ...state,
                ...action.payload,
                isLoadingProducts: false,
            };
        },
        error: (state) => {
            return {
                ...state,
                isLoadingProducts: false,
            };
        },
    }
})

/* Methods */

export const fetchProducts = () => async (dispatch: Dispatch) => {
    dispatch(start());
    try {
        dispatch(
            success({
                product: productsData,
            }))
    } catch (err) {
        console.log(err)
    }
};

/* State */

export const selectProductLists = (state: RootState) => state.product;

/* Actions */

export const {start, success, error} = productsSlice.actions;

/* Reducer */

export const productReducer = productsSlice.reducer;