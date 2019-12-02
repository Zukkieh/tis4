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
    ProgressBarAndroid,
    ImageBackground
} from 'react-native';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';

import api from '../services/api';
import back from '../assets/retroceder.png';
import background from '../assets/background.png';

export default function listaPacientes({ navigation }) {
    const id = navigation.getParam('id');
    const idPac = navigation.getParam('idPac');
    const [pacientes, setPacientes] = useState([]);

    useEffect(() => {
        async function loadPacientes() {
            const response = await api.post('/listProgresso', { id: idPac })
            if(response.data[0])
                setPacientes(response.data);
        }
        console.log(id);
        loadPacientes();
    }, []);

    function goBack() {
        const user = id;
        navigation.navigate('ManagePac', { id, idPac });
    }
    return (
        <>
            <StatusBar hidden={true} />
            <ImageBackground source={background} style={styles.backgroundImg}>
                <TouchableOpacity onPress={goBack} style={styles.imgBackButton}>
                    <Image source={back} style={styles.imgBack} />
                    <Text>VOLTAR</Text>
                </TouchableOpacity>
                <View style={styles.dataView}>
                    <Text style={styles.avaliacao}>
                        AVALIAÇÃO
                    </Text>
                    {pacientes.map((obj, index) => (
                        <View key={index} style={styles.dataCard}>
                            <View style={styles.gameView}>
                                <Text style={styles.game}>
                                    {obj.jogo}
                                </Text>
                            </View>
                            <View style={styles.progress}>
                                <ProgressBarAndroid
                                styleAttr="Horizontal"
                                indeterminate={false}
                                progress={obj.evolucao/100}
                                />
                            </View>
                            <View style={styles.percentView}>
                                <Text style={styles.percent}>
                                    {obj.evolucao}% concluído
                                </Text>
                            </View>
                        </View>
                    ))}
                </View>
            </ImageBackground>
        </>
    );

}

const styles = StyleSheet.create({

    backgroundImg: {
        flex: 1,
    },

    dataView: {
        marginTop: 20,
        width: 600,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        maxHeight: 300,
        backgroundColor: 'white',
        borderRadius: 10,
    },

    dataCard: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'flex-start',
        justifyContent: 'center',
        maxHeight: 100,
    },

    gameView: {
        marginLeft: 10,
        justifyContent: 'center',
        alignSelf: 'center',
    },

    game: {
        width: 200,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333'
    },

    progress: {
        justifyContent: 'center',
        alignSelf: 'center',
    },

    percentView: {
        marginLeft: 10,
        justifyContent: 'center',
        alignSelf: 'center',
    },

    percent: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333'
    },

    avaliacao: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'black'
    },

    buttonsContainer: {
        flexDirection: 'row',
        marginBottom: 30
    },

    empty: {
        alignSelf: 'center',
        color: '#999',
        fontSize: 24,
        fontWeight: 'bold'
    },

    imgBackButton: {
        marginLeft: 5,
        marginTop: 5,
        height: 40,
        width: 100,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 7,
        backgroundColor: '#fffe71'
    },

    imgBack: {
        height: 40,
        width: 40,
    }
});

