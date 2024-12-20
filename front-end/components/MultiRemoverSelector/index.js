import { ScrollView, View, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import styled from "styled-components/native";
import theme from "../../config/theme";

const SelectorItem = styled.View`
  background-color: ${theme.colors.gray.gray2};
  padding: 18px 28px;
  border-radius: 100px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const SelectorItemText = styled.Text`
  color: white;
  font-size: 14px;
  font-family: Montserrat_600SemiBold;
  flex: 1;
`;

const MultiRemoverSelector = ({ value, onRemoveItem, onChangeValue }) => {
  const handleRemoveItem = (item) => {
    const newValue = value.filter((v) => v.value !== item.value);
    if (onRemoveItem) onRemoveItem(item);
    if (onChangeValue) onChangeValue(newValue);
  };

  return (
    <ScrollView>
      {value.map((item) => (
        <View key={item.value} style={{ marginBottom: 12 }}>
          <SelectorItem>
            <SelectorItemText>{item.name}</SelectorItemText>
            <TouchableOpacity onPress={() => handleRemoveItem(item)}>
              <Ionicons name="close" size={18} color="white" />
            </TouchableOpacity>
          </SelectorItem>
        </View>
      ))}
    </ScrollView>
  );
};

export default MultiRemoverSelector;
