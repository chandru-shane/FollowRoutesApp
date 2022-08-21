import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ActionCustomButton = props => {
    return (
        
        <View style={styles.newButtonContainer}>
                   

        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Delete</Text>
                        </Pressable>
      
        
            {loading ? <ActivityIndicator size='large' color={Colors.blue} /> : (<Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Delete</Text>
                        </Pressable>)}
        
    </View>

    );
}

const styles = StyleSheet.create({})

export default ActionCustomButton;