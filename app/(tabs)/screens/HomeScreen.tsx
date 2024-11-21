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

  // Function to search within a specific dataset
  const searchDatabase = (query, data) => {
    if (!query) return data;
    return data.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
  };

  // Filter the displayed DatabaseList based on selected category and search query
  const filteredDatabaseList = searchDatabase(
    searchQuery,
    selectedCategoryId
      ? DatabaseList.filter((item) => item.categoryId === selectedCategoryId)
      : DatabaseList
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
      <Text
        style={[
          styles.itemText,
          selectedCategoryId === item.id && styles.selectedCategoryText,
        ]}
      >
        {item.name}
      </Text>
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
          <ScrollView>
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />

      <Text style={styles.title}>Welcome to HomeScreen</Text>
        <FlatList
          horizontal
          data={CategoryList}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryListContainer}
        />
        {/* Database List */}
        <FlatList
          data={filteredDatabaseList}
          renderItem={renderDatabaseItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.flatListContainer}
          numColumns={2}
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
    backgroundColor: '#F8F9FA',
    padding: 10,
  },
  searchInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CED4DA',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007BFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  categoryListContainer: {
    paddingHorizontal: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  itemContainer: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  selectedCategory: {
    backgroundColor: '#007BFF',
  },
  itemText: {
    fontSize: 14,
    color: '#343A40',
    textAlign: 'center',
  },
  selectedCategoryText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  flatListContainer: {
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    paddingTop: 10,
  },
  itemDatabaseContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 2 },
  },
  itemIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 16,
    color: '#6C757D',
    textAlign: 'center',
    marginTop: 20,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#CED4DA',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -2 },
    elevation: 5,
  },
  iconContainer: {
    alignItems: 'center',
  },
  iconText: {
    fontSize: 12,
    color: '#343A40',
    marginTop: 5,
  },
  linkContainer: {
    flex: 1,
    margin: 5,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
});

export default HomeScreen;
