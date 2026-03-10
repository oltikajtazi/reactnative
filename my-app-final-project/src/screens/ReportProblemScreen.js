import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
  TextInput,
} from 'react-native';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { addReport } from '../services/reportService';
import { colors } from '../styles/colors';
import { commonStyles } from '../styles/commonStyles';

const CATEGORIES = [
  'Trash',
  'Pothole',
  'Broken Light',
  'Sidewalk Damage',
  'Water Leak',
  'Other',
];

const ReportProblemScreen = ({ navigation }) => {
  const [category, setCategory] = useState('Trash');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);

  // Request permissions on component mount
  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    try {
      // Request camera permissions
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      // Request location permissions
      const locationStatus = await Location.requestForegroundPermissionsAsync();

      if (locationStatus.status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required to submit reports');
      }
    } catch (error) {
      console.error('Error requesting permissions:', error);
    }
  };

  const getCurrentLocation = async () => {
    try {
      setLocationLoading(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required');
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const coords = currentLocation.coords;
      
      // Try to get address from coordinates
      let address = 'Prishtina, Kosovo';
      try {
        const reverseGeocode = await Location.reverseGeocodeAsync({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });

        if (reverseGeocode.length > 0) {
          const locationData = reverseGeocode[0];
          address = `${locationData.street || ''} ${locationData.city || 'Prishtina'}`.trim();
        }
      } catch (error) {
        console.log('Could not get address from coordinates');
      }

      setLocation({
        latitude: coords.latitude,
        longitude: coords.longitude,
        address,
      });

      Alert.alert('Success', `Location captured: ${address}`);
    } catch (error) {
      Alert.alert('Error', 'Failed to get location');
    } finally {
      setLocationLoading(false);
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.7,
      });

      if (!result.canceled) {
        setPhoto(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const takePhoto = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.7,
      });

      if (!result.canceled) {
        setPhoto(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to take photo');
    }
  };

  const validateForm = () => {
    if (!description.trim()) {
      Alert.alert('Validation Error', 'Please enter a description');
      return false;
    }

    if (!location) {
      Alert.alert('Validation Error', 'Please capture your location');
      return false;
    }

    if (description.trim().length < 10) {
      Alert.alert('Validation Error', 'Description must be at least 10 characters');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      const newReport = {
        title: `${category} at ${location.address}`,
        category,
        description,
        location,
        photo,
      };

      await addReport(newReport);

      Alert.alert(
        'Success',
        'Your report has been submitted successfully!',
        [
          {
            text: 'OK',
            onPress: () => {
              setCategory('Trash');
              setDescription('');
              setLocation(null);
              setPhoto(null);
              navigation.navigate('Home');
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to submit report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={commonStyles.container}
      contentContainerStyle={commonStyles.screenContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Category */}
      <Text style={commonStyles.inputLabel}>Problem Category *</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={category}
          onValueChange={setCategory}
          style={styles.picker}
          dropdownIconColor={colors.primary}
        >
          {CATEGORIES.map(cat => (
            <Picker.Item key={cat} label={cat} value={cat} />
          ))}
        </Picker>
      </View>

      {/* Photo */}
      <Text style={commonStyles.inputLabel}>Photo</Text>
      {photo ? (
        <View style={styles.photoContainer}>
          <Image source={{ uri: photo }} style={styles.photo} />
          <TouchableOpacity
            style={styles.removePhotoButton}
            onPress={() => setPhoto(null)}
          >
            <MaterialCommunityIcons name="close" size={20} color={colors.error} />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.photoButtonsContainer}>
          <TouchableOpacity
            style={[commonStyles.button, styles.halfButton]}
            onPress={takePhoto}
          >
            <MaterialCommunityIcons name="camera" size={20} color={colors.surface} />
            <Text style={commonStyles.buttonText}>Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[commonStyles.button, styles.halfButton, { marginLeft: 8 }]}
            onPress={pickImage}
          >
            <MaterialCommunityIcons name="image" size={20} color={colors.surface} />
            <Text style={commonStyles.buttonText}>Pick Photo</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Description */}
      <Text style={commonStyles.inputLabel}>Description *</Text>
      <TextInput
        style={[commonStyles.input, styles.descriptionTextInput]}
        placeholder="Describe the problem in detail..."
        placeholderTextColor={colors.textSecondary}
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={5}
        textAlignVertical="top"
      />
      {description.length > 0 && (
        <Text style={styles.charCount}>
          {description.length} characters
        </Text>
      )}

      {/* Location */}
      <Text style={commonStyles.inputLabel}>Location *</Text>
      {location ? (
        <View style={[commonStyles.card, styles.locationCard]}>
          <View style={commonStyles.row}>
            <MaterialCommunityIcons
              name="map-marker"
              size={24}
              color={colors.primary}
            />
            <View style={styles.locationInfo}>
              <Text style={styles.locationAddress}>{location.address}</Text>
              <Text style={styles.locationCoords}>
                {location.latitude.toFixed(4)}° N, {location.longitude.toFixed(4)}° E
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => setLocation(null)}
            style={styles.changeLocationButton}
          >
            <Text style={styles.changeLocationText}>Change</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={[commonStyles.button, styles.locationButton]}
          onPress={getCurrentLocation}
          disabled={locationLoading}
        >
          {locationLoading ? (
            <ActivityIndicator size="small" color={colors.surface} />
          ) : (
            <>
              <MaterialCommunityIcons
                name="crosshairs-gps"
                size={20}
                color={colors.surface}
              />
              <Text style={commonStyles.buttonText}>Capture Location</Text>
            </>
          )}
        </TouchableOpacity>
      )}

      {/* Submit Button */}
      <TouchableOpacity
        style={[commonStyles.button, styles.submitButton]}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color={colors.surface} />
        ) : (
          <>
            <MaterialCommunityIcons
              name="check-circle"
              size={20}
              color={colors.surface}
            />
            <Text style={commonStyles.buttonText}>Submit Report</Text>
          </>
        )}
      </TouchableOpacity>

      <Text style={styles.helpText}>* Required fields</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    marginVertical: 8,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    color: colors.text,
  },
  photoButtonsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginVertical: 8,
  },
  halfButton: {
    flex: 1,
    flexDirection: 'row',
    gap: 8,
  },
  photoContainer: {
    position: 'relative',
    marginVertical: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },
  photo: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  removePhotoButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
  },
  descriptionTextInput: {
    minHeight: 100,
    paddingTop: 12,
  },
  charCount: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  locationCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationInfo: {
    flex: 1,
    marginLeft: 12,
  },
  locationAddress: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  locationCoords: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  changeLocationButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  changeLocationText: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 12,
  },
  locationButton: {
    flexDirection: 'row',
    gap: 8,
    marginVertical: 8,
  },
  submitButton: {
    flexDirection: 'row',
    gap: 8,
    marginVertical: 24,
    height: 56,
    backgroundColor: colors.success,
  },
  helpText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 12,
    textAlign: 'center',
  },
});

export default ReportProblemScreen;
