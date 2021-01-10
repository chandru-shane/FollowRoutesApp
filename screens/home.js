import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import CardBox from '../components/cardBox';
const Home = props => {
    return (
        
            <ScrollView>
                <View style={styles.screen}>
            <View style={styles.searchContainer}>
                <TextInput style={styles.searchInput} placeholder="Let's Explore..." />
                <FontAwesome style={styles.searchIcon} name="search" size={24} color="black" onPress={()=>{console.log('hello world')}} />
            </View>

            <CardBox/>
            <CardBox/>
            <CardBox/>
            </View>
            </ScrollView>

       
    )

}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        marginHorizontal:10
        
    },
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
    
})


export default Home;