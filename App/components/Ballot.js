import React, { Component } from 'react';
import { BallotForm } from './index';
// import { vote } from '../store'
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

const parties = [
  {
    name: 'Blue Team',
    candidates: [
      {
        value: 'Caligula',
        label: 'Caligula'
      },
      {
        value: 'Nero',
        label: 'Nero'
      },
      {
        value: 'Augustus',
        label: 'Augustus'
      }
    ]
  },
  {
    name: 'Blue Team',
    candidates: [
      {
        value: 'Caligula',
        label: 'Caligula'
      },
      {
        value: 'Nero',
        label: 'Nero'
      },
      {
        value: 'Augustus',
        label: 'Augustus'
      }
    ]
  },
  {
    name: 'Blue Team',
    candidates: [
      {
        value: 'Caligula',
        label: 'Caligula'
      },
      {
        value: 'Nero',
        label: 'Nero'
      },
      {
        value: 'Augustus',
        label: 'Augustus'
      }
    ]
  }
];

class Ballot extends Component {
  state = {
    voteToBeCast: ''
  };

  handleSubmit = () => {
    event.preventDefault();
    console.log('clicked');
    this.props.castVote(this.state.voteToBeCast);
  };

  handleChange = event => {
    console.log(this.state);
    this.setState({
      voteToBeCast: event.target.value
    });
  };

  handleReset = () => {
    this.setState({
      voteToBeCast: ''
    });
  };

  render() {
    console.log(this.props);
    return (
      <View>
        {parties.map(party => {
          return (
            <BallotForm
              key={parties.name}
              handleChange={this.handleChange}
              voteToBeCast={this.state.voteToBeCast}
              party={party}
            />
          );
        })}
        <Button
          onPress={this.handleSubmit}
          title="Cast Your Vote"
          raised={true}
          backgroundColor="#0080ff"
          style={styles.wideButton}
        />
      </View>
    );
  }
}

// const mapDispatchToProps = dispatch => ({
//     castVote: decesion => dispatch(vote(decesion))
// })
export default connect(
  null,
  null
)(Ballot);
