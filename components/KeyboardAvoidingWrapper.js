import React from 'react';

import { Keyboard, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { StyledContainer } from './styles';

const KeyboardAvoidingWrapper = ({ children }) => {
  return (
    <StyledContainer>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <ScrollView>
          {/* close keyboard anywhere you click */}
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>{children}</TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </StyledContainer>
  );
};

export default KeyboardAvoidingWrapper;
