import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import UsersList from './screens/UsersList'
import CreateUserScreen from './screens/CreateUserScreen'
import UserDetailScreen from './screens/UserDetailScreen'

const { Navigator, Screen } = createStackNavigator() // createStackNavigator es una función que devuelve un objeto que contiene 2 propiedades: Screen y Navigator. Ambos son componentes de React utilizados para configurar el navigator. dentro del Navigator definimos cada vista con Screen

// Las vistas navegan en el orden de los Screen (o tabs)
function MyStack () {
  return (
    <Navigator>
      <Screen name="CreateUserScreen" component={CreateUserScreen} />
      <Screen name="UsersList" component={UsersList} />
      <Screen name="UserDetailScreen" component={UserDetailScreen} />
    </Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
