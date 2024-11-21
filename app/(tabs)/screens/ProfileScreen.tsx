import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons'; // Make sure to install @expo/vector-icons

const ProfileScreen = () => {
  const router = useRouter();

  // Mock user data - replace with actual user data from your authentication system
  const userData = {
    name: "John Doe",
    email: "johndoe@example.com",
    avatar: "../images/Icon,png", // Replace with actual avatar URL
    bio: "Passionate developer exploring new technologies and creating amazing apps.",
    stats: {
      followers: 1234,
      following: 567,
      posts: 42
    }
  };

  const profileMenuItems = [
    { 
      icon: "settings", 
      title: "Account Settings",  
    },
    { 
      icon: "bell", 
      title: "Notifications", 
    },
    { 
      icon: "lock", 
      title: "Privacy", 
    },
    { 
      icon: "help-circle", 
      title: "Help & Support", 
    },
    { 
      icon: "log-out", 
      title: "Logout", 
      onPress: () => {
        // Add logout logic here
        router.push('./LoginScreen');
      }
    }
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.push('./HomeScreen')}
        >
          <Feather name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <View style={styles.profileSection}>
        <Image 
          source={{ uri: userData.avatar }} 
          style={styles.avatar} 
          resizeMode="cover"
        />
        <Text style={styles.name}>{userData.name}</Text>
        <Text style={styles.email}>{userData.email}</Text>
        <Text style={styles.bio}>{userData.bio}</Text>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{userData.stats.followers}</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{userData.stats.following}</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{userData.stats.posts}</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
        </View>
      </View>

      <View style={styles.menuContainer}>
        {profileMenuItems.map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.menuItem} 
            onPress={item.onPress}
          >
            <Feather name={item.icon} size={24} color="#666" />
            <Text style={styles.menuItemText}>{item.title}</Text>
            <Feather name="chevron-right" size={24} color="#999" />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  profileSection: {
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 24,
    marginBottom: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#007AFF',
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
  },
  bio: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 24,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  menuContainer: {
    backgroundColor: 'white',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemText: {
    flex: 1,
    marginLeft: 16,
    fontSize: 16,
    color: '#333',
  },
});

export default ProfileScreen;