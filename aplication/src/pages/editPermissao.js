import React, { useState, useEffect } from 'react';
import {
    KeyboardAvoidingView,
    View,
    Platform,
    Text,
    StyleSheet,
    StatusBar,
    Image,
    Picker,
    TextInput,
    TouchableOpacity
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';

import api from '../services/api';
import back from '../assets/retroceder.png';


export default function Fonema({ navigation }) {
    const [fonema, setFonema] = useState('R');
    const id = navigation.getParam('id');
    const idPac = navigation.getParam('idPac');
    const perfil = navigation.getParam('perfil');

    useEffect(() => {

    });

    async function givePermission() {
        const response = await api.post('/registerPermissao', { idPaciente: idPac, fonema: fonema })
        if (response)
            navigation.navigate('listaPaciente', { id , perfil});
    }

    function goBack() {
        navigation.navigate('ManagePac', { id, idPac , perfil});
    }

    return (
        <>
            <StatusBar hidden={true} />

            <TouchableOpacity onPress={goBack} style={styles.back}>
                <Image source={back} style={styles.imgBack} />
            </TouchableOpacity>
            <KeyboardAvoidingView
                behavior="padding"
                enabled={Platform.OS === 'ios'}
                style={styles.container}
            >
                <View style={styles.containerPassowd}>
                <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Digite o Fonema"
                    placeholderTextColor="#999"
                    style={styles.input}
                    value={fonema}
                    onChangeText={setFonema}
                />
                </View>

                <TouchableOpacity onPress={givePermission} style={styles.button}>
                    <Text style={styles.buttonText}>Conceder Permissão</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30
    },


    containerPassowd: {
        flexDirection: 'column',
        width: wp('92.45%'),
        backgroundColor: '#f5f5f5',
        justifyContent: 'space-around',
        alignItems: 'center',
        alignContent: 'center',

    },

    button: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#237edf',
        borderRadius: 4,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },

    back: {
        backgroundColor: '#ffffff',
    },

    imgBack: {
        height: 40,
        width: 40,
    }
});