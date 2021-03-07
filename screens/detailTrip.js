import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, Button, Image, TouchableOpacity } from 'react-native';
import CardSpotList from '../components/CardSpotList';
import AddSpot from '../components/AddSpot';
import Colors from '../constants/Colors';
import CustomButton from '../components/CustomButton';


let isuser = false;

const DetailTrip = props => {
    const data = props.navigation.getParam('item');
    const spots = data.place
    console.log(spots)
    console.log(data, 'detail')
    console.log(spots, 'this data')


    return (
        <ScrollView>
            <View style={styles.screen}>
                <View style={styles.bgImageContainer}>
                    <ImageBackground style={styles.imageBg} source={{ uri: data.thumbnail }} >
                        <View style={{ justifyContent: 'flex-end', alignItems: 'stretch' }}>
                            <Text style={{ color: 'white', fontSize: 22, textAlign: 'right' }}>{data.name}</Text>
                        </View>
                    </ImageBackground>
                </View>
                <View style={styles.detailContainer}>
                    <Text>Days: {data.day}</Text>
                    <Text>Rating: 5/5</Text>
                    <Text>Budget:${data.cost}</Text>

                </View>
                <View style={styles.createdUserBox}>
                    <Text>Create By</Text>
                    <View style={styles.userInfoDonateContainer}>
                        <View style={styles.userContainer}>
                            <Image style={styles.userImage} source={{ uri: data.userprofile_image }} />
                            <Text>{data.username}</Text>
                        </View>
                        {
                            !data.is_user && <View style={styles.donatecontainer}>
                            <CustomButton style={{backgroundColor:'red'}} title='Contribute' />
                        </View>
                        }
                    </View>
                </View>
                <CardSpotList
                    data={spots}
                    navigation={props.navigation}
                    isUser={data.is_user} />
                { data.is_user ? <TouchableOpacity onPress={() => { props.navigation.navigate({ routeName: 'CreatePlace', params: { 'tripId': data.id } }) }}><View style={styles.addSpot} ><AddSpot /></View></TouchableOpacity> : null}
                

            </View>
            {/* */}
        </ScrollView>
    )
}

DetailTrip.navigationOptions = navData => {
    const data = navData.navigation.getParam('item');
    if (!data.is_user){
        return {
            headerTitle:navData.navigation.getParam('title')
        }
    }
    return {
        headerTitle: navData.navigation.getParam('title'),
        headerRight: ( <TouchableOpacity onPress={() => {
            navData.navigation.navigate({
                routeName: 'UpdateTrip', params: {
                    item: data,
                    title: data.name,
                    username: data.user_displayname
                }
            })
        }}>
            <Text style={{ color: Colors.blue, padding: 10 }}>Update</Text>
        </TouchableOpacity>)

    }
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    bgImageContainer: {
        width: '100%',
        height: 200,
    },
    imageBg: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        justifyContent: 'flex-end',
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
    donatecontainer: {
        marginRight: 5,
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
    addSpot: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 15,
        padding: 15,
    },
})

export default DetailTrip;