import React from 'react';
import {View,
        Text,
        StyleSheet,
        Platform,
        TouchableOpacity
    } from 'react-native';
import Colors from '../constants/Colors';


const CustomButton = props => {
    return (<TouchableOpacity onPress={props.onPress}>
                <View style={{...styles.button, ...props.style}}>
                    <Text style={styles.titleText}>{props.title}</Text>
                </View>
            </TouchableOpacity>);
}

const styles = StyleSheet.create(
    {
    button: {
        borderRadius: 20,
        padding: 10,
        marginVertical:4,
        elevation: 2,
        backgroundColor: Colors.blue,
    },
    titleText:{
        color:'white',
        textAlign:'center',
        fontWeight:'bold'
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
        width: '50%'
    },
});

export default CustomButton;