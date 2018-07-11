import React from 'react';
import { connect } from 'react-redux';
import { ScrollView, Text } from 'react-native';
import { Ballot } from './index';

class Vote extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <ScrollView paddingTop={20} paddingBottom={20}>
        <Text>{user.firstName} Cast Your Vote!</Text>
        <Ballot />
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(Vote);
