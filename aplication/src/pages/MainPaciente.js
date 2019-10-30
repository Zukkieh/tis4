import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { 
    View, 
    ImageBackground, 
    Platform, 
    Text, 
    StyleSheet, 
    TouchableOpacity,
    StatusBar} from 'react-native';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';

import background from '../assets/background.png';


export default function Login({ navigation }) {
    const id = navigation.getParam('user');
    const perfil = navigation.getParam('perfil');

    useEffect(() => {

    }, []);

    function iniciar(){
        
        navigation.navigate('Fonemas', {id, perfil});
    }

    function goOptions(){
        
        navigation.navigate('Options', {id, perfil});
    }
    return (
        <>
            <StatusBar hidden={true} />
            <ImageBackground source={background} style={styles.container}>
                <View style={styles.responsiveBox}>
                    <TouchableOpacity onPress={iniciar} style={styles.button}>
                            <Text style={styles.buttonText}>INICIAR</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={goOptions} style={styles.button}>
                            <Text style={styles.buttonText}>OPÇÕES</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },

    responsiveBox: {
        width: wp('43%'),
        height: hp('46%'),
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignContent: 'center',
        alignItems: 'center',
    },

    button: {
        height: 55,
        width: 300,
        alignSelf: 'stretch',
        backgroundColor: '#ffff00',
        borderRadius: 30,
        borderColor: "#FFD700",
        borderStyle: "solid",
        borderWidth: 1,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonText: {
        color: '#e61c1c',
        fontWeight: 'bold',
        fontSize: 20
    },

});

