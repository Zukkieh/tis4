import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { KeyboardAvoidingView, View, Platform, StatusBar, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';

import api from '../services/api';
import back from '../assets/retroceder.png';


export default function Login({ navigation }) {
    const id = navigation.getParam('id');
    const perfil = navigation.getParam('perfil');
    const logado = navigation.getParam('logado');
    const [nome, setNome] = useState('');
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [telefone, setTelefone] = useState('');
    const [nomeResponsavel, setNomeResponsavel] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [message, setMessage] = useState('');
    const [validate, setValidate] = useState(true);

    async function findId(fonoUser) {
        const response = await api.post('/findFono', { id: fonoUser });
        const idF = response.data.idFono;
        return idF;
    }

    async function handleRegisterPaciente() {
        if (nome != '' && user != '' && password != '' && telefone != '' && nomeResponsavel != '') {
            if (password == passwordConfirm) {
                const idF = await findId(id);
                const response = await api.post('/registerPaciente', { nome: nome, senha: password, user: user, telefone: telefone, responsavel: nomeResponsavel, id: idF })
                if (response.data == "1") {
                    const user = id;
                    navigation.navigate('MainFono', { user });
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
        const user = id;
        navigation.navigate('MainFono', { user , perfil , logado});
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
                    placeholder="Digite o nome do paciente"
                    placeholderTextColor="#999"
                    style={styles.input}
                    value={nome}
                    onChangeText={setNome}
                />
                <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Digite o usuário do paciente"
                    placeholderTextColor="#999"
                    style={styles.input}
                    value={user}
                    onChangeText={setUser}
                />
                <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Digite o telefone do responsável do paciente"
                    placeholderTextColor="#999"
                    keyboardType="phone-pad"
                    style={styles.input}
                    value={telefone}
                    onChangeText={setTelefone}
                />
                <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Digite o nome do responsável"
                    placeholderTextColor="#999"
                    style={styles.input}
                    value={nomeResponsavel}
                    onChangeText={setNomeResponsavel}
                />

                <View style={styles.containerPassowd}>

                    <TextInput
                        secureTextEntry={true}
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder="Digite uma senha para o paciente"
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

                <TouchableOpacity onPress={handleRegisterPaciente} style={styles.button}>
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
        backgroundColor: '#ffffff',
    },

    imgBack: {
        height: 40,
        width: 40,
    }
});