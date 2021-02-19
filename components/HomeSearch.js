import React, {useState} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeSearch = (props) => {
    const [search, setSearch] = useState("");
    return(<View style={styles.searchContainer}>
        <TextInput style={styles.searchInput} onChangeText={(text)=>{setSearch(text)}} value={search} placeholder="Let's Explore..." />
        <FontAwesome style={styles.searchIcon} name="search" size={24} color="black" onPress={()=>{props.SearchHandler(search, props.search)}} />
    </View>)
}

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        width: '90%',
        borderWidth: 1,
        borderColor: '#888',
        marginVertical: 20,
        marginTop:25,
        borderRadius: 20,
        padding: 5,
        backgroundColor: 'white',
        elevation: 5,

    },
    searchInput: {
        width: '80%',
        borderColor: '#888',
        alignItems: 'center',
        padding: 5,
        margin: 1,
    },
    searchIcon: {
        width:'20%',
        padding: 5,
        margin: 1,
    },
});

export default HomeSearch;