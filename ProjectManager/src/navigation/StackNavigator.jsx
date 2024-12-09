import React, {useEffect, useState} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import LoginScreen from '../screen/LoginScreen';
import ForgetPassScreen from '../screen/ForgetPassScreen';
import VerifyOtpScreen from '../screen/VerifyOtpScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AdminTabs from './tabNavigators/AdminTabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UpdateCompany from '../screen/AdminScreens/UpdateCompany';
import ViewCompany from '../screen/AdminScreens/ViewCompany';

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{headerShown: false}}
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

            <Stack.Screen
              name="AdminTabs"
              component={AdminTabs}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="UpdateCompany"
              component={UpdateCompany}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ViewCompany"
              component={ViewCompany}
              options={{headerShown: false}}
            />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
