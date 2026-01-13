import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import citiesData from '../data/cities.json';

class CitiesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { cities: [] };
  }

  componentDidMount() {
    this.setState({ cities: citiesData || [] });
  }

  renderItem = ({ item }) => {
    const { name, contryCode, population, description } = item || {};
    return (
      <View style={styles.card}>
        <Text style={styles.cityName}>{name || '—'}</Text>
        <Text style={styles.population}>Contry Code: {contryCode || '—'}</Text>
        <Text style={styles.description} numberOfLines={3} ellipsizeMode="tail">
          {description || ''}
        </Text>
        <Text style={styles.smallText}>Pop: {population ? Number(population).toLocaleString() : '—'}</Text>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.h1}>Cities</Text>

        <FlatList
          data={this.state.cities}
          keyExtractor={(item, index) => (item && item.id ? item.id.toString() : index.toString())}
          renderItem={this.renderItem}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
}

export default CitiesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#071028',
  },
  h1: {
    color: '#E6EEF3',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
  },
  list: {
    paddingBottom: 40,
    paddingTop: 6,
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    marginBottom: 14,
    marginHorizontal: 6,
    borderRadius: 14,
    padding: 16,
    minHeight: 100,
    backgroundColor: 'rgba(255,255,255,0.02)',

    // Depth for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.32,
    shadowRadius: 6,
    // Elevation for Android
    elevation: 6,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#7c5cff',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    marginBottom: 8,
  },
  badgeText: {
    color: '#fff',
    fontWeight: '700',
  },
  cityName: {
    color: '#E6EEF3',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  population: {
    color: '#9aa6b2',
    fontSize: 12,
  },
  description: {
    color: '#9aa6b2',
    fontSize: 13,
    lineHeight: 18,
  },
  smallText: {
    color: '#9aa6b2',
    fontSize: 12,
  },
});