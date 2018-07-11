import { ScrollView, View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import {  Loading } from './';
import styles from '../../public';
import React, { Component } from 'react';
// import ActionButton from 'react-native-action-button';
import { me } from '../store/Thunks';
import Firebase from './Firebase/Firebase';

class Home extends Component {
  async componentDidMount() {
    const user = await Firebase.auth.currentUser;
    await this.props.me(user);
  }


  render() {
    const { user, navigate } = this.props;
    const firstName = user ? `, ${user.firstName}` : ``;
    return (
      <View style={styles.homeContainer}>
        <ScrollView style={{ paddingTop: 10 }}>
          <Text style={styles.thinTitle}>Welcome{firstName}!</Text>

        <Button
                  onPress={() => navigate('Vote')}
                  title="Go To Vote"
                  raised={true}
                  backgroundColor="#0080ff"
                  style={styles.wideButton}
                />
        </ScrollView>

        {/* <ActionButton
          buttonColor="rgba(231,76,60,1)"
          style={styles.actionButton}
        >
          <ActionButton.Item
            buttonColor="#3498db"
            title="Barcode"
            onPress={() => navigate('BarcodeScanner', { user })}
          >
            <Icon name="ios-barcode" size={30} />
          </ActionButton.Item>

          <ActionButton.Item
            buttonColor="#3498db"
            title="Camera"
            onPress={async () => {
              Permissions.askAsync(Permissions.CAMERA);
              Permissions.askAsync(Permissions.CAMERA_ROLL);
              const image = await ImagePicker.launchCameraAsync({
                allowsEditing: true
              });

              if (!image.cancelled) navigate('TakenImage', { uri: image.uri });
            }}
          >
            <Icon name="ios-camera" size={30} />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#3498db"
            title="Keyboard"
            onPress={() => navigate('Purchase')}
          >
            <Icon name="ios-keypad" size={30} />
          </ActionButton.Item>
        </ActionButton> */}
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  me: user => dispatch(me(user))
});

export default connect(
  null,
  mapDispatchToProps
)(Home);
