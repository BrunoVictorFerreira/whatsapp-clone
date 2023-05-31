import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { scale } from "react-native-size-matters";
import Text from "../../components/Text/index";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import { BRASOES } from "../../utils/brasoes";
import Ionicons from "@expo/vector-icons/Ionicons";
import Switch from "../Switch";

export default function Vitrine({ options, seeAll, laading }) {
  const [select, setSelect] = useState(0);
  const [seeAllState, setSeeAllState] = useState(false);
  const [imagesState, setImagesState] = useState([]);
  const navigation = useNavigation();

  const compareDatas = (date) => {
    var agora = moment().subtract(3, "hours");
    var dateApi = moment(date).subtract(3, "hours");

    if (agora < dateApi) {
      return moment(dateApi).format("DD/MM/YYYY HH:mm");
    } else if (agora >= dateApi) {
      var addHour = moment(dateApi).add("2", "hours");
      if (addHour < agora) {
        return "Finalizado";
      } else {
        return "Ao Vivo";
      }
    }
  };

  useEffect(() => {
    var aray = [];
    options.map((item, key) => {
      // console.log(item)
      aray.push({
        id: item.id,
        // firstBrasaoo: require(item.firstBrasao),
        // secondBrasao: require(`../../../assets/brasoes/${item.secondBrasao}`)
      });
    });
    setImagesState(aray);
  }, [options]);

  useEffect(() => {
    seeAll(seeAllState);
  }, [seeAllState]);

  return (
    <View style={{ justifyContent: "center" }}>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* <Text
          style={[
            styles.text,
            { textAlign: "left", marginTop: 20, marginBottom: 20 },
          ]}
          size={16}
          weight="bold"
        >
          {seeAllState ? "Todos os Jogos" : "Jogos de Hoje"}
        </Text> */}
        {/* <TouchableOpacity
          onPress={() => {
            setSeeAllState(!seeAllState);
          }}
        >
          <Text size={12} weight="bold" color="#ac1b3a">
            {seeAllState ? "Ver jogos de hoje" : "Ver Tudo"}
          </Text>
        </TouchableOpacity> */}
      </View>
      <View>
        <Switch
          text1="Jogos de Hoje"
          text2="Ver Todos os jogos"
          color="#ac1b3a"
          onPress={() => {}}
          handleClick={(value) => setSeeAllState(!seeAllState)}
        />
        {options.map((item, key) => (
          <TouchableOpacity
            key={key}
            onPress={() => {
              setSelect(key);
              navigation.navigate("GameDetails", item);
            }}
          >
            {/* {console.warn("item", item)} */}
            <View
              style={{
                shadowColor: item.important ? "rgba(0,0,0,.3)" : "transparent",
                shadowOffset: { width: -2, height: 3 },
                shadowOpacity: 0.9,
                shadowRadius: 10,
                marginBottom: 20,
                borderRadius: 15,
                borderWidth: 2,
                borderColor: item.important ? "#daa520" : "transparent",
                height: 70,
                flexDirection: "row",
                justifyContent: "center",
                backgroundColor: "white",
              }}
            >
              {item.important && (
                <View
                  style={{
                    backgroundColor: "#daa520",
                    position: "absolute",
                    left: 0,
                    top: -10,
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    alignItems: "center",
                    justifyContent: "center",
                    shadowColor: "rgba(0,0,0,.3)",
                    shadowOffset: { width: 2, height: 2 },
                    shadowOpacity: 1,
                    shadowRadius: 10,
                  }}
                >
                  <Ionicons
                    name={"ios-star"}
                    size={15}
                    color={"white"}
                    style={{}}
                  />
                </View>
              )}

              {/* {console.warn("imagesState")} */}
              {/* {console.warn(BRASOES[3].id)} */}
              <View
                style={{
                  flex: 2,
                  flexDirection: "row",
                  padding: 10,
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <Text
                  size={14}
                  weight="medium"
                  color="gray"
                  style={{ marginRight: 5 }}
                >
                  {item.firstName}
                </Text>
                <View
                  style={{
                    backgroundColor: "#ac1b3a",
                    borderRadius: 20,
                    width: 38,
                    height: 38,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "white",
                      borderRadius: 20,
                      width: 35,
                      height: 35,
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      source={BRASOES[item?.firstId - 1]?.url}
                      style={[
                        styles.logo,
                        { borderRadius: 100, height: 30, width: 30 },
                      ]}
                    />
                  </View>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text size={16} weight="bold" color="#ac1b3a" style={{}}>{`${
                  item?.result?.[item?.result?.length - 1]?.first_team ?? 0
                } X ${
                  item?.result?.[item?.result?.length - 1]?.second_team ?? 0
                }`}</Text>
                <Text
                  size={8}
                  weight={
                    compareDatas(item?.date) == "Ao Vivo" ? "bold" : "medium"
                  }
                  color={
                    compareDatas(item?.date) == "Ao Vivo" ? "green" : "gray"
                  }
                  style={{ textAlign: "center" }}
                >
                  {compareDatas(item?.date)}
                </Text>
              </View>
              <View
                style={{
                  flex: 2,
                  flexDirection: "row",
                  padding: 10,
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    backgroundColor: "#ac1b3a",
                    borderRadius: 20,
                    width: 38,
                    height: 38,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "white",
                      borderRadius: 20,
                      width: 35,
                      height: 35,
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      source={BRASOES[item?.secondId - 1]?.url}
                      style={[
                        styles.logo,
                        { borderRadius: 100, height: 30, width: 30 },
                      ]}
                    />
                  </View>
                </View>
                <Text
                  size={14}
                  weight="medium"
                  color="gray"
                  style={{ marginLeft: 5 }}
                >
                  {item.secondName}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    resizeMode: "cover",
    width: scale(70),
    height: scale(50),
    alignSelf: "center",
    borderRadius: 10,
  },
  text: {
    color: "gray",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 30,
  },
});
