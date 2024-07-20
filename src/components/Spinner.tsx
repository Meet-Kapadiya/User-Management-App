import React, {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import {ActivityIndicator, Modal, StyleSheet, View} from 'react-native';
import {Colors} from '../theme';

export interface SpinnerHandler {
  open: () => void;
  close: () => void;
}

const Spinner = forwardRef<SpinnerHandler, any>((props, ref) => {
  const [visible, setVisible] = useState(false);

  const dismissHandler = useCallback(() => {
    setVisible(false);
  }, []);

  useImperativeHandle(
    ref,
    () => {
      return {
        open: () => {
          setVisible(true);
        },
        close: dismissHandler,
      };
    },
    [dismissHandler],
  );

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      presentationStyle="overFullScreen"
      statusBarTranslucent={true}
      onRequestClose={dismissHandler}>
      <View style={styles.modalCont}>
        <ActivityIndicator size="large" color={Colors.blue4FD} />
      </View>
    </Modal>
  );
});

export default memo(Spinner);

const styles = StyleSheet.create({
  modalCont: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
});
