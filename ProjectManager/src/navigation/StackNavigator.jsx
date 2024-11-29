import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../screen/HomeScreen';
import LoginScreen from '../screen/LoginScreen';
import ForgetPassScreen from '../screen/ForgetPassScreen';
import VerifyOtpScreen from '../screen/VerifyOtpScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  const BottomTabs = () => {
    
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarActiveTintColor: 'black',
          }}
        />
      </Tab.Navigator>
    );
  };

  const AuthStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name="ForgetPassword"
          component={ForgetPassScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="verifyOtp"
          component={VerifyOtpScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    );
  };

  const MainStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={BottomTabs}
          options={(headerShown = false)}
        />
      </Stack.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});