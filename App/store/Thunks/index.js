import axios from 'axios';
import uuidV1 from 'uuid/v1';
import Firebase from '../../components/Firebase/Firebase';


//Initial State

const defaultUser = {};


const defaultState = {

  user: defaultUser,

};

//Constants
const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';


//Utility
//

//Action Creators
const gotUser = user => ({ type: GET_USER, user });

const removedUser = () => ({ type: REMOVE_USER });

//Thunks for initial data fetch (all fields)
export const me = user => async dispatch => {
  try {
    const data = await Firebase.database
      .ref(`users/${user.uid}`)
      .once('value')
      .then(snapshot => {
        return snapshot.val();
      });

    dispatch(
      gotUser({
        uid: user.uid,
        userInfo: data.userData
      })
    );

  } catch (err) {
    console.error(err);
  }
};

export const auth = (userData, method) => async dispatch => {
  try {
    if (method === 'signup') {
      const user = await Firebase.auth.createUserWithEmailAndPassword(
        userData[0].email,
        userData[0].password
      );
      Firebase.database.ref(`users/${user.user.uid}`).set({
        userData: {
          uid: user.user.uid,
          email: userData[0].email,
          firstName: userData[0].firstName,
          lastName: userData[0].lastName,
          ...userData[1]
        },
        recurringExpenses: {
          ...userData[2]
        }
      });
      dispatch(gotUser(user.user.uid));
    } else {
      const user = await Firebase.auth.signInWithEmailAndPassword(
        userData.email,
        userData.password
      );
      const data = await Firebase.database
        .ref(`users/${user.user.uid}`)
        .once('value')
        .then(snapshot => {
          return snapshot.val();
        });

      dispatch(
        gotUser({
          uid: user.user.uid,
          userInfo: data.userData
        })
      );

    }
  } catch (err) {
    return 'Invalid Username or Password';
  }
};
export const logout = () => dispatch => {
  Firebase.auth
    .signOut()
    .then(() => dispatch(removedUser()))
    .catch(err => console.error(err));
};






export default function(state = defaultState, action) {
  switch (action.type) {
    case GET_USER:
      return { ...state, user: action.user };
    case REMOVE_USER:
      return defaultState;

    default:
      return state;
  }
}
