import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
  Platform
} from "react-native";
import { LinearGradient, Constants, Location, Permissions } from "expo";
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
    mainFeed: {
      screen: createScreenWithHeader(MyComplains),
      navigationOptions: {
        tabBarIcon: (
          <Image
            source={require("../assets/list.png")}
            style={{ width: 30, height: 30 }}
          />
        )
      }
    },
    complain: {
      screen: createScreenWithHeader(Complain),
      navigationOptions: {
        tabBarIcon: (
          <Image
            source={require("../assets/complain.png")}
            style={{ width: 30, height: 30 }}
          />
        )
      }
    },
    help: {
      screen: createScreenWithHeader(Help),
      navigationOptions: {
        tabBarIcon: (
          <Image
            source={require("../assets/help.png")}
            style={{ width: 30, height: 30 }}
          />
        )
      }
    }
  },
  {
    tabBarPosition: "bottom",
    tabBarOptions: {
      labelStyle: {
        fontSize: 12,
        color: "#000000"
      },
      tabStyle: {
        //width: 100,
      },
      style: {
        backgroundColor: "#ffffff",
        borrderTopWidth: 2
      },
      showIcon: true
    }
  }
);

const DrawerContent = props => (
  <View style={{ flex: 1, flexDirection: "column" }}>
    <LinearGradient
      colors={["#905DB3", "#9E3D92", "#C53766"]}
      start={[0, 0]}
      style={styles.drawerHeader}
    >
      <Image
        source={require("../assets/icon.png")}
        style={{ width: 50, height: 50 }}
      />
      <Text style={{ color: "white", fontSize: 20 }}>
        AntiRagging Application
      </Text>
    </LinearGradient>
    <DrawerItems {...props} />
    <View
      style={{
        flex: 1,

        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 10,
          flexDirection: "row"
        }}
        onPress={() => {
          logout().then(props.navigation.navigate("login"));
        }}
      >
        <Image
          source={require("../assets/logout.png")}
          style={{ width: 20, height: 20, marginHorizontal: 5 }}
        />
        <Text
          style={{
            fontSize: 20,
            marginHorizontal: 5
          }}
        >
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);
const Drawer = createDrawerNavigator(
  {
    home: {
      screen: Tab,
      navigationOptions: {
        title: "Home",
        drawerIcon: (
          <Image
            source={require("../assets/home.png")}
            style={{ width: 20, height: 20 }}
          />
        )
      }
    },
    profile: {
      screen: createScreenWithHeader(Profile),
      navigationOptions: {
        title: "Profile",
        drawerIcon: (
          <Image
            source={require("../assets/profile.png")}
            style={{ width: 20, height: 20 }}
          />
        )
      }
    }
  },
  {
    drawerType: "slide",
    overlayColor: "transparent",
    hideStatusBar: true,
    drawerWidth: 300,
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
        <View style={{ flex: 1, backgroundColor: "#00ff00" }}>
          <LinearGradient
            colors={["#905DB3", "#9E3D92", "#C53766"]}
            start={[0, 0]}
            style={styles.mainPage}
          >
            <Text
              style={{
                fontSize: 20,
                color: "#ffffff",
                textAlign: "center",
                textAlignVertical: "center"
              }}
            >
              Loading
            </Text>
            <ActivityIndicator size="large" color="#ffffff" />
          </LinearGradient>
        </View>
      );
  }
}
const styles = StyleSheet.create({
  Screen: {
    height: 100 + "%",
    width: 100 + "%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  mainPage: {
    height: 100 + "%",
    width: 100 + "%",
    flex: 1,
    //flexDirection: "row",
    justifyContent: "center"
    //alignItems: "center"
  },
  drawerHeader: {
    width: 100 + "%",
    height: 20 + "%",
    justifyContent: "center",
    alignItems: "center"
  }
});
