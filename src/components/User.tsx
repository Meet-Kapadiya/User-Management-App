import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {memo, useCallback} from 'react';
import CachedImage from './CachedImage';
import {User as UserType} from '../redux/store.types';
import {Colors} from '../theme';
import {Fonts} from '../assets';
import {useNavigation} from '@react-navigation/native';
import {AppNavigation} from '../navigation/AppNav';
import {AppScreens} from '../constants';

interface UserProps {
  item: UserType;
}

const User = (props: UserProps) => {
  const {item} = props;

  const navigation = useNavigation<AppNavigation>();

  const detailsHandler = useCallback(() => {
    navigation.navigate(AppScreens.Details, item);
  }, [item, navigation]);

  return (
    <Pressable style={styles.user} onPress={detailsHandler}>
      <CachedImage style={styles.img} image={{uri: item?.picture?.large}} />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {`${item?.name?.first} ${item?.name?.last}`}
        </Text>
        <Text style={styles.email} numberOfLines={1}>
          {item?.email}
        </Text>
      </View>
    </Pressable>
  );
};

export default memo(User);

const styles = StyleSheet.create({
  user: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    gap: 12,
    backgroundColor: Colors.blackF1F,
    borderWidth: 0.5,
    borderColor: Colors.black535,
    overflow: 'hidden',
  },
  img: {
    width: 96,
    height: 96,
  },
  info: {
    flex: 1,
    gap: 8,
  },
  name: {
    fontSize: 18,
    color: Colors.blue4FD,
    fontFamily: Fonts.Gotham500,
    textAlign: 'left',
  },
  email: {
    fontSize: 14,
    color: Colors.white,
    fontFamily: Fonts.Gotham400,
  },
});
