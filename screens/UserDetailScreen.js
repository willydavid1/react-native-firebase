import React, { useEffect, useState } from 'react'
import { ScrollView, View, TextInput, Button, StyleSheet, ActivityIndicator, Alert } from 'react-native'
import firebase from '../database/firebase'

const UserDetailtScreen = ({ route: { params: { userId = null } }, navigation }) => {
  const initialState = {
    id: '',
    name: '',
    email: '',
    phone: ''
  }
  
  const [isLoading, setIsLoading] = useState(true)
  const [dataUser, setDataUser] = useState(initialState)

  const getUserById = async (id) => {
    const dbRef = firebase.db.collection('users').doc(id)
    const doc = await dbRef.get()
    const user = doc.data()
    setDataUser({
      ...user,
      id: doc.id
    })
    setIsLoading(false)
  }

  useEffect(() => {
    getUserById(userId)
  }, [])

  const deleteUser = async () => {
    setIsLoading(true)
    const dbRef = firebase.db.collection('users').doc(userId)
    await dbRef.delete()
    setIsLoading(false)
    navigation.navigate('UsersList')
  }

  const updateUser = async () => {
    setIsLoading(true)
    const userRef = firebase.db.collection("users").doc(userId)
    await userRef.set({
      name: dataUser.name,
      email: dataUser.email,
      phone: dataUser.phone,
    })
    setDataUser(initialState)
    setIsLoading(false)
    navigation.navigate('UsersList')
  }

  const openConfirmationAlert = () => {
    Alert.alert('Remove The User', 'Are you sure?', [
      { text: 'No', onPress: () => console.log('cancel') },
      { text: 'Yes', onPress: deleteUser }
    ])
  }

  const handleChangeText = (name, value) => {
    setDataUser({ ...dataUser, [name]: value })
  }
  if (isLoading) {
    return (
      <View>
        <ActivityIndicator color='#0000ff' size='large' animating />
      </View>
    )
  }
  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput
          maxLength={40}
          placeholder="Name user"
          value={dataUser.name}
          onChangeText={(value) => handleChangeText('name', value)} 
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput 
          maxLength={40}
          placeholder="Email user"
          value={dataUser.email}
          onChangeText={(value) => handleChangeText('email', value)} 
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput 
          maxLength={40}
          placeholder="Phone user"
          value={dataUser.phone}
          onChangeText={(value) => handleChangeText('phone', value)} 
        />
      </View>
      <View style={styles.inputGroup}>
        <Button color="#00BB2D" title="Update User" onPress={updateUser} />
      </View>
      <View style={styles.inputGroup}>
        <Button color="#FF0000" title="Delete User" onPress={openConfirmationAlert} />
      </View>
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

export default UserDetailtScreen
