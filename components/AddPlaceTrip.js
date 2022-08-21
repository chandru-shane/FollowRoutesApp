import React, {useState} from 'react';
import { MaterialIcons } from '@expo/vector-icons'; 
import { View, Text, StyleSheet, Modal, TouchableOpacity,FlatList } from 'react-native';
import Urls from '../constants/Urls';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalListCard from './ModalListCard';


const AddPlaceTrip = props =>{
  const [modalVisible, setModalVisible] = useState(false);
  const [planTripData, setPlanTripData] = useState();

  const removeKey = async () => {
    try {
      await AsyncStorage.removeItem("MR_Token");
    }
    catch (error) {
      console.log(error);
    }
  }


  const modalHandler = async () =>{
    setModalVisible(true)
    const token = await AsyncStorage.getItem('MR_Token');
    console.log('getting token', token);
    
    try {
      if(token){
        await fetch(Urls.USER_PLANNED_TRIP, {
          method: 'GET',
          headers: {
            'Authorization': `Token ${token}`
          }
  
        }).then(res => {
          if (res.status === 200) {
            console.log("This we get data fine", res)
            
            return res.json();
          }
          else {
            removeKey();
            console.log('is am going to exit')
            props.navigation.navigate("Auth");
          }
        }).then(res => {
          console.log('printing data', res);
          setPlanTripData(res)
        })
     
      }
      else{
        props.navigation.navigate('Auth')
      }
    } catch (error) {
      console.log(error);
    }
  } 

    return (
    <View>
      <TouchableOpacity onPress={modalHandler}>
        <MaterialIcons name="add-location-alt" size={30} color="red" />
      </TouchableOpacity>
        <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
         
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
           <Text style={styles.modelHeading}>ADD TO </Text>
          <FlatList
          data = {planTripData}
          keyExtractor ={(item,index) => item.id}

          renderItem = {(itemData)=>{
              return (

                <View style={{borderBottomColor:"#ccc", borderBottomWidth:1, width:'100%', flex:1, justifyContent:'center', alignItems:'center'}}>
                  <ModalListCard placeId={props.placeId} item={itemData.item} navigation={props.navigation} modalState={[modalVisible,setModalVisible]}/>
                </View>
                
              )
          }}
          />
           
            
          </View>
        </View>
      </Modal>
     
    </View>
    </View>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        
        backgroundColor: "white",
        borderRadius: 20,
        padding: 10,
        paddingHorizontal:"10%",
        // alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        height:"50%",
        width:'70%',
        justifyContent: "center",
        // alignItems: "center",
      },
      button: {
        borderRadius: 20,
        padding: 1,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modelHeading:{
  
        fontWeight: "bold",
        textAlign:'center',
        padding:10
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      },
      
})

export default AddPlaceTrip;