import React from 'react';
import style from '../../pages/HistoryPage/HistoryPage.module.scss'
import HistoryItem from "../HistoryItem";
import {useGetOrdersQuery} from "../../services/ReduxService";
import {useAppSelector} from "../../store/hooks/redux";
import CircularIndeterminate from "../Loader";

const HistoryList = () => {
    const {data, isLoading, error} = useGetOrdersQuery('')
    return (
      <ul className={style['history-list']}>
          {data && data.length > 0 ? data.map(el => {
              return <HistoryItem key={el._id} {...el}/>
          }) :
          <h1 className={style['history-title']}>Orders are not found</h1>
          }
          {isLoading && <CircularIndeterminate />}
      </ul>
    )
};

export default HistoryList;