import React, { useEffect, useState } from 'react'
import { ScrollView, Button, ActivityIndicator, Text } from 'react-native'
import firebase from '../database/firebase'
import { ListItem } from 'react-native-elements'

const UsersList = ({ navigation: { navigate } }) => {
          
  const [isLoading, setIsLoading] = useState(true)
  const [users, setUsers] = useState([])

  useEffect(() => {
    firebase.db.collection('users').onSnapshot((querySnapshot) => {
      let usersDocs = []
      querySnapshot.docs.forEach((doc) => {
        usersDocs.push({ ...doc.data(), id: doc.id })
      })
      setUsers(usersDocs)
      setIsLoading(false)
    })
  }, [])

  return (
    <ScrollView>
      <Button title="Create User" onPress={() => navigate('CreateUserScreen') }>
        UsersList
      </Button>
      <ActivityIndicator color='#0000ff' size='large' animating={isLoading} />
      {
        users.length === 0 && (
          <Text>No users available, create one</Text>
        )
      }
      {
        users.map((user) => {
          return (
            <ListItem 
              key={user.id}
              onPress={() => navigate('UserDetailScreen', {
                userId: user.id
              })}
              bottomDivider
            >
              <ListItem.Chevron  />
              <ListItem.Content>
                <ListItem.Title>{user.name}</ListItem.Title>
                <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          )
        })
      }
    </ScrollView>
  )
}

export default UsersList
