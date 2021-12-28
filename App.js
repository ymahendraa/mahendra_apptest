import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";
import DetailContact from "./src/screens/DetailContact";
import AddContactScreen from "./src/screens/AddContactScreen";
const Stack = createNativeStackNavigator();

const StackScreen = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          headerMode: 'none',
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="DetailContact" component={DetailContact} />
        <Stack.Screen name="AddContactScreen" component={AddContactScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default function App () {
  return (
    <StackScreen />
  );
};


