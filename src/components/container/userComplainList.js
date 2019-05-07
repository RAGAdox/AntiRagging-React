import React from "react";
import { ScrollView, FlatList, StatusBar } from "react-native";
import { UserComplain } from "../presentation";
export default class UserComplainList extends React.Component {
  constructor(props) {
    super(props);
  }
  _keyExtractor = item => item._id;
  render() {
    return (
      <FlatList
        style={{ marginTop: StatusBar.currentHeight }}
        data={this.props.ComplainData}
        keyExtractor={this._keyExtractor}
        renderItem={({ item }) => <UserComplain data={item} />}
      />
    );
  }
}
