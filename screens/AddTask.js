import {
	Text,
	Pressable,
	Alert,
	ScrollView,
	StyleSheet,
	Platform,
} from "react-native";
import React, {useContext, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import RegularInput from "../components/RegularInput";
import RegularButton from "../components/RegularButton";
import {width} from "../styles/Others";
import Context from "../context/Context";
import Screen from "../components/Screen";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import * as DocumentPicker from "expo-document-picker";
import {REGULAR} from "../styles/Fonts";
import {MID_GRAY} from "../styles/Colors";
import {moderateScale} from "../styles/Scalling";
import AntIcon from "react-native-vector-icons/AntDesign";
import {uploadFile} from "../functions/FBStorage";
import RNDateTimePicker, {
	DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import {addTodoToFB} from "../functions/FBDB";
import { auth } from "../config/firebase";
export default function AddTask({route}) {
	const task = route?.params?.task ?? "Add";
	const data = route?.params?.item ?? {};
	console.log(data);
	const {user} = useContext(Context);
	const [document, setDocument] = useState(
		task == "Edit" && data.document ? {name: data.document} : ""
	);
	const [date, setDate] = useState(task == "Edit" ? data.time.toDate() : new Date());
	const [time, setTime] = useState(task == "Edit" ? data.time.toDate() : new Date());
	const [title, setTitle] = useState(task == "Edit" ? data.title : "");
	const [description, setDescription] = useState(
		task == "Edit" ? data.description : ""
	);
	const [loading, setLoading] = useState(false);
	const navigation = useNavigation();

	const selectDate = (currentMode) => {
		DateTimePickerAndroid.open({
			value: date,
			onChange: (e, date) => {
				setDate(date);
			},
			mode: "date",
			is24Hour: true,
		});
	};
	const selectTime = () => {
		DateTimePickerAndroid.open({
			value: time,
			onChange: (e, time) => {
				setTime(time);
			},
			mode: "time",
			is24Hour: true,
		});
	};
	const addTodo = async () => {
		if (title && description) {
			setLoading(true);
			let info = {
				user: auth.currentUser.uid,
				title,
				status:'todo',
				description,
				time,
				added_at: new Date(),
			};
			let id = task == "Edit" ? data.id : null;
			if (document?.uri) {
				uploadFile(document.uri).then((uri) => {
					info.document = uri;
					addTodoToFB(info, id).then(() => {
						navigation.reset({
							index: 0,
							routes: [{name: "Main"}],
						});
					});
				});
			} else {
				addTodoToFB(info, id).then(() => {
					navigation.reset({
						index: 0,
						routes: [{name: "Main"}],
					});
				});
			}

			setLoading(false);
		} else {
			Alert.alert("", "All fields are required!!");
		}
	};
	const selectDocument = () => {
		DocumentPicker.getDocumentAsync().then((data) => {
			if (data) {
				setDocument(data);
			}
		});
	};
	return (
		<Screen title={task + " To Do"}>
			<ScrollView>
				<KeyboardAwareScrollView
					contentContainerStyle={{
						width,
						paddingHorizontal: 15,
						paddingTop: 10,
					}}
				>
					<RegularInput
						placeholder="Title"
						value={title}
						icon="text-width"
						setValue={(value) => setTitle(value)}
					/>
					<RegularInput
						placeholder="Description"
						lg
						multiline
						icon="list-ul"
						value={description}
						setValue={(value) => setDescription(value)}
					/>
					<Pressable
						style={{
							flexDirection: "row",
							padding: 10,
							marginBottom: 20,
							alignItems: "center",
						}}
					>
						<AntIcon name="calendar" size={22} color={MID_GRAY} />
						<Text style={styles.value}>Due by</Text>
						{Platform.OS === "ios" ? (
							<RNDateTimePicker
								onChange={(e, date) => setTime(date)}
								mode="datetime"
								value={time}
								style={{width: 240}}
							/>
						) : (
							<>
								<Pressable
									style={{
										flexDirection: "row",
										paddingHorizontal: 5,
									}}
									onPress={selectDate}
								>
									<AntIcon
										name="caretdown"
										size={18}
										color={MID_GRAY}
									/>
									<Text style={styles.value}>
										{date
											? date
													.toDateString()
													.split(" ")
													.slice(1)
													.join(" ")
											: "Date"}
									</Text>
								</Pressable>
								<Pressable
									style={{
										flexDirection: "row",
										paddingHorizontal: 5,
									}}
									onPress={selectTime}
								>
									<AntIcon
										name="caretdown"
										size={18}
										color={MID_GRAY}
									/>
									<Text style={styles.value}>
										{time
											? time.toTimeString().split(" ")[0]
											: "Time"}
									</Text>
								</Pressable>
							</>
						)}
					</Pressable>
					<Pressable
						style={{
							flexDirection: "row",
							padding: 10,
							marginBottom: 30,
						}}
						onPress={selectDocument}
					>
						<AntIcon name="addfolder" size={22} color={MID_GRAY} />
						<Text style={styles.value}>
							{document ? document.name : "Document"}
						</Text>
					</Pressable>
					<RegularButton
						title={task == "Edit" ? "Update" : "Add"}
						style={{width: width - 30, marginBottom: 50}}
						mt={20}
						height={50}
						onPress={addTodo}
						loading={loading}
					/>
				</KeyboardAwareScrollView>
			</ScrollView>
		</Screen>
	);
}

const styles = StyleSheet.create({
	value: {
		fontFamily: REGULAR,
		color: MID_GRAY,
		fontSize: moderateScale(18),
		marginLeft: 6,
	},
});
