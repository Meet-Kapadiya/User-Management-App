import React, {memo, useMemo, useState} from 'react';
import {Pressable, StyleProp, StyleSheet, ViewStyle} from 'react-native';
import FastImage, {FastImageProps} from 'react-native-fast-image';
import {Images} from '../assets';
import {Colors} from '../theme';

interface ImageProps {
  style?: StyleProp<ViewStyle>;
  image?: FastImageProps['source'];
  imageStyle?: FastImageProps['style'];
  imageResizeMode?: FastImageProps['resizeMode'];
  placeholderImageStyle?: FastImageProps['style'];
  placeholderResizeMode?: FastImageProps['resizeMode'];
  placeholderContainerStyle?: StyleProp<ViewStyle>;
  placeholder?: FastImageProps['source'];
  onPress?: () => void;
}

const CachedImage = (props: ImageProps) => {
  const {
    style,
    image,
    imageStyle,
    imageResizeMode,
    placeholderImageStyle,
    placeholderResizeMode,
    placeholderContainerStyle,
    placeholder = Images.user,
    onPress,
  } = props;

  const [isLoading, setLoading] = useState(false);
  const [isErrored, setIsErrored] = useState(true);

  const renderPlaceholder = () => {
    return (
      <FastImage
        source={placeholder}
        style={[styles.image, styles.placeholderImage, placeholderImageStyle]}
        resizeMode={placeholderResizeMode ? placeholderResizeMode : 'contain'}
      />
    );
  };

  const FastImageMemoized = useMemo(() => {
    return (
      <FastImage
        source={image}
        style={[styles.image, imageStyle]}
        resizeMode={imageResizeMode ? imageResizeMode : 'cover'}
        onError={() => {
          setLoading(false);
          setIsErrored(true);
        }}
        onLoadStart={() => {
          setIsErrored(false);
          setLoading(true);
        }}
        onLoad={() => {
          setLoading(false);
        }}
      />
    );
  }, [image, imageResizeMode, imageStyle]);

  return (
    <Pressable
      style={[
        style,
        styles.imageContainer,
        (isLoading || isErrored) && [
          styles.placeholderContainer,
          placeholderContainerStyle,
        ],
      ]}
      onPress={onPress}
      disabled={!onPress}>
      {FastImageMemoized}
      {isLoading && renderPlaceholder()}
      {isErrored && renderPlaceholder()}
    </Pressable>
  );
};

CachedImage.priority = FastImage.priority;
CachedImage.resizeMode = FastImage.resizeMode;
CachedImage.cacheControl = FastImage.cacheControl;

const styles = StyleSheet.create({
  imageContainer: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    zIndex: -1,
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  placeholderContainer: {
    backgroundColor: Colors.black222,
  },
  placeholderImage: {
    width: '50%',
    height: '50%',
  },
});

export default memo(CachedImage);
