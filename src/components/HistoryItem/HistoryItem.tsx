import React from 'react';
import style from '../../pages/HistoryPage/HistoryPage.module.scss'
import {IGetCartOrder, IMakeCartOrder} from "../../store/models/Interfaces";

const HistoryItem = ({_id, name, cart, phone, email, address}:IGetCartOrder) => {
    return (
      <li className={style['history-item']}>
          <ul className={style['item-list']}>
              {cart && cart.cart.map(el => {
                  return (
                    <li key={el.id} className={style['list-item']}>
                        <img src={el.image} alt={el.name} className={style['list-item_img']}/>
                        <div className={style['list-item_description']}>
                            <p className={style['description']}>{el.name}</p>
                            <p className={style['description']}>price: {el.price}$</p>
                            <p className={style['description']}>amount: {el.amount}</p>
                        </div>
                    </li>
                  )
              })}
          </ul>
          <div className={style['item-price']}>Total price: {cart.amount}$</div>
      </li>
    );
};

export default HistoryItem;
