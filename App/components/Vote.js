import React from 'react';
import { connect } from 'react-redux';
import { ScrollView, View, Text, Button } from 'react-native';
import { Ballot } from './index';
import styles from '../../public'


class Vote extends React.Component {


  render() {
    const { user } = this.props;
    return (
      <View style={styles.homeContainer}>
      <ScrollView >
        <Text style={styles.voteHelperText}>{user.firstName} Cast Your Vote!</Text>
        <Ballot />

      </ScrollView>
      </View>
    );
  }
}


const mapStateToProps = state => ({
  user: state.user.user
});

export default connect(mapStateToProps)(Vote);
