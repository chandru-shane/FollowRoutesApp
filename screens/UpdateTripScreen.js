import React, { useState } from 'react';
import { View, ScrollView, Image, Text, StyleSheet,Switch, TextInput, Button, Alert, ActivityIndicator, Modal, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from '../components/ImagePicker';
import Urls from '../constants/Urls';
import Colors from '../constants/Colors';
import CustomButton from '../components/CustomButton';
import { Picker } from '@react-native-picker/picker';


const UpdateTripScreen = props => {
    const data = props.navigation.getParam('item');
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [thumbnail, setThumbnail] = useState(data.thumbnail);
    const [name, setName] = useState(data.name);
    const [cost, setCost] = useState(data.cost);
    const [day, setDay] = useState(data.day);
    const [person, setPerson] = useState(data.person);
    console.log('logging data********************', day, person)
    const [description, setDescription] = useState(data.description);
    const [isEnabled, setIsEnabled] = useState(data.post);
    const [selectedCurrency, setSelectedCurrency] = useState(data.currency);

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
 
    



    const thumbnailHandler = (uri) => {
        setThumbnail(uri)
    }

    const nameHandler = (text) => {
        setName(text);
    }
    const costHandler = text => {
        setCost(text);
    }

    const dayHandler = text => {
        setDay(text);
    }

    const descriptionHandler = text => {
        setDescription(text);
    }

    const personHandler = text => {
        setPerson(text)
    }
    const validation = () => {
        if (name.length > 0 && thumbnail.length > 0 && cost != null && day != 0 && description.length > 0 && person > 0) {
            return true;
        }
        else {
            return false;
        }
    }

    console.log(data, 'consoleing from update trip screen')



    const putUpdateTrip = async () => {
        setLoading(true);
        const token = await AsyncStorage.getItem('MR_Token');
        console.log('getting token', token)
        if (!validation()) {
            
            return; 
        }
        let thumbnailData = {
            uri: thumbnail,
            type: 'image/jpeg',
            name: thumbnail.split('/').pop()
        }
        let form = new FormData();
        form.append('thumbnail', thumbnailData)
        form.append('name', name)
        form.append('description', description)
        form.append('cost', cost)
        form.append('day', day)
        form.append('person', person)
        form.append('post', isEnabled)
        form.append('currency', selectedCurrency)
        console.log(form)

        try {
            console.log('this is new', Urls.CREATE_TRIP.concat(`${data.id}/`))
            if (token) {
                console.log('im is', `${Urls.CREATE_TRIP}${data.id}/`)
                await fetch(Urls.CREATE_TRIP.concat(`${data.id}/`), {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "multipart/form-data",
                        'Authorization': `Token ${token}`

                    },
                    body: form
                })
                    .then(res => {
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
                        props.navigation.navigate({ routeName: 'Home', params: { item: res, title: res['name'], username: res['user_displayname'] } })
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


    const deleteTrip = async () => {

        const token = await AsyncStorage.getItem('MR_Token');
        console.log('getting token', token)

        try {
            await fetch(Urls.CREATE_TRIP.concat(`${data.id}/`), {
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
                {/* <Image source={{ uri: thumbnail }} style={{ width: 200, height: 133.333 }} /> */}
                <ImagePicker onGetImage={thumbnailHandler} show={true} thumbnail={thumbnail} />


                <TextInput
                    style={{ ...styles.titleInput, ...styles.input }}
                    placeholder='Trip Name'
                    value={name}
                    onChangeText={nameHandler}
                />

                <TextInput
                    style={{ ...styles.titleInput, ...styles.input }}
                    keyboardType={'number-pad'}
                    placeholder='Days'
                    value={`${day}`}
                    onChangeText={dayHandler}
                />



<View style={{flexDirection:'row'}}> 
                
                <TextInput
                    style={{ ...styles.titleInput, ...styles.inputR }}
                    keyboardType={'number-pad'}
                    placeholder='Cost'
                    value={cost}
                    onChangeText={costHandler}
                />
                

                   <View style={{width:"30%"}}>
                    <Picker
                        selectedValue={selectedCurrency}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedCurrency(itemValue)
                        }>
                        <Picker.Item label="INR" value={1} />
                        <Picker.Item label="USD" value={2} />
                    </Picker>
                </View>
                </View>


                <TextInput
                    style={{ ...styles.titleInput, ...styles.input }}
                    keyboardType={'number-pad'}
                    placeholder='Person'
                    value={`${person}`}
                    onChangeText={personHandler}
                />

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
                <View style={styles.switchContianer}>
                    <Text>Set on to see everyone</Text>
                <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? Colors.blue :  Colors.blue}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
                </View>
                {/* <ImagePicker onGetImage={thumbnailHandler} /> */}
                <View style={styles.buttonContainer}>
                    <View style={styles.singleButton}>

                        <CustomButton onPress={() => setModalVisible(true)} style={{backgroundColor:'red'}} title="Delete" />
                    </View>
                    

                    <View style={styles.singleButton}>
                        {loading ? <ActivityIndicator size='large' color={Colors.blue} /> : <CustomButton title='Save' onPress={putUpdateTrip} />}
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
                                        onPress={deleteTrip}
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
    buttonContainer: {
        flexDirection: 'row',
        margin: 2,
    },
    singleButton: {
        width: '50%',
        margin: 3
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
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
    newButtonContainer: {
        flexDirection: 'row',


    },
    switchContianer:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginVertical:4,
    },
    inputR: {
        borderColor: '#ccc',
        borderBottomWidth: 1,
        marginVertical: 10,
        width: '70%',
        // marginHorizontal:10,
        padding: 1
    },
})

export default UpdateTripScreen;