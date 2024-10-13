import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, TextInput, Button, StatusBar, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Lista = () => {
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [newValue, setNewValue] = useState('');

  // Função para salvar a lista de frutas no AsyncStorage
  const saveDataToStorage = async (newData) => {
    try {
      await AsyncStorage.setItem('fruitsList', JSON.stringify(newData));
    } catch (e) {
      console.error('Erro ao salvar a lista no AsyncStorage', e);
    }
  };
  // Função para carregar os dados salvos no AsyncStorage
  const loadDataFromStorage = async () => {
    try {
      const storedData = await AsyncStorage.getItem('fruitsList');
      if (storedData !== null) {
        setData(JSON.parse(storedData));
      }
    } catch (e) {
      console.error('Erro ao carregar a lista do AsyncStorage', e);
    }
  };

  // Carregar dados do AsyncStorage ao iniciar o componente
  useEffect(() => {
    loadDataFromStorage();
  }, []);

  const handleAddItem = () => {
    if (inputValue.trim()) {
      const newItem = {
        id: (data.length + 1).toString().padStart(2, '0'),
        title: inputValue,
      };
      const updatedData = [...data, newItem];
      setData(updatedData);
      setInputValue('');
      // Salvar a lista atualizada no AsyncStorage
      saveDataToStorage(updatedData);
    } else {
      alert('Por favor, digite o nome de uma fruta.');
    }
  };

  const handleRemoveItemByName = () => {
    const updatedData = data.filter(item => item.title.toLowerCase() !== inputValue.trim().toLowerCase());

    if (updatedData.length === data.length) {
      alert('Fruta não encontrada na lista.');
      //Alert.alert('Erro', 'Fruta não encontrada na lista.');
    } else {
      setData(updatedData);
      saveDataToStorage(updatedData);
      setInputValue(''); // Limpar o campo após a exclusão
    }
  };
  const handleEditItemByName = () => {
    const index = data.findIndex(item => item.title.toLowerCase() === inputValue.trim().toLowerCase());
    if (index === -1) {
      alert('Fruta a ser alterada não existe na lista.');
      //Alert.alert('Erro', 'Fruta a ser alterada não existe na lista.');
    } else {
      const updatedData = [...data];
      updatedData[index].title = newValue;  // Alterar o nome da fruta para o novo valor
      setData(updatedData);
      saveDataToStorage(updatedData);
      setInputValue(''); // Limpar o campo de entrada
      setNewValue(''); // Limpar o campo de novo nome
      //Alert.alert('Sucesso', 'Fruta alterada com sucesso!');
      alert('Fruta alterada com sucesso!!!');
    }
  };

  const handleFindItemByName = () => {
    const index = data.findIndex(item => item.title.toLowerCase() === inputValue.trim().toLowerCase());
    if (index === -1) {
      alert('Fruta não existe na lista!!!');
      //Alert.alert('Erro', 'Fruta não existe na lista.');
      setNewValue(''); // Limpar o campo de novo nome se não encontrado
    } else {
      setNewValue(data[index].title); // Preencher o campo de novo nome com o nome encontrado
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>LISTA DE FRUTAS - FlatList - Prof. Ediberto</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />

      {/* Adiciona o label antes do campo de entrada */}
      <Text style={styles.label}>Informe o nome da fruta para alterar/excluir:</Text>
      <TextInput
        style={[styles.input, { width: 220, textAlign: 'center' }]}
        value={inputValue}
        onChangeText={setInputValue}
      />

      {/* Campo para o novo nome da fruta */}
      <Text style={styles.label}>Novo nome da fruta:</Text>
      <TextInput
        style={[styles.input, { width: 220, textAlign: 'center' }]}
        value={newValue}
        onChangeText={setNewValue}
      />

      {/* Botões Adicionar, Excluir, Alterar e Encontrar */}
      <View style={styles.buttonContainer}>
        <Button title="Adicionar Fruta" onPress={handleAddItem} />
        <View style={styles.buttonSpacing} />
        <Button title="Excluir Fruta" onPress={handleRemoveItemByName} />
        <View style={styles.buttonSpacing} />
        <Button title="Alterar Fruta" onPress={handleEditItemByName} />
        <View style={styles.buttonSpacing} />
        <Button title="Buscar Fruta" onPress={handleFindItemByName} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: StatusBar.currentHeight || 0,
    padding: 16,
  },
  listContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    width: 220,
    alignItems: 'center',
  },
  titulo: {
    fontSize: 40,
    backgroundColor: "#fff",
    textAlign: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
  },
  label: {
    color: 'blue',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  input: {
    height: 40,
    fontSize: 18,
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
    marginBottom: 10,
    paddingHorizontal: 8,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonSpacing: {
    width: 10,
  },
});

export default Lista;
