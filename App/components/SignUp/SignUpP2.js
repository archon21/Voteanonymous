import React from 'react';
import {
  View,
  ScrollView,
  ImageBackground,
  KeyboardAvoidingView
} from 'react-native';
import styles from '../../../public';
import { Button, FormInput } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';
import { occupations, genders } from '../Utility/signUpData';

export default class SignUpP2 extends React.Component {
  state = {
    occupation: '',
    gender: '',
    monthlyIncome: 0,
    age: 0,
    savingsGoal: 0
  };

  handleNextButton = () => {
    let newUserData = this.props.navigation.state.params.newUserData;
    const { navigate } = this.props.navigation;
    newUserData.push(this.state);
    navigate('SignUpP3', { newUserData });
  };

  render() {
    return (
      <ScrollView
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={styles.scrollContainer}
      >

          <KeyboardAvoidingView enabled behavior="position">
            <View style={styles.loginContainer}>
              <View style={{ alignSelf: 'center' }}>
                <Dropdown
                  label="Occupation"
                  data={occupations}
                  containerStyle={styles.signUpDropdown}
                  onChangeText={value => this.setState({ occupation: value })}
                />
              </View>
              <View style={{ alignSelf: 'center' }}>
                <Dropdown
                  label="Gender"
                  data={genders}
                  containerStyle={styles.signUpDropdown}
                  onChangeText={value => this.setState({ gender: value })}
                />
              </View>
              <View>
                <FormInput
                  errorMessage
                  keyboardType="numeric"
                  autoCapitalize="none"
                  containerStyle={styles.inputLine}
                  placeholder="Monthly Income"
                  onChangeText={value => {
                    this.setState({ monthlyIncome: value });
                  }}
                />
              </View>
              <View>
                <FormInput
                  errorMessage
                  keyboardType="numeric"
                  autoCapitalize="none"
                  containerStyle={styles.inputLine}
                  placeholder="Age"
                  onChangeText={value => {
                    this.setState({ age: value });
                  }}
                />
              </View>
              <View>
                <FormInput
                  errorMessage
                  keyboardType="numeric"
                  autoCapitalize="none"
                  containerStyle={styles.inputLine}
                  placeholder="Savings Goal"
                  onChangeText={value => {
                    this.setState({ savingsGoal: value });
                  }}
                />
              </View>
              <View>
                <Button
                  onPress={() => {
                    this.handleNextButton();
                  }}
                  title="Next 2 of 3"
                  raised={true}
                  backgroundColor="#0080ff"
                  style={styles.signUpButton}
                />
              </View>
            </View>
          </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}
