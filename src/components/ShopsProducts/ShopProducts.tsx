import React from 'react';
import style from "../../pages/ShopPage/ShopPage.module.scss";
import ShopsProductItem from "../ShopsProductItem";
import {useAppSelector} from "../../store/hooks/redux";
import {IProducts} from '../../store/models/Interfaces'


const ShopsProducts: React.FC = () => {
    const {renderProducts} = useAppSelector(state => state.ShopsSlice)
    
    return (
      <div className={style.items}>
          <ul className={style['items-list']}>
              {
                  renderProducts.length > 0 ?
                    renderProducts.map((el: IProducts) => {
                        return <ShopsProductItem key={el.id} {...el} />
                    })
                    :
                    <h1 className={style.title}>Choose any store</h1>
              }
          </ul>
      </div>
    );
};

export default ShopsProducts;
