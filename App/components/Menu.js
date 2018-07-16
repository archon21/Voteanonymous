
import React from 'react';
import { ScrollView, View, Text, TouchableHighlight } from 'react-native';
import styles from '../../public';
import { connect } from 'react-redux';
import { logout } from '../store/Thunks';


const Menu = props => {
  const {  navigate } = props;
  return (
    <ScrollView style={styles.menu}>
      <TouchableHighlight
        onPress={() => props.logout()}
        style={styles.menuLinks}
      >
        <Text style={styles.menuLinkText}>Logout</Text>
      </TouchableHighlight>
    </ScrollView>
  );
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});
export default connect(
  null,
  mapDispatchToProps
)(Menu);
