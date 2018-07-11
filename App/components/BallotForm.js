import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { FormLabel, CheckBox } from 'react-native-elements';

const BallotForm = props => (
  <View>
    <FormLabel>{props.party.name}</FormLabel>

    {props.party.candidates.map(candidate => {
      return <CheckBox title={candidate.label} onChange={props.handleChange} value={candidate.label} />;
    })}
  </View>
);

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  null
)(BallotForm);
