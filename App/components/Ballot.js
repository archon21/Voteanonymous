import React, { Component } from 'react';
import { BallotForm } from './index';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { vote } from '../store/Thunks'

const parties = [
  {
    name: 'Blue Team',
    candidates: [
      {
        value: 'Marcus Aemilius Lepidus',
        label: 'Marcus Aemilius Lepidus'
      },
      {
        value: 'Marc Antony',
        label: 'Marc Antony'
      },
      {
        value: 'Augustus',
        label: 'Augustus'
      }
    ]
  },
  {
    name: 'Red Team',
    candidates: [
      {
        value: 'Toyotomi Hideyoshi',
        label: 'Toyotomi Hideyoshi'
      },
      {
        value: 'Tokugawa Ieyasu',
        label: 'Tokugawa Ieyasu'
      },
      {
        value: 'Oda Nobunaga',
        label: 'Oda Nobunaga'
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
    console.log('clicked');
    this.props.castVote(this.state.voteToBeCast, this.props.user.wallet);
  };


  handleChange = pickedCandidate => {
    this.handleReset();
    console.log(pickedCandidate)
    this.setState({
        voteToBeCast: pickedCandidate
    });
    console.log(this.state);
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

const mapDispatchToProps = dispatch => ({
  castVote: (decesion, wallet) => dispatch(vote(decesion, wallet))
})


const mapStateToProps = state => ({
  user: state.user.user
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Ballot);
