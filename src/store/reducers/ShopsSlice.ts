import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ReduxService} from "../../services/ReduxService";
import {ICart, ICartChange, IForm, IOrder, IProducts} from '../models/Interfaces'
import React from "react";
// import { PURGE } from "redux-persist"; // для удаления токена

interface Interface {
    name: string;
    id:number;
    products: IProducts[]
}

type ShopsState = {
    shops: Interface[];
    renderProducts: IProducts[];
    currentShop: string;
    cart: ICart;
}

const initialState: ShopsState = {
    shops: [],
    renderProducts: [],
    currentShop: '',
    cart: {
        cart: [],
        amount: 0
    }
}

export const shopsSlice = createSlice({
    name: 'shopsSlice',
    initialState,
    reducers: {
        changeRenderProducts: (state, action: PayloadAction<number>) => {
            state.renderProducts = [];
            state.shops.forEach((el: Interface) => {
                if(el.id === action.payload) {
                    state.renderProducts = el.products
                    state.currentShop = el.name
                }
            })
        },
        addProductToCart: (state, action: PayloadAction<IProducts>) => {
            state.cart.amount += action.payload.price;
            state.cart.cart.push({...action.payload, amount: 1})
        },
        changeCartAmount: (state, action: PayloadAction<ICartChange>) => {
            state.cart.cart.forEach((el, i) => {
                if(el.id === action.payload.product.id){
                    state.cart.cart[i] = {
                        ...action.payload.product,
                        amount: Number(action.payload.value)
                    }
                }
            })
        },
        deleteFromCart: (state, action: PayloadAction<IProducts>) => {
            state.cart.cart = state.cart.cart.filter(el => el.id !== action.payload.id)
            state.cart.amount -= action.payload.price
        },
        onChangeShop: (state, action: PayloadAction) => {
            state.cart = {
                cart: [],
                amount: 0
            }
            state.currentShop = ''
            state.renderProducts = []
        },
        onCalcAmount: (state, action: PayloadAction) => {
            let amount = 0;
            state.cart.cart.forEach(el => {
                if(el.amount) {
                    amount += el.amount * el.price
                }
            })
            state.cart.amount = amount;
        },
    },
    extraReducers: (builder) => {
        builder
          .addMatcher(
            ReduxService.endpoints.getShops.matchFulfilled,
            (state, { payload }) => {
                state.shops = payload
            })
    },
})


export default shopsSlice.reducer
