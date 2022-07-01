import React from 'react';
import style from "../../pages/ShopPage/ShopPage.module.scss";
import ShopsItem from "../ShopsItem";
import {useGetShopsQuery} from "../../services/ReduxService";
import {IShops} from '../../store/models/Interfaces'
import {useAppDispatch, useAppSelector} from "../../store/hooks/redux";
import {onChangeShop} from '../../store/reducers/ActionCreators'
import CircularIndeterminate from "../Loader";

const Shops: React.FC = () => {
    const dispatch = useAppDispatch()
    const {data, isLoading, error} = useGetShopsQuery('')
    const {currentShop} = useAppSelector(state => state.ShopsSlice)

    const changeShop = () => {
        dispatch(onChangeShop())
    }

    return (
      <div className={style.shops}>
          <h3 className={style['shops-title']}>Shops: </h3>
          <ul className={style['shops-list']}>
              {data && data.map((el: IShops) => {
                  if(el.name === currentShop || currentShop === '') {
                    return <ShopsItem key={el.id} {...el} isActive={true}/>
                  }else{
                      return <ShopsItem key={el.id}  {...el} isActive={false} />
                  }
              })}
              <li>
                  <button
                    onClick={changeShop}
                    className={style['choose-btn']}
                  >
                      Change shop and delete cart
                  </button>
              </li>
          </ul>
          {isLoading && <CircularIndeterminate />}
      </div>
    );
};

export default Shops;
