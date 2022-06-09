import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Screen from "../components/Screen";
import { Form, Formik } from "formik";
import FormField from "../components/FormField";
import { Link } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config";
import colors from "../config/colors";
import { color } from "react-native-reanimated";

const RegisterScreen = ({ setUser, user }) => {
  const handleSignUp = ({ email, password }) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("user: ", user);
        setUser(user);
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };
  return (
    <Screen>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.textCont}>
          <Text style={styles.title}>Sign Up</Text>
          <Text style={styles.welcome}>
            Signup for a new account by adding your information below.
          </Text>
        </View>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => handleSignUp(values)}
        >
          {({ handleSubmit }) => (
            <>
              <View style={styles.inputCont}>
                <FormField name="email" placeholder="Email" />
                <FormField
                  name="password"
                  placeholder="Password"
                  secure={true}
                />
                <FormField
                  name="repeat password"
                  placeholder="Repeat Password"
                  secure={true}
                />
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                  <Text style={{ color: "white", fontSize: 16 }}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>

        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text>Already have an account ?</Text>
          <Text style={{ color: "#FFAB07", marginHorizontal: 5 }}>
            <Link to="/Login">Login</Link>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: "600",
  },
  welcome: {
    color: colors.medium,
  },
  textCont: {
    marginTop: 15,
    marginHorizontal: 25,
  },
  inputCont: {
    marginTop: 50,
    marginHorizontal: 15,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.medium,
    width: "100%",
    padding: 7,
    height: 60,
    alignSelf: "center",
  },
  formField: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: "500",
  },
  buttonContainer: {
    marginVertical: 40,
  },
  button: {
    width: "80%",
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    height: 45,
    borderRadius: 40,
  },
});
