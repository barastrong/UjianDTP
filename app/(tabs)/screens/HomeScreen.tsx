import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { CategoryList, DatabaseList } from '../../../data/data';
import { Link, useRouter } from 'expo-router';  // Importing useRouter
import Icon from 'react-native-vector-icons/FontAwesome'; // Importing icons

const HomeScreen = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter(); // Initialize the router

  // Function to filter database based on query
  const searchDatabase = (query, data) => {
    if (!query) return data; // If no query, return the full list
    const result = data.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    return result;
  };

  // Filter database list based on selected category
  const categoryFilteredDatabaseList = selectedCategoryId
    ? DatabaseList.filter((item) => item.categoryId === selectedCategoryId)
    : DatabaseList;

  // Apply search filter
  const filteredDatabaseList = searchDatabase(searchQuery, categoryFilteredDatabaseList);

  // Render a single category item
  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.itemContainer,
        selectedCategoryId === item.id && styles.selectedCategory,
      ]}
      onPress={() =>
        setSelectedCategoryId((prev) => (prev === item.id ? null : item.id))
      }
      accessibilityLabel={`Select category ${item.name}`}
    >
      <Text style={styles.itemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  // Render a single database item
  const renderDatabaseItem = ({ item }) => (
    <Link
      href={{
        pathname: `./Detail/[detail]`,
        params: { name: item.name },
      }}
      style={styles.linkContainer}
      accessibilityLabel={`View details for ${item.name}`}
    >
      <View style={styles.itemDatabaseContainer}>
        <Image source={{ uri: item.icon }} style={styles.itemIcon} />
        <Text style={styles.itemText}>{item.name}</Text>
      </View>
    </Link>
  );

  return (
    <View style={styles.container}>
      {/* Search Input */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        value={searchQuery}
        onChangeText={(text) => {
          setSearchQuery(text);
        }}
      />

      <Text style={styles.title}>Welcome to HomeScreen</Text>

      {/* Category List */}
      <FlatList
        horizontal
        data={CategoryList}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContainer}
      />

      {/* Database List */}
      <FlatList
        data={filteredDatabaseList}
        renderItem={renderDatabaseItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.flatListContainer}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No items found.</Text>
        }
      />

      {/* Bottom Bar with Home and Profile Icons */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.iconContainer}
          onPress={()=> router.push('./HomeScreen')}
        >
          <Icon name="home" size={30} color="#007BFF" />
          <Text style={styles.iconText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => router.push('./ProfileScreen')}  // Navigate to ProfileScreen
        >
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
    backgroundColor: '#ffffff',
    padding: 16,
    justifyContent: 'space-between', // To ensure content is spaced out with the bottom bar
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 16,
    textAlign: 'center',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  itemContainer: {
    marginRight: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 115,
    padding: 6,
  },
  selectedCategory: {
    backgroundColor: '#007BFF',
  },
  itemDatabaseContainer: {
    alignItems: 'center',
    marginVertical: 8,
  },
  itemText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  itemIcon: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginBottom: 8,
  },
  linkContainer: {
    marginVertical: 8,
    alignItems: 'center',
  },
  flatListContainer: {
    paddingVertical: 8,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#f0f0f0',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
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

export default HomeScreen;
