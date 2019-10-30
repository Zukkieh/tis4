import React, { useState, useEffect } from 'react';
import {
    View,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    Image
} from 'react-native';
import Video from 'react-native-video';

import background from '../assets/background.png';
import back from '../assets/retroceder.png';
import videoFase from '../assets/BombAudit1.mp4';
import api from '../services/api';


export default function BombAudit({ navigation }) {
    const id = navigation.getParam('id');
    const perfil = navigation.getParam('perfil');

    async function goBack() {
        const response = await api.post('/registerProgresso', { idPaciente: id, jogo: "Bombardeio Auditivo", porcentagem: 25 })
        if (response)
            navigation.navigate('Bombardeio', { id , perfil });
    }

    useEffect(() => {

    }, []);

    return (
        <>
            <StatusBar hidden={true} />
            <TouchableOpacity onPress={goBack} style={styles.back}>
                <Image source={back} style={styles.imgBack} />
            </TouchableOpacity>
            <ImageBackground source={background} style={styles.container}>
                <Video source={videoFase} style={styles.mediaPlayer} shouldPlay />
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

    back: {
        backgroundColor: '#ffffff',
        width: 40,
    },

    imgBack: {
        height: 40,
        width: 40,
    },
    mediaPlayer: {
        position: 'absolute',
        top: 0,
        left: 200,
        bottom: 15,
        right: 0,
    },

});