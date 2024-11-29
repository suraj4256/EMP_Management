import {
  Image,
    KeyboardAvoidingView,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
  } from 'react-native';
  import React, {useState} from 'react';
  import { useNavigation } from '@react-navigation/native';
  import ForgetScreenImage from '../assets/forget_pass_image.jpg'
  
  const ForgotPassScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
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
            <View style={{
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: 200, 
            marginTop:50}}>
        <Image 
         style={{
          width: '95%', 
          height: '100%', 
        }}
        source={ForgetScreenImage}
        resizeMode='contain'
        />
     
            </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 10,
              marginTop: 20,
              width:'100%'
            }}>
            <Text style={{
              fontWeight:'bold',
              fontSize:30
            }}>Forgot Your Password?</Text>
            <Text>
              Enter your email address to get instructions to reset your password
            </Text>
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
                width: 340,
              }}
              value={email}
              onChangeText={setEmail}
              placeholder="Email address"
            />
          </View>
          <View>
            <TouchableOpacity
              onPress={()=> navigation.navigate('verifyOtp')}
              style={{
                backgroundColor: 'black',
                marginTop: 10,
                padding: 23,
                width: 360,
                borderRadius: 10,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: 'white',
                }}>
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
        <Pressable onPress={()=> navigation.navigate('Login')} style={{
          display:'flex',
          flexDirection:'row',
          marginTop:20
        }}><Text>
          Back To Platform
          </Text></Pressable>
      </SafeAreaView>
    );
  };
  
  export default ForgotPassScreen;
  
  const styles = StyleSheet.create({});
  