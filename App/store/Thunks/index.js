import axios from 'axios';
import uuidV1 from 'uuid/v1';

//Initial State

const defaultUser = {};

const defaultState = {
  user: defaultUser,
  vote: false
};

//Constants
const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';
const USER_VOTED = 'USER_VOTED';

//Utility
//

//Action Creators
const gotUser = user => ({ type: GET_USER, user });
const userVoted = vote => ({ type: USER_VOTED, vote });
const removedUser = () => ({ type: REMOVE_USER });

export const me = () => dispatch => {

  axios
    .get('http://192.168.1.32:8080/auth/me')
    .then(res => {
        dispatch(gotUser(res.data || {}));

    })
    .catch(err => console.log(err));
}

export const auth = (userData, method) => dispatch => {
  axios
    .post(`http://192.168.1.32:8080/auth/${method}`, {userData})
    .then(
      res => {
        dispatch(gotUser(res.data));
      },
      authError => {
        // rare example: a good use case for parallel (non-catch) error handler
        dispatch(gotUser({ error: authError }));
      }
    )
    .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr));
}

export const logout = () => dispatch =>
  axios
    .post('http://192.168.1.32:8080/auth/logout')
    .then(_ => {
      dispatch(removedUser());
      history.push('/login');
    })
    .catch(err => console.log(err));


export const vote = (ballot, wallet) => dispatch => {
  wallet = JSON.parse(wallet)
  if (wallet.balance > 1) {
    axios
      .post('http://192.168.1.32:8080/api/wallet/mine', { wallet, ballot })
      .then(res => dispatch(userVoted(ballot)))
      .catch(err => console.error(err));
  } else {
    dispatch(userVoted({ vote: 'you have no votes left' }));
  }
};

export default function(state = defaultState, action) {
  console.log(action)
  switch (action.type) {
    case GET_USER:
      return { ...state, user: action.user };
    case REMOVE_USER:
      return defaultState;
    case USER_VOTED:
      return { ...state, user: { ...state.user, voted: true } };

    default:
      return state;
  }
}
