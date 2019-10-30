import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
    SafeAreaView,
    StatusBar,
    View,
    FlatList,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';

import CheckBox from '@react-native-community/checkbox';
import api from '../services/api';
import back from '../assets/retroceder.png';

import { widthPercentageToDP } from 'react-native-responsive-screen';

export default function listaPacientes({ navigation }) {
    const id = navigation.getParam('id');
    const perfil = navigation.getParam('perfil');
    const [pacientes, setPacientes] = useState([]);

    useEffect(() => {
        async function loadPacientes() {
            const response = await api.post('/listPacientes', { id: id })
            console.log(response.data);
            setPacientes(response.data);
        }
        console.log(id);
        loadPacientes();
    }, []);

    function goBack(){
        const user = id;
        navigation.navigate('MainFono', { user , perfil});
    }

    function manage(identificador){
        const idPac = identificador;
        navigation.navigate('ManagePac', { id, idPac , perfil});
    }

    return (
        <>
                    <StatusBar hidden={true} />

            <TouchableOpacity onPress={goBack} style={styles.back}>
                <Image source={back} style={styles.imgBack} />
            </TouchableOpacity>
            <View style={styles.container}>
                <FlatList
                    data={pacientes}
                    keyExtractor={post => String(post.idPaciente)}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Text onPress={() => manage(item.idPaciente)} style={styles.name}>
                                {item.nomePaciente}
                            </Text>
                        </View>

                    )}
                >
                </FlatList>
            </View>
        </>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    cardsContainer: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        maxHeight: 100
    },

    card: {
        width: wp('50%'),
        height: hp('30%'),
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        margin: wp('0.5%'),
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',

    },

    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333'
    },

    buttonsContainer: {
        flexDirection: 'row',
        marginBottom: 30
    },

    button: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },

    empty: {
        alignSelf: 'center',
        color: '#999',
        fontSize: 24,
        fontWeight: 'bold'
    },

    back: {
        backgroundColor: '#ffffff',
        width: 40,
    },

    imgBack: {
        height: 40,
        width:40,
    }
});

