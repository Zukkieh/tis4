import React, { useState, useEffect } from 'react';
import {
    KeyboardAvoidingView,
    View,
    Platform,
    Text,
    StyleSheet,
    StatusBar,
    Image,
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


export default function Login({ navigation }) {
    const [password, setPassword] = useState('');
    const [current, setEmail] = useState('');
    const [confirm, setPasswordConfirm] = useState('');
    const [message, setMessage] = useState('');
    const [validate, setValidate] = useState(true);
    const id = navigation.getParam('id');
    const perfil = navigation.getParam('perfil');


    useEffect(() => {
        setValidate(true);
    }, [password, current]);

    async function handlePassword() {
        if (password != '' && current != '' && confirm != '') {
            if (password == confirm) {
                const response = await api.post('/updatePassword', { id: id, password: password, current: current , perfil : perfil})
                if(response)
                    navigation.navigate('Options', { id });
            } else {
                setMessage('As senhas devem ser iguais');
                setValidate(false);
            }
        } else {
            setMessage('Todos os campos são obrigatórios');
            setValidate(false);
        }
    }

    function goBack() {
        navigation.navigate('Options', { id , perfil});
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
                {!validate &&
                    <Text style={{ color: "red" }}>{message}</Text>
                }

                <View style={styles.containerPassowd}>

                    <TextInput
                        secureTextEntry={true}
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder="Digite sua senha atual"
                        placeholderTextColor="#999"
                        style={styles.password}
                        value={current}
                        onChangeText={setEmail}
                    />

                    <TextInput
                        secureTextEntry={true}
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder="Digite sua nova senha"
                        placeholderTextColor="#999"
                        style={styles.password}
                        value={password}
                        onChangeText={setPassword}
                    />

                    <TextInput
                        secureTextEntry={true}
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder="Digite sua nova senha"
                        placeholderTextColor="#999"
                        style={styles.password}
                        value={confirm}
                        onChangeText={setPasswordConfirm}
                    />
                </View>

                <TouchableOpacity onPress={handlePassword} style={styles.button}>
                    <Text style={styles.buttonText}>Trocar</Text>
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

    password: {
        width: wp('46.185%'),
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        marginTop: 5,
        paddingHorizontal: 15
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