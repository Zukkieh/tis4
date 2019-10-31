import React, { useState, useEffect } from 'react';
import {
    View,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    Image,
    Alert
} from 'react-native';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';

import background from '../assets/background.png';
import R from '../assets/R.png';
import back from '../assets/retroceder.png';

import api from '../services/api';


export default function Login({ navigation }) {
    const id = navigation.getParam('id');
    const perfil = navigation.getParam('perfil');

    useEffect(() => {

    }, []);

    async function goToTepe() {
        const response = await api.post('/testaPermissao', { id: id , fonema: "R" })
        if (response.data[0])
            navigation.navigate('Games', { id , perfil });
    }

    function goBack() {
        const user = id;
        navigation.navigate('MainPaciente', { user , perfil});
    }

    return (
        <>
            <StatusBar hidden={true} />
            <TouchableOpacity onPress={goBack} style={styles.back}>
                <Image source={back} style={styles.imgBack} />
            </TouchableOpacity>
            <ImageBackground source={background} style={styles.container}>
                <View style={styles.responsiveBox}>
                    <TouchableOpacity onPress={goToTepe}>
                        <Image source={R} />
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

    back: {
        backgroundColor: '#ffffff',
    },

    imgBack: {
        height: 40,
        width: 40,
    }

});