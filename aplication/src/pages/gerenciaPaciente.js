import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
    View,
    ImageBackground,
    Platform,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    StatusBar
} from 'react-native';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';

import background from '../assets/background.png';
import back from '../assets/retroceder.png';


export default function GerenciaPaciente({ navigation }) {
    const id = navigation.getParam('id');
    const idPac = navigation.getParam('idPac');
    const perfil = navigation.getParam('perfil');

    function progresso() {
        navigation.navigate('SeeProgress', {id,idPac, perfil});

    }

    function goBack() {
        navigation.navigate('listaPaciente', { id, perfil });
    }

    function editPermissao(){
        navigation.navigate('EditPermissao', {id , idPac , perfil});
    }

    return (
        <>
            <StatusBar hidden={true} />
            <TouchableOpacity onPress={goBack} style={styles.back}>
                <Image source={back} style={styles.imgBack} />
            </TouchableOpacity>
            <ImageBackground source={background} style={styles.image}>
                <View style={styles.container}>
                    <TouchableOpacity onPress={editPermissao} style={styles.button}>
                        <Text style={styles.buttonText}>EDITAR PACIENTE</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={progresso}>
                        <Text style={styles.buttonText}>ACOMPANHAR PACIENTE</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </>
    );
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'space-between'
    },
    container: {
        flexDirection: 'row',
        width: wp('43%'),
        height: hp('46%'),
        marginTop: 110,
        marginLeft: 90,
        justifyContent: 'space-between',
    },
    button: {
        height: 55,
        width: 250,
        backgroundColor: '#ffff00',
        borderRadius: 30,
        borderColor: "#FFD700",
        borderStyle: "solid",
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: '8%',
        marginTop:"3%",
    },

    buttonText: {
        color: '#e61c1c',
        fontWeight: 'bold',
        fontSize: 20
    },

    back: {
        backgroundColor: '#f5f5f5',
    },

    imgBack: {
        height: 40,
        width: 40,
    }

})