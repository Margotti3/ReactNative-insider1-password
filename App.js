import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Logo from './src/assets/logo.png'

import Slider from '@react-native-community/slider'
import Clipboard from 'expo-clipboard'

const charset = 'abcdefghijklmnopqrstuvwxyzABCDEGHIJKLMNOPQRSTUVWXYZ0123456789';

export default function App() {
  const [password, setPassword] = useState('');
  const [size, setSize] = useState(10);
  const [passwordWasCopy, setPasswordWasCopy] = useState(false);

  function generatePassword() {
    let passwordAux = '';
    for(let i = 0, n = charset.length; i < size; i++) {
      passwordAux += charset.charAt(Math.floor(Math.random() * n));
    }

    setPassword(passwordAux);
    setPasswordWasCopy(false);
  }

  function copyPassword() {
    Clipboard.setString(password);
    setPasswordWasCopy(true);
  }

  return (
    <View style={styles.container}>
      <Image
        source={Logo}
        style={styles.logo}
      />

      <Text style={styles.title}>{size} caracteres</Text>

      <View style={styles.area}>
        <Slider
          style={{ height: 50 }}
          minimumValue={5}
          maximumValue={15}
          minimumTrackTintColor="#FF0000"
          maximumTrackTintColor="#000"
          value={size}
          onValueChange={(value) => setSize(value.toFixed(0))}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={generatePassword}>
        <Text style={styles.buttonText}>
          Gerar senha
        </Text>
      </TouchableOpacity>

      {password !== '' ? (
        <>
          <View style={styles.area}>
            <Text style={styles.password} onLongPress={copyPassword}>
              {password}
            </Text>
          </View>
          {passwordWasCopy && (
            <Text style={styles.copy}>Mesangem copiada!</Text>
          )}
        </>
      ) : (
        <View style={{ height: 40, marginVertical: 15 }} />
      )}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f3f3',
  },
  logo: {
    marginBottom: 60,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  area: {
    marginVertical: 15,
    backgroundColor: '#fff',
    width: '80%',
    borderRadius: 7,
  },
  button: {
    backgroundColor: '#FFA200',
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    marginBottom: 25,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold'
  },
  password: {
    padding: 10,
    textAlign: 'center',
    fontSize: 20,
  },
  copy: {
    fontSize: 10,
    color: '#30AA30'
  }
});