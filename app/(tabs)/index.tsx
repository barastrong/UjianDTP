import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useRouter } from 'expo-router';

// Mencegah Splash Screen otomatis menghilang
SplashScreen.preventAutoHideAsync();

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const loadApp = async () => {
      try {
        // Menampilkan splash screen selama 4 detik
        await new Promise(resolve => setTimeout(resolve, 4000));

        // Sembunyikan Splash Screen setelah durasi selesai
        await SplashScreen.hideAsync();

        // Navigasi ke LoginScreen
        router.push('./screens/LoginScreen'); // Pastikan path sesuai dengan struktur file Anda
      } catch (error) {
        console.error("Error during splash screen handling:", error);
      }
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
  },
});
