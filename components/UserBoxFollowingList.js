import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import UserBox from './UserBox';

const UserBoxFollowingList = props => {
    
    const navigateProfileHandler = (data) => {
        data.is_user = false
        props.navigation.navigate({routeName: 'UserProfile', params:{userData:data}})
    }


    // this data format
    // data = [
    //     {
    //         "profile":{
                    // "following":1
    //         }
    //     },
    //     {
    //         "profile":{
                    // "following":1
    //         }
    //     }
    // ]
    return(<View>
        <FlatList
            data={props.data}
            keyExtractor={(item,index) =>item.id}
            renderItem={(itemData) => {
                console.log(itemData.item.profile, 'consoling from user data');
                return (
                        <UserBox
                    data={itemData.item.profile}
                    navigation={props.navigation}
                />)
              }} 
        />
    </View>);
}

const styles = StyleSheet.create({});


export default UserBoxFollowingList;