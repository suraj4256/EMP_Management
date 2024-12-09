import {
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import loginImage from '../assets/login_image.jpg';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const userRole = await AsyncStorage.getItem('UserRole');
        const userToken = await AsyncStorage.getItem('token');
        if (userRole === 'Admin' && userToken) {
          navigation.navigate('AdminTabs');
        }
      } catch (error) {
        console.error('Error fetching user role from AsyncStorage:', error);
      }
    };

    fetchRole();
  }, []);

  const handleLogin = async () => {
    const user = {
      email: email,
      password: password,
    };
    console.log('Func running');
    try {
      const response = await axios.post(
        'http://192.168.29.164:5000/api/auth/login',
        user,
      );
      if (response.data) {
        console.log(response.data.token);
        await AsyncStorage.setItem('token', response.data.token);
        await AsyncStorage.setItem('UserRole', response.data.userRole);
        setEmail('');
        setPassword('');
        if (response.data.userRole === 'Admin') {
          navigation.replace('AdminTabs');
        } else {
          console.log('Role not recognized or redirect logic for other roles');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: 'white',
        alignItems: 'center',
      }}>
      <KeyboardAvoidingView
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 30,
          backgroundColor: 'white',
        }}>
        <ScrollView>
          <View
            style={{
              backgroundColor: 'white',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: 300,
              marginTop: 50,
            }}>
            <Image
              style={{
                width: '95%',
                height: '100%',
              }}
              source={loginImage}
              resizeMode="contain"
            />
          </View>
          <View style={{marginTop: 50}}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 5,
                backgroundColor: '#D0D0D0',
                paddingVertical: 5,
                borderRadius: 5,
                marginTop: 10,
                padding: 10,
                borderRadius: 10,
              }}>
              <TextInput
                style={{
                  marginVertical: 10,
                  width: 320,
                }}
                onChangeText={setEmail}
                value={email}
                placeholder="Enter your email id"
              />
            </View>
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              backgroundColor: '#D0D0D0',
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 10,
              padding: 10,
              borderRadius: 10,
            }}>
            <TextInput
              style={{
                marginVertical: 10,
                width: 320,
              }}
              secureTextEntry={true}
              onChangeText={setPassword}
              value={password}
              placeholder="Enter your Password"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <TouchableOpacity
        onPress={handleLogin}
        style={{
          backgroundColor: 'black',
          marginTop: 50,
          padding: 20,
          width: 280,
          borderRadius: 20,
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: 'white',
          }}>
          Login
        </Text>
      </TouchableOpacity>
      <View
        style={{
          marginTop: 10,
        }}>
        <Text
          style={{
            fontSize: 15,
          }}>
          Trouble logging in?{' '}
          <Text
            onPress={() => navigation.navigate('ForgetPassword')}
            style={{color: '#007FFF', fontWeight: '500'}}>
            Forgot Password
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
