import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";
import { Text } from "react-native";

import * as Linking from "expo-linking";
import CourseDetailsScreen from "./screens/CourseDetailsScreen";
import CoursePlayerScreen from "./screens/CoursePlayerScreen";
import CourseScreen from "./screens/CourseScreen";
import HomeScreen from "./screens/HomeScreen";

const Stack = createNativeStackNavigator();

// ✅ ADD THIS
const linking = {
  prefixes: [
    Linking.createURL("/"),
    "http://localhost:8081", // local
    "https://edu-course-pi.vercel.app", // 🔥 your real domain
  ],
  config: {
    screens: {
      Home: "",
      CourseScreen: "courses",
      CourseDetails: "course-details/:id",
      CoursePlayer: "course-player/:id",
    },
  },
};

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="CourseScreen" component={CourseScreen} />
          <Stack.Screen name="CourseDetails" component={CourseDetailsScreen} />
          <Stack.Screen name="CoursePlayer" component={CoursePlayerScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}