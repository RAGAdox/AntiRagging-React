import React from "react";
import { ScrollView, FlatList, StatusBar } from "react-native";
import { UserComplain } from "../presentation";
export default class UserComplainList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ComplainData: this.props.ComplainData
    };
  }
  shouldRefresh() {
    console.warn("should refresh");
    this.setState({
      ComplainData: this.props.ComplainData
    });
    //this.refs.Complain.refresh();
  }
  _keyExtractor = item => item._id;
  render() {
    if (this.props.ComplainData[0]) {
      /*return (
        <FlatList
          style={{ marginTop: StatusBar.currentHeight }}
          data={this.state.ComplainData}
          keyExtractor={this._keyExtractor}
          renderItem={({ item }) => <UserComplain data={item} ref="Complain" />}
        />
      );*/
      return this.state.ComplainData.map(item => {
        return <UserComplain data={item} key={item._id} refs="Complain" />;
      });
    } else return <Text>No Complains Yeat</Text>;
  }
}
