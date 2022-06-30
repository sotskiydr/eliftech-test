import React, {ChangeEvent, useState} from 'react';
import style from "../../pages/ShoppingPage/ShoppingPage.module.scss";
import {IProducts} from "../../store/models/Interfaces";
import {useAppDispatch} from "../../store/hooks/redux";
import {changeCartAmount, deleteFromCart} from '../../store/reducers/ActionCreators'


const CartItem = ({id, name, image, price, amount}: IProducts) => {
    const dispatch = useAppDispatch()
    const [currentAmount, setAmount] = useState(Number(amount));

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value as unknown as number;
        if (value < 0) return
        setAmount(Number(value))
        const num = value * price;
        if(Number(value) > currentAmount){
            dispatch(changeCartAmount(
              {currentAmount, num, action: 'add',product: {id, name, image, price}})
            )
        }else{
            dispatch(changeCartAmount(
              {currentAmount, num, action: 'remove',product: {id, name, image, price}})
            )
        }
    }

    const handleDelete = () => {
        dispatch(deleteFromCart({id, name, image, price: price*currentAmount}))
    }

    return (
      <li className={style['cart-item']}>
          <img className={style['cart-item_img']}
               src={image} alt={name}/>
          <div className={style['cart-item_box']}>
              <p className={style['cart-item_title']}>{name}</p>
              <p className={style['cart-item_price']}>{price + '$'}</p>
          </div>
          <input
            className={style['cart-item_input']}
            onChange={handleChange}
            value={amount}
            type="number"

          />
          <button onClick={handleDelete}>Delete</button>
      </li>
    );
};

export default CartItem;
