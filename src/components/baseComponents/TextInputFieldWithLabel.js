//#region import
import React from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
//#endregion

//#region TextInputFieldWithLabel 
const TextInputFieldWithLabel = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  marginBottom,
}) => {
  return (
    <View
      style={[
        styles.container,
        { marginBottom: marginBottom ? marginBottom : 0 },
      ]}
    >
      <Text style={styles.label}>{placeholder}</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          allowFontScaling={false}
          numberOfLines={1}
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#979797"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    gap:8,
    //backgroundColor: "lightgreen",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    borderWidth: 2,
    backgroundColor: "#161616",
    borderColor: "#8E8E8E",
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 14,
    color:"white",
    fontSize:16
    //backgroundColor: "green",
  },
  label: {
    color: "white",
    fontStyle:"normal",
    //backgroundColor:"red"
  },
});
//#endregion

export default TextInputFieldWithLabel;
