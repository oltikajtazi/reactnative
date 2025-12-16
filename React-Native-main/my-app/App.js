// App.js
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MainScreen from "./screens/MainScreen";
import ListScreen from "./screens/ListScreen";
import StudentScreen from "./screens/StudentScreen";
import ProfileScreen from "./screens/ProfileScreen";
import BoxScreen from "./screens/BoxScreen";
import PostsScreen from "./screens/PostsScreen";
import FetchScreen from "./screens/FetchScreen";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // <NavigationContainer>
    //   <Stack.Navigator
    //     initialRouteName="Main"
    //     screenOptions={{
    //       title: "My App",
    //     }}
    //   >
    //     <Stack.Screen name="Main" component={MainScreen} />
    //     <Stack.Screen name="List" component={PostsScreen} />
    //   </Stack.Navigator>

    //   <StatusBar style="auto" />
    // </NavigationContainer>

   <FetchScreen/>
    

    
  );
}
