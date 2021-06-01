import React, { useState } from "react";
import { TextInput, Modal, StyleSheet, Text, Pressable, View, Image } from "react-native";
import CustomButton from './CustomButton';


const DonateButton = props => {
    const [amount, setAmount] = useState();
    const [modalVisible, setModalVisible] = useState(false);
    console.log(props.data, '}}}}}}}}}}}}}}}}}}}}}');

    const onPressDonateHandler = () => {
        if (amount > 0 && amount != null) {
            setModalVisible(!modalVisible);
            props.navigation.navigate({ routeName: 'DonateStripe', params: { 'amount': amount, recipient: props.data.username } });
        }
    }

    return (
        <View>
            <View style={styles.donatecontainer}>
                <CustomButton onPress={() => setModalVisible(true)} style={{ backgroundColor: 'red' }} title='Contribute' />
            </View>

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
                        <View>
                            <View style={styles.createdUserBox}>
                                <Text>Thank You</Text>

                            </View>
                        </View>
                        <View style={styles.modalView}>
                            <View style={styles.userInfoDonateContainer}>
                                <Pressable onPress={props.userProfileNavigateHandler}>
                                    <View style={styles.userContainer}>
                                        <Image style={styles.userImage} source={{ uri: props.data.userprofile_image }} />

                                    </View>

                                </Pressable>

                            </View>
                            <TextInput style={styles.payTextInput} placeholder="₹ INR" value={amount} onChangeText={setAmount} />
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={onPressDonateHandler}
                            >
                                <Text style={styles.textStyle} >Donate</Text>
                            </Pressable>

                        </View>
                    </View>
                </Modal>



            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    donatecontainer: {
        marginRight: 5,
    },
    payTextInput: {
        textAlign: 'center',
        marginVertical: 2,
        // height:"10%",
        width: "100%",
        borderColor: '#ccc',
        borderRadius: 5,
        borderWidth: 1,
        fontSize: 20
    },
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
        paddingHorizontal: "10%",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        height: "50%",
        width: '70%',
        justifyContent: "center",
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginVertical: 2,
        width: "80%",
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
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    detailContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
        alignItems: 'center'
    },
    createdUserBox: {
        marginHorizontal: 10,
    },
    userInfoDonateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 2,
    },
    userImage: {
        width: 50,
        height: 50,
        overflow: 'hidden',
        borderRadius: 25,
        marginRight: 10
    },

})

export default DonateButton;