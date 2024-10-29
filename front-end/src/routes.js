import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./pages/Home";
import CalculatorScreen from "./pages/Calculator";
import ChatbotScreen from "./pages/Chatbot";
import LabPageScreen from "./pages/LabPage";
import ProfileScreen from "./pages/Profile";
import LoginScreen from "./pages/Login";
import RegisterScreen from "./pages/Register";

const Stack = createStackNavigator();

export function AppRoutes() {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerTitleAlign: "center" }}>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerTitle: "Home" }} />
      <Stack.Screen name="Calculator" component={CalculatorScreen} options={{ headerTitle: "Calculator" }} />
      <Stack.Screen name="Chatbot" component={ChatbotScreen} options={{ headerTitle: "Chatbot" }} />
      <Stack.Screen name="LabPage" component={LabPageScreen} options={{ headerTitle: "Lab Page" }} />
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerTitle: "Profile" }} />
    </Stack.Navigator>
  );
}

export function AuthRoutes() {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerTitleAlign: "center" }}>
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerTitle: "Login" }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ headerTitle: "Register" }} />
    </Stack.Navigator>
  );
}
