import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  getAuth,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { Alert } from "react-native";
import { auth } from "../config/firebase";
import { ErrorCodes } from "../config/ErrorCodes";

const showError = (error) => {
  // console.log(error)
  let existingErr = ErrorCodes.find((err) => error.code === err.error);
  let errorMessage = existingErr ? existingErr.message : "Please try again.";
  let header = existingErr ? "" : "Login failed !";
  Alert.alert(header, errorMessage, [{ text: "OK" }]);
};

export const fbRegister = (data_given, email, password) => {
  if (!data_given) {
    return Alert.alert("Please fill all the fields!");
  } else if (password.length < 6) {
    reject({error:"Error"});
    return Alert.alert("Password must be at least 6 character long");
  } else {
    return new Promise(async (resolve, reject) => {
      await createUserWithEmailAndPassword(auth, email, password)
        .then((info) => {
          resolve(info);
          Alert.alert("Registered Successfully");
        })
        .catch((error) => {
          showError(error);
          reject(error);
        });
    });
  }
};

export const fbLogin = async (email, password) => {
  return new Promise(async (resolve, reject) => {
    if (!email || !password) {
      reject("err");
      Alert.alert("Please fill all the fields!");
    } else {
      await signInWithEmailAndPassword(auth, email, password)
        .then((info) => {
          Alert.alert("Succesfully Logged In!");
          resolve(info);
        })
        .catch((error) => {
          reject(error);
          showError(error);
        });
    }
  });
};
export const fbResetPassword = async (email) => {
  return new Promise(async (resolve, reject) => {
    if (!email) {
      reject("err");
      Alert.alert("Please, Insert a valid email!");
    } else {
      await sendPasswordResetEmail(auth, email)
        .then((info) => {
          Alert.alert("A mail with verification message sent to your email!");
          resolve(info);
        })
        .catch((error) => {
          reject(error);
          showError(error);
        });
    }
  });
};
export const getMyAuth =  () => {
  const auth =  getAuth();
  onAuthStateChanged(auth, async (user) => {
    if (await user) {
      console.log(user)
      return await user;
    } else {
      return null;
    }
  });
};
export const logOut =  () => {
  signOut(auth).then(() => {
    console.log("logged out")
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
};
