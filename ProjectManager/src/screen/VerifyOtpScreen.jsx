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
  import {useNavigation} from '@react-navigation/native';
import OtpInputs from 'react-native-otp-inputs';
import OtpScreenImage from '../assets/otp_image.jpg'
  
  const VerifyOtpScreen = () => {
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
        source={OtpScreenImage}
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
              width: '100%',
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 30,
              }}>
              Verify OTP
            </Text>
            <Text>You will get an OTP via email</Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 10,
              padding: 10,
              borderRadius: 10,
            }}>
            <OtpInputs
            handleChange={(e)=>console.log(e)}
            numberOfInputs={6}
            inputStyles={{
              width: 50, 
              height: 50, 
              backgroundColor: '#D0D0D0', 
              borderRadius: 10,
              textAlign: 'center', 
              fontSize: 18, 
              borderWidth: 2,
              borderColor: '#007FFF', 
            }}
            />
          </View>
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate('verifyOtp')}
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
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap:10,
            marginTop: 20,
          }}>
          <Text style={{
            color:'#D3D3D3'
          }}>Didn't receive the verification OTP?</Text>
          <Pressable>
            <Text style={{
              color: '#007FFF', fontWeight: '500'
            }}>Resend again</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  };
  
  export default VerifyOtpScreen;
  
  const styles = StyleSheet.create({});
  