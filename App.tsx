import React  from "react";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import Home from "./Home";
import Game from "./screens/Game";
import Provider from "./context";
import Leaderboards from "./screens/Leaderboards";
import Result from "./screens/Result";
import Username from "./screens/Username";


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
          <Stack.Screen name="Leaderboards" component={Leaderboards} />
          <Stack.Screen name="Result" component={Result} />
          <Stack.Screen name="Username" component={Username} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
