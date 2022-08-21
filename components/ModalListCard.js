import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Urls from '../constants/Urls';

const ModalListCard = props => {
    // const [placedId, SetPlaceId] = useState(props.placeid)

    const AddPlace = async () => {
        const token = await AsyncStorage.getItem("MR_Token");
        if(token){
            try {
                await fetch(Urls.ADD_PLACE_TO_PLAN_TRIP, {
                    method:'POST',
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${token}`
                    },
                    body:JSON.stringify({ place_id: props.placeId, trip_id:props.item.id })
                }) .then(res => {
                    if (res.status != 201) {
                        return;
                    }
                    return res.json()
                })
                .then(res => {
                    console.log('printing from right after created')
                    console.log(res)
                    const [modalVisible,setModalVisible] = props.modalState;
                    setModalVisible(!modalVisible)
                })
                .catch(error => console.log(error));
            }
            catch(error){
                console.log(error);
            }
        }
        else{
            props.navigation.navigate("Auth");
        }
    }
    return(
        <Pressable onPress={AddPlace}>
        <View style={styles.popListModal}>
                  
                  <Text style={styles.popListText}>  {props.item.name}</Text>
                  
                  
                </View>
                </Pressable>
    );
}

const styles = StyleSheet.create({
    popListModal:{
        // shadowColor: "#000",
        // shadowOffset: {
        //   width: 0,
        //   height: 2
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 4,
        // elevation: 1,
        // borderColor:'#ccc',
        // borderBottomWidth:1,
        // width:"100%"
        // borderRadius:20,
        // marginVertical:3,
        margin:2
      },
      modelBox:{
        // flexDirection:'row',
          // width:"100%",
        //   justifyContent:'space-between',
          alignItems:'center',
          // margin:10,
        //   padding:10,
          // height: ,
          // justifyContent:''
      },
      popListText:{
        fontSize:20,

      }
})

export default ModalListCard;