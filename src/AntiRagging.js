import React from "react";
import { View, Text, Image, TouchableOpacity, StatusBar } from "react-native";
import {
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator,
  createAppContainer,
  createDrawerNavigator,
  DrawerItems,
  DrawerActions
} from "react-navigation";
import {
  Login,
  Register,
  MyComplains,
  Complain,
  Help,
  Profile
} from "./components/screens";
import { checkToken } from "./components/services";
class NavigationDrawerStructure extends React.Component {
  //Structure for the navigatin Drawer
  toggleDrawer = () => {
    //Props to open/close the drawer
    this.props.navigationProps.toggleDrawer();
  };
  render() {
    return (
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          <Image
            source={require("../assets/menu.png")}
            style={{ width: 25, height: 25, marginLeft: 5 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
function createScreenWithHeader(Screen) {
  return createStackNavigator(
    {
      screen: Screen
    },
    {
      headerMode: "float",
      defaultNavigationOptions: ({ navigation }) => ({
        title: "AntiRagging Application",
        headerLeft: <NavigationDrawerStructure navigationProps={navigation} />
      })
    }
  );
}
const Tab = createBottomTabNavigator({
  mainFeed: createScreenWithHeader(MyComplains),
  complain: createScreenWithHeader(Complain),
  help: createScreenWithHeader(Help)
});

const DrawerContent = props => (
  <View>
    <View
      style={{
        backgroundColor: "#f50057",
        height: 140,
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Text style={{ color: "white", fontSize: 30 }}>Header</Text>
    </View>
    <DrawerItems {...props} />
  </View>
);
const Drawer = createDrawerNavigator(
  {
    home: { screen: Tab },
    profile: createScreenWithHeader(Profile)
  },
  {
    drawerType: "slide",
    contentComponent: DrawerContent,
    contentOptions: {
      activeTintColor: "#e91e63",
      itemsContainerStyle: {
        marginVertical: 0
      },
      iconContainerStyle: {
        opacity: 1
      }
    }
  }
);
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
const showHome = createSwitchNavigator(
  {
    home: Drawer,
    login: Stack
  },
  {
    initialRouteName: "home"
  }
);
const showLogin = createSwitchNavigator(
  {
    home: Drawer,
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
          this.AppContainer = createAppContainer(showHome);
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
