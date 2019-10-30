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
import Sound from 'react-native-sound';

import background from '../assets/background.png';
import back from '../assets/retroceder.png';

export default function ParesMinimos({ navigation }) {
    const id = navigation.getParam('id');
    const perfil = navigation.getParam('perfil');
    const [firstSound, setFistSound] = useState(false);
    const [firstImage, setFistImage] = useState(false);
    const [secondSound, setSecondSound] = useState(false);
    const [secondImage, setSecondImage] = useState(false);

    function goBack() {
        navigation.navigate('Fonemas', { id , perfil });
    }
    
    
    function playSound1(test) {
        (secondImage == false && secondSound == true) && setSecondSound(false)
        var whoosh = new Sound(`sound${test}.mp3`, Sound.MAIN_BUNDLE, () => {
            whoosh.play();
        });
        setFistSound(true)
    }
    
    function playSound2(test) {
        (firstImage == false && firstSound == true) && setFistSound(false)
        var whoosh = new Sound(`sound${test}.mp3`, Sound.MAIN_BUNDLE, () => {
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
                    <>
                        <TouchableOpacity onPress={() => playSound1("1")}>
                            <Text>FirstSOUND</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => choseImage1("1")}>
                            <Text>FirstIMAGE</Text>
                        </TouchableOpacity>
                    </>
                }
                {(secondImage == true && secondSound == true) ?
                    <>
                    </>
                    :
                    <>
                        <TouchableOpacity onPress={() => playSound2("2")}>
                            <Text>SecondSOUND</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => choseImage2("2")}>
                            <Text>SecondIMAGE</Text>
                        </TouchableOpacity>
                    </>
                }
                {(secondSound && firstSound && firstImage && secondImage) && 
                    <TouchableOpacity onPress={goBack} style={styles.back}>
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
        alignItems: 'center',
        justifyContent: 'center',

    },

    back: {
        backgroundColor: '#ffffff',
        width: 40,
    },

    imgBack: {
        height: 40,
        width: 40,
    },

});