import React, { useState, useEffect } from 'react';
import {
    View,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    Image,
    Text
} from 'react-native';
import api from '../services/api';

import Sound from 'react-native-sound';

import background2 from '../assets/background2.png';
import background from '../assets/background.png';
import back from '../assets/retroceder.png';
import sound from '../assets/sound2IMG.png';
import ambulancia from '../assets/DiscriminacaoAuditiva/ambulancia.png'
import cachorro from '../assets/DiscriminacaoAuditiva/cachorro.png'
import telefone from '../assets/DiscriminacaoAuditiva/telefone.png'
import sino from '../assets/DiscriminacaoAuditiva/sino.png'

export default function DiscriminacaoAuditiva({ navigation }) {
    const id = navigation.getParam('id');
    const perfil = navigation.getParam('perfil');
    const [end, setEnd] = useState(false);
    const [choseSound, setChoseSound] = useState('');
    const [clickSound, setClickSound] = useState(false);
    const [progresso, setProgresso] = useState('0');
    const [status, setStatus] = useState('0');
    const [nivel, setNivel] = useState('0');
    const [instructions, setInstructions] = useState(true);


    useEffect(() => {
        async function getSound() {
            const progresso = await api.post('/getProgressoJogo', { id: id, jogo: "Discriminação Auditiva"})
            const level = await api.post('/getLevel', { id: id})
            setNivel(level.data)
            if(progresso.data.evolucao < 100 || progresso.data.code === 204){
                if(progresso.data.code === 204){
                    setChoseSound('sd_0');
                }else{
                    setChoseSound(`sd_${progresso.data.evolucao}`);
                    setProgresso(`${progresso.data.evolucao}`)
                }
            }else{
                if(progresso.data.nivel == '2'){
                    await api.post('/clearGame', { id: id, jogo: "Discriminação Auditiva"})
                    setChoseSound('sd_0');
                }else{
                    setEnd(true)
                }
            }
            
        }
        getSound();
    }, []);

    async function goBackReset() {
        if(nivel == '2'){
            await api.post('/clearGame', { id: id, jogo: "Pares Minimos"})
        }
        navigation.navigate('Games', { id , perfil });
    }
    function goBack() {
        navigation.navigate('Games', { id , perfil });
    }

    function playSound(test) {
        console.log(progresso);
        setClickSound(true)
        var whoosh = new Sound(`${test}.mp3`, Sound.MAIN_BUNDLE, () => {
            whoosh.play();
            console.log(test)
        });
    }

    function handleClickImage(value) {
        console.log(progresso);
        if (value === '2' && clickSound) setStatus('2')
        if (value === '1' && clickSound) setStatus('1')
        setClickSound(false)
    }

    async function nextSound() {
        let response = "";
        const progresso = await api.post('/getProgressoJogo', { id: id, jogo: "Discriminação Auditiva"})
        setStatus('0')
        if(progresso.data.code === 204){
            setChoseSound(`sd_25`);
            setProgresso("25")
        }else{
            if(progresso.data.evolucao>= 25){
                setChoseSound(`sd_${progresso.data.evolucao+25}`);
                setProgresso(`${progresso.data.evolucao+25}`)
            }
        }

        if(progresso.data.evolucao < 100 || progresso.data.code === 204){
            if(progresso.data.code === 204)
                response = await api.post('/registerProgresso', { idPaciente: id, jogo: "Discriminação Auditiva", porcentagem: 25 })
            else
                response = await api.post('/updateProgresso', { idPaciente: id, jogo: "Discriminação Auditiva", progresso: (progresso.data.evolucao + 25) })
        }else
            setEnd(true)
        if(progresso.data.evolucao === 75)
            setEnd(true)
    }

    return (
        <>
            {!end &&
                <>
                    {instructions &&
                        <>
                            <StatusBar hidden={true} />
                            <ImageBackground source={background2} style={styles.backgroundImg}>
                                <TouchableOpacity onPress={goBack} style={styles.imgBackButton}>
                                    <Image source={back} style={styles.imgBack} />
                                <Text>VOLTAR</Text>
                                </TouchableOpacity>
                                <View style={styles.instructions}>
                                    <Text style={styles.instructionsTitle}>INSTRUÇÕES</Text>
                                    <Text style={styles.instructionsText}>Clique na imagem do megafone para tocar o áudio.</Text>
                                    <Text style={styles.instructionsText}>Depois de escutar, clique na imagem que faz esse som.</Text>
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
                            <ImageBackground source={background2} style={styles.backgroundImg}>
                                <TouchableOpacity onPress={goBack} style={styles.imgBackButton}>
                                    <Image source={back} style={styles.imgBack} />
                                <Text>VOLTAR</Text>
                                </TouchableOpacity>
                                <View style={styles.container}>
                                    {status === '0' &&
                                        <>
                                            <View>
                                                <TouchableOpacity onPress={() => playSound(choseSound)} style={styles.soundSection}>
                                                    <Image source={sound} style={styles.soundImg} />
                                                </TouchableOpacity>
                                            </View>
                                            <View style={styles.choseSection}>
                                                <TouchableOpacity onPress={() => {progresso === "25" ? handleClickImage('2') : handleClickImage('1')}}style={styles.choseSectionButton}>
                                                    <Image source={sino} style={styles.choseImage} />
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => {progresso === "75" ? handleClickImage('2') : handleClickImage('1')}}style={styles.choseSectionButton}>
                                                    <Image source={cachorro} style={styles.choseImage} />
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => {progresso === "0" ? handleClickImage('2') : handleClickImage('1')}}style={styles.choseSectionButton}>
                                                    <Image source={telefone} style={styles.choseImage} />
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => {progresso === "50" ? handleClickImage('2') : handleClickImage('1')}}style={styles.choseSectionButton}>
                                                    <Image source={ambulancia} style={styles.choseImage} />
                                                </TouchableOpacity>
                                            </View>
                                        </>
                                    }
                                    {status === '1' &&
                                        <View style={styles.messageSection}>
                                            <Text style={styles.textWrong}>OPS!!</Text>
                                            <TouchableOpacity onPress={() => setStatus('0')} style={styles.messageButton}>
                                                <Text style={styles.textWrong}>TENTAR NOVAMENTE</Text>
                                            </TouchableOpacity>
                                        </View>
                                    }
                                    {status === '2' &&
                                    <View style={styles.messageSection}>
                                        <Text style={styles.textRight}>PARABÉNS!!</Text>
                                        <TouchableOpacity onPress={() => nextSound()} style={styles.messageButton}>
                                            <Text style={styles.textRight}>PRÓXIMO SOM</Text>
                                        </TouchableOpacity>
                                    </View>
                                    }
                                </View>
                            </ImageBackground>
                        </>
                    }
                </>
            }
            {end && 
                <>
                    <ImageBackground source={background} style={styles.container}>
                        <Text style={styles.end}>PARABÉNS, VOCÊ COMPLETOU TODOS OS SONS</Text>
                        <TouchableOpacity onPress={goBackReset} style={styles.messageButton}>
                            <Text style={styles.end}>Voltar</Text>
                        </TouchableOpacity>
                    </ImageBackground>
                </>
            }
        </>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',
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

    backgroundImg: {
        flex: 1,
    },

    backgroundImg2: {
        flex: 1,
    },

    soundSection: {
        marginBottom: 60,
        height: 70,
        width: 70,
    },

    soundImg: {
        height: 70,
        width: 70,
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 7
    },

    choseSection: {
        height: 150,
        width: 640,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
    },

    choseSectionButton: {
        marginLeft: 30,
        height: 150,
        width: 120,
        alignItems: 'center',
        justifyContent: 'center',
    },

    choseImage: {
        height: 150,
        width: 120,
    },

    back: {
        backgroundColor: '#f5f5f5',
    },

    ImgGame: {
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    
    soundIMG: {
        height: 40,
        width: 40,
    },

    sound: {
        marginRight: 300,
        alignContent: 'center',
        alignItems: 'center'
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
    },

    messageSection: {
        height: 200,
        width: 400,
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 7,
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },

    textWrong: {
        fontFamily: 'arial',
        fontSize: 20,
        color: 'red'
    },

    textRight: {
        fontFamily: 'arial',
        fontSize: 20,
        color: 'green'
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

    end: {
        color: '#e61c1c',
        fontWeight: 'bold',
        fontSize: 20
    },

});
