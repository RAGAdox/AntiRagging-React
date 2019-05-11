import React from "react";
import { View, Text, Linking } from "react-native";
import MyComplainContext from "../Context/myComplainContext";
export default class UserComplain extends React.Component {
  constructor(props) {
    super(props);
  }
  refresh() {
    console.warn("refresh from presentation");

    /*this.setState({
      data: this.props.data
    });*/
  }
  render() {
    return (
      <MyComplainContext.Consumer>
        {data => {
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
                data.attendedStatus
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
                <Text>{data.ragger ? data.ragger : "Not Provided"}</Text>
                <Text>{data.name}</Text>
                <Text>{data.details ? data.details : "Not Provided"}</Text>
                <Text>{data.created_at}</Text>
                <Text
                  onPress={() =>
                    Linking.openURL(
                      `https://www.google.com/maps/search/?api=1&query=${
                        data.locationLatitude
                      },${data.locationLongitude}`
                    )
                  }
                  style={{ color: "#0000ff" }}
                >
                  Open In Maps
                </Text>
                <Text>{data.attendedStatus ? "Yes" : "No"}</Text>
              </View>
            </View>
          );
        }}
      </MyComplainContext.Consumer>
    );
  }
}
