import React from "react";
import { Text, RefreshControl, ScrollView } from "react-native";
import { NavigationEvents } from "react-navigation";

import authUser from "../services/authUser";
import { UserComplainList } from "../container";
import { MyComplainService } from "../services";
import { fetchUpdateAsync } from "expo/build/Updates/Updates";
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
        //console.warn(result);
        if (result != false) {
          console.warn(result);
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
        console.warn("rejected");
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
      return <Text>This is MyComplains {authUser.username}</Text>;
    } else if (this.state.success == true) {
      return (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        >
          <UserComplainList ComplainData={this.state.data} />
        </ScrollView>
      );
    } else if (this.state.success == false) {
      return (
        <Text style={{ textAlign: "center", fontSize: 25 }}>
          No Complain Has Been Registered
        </Text>
      );
    }
  }
}
