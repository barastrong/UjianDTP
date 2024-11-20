import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome';

const ProfileScreen = () => {
  const [user, setUser] = useState(null); // Data pengguna dari Firebase Auth
  const [userData, setUserData] = useState(null); // Data tambahan dari Firestore
  const [loading, setLoading] = useState(true); // Status loading
  const [error, setError] = useState(null); // Status error
  const router = useRouter(); // Navigasi

  useEffect(() => {
    // Memeriksa status login pengguna
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Simpan data pengguna dari Firebase Auth
        try {
          console.log("Current User UID:", currentUser.uid); // Debugging UID pengguna

          // Ambil data tambahan dari Firestore
          const userRef = doc(db, 'users', currentUser.uid); // Pastikan 'users' adalah nama koleksi Anda
          const userDoc = await getDoc(userRef);

          if (userDoc.exists()) {
            console.log("User data fetched from Firestore:", userDoc.data()); // Debugging data Firestore
            setUserData(userDoc.data()); // Simpan data dari Firestore
          } else {
            console.error("No such user data found in Firestore!");
            setError('User data not found in Firestore');
          }
        } catch (err) {
          console.error("Error fetching user data:", err);
          setError('Failed to fetch user data');
        }
      } else {
        console.log("User not logged in, redirecting to login screen.");
        router.push('/screens/LoginScreen'); // Navigasi ke login jika belum login
      }
      setLoading(false); // Akhiri status loading
    });

    return () => unsubscribe(); // Cleanup
  }, [router]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {user && userData ? (
        <>
          <Text style={styles.profileLabel}>Name:</Text>
          <Text style={styles.profileValue}>{userData.name || 'No Name'}</Text>
          <Text style={styles.profileLabel}>Email:</Text>
          <Text style={styles.profileValue}>{user.email}</Text>
          <Text style={styles.profileLabel}>Password:</Text>
          <Text style={styles.profileValue}>
            {userData.password || 'No Password Available'}
          </Text>
        </>
      ) : (
        <Text style={styles.errorText}>No user data available</Text>
      )}

      {/* Bottom Bar dengan Home dan Profile Icons */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => router.push('/screens/HomeScreen')}
        >
          <Icon name="home" size={30} color="#007BFF" />
          <Text style={styles.iconText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer}>
          <Icon name="user" size={30} color="#007BFF" />
          <Text style={styles.iconText}>Profile</Text>
        </TouchableOpacity>
      </View>
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
  profileLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
  },
  profileValue: {
    fontSize: 16,
    color: '#555',
    marginBottom: 12,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#f0f0f0',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    width: '100%',
    marginTop: 20,
  },
  iconContainer: {
    alignItems: 'center',
  },
  iconText: {
    fontSize: 12,
    color: '#333',
    marginTop: 4,
  },
});

export default ProfileScreen;
