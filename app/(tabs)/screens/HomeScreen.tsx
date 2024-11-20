import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { CategoryList, DatabaseList } from '../../../data/data';
import { Link, useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome';

const HomeScreen = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const searchDatabase = (query, data) => {
    if (!query) return data;
    return data.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
  };

  const categoryFilteredDatabaseList = selectedCategoryId
    ? DatabaseList.filter((item) => item.categoryId === selectedCategoryId)
    : DatabaseList;

  const filteredDatabaseList = searchDatabase(
    searchQuery,
    categoryFilteredDatabaseList
  );

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.itemContainer,
        selectedCategoryId === item.id && styles.selectedCategory,
      ]}
      onPress={() =>
        setSelectedCategoryId((prev) => (prev === item.id ? null : item.id))
      }
    >
      <Text style={styles.itemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderDatabaseItem = ({ item }) => (
    <Link
      href={{
        pathname: `./Detail/[detail]`,
        params: { name: item.name },
      }}
      style={styles.linkContainer}
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
        onChangeText={(text) => setSearchQuery(text)}
      />

      <Text style={styles.title}>Welcome to HomeScreen</Text>

      {/* ScrollView for better content visibility */}
      <ScrollView>
        {/* Category List */}
        <FlatList
          horizontal
          data={CategoryList}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryListContainer} // Center the categories
        />

        {/* Database List */}
        <FlatList
          data={filteredDatabaseList}
          renderItem={renderDatabaseItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.flatListContainer} // Adjusted style for spacing
          numColumns={2} // Display items in grid format
          ListEmptyComponent={
            <Text style={styles.emptyText}>No items found.</Text>
          }
        />
      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => router.push('./HomeScreen')}
        >
          <Icon name="home" size={30} color="#007BFF" />
          <Text style={styles.iconText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => router.push('./ProfileScreen')}
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
    backgroundColor: '#f9f9f9',
    padding: 16,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    backgroundColor: '#ffffff',
  },
  categoryListContainer: {
    justifyContent: 'center', // Center horizontally
    alignItems: 'center',
    flexGrow: 1,
  },
  itemContainer: {
    marginRight: 10,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 120,
    padding: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  selectedCategory: {
    backgroundColor: '#007BFF',
    borderWidth: 1,
    borderColor: '#0056b3',
  },
  itemDatabaseContainer: {
    flex: 1,
    alignItems: 'center',
    margin: 8,
  },
  itemText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    fontWeight: '500',
  },
  itemIcon: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginBottom: 8,
  },
  linkContainer: {
    flex: 1,
    alignItems: 'center',
    margin: 8,
  },
  flatListContainer: {
    paddingBottom: 16,
    marginTop: 20,
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
