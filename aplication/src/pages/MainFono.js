import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
    View,
    ImageBackground,
    Platform,
    Text,
    Image,
    StatusBar,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';

import background from '../assets/background.png';
import config from '../assets/config.jpg';
import api from '../services/api';


export default function Login({ navigation }) {
    const id = navigation.getParam('user');
    const perfil = navigation.getParam('perfil');
    const [nome, setNome] = useState('');

    useEffect(() => {
         async function loadNome() {
            const response = await api.post('/findFono', { id: id })
            setNome(response.data.nomeFono);
        }
        console.log(id);
        loadNome();
    }, []);

    function certificados() {
        navigation.navigate('listaCertificadoPaciente' , { id, perfil});
    }

    function CadastrarPaciente() {
        navigation.navigate('RegisterPaciente', { id , perfil });
    }

    function listarPacientes() {
        navigation.navigate('listaPaciente', { id, perfil });
    }

    function goOptions() {
        navigation.navigate('Options', { id, perfil});
    }

    return (
        <>
            <TouchableOpacity onPress={goOptions} style={styles.back}>
                <Image source={config} style={styles.imgConfig} />
            </TouchableOpacity>
            <StatusBar hidden={true} />
            <ImageBackground source={background} style={styles.container}>
                <Text style={styles.buttonText}>{nome}</Text>
                <View style={styles.responsiveBox}>
                    <TouchableOpacity onPress={listarPacientes} style={styles.button}>
                        <Text style={styles.buttonText}>PACIENTES</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={certificados} style={styles.button}>
                        <Text style={styles.buttonText}>CERTIFICADOS</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={CadastrarPaciente} style={styles.button}>
                        <Text style={styles.buttonText}>NOVO CADASTRO</Text>
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
        margin: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
    },

    buttonText: {
        color: '#e61c1c',
        fontWeight: 'bold',
        fontSize: 20
    },


    back: {
        backgroundColor: '#ffffff',
        width: 40,
    },

    imgConfig: {
        height: 40,
        width: 40,
    }
});

