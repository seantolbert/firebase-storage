import { View, Image, TouchableOpacity, FlatList } from "react-native";
import Uploading from "../components/Uploading";
import IonIcons from "@expo/vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { db, storage } from "../firebase";
import { Video } from "expo-av";

const Home = () => {
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");
  const [progress, setProgress] = useState(0);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "files"), (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          console.log("new file", change.doc.data());
          setFiles((prevFiles) => [...prevFiles, change.doc.data()]);
        }
      });
    });

    return () => unsubscribe();
  }, []);

  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      // upload the image
      await uploadImage(result.assets[0].uri, "image");
    }
  }

  async function pickVideo() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      // upload the video
      await uploadImage(result.assets[0].uri, "video");
      await saveRecord("image", url);
    }
  }

  async function uploadImage(uri, fileType) {
    const response = await fetch(uri);
    const blob = await response.blob();

    const storageRef = ref(storage, "Stuff/" + new Date().getTime());
    const uploadTask = uploadBytesResumable(storageRef, blob);

    // listen for events
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Progress: " + progress + "% done");
        setProgress(progress.toFixed());
      },
      (error) => {
        // handle errors
        console.log(error.message + " failed to fetch");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log("File available at ", downloadURL);
          // save record
          await saveRecord(fileType, downloadURL, new Date().toISOString());
          setImage("");
          setVideo("");
        });
      }
    );
  }

  async function saveRecord(fileType, url, createdAt) {
    try {
      const docRef = await addDoc(collection(db, "files"), {
        fileType,
        url,
        createdAt,
      });

      console.log("document saved correctly " + docRef.id);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={files}
        keyExtractor={(item) => item.url}
        numColumns={3}
        contentContainerStyle={{ gap: 2 }}
        columnWrapperStyle={{ gap: 2 }}
        renderItem={({ item }) => {
          if (item.fileType === "image") {
            return (
              <Image
                source={{ uri: item.url }}
                style={{ width: "34%", height: 100 }}
              />
            );
          } else {
            return (
              <Video
                source={{ uri: item.url }}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                resizeMode="cover"
                shouldPlay
                // isLooping
                style={{ width: "34%", height: 100 }}
                useNativeControls
              />
            );
          }
        }}
      />
      {image && <Uploading image={image} video={video} progress={progress} />}

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
