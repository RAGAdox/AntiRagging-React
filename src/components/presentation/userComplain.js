import React from "react";
import { View, Text, Linking } from "react-native";
export default class UserComplain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data
    };
  }
  refresh() {
    console.warn("refresh from presentation");

    /*this.setState({
      data: this.props.data
    });*/
  }
  render() {
    return (
      <View
        style={[
          {
            flex: 1,
            flexDirection: "row",
            alignSelf: "stretch",
            borderWidth: 3,
            borderRadius: 5,
            margin: 3,
            padding: 5
          },
          this.state.data.attendedStatus
            ? { borderColor: "#00ff00" }
            : { borderColor: "#ff0000" }
        ]}
      >
        <View
          style={{
            flex: 1
          }}
        >
          <Text>Complain Against :-</Text>
          <Text>Student Being Ragged</Text>
          <Text>Details :-</Text>
          <Text>Conplain Date :-</Text>
          <Text>Location :-</Text>
          <Text>Attended Status :-</Text>
        </View>
        <View style={{ flex: 1, alignSelf: "stretch" }}>
          <Text>
            {this.state.data.ragger ? this.state.data.ragger : "Not Provided"}
          </Text>
          <Text>{this.state.data.name}</Text>
          <Text>
            {this.state.data.details ? this.state.data.details : "Not Provided"}
          </Text>
          <Text>{this.state.data.created_at}</Text>
          <Text
            onPress={() =>
              Linking.openURL(
                `https://www.google.com/maps/search/?api=1&query=${
                  this.state.data.locationLatitude
                },${this.state.data.locationLongitude}`
              )
            }
            style={{ color: "#0000ff" }}
          >
            Open In Maps
          </Text>
          <Text>{this.state.data.attendedStatus ? "Yes" : "No"}</Text>
        </View>
      </View>
    );
  }
}
