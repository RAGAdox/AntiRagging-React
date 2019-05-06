import React from "react";
import { View, Text, StatusBar } from "react-native";
import {
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator,
  createAppContainer
} from "react-navigation";
import {
  Login,
  Register,
  MyComplains,
  Complain,
  Help
} from "./components/screens";
import { checkToken } from "./components/services";

const Tab = createBottomTabNavigator({
  mainFeed: MyComplains,
  complain: Complain,
  help: Help
});
const Stack = createStackNavigator(
  {
    login: {
      screen: Login,
      navigationOptions: () => ({
        title: `Login`
      })
    },
    register: {
      screen: Register,
      navigationOptions: () => ({
        title: `Create New Account`
      })
    }
  },
  {
    headerMode: "float",
    mode: "card",
    cardOverlayEnabled: true,
    headerLayoutPreset: "center"
  }
);
const showTab = createSwitchNavigator(
  {
    mainTabs: Tab,
    login: Stack
  },
  {
    initialRouteName: "mainTabs"
  }
);
const showLogin = createSwitchNavigator(
  {
    mainTabs: Tab,
    login: Stack
  },
  {
    initialRouteName: "login"
  }
);
//let AppContainer = createAppContainer(showLogin);

export default class AntiRagging extends React.Component {
  AppContainer;
  constructor(props) {
    super(props);
    this.state = {
      isloggedin: "",
      checked: false
    };
    checkToken()
      .then(result => {
        if (result == true) {
          this.AppContainer = createAppContainer(showTab);
          this.setState({
            isloggedin: true,
            checked: true
          });
        } else {
          this.AppContainer = createAppContainer(showLogin);
          this.setState({
            isloggedin: false,
            checked: true
          });
        }
        console.warn("then working" + result);
      })
      .catch(() => {
        this.AppContainer = createAppContainer(showLogin);
        this.setState({
          isloggedin: false,
          checked: true
        });
      });
  }
  render() {
    if (this.state.checked) return <this.AppContainer />;
    else
      return (
        <View>
          <Text>Loading</Text>
        </View>
      );
  }
}
