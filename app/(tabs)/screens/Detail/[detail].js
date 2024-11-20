import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { DatabaseList } from '../../../../data/data';
import { useLocalSearchParams } from 'expo-router';

const DetailScreen = () => {
  const { name } = useLocalSearchParams(); // Retrieve the parameter from the route
  const selectedItem = DatabaseList.find((item) => item.name === name);

  if (!selectedItem) {
    // Handle case where the item is not found
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Item not found!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: selectedItem.icon }} style={styles.itemIcon} />
      <Text style={styles.itemName}>{selectedItem.name}</Text>
      <Text style={styles.itemDescription}>{selectedItem.desc}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  itemIcon: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginBottom: 16,
  },
  itemName: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  itemDescription: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
  errorText: {
    fontSize: 20,
    color: 'red',
    textAlign: 'center',
  },
});

export default DetailScreen;
