import React from 'react';
import style from "../../pages/ShoppingPage/ShoppingPage.module.scss";
import CartItem from "../CartItem";
import {useAppSelector} from "../../store/hooks/redux";

const CartList: React.FC = () => {
    const {cart} = useAppSelector(state => state.ShopsSlice)

    return (
      <div>
          <ul className={style['cart-list']}>
              {cart.cart.map(el => {
                  return <CartItem key={el.id} {...el} />
              })}
          </ul>
      </div>
    );
};

export default CartList;
