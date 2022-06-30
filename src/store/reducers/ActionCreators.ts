import {AppDispatch} from "../store";
import {authSlice} from './AuthSlice'
import {shopsSlice} from "./ShopsSlice";
import {ICartChange, IProducts} from "../models/Interfaces";
import React from "react";

export const changeStateCurrentUser = (value: boolean) => (dispatch: AppDispatch) => {
    dispatch(authSlice.actions.renderCurrentUser(value))
}

export const changeRenderProducts = (value: number) => (dispatch: AppDispatch) => {
    dispatch(shopsSlice.actions.changeRenderProducts(value))
}

export const addProductToCart = (value: IProducts) => (dispatch: AppDispatch) => {
    dispatch(shopsSlice.actions.addProductToCart(value))
}

export const changeCartAmount = ({amount, action, product}: ICartChange) => (dispatch: AppDispatch) => {
    dispatch(shopsSlice.actions.changeCartAmount({amount, action, product}))
}

export const deleteFromCart = ({id, name, image, price}: IProducts) => (dispatch: AppDispatch) => {
    dispatch(shopsSlice.actions.deleteFromCart({id, name, image, price}))
}

export const onChangeShop = () => (dispatch: AppDispatch) => {
    dispatch(shopsSlice.actions.onChangeShop())
}


