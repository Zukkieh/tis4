import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
    KeyboardAvoidingView,
    Platform,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import api from '../services/api';

export default function Login({ navigation }) {
    const [validate, setValidate] = useState(true);
    const [erroMsg, setErroMsg] = useState('');
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [fono, setFono] = useState(true);
    const [tipo, setTipo] = useState('/loginF');
    const [page, setPage] = useState('MainFono');
    const [perfil, setPerfil] = useState('fonoaudiologo');

    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            //verificar se o usuário é fono ou paciente
            if (user) {
                AsyncStorage.getItem('perfil').then(perfil => {
                    if (perfil == "paciente")
                        navigation.navigate('MainPaciente', { user, perfil })
                    else {
                        navigation.navigate('MainFono', { user, perfil })
                    }
                })
            }
        })
    }, []);



    async function handleLogin() {

        const response = await api.post(`${tipo}`, { user: user, senha: password });
        const usuario = response.data;
        if (usuario.success != "Empty") {
            if (usuario.success != "!Exist") {
                AsyncStorage.setItem('user', user, () => {
                    AsyncStorage.setItem('perfil', perfil, () => {
                        navigation.navigate(`${page}`, { user, perfil });
                    });
                });
            } else {
                setValidate(false);
                setErroMsg('Login ou senha inválidos');
            }
        } else {
            setValidate(false);
            setErroMsg('Você tem certeza que preencheu corretamente?');
        }
    }

    function handleWantRegister() {
        navigation.navigate('Register');
    }

    return (
        <KeyboardAvoidingView
            behavior="padding"
            enabled={Platform.OS === 'ios'}
            style={styles.container}
        >
            <Image />

            <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                {...(fono ? {placeholder: 'Digite seu CRFA'} : {placeholder: 'Digite seu usuário'})}
                placeholderTextColor="#999"
                style={styles.input}
                value={user}
                onChangeText={setUser}
            />

            <TextInput
                secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Senha"
                placeholderTextColor="#999"
                style={styles.inputPass}
                value={password}
                onChangeText={setPassword}
            />

            <CheckBox
                value={fono}
                onValueChange={
                    () => {
                        setFono(!fono);
                        if (tipo == '/loginP') {
                            setTipo('/loginF');
                            setPage('MainFono');
                            setPerfil('fonoaudiologo');
                        } else {
                            setTipo('/loginP');
                            setPage('MainPaciente');
                            setPerfil('paciente');
                        }
                        console.log(tipo);


                    }
                }
            />
            <Text style={{ color: "red" }}>Sou fono</Text>

            {!validate &&
                <Text style={{ color: "red" }}>{erroMsg}</Text>
            }

            <TouchableOpacity onPress={handleLogin} style={styles.button}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleWantRegister}>
                <Text style={styles.linkRegister}>Sou fonoaudiólogo e quero me registrar</Text>
            </TouchableOpacity>

        </KeyboardAvoidingView>
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

    input: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        marginTop: 20,
        paddingHorizontal: 15
    },

    inputPass: {
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

    linkRegister: {
        color: '#7eb4ed',
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 10,
    },
});