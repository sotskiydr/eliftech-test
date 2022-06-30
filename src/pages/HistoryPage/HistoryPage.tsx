import React from 'react';
import style from './HistoryPage.module.scss'
import HistoryList from '../../components/HistoryList'

const HistoryPage: React.FC = () => {
    return (
      <div className={style['history-box']}>
          <HistoryList />
      </div>
    );
};

export default HistoryPage;
