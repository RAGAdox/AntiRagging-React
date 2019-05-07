import React from "react";
import { Text } from "react-native";
import authUser from "../services/authUser";
import { UserComplainList } from "../container";
import { MyComplainService } from "../services";
export default class MyComplains extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      success: false,
      data: null
    };
    MyComplainService()
      .then(result => {
        //console.warn(result);
        if (result != false) {
          console.warn(result);
          this.setState({
            isLoading: false,
            success: true,
            data: result
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
  render() {
    if (this.state.isLoading) {
      //Loading
      return <Text>This is MyComplains {authUser.username}</Text>;
    } else if (this.state.success == true) {
      return <UserComplainList ComplainData={this.state.data} />;
    }
  }
}
