import React, { useEffect, useRef, useState } from "react";
import GameDetails from "./src/screens/GameDetails";
import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import ForgotPassword from "./src/screens/ForgotPassword";
import Home from "./src/screens/Home";
import Settings from "./src/screens/Settings";
import Ranking from "./src/screens/Ranking";
import Profile from "./src/screens/Profile";
import Notificacoes from "./src/components/Notificacoes";
import Text from "./src/components/Text";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  Image,
  View,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Animated,
  Easing,
} from "react-native";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Provider } from "react-redux";
import { store, persistor } from "./src/utils/configureStore.js";
import { PersistGate } from "redux-persist/integration/react";
import { connect } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Notificacao from "./src/screens/Notificacao";
import * as Font from "expo-font";
import LottieView from "lottie-react-native";
import * as Poppins from "@expo-google-fonts/poppins";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import Suporte from "./src/screens/Suporte";

const client = new ApolloClient({
  uri: "http://192.168.1.102:8000/api/graphql",
  cache: new InMemoryCache(),
});

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    opacityImage();

    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync(Poppins);
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render

        setTimeout(() => {
          transformImage();
          setTimeout(() => {
            setAppIsReady(true);
          }, 500);
        }, 3000);
      }
    }

    prepare();
  }, []);

  let rotateValueHolder = useRef(new Animated.Value(0)).current;
  let rotateValueHolder_dois = useRef(new Animated.Value(0)).current;
  const opacityImage = () => {
    rotateValueHolder.setValue(0);

    Animated.timing(rotateValueHolder, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };
  const opacityData = rotateValueHolder.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const transformImage = () => {
    rotateValueHolder_dois.setValue(0);

    Animated.timing(rotateValueHolder_dois, {
      toValue: "-500%",
      duration: 500,
      useNativeDriver: true,
    }).start();
  };
  // const transformData = rotateValueHolder_dois.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: [0, 1],
  // });

  return !appIsReady ? (
    <View
      style={{
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
      }}
    >
      <Animated.Image
        style={{
          width: "100%",
          height: "100%",
          resizeMode: "cover",
          backgroundColor: "#eee",
          opacity: opacityData,
          transform: [
            {
              translateX: rotateValueHolder_dois,
            },
          ],
        }}
        source={require("./assets/vinicius.jpg")}
      />
    </View>
  ) : (
    <PaperProvider>
      <PersistGate loading={null} persistor={persistor}>
        <ApolloProvider client={client}>
          <Provider store={store}>
            <NavigationContainer>
              <StatusBar
                barStyle="dark-content"
                hidden={false}
                translucent={false}
              />
              <ConnectedRoot />
            </NavigationContainer>
          </Provider>
        </ApolloProvider>
      </PersistGate>
    </PaperProvider>
  );
}

const Root = (props) => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  const Header = (screen) => {
    // var nome = props.user.name?.split(" ");
    return (
      <View
        style={{
          height: 100,
          paddingTop: 20,
          alignSelf: "center",
          flexDirection: "row",
          width: Dimensions.get("window").width,
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          hitslop={{ top: 150, bottom: 150, right: 150, left: 150 }}
          onPress={() => {}}
        >
          <View style={{ left: 0, flexDirection: "row", marginTop: 10 }}>
            <Image
              source={{ uri: props?.user?.photo }}
              style={{
                resizeMode: "cover",
                width: 35,
                height: 35,
                borderRadius: 20,
              }}
            />
            <View
              style={{
                marginLeft: 0,
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
              }}
            >
              {/* <Text color="#606060" weight="bold" size={14}> */}
                {/* Olá, {nome[0] + " "}
                {nome[1] != undefined ? nome[1] : ""} */}
              {/* </Text> */}
              <Text weight="medium" size={12}>
                Edit
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        {/* {
          screen.screen == "Início" ?

          <Text weight="bold" style={{ flex: 1, left: 10, color: "white", fontSize: 16, marginTop: 5 }}>Olá, {props.user.name?.split(" ")[0]}</Text>
            // <Text weight="bold" style={{ flex: 1, left: 10, color: "white", fontSize: 16, marginTop: 5 }}>{screen.screen}</Text>
            :
            <View style={{flex: 1}}/>
        } */}

        {/* <View style={{ flex: 1, alignItems: "center" }}>
          <Image source={require("./assets/logo.png")} style={{ resizeMode: "contain", width: 35, height: 35 }} />
        </View> */}
        <View style={{}}>
          {/* {console.warn("ASync")} */}
          {/* {AsyncStorage.getItem('notifications').then((value) => {
                var parse = JSON.parse(value)
                return parse.length <= 0 ? "" : (<View style={{ position: "absolute", backgroundColor: "green", width: 10, height: 10, left: 10, borderRadius: 5, zIndex: 2 }}>
<Text>{parse.length}</Text>
                </View>)
              })} */}
          <Notificacoes />
          {/* <View style={{ position: "absolute", backgroundColor: "green", width: 10, height: 10, left: 10, borderRadius: 5, zIndex: 2 }}>

                </View> */}
        </View>
      </View>
    );
  };

  const Tabs = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Call") {
              iconName = focused ? "ios-call" : "ios-call-outline";
              size = 30;
            } else if (route.name === "Status") {
              iconName = focused ? "ios-play-circle" : "ios-play-circle-outline";
            } else if (route.name === "Communities") {
              iconName = focused ? "ios-people" : "ios-people-outline";
            } else if (route.name === "Chats") {
              iconName = focused
                ? "ios-chatbox"
                : "ios-chatbox-outline";
            } else if (route.name === "Settings") {
              iconName = focused ? "ios-settings" : "ios-settings-outline";
            }

            // You can return any component that you like here!
            return (
              <>
                <Ionicons
                  name={iconName}
                  size={size}
                  color={color}
                  style={{
                    marginTop: 0,
                  }}
                />
                {/* <Text size={10} weight="medium" color={focused ? "" : }>{route.name}</Text> */}
              </>
            );
          },

          tabBarShowLabel: true,
          tabBarActiveTintColor: "#0879ef",
          tabBarInactiveTintColor: "gray",
          headerStyle: {
            backgroundColor: "white",
            height: 80,
          },
          tabBarInactiveBackgroundColor: "transparent",
          tabBarActiveBackgroundColor: "transparent",
          tabBarStyle: {
            borderTopColor: "white",
            backgroundColor: "#f6f6f6",
            height: 80,
            paddingBottom: 25,
            paddingTop: 10,
           
          },

          tabBarHideOnKeyboard: true,
          headerTitle: () => <Header screen={route.name} />,
        })}
        initialRouteName="Início"
      >
        <Tab.Screen name="Status" component={Home} />
        <Tab.Screen name="Call" component={Home} />
        <Tab.Screen name="Communities" component={Home} />
        <Tab.Screen name="Chats" component={Home} />
        <Tab.Screen name="Settings" component={Home} />
        {/* <Tab.Screen name="Meu Time" component={Formation} /> */}
        {/* <Tab.Screen name="Meu Perfil" component={Profile} /> */}
        {/* <Tab.Screen name="Notificações" component={Notification} /> */}
        {/* <Tab.Screen name="Configurações" component={Settings} /> */}
      </Tab.Navigator>
    );
  };

  const Authenticated = () => {
    return (
      <>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: "#ac1b3a",
              
            },
            headerTintColor: "white",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerBackVisible: true,
            headerBackTitle: "voltar",
          }}
        >
          <Stack.Screen
            name="Tabs"
            component={Tabs}
            options={{ headerShown: false }}
          />
          {/* <Stack.Screen
            name="GameDetails"
            options={{
              headerTitle: (props) => (
                <Text size={16} weight="bold">
                  Detalhes do Jogo
                </Text>
              ),
              // headerRight: () => (
              //   <Button
              //     onPress={() => alert('This is a button!')}
              //     title="Info"
              //     color="#fff"
              //   />
              // ),
            }}
            component={GameDetails}
          />
          <Stack.Screen
            name="Support"
            options={{
              headerTitle: (props) => (
                <Text size={16} weight="bold">
                    Suporte
                </Text>
              ),
              // headerRight: () => (
              //   <Button
              //     onPress={() => alert('This is a button!')}
              //     title="Info"
              //     color="#fff"
              //   />
              // ),
            }}
            component={Suporte}
          />
          <Stack.Screen
            name="Notificacoes"
            options={{
              headerTitle: (props) => (
                <Text size={16} weight="bold">
                  Notificações
                </Text>
              ),
              // headerRight: () => (
              //   <Button
              //     onPress={() => alert('This is a button!')}
              //     title="Info"
              //     color="#fff"
              //   />
              // ),
            }}
            component={Notificacao}
          /> */}
        </Stack.Navigator>
      </>
    );
  };
  const Unauthenticated = () => {
    return (
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  };

  return props.token == null ? <Authenticated /> : <Authenticated />;
};

const mapStateToProps = (state) => {
  return {
    token: state.authentication.token,
    user: state.authentication.user,
  };
};

const ConnectedRoot = connect(mapStateToProps)(Root);
