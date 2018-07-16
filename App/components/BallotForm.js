import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { FormLabel, CheckBox, Button } from 'react-native-elements';

const BallotForm = props => (

  <View>
    <FormLabel>{props.party.name}</FormLabel>

    {props.party.candidates.map(candidate => {
      return (
        <CheckBox
          title={candidate.label}
          checked={(() => {
            if (props.voteToBeCast === candidate.label) return true
            else return false
          })()}
          onPress={() => props.handleChange(candidate.label)}
        />
      );
    })}

  </View>
);


const mapStateToProps = state => ({
  user: state.user.user
});

export default connect(
  mapStateToProps,
  null
)(BallotForm);
