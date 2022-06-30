import React from 'react';
import style from './ShopPage.module.scss'
import Shops from "../../components/Shops";
import ShopsProducts from "../../components/ShopsProducts";

const ShopPage: React.FC = () => {
    return (
      <div className={style['shop-container']}>
          <Shops />
          <ShopsProducts />
      </div>
    );
};

export default ShopPage;
