import React, { useState } from 'react';
import { View, Button, StyleSheet, Text, Image } from 'react-native';

const Menu = ({ navigation }) => {
    const handleCadastro = () => {
        navigation.navigate('Cadastro'); // Navigate to Cadastro screen
    };
    
    const handleListas = () => {
      navigation.navigate('Lista'); // Navigate to Lista screen
    };
    
    return (
      <View style={[styles.container, { backgroundColor: 'lightblue' }]}>
        {/* Exibindo a imagem no canto superior esquerdo */}
        <Image
            style={styles.imagem}
            source={require('./imagem/LogoFlamengo.png')}
            resizeMode="contain"
        />
        <Text style={[styles.label1, { marginBottom: 20, textAlign: 'center' }]}>
          SISTEMA DE CONTROLE DOS TORCEDORES DO FLAMENGO
        </Text>
        {/* marginBottom: 50, DISTANCIA ENTRA O label1 abaixo e o primeiro botão */}
        <Text style={[styles.label2, { marginBottom: 50, textAlign: 'center' }]}>
          ESCOLHA UMA DAS OPÇÕES ABAIXO
        </Text>
         
        {/* Ajuste da flexibilidade da posição dos botões */}
        <View style={styles.buttonSpacing}>
            <Button title="Cadastro de Jogadores" onPress={handleCadastro} />
        </View>
        
        <View style={styles.buttonSpacing}>
            <Button title="Cadastro de Listas" onPress={handleListas} />
        </View>
      </View>
    );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    label1: {
      color: 'blue',
      fontSize: 20,
      fontFamily: 'Arial',
      fontWeight: 'bold',
      marginBottom: 5,
    },
    label2: {
      color: 'blue',
      fontSize: 20,
      fontFamily: 'Arial',
      fontWeight: 'bold',
      marginBottom: 5,
    },
    imagem: { //EXIBINDO NA PARTE SUPERIOR ESQUERDA DA TELA
      width: 100,  // Largura da imagem
      height: 100, // Altura da imagem
      position: 'absolute',
      top: 10,  // Distância do topo
      left: 10, // Distância da esquerda
    },
    buttonSpacing: {
      width: '30%',  // Definir a largura dos botões
      marginTop: 20, // Espaço vertical entre os botões.
      marginBottom: 30, // Diminuir o espaçamento vertical entre os botões
      alignSelf: 'center', // Centralizar os botões na tela
    },
});

export default Menu;


