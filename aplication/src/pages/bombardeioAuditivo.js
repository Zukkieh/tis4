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
    const [incompleto, setincompleto] = useState('true');
    const [instructions, setInstructions] = useState(true);


    useEffect(() => {
        async function loadProgresso() {
            const progresso = await api.post('/getProgressoJogo', { id: id, jogo: 'Bombardeio Auditivo'});
            
            if (!(progresso.data.code === 204) ){
                if(progresso.data.nivel == 2){
                    sethidden(false);
                    sethidden2(false);
                    sethidden3(false);
                }
                else if(progresso.data.evolucao == 25){
                    sethidden(false);
                }
                else if(progresso.data.evolucao == 50){
                    sethidden(false);
                    sethidden2(false);
                }
                else if(progresso.data.evolucao == 75){
                    sethidden(false);
                    sethidden2(false);
                    sethidden3(false);
                }
                else if(progresso.data.evolucao == 100){
                    setincompleto(false);
                }
            }
            console.log(progresso.data.evolucao);
 
        }
        loadProgresso();
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
            {incompleto &&
                <>
                    {instructions &&
                        <>
                            <StatusBar hidden={true} />
                            <TouchableOpacity onPress={goBack} style={styles.back}>
                                <Image source={back} style={styles.imgBack} />
                            </TouchableOpacity>
                            <ImageBackground source={background} style={styles.image}>
                                <View style={styles.instructions}>
                                    <Text style={styles.instructionsTitle}>INSTRUÇÕES</Text>
                                    <Text style={styles.instructionsText}>Clique no botão com o número da etapa que deseja jogar.</Text>
                                    <Text style={styles.instructionsText}>Ao finalizar, clique em voltar e vá para a próxima etapa.</Text>
                                    <TouchableOpacity onPress={()=>setInstructions(false)} style={styles.playButton}>
                                        <Text style={styles.playButtonText}>JOGAR</Text>
                                    </TouchableOpacity>
                                </View>
                            </ImageBackground>
                        </>
                    }
                    {!instructions &&
                        <>
                            <StatusBar hidden={true} />
                            <TouchableOpacity onPress={goBack} style={styles.back}>
                                <Image source={back} style={styles.imgBack} />
                            </TouchableOpacity>
                            <ImageBackground source={background} style={styles.image}>
                                <View style={styles.container}>
                                    {incompleto && 
                                        <TouchableOpacity onPress={fase1} style={styles.button}>
                                            <Text style={styles.buttonText}>Etapa 1</Text>
                                        </TouchableOpacity>
                                    }
                                    {!hidden &&
                                        <TouchableOpacity style={styles.button} onPress={fase2}>
                                            <Text style={styles.buttonText}>Etapa 2</Text>
                                        </TouchableOpacity>
                                    }
                                    {!hidden2 &&
                                        <TouchableOpacity onPress={fase3} style={styles.button}>
                                            <Text style={styles.buttonText}>Etapa 3</Text>
                                        </TouchableOpacity>
                                    }
                                    {!hidden3 &&
                                        <TouchableOpacity style={styles.button} onPress={fase4}>
                                            <Text style={styles.buttonText}>Etapa 4</Text>
                                        </TouchableOpacity>
                                    }
                                </View>
                            </ImageBackground>
                        </>
                    }
                </>
            }
            {!incompleto &&
            <>
                <ImageBackground source={background} style={styles.endContainer}>
                    <Text style={styles.end}>PARABÉNS, VOCÊ COMPLETOU TODAS AS ETAPAS</Text>
                    <TouchableOpacity onPress={goBack} style={styles.messageButton}>
                        <Text style={styles.end}>Voltar</Text>
                    </TouchableOpacity>
                </ImageBackground>
            </>
            }
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

    instructions: {
        marginLeft: 150,
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',
        width: 500,
        height: 300,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 7
    },

    instructionsTitle: {
        marginBottom: 30,
        fontSize: 26,
        fontWeight: 'bold',
    },
    instructionsText: {
        fontSize: 19,
    },

    playButton: {
        marginTop: 50,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 7,
        backgroundColor: 'green'
    },

    playButtonText: {
        fontSize: 26
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
    },

    endContainer: {
        flex: 1,
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',
    },

    end: {
        color: '#e61c1c',
        fontWeight: 'bold',
        fontSize: 20
    },

    messageButton: {
        height: 55,
        width: 300,
        backgroundColor: '#ffff00',
        borderColor: "#FFD700",
        borderStyle: "solid",
        borderWidth: 1,
        margin: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
    },

})