import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';


const UserBox = props => {
    const [sentData, setSendData]= useState({
        id:props.data.id,
        username:props.data.username,
        userprofile_image:props.data.image,
        user_displayname:props.data.display_name,
        followers:props.data.followers,
        following:props.data.following,
        is_user:props.data.is_user,
        bio:props.data.bio,
        trips:props.data.trips,
        follow_status:props.data.follow_status,
        
    })

    const userProfileNavigateHandler = () => {
        if (props.data.is_user){
            props.navigation.navigate('User')
        }
        else{
        props.navigation.navigate({routeName: 'UserProfile', params:{userData:sentData, otheruser:true}})
        }
    }
    
    console.log('data')
    console.log(props.data)
    return(<View>
            
            <TouchableOpacity onPress={userProfileNavigateHandler} >
            <View style={styles.userContainer}>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.userImage}
                        source={{ uri: props.data.image }}
                    />
                </View>
                <Text style={styles.userName}>{props.data.display_name}</Text>
            </View>
        </TouchableOpacity>
    </View>)
}

const styles = StyleSheet.create({
 
    userContainer: {
        flex: 1,
        flexDirection: 'row',
        margin: 1,
        borderRadius: 10,
        elevation: 1,
        backgroundColor: 'white',
        height: 80,
        width:'100%',
        borderWidth: 1,
        borderColor: '#ccc',
        alignItems: 'center',
        overflow: 'hidden'
    },
    imageContainer: {
        width: '20%',
        height: 70,
        borderRadius: 100,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#ccc',

    },
    userImage: {
        width: '100%',
        height: '100%'
    },
    userName:{
        textAlign:'center',
        padding:10,
        margin:10,
        fontSize:18
    }

})

export default UserBox;