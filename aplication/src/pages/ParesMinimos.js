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

export default function ParesMinimos({ navigation }) {
    const id = navigation.getParam('id');
    const perfil = navigation.getParam('perfil');
    const [firstSound, setFistSound] = useState(false);
    const [firstImage, setFistImage] = useState(false);
    const [secondSound, setSecondSound] = useState(false);
    const [secondImage, setSecondImage] = useState(false);
    const [choseSoundOne, setChoseSoundOne] = useState('');
    const [choseSoundTwo, setChoseSoundTwo] = useState('');

    function goBack() {
        navigation.navigate('Games', { id , perfil });
    }

    useEffect(() => {
        async function getSound() {
            const progresso = await api.post('/getProgressoJogo', { id: id, jogo: "Pares Minimos"})
            if(progresso.data < 100 || progresso.data.code === 204){
                if(progresso.data.code === 204){
                    setChoseSoundOne('s0_1');
                    setChoseSoundTwo('s0_2');
                }else{
                    setChoseSoundOne(`s${progresso.data}_1`);
                    setChoseSoundTwo(`s${progresso.data}_2`);
                }
            }
        }
        getSound();
    }, []);

    
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
        }else{
            if(progresso.data >= 25){
                setChoseSoundOne(`s${progresso.data+25}_1`);
                setChoseSoundTwo(`s${progresso.data+25}_2`);
            }
        }

        if(progresso.data < 100 || progresso.data.code === 204){
            if(progresso.data.code === 204)
                response = await api.post('/registerProgresso', { idPaciente: id, jogo: "Pares Minimos", porcentagem: 25 })
            else
                response = await api.post('/updateProgresso', { idPaciente: id, jogo: "Pares Minimos", progresso: (progresso.data + 25) })
        }else
            console.log('fim')
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
        firstSound && setFistImage(true)
    }

    function choseImage2() {
        secondSound && setSecondImage(true)
    }

    return (
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
                            <TouchableOpacity onPress={() => choseImage1("1")}>
                                <Text>IMAGE1</Text>
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
                            <TouchableOpacity onPress={() => choseImage2("2")}>
                                <Text>IMAGE2</Text>
                            </TouchableOpacity>
                        </View> 
                    </View>
                }
                {(secondSound && firstSound && firstImage && secondImage) && 
                    <TouchableOpacity onPress={nextWords} style={styles.back}>
                        <Image source={back} style={styles.imgBack} />
                    </TouchableOpacity>
                }
            </ImageBackground>
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
    gameSection: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    back: {
        backgroundColor: '#ffffff',
        width: 40,
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

    image: {
    },

    imgBack: {
        height: 40,
        width: 40,
    },

});
