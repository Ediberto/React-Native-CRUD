import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === 'ediberto' && password === '123') {
      navigation.navigate('Menu'); // Navigate to Cadastro screen
      //LIMPANDO OS CAMPOS DE ENTRADAS DE DADOS
      setUsername('');
      setPassword('');
    } else {
      alert('Usuário e/ou Senha inválidos');
    }
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

      {/* Input Container */}
      <View style={styles.inputContainer1}>
        <View style={styles.inputGroup}>
          <Text style={styles.labelusuario}>Usuário </Text>
          <TextInput
            // AJUSTE DO TAMANHO DA LARGURA DO TEXTINPUT
            style={[styles.input, { width: 200, textAlign: 'center' }]}
            value={username}
            onChangeText={setUsername}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label2}>Senha</Text>
          <TextInput
            // AJUSTE DO TAMANHO DA LARGURA DO TEXTINPUT
            style={[styles.input, { width: 150, textAlign: 'center' }]}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {/* Adicionando a Imagem  CENTRALIZADA ANTES DO BOTÃO*/}
        {/*
        <Image
          style={styles.imagem}
          source={require('./imagem/LogoFlamengo.png')}
          resizeMode="contain"
        />
        */}
      </View>

      {/* Flexibilidade da posição do botão */}
      <View style={styles.ButtonContainer}>
        <Button title="Logar no sistema" onPress={handleLogin} />
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
  labelusuario: {
    marginTop: 100,
    color: 'blue',
    fontSize: 18,
    fontFamily: 'Arial',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  label2: {
    color: 'blue',
    fontSize: 18,
    fontFamily: 'Arial',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  inputContainer1: {
    alignItems: 'center',
    marginBottom: 10,
  },
  inputGroup: {
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 18,
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
    textAlign: 'left',
    marginBottom: 10,
  },
  /*imagem: { //EXIBINDO CENTRALIDADO ANTES DO BOTÃO
    width: 200,  // Defina a largura da imagem
    height: 200, // Defina a altura da imagem
    marginBottom: 20, // Espaço entre a imagem e o botão
  },*/
  imagem: { //EXIBINDO NA PARTE SUPERIOR ESQUERDA DA TELA
    width: 100,  // Largura da imagem
    height: 100, // Altura da imagem
    position: 'absolute',
    top: 10,  // Distância do topo
    left: 10, // Distância da esquerda
  },
  ButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});

export default Login;

