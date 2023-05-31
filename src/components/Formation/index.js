import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Image,
  StatusBar,
  View,
  ScrollView,
  SafeAreaView,
  Animated,
  Easing,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Text from "../../components/Text/index";
import { BRASOES } from "../../utils/brasoes";

import EmphasisHome from "../../components/EmphasisHome/index";
import Vitrine from "../../components/Vitrine/index";
import VitrineNoticies from "../../components/VitrineNoticies/index";

export default function Formation({ props }) {
  let rotateValueHolder = useRef(new Animated.Value(0)).current;
  const rotateImage = () => {
    rotateValueHolder.setValue(0);
    Animated.timing(rotateValueHolder, {
      toValue: 0.7,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };
  const rotateData = rotateValueHolder.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });
  const [data, setData] = useState([
    {
      formation: "4-3-3",
      firstTeam: {
        firstLine: [
          {
            number: 1,
            name: "M. Neuer",
          },
        ],
        secondLine: [
          {
            number: 2,
            name: "Teste 2",
          },
          {
            number: 3,
            name: "Teste 3",
          },
          {
            number: 4,
            name: "Teste 4",
          },
          {
            number: 5,
            name: "Teste 5",
          },
        ],
        thirdLine: [
          {
            number: 6,
            name: "Teste 6",
          },
          {
            number: 7,
            name: "Teste 7",
          },
          {
            number: 8,
            name: "Teste 8",
          },
        ],
        fourtyLine: [
          {
            number: 9,
            name: "Teste 9",
          },
          {
            number: 10,
            name: "Teste 10",
          },
          {
            number: 11,
            name: "Teste 11",
          },
        ],
      },
      secondTeam: {
        firstLine: [
          {
            number: 1,
            name: "M. Neuer",
          },
        ],
        secondLine: [
          {
            number: 2,
            name: "Teste 2",
          },
          {
            number: 3,
            name: "Teste 3",
          },
          {
            number: 4,
            name: "Teste 4",
          },
          {
            number: 5,
            name: "Teste 5",
          },
        ],
        thirdLine: [
          {
            number: 6,
            name: "Teste 6",
          },
          {
            number: 7,
            name: "Teste 7",
          },
          {
            number: 8,
            name: "Teste 8",
          },
        ],
        fourtyLine: [
          {
            number: 9,
            name: "Teste 9",
          },
          {
            number: 10,
            name: "Teste 10",
          },
          {
            number: 11,
            name: "Teste 11",
          },
        ],
      },
    },
  ]);

  const mountObjectFirst = () => {
    var arrayOne = {
      secondLine: [],
      thirdLine: [],
      fourtyLine: [],
      fiveLine: [],
    };
    var split =
      props?.route?.params?.formacao?.[0]?.first_formation?.split("-");
    if (split?.length > 0) {
      for (var i = 1; i <= split[0]; i++) {
        arrayOne.secondLine.push({
          number: 1,
          name: "M. Neuer",
        });
      }
      for (var i = 1; i <= split[1]; i++) {
        arrayOne.thirdLine.push({
          number: 1,
          name: "M. Neuer",
        });
      }
      for (var i = 1; i <= split[2]; i++) {
        arrayOne.fourtyLine.push({
          number: 1,
          name: "M. Neuer",
        });
      }
      for (var i = 1; i <= split[3]; i++) {
        arrayOne.fiveLine.push({
          number: 1,
          name: "M. Neuer",
        });
      }
    }
    console.warn({ firstTeam: arrayOne });
    return {
      firstTeam: arrayOne,
    };
  };

  const mountObjectSecond = () => {
    var arrayOne = {
      secondLine: [],
      thirdLine: [],
      fourtyLine: [],
      fiveLine: [],
    };
    var split =
      props?.route?.params?.formacao?.[0]?.second_formation?.split("-");
    if (split?.length > 0) {
      for (var i = 1; i <= split[0]; i++) {
        arrayOne.secondLine.push({
          number: 1,
          name: "M. Neuer",
        });
      }
      for (var i = 1; i <= split[1]; i++) {
        arrayOne.thirdLine.push({
          number: 1,
          name: "M. Neuer",
        });
      }
      for (var i = 1; i <= split[2]; i++) {
        arrayOne.fourtyLine.push({
          number: 1,
          name: "M. Neuer",
        });
      }
      for (var i = 1; i <= split[3]; i++) {
        arrayOne.fiveLine.push({
          number: 1,
          name: "M. Neuer",
        });
      }
    }
    console.warn({ secondTeam: arrayOne });
    return {
      secondTeam: arrayOne,
    };
  };

  mountObjectFirst();
  mountObjectSecond();

  const FirstClub = () => {
    console.warn(
      // JSON?.parse(
      props?.route?.params?.formacao[0]?.first_formation
      //   )
    );
    return (
      <View style={{ flex: 1, flexDirection: "column", height: "50%" }}>
        <Image
          source={BRASOES[props?.route?.params?.firstId - 1]?.url}
          style={{
            width: 50,
            height: 50,
            position: "absolute",
            right: -15,
            top: -15,
            borderRadius: 10,
          }}
        />
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity>
            <View style={[styles.button]}>
              <Text weight="bold">
                {data[0]?.firstTeam?.firstLine[0]?.number}
              </Text>
            </View>
            <Text weight="bold" size={12}>
              {data[0]?.firstTeam?.firstLine[0]?.name}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          {mountObjectFirst()?.firstTeam?.secondLine?.map((item) => (
            <TouchableOpacity>
              <View style={[styles.button]}>
                <Text weight="bold">{item?.number}</Text>
              </View>
              <Text weight="bold" size={12}>
                {item?.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          {mountObjectFirst()?.firstTeam?.thirdLine?.map((item) => (
            <TouchableOpacity>
              <View style={[styles.button]}>
                <Text weight="bold">{item?.number}</Text>
              </View>
              <Text weight="bold" size={12}>
                {item?.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          {mountObjectFirst()?.firstTeam?.fourtyLine?.map((item) => (
            <TouchableOpacity>
              <View style={[styles.button]}>
                <Text weight="bold">{item?.number}</Text>
              </View>
              <Text weight="bold" size={12}>
                {item?.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {mountObjectFirst()?.firstTeam?.fiveLine?.length > 0 && (
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            {mountObjectFirst()?.firstTeam?.fiveLine?.map((item) => (
              <TouchableOpacity>
                <View style={[styles.button]}>
                  <Text weight="bold">{item?.number}</Text>
                </View>
                <Text weight="bold" size={12}>
                  {item?.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    );
  };

  const SecondClub = () => {
    return (
      <View style={{ flex: 1, flexDirection: "column" }}>
        <Image
          source={BRASOES[props?.route?.params?.secondId - 1]?.url}
          style={{
            width: 50,
            height: 50,
            position: "absolute",
            left: -15,
            bottom: -20,
            borderRadius: 10,
          }}
        />
        {mountObjectSecond()?.secondTeam?.fiveLine?.length > 0 && (
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            {mountObjectSecond()?.secondTeam?.fiveLine?.map((item) => (
              <TouchableOpacity>
                <View style={[styles.button2]}>
                  <Text weight="bold">{item?.number}</Text>
                </View>
                <Text weight="bold" size={12}>
                  {item?.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          {mountObjectSecond()?.secondTeam?.fourtyLine?.map((item) => (
            <TouchableOpacity>
              <View style={[styles.button2]}>
                <Text weight="bold">{item?.number}</Text>
              </View>
              <Text weight="bold" size={12}>
                {item?.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          {mountObjectSecond()?.secondTeam?.thirdLine?.map((item) => (
            <TouchableOpacity>
              <View style={[styles.button2]}>
                <Text weight="bold">{item?.number}</Text>
              </View>
              <Text weight="bold" size={12}>
                {item?.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          {mountObjectSecond()?.secondTeam?.secondLine?.map((item) => (
            <TouchableOpacity>
              <View style={[styles.button2]}>
                <Text weight="bold">{item?.number}</Text>
              </View>
              <Text weight="bold" size={12}>
                {item?.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity>
            <Text weight="bold" size={12}>
              {data[0]?.secondTeam?.firstLine[0]?.name}
            </Text>
            <View style={[styles.button2]}>
              <Text weight="bold">
                {data[0]?.secondTeam?.firstLine[0]?.number}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  useEffect(() => {
    rotateImage();
  }, []);

  return (
    <View style={[styles.container]}>
      <Animated.Image
        style={[
          styles.image,
          {
            opacity: rotateData,
          },
        ]}
        source={require("../../../assets/campo.webp")}
      />
      {props?.route?.params?.formacao?.length == 0 ? (
        <View
          style={{
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 20,
            
          }}
        >
            <View style={{backgroundColor: "white", padding: 10}}>

          <Text size={15} weight="bold" color="#ac1b3a">
            Sem informação no momento!
          </Text>
        </View>
        </View>
      ) : (
        <>
          <FirstClub />
          <SecondClub />
        </>
      )}
      {/* <Image source={require("../../../assets/campo.jpg")} style={[styles.image]} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    height: 550,
  },
  image: {
    position: "absolute",
    resizeMode: "cover",
    zIndex: 0,
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  button: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "#ac1b3a",
    alignSelf: "center",
  },
  button2: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "gray",
    alignSelf: "center",
  },
  degrade: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "90%",
    zIndex: 0,
  },
});
