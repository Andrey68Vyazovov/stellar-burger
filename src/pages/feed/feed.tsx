import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getOrders,
  loadAllOrders,
  getIsOrderLoading
} from '../../services/slices/ordersSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const isLoading: boolean = useSelector(getIsOrderLoading);

  let orders: TOrder[] = useSelector(getOrders);

  useEffect(() => {
    dispatch(loadAllOrders());
  }, []);

  if (isLoading) {
    return <Preloader />;
  }
  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(loadAllOrders());
      }}
    />
  );
};
