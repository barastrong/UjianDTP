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
      <View style={styles.cardContainer}>
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
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  cardContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E5E5E5',
    padding: 16,
  },
  itemIcon: {
    width: 250,
    height: 250,
    borderRadius: 25,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  itemName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#2C3E50',
  },
  itemDescription: {
    fontSize: 16,
    color: '#34495E',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
    paddingHorizontal: 8,
  },
  errorText: {
    fontSize: 20,
    color: '#E74C3C',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '600',
  },
  backButton: {
    backgroundColor: '#3498DB',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});

export default DetailScreen;