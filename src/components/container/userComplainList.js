import React from "react";
import { ScrollView } from "react-native";
import { UserComplain } from "../presentation";
export default class UserComplainList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ScrollView>
        <UserComplain />
      </ScrollView>
    );
  }
}
