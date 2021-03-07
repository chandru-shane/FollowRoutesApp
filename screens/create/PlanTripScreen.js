import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import CustomButton from '../../components/CustomButton';
import Urls from '../../constants/Urls';
import AsyncStorage from '@react-native-async-storage/async-storage';


const PlanTripScreen = props => {
    const [name, setName] = useState();
    const [day, setDay] = useState();
    const [description, setDescription] = useState();
    const [budget, setBudget] = useState(0);
    const [person, setPerson] = useState(1);

    const nameHandler = text => {
        setName(text);
    }

    const dayHandler = text => {
        setDay(text);
    }

    const descriptionHandler = text => {
        setDescription(text);
    }

    const budgetHandler = text => {
        setBudget(text);
    }

    const personHandler = text => {
        setPerson(text);
    }

    // const validation = () => {
    //     if (name.length > 0 && day > 0 && person > 0) {
    //         return true
    //     }
    //     else {
    //         return false
    //     }
    // }

    const postPlantrip = async () => {
        const token = await AsyncStorage.getItem('MR_Token');
        console.log('getting token', token)
        // if (!validation()) {
        //     return;
        // }
        try {
            await fetch(Urls.CREATE_PLAN_TRIP, {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    description: description,
                    cost: budget,
                    days: day,
                    person: person
                })
            })
                .then(res => {
                    console.log(res.status)
                    if (res.status === 200) {
                        return res.json();

                    }
                    console.log('the token is invalid')

                    // removeKey()
                }).then((res) => {

                    props.navigation.navigate('Home');
                    console.log('hello world')
                })
                .catch(error => console.log(error));
        }

        catch (error) {
            console.log(error);
        }

    }

    const removeKey = async () => {
        try {
            await AsyncStorage.removeItem("MR_Token");
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.screen}>
            <TextInput
                value={name}
                onChangeText={nameHandler}
                style={{ ...styles.titleInput, ...styles.input }}
                placeholder='Name the trip' />
            <TextInput
                value={day}
                onChangeText={dayHandler}
                style={{ ...styles.titleInput, ...styles.input }}
                placeholder='Days' />
            <TextInput
                value={description}
                onChangeText={descriptionHandler}
                style={{ ...styles.titleInput, ...styles.input }}
                placeholder='Description' />
            <TextInput
                value={budget}
                onChangeText={budgetHandler}
                style={{ ...styles.titleInput, ...styles.input }}
                placeholder='Budget for the trip' />
            <TextInput
                value={person}
                onChangeText={personHandler}
                style={{ ...styles.titleInput, ...styles.input }}
                placeholder='Person' />
            <CustomButton title='Save' onPress={postPlantrip} />
        </View>
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
        marginVertical: 12,
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

export default PlanTripScreen;