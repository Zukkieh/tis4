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

import background from '../assets/background.png';
import back from '../assets/retroceder.png';
import sound1IMG from '../assets/sound1IMG.png';
import sound2IMG from '../assets/sound2IMG.png';
import I0_1 from '../assets/ParesMinimosImgs/I0_1.png';
import I0_2 from '../assets/ParesMinimosImgs/I0_2.png';
import I25_1 from '../assets/ParesMinimosImgs/I25_1.png';
import I25_2 from '../assets/ParesMinimosImgs/I25_2.png';
import I50_1 from '../assets/ParesMinimosImgs/I50_1.png';
import I50_2 from '../assets/ParesMinimosImgs/I50_2.png';
import I75_1 from '../assets/ParesMinimosImgs/I75_1.png';
import I75_2 from '../assets/ParesMinimosImgs/I75_2.png';
import I100_1 from '../assets/ParesMinimosImgs/I100_1.png';
import I100_2 from '../assets/ParesMinimosImgs/I100_2.png';
import { black } from 'ansi-colors';

export default function ParesMinimos({ navigation }) {
    const id = navigation.getParam('id');
    const perfil = navigation.getParam('perfil');
    const [firstSound, setFistSound] = useState(false);
    const [firstImage, setFistImage] = useState(false);
    const [secondSound, setSecondSound] = useState(false);
    const [secondImage, setSecondImage] = useState(false);
    const [choseSoundOne, setChoseSoundOne] = useState('');
    const [choseSoundTwo, setChoseSoundTwo] = useState('');
    const [choseImageOne, setChoseImageOne] = useState('');
    const [choseImageTwo, setChoseImageTwo] = useState('');
    const [end, setEnd] = useState(false);
    const [nivel, setNivel] = useState('0');
    const [instructions, setInstructions] = useState(true);

    useEffect(() => {
        async function getSound() {
            const progresso = await api.post('/getProgressoJogo', { id: id, jogo: "Pares Minimos"})
            const level = await api.post('/getLevel', { id: id})
            console.log(level.data)
            setNivel(level.data)
            if(progresso.data.evolucao < 100 || progresso.data.code === 204 || level.data == 2){
                if(progresso.data.code === 204){
                    setChoseSoundOne('s0_1');
                    setChoseSoundTwo('s0_2');
                    setChoseImageOne('I0_1');
                    setChoseImageTwo('I0_2');
                }else{
                    setChoseSoundOne(`s${progresso.data.evolucao}_1`);
                    setChoseSoundTwo(`s${progresso.data.evolucao}_2`);
                    setChoseImageOne(`I${progresso.data.evolucao}_1`);
                    setChoseImageTwo(`I${progresso.data.evolucao}_2`);
                }
                if(level.data == 2 && progresso.data.evolucao == 100){
                    setChoseSoundOne('s0_1');
                    setChoseSoundTwo('s0_2');
                    setChoseImageOne('I0_1');
                    setChoseImageTwo('I0_2');
                }
            }else{
                if(progresso.data.nivel == '2'){
                    await api.post('/clearGame', { id: id, jogo: "Pares Minimos"})
                    setChoseSoundOne('s0_1');
                    setChoseSoundTwo('s0_2');
                    setChoseImageOne('I0_1');
                    setChoseImageTwo('I0_2');
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

    
    async function nextWords() {
        let response = "";
        const progresso = await api.post('/getProgressoJogo', { id: id, jogo: "Pares Minimos"})

        setFistSound(false)
        setFistImage(false)
        setSecondSound(false)
        setSecondImage(false)
        if(progresso.data.code === 204){
            setChoseSoundOne(`s25_1`);
            setChoseSoundTwo(`s25_2`);
            setChoseImageOne(`I25_1`)
            setChoseImageTwo(`I25_2`)
        }else{
            if(progresso.data .evolucao>= 25){
                setChoseSoundOne(`s${progresso.data.evolucao+25}_1`);
                setChoseSoundTwo(`s${progresso.data.evolucao+25}_2`);
                setChoseImageOne(`I${progresso.data.evolucao+25}_1`)
                setChoseImageTwo(`I${progresso.data.evolucao+25}_2`)
            }
        }

        if(progresso.data.evolucao < 100 || progresso.data.code === 204){
            if(progresso.data.code === 204)
                response = await api.post('/registerProgresso', { idPaciente: id, jogo: "Pares Minimos", porcentagem: 25 })
            else
                response = await api.post('/updateProgresso', { idPaciente: id, jogo: "Pares Minimos", progresso: (progresso.data.evolucao + 25) })
        }else
            setEnd(true)
    }
    
    function playSound1(test) {
        (secondImage == false && secondSound == true) && setSecondSound(false)
        var whoosh = new Sound(`${test}.mp3`, Sound.MAIN_BUNDLE, () => {
            whoosh.play();
            console.log(test)
        });
        setFistSound(true)
    }
    
    function playSound2(test) {
        (firstImage == false && firstSound == true) && setFistSound(false)
        var whoosh = new Sound(`${test}.mp3`, Sound.MAIN_BUNDLE, () => {
            whoosh.play();
        });
        setSecondSound(true)
    }

    function choseImage1() {
        if(secondImage == false && secondSound == true){
            setSecondSound(false)

        }
        firstSound && setFistImage(true)
    }

    function choseImage2() {
        (firstImage == false && firstSound == true) && setFistSound(false)
        secondSound && setSecondImage(true)
    }

    return (
        <>
            {!end &&
                <>
                    {instructions &&
                        <>
                            <StatusBar hidden={true} />
                            <TouchableOpacity onPress={goBack} style={styles.back}>
                                <Image source={back} style={styles.imgBack} />
                            </TouchableOpacity>
                            <ImageBackground source={background} style={styles.container}>
                                <View style={styles.instructions}>
                                    <Text style={styles.instructionsTitle}>INSTRUÇÕES</Text>
                                    <Text style={styles.instructionsText}>Clique no megafone azul.</Text>
                                    <Text style={styles.instructionsText}>Depois de escutar, clique na imagem da palavra escutada.</Text>
                                    <Text style={styles.instructionsText}>Depois clique no megafone amarelo.</Text>
                                    <Text style={styles.instructionsText}>Depois de escutar, clique na imagem da palavra escutada.</Text>
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
                            <ImageBackground source={background} style={styles.container}>
                                {(firstImage == true && firstSound == true) ?
                                    <>
                                    </>
                                    :
                                    <View style={styles.gameSection}>
                                        <View style={styles.sound}> 
                                            <TouchableOpacity onPress={() => playSound1(choseSoundOne)}>
                                                <Image source={sound1IMG} style={styles.soundIMG} />
                                            </TouchableOpacity>
                                        </View> 
                                        <View style={styles.image}> 
                                            <TouchableOpacity onPress={() => choseImage1("1")} style={styles.ImgGame}>
                                            {choseImageOne == "I0_1" && <Image source={I0_1} />}
                                            {choseImageOne == "I25_1" && <Image source={I25_1} />}
                                            {choseImageOne == "I50_1" && <Image source={I50_1} />}
                                            {choseImageOne == "I75_1" && <Image source={I75_1} />}
                                            {choseImageOne == "I100_1" && <Image source={I100_1} />}
                                            </TouchableOpacity>
                                        </View> 
                                    </View>
                                }
                                {(secondImage == true && secondSound == true) ?
                                    <>
                                    </>
                                    :
                                    <View style={styles.gameSection}>
                                        <View style={styles.sound}> 
                                            <TouchableOpacity onPress={() => playSound2(choseSoundTwo)}>
                                                <Image source={sound2IMG} style={styles.soundIMG} />
                                            </TouchableOpacity>
                                        </View> 
                                        <View style={styles.image}> 
                                            <TouchableOpacity onPress={() => choseImage2("2")} style={styles.ImgGame}>
                                                {choseImageTwo == 'I0_2' && <Image source={I0_2} />}
                                                {choseImageTwo == 'I25_2' && <Image source={I25_2} />}
                                                {choseImageTwo == 'I50_2' && <Image source={I50_2} />}
                                                {choseImageTwo == 'I75_2' && <Image source={I75_2} />}
                                                {choseImageTwo == 'I100_2' && <Image source={I100_2} />}
                                            </TouchableOpacity>
                                        </View> 
                                    </View>
                                }
                                {(secondSound && firstSound && firstImage && secondImage && !end) && 
                                    <TouchableOpacity onPress={nextWords} style={styles.ButtonNextPair}>
                                        <Text style={styles.nextPair}>Próximo par</Text>
                                    </TouchableOpacity>
                                }
                            </ImageBackground>
                        </>
                    }
                </>
            }
            {end && 
                <>
                    <ImageBackground source={background} style={styles.container}>
                        <Text style={styles.nextPair}>PARABÉNS, VOCÊ COMPLETOU TODOS OS PARES</Text>
                        <TouchableOpacity onPress={goBackReset} style={styles.ButtonNextPair}>
                            <Text style={styles.nextPair}>Voltar</Text>
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
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },

    instructions: {
        marginLeft: 30,
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

    gameSection: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    back: {
        backgroundColor: '#f5f5f5',
    },

    ImgGame: {
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 100,
        height: 100
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

    imgBack: {
        height: 40,
        width: 40,
    },

    ButtonNextPair: {
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

    nextPair: {
        color: '#e61c1c',
        fontWeight: 'bold',
        fontSize: 20
    },

});
