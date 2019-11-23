import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
    KeyboardAvoidingView,
    View,
    Platform,
    Text,
    StyleSheet,
    Image,
    StatusBar,
    TextInput,
    TouchableOpacity,
    Alert
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
    const [nome, setNome] = useState('');
    const [password, setPassword] = useState('');
    const [crfa, setCrfa] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [message, setMessage] = useState('');
    const [validate, setValidate] = useState(true);

    useEffect(() => {
        setValidate(true);
    }, [nome, password, crfa, cpf, email]);

    async function handleRegister() {
        if (nome != '' && crfa != '' && password != '' && cpf != '' && email != '') {
            if (password == passwordConfirm) {
                const response = await api.post('/register', { nome: nome, senha: password, crfa: crfa, cpf: cpf, email: email })
                if (response.data == "1") {
                    Alert.alert('', 'Cadastro Realizado com sucesso!')
                    navigation.navigate('Login')
                }
                if (response.data == "1062") {
                    setMessage('Usuário já existente');
                    setValidate(false);
                }
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
        navigation.navigate('Login');
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

                <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Digite seu nome"
                    placeholderTextColor="#999"
                    style={styles.input}
                    value={nome}
                    onChangeText={setNome}
                />
                <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Digite seu crfa"
                    placeholderTextColor="#999"
                    keyboardType="number-pad"
                    style={styles.input}
                    value={crfa}
                    onChangeText={setCrfa}
                />
                <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Digite seu cpf"
                    placeholderTextColor="#999"
                    keyboardType="number-pad"
                    style={styles.input}
                    value={cpf}
                    onChangeText={setCpf}
                />

                <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Digite seu email"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                />

                <View style={styles.containerPassowd}>
                    <TextInput
                        secureTextEntry={true}
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder="Senha"
                        placeholderTextColor="#999"
                        style={styles.password}
                        value={password}
                        onChangeText={setPassword}
                    />

                    <TextInput
                        secureTextEntry={true}
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder="Confirmar senha"
                        placeholderTextColor="#999"
                        style={styles.password}
                        value={passwordConfirm}
                        onChangeText={setPasswordConfirm}
                    />
                </View>

                <TouchableOpacity onPress={handleRegister} style={styles.button}>
                    <Text style={styles.buttonText}>Enviar</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30
    },

    containerPassowd: {
        alignSelf: 'stretch',
        width: wp('92.45%'),
        backgroundColor: '#f5f5f5',
        flexDirection: 'row',
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

    input: {
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

    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    },


    back: {
        backgroundColor: '#f5f5f5',
    },

    imgBack: {
        height: 40,
        width: 40,
    }
});