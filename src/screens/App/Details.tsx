import React, {memo} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Fonts} from '../../assets';
import CachedImage from '../../components/CachedImage';
import {AppScreens} from '../../constants';
import {AppNavScreenProps} from '../../navigation/navigation.types';
import {Colors} from '../../theme';

const Details = (props: AppNavScreenProps<AppScreens.Details>) => {
  const {route} = props;

  const user = route?.params;

  const {bottom} = useSafeAreaInsets();

  return (
    <ScrollView
      contentContainerStyle={[styles.container, {paddingBottom: bottom}]}
      showsVerticalScrollIndicator={false}
      bounces={false}>
      <CachedImage image={{uri: user?.picture?.large}} style={styles.img} />
      <Text
        style={styles.name}>{` ${user?.name?.first} ${user?.name?.last}`}</Text>
      <View style={styles.separator} />
      <View style={styles.infoCont}>
        <Text style={styles.infoLabel}>{'Email: '}</Text>
        <Text style={styles.info}>{user?.email}</Text>
      </View>
      <View style={styles.infoCont}>
        <Text style={styles.infoLabel}>{'Phone: '}</Text>
        <Text style={styles.info}>{user?.phone}</Text>
      </View>
      <View style={styles.infoCont}>
        <Text style={styles.infoLabel}>{'Cell: '}</Text>
        <Text style={styles.info}>{user?.cell}</Text>
      </View>
      <View style={styles.infoCont}>
        <Text style={styles.infoLabel}>{'Location: '}</Text>
        <Text
          style={
            styles.info
          }>{`${user?.location?.street?.name} ${user?.location?.street?.number}, ${user?.location?.city}, ${user?.location?.state}, ${user?.location?.country}, ${user?.location?.postcode}`}</Text>
      </View>
      <View style={styles.infoCont}>
        <Text style={styles.infoLabel}>{'DOB: '}</Text>
        <Text style={styles.info}>{`${new Date(
          user?.dob?.date || '',
        ).toLocaleDateString()}`}</Text>
      </View>
      <View style={styles.infoCont}>
        <Text style={styles.infoLabel}>{'Nationality: '}</Text>
        <Text style={styles.info}>{user?.nat}</Text>
      </View>
    </ScrollView>
  );
};

export default memo(Details);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
  },
  img: {
    width: 248,
    height: 248,
    borderRadius: 8,
    marginBottom: 24,
    alignSelf: 'center',
  },
  name: {
    fontSize: 20,
    color: Colors.white,
    fontFamily: Fonts.Gotham700,
    textAlign: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: Colors.black939,
    marginVertical: 28,
  },
  infoCont: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 14,
    color: Colors.black0A0,
    fontFamily: Fonts.Gotham500,
  },
  info: {
    flex: 1,
    fontSize: 14,
    color: Colors.white,
    fontFamily: Fonts.Gotham400,
    textAlign: 'left',
  },
});
