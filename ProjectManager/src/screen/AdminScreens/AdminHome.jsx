import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const AdminHome = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Hey this is your bap</Text>
      <TouchableOpacity onPress={()=>navigation.navigate('UpdateCompany')} style={{
        padding:20,
        backgroundColor:'blue'
      }}>
        <Text>Click to navigate</Text>
      </TouchableOpacity>
    </View>
  )
}

export default AdminHome

const styles = StyleSheet.create({})