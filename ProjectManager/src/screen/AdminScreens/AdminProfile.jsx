import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const AdminProfile = () => {
  const navigation = useNavigation();
  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('UserRole');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
};
  return (
    <SafeAreaView
      style={{
        height: '100%',
        backgroundColor: 'white',
      }}>
      <ScrollView>
        <Pressable
          onPress={handleLogout}
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 50,
            backgroundColor: 'gray',
          }}>
          <Text>Logout</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AdminProfile;

const styles = StyleSheet.create({});
