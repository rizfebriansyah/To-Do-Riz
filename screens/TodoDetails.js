import { View, Text, StyleSheet, Pressable, Linking } from "react-native";
import React from "react";
import Screen from "../components/Screen";
import { BOLD, REGULAR } from "../styles/Fonts";
import { BLACK, GOLD_YELLOW } from "../styles/Colors";
import { width } from "../styles/Others";
import { SpeedDial } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";

export default function TodoDetails({ route }) {
  const { item } = route.params;
  const navigation = useNavigation();
  return (
    <Screen title="Todo Details">
      <View style={{ marginTop: 10 }}>
        <View style={styles.row}>
          <Text style={styles.label}>To Do</Text>
          <Text style={styles.separator}> : </Text>
          <Text style={styles.title}>{item.title}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Description</Text>
          <Text style={styles.separator}> : </Text>
          <Text style={styles.value}>{item.description}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Schedule</Text>
          <Text style={styles.separator}> : </Text>
          <Text style={styles.value}>{item.time.toDate().toString().split('GMT')[0]}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Document</Text>
          <Text style={styles.separator}> : </Text>
          <Pressable
            onPress={() => {
              item.document ? Linking.openURL(item.document) : null;
            }}
          >
            <Text style={styles.value}>
              {item.document ? item.document : "No documents attached"}
            </Text>
          </Pressable>
        </View>
      </View>
       <SpeedDial isOpen={false}
       color={GOLD_YELLOW}
       overlayColor="transparent"
    icon={{ name: 'edit', color: '#fff',type:"font-awesome"}}
    openIcon={{ name: 'close', color: '#fff' }}
    onOpen={() =>navigation.navigate('AddTask',{item,task:'Edit'})}/>
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    width: width - 30,
    marginBottom: 10,
  },
  label: {
    fontFamily: REGULAR,
    fontSize: 16,
    color: BLACK,
    letterSpacing: 1,
    width: 115,
  },
  title: {
    fontFamily: BOLD,
    fontSize: 18,
    color: BLACK,
    letterSpacing: 1,
    marginLeft: 5,
  },
  value: {
    fontFamily: REGULAR,
    fontSize: 18,
    color: BLACK,
    letterSpacing: 1,
    marginLeft: 5,
    width:width-150
  },
});
