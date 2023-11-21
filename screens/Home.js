import { View, Text, TouchableOpacity } from "react-native";
import ProgressBar from "../components/ProgressBar";
import Uploading from "../components/Uploading";
import IonIcons from "@expo/vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";

const Home = () => {
  const pickImage = async () => {
    let reesult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
  };

  const pickVideo = () => {};
  return (
    <View style={{ flex: 1 }}>
      {/* <Uploading /> */}
      <ProgressBar progress={50} />

      <TouchableOpacity
        onPress={pickImage}
        style={{
          position: "absolute",
          bottom: 90,
          right: 30,
          width: 44,
          height: 44,
          backgroundColor: "black",
          borderRadius: 25,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <IonIcons name="image" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={pickVideo}
        style={{
          position: "absolute",
          bottom: 150,
          right: 30,
          width: 44,
          height: 44,
          backgroundColor: "black",
          borderRadius: 25,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <IonIcons name="videocam" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default Home;
