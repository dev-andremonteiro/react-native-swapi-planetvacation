import React from "react";
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";

import List from "../screens/List";
import Planet from "../screens/Planet";
import Load from "../screens/Load";

const AppStack = createStackNavigator(
  {
    List,
    Planet
  },
  {
    initialRouteName: "List"
  }
);

const MainStack = createSwitchNavigator(
  {
    Load,
    AppStack
  },
  {
    initialRouteName: "Load"
  }
);

export default MainStack;
