import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Urls from '../../constants/Urls';
import ImagePicker from '../../components/ImagePicker';
import CustomButton from '../../components/CustomButton';


const CreateTripScreen = props => {
    const [thumbnail, setThumbnail] = useState();
    const [name, setName] = useState();
    const [cost, setCost] = useState();
    const [day, setDay] = useState();
    const [description, setDescription] = useState();
    const [person, setPerson] = useState(1);

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



    const postCreateTrip = async () => {
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

        let id;
        try {
            console.log('this is new')
            if (token) {
                console.log('im is')
                await fetch(Urls.CREATE_TRIP, {
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
                        props.navigation.navigate({ routeName: 'Detail', params: { item: res, title: res['name'], username: res['user_displayname'] } })
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
                    value={day}
                    onChangeText={dayHandler}
                />

                <TextInput
                    style={{ ...styles.titleInput, ...styles.input }}
                    keyboardType={'number-pad'}
                    placeholder='Cost'
                    value={cost}
                    onChangeText={costHandler}
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
                <TextInput
                    style={{ ...styles.titleInput, ...styles.input }}
                    keyboardType={'number-pad'}
                    placeholder='Person'
                    value={person}
                    onChangeText={personHandler}
                />
                <ImagePicker onGetImage={thumbnailHandler} title="Pick Image from Gallery" />

                <CustomButton title='Save' onPress={postCreateTrip} />

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


    }
})

export default CreateTripScreen;