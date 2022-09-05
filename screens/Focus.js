import {
	StyleSheet,
	Text,
	Vibration,
	TouchableOpacity,
	View,
	TextInput,
} from "react-native";
import React, {useState, useRef, useEffect} from "react";
import {WHITE, SWISS_RED, GOLD_YELLOW, NAVY_BLUE, GRAY} from "../styles/Colors";
import {BOLD} from "../styles/Fonts";
import Speaker from "react-native-vector-icons/FontAwesome";
import IonIcon from "react-native-vector-icons/Ionicons";
import LeftIcon from "react-native-vector-icons/Fontisto";
import {height, width} from "../styles/Others";
import CountDownTimer from "react-native-countdown-timer-hooks";
import RewardsNotify from "../components/RewardsNotify";
import Modal from "react-native-modal";
import {Audio} from "expo-av";
import {BackBtnComp} from "../components/Reuse";
import {getCurrentUser} from "../functions/FBDB";
import {doc, updateDoc} from "firebase/firestore";
import {db} from "../config/firebase";
import { useNavigation } from "@react-navigation/native";

export const modelStyle = {
	position: "absolute",
	width: "90%",
	height: height / 1.7,
	top: "15%",
	backgroundColor: WHITE,
	borderRadius: 10,
};

const Focus = () => {
	const navigation = useNavigation();
	const [startTimer, setStartTimer] = useState(false);
	const [noise, setNoise] = useState(false);
	const refTimer = useRef();
	const [show, setShow] = useState(false);
	const [time, setTime] = useState();
	const [addtime, setAddtime] = useState(false);
	const [sound, setSound] = useState();
	const [myInfo, setMyInfo] = useState();

	const addTimeFunc = () => {
		if (!time) {
			return alert("Compulsory to input time");
		}
		if (time.length > 2) {
			return alert("Maximum of 2 digits allowed");
		}
		if (time > 20 * 60) {
			return alert("Can set only up to 20 minutes");
		}
		offNoise("inactive");
		setStartTimer(true);
		setAddtime(false);
	};

	const startTimerFunc = () => {
		if (time?.length > 2) {
			return alert("Maximum of 2 digits allowed");
		}
		if (time > 20 * 60) {
			return alert("Can set only up to 20 minutes");
		}
		Vibration.vibrate(500);
		offNoise("inactive");
		setStartTimer(true);
	};

	const updateCoin = async () => {
		await updateDoc(doc(db, "Users", myInfo.uid), {
			coins: myInfo.coins + 20,
		});
	};

	const timerCallbackFunc = (timerFlag) => {
		updateCoin();
		setSound(false);
		setStartTimer(false);
		setShow(true);
	};

	const offNoise = async (text) => {
		if (text == "inactive") {
			const {sound} = await Audio.Sound.createAsync(
				require("../assets/music/Reaching-Out.mp3")
			);
			setSound(sound);
			await sound.playAsync();
			await sound.setIsLoopingAsync(true);
			setNoise(!noise);
		}

		if (text == "active") {
			setNoise(!noise);
			setSound(false);
		}
	};

	useEffect(() => {
		return sound
			? () => {
					console.log("whitenoise enabled");
					sound.unloadAsync();
			  }:undefined
	}, [sound]);

	useEffect(() => {
		getCurrentUser().then((user)=>setMyInfo(user));
	}, []);

	return (
		<>
			<Modal
				style={modelStyle}
				animationOut="zoomOut"
				isVisible={show}
				animationOutTiming={700}
				useNativeDriver={true}
			>
				<RewardsNotify
					setValue={setShow}
					setNoise={setNoise}
					go={true}
				/>
			</Modal>
			<View style={styles.container}>
				<BackBtnComp navigation={navigation} setSound={setSound} />
				<Text style={styles.Focus}>Focus</Text>
				<SpeakerComp noise={noise} setNoise={setNoise} />
				<View style={styles.timerWrapper}>
					{startTimer ? (
						<CountDownTimer
							ref={refTimer}
							timestamp={time ? time : 20 * 60}
							timerCallback={timerCallbackFunc}
							containerStyle={styles.timerStyle}
							textStyle={styles.timerBtntextStyle}
						/>
					) : (
						<>
							{addtime ? (
								<AddTimeComp
									setTime={setTime}
									addTimeFunc={addTimeFunc}
									setAddtime={setAddtime}
								/>
							) : (
								<StartTimerComp setAddtime={setAddtime} />
							)}
						</>
					)}
				</View>

				<NoiseComp noise={noise} setNoise={setNoise} click={offNoise} />

				{startTimer ? (
					<>
						<TouchableOpacity
							style={[
								styles.timerBtn,
								{backgroundColor: GOLD_YELLOW},
							]}
							onPress={() => {
								setStartTimer(false);
								refTimer.current.resetTimer();
								setSound(false);
								setNoise(false);
							}}
						>
							<Text style={styles.timerBtntextStyle}>Reset</Text>
						</TouchableOpacity>
					</>
				) : (
					<TouchableOpacity
						style={styles.timerBtn}
						onPress={startTimerFunc}
					>
						<Text style={styles.timerBtntextStyle}>start</Text>
					</TouchableOpacity>
				)}
			</View>
		</>
	);
};

export default Focus;

const SpeakerComp = ({noise}) => (
	<TouchableOpacity style={styles.iconWrapper}>
		{noise ? (
			<Speaker name="volume-off" size={24} color="#000000" />
		) : (
			<IonIcon name="volume-mute" size={22} color="#000000" />
		)}
	</TouchableOpacity>
);

const NoiseComp = ({noise, click}) => (
	<View style={styles.noiseContainer}>
		<Text style={styles.whiteText}>Whitenoise</Text>
		<TouchableOpacity
			style={[
				styles.toggleWrapper,
				{backgroundColor: noise ? NAVY_BLUE : SWISS_RED},
			]}
			onPress={noise ? () => click("active") : () => click("inactive")}
		>
			{noise ? (
				<View style={[styles.active]}></View>
			) : (
				<View style={styles.inactive}></View>
			)}
		</TouchableOpacity>
	</View>
);

const AddTimeComp = ({setTime, addTimeFunc, setAddtime}) => (
	<>
		<Text style={styles.addtimeText}>add your time in minutes</Text>
		<TextInput
			style={styles.inputWrapper}
			onChangeText={(text) => setTime(text * 60)}
			keyboardType="numeric"
		/>
		<View style={styles.addtimebtnWrapper}>
			<TouchableOpacity
				style={styles.addBtn}
				onPress={() => setAddtime(false)}
			>
				<Text style={styles.addBtnText}>Back</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.addBtn} onPress={addTimeFunc}>
				<Text style={styles.addBtnText}>Add</Text>
			</TouchableOpacity>
		</View>
	</>
);

const StartTimerComp = ({setAddtime}) => (
	<TouchableOpacity
		style={styles.timerStyle}
		onPress={() => setAddtime(true)}
	>
		<Text style={styles.timerBtntextStyle}>00:00</Text>
	</TouchableOpacity>
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 60,

		backgroundColor: WHITE,
	},
	Focus: {
		fontSize: 25,
		fontFamily: BOLD,
		letterSpacing: 1,
	},
	iconWrapper: {
		height: 30,
		alignItems: "center",
		alignSelf: "flex-end",
		marginVertical: 10,
	},

	timerWrapper: {
		width: 220,
		height: 220,
		borderRadius: 200,
		borderColor: SWISS_RED,
		borderWidth: 1,
		overflow: "hidden",
		justifyContent: "center",
		alignItems: "center",
	},
	timerText: {
		fontFamily: BOLD,
		fontSize: 25,
	},

	btnStyle: {
		width: "60%",
		height: 40,
		backgroundColor: SWISS_RED,
		borderRadius: 30,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 8,
	},
	text: {
		color: WHITE,
		fontFamily: BOLD,
		fontSize: 16,
	},

	noiseContainer: {
		width: "70%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginVertical: 25,
	},
	whiteText: {
		fontFamily: BOLD,
		fontSize: 15,
	},
	toggleWrapper: {
		width: "30%",
		height: 25,
		borderRadius: 14,
		borderWidth: 1,
	},
	inactive: {
		position: "absolute",
		top: 1.5,
		left: 2,
		width: "45%",
		height: "88%",
		borderRadius: 100 / 2,
		backgroundColor: WHITE,
		elevation: 2,
		zIndex: 999,
	},
	active: {
		position: "absolute",
		top: 1.5,
		right: 2,
		width: "45%",
		height: "88%",
		borderRadius: 100 / 2,
		zIndex: 999,
		backgroundColor: WHITE,
		elevation: 2,
	},
	timerStyle: {
		height: 45,
		width: 120,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 35,
		backgroundColor: GOLD_YELLOW,
	},
	timerBtn: {
		height: 45,
		width: 120,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 35,
		backgroundColor: SWISS_RED,
	},
	timerBtntextStyle: {
		fontSize: 17,
		color: "#FFFFFF",
		fontWeight: "bold",
	},
	inputWrapper: {
		backgroundColor: WHITE,
		elevation: 5,
		width: 70,
		height: 40,
		borderRadius: 5,
		paddingHorizontal: 5,
		paddingLeft: 10,
		fontSize: 18,
	},
	addtimebtnWrapper: {
		width: "65%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginTop: 5,
	},
	addtimeText: {
		fontSize: 14,
		color: GRAY,
		marginBottom: 8,
	},
	addBtn: {
		backgroundColor: GOLD_YELLOW,
		marginTop: 10,
		width: "42%",
		height: 30,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 10,
		marginBottom: -5,
	},
	addBtnText: {
		color: WHITE,
		fontFamily: BOLD,
		fontSize: 13,
	},
});
