import {StyleSheet, Text, View} from "react-native";
import React from "react";
import {GOLD_YELLOW, GRAY, WHITE} from "../styles/Colors";
import {BOLD, REGULAR} from "../styles/Fonts";
import Coin from "react-native-vector-icons/FontAwesome5";
import {TouchableOpacity} from "react-native";
import {useNavigation} from "@react-navigation/native";

const RewardsNotify = ({setValue, voucher, setNoise, go}) => {
	const navigation = useNavigation();

	const goToHome = () => {
		navigation.navigate("Rewards");
	};
	return (
		<View style={styles.container}>
			<View style={[styles.wrapper, voucher && {marginBottom: 15}]}>
				{voucher ? (
					<>
						<Text style={[styles.infoText, styles.voucherText]}>
							Congratulations! You have redeemed a discount
							voucher!
						</Text>
						<Text style={[styles.infoText, styles.voucherText]}>
							Your voucher code is 567080.
						</Text>
						<Text style={[styles.infoText, styles.voucherText]}>
							Approach staff with above code to get 10% discount
						</Text>
					</>
				) : (
					<Text style={styles.infoText}>
						Congratulations! You have been productive today. Here
						is your reward! Take a 5 minute break!
					</Text>
				)}
			</View>
			<>
				{voucher ? null : (
					<View style={styles.coinContainer}>
						<View style={styles.coinWrapper}>
							<Coin name="coins" size={20} color={GOLD_YELLOW} />
						</View>
						<Text style={styles.coinText}>20 Coins</Text>
					</View>
				)}
			</>

			<TouchableOpacity
				style={styles.btn}
				onPress={() => {
					setValue(false);
					setNoise && setNoise(false);
					go && goToHome();
				}}
			>
				<Text style={styles.btnText}>Ok</Text>
			</TouchableOpacity>
		</View>
	);
};

export default RewardsNotify;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 20,
	},
	wrapper: {
		backgroundColor: GOLD_YELLOW,
		padding: 15,
		borderRadius: 10,
	},
	infoText: {
		maxWidth: "70%",
		letterSpacing: 1,
		fontSize: 15,
		lineHeight: 24,
		color: WHITE,
		fontFamily: BOLD,
		paddingHorizontal: 10,
	},
	voucherText: {
		fontSize: 13,
		lineHeight: 20,
	},
	coinContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginVertical: 15,
		backgroundColor: GOLD_YELLOW,
		padding: 10,
		paddingHorizontal: 15,
		borderRadius: 10,
	},
	coinWrapper: {
		backgroundColor: WHITE,
		padding: 7,
		marginRight: 8,
		borderRadius: 30,
	},
	coinText: {
		color: WHITE,
		fontFamily: REGULAR,
	},
	btn: {
		width: "40%",
		backgroundColor: GOLD_YELLOW,
		elevation: 1,
		justifyContent: "center",
		alignItems: "center",
		height: 45,
		borderRadius: 10,
	},
	btnText: {
		fontFamily: BOLD,
		color: WHITE,
	},
});
