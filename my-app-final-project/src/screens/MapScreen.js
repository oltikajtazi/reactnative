import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Alert, Text, Platform } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { getAllReports } from '../services/reportService';
import { colors, categoryColors } from '../styles/colors';
import { commonStyles } from '../styles/commonStyles';

// Conditionally import MapView only for native platforms
let MapView, Marker;
if (Platform.OS !== 'web') {
  try {
    const Maps = require('react-native-maps');
    MapView = Maps.default;
    Marker = Maps.Marker;
  } catch (e) {
    console.log('Maps not available');
  }
}

const PRISHTINA_COORDINATES = {
  latitude: 42.6629,
  longitude: 21.1580,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

const MapScreen = ({ navigation }) => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mapRef, setMapRef] = useState(null);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      const allReports = await getAllReports();
      setReports(allReports);
    } catch (error) {
      Alert.alert('Error', 'Failed to load reports');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkerPress = (report) => {
    navigation.navigate('MapReportDetails', { reportId: report.id });
  };

  const getMarkerColor = (category) => {
    return categoryColors[category] || colors.primary;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'reported':
        return colors.reported;
      case 'in-progress':
        return colors.inProgress;
      case 'fixed':
        return colors.fixed;
      default:
        return colors.textSecondary;
    }
  };

  // Show web-specific view
  if (Platform.OS === 'web') {
    return (
      <View style={[commonStyles.container, commonStyles.centerContent]}>
        <MaterialCommunityIcons
          name="web-off"
          size={64}
          color={colors.textSecondary}
        />
        <Text style={[commonStyles.heading, { marginTop: 16, textAlign: 'center' }]}>
          Map View Not Available
        </Text>
        <Text style={[commonStyles.text, { textAlign: 'center', marginTop: 8 }]}>
          The interactive map is only available on mobile devices.{'\n'}
          Please use the app on iOS or Android to view the map.
        </Text>
        <View style={styles.webStatsContainer}>
          <Text style={styles.webStatsTitle}>Current Reports:</Text>
          {reports.length > 0 ? (
            reports.map(report => (
              <View key={report.id} style={styles.webReportItem}>
                <Text style={styles.webReportTitle}>{report.title}</Text>
                <Text style={styles.webReportLocation}>{report.location.address}</Text>
                <Text style={styles.webReportStatus}>{report.status}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.webNoReports}>No reports available</Text>
          )}
        </View>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={setMapRef}
        style={styles.map}
        initialRegion={PRISHTINA_COORDINATES}
      >
        {reports.map(report => (
          <Marker
            key={report.id}
            coordinate={{
              latitude: report.location.latitude,
              longitude: report.location.longitude,
            }}
            onPress={() => handleMarkerPress(report)}
            title={report.title}
            description={report.description}
            pinColor={getStatusColor(report.status)}
          >
            {/* Custom marker view with category icon */}
            <View style={[
              styles.markerContainer,
              { backgroundColor: getMarkerColor(report.category) }
            ]}>
              <MaterialCommunityIcons
                name="information"
                size={16}
                color={colors.surface}
              />
            </View>
          </Marker>
        ))}
      </MapView>

      {/* Legend */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View
            style={[styles.legendDot, { backgroundColor: colors.reported }]}
          />
          <View style={{ marginLeft: 8 }}>
            <Text style={styles.legendText}>Reported</Text>
          </View>
        </View>
        <View style={styles.legendItem}>
          <View
            style={[styles.legendDot, { backgroundColor: colors.inProgress }]}
          />
          <View style={{ marginLeft: 8 }}>
            <Text style={styles.legendText}>In Progress</Text>
          </View>
        </View>
        <View style={styles.legendItem}>
          <View
            style={[styles.legendDot, { backgroundColor: colors.fixed }]}
          />
          <View style={{ marginLeft: 8 }}>
            <Text style={styles.legendText}>Fixed</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

// const mapStyle = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#f5f5f5',
      },
    ],
  },
  {
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161',
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#f5f5f5',
      },
    ],
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#bdbdbd',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [
      {
        color: '#eeeeee',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: '#e5e5e5',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      {
        color: '#ffffff',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#dad8d8',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161',
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e',
      },
    ],
  },
  {
    featureType: 'transit.line',
    elementType: 'geometry',
    stylers: [
      {
        color: '#e5e5e5',
      },
    ],
  },
  {
    featureType: 'transit.station',
    elementType: 'geometry',
    stylers: [
      {
        color: '#eeeeee',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#c9c9c9',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e',
      },
    ],
  },
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    flex: 1,
  },
  markerContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.surface,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  legend: {
    position: 'absolute',
    bottom: 80,
    left: 16,
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: 12,
    color: colors.text,
    fontWeight: '500',
  },
  webStatsContainer: {
    marginTop: 32,
    padding: 16,
    backgroundColor: colors.surface,
    borderRadius: 8,
    width: '90%',
    maxWidth: 400,
  },
  webStatsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  webReportItem: {
    padding: 12,
    marginVertical: 4,
    backgroundColor: colors.background,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.border,
  },
  webReportTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  webReportLocation: {
    fontSize: 14,
    color: colors.primary,
    marginBottom: 2,
  },
  webReportStatus: {
    fontSize: 12,
    color: colors.textSecondary,
    textTransform: 'capitalize',
  },
  webNoReports: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    padding: 16,
  },
});

export default MapScreen;
