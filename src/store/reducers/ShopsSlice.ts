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
            state.shops.map((el: Interface) => {
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
            if(action.payload.action === 'add'){
                state.cart.amount += action.payload.product.price
            }
            if(action.payload.action === 'remove'){
                state.cart.amount -= action.payload.product.price
            }
            state.cart.cart.map((el, i) => {
                if(el.id === action.payload.product.id){
                    state.cart.cart[i] = {
                        ...action.payload.product,
                        amount:
                          action.payload.action === 'add' ?
                            Number(action.payload.amount) + 1
                            :
                            Number(action.payload.amount) - 1
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
    },
    extraReducers: (builder) => {
        builder
          .addMatcher(
            ReduxService.endpoints.getShops.matchFulfilled,
            (state, { payload }) => {
                state.shops = payload
            })
          // .addMatcher(
          //   ReduxService.endpoints.loginUser.matchFulfilled,
          //   (state, { payload }) => {
          //       state.token = payload.token
          //       state.isCurrentUser = true
          //   })
          // .addMatcher(
          //   ReduxService.endpoints.logout.matchRejected,
          //   (state, { payload }) => {
          //       state.token = ''
          //   })
    },
})


export default shopsSlice.reducer
