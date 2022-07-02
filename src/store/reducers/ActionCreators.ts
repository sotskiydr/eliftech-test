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

export const changeCartAmount = ({value, product}: ICartChange) => (dispatch: AppDispatch) => {
    dispatch(shopsSlice.actions.changeCartAmount({value, product}))
    dispatch(shopsSlice.actions.onCalcAmount())
}

export const deleteFromCart = ({id, name, image, price}: IProducts) => (dispatch: AppDispatch) => {
    dispatch(shopsSlice.actions.deleteFromCart({id, name, image, price}))
}

export const onChangeShop = () => (dispatch: AppDispatch) => {
    dispatch(shopsSlice.actions.onChangeShop())
}


