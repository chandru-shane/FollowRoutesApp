import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, Pressable, Modal} from 'react-native';

const ModalSelector = props => {
    return (
        <View style={{...props.style}}>
            <FlatList 
            data = {props.data}
            keyExtractor = {(item,index)=>{item.id}}
            renderItem = {(itemData) => {
                <Pressable onPress={()=>{props.onPress(itemData.item.code)}}>
                    <Text>itemData.item.name</Text>
                </Pressable>
            }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
    }
})

export default ModalSelector;