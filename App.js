import React, {useCallback, useEffect, useState} from "react";
// react navigation
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();
import {createDrawerNavigator} from "@react-navigation/drawer";
const Drawer = createDrawerNavigator();

// Home Screens
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import Login from "./screens/Login";
import Register from "./screens/Register";
import BottomTab from "./components/BottomTab";
import {LogBox} from "react-native";
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "./config/firebase";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import Store from "./context/Store";
import Home from "./screens/Home";
import AddTask from "./screens/AddTask";
import Focus from "./screens/Focus";
import Rewards from "./screens/Rewards";
import TodoDetails from "./screens/TodoDetails";
import CompletedTodos from "./screens/CompletedTodos";
export default function App() {
	const [appIsReady, setAppIsReady] = useState(false);
	const [initialRoute, setInitialRoute] = useState("Login");

	useEffect(() => {
		async function prepare() {
			try {
				await SplashScreen.preventAutoHideAsync();
				await Font.loadAsync({
					"Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
					"Montserrat-Bold": require("./assets/fonts/Montserrat-Bold.ttf"),
				});
				initializeApp(firebaseConfig);
				const auth = getAuth();
				onAuthStateChanged(auth, async (user) => {
					console.log(user,'from app.js')
					if (await user) {
						setInitialRoute("Main");
					}
				});

				await new Promise((resolve) => setTimeout(resolve, 2000));
			} catch (e) {
				console.warn(e);
			} finally {
				setAppIsReady(true);
			}
		}

		prepare();
	}, []);

	const onLayoutRootView = useCallback(async () => {
		if (appIsReady) {
			await SplashScreen.hideAsync();
		}
	}, [appIsReady]);
	LogBox.ignoreAllLogs();
	if (!appIsReady) {
		return null;
	}

	return (
		<Store>
			<NavigationContainer onReady={onLayoutRootView}>
				<Stack.Navigator
					screenOptions={{headerShown: false}}
					initialRouteName={initialRoute}
				>
					<Stack.Screen name="Register" component={Register} />
					<Stack.Screen name="Main" component={Main} />
					<Stack.Screen name="Login" component={Login} />
					<Stack.Screen name="AddTask" component={AddTask} />
					<Stack.Screen name="Focus" component={Focus} />
					<Stack.Screen name="CompletedTodos" component={CompletedTodos} />
					<Stack.Screen name="TodoDetails" component={TodoDetails} />
				</Stack.Navigator>
			</NavigationContainer>
		</Store>
	);
}
function Main() {
	return (
		<Tab.Navigator
			tabBar={(props) => <BottomTab {...props} />}
			screenOptions={{headerShown: false}}
			initialRouteName="To-Do"
		>
			<Tab.Screen name="To-Do" component={Home} />
			<Tab.Screen name="Rewards" component={Rewards} />
		</Tab.Navigator>
	);
}
