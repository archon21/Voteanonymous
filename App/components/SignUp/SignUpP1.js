import React from 'react';
import { auth } from '../../store/Thunks/index';
import { connect } from 'react-redux';
import {
  View,
  ScrollView,
  Animated,
  ImageBackground,
  KeyboardAvoidingView
} from 'react-native';
import styles from '../../../public';
import {
  Button,
  FormInput,
  FormValidationMessage
} from 'react-native-elements';

// let newUserData = [];

class SignUpP1 extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    rePassword: '',
    error: '',
    fadeAnim: new Animated.Value(0)
  };

  componentDidMount() {
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 1000
    }).start();
  }

  handleSubmit = async (event) => {
    // event.prevault();
    await this.handleError();
    const form = (({ firstName, lastName, email, password, rePassword }) => ({
          firstName,
          lastName,
          email,
          password
        }))(this.state);
    const { popToTop } = this.props.navigation;
    await this.props.sendInfo(form, 'signup');
    alert('Account created successfully!');
    popToTop();
  };

  // handleNextButton = async () => {
  //   await this.handleError();
  //   const { navigate } = this.props.navigation;
  //   const form = (({ firstName, lastName, email, password, rePassword }) => ({
  //     firstName,
  //     lastName,
  //     email,
  //     password,
  //     rePassword
  //   }))(this.state);
  //   if (this.state.error === ' ') {
  //     newUserData.push(form);
  //     navigate('SignUpP2', { newUserData });
  //   }
  // };

  validateEmail = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  handleError = () => {
    const { firstName, lastName, email, password, rePassword } = this.state;
    if (firstName === '') {
      this.setState({ error: `First name is a required field` });
    } else if (lastName === '') {
      this.setState({ error: `Last name is a required field` });
    } else if (!this.validateEmail(email)) {
      this.setState({ error: `Please enter a valid email` });
    } else if (password !== rePassword) {
      this.setState({ error: 'Passwords Do not Match' });
    } else if (password.length < 8) {
      this.setState({ error: 'Password must be longer than 8 characters' });
    } else {
      this.setState({ error: ' ' });
    }
  };

  render() {
    let { fadeAnim } = this.state;
    return (
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Animated.View style={{ opacity: fadeAnim }}>
          <KeyboardAvoidingView enabled behavior="padding">
            <View style={styles.loginContainer}>
              <View>
                <FormInput
                  errorMessage
                  containerStyle={styles.inputLine}
                  placeholder="First Name (required)"
                  onChangeText={value => {
                    this.setState({ firstName: value });
                  }}
                />
              </View>

              <View>
                <FormInput
                  errorMessage
                  containerStyle={styles.inputLine}
                  placeholder="Last Name (required)"
                  onChangeText={value => {
                    this.setState({ lastName: value });
                  }}
                />
              </View>

              <View>
                <FormInput
                  errorMessage
                  autoCapitalize="none"
                  containerStyle={styles.inputLine}
                  placeholder="Email (required)"
                  onChangeText={value => {
                    this.setState({ email: value });
                  }}
                />
              </View>

              <View>
                <FormInput
                  secureTextEntry
                  errorMessage
                  autoCapitalize="none"
                  containerStyle={styles.inputLine}
                  placeholder="Password (required)"
                  onChangeText={value => {
                    this.setState({ password: value });
                  }}
                />
              </View>

              <View>
                <FormInput
                  secureTextEntry
                  errorMessage
                  autoCapitalize="none"
                  containerStyle={styles.inputLine}
                  placeholder="Confirm Password"
                  onChangeText={value => {
                    this.setState({ rePassword: value });
                  }}
                />
              </View>

              <View>
                <Button
                  onPress={() => {
                    // this.handleNextButton();
                    this.handleSubmit();
                  }}
                  title="Next (1 of 3)"
                  raised={true}
                  backgroundColor="#0080ff"
                  style={styles.signUpButton}
                />
              </View>
            </View>
          </KeyboardAvoidingView>
          <FormValidationMessage>{this.state.error}</FormValidationMessage>
        </Animated.View>
      </ScrollView>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  // sendInfo: (userData, formName) => dispatch(auth(userData, formName))
  sendInfo: (newUserData, formName) => dispatch(auth(newUserData, formName))
});

export default connect(
  null,
  mapDispatchToProps
)(SignUpP1);
