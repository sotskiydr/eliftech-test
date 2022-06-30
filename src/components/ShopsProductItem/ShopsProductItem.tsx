import React, {useEffect, useState} from 'react';
import style from "../../pages/ShopPage/ShopPage.module.scss";
import {IProducts} from '../../store/models/Interfaces'
import {useAppDispatch, useAppSelector} from "../../store/hooks/redux";
import {addProductToCart} from '../../store/reducers/ActionCreators'

const ShopsProductItem = ({id, name, image, price}: IProducts) => {
    const {cart} = useAppSelector(state => state.ShopsSlice)
    const [isAdded, setIsAdded] = useState<number[]>([]);
    const dispatch = useAppDispatch()

    useEffect(() => {
        const arr: React.SetStateAction<number[]> = []
        cart.cart.map(el => {
            arr.push(el.id)
        })
        setIsAdded(arr)
    }, [cart]);

    const handleClick = () => {
        dispatch(addProductToCart({id,name,image,price}))
    }

    return <li className={style.item}>
                <img className={style['item-image']} src={image} alt={name}/>
                <h4>{name}</h4>
                <p>{price + '$'}</p>
                {isAdded.includes(id) ?
                  <button disabled onClick={handleClick}>Added</button>
                  :
                  <button onClick={handleClick}>Add to cart</button>}
            </li>
};
export default ShopsProductItem;
