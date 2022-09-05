import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  View,
  Text,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { WHITE, SWISS_RED, GOLD_YELLOW, BLACK } from "../styles/Colors";
import Context from "../context/Context";
import { useNavigation } from "@react-navigation/native";
import FontIcon from "react-native-vector-icons/FontAwesome5";
import { BOLD } from "../styles/Fonts";
import { Icon,  Todos } from "../components/Reuse";
import { Loading } from "../components/Others";
import {
  deleteTodoFromFB,
  getAllCompletedTodos,
  updateTodoToFB,
} from "../functions/FBDB";
import { auth } from "../config/firebase";

export default function CompletedTodos({ route }) {
  const [todos, setTodos] = useState([]);
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  console.log(user);
  async function getTodos(clear) {
    await setLoading(true);
    setTodos([]);
    await getAllCompletedTodos(auth?.currentUser?.uid).then(
      async (response) => {
        setTodos(response.todos);
        setLoading(false);
      }
    );
  }
  useEffect(() => {
    getTodos();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: WHITE }}>
      <View style={{ flex: 1, paddingHorizontal: 15 }}>
        <StatusBar backgroundColor="transparent" barStyle="dark-content" />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <FontIcon
            onPress={() =>
              navigation.reset({
                index: 0,
                routes: [{ name: "Main" }],
              })
            }
            name="chevron-left"
            size={22}
            color={BLACK}
          />
          <Text style={styles.titleText}>Completed Todos</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Icon
            value="Undo All"
            extrabtnStyle={styles.extrabtnStyle}
            click={() => {
              todos.map((item) => {
                updateTodoToFB(item, item.id, "todo");
              });
              setTodos([]);
              navigation.reset({
                index: 0,
                routes: [{ name: "Main" }],
              });
            }}
          />

          <Text style={styles.totalText}>Total : {todos.length}</Text>
          <Icon
            value="Empty"
            extrabtnStyle={styles.extrabtnStyle}
            click={() => {
              todos.map((item) => {
                deleteTodoFromFB(item.id);
              });
              setTodos([]);
            }}
          />
        </View>
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 1,
            paddingTop: 10,
          }}
          showsVerticalScrollIndicator={false}
        >
          {todos.map((item, i) => (
            <Todos
              key={i}
              item={item}
              navigation={navigation}
              onUndo={() => {
                updateTodoToFB(item, item.id, "todo").then(() => {
                  let newTodos = todos.filter((el) => item.id != el.id);
                  setTodos(newTodos);
                });
              }}
              onDelete={() => {
                deleteTodoFromFB(item.id).then(() => {
                  let newTodos = todos.filter((el) => item.id != el.id);
                  setTodos(newTodos);
                });
              }}
            />
          ))}
          {loading && <Loading />}
          {!loading && todos.length == 0 && (
            <Text
              style={{ ...styles.titleText, color: SWISS_RED, marginTop: 100 }}
            >
              No To-Do found!!
            </Text>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleText: {
    textAlign: "center",
    marginTop: 5,
    marginBottom: 10,
    fontSize: 22,
    fontFamily: BOLD,
    alignSelf: "center",
    width: "100%",
  },
  flexStyle: {
    flexDirection: "row",
    alignItems: "center",
  },
  topContainer: {
    justifyContent: "space-between",
    marginBottom: 8,
  },

  totalText: {
    color: SWISS_RED,
    fontSize: 17,
    fontFamily: BOLD,
    borderBottomColor: SWISS_RED,
    borderBottomWidth: 2,
    height: 28,
  },

  extrabtnStyle: {
    borderRadius: 5,
    width: 65,
  },
});
