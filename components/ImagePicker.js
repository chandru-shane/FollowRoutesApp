import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import CustomButton from './CustomButton'


const ImagePickerCom = props => {
  const [image, setImage] = useState(null);
  let aspect = [16, 9]

  if(props.isAspect){ 
    aspect = props.aspect
    console
    
  } 
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
      aspect: aspect,
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

  let button = <CustomButton style={styles.button} title="Image from gallery" onPress={pickImage} />
  if(props.remove){
    button = <View style={{flexDirection:'row',justifyContent:'space-between', margin:1 }}>
      <CustomButton style={{...styles.button,backgroundColor:'red' }} title={props.removeTitle} onPress={props.removeHandler} />
      <CustomButton style={{...styles.button, margin:1}} title="Image from gallery" onPress={pickImage} />
    </View>
  }

  return (
    <View style={styles.imagePicker}>
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 133.333, margin:10 , ...props.imageStyle}} />}
      {button}
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