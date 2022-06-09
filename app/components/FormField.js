import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { useFormikContext } from "formik";

const FormField = ({ name, placeholder, secure = false }) => {
  const { handleChange, handleBlur, values } = useFormikContext();

  return (
    <View style={styles.formField}>
      <Text style={styles.label}>{placeholder}</Text>
      <TextInput
        placeholder={placeholder}
        name={name}
        style={styles.input}
        onChangeText={handleChange(name)}
        onBlur={handleBlur(name)}
        value={values[name]}
        secureTextEntry={secure}
      />
    </View>
  );
};

export default FormField;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ccc",
    width: "100%",
    padding: 5,
    height: 50,
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
});
