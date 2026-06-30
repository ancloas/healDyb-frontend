import React from 'react';
import { View, StyleSheet } from 'react-native';

import PrimaryButton from '../common/PrimaryButton';
import SecondaryButton from '../common/SecondaryButton';

export default function OnboardingFooter({
  onNext,
  onBack,
  nextTitle = 'Continue',
  backTitle = 'Back',
  hideBack = false,
}) {
  return (
    <View style={styles.container}>

      {!hideBack && (
        <SecondaryButton
          title={backTitle}
          onPress={onBack}
          style={styles.backButton}
        />
      )}

      <PrimaryButton
        title={nextTitle}
        onPress={onNext}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 32,
  },

  backButton: {
    marginRight: 12,
    flex: 1,
  },

});