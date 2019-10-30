import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
    View,
    ImageBackground,
    Text,
    Image,
    StyleSheet,
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


export default function Login({ navigation }) {
    const id = navigation.getParam('id')
    const perfil = navigation.getParam('perfil');

    useEffect(() => {

    }, []);

    async function handleLogout() {
        await AsyncStorage.clear();
        navigation.navigate('Login', { id });
    }

    function changePassword() {

        navigation.navigate('ChangePassword', { id , perfil});
    }

    function goBack() {
        if (perfil == "paciente")
            navigation.navigate('MainPaciente', { id , perfil});
        else {
            const user = id;
            navigation.navigate('MainFono', { user , perfil});
        }
    }

    return (
        <>
            <StatusBar hidden={true} />
            <TouchableOpacity onPress={goBack} style={styles.back}>
                <Image source={back} style={styles.imgBack} />
            </TouchableOpacity>
            <ImageBackground source={background} style={styles.container}>
                <View style={styles.responsiveBox}>
                    <TouchableOpacity onPress={changePassword} style={styles.button}>
                        <Text style={styles.buttonText}>ALTERAR SENHA</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleLogout} style={styles.button}>
                        <Text style={styles.buttonText}>SAIR</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </>
    );
}

const styles = StyleSheet.create({

    logout: {
        color: '#dfefff',
        fontWeight: 'bold',
        fontSize: 20,
        backgroundColor: '#3d464e',
    },

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

    back: {
        backgroundColor: '#ffffff',
    },

    imgBack: {
        height: 40,
        width: 40,
    }
});