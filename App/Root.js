import React from 'react';
import { View } from 'react-native';
import {
  Home,
  Login,
  Navigation,
  Menu,
  Loading
} from './components';
import { connect } from 'react-redux';
import { me } from './store/Thunks';
import styles from '../public';
import Drawer from 'react-native-drawer';

class Root extends React.Component {
  state = {
    isLoggedIn: false,
    loading: true
  };
  async componentDidMount() {
    const {me, user} = this.props
    await me()
    console.log(!user.id)
    !user.id
      ? this.setState({ isLoggedIn: false, loading: false })
      : this.setState({ isLoggedIn: true, loading: false });
    // console.log(this.props.user);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

    closeMenu = () => {
      this._drawer.close();
    };

    openMenu = () => {
      this._drawer.open();
    };

  render() {
    const drawerStyles = {
      drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3 },
      main: { paddingLeft: 3 }
    };
    const { navigate } = this.props.navigation;

    if (this.state.loading) {
      return <Loading />;
    } else if (this.props.user.id) {
      return (
        <Drawer
          ref={ref => (this._drawer = ref)}
          type="displace"
          content={
            <Menu
              navigate={navigate}
              purchases={this.props.purchases}
              recurringExpenses={this.props.recurringExpenses}
              hi="hi"
            />
          }
          tapToClose={true}
          openDrawerOffset={0.3}
          panCloseMask={0.2}
          closedDrawerOffset={-3}
          styles={drawerStyles}
          tweenHandler={ratio => ({
            main: { opacity: (2 - ratio) / 2 }
          })}
        >
        <View style={{ flex: 1 }}>
          <Navigation navigate={navigate} openMenu={this.openMenu} />
          <Home navigate={navigate} user={this.props.user} />
        </View>
        //
        </Drawer>
      );
    } else {
      return <Login navigate={navigate} />;
    }
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user
  };
};

const mapDispatchToProps = dispatch => ({
  me: () => dispatch(me())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Root);
