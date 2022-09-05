import {
	View,
	Text,
	ScrollView,
	Image,
	StyleSheet,
	ImageBackground,
} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import React, {useState} from "react";
import {GRAY, SWISS_RED, WHITE} from "../styles/Colors";
import {BOLD, REGULAR} from "../styles/Fonts";
import {TouchableOpacity} from "react-native";
import Modal from "react-native-modal";
import RewardsNotify from "../components/RewardsNotify";
import {modelStyle} from "./Focus";
import CrossIcon from "react-native-vector-icons/Entypo";
import {
	collection,
	doc,
	onSnapshot,
	orderBy,
	query,
	Timestamp,
	updateDoc,
	where,
} from "firebase/firestore";
import {db, auth} from "../config/firebase";
import {useEffect} from "react";
import {getCurrentUser, getSingleUserInfo} from "../functions/FBDB";
import {useContext} from "react";
import Context from "../context/Context";

const coinImg =
	"https://img.freepik.com/premium-vector/golden-coins-set-flat-gold-icon-economy-finance-money-concept-wealth-symbol-vector-illustration-isol_144920-932.jpg?w=2000";

const singleCoin =
	"https://media.istockphoto.com/vectors/coin-with-dollar-sign-vector-id178909251?k=20&m=178909251&s=612x612&w=0&h=WRQLXRdClKv0ArwE8wCaS1xw94mZe61qirojBzi1zqY=";

const Offers = [
	{
		id: 1,
		img: "https://img.freepik.com/premium-vector/shopping-mall-illustration-set-half-price-discount-gleaming-giftlike-golden-coupon-coin_632180-345.jpg?w=2000",
	},
	{
		id: 2,
		img: "https://static.vecteezy.com/system/resources/thumbnails/008/312/354/small/gift-coupon-template-promo-code-to-save-money-vector.jpg",
	},
];

export default function Rewards() {
	const [show, setShow] = useState(false);
	const [voucher, setVoucher] = useState(false);
	const [myCoin,setMyCoin] = useState(0);
	const [coinsTakenAt,setCoinsTakenAt] = useState(null);
	const award_coin = Array(7).fill("");
	const [myInfo, setMyInfo] = useState();

	const userMe = auth?.currentUser?.uid;

	const dailyCoinFunc = async (i) => {
		console.log(myInfo)
		if(coinsTakenAt){
			// console.log(coinsTakenAt?.toDate().getDay())
		}else if (!i){
			let coins = myCoin+20;
			await updateDoc(doc(db, "Users", myInfo.uid), {
				coins,
				coinsTakenAt:new Date().toLocaleDateString(),
			}).then(()=>{
			setCoinsTakenAt(new Date().toLocaleDateString());
			setMyCoin(coins);
			setShow(true);
			})
	
	}
	};
	const VoucherCoinFunc = () => {
		setVoucher(true);
	};

	const infoFunc = () => {
		alert("already taken!!!");
	};

	useEffect(() => {
		getCurrentUser().then(user=>{
			setMyInfo(user)
			setCoinsTakenAt(user?.coinsTakenAt ?? null);
			setMyCoin(user?.coins ?? 0);
		})
	}, []);
	console.log(myInfo)
	return (
		<SafeAreaView style={styles.root}>
			<ScrollView>
				<Text style={styles.title}>Coin Rewards Page</Text>
				<View style={styles.profileWrapper}>
					<Image source={{uri: coinImg}} style={styles.imgStyle} />
					<Text style={styles.totalCoin}>
						{myCoin} Coins
					</Text>
				</View>

				<View style={styles.dailyCoinConatiner}>
					<Text style={styles.textStyle}>
						Come back Tomorrow to get more coins
					</Text>

					<View style={styles.iconWrapper}>
						<Modal
							style={modelStyle}
							animationOut="zoomOut"
							isVisible={show}
							useNativeDriver={true}
						>
							<RewardsNotify setValue={setShow} />
						</Modal>
						{award_coin.map((data, i) => (
							<DailyCoins
								key={data.id}
								value={data}
								index={i}
								click={()=>dailyCoinFunc(i)}
								infoFunc={infoFunc}
								coinsTakenAt={coinsTakenAt}
							/>
						))}
					</View>

					<View style={styles.footerContainer}>
						<Text style={styles.reedemText}>Reedem your coins</Text>
						{Offers.map((data) => (
							<SpecialOffer
								value={data}
								key={data.id}
								click={VoucherCoinFunc}
							/>
						))}

						<Modal
							style={modelStyle}
							animationOut="zoomOut"
							isVisible={voucher}
							animationOutTiming={700}
							useNativeDriver={true}
						>
							<RewardsNotify
								setValue={setVoucher}
								voucher="voucher"
							/>
						</Modal>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const DailyCoins = ({value,index, click, infoFunc,coinsTakenAt}) => (
	<TouchableOpacity
		style={styles.dailyimgWrapper}
		onPress={click}
	>
		<ImageBackground style={styles.coinImgStyle} source={{uri: singleCoin}}>
			{coinsTakenAt && index == 0 && coinsTakenAt == new Date().toLocaleDateString() ? (
				<CrossIcon
					name="circle-with-cross"
					color={SWISS_RED}
					size={27}
					style={{marginTop: -1}}
				/>
			) : null}
		</ImageBackground>
		<Text style={[styles.dayText, ]}>
			{index == 0 ?"Today":("Day "+(index+1))}
		</Text>
	</TouchableOpacity>
);

const SpecialOffer = ({value, click}) => (
	<TouchableOpacity style={styles.offerContainer} onPress={click}>
		<Image source={{uri: value.img}} style={styles.offerImgStyle} />
	</TouchableOpacity>
);

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: WHITE,
	},
	title: {
		marginTop: 20,
		textAlign: "center",
		fontFamily: BOLD,
		letterSpacing: 1,
		fontSize: 17,
	},
	profileWrapper: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginTop: 20,
	},
	imgStyle: {
		width: 130,
		height: 100,
	},
	totalCoin: {
		fontFamily: REGULAR,
		letterSpacing: 1,
		marginLeft: -10,
		marginTop: -15,
		fontSize: 18,
	},
	textStyle: {
		fontFamily: REGULAR,
		fontSize: 15,
		marginBottom: 8,
	},

	dailyCoinConatiner: {
		alignItems: "center",
		marginTop: 20,
	},
	iconWrapper: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		paddingBottom: 10,
		marginLeft: 8,
		height: 70,
	},
	dailyimgWrapper: {
		width: 33,
		height: 33,
		backgroundColor: WHITE,
		marginRight: 8,
	},
	coinImgStyle: {
		width: "100%",
		height: "100%",
		borderRadius: 100 / 2,
		justifyContent: "center",
		alignItems: "center",
	},
	number: {
		fontSize: 12,
	},
	dayText: {
		fontSize: 11,
		textAlign: "center",
	},

	footerContainer: {
		width: "100%",
		marginTop: 30,
		paddingHorizontal: 15,
	},
	reedemText: {
		textAlign: "center",
		marginBottom: 15,
		fontSize: 17,
		fontFamily: BOLD,
		letterSpacing: 1,
	},
	offerContainer: {
		width: "100%",
		height: 100,
		marginBottom: 10,
	},

	offerImgStyle: {
		width: "100%",
		height: "100%",
		borderRadius: 10,
	},
});
