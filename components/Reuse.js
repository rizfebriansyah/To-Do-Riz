import {
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Pressable,
} from "react-native";
import {
  NAVY_BLUE,
  SWISS_RED,
  WHITE,
  GRAY,
  GOLD_YELLOW,
} from "../styles/Colors";
import CheckIcon from "react-native-vector-icons/Entypo";
import { BOLD, REGULAR } from "../styles/Fonts";
import Modal from "react-native-modal";
import RewardsNotify from "./RewardsNotify";
import { height } from "../styles/Others";
import LeftIcon from "react-native-vector-icons/Fontisto";

export const InputComp = ({ placeholder, extraStyle, value, onChangeText }) => (
  <TextInput
    placeholder={placeholder}
    style={[styles.inputStyle, extraStyle]}
    value={value}
    onChangeText={onChangeText}
  />
);

export const Icon = ({ value, extrabtnStyle, click, onUndo }) => (
  <TouchableOpacity
    style={[styles.iconWrapper, extrabtnStyle]}
    onPress={click ? click : null}
  >
    <Text style={styles.iconStyle}>{value}</Text>
  </TouchableOpacity>
);

export const Todos = ({ item, navigation, onComplete, onUndo, onDelete }) => (
  <View style={styles.todoWrapper}>
    <View style={[styles.flexStyle, { marginBottom: 15 }]}>
      <Text style={styles.todoText}>{item.title}</Text>
      {item.status == "todo" ? (
        <CheckIcon name="check" size={20} onPress={onComplete} />
      ) : (
        <Pressable onPress={onUndo}>
          <Text style={{ color: SWISS_RED, fontSize: 15 }}>Undo</Text>
        </Pressable>
      )}
    </View>
    <View style={styles.flexStyle}>
      <Text style={styles.dateText}>
        {item.time.toDate().toString().split("GMT")[0]}
      </Text>
	  {item.status == "todo" ? (
        <Icon
        value="Edit"
        extrabtnStyle={styles.editbtnStyle}
        click={() => navigation.navigate("TodoDetails", { item })}
      />
      ) : (
        <Pressable onPress={onDelete}>
          <Text style={{ color: SWISS_RED, fontSize: 15 }}>Delete</Text>
        </Pressable>
      )}
    </View>
  </View>
);

export const BackBtnComp = ({ navigation, setSound }) => (
  <TouchableOpacity
    style={styles.backBtnWrapper}
    onPress={() => {
      setSound(false);
      navigation.goBack();
    }}
  >
    <LeftIcon name="arrow-left-l" size={20} color={WHITE} />
    <Text style={{ color: WHITE, fontFamily: BOLD }}>Back</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  inputStyle: {
    width: "100%",
    height: 35,
    borderWidth: 1,
    borderColor: NAVY_BLUE,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  iconWrapper: {
    width: 35,
    height: 35,
    borderRadius: 100 / 2,
    backgroundColor: SWISS_RED,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  iconStyle: {
    color: WHITE,
    fontSize: 12,
  },
  todoText: {
    maxWidth: "75%",
    fontFamily: REGULAR,
    letterSpacing: 1,
    lineHeight: 22,
  },
  dateText: {
    fontFamily: REGULAR,
    fontSize: 12,
    color: GRAY,
  },
  todoWrapper: {
    backgroundColor: WHITE,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    marginBottom: 15,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderLeftColor: SWISS_RED,
    borderLeftWidth: 5,
  },
  flexStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  editbtnStyle: {
    borderRadius: 5,
    width: 35,
    height: 23,
    marginRight: 0,
  },
  backBtnWrapper: {
    position: "absolute",
    top: 45,
    left: 10,
    width: 90,
    height: 35,
    backgroundColor: GOLD_YELLOW,
    elevation: 5,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 10,
    borderRadius: 10,
  },
});
