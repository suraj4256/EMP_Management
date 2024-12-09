import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AdminHome from '../../screen/AdminScreens/AdminHome';
import AdminProfile from '../../screen/AdminScreens/AdminProfile';

const AdminTabs = () => {
 const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
    <Tab.Screen
      name="Home"
      component={AdminHome}
      options={{
        tabBarActiveTintColor: 'black',
        headerShown:false,
      }}
    />
     <Tab.Screen
      name="Profile"
      component={AdminProfile}
      options={{
        tabBarActiveTintColor: 'black',
        headerShown:false,
      }}
    />
  </Tab.Navigator>
  )
}

export default AdminTabs

const styles = StyleSheet.create({})