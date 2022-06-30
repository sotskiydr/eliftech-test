import React, {ChangeEvent, useState} from 'react';
import style from "../../pages/ShoppingPage/ShoppingPage.module.scss";
import {IProducts} from "../../store/models/Interfaces";
import {useAppDispatch} from "../../store/hooks/redux";
import {changeCartAmount, deleteFromCart} from '../../store/reducers/ActionCreators'

const CartItem = ({id, name, image, price}: IProducts) => {
    const dispatch = useAppDispatch()
    const [amount, setAmount] = useState(1);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value as unknown as number;
        if (value < 0) return
        setAmount(value)
        if(Number(value) > amount){
            dispatch(changeCartAmount(
              {amount, action: 'add',product: {id, name, image, price}})
            )
        }else{
            dispatch(changeCartAmount(
              {amount, action: 'remove',product: {id, name, image, price}})
            )
        }
    }

    const handleDelete = () => {
        dispatch(deleteFromCart({id, name, image, price: price*amount}))
    }

    return (
      <li className={style['cart-item']}>
          <img className={style['cart-item_img']}
               src={image} alt={name}/>
          <div className={style['cart-item_box']}>
              <p className={style['cart-item_title']}>{name}</p>
              <p className={style['cart-item_price']}>{price + '$'}</p>
              <input
                className={style['cart-item_input']}
                onChange={handleChange}
                value={amount}
                type="number"
              />
          </div>
          <button onClick={handleDelete}>Delete</button>
      </li>
    );
};

export default CartItem;
