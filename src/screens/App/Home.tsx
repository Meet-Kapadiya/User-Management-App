import React, {memo, useCallback, useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {getUsers, refreshUsers, UsersState} from '../../redux/Users';
import {StoreDispatch, User as UserType} from '../../redux/store.types';
import {CustomError} from '../../utils/CustomError';
import {Colors} from '../../theme';
import User from '../../components/User';

const Home = () => {
  const dispatch = useDispatch<StoreDispatch>();
  const {bottom} = useSafeAreaInsets();
  const {users, refreshing, loading, error} = useSelector(UsersState);

  const handleLoadMore = () => {
    dispatch(getUsers());
  };

  const handleRefresh = () => {
    dispatch(refreshUsers());
  };

  const ListFooter = useCallback(() => {
    return loading ? (
      <ActivityIndicator color={Colors.blue4FD} size={'large'} />
    ) : null;
  }, [loading]);

  const renderItem = useCallback(
    ({item}: {item: UserType}) => <User item={item} />,
    [],
  );

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      CustomError(error);
    }
  }, [error]);

  return (
    <FlatList
      data={users}
      contentContainerStyle={[styles.list, {paddingBottom: bottom + 16}]}
      renderItem={renderItem}
      keyExtractor={(item, index) => index?.toString()}
      removeClippedSubviews={true}
      initialNumToRender={10}
      showsVerticalScrollIndicator={false}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={ListFooter}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          tintColor={Colors.blue4FD}
          colors={[Colors.blue4FD]}
        />
      }
    />
  );
};

export default memo(Home);

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 16,
  },
});
