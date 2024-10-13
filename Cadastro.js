import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Image, FlatList, ScrollView } from 'react-native';
import axios from 'axios'; // Adicionado para fazer requisições HTTP

const Cadastro = ({ navigation }) => {
    const [usermat, setUsermat] = useState('');
    const [username, setUsername] = useState('');
    const [torcedores, setTorcedores] = useState([]); // Estado para armazenar a lista de torcedores
    const [scrollEnabled, setScrollEnabled] = useState(true); // Estado para controlar o scroll da lista

    // Função para listar todos os torcedores
    const handleListarTodos = async () => {
        try {
            //IP DE MINHA CASA
            //response = await axios.get('http://192.168.0.125:3000/listarTodos'); // Supondo que essa seja a função para listar todos os torcedores
            //IP DA UNESA NITEROI
            const response = await axios.get('http://172.16.13.65:3000/listarTodos'); // Supondo que essa seja a função para listar todos os torcedores
            setTorcedores(response.data); // Atualiza o estado com a lista de torcedores
        } catch (error) {
            alert('Erro ao listar os torcedores.');
            console.error(error);
        }
    };
    // Função INCLUIR o torcedor na tabela do banco de dados
    const handleGravar = async () => {
        if (!usermat.trim() || !username.trim()) {
            alert('Por favor, preencha ambos os campos: Matrícula e Nome.');
            return;
        }
        try {
            //IP DE MINHA CASA
            //const response = await axios.post('http://192.168.0.125:3000/gravar', {
            //IP DA UNESA NITEROI
            const response = await axios.post('http://172.16.13.65:3000/gravar', {     
                usermat,
                username
            });
            alert(response.data.message);
            console.log('Resposta ao gravar:', response.data);
            handleListarTodos(); // Atualiza a lista após gravar
        } catch (error) {
            if (error.response) {
                alert(`Erro ao gravar os dados: ${error.response.data.message || error.response.status}`);
                console.error('Erro da resposta do servidor:', error.response.data);
            } else if (error.request) {
                alert('Erro ao gravar os dados: sem resposta do servidor.');
                console.error('Erro na requisição:', error.request);
            } else {
                alert(`Erro: ${error.message}`);
                console.error('Erro na configuração da requisição:', error.message);
            }
        }
    };
    // Função para consultar o torcedor com base na matrícula
    const handleConsulta = async () => {
        if (!usermat.trim()) {
            alert('Por favor, insira uma matrícula para consultar.');
            return;
        }
        try {
            //IP DE MINHA CASA
            //const response = await axios.get(`http://192.168.0.125:3000/consultar/${usermat}`);
            //IP DA UNESA NITEROI
            const response = await axios.get(`http://172.16.13.65:3000/consultar/${usermat}`);
            setUsername(response.data.username);  // Atualiza o nome baseado no retorno
            console.log('Resposta da consulta:', response.data);
            //alert('Consulta realizada com sucesso.');
        } catch (error) {
            if (error.response) {
                alert(`Erro ao consultar os dados: ${error.response.data.message || error.response.status}`);
                console.error('Erro da resposta do servidor:', error.response.data);
            } else if (error.request) {
                alert('Erro ao consultar os dados: sem resposta do servidor.');
                console.error('Erro na requisição:', error.request);
            } else {
                alert(`Erro: ${error.message}`);
                console.error('Erro na configuração da requisição:', error.message);
            }
        }
    };
    // Função para alterar o nome do torcedor com base na matrícula
    const handleAlterar = async () => {
        if (!usermat.trim() || !username.trim()) {
            alert('Por favor, preencha ambos os campos: Matrícula e Nome.');
            return;
        }
        try {
            //IP DE MINHA CASA
            //const response = await axios.put(`http://192.168.0.125:3000/alterar/${usermat}`, {
            //IP DA UNESA NITEROI
            const response = await axios.put(`http://172.16.13.65:3000/alterar/${usermat}`, { 
                username
            });
            alert(response.data.message);
            console.log('Resposta ao alterar:', response.data);
            handleListarTodos(); // Atualiza a lista após gravar
        } catch (error) {
            if (error.response) {
                alert(`Erro ao alterar os dados: ${error.response.data.message || error.response.status}`);
                console.error('Erro da resposta do servidor:', error.response.data);
            } else if (error.request) {
                alert('Erro ao alterar os dados: sem resposta do servidor.');
                console.error('Erro na requisição:', error.request);
            } else {
                alert(`Erro: ${error.message}`);
                console.error('Erro na configuração da requisição:', error.message);
            }
        }
    };
    // Função para excluir o torcedor com base na matrícula
    const handleExcluir = async () => {
        if (!usermat.trim()) {
            alert('Por favor, insira uma matrícula para excluir.');
            return;
        }
        try {
            //IP DE MINHA CASA
            //const response = await axios.delete(`http://192.168.0.125:3000/excluir/${usermat}`);
            //IP DA UNESA NITEROI
            const response = await axios.delete(`http://172.16.13.65:3000/excluir/${usermat}`); 
            alert(response.data.message);
            console.log('Resposta ao excluir:', response.data);
            handleListarTodos(); // Atualiza a lista após gravar
        } catch (error) {
            if (error.response) {
                alert(`Erro ao excluir os dados: ${error.response.data.message || error.response.status}`);
                console.error('Erro da resposta do servidor:', error.response.data);
            } else if (error.request) {
                alert('Erro ao excluir os dados: sem resposta do servidor.');
                console.error('Erro na requisição:', error.request);
            } else {
                alert(`Erro: ${error.message}`);
                console.error('Erro na configuração da requisição:', error.message);
            }
        }
    };
    // Função para limpar os campos de entrada de dados
    const handleLimparCampos = () => {
        setUsermat('');  // Limpa o campo de matrícula
        setUsername(''); // Limpa o campo de nome
    };
    return (
        <View style={[styles.container, { backgroundColor: 'lightblue' }]}>
            <Image
                style={styles.imagem}
                source={require('./imagem/LogoFlamengo.png')}
                resizeMode="contain"
            />
            <Text style={[styles.label1, { marginBottom: 20, textAlign: 'center' }]}>
                SISTEMA DE CONTROLE DOS TORCEDORES DO FLAMENGO
            </Text>
            <View style={[styles.inputContainer1, { marginTop: 85 }]}>
                <View style={styles.inputGroup}>
                    <Text style={styles.label2}>Matrícula: </Text>
                    <TextInput
                        style={[styles.input, { width: 100 }]}
                        value={usermat}
                        onChangeText={setUsermat}
                    />
                </View>
                <View style={[styles.inputGroup, { marginLeft: 20 }]}>
                    <Text style={styles.label2}>Nome: </Text>
                    <TextInput
                        style={[styles.input, { width: 400 }]}
                        value={username}
                        onChangeText={setUsername}
                    />
                </View>
            </View>

            {/* Os Botões */}
            <View style={[styles.ButtonContainer, { flexDirection: 'row', alignItems: 'flex-start' }]}>
                <Button title="Gravar" onPress={handleGravar} />
                <View style={{ width: 30 }} />
                <Button title="Consulta" onPress={handleConsulta} color="blue" />
                <View style={{ width: 30 }} />
                <Button title="Alterar" onPress={handleAlterar} color="orange" />
                <View style={{ width: 30 }} />
                <Button title="Excluir" onPress={handleExcluir} color="red" />
                <View style={{ width: 30 }} />
                <Button title="Listar Todos" onPress={handleListarTodos} color="green" /> {/* Botão para listar todos */}
                <View style={{ width: 30 }} />
                {/* Botão para limpar campos com cor magenta */}
                <Button title="Limpar Campos" onPress={handleLimparCampos} color="magenta" />
            </View>

            {/* Exibição da lista de torcedores */}
            {torcedores.length > 0 && (
                <View style={[styles.listContainer, { width: 400, alignSelf: 'center' }]}>
                 <Text style={[styles.listTitle, { textAlign: 'center' }]}>Lista de Torcedores:</Text>
                <FlatList
                    data={torcedores}
                    keyExtractor={(item) => item.matricula}
                    renderItem={({ item }) => (
                        <View style={styles.listItem}>
                            <Text style={styles.listText}>Matrícula: {item.matricula}</Text>
                            <Text style={styles.listText}>Nome: {item.nome}</Text>
                        </View>
                    )}
                    scrollEnabled={scrollEnabled} // Controla se o scroll está ativado ou não
                    style={{
                        maxHeight: 500, // Define a altura máxima da lista
                        width: '100%', // A FlatList vai ocupar toda a largura do contêiner pai (listContainer)
                        backgroundColor: 'yellow', // Define o fundo amarelo
                    }}
                />
            </View>
            
            )}
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
        fontSize: 18,
        fontFamily: 'Arial',
        fontWeight: 'bold',
        marginBottom: 5,
    },
    inputContainer1: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    inputGroup: {
        flexDirection: 'row',
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
    imagem: {
        width: 100,
        height: 100,
        position: 'absolute',
        top: 10,
        left: 10,
    },
    ButtonContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 40,
    },
    listContainer: {
        marginTop: 20,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        borderColor: '#ccc',
        borderWidth: 1,
    },
    listTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'blue',
    },
    listItem: {
        marginBottom: 5,
        padding: 5,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    listText: {
        fontSize: 16,
        color: 'black',
    },
});

export default Cadastro;
