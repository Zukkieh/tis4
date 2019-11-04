/**
 * Sample React Native App
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  ImageBackground,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { blue, black, underline, bold } from 'ansi-colors';

import background from '../assets/background.png';

const diaDoMes = diaMes => diaMes >= 10 ? diaMes : `0${diaMes}`
const mes = mes => mes + 1

export default function Certificado({navigation}) {

  const id = navigation.getParam('id')
  const nomePaciente = navigation.getParam('nomeP')
  const nomeFono = navigation.getParam('nomeF')
  const data = new Date()

  return (
    <ImageBackground source={background} style={styles.image}>
      <View style={styles.App}>
        <Text h1 style={styles.certTitulo}>CERTIFICADO</Text>
        <Text style={styles.certTexto}>Certificamos que {nomePaciente} adquiriu fluência do /r/ com bom desempenho em todas as atividades.</Text>
        <Text style={styles.certFonoResp}>{nomeFono}</Text>
        <Text style={styles.certAssinatura}>(asssinatura do(a) Fonoaudiólogo(a) responsável)</Text>
        <Text style={styles.certData}>{diaDoMes(data.getDate())}/{mes(data.getMonth())}/{data.getFullYear()}</Text>
        <Text style={styles.certTextoData}>(data)</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'space-between'
  },

  App: {
    width: "55%",
    marginTop: "5%",
    marginRight: "auto",
    marginLeft: "auto",
    textAlign: "center"
  },

  certTitulo: {
    textAlign: "center",
    color: "rgb(255, 77, 166)",
    fontSize: 53,
    fontFamily: "sans-serif",
    marginBottom: 20
  },
  
  certTexto: {
    textAlign: "center",
    fontFamily: "sans-serif",
    fontSize: 22,
    marginBottom: 20
  },
  
  certFonoResp: {
    textAlign: "center",
    textDecorationLine: "underline",
    fontFamily: "sans-serif",
    fontSize: 22,
    marginBottom: 0
  },
  
  certAssinatura: {
    textAlign: "center",
    marginTop: 2,
    fontSize: 11,
    marginBottom: 10
  },
  
  certData: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    textDecorationLine: "underline",
    marginBottom: 0
  },
  
  certTextoData: {
    textAlign: "center",
    marginTop: 2,
    fontSize: 11
  }
});

// export default Certificado;