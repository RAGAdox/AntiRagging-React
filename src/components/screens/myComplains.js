import React from "react";
import {
  Text,
  RefreshControl,
  ScrollView,
  ActivityIndicator,
  View
} from "react-native";
import { NavigationEvents } from "react-navigation";
import authUser from "../services/authUser";
import { UserComplainList } from "../container";
import MyComplainContext from "../Context/myComplainContext";
import { MyComplainService } from "../services";
import { UserComplain } from "../presentation";
//import { ScrollView } from "react-native-gesture-handler";
export default class MyComplains extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      success: false,
      data: null,
      refreshing: false
    };
    this.fetchData();
  }
  fetchData() {
    MyComplainService()
      .then(result => {
        if (result != false) {
          this.setState({
            isLoading: false,
            success: true,
            data: result,
            refreshing: false
          });
        } else {
          this.setState({
            isLoading: false,
            success: false
          });
        }
      })
      .catch(result => {
        this.setState({
          isLoading: false,
          success: false
        });
      });
  }
  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.fetchData();
  };

  render() {
    if (this.state.isLoading) {
      //Loading
      return (
        <View
          style={{
            flex: 1,
            //flexDirection: "row",
            alignItem: "center",
            justifyContent: "center"
          }}
        >
          <Text style={{ fontSize: 20, textAlign: "center" }}>
            Fetching complains for {authUser.name}
          </Text>
          <ActivityIndicator size="large" color="#000000" />
        </View>
      );
    } else if (this.state.success == true) {
      return (
        <React.Fragment>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }
          >
            {this.state.data.map(item => {
              return (
                <MyComplainContext.Provider value={item} key={item._id}>
                  <UserComplain />
                </MyComplainContext.Provider>
              );
            })}
          </ScrollView>
        </React.Fragment>
      );
    } else if (this.state.success == false) {
      return (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        >
          <Text style={{ textAlign: "center", fontSize: 25 }}>
            No Complain Has Been Registered
          </Text>
        </ScrollView>
      );
    }
  }
}
