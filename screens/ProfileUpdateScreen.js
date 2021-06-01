import React, { useState } from 'react';
import { View,Dimensions , Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import CustomButton from '../components/CustomButton';
import ImagePicker from '../components/ImagePicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Urls from '../constants/Urls';

const ProfileUpdateScreen = props => {
    const data = props.navigation.getParam('data');
    const [displayName, setDisplayName] = useState(data.display_name);
    const [image, setImage] = useState(data.image);
    const [bio, setBio] = useState(data.bio);
    const [loading, setLoading] = useState(false);
    console.log(data, 'data from user update profile')

    const bioHandler = text => {
        setBio(text);
    }
    const displayNameHandler = text => {
        setDisplayName(text)
    }


    const putUpdateProfile = async () => {
        setLoading(true);
        const token = await AsyncStorage.getItem('MR_Token');
        console.log('getting token', token)
      
        let imageData = {
            uri: image,
            type: 'image/jpeg',
            name: image.split('/').pop()
        }
        let form = new FormData();
        form.append('image', imageData)   
        form.append('bio', bio)
        form.append('display_name', displayName)


        try {
            console.log('this is new', Urls.UPDATE_PROFILE) // change the url here : CHANGED
            if (token) {
                console.log('im is', `${Urls.UPDATE_PROFILE}`)
                await fetch(Urls.UPDATE_PROFILE, {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "multipart/form-data",
                        'Authorization': `Token ${token}`

                    },
                    body: form
                }).then(res => {
                        if (res.status != 200) {
                            return;
                        }
                        console.log(res, '---------------------')
                        return res.json()
                    })
                    .then(res => {
                        console.log('printing from right after created')
                        console.log(res)
                        setLoading(false);
                        props.navigation.navigate({ routeName: 'User' }) // TODO: check here anything to change
                    })
                    .catch(error => console.log(error));


                console.log('patching')

            }
            else {
                props.navigation.navigate('Auth');
            }
        }
        catch (err) {
            console.log(err);
        }
    }


    return (
        <ScrollView>
            <View style={styles.screen}>

                <View >
                    
                    <ImagePicker imageStyle={{ borderRadius: 350, width: "40%" }} onGetImage={setImage} show={true} thumbnail={image} isAspect={true} aspect={[10,10]} />
                    {/* remove={true} removeTitle="Remove Image" removeHandler={()=>{console.log('hello world')}} */}
                   

                    
                        <TextInput style={styles.input} placeholder="displayname" value={displayName} onChangeText={displayNameHandler} />
                    
               
                        <TextInput style={styles.input} placeholder="bio" value={bio} onChangeText={bioHandler} multiline
                            numberOfLines={4}
                            maxLength={40}
                            editable />
              
                    
                        <View style={styles.buttonContianer}>
                        <CustomButton style={{ width:Dimensions.get('window').width/2}}  title="Save" onPress={putUpdateProfile}/>
                        </View>
                        
                </View>

            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        margin:10,
        // marginHorizontal:"10%",
        // justifyContent:'center',
        // alignItems: 'center',
        // width:'100%'
    },
    input: {
        borderColor: '#ccc',
        borderBottomWidth: 1,
        marginVertical: 10,
        // marginHorizontal:Dimensions.get('window').width/1.2,
        width: Dimensions.get('window').width/1.2,
        padding: 1
    },
    buttonContianer:{
        alignItems:'center',
        
    }
})

export default ProfileUpdateScreen;