import React, { useState } from 'react'
import { View, Button, TextInput, ScrollView, StyleSheet, ActivityIndicator } from 'react-native'
import firebase from '../database/firebase'

const CreateUserScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [inputValues, setInputValues] = useState({
    name: '',
    email: '',
    phone: ''
  })

  const handleChangeText = (name, value) => {
    setInputValues({ ...inputValues, [name]: value })
  }

  const saveNewUser = async () => {
    const { name, email, phone } = inputValues
    setIsLoading(true)
    try {
      await firebase.db.collection('users').add({
        name,
        email,
        phone
      })
      setIsLoading(false)
      navigation.navigate('UsersList')
    } catch (error) {
      console.log(error)
      alert(`error`)
      setIsLoading(false)
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Name user"
          onChangeText={(value) => handleChangeText('name', value)} 
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput 
          placeholder="Email user"
          onChangeText={(value) => handleChangeText('email', value)} 
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput 
          placeholder="Phone user"
          onChangeText={(value) => handleChangeText('phone', value)} 
        />
      </View>
      <View style={styles.inputGroup}>
        <Button title="Save User" onPress={saveNewUser} disabled={inputValues.name.length === 0} />
      </View>
      <ActivityIndicator color='#0000ff' size='large' animating={isLoading} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc'
  }
})

export default CreateUserScreen
