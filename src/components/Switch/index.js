import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import Text from "../Text/index";
import Ionicons from "@expo/vector-icons/Ionicons";

const Switch = ({ text1, text2, color = "red", handleClick=()=>{} }) => {
  const [selected, setSelected] = useState(0);

  return (
    <View
      style={{
        height: 40,
        borderRadius: 20,
        marginTop: 20,
        marginBottom: 20,
        // borderWidth: 1,
        // borderColor: color,
        padding: 3,
      }}
    >
      <View
        style={{
          backgroundColor: "transparent",
          borderRadius: 20,
          display: "flex",
          flexDirection: "row",
          flex: 1,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setSelected(0);
            handleClick(0)
          }}
          style={{
            flex: 1,
            backgroundColor: selected == 0 ? color : "transparent",
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            weight={selected == 0 ? "bold" : "normal"}
            style={{ color: selected != 0 ? color : "white" }}
          >
            <Ionicons
              name={"ios-football"}
              size={15}
              color={selected != 0 ? color : "white"}

            />
            {text1}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelected(1);
            handleClick(1)
          }}
          style={{
            flex: 1,
            backgroundColor: selected == 1 ? color : "transparent",
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            weight={selected == 1 ? "bold" : "normal"}
            style={{ color: selected != 1 ? color : "white" }}
          >
            <Ionicons
              name={"ios-football"}
              size={15}
              color={selected != 1 ? color : "white"}
              style={{}}
            />
            {text2}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Switch;
