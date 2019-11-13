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
import videoFase from '../assets/BombAudit2.mp4';
import api from '../services/api';


export default function BombAudit({ navigation }) {
    const id = navigation.getParam('id');
    const perfil = navigation.getParam('perfil');


    async function goBack() {
        const response = await api.post('/updateProgresso', { idPaciente: id, jogo: "Bombardeio Auditivo", progresso: 50 })
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
                <Video source={videoFase} style={styles.mediaPlayer} shouldPlay/>
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
        backgroundColor: '#f5f5f5',
    },

    imgBack: {
        height: 40,
        width: 40,
    },
    mediaPlayer: {
        position: 'absolute',
        top: 60,
        left: 220,
        bottom: 15,
        right: 0,
    },

});