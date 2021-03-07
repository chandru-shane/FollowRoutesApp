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
    Linking,
    ActivityIndicator,
    Pressable
} from 'react-native';
import ImagePicker from '../components/ImagePicker';
import Urls from '../constants/Urls';
import Colors from '../constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';


const UpdatePlaceScreen = props => {
    const data = props.navigation.getParam('item')
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [thumbnail, setThumbnail] = useState(data.image);
    const [latitude, setLatitude] = useState(data.lat);
    const [longitude, setLongitude] = useState(data.lng);
    const [name, setName] = useState(data.name);
    const [description, setDescription] = useState(data.description);
    const [spotCost, setSpotCost] = useState(data.spot_cost);
    const [tripId, setTripId] = useState(data.trip)

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

    const saveCoordinates = (lat, lng) => {
        setLatitude(lat);
        setLongitude(lng)
    }










    const validation = () => {
        if (name.length > 0 && thumbnail.length > 0 && latitude != null && longitude != null && description.length > 0) {
            return true;
        }
        else {
            return false;
        }
    }



    const putUpdatePlace = async () => {
        setLoading(true);
        const token = await AsyncStorage.getItem('MR_Token');
        console.log('getting token', token)
        if (!validation()) {
            console.log('thi si s neow');
            return;
        }

        let thumbnailData = {
            uri: thumbnail,
            type: 'image/jpeg',
            name: thumbnail.split('/').pop()
        }
        let form = new FormData();
        console.log('thi si s neow');
        form.append('image', thumbnailData)
        form.append('name', name)
        form.append('description', description)
        form.append('lng', longitude)
        form.append('lat', latitude)
        form.append('trip', tripId)
        console.log('thi si s neow', thumbnailData);
        form.append('spot_cost', spotCost)

        console.log('printing the data')
        try {

            console.log('this is new')
            if (token) {
                console.log('im is')
                await fetch(`${Urls.DETAIL_PLACE}${data.id}/`, {
                    method: 'PUT',
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
                        console.log('printing from right after created', `${Urls.DETAIL_PLACE}${data.id}/`)
                        console.log(res)
                        setLoading(false);
                        props.navigation.navigate('Home');
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


    const deletePlace = async () => {

        const token = await AsyncStorage.getItem('MR_Token');
        console.log('getting token', token)

        try {
            await fetch(Urls.DETAIL_PLACE.concat(`${data.id}/`), {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Token ${token}`

                }
            })
                .then(res => {
                    if (res.status != 204) {
                        return;
                    }
                    props.navigation.navigate('Home')
                    console.log(res, '---------------------')
                    return res.json()
                })



        } catch (error) {
            console.log(error);
        }
    }





    return (
        <ScrollView>
            <View style={styles.screen}>
                <ImagePicker onGetImage={thumbnailHandler} show={true} title="Pick Image from Gallery" />

                <TextInput
                    style={{
                        ...styles.titleInput,
                        ...styles.input
                    }}
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
                    value={spotCost ? `${spotCost}` : ''}
                    onChangeText={spotCostHandler} />

                <TextInput
                    keyboardType={'number-pad'}
                    style={{ ...styles.titleInput, ...styles.input }}
                    placeholder='Latitude'
                    value={latitude ? `${latitude}` : ''}
                    onChangeText={latitudeHandler} />
                <TextInput
                    keyboardType={'number-pad'}
                    style={{ ...styles.titleInput, ...styles.input }}
                    placeholder='Longitude'
                    value={longitude ? `${longitude}` : ''}
                    onChangeText={longitudeHandler}
                />

                <View style={styles.buttonContainer}>
                    <Button title='Pick on map' onPress={() => { props.navigation.navigate({ 'routeName': 'CreateMap', params: { 'saveCoordinates': saveCoordinates } }) }} />
                    {latitude && longitude && <Button title='Check Gmaps' onPress={seeonMap} />}
                </View>


                <View style={styles.saveButton}>
                    {loading ? <ActivityIndicator size='large' color={Colors.blue} /> : <Button title='Save' onPress={putUpdatePlace} />}

                </View>

                <View style={styles.ActionButtonContainer}>
                    <View style={styles.singleButton}>

                        <Button onPress={() => setModalVisible(true)} color='red' title="Delete" />
                    </View>
                    <View style={styles.singleButton}>
                        {loading ? <ActivityIndicator size='large' color={Colors.blue} /> : <Button title='Save' onPress={putUpdatePlace} />}
                    </View>
                </View>


                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>Are you sure to delete this!</Text>
                                <View style={styles.modelButtonContainer}>

                                    <Pressable
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={() => setModalVisible(!modalVisible)}
                                    >
                                        <Text style={styles.textStyle}>No</Text>
                                    </Pressable>

                                    <Pressable
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={deletePlace}
                                    >
                                        <Text style={styles.textStyle}>Delete</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </Modal>

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
    
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
        width: '50%'
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    modelButtonContainer: {
        flexDirection: 'row',

    },

    ActionButtonContainer: {
        flexDirection: 'row',
        margin: 2,
    },
    singleButton: {
        width: '50%',
        margin: 3
    },
})

export default UpdatePlaceScreen;