import React from 'react';
import Modal from 'react-native-modal';
import {View} from 'react-native';
import {CustomText} from '@/components';

export const Popup = () => {
  return (
    <View>
      <Modal
        backdropColor="#B4B3DB"
        backdropOpacity={0.8}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        animationInTiming={2000}
        animationOutTiming={600}
        backdropTransitionInTiming={600}
        backdropTransitionOutTiming={600}
        isVisible={true}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <CustomText>Modal content will be here</CustomText>
        </View>
      </Modal>
    </View>
  );
};
