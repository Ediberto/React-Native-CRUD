import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './Login'; //Supondo que este seja o seu componente Login
import Menu from './Menu'; //Supondo que este seja o seu componente Menu
import Cadastro from './Cadastro'; //Supondo que este seja o seu componente Cadastro
import Lista from './Lista'; //Supondo que este seja o seu componente Lista

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Lista" component={Lista} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;
