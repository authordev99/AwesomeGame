import React, { useState } from "react";
import {
  StyleSheet,
} from "react-native";

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import Home from "./Home";
import Game from "./screens/Game";
import Provider from "./context";


function App(): JSX.Element {
  return (
    <Provider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
          />
          <Stack.Screen name="Game" component={Game} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
