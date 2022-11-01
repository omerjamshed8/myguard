import React from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import {Colors} from 'theme';

const CommonModal = ({isVisible, onClose, component}) => {
  return (
    <Modal
      transparent
      visible={isVisible}
      onRequestClose={onClose}
      animationType="slide">
      <View style={styles.container}>
        <View style={styles.innerContainer}>{component}</View>
      </View>
    </Modal>
  );
};

export default CommonModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.overlay,
  },
  innerContainer: {
    width: '85%',
    backgroundColor: Colors.white,
    borderRadius: 20,
    maxHeight: '50%',
  },
});
