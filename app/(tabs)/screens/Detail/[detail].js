import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { DatabaseList } from '../../../../data/data';
import { useLocalSearchParams, useRouter } from 'expo-router';

const DetailScreen = () => {
  const router = useRouter();
  const { name } = useLocalSearchParams(); // Retrieve the parameter from the route
  const selectedItem = DatabaseList.find((item) => item.name === name);

  if (!selectedItem) {
    // Handle case where the item is not found
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Item not found!</Text>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.push('../HomeScreen')}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image 
        source={{ uri: selectedItem.icon }} 
        style={styles.itemIcon} 
        resizeMode="contain"
      />
      <Text style={styles.itemName}>{selectedItem.name}</Text>
      <Text style={styles.itemDescription}>{selectedItem.desc}</Text>
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => router.push('../HomeScreen')}
      >
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  errorContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  itemIcon: {
    width: 200,
    height: 200,
    borderRadius: 15,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemName: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
  itemDescription: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 26,
    paddingHorizontal: 16,
  },
  errorText: {
    fontSize: 22,
    color: '#D32F2F',
    textAlign: 'center',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  backButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default DetailScreen;