import React, { useState, useEffect } from 'react';
import {
    View,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    Image
} from 'react-native';

import background from '../assets/background.png';
import back from '../assets/retroceder.png';
import jogo1 from "../assets/bombardeioAuditivo.png";
import jogo2 from "../assets/ParesMínimos.png";

export default function Games({ navigation }) {
    const id = navigation.getParam('id');
    const perfil = navigation.getParam('perfil');

    function goBack() {
        navigation.navigate('Fonemas', { id , perfil });
    }

    function bombardeioAuditivo(){
        navigation.navigate('Bombardeio',{id , perfil});
    }

    function ParesMinimos(){
        navigation.navigate('ParesMinimos',{id , perfil});
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
                <TouchableOpacity onPress={bombardeioAuditivo} style={styles.games}>
                    <Image source={jogo1} style={styles.imgGames}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={ParesMinimos} style={styles.games}>
                    <Image source={jogo2} style={styles.imgGames}/>
                </TouchableOpacity>
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

    imgGames: {
        height: 70,
        width: 70,
    },

    games:{
        width: 70,
    }

});