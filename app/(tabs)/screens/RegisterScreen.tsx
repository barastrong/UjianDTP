import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebaseConfig'; // Import Firestore instance
import { useRouter } from 'expo-router'; // Import useRouter from expo-router

const RegisterScreen = () => {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    if (!nama || !email || !password) {
      setError('All fields are required.');
      return;
    }

    try {
      // Save registration data to Firestore
      await addDoc(collection(db, 'users'), {
        name: nama,
        email: email,
        password: password,
      });

      // Navigate to HomeScreen after successful registration
      router.push('./HomeScreen');
    } catch (error) {
      setError('Failed to register: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={nama}
        onChangeText={setNama}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Button title="Register" onPress={handleRegister} />
      <Text>
      Already have an Acoount?
      <Text style={{ color: '#007bff' }} onPress={() => router.push('./LoginScreen')}>
        Login
        </Text>
    </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  error: {
    color: 'red',
    marginBottom: 12,
    textAlign: 'center',
  },
});

export default RegisterScreen;
