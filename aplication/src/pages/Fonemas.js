import React, { useState, useEffect } from 'react';
import {
    View,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    Image,
    Alert,
    Text
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
            <ImageBackground source={background} style={styles.backgroundImg}>
                <TouchableOpacity onPress={goBack} style={styles.imgBackButton}>
                    <Image source={back} style={styles.imgBack} />
                    <Text>VOLTAR</Text>
                </TouchableOpacity>
                <View style={styles.container}>
                    <View style={styles.responsiveBox}>
                        <TouchableOpacity onPress={goToTepe}>
                            <Image source={R} />
                        </TouchableOpacity>
                    </View>
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

    backgroundImg: {
        flex: 1,
    },

    responsiveBox: {
        width: wp('43%'),
        height: hp('46%'),
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignContent: 'center',
        alignItems: 'center',
    },

    imgBackButton: {
        marginLeft: 5,
        marginTop: 5,
        height: 40,
        width: 100,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 7,
        backgroundColor: '#fffe71'
    },

    imgBack: {
        height: 40,
        width: 40,
    }

});