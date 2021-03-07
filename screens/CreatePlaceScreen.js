import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    Button,
    Modal,
    Alert,
    Platform,
    Linking
} from 'react-native';
import ImagePicker from '../components/ImagePicker';
import Urls from '../constants/Urls';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../components/CustomButton';


const CreatePlaceScreen = props => {
    const tripid = props.navigation.getParam('tripId')
    const [thumbnail, setThumbnail] = useState();
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [spotCost, setSpotCost] = useState(0);

    const thumbnailHandler = (uri) => {
        setThumbnail(uri)
    }

    const descriptionHandler = text => {
        setDescription(text);
    }
    const nameHandler = text => {
        setName(text)
    }

    const latitudeHandler = text => {
        setLatitude(text)
    }

    const longitudeHandler = text => {
        setLongitude(text)
    }

    const spotCostHandler = text => {
        setSpotCost(text)
    }

    const seeonMap = () => {
        let lat = latitude
        let lng = longitude

        const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
        const latLng = `${lat},${lng}`;
        const label = name;
        const url = Platform.select({
            ios: `${scheme}${label}@${latLng}`,
            android: `${scheme}${latLng}(${label})`
        });
        Linking.openURL(url);
    }

    const saveCoordinates = (lat, lng) =>{
        setLatitude(lat);
        setLongitude(lng)
    }




    const validation = () => {
        if (name.length > 0 && thumbnail.length > 0 && latitude != null && longitude != null &&   description.length > 0) {
            return true;
        }
        else {
            return false;
        }
    }



    const postCreatePlace = async () => {
        
        if (!validation()) {
            return;
        }
        let thumbnailData = {
            uri: thumbnail,
            type: 'image/jpeg',
            name: thumbnail.split('/').pop()
        }
        let form = new FormData();
        
        form.append('image', thumbnailData)
        form.append('name', name)
        form.append('description', description)
        form.append('lng', longitude)
        form.append('lat', latitude)
        form.append('trip', tripid)
        form.append('spot_cost', spotCost)

        let id;
        try {
            console.log('this is new')
            if (token) {
                console.log('im is')
                await fetch(Urls.CREATE_PLACE, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "multipart/form-data",
                        'Authorization': `Token ${token}`

                    },
                    body: form
                })
                    .then(res => {
                        if (res.status != 201) {
                            return;
                        }
                        return res.json()
                    })
                    .then(res => {
                        console.log('printing from right after created')
                        console.log(res)
                        props.navigation.navigate({ routeName: 'Home' })
                    })
                    .catch(error => console.log(error));


                console.log('patching')

            }
            else {
                props.navigation.navigate('Auth');
            }
        }
        catch (err) {
            // console.log(err);
        }


    }






    return (
        <ScrollView>
            <View style={styles.screen}>
                <ImagePicker onGetImage={thumbnailHandler} title="Pick Image from Gallery" />

                <TextInput 
                style={{ ...styles.titleInput, 
                        ...styles.input }}
                         placeholder='place name'
                         value={name}
                        onChangeText={nameHandler} />


                <TextInput
                    style={{ ...styles.input }}
                    multiline
                    numberOfLines={4}
                    maxLength={40}
                    editable
                    placeholder='Description'
                    value={description}
                    onChangeText={descriptionHandler}
                />

                            <TextInput
                                keyboardType={'number-pad'}
                                style={{ ...styles.titleInput, ...styles.input }}
                                placeholder='cost' 
                                value={spotCost}
                                onChangeText={spotCostHandler}/>

                <TextInput
                                keyboardType={'number-pad'}
                                style={{ ...styles.titleInput, ...styles.input }}
                                placeholder='Latitude' 
                                value={latitude ? `${latitude}`: ''}
                                onChangeText={latitudeHandler}/>
                            <TextInput
                                keyboardType={'number-pad'}
                                style={{ ...styles.titleInput, ...styles.input }}
                                placeholder='Longitude' 
                                value={longitude ? `${longitude}`: ''}
                                onChangeText={longitudeHandler}
                    />

                <View style={styles.buttonContainer}>
                    <CustomButton title='Pick on map' onPress={()=>{props.navigation.navigate({'routeName':'CreateMap', params:{'saveCoordinates':saveCoordinates}})}} />
                   
                    {latitude && longitude && <CustomButton title='Check Gmaps' onPress={seeonMap}  />}
                </View>

                
                <View style={styles.saveButton}>
                    <CustomButton  title='Save' onPress={postCreatePlace} />
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        margin: 10,
        padding: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },

    input: {
        borderColor: '#ccc',
        borderBottomWidth: 1,
        marginVertical: 10,
        width: '100%',
        padding: 1
    },

    titleInput: {
        borderColor: '#ccc',
        borderBottomWidth: 1,
        width: '80%',
        padding: 1,
    },

    saveButton: {
        marginVertical: 10,
        marginHorizontal: '20%',
    },

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        width: '75%',
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
})

export default CreatePlaceScreen;