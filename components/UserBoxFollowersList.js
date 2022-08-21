import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import UserBox from './UserBox';

const UserBoxFollowersList = props => {
    const navigateProfileHandler = (data) => {
        data.is_user = false
        props.navigation.navigate({routeName: 'UserProfile', params:{userData:data}})
    }
    console
    return(<View style={styles.flatListContainer}>
        <FlatList
            data={props.data}
            keyExtractor={(item,index) =>item.id}
            renderItem={(itemData) => {
                console.log(itemData.item, 'consoling from user data');
                return (<UserBox
                    data={itemData.item}
                    
                    navigation={props.navigation}
                />)
              }} 
        />
    </View>);
}

const styles = StyleSheet.create({
    flatListContainer:{
        width:'100%',
        
    }
});


export default UserBoxFollowersList;