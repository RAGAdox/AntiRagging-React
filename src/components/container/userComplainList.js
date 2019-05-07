import React from "react";
import { ScrollView, FlatList, StatusBar } from "react-native";
import { UserComplain } from "../presentation";
export default class UserComplainList extends React.Component {
  constructor(props) {
    super(props);
    console.warn("No of Complains" + this.props.ComplainData.length);
  }
  _keyExtractor = item => item._id;
  render() {
    if (this.props.ComplainData[0]) {
      console.warn("No of Complains" + this.props.ComplainData.length);
      return (
        <FlatList
          style={{ marginTop: StatusBar.currentHeight }}
          data={this.props.ComplainData}
          keyExtractor={this._keyExtractor}
          renderItem={({ item }) => <UserComplain data={item} />}
        />
      );
    } else return <Text>No Complains Yeat</Text>;
  }
}
