import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import CustomButton from './CustomButton'


const ImagePickerCom = props => {
  const [image, setImage] = useState(null);

  useEffect(() => {

    if (props.show){
      setImage(props.thumbnail)
    }

    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.7,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      console.log(result)
      console.log(result.uri.split('/').pop)
      props.onGetImage(result.uri);
    }
  };



  return (
    <View style={styles.imagePicker}>
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 133.333, margin:10 }} />}
      <CustomButton style={styles.button} title="Image from gallery" onPress={pickImage} />
    </View>
  );
}

const styles = StyleSheet.create({
    imagePicker:{ 
        flex: 1,
        alignItems: 'center', 
        justifyContent: 'center', 
        marginVertical:10 },
})

export default ImagePickerCom;