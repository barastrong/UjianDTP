import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useRouter } from 'expo-router';
import Home from './screens/RegisterScreen';
import {Link} from "expo-router"; 

// Mencegah Splash Screen otomatis menghilang
SplashScreen.preventAutoHideAsync();

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const loadApp = async () => {
      // Menampilkan splash screen selama 4 detik
      await new Promise(resolve => setTimeout(resolve, 4000));

      // Setelah 5 detik, sembunyikan Splash Screen
      await SplashScreen.hideAsync();

      // Navigasi ke tab pertama setelah Splash Screen selesai
      console.log("Navigating to Home Screen...");
      router.push('./screens/LoginScreen');
          };

    loadApp();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../images/Icon.png')} style={styles.logo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});