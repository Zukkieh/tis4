import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
    View,
    ImageBackground,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    StatusBar
} from 'react-native';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';

import api from '../services/api';
import background from '../assets/background.png';
import back from '../assets/retroceder.png';


export default function GerenciaPaciente({ navigation }) {
    const id = navigation.getParam('id');
    const perfil = navigation.getParam('perfil');
    const [evolucao, setevolucao] = useState("");
    const [hidden, sethidden] = useState(true);
    const [hidden2, sethidden2] = useState(true);
    const [hidden3, sethidden3] = useState(true);
    const [incompleto, setincompleto] = useState(true);


    useEffect(() => {
        async function loadPacientes() {
            const response = await api.post('/getProgressoJogo', { id: id, jogo: "Bombardeio Auditivo"})
            console.log(response.data);
            if (response.data[0]){
                setevolucao(response.data.evolucao);
                if(response.data.nivel == 2){
                    sethidden(false);
                    sethidden2(false);
                    sethidden3(false);
                }
                else if(evolucao = 25){
                    sethidden(false);
                }
                else if(evolucao = 50){
                    sethidden(false);
                    sethidden2(false);
                }
                else if(evolucao = 75){
                    sethidden(false);
                    sethidden2(false);
                    sethidden3(false);
                }
                else if(evolucao = 100){
                    setincompleto(false);
                }
            }
        }
        loadPacientes();
    }, []);


    function fase1() {
        navigation.navigate('bombAudit_1' , {id , perfil})
    }

    function fase2() {
        navigation.navigate('bombAudit_2' , {id , perfil})
        
    }
    function fase3() {
        navigation.navigate('bombAudit_3' , {id , perfil})
        
    }
    function fase4() {
        navigation.navigate('bombAudit_4' , {id , perfil})
        
    }

    function goBack() {
        navigation.navigate('Games', { id , perfil });
    }

    return (
        <>
            <StatusBar hidden={true} />
            <TouchableOpacity onPress={goBack} style={styles.back}>
                <Image source={back} style={styles.imgBack} />
            </TouchableOpacity>
            <ImageBackground source={background} style={styles.image}>
                <View style={styles.container}>
                    <TouchableOpacity onPress={fase1} style={styles.button} hide={!this.state.incompleto}>
                        <Text style={styles.buttonText}>Etapa 1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={fase2} hide={this.state.hidden}>
                        <Text style={styles.buttonText}>Etapa 2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={fase3} style={styles.button} hide={this.state.hidden2}>
                        <Text style={styles.buttonText}>Etapa 3</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={fase4} hide={this.state.hidden3}>
                        <Text style={styles.buttonText}>Etapa 4</Text>
                    </TouchableOpacity>
                </View>
                <Text hide={this.state.incompleto}> Você já completou este jogo, parabéns</Text>
            </ImageBackground>
        </>
    );
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'space-between'
    },
    container: {
        flexDirection: 'column',
        width: wp('43%'),
        height: hp('46%'),
        marginTop: 45,
        marginLeft: 125,
        justifyContent: 'space-between',
    },
    button: {
        height: 55,
        width: 250,
        backgroundColor: '#ffff00',
        borderRadius: 30,
        borderColor: "#FFD700",
        borderStyle: "solid",
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: '8%',
        marginTop:"3%",
    },

    buttonText: {
        color: '#e61c1c',
        fontWeight: 'bold',
        fontSize: 20
    },

    back: {
        backgroundColor: '#f5f5f5',
    },

    imgBack: {
        height: 40,
        width: 40,
    }

})