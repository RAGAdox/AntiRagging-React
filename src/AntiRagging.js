import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  Platform
} from "react-native";
import { Constants, Location, Permissions } from "expo";
import {
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
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
import LocationContext from "./components/Context/locationContext";
import { checkToken, logout } from "./components/services";
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
const Tab = createMaterialTopTabNavigator(
  {
    mainFeed: createScreenWithHeader(MyComplains),
    complain: createScreenWithHeader(Complain),
    help: createScreenWithHeader(Help)
  },
  {
    tabBarPosition: "bottom"
  }
);

const DrawerContent = props => (
  <View style={{ flex: 1, flexDirection: "column" }}>
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
    <View
      style={{
        flex: 1,

        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Text
        style={{
          position: "absolute",
          bottom: 0,
          fontSize: 30
        }}
        onPress={() => {
          logout().then(props.navigation.navigate("login"));
        }}
      >
        Logout
      </Text>
    </View>
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
      checked: false,
      access: false
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
  componentWillMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!",
        access: false
      });
    } else {
      console.warn("Access granted from app root complain");
      let p1 = Permissions.askAsync(Permissions.LOCATION);
      Promise.all([p1]).then(result => {
        console.warn(result[0].status);
        if (result[0].status !== "granted") {
          this.setState({
            errorMessage: "Permission to access location was denied",
            access: false
          });
        } else {
          let p2 = Location.getCurrentPositionAsync({});
          Promise.all([p2]).then(result => {
            this.setState({
              location: result[0],
              access: true
            });
          });
        }
      });
      /*if (status !== "granted") {
        this.setState({
          errorMessage: "Permission to access location was denied",
          access: false
        });
      } else {
        this.setState({
          access: true
        });
      }*/
      //this._getLocationAsync();
    }
  }
  render() {
    if (this.state.checked && this.state.access)
      return (
        <LocationContext.Provider value={this.state.location}>
          <this.AppContainer />
        </LocationContext.Provider>
      );
    else
      return (
        <View>
          <Text>Loading</Text>
        </View>
      );
  }
}
