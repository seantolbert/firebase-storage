import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import { BlurView, VibrancyView } from "@react-native-community/blur";
import ProgressBar from "./ProgressBar";
import { Video } from "expo-av";

const Uploading = ({ image, video, progress }) => {
  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        {
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1,
        },
      ]}
    >
      <VibrancyView
        style={StyleSheet.absoluteFill}
        blurType="ultraThinMaterialDark"
      ></VibrancyView>
      <BlurView
        style={{
          width: "70%",
          alignItems: "center",
          paddingVertical: 16,
          rowGap: 12,
          borderRadius: 6,
        }}
        blurType="light"
      >
        {image && (
          <Image
            source={{ uri: image }}
            style={{
              width: 100,
              height: 100,
              resizeMode: "contain",
              borderRadius: 6,
            }}
          />
        )}
        {video && (
          <Video
            source={{ uri: video }}
            videoStyle={{}}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="contain"
            // shouldPlay
            // isLooping
            style={{ width: "80%", height: "80%" }}
            // useNativeControls
          />
        )}
        <Text style={{ fontSize: 12 }}>Uploading...</Text>
        <View
          style={{
            height: 1,
            width: "100%",
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: "#00000020",
          }}
        />
        <TouchableOpacity>
          <Text style={{ fontWeight: "500", color: "#3478F6", fontSize: 17 }}>
            Cancel
          </Text>
        </TouchableOpacity>
      </BlurView>
    </View>
  );
};

export default Uploading;
