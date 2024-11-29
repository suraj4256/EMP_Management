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
  import React, {useState} from 'react';
  import {useNavigation} from '@react-navigation/native';
  import loginImage from '../assets/login_image.jpg'
  
  const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const navigation = useNavigation();
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
          <View style={{
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: 300, 
            marginTop:50
          }}>
            <Image 
             style={{
              width: '95%', 
              height: '100%', 
            }}
            source={loginImage}
            resizeMode='contain'
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
              value={Password}
              placeholder="Enter your Password"
            />
          </View>
          </ScrollView>
        </KeyboardAvoidingView>
       
         <TouchableOpacity
          // onPress={handleLogin}
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
  