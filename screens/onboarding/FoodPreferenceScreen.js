import React, { useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import ScreenContainer from '../../components/common/ScreenContainer';
import ProgressHeader from '../../components/onboarding/ProgressHeader';
import OnboardingFooter from '../../components/onboarding/OnboardingFooter';
import Colors from '../../constants/colors';
import AppContext from '../../context/AppContext'; // 💡 Verify your context path matches

const FOOD_OPTIONS = [
  'Vegetarian',
  'Vegan',
  'Jain',
  'Eggetarian',
  'Chicken',
  'Fish',
  'Mutton',
  'North Indian',
  'South Indian',
  'Chinese',
  'Continental',
  'Rice',
  'Roti',
  'Millets',
  'Dairy',
  'Fast Food',
  'Sweets',
];

export default function FoodPreferenceScreen({ navigation }) {
  // 1. Consume global state and update function from context
  const { onboardingData, updateOnboardingData } = useContext(AppContext);
  
  // Grab the food preference array from global context
  const selectedFoods = onboardingData.food_preference || [];

  // 2. Adjust array logic and update global context instead of local state
  function toggleFood(food) {
    let updatedFoods;
    if (selectedFoods.includes(food)) {
      updatedFoods = selectedFoods.filter(item => item !== food);
    } else {
      updatedFoods = [...selectedFoods, food];
    }
    
    // Pass the modified array straight to your global state-merger
    updateOnboardingData({ food_preference: updatedFoods });
  }

  return (
    <ScreenContainer>
      <ProgressHeader
        currentStep={3}
        totalSteps={6}
        title="Food Preferences"
        subtitle="Choose everything you eat regularly."
      />

      <View style={styles.chipContainer}>
        {FOOD_OPTIONS.map(food => (
          <TouchableOpacity
            key={food}
            style={[
              styles.chip,
              selectedFoods.includes(food) && styles.selectedChip,
            ]}
            onPress={() => toggleFood(food)}
          >
            <Text
              style={[
                styles.chipText,
                selectedFoods.includes(food) && styles.selectedChipText,
              ]}
            >
              {food}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ flex: 1 }} />

      <OnboardingFooter
        onBack={() => navigation.goBack()}
        onNext={() => navigation.navigate('Medication')}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  chip: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#DDD',
    backgroundColor: '#FFF',
  },
  selectedChip: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  chipText: {
    color: Colors.text,
    fontWeight: '600',
  },
  selectedChipText: {
    color: '#FFF',
  },
});