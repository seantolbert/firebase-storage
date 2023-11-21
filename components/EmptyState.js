import { Text, View } from "react-native";
import SvgComponent from "../assets/SVG";

const EmptyState = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <SvgComponent />
      <Text style={{ color: "gray", marginTop: 20 }}>
        No Photos uploaded yet
      </Text>
    </View>
  );
};

export default EmptyState;
