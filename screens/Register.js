import {Text, SafeAreaView, StatusBar, Pressable, Image} from "react-native";
import React, {useContext, useState} from "react";
import {BLACK, GOLD_YELLOW, GRAY, WHITE} from "../styles/Colors";
import {BOLD, REGULAR} from "../styles/Fonts";
import {useNavigation} from "@react-navigation/native";
import RegularInput from "../components/RegularInput";
import RegularButton from "../components/RegularButton";
import {height, width} from "../styles/Others";
import Context from "../context/Context";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {fbRegister} from "../functions/FBAuth";
import {addUserToFB} from "../functions/FBDB";

export default function Register() {
	const {setUser} = useContext(Context);
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [loading, setLoading] = useState(false);
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const navigation = useNavigation();
	const register = async () => {
		setLoading(true);

		let fields = [name, email, password];
		let okay = fields.every(Boolean);
		fbRegister(okay, email, password)
			.then((data) => {
				console.log(data, "df ");
				const {uid} = data.user;
				let info = {name, email, uid, userCoin: 0};
				addUserToFB(info, uid);
				setUser(info);
				navigation.reset({
					index: 0,
					routes: [{name: "Main"}],
				});
			})
			.catch((error) => setLoading(false));

		setLoading(false);
	};

	return (
		<SafeAreaView
			style={{
				backgroundColor: WHITE,
				flex: 1,
			}}
		>
			<StatusBar backgroundColor={WHITE} barStyle={`${"dark"}-content`} />
			<KeyboardAwareScrollView
				enableOnAndroid={true}
				contentContainerStyle={{
					alignItems: "center",
					width,
					paddingHorizontal: 15,
					paddingTop: 50,
				}}
			>
				<Image
					source={require("../assets/logo.png")}
					style={{width: 70, height: 70, marginBottom: 20}}
				/>
				<Text
					style={{
						fontFamily: BOLD,
						color: GRAY,
						fontSize: 30,
						marginBottom: 30,
					}}
				>
					Create Account
				</Text>
				<RegularInput
					placeholder="Full Name"
					icon="user"
					value={name}
					setValue={(value) => setName(value)}
				/>

				<RegularInput
					placeholder="Email address"
					icon="envelope"
					value={email}
					setValue={(value) => setEmail(value)}
					keyboardType="email-address"
				/>
				<RegularInput
					placeholder="Password"
					icon="lock"
					secureTextEntry={!showPassword}
					value={password}
					maxLength={20}
					setValue={(value) => setPassword(value)}
				/>

				<RegularButton
					title="Register"
					style={{width: width - 50}}
					mt={20}
					height={50}
					onPress={register}
					loading={loading}
				/>
				<Pressable
					onPress={() => navigation.navigate("Login")}
					style={{marginBottom: 35}}
				>
					<Text
						style={{
							fontFamily: REGULAR,
							color: GRAY,
							fontSize: 18,
							marginTop: 20,
							textTransform: "uppercase",
						}}
					>
						Back to Login
					</Text>
				</Pressable>
			</KeyboardAwareScrollView>
		</SafeAreaView>
	);
}
