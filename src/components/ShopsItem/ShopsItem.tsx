import React from 'react';
import style from "../../pages/ShopPage/ShopPage.module.scss";
import {IShops} from '../../store/models/Interfaces'
import {useAppDispatch, useAppSelector} from "../../store/hooks/redux";
import {changeRenderProducts} from '../../store/reducers/ActionCreators'

const ShopsItem = ({id,name,products, isActive}: IShops) => {
    const dispatch = useAppDispatch()

    const handleClick = () => {
        if (!isActive) return
        dispatch(changeRenderProducts(id))
    }

    return <li
      className={isActive ? style['shops-item'] : style['shops-item-notActive']}
      onClick={handleClick}
    >{name}</li>
};

export default ShopsItem;
