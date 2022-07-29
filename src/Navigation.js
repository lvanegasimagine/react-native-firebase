import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Add from "./screens/Add";
import Home from "./screens/Home";

const Stack = createNativeStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home}></Stack.Screen>
            <Stack.Screen name="Add" component={Add} options={{presentation: 'modal'}}></Stack.Screen>
        </Stack.Navigator>
    )
}

export default function Navigation() {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    )
}