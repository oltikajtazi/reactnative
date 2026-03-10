import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Share,
  Linking,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { getReportById, updateReportStatus } from '../services/reportService';
import { colors, categoryColors } from '../styles/colors';
import { commonStyles } from '../styles/commonStyles';

const ReportDetailsScreen = ({ route }) => {
  const { reportId } = route.params;
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReport();
  }, [reportId]);

  const loadReport = async () => {
    try {
      const data = await getReportById(reportId);
      setReport(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to load report details');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
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

  const getStatusLabel = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ');
  };

  const handleStatusChange = async (newStatus) => {
    try {
      await updateReportStatus(reportId, newStatus);
      setReport({ ...report, status: newStatus });
      Alert.alert('Success', `Status updated to: ${getStatusLabel(newStatus)}`);
    } catch (error) {
      Alert.alert('Error', 'Failed to update status');
    }
  };

  const handleOpenMap = () => {
    if (!report) return;
    const url = `https://www.google.com/maps/search/?api=1&query=${report.location.latitude},${report.location.longitude}`;
    Linking.openURL(url);
  };

  const handleShare = async () => {
    if (!report) return;
    try {
      await Share.share({
        message: `I reported a ${report.category} problem at ${report.location.address}. ${report.description}`,
        title: report.title,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share report');
    }
  };

  if (loading) {
    return (
      <View style={[commonStyles.container, commonStyles.centerContent]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!report) {
    return (
      <View style={[commonStyles.container, commonStyles.centerContent]}>
        <Text style={commonStyles.text}>Report not found</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={commonStyles.container}
      contentContainerStyle={commonStyles.screenContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Photo */}
      {report.photo ? (
        <Image
          source={{ uri: report.photo }}
          style={styles.fullPhoto}
        />
      ) : (
        <View style={[styles.fullPhoto, styles.photoPlaceholder]}>
          <MaterialCommunityIcons
            name="image-off"
            size={64}
            color={colors.textSecondary}
          />
        </View>
      )}

      {/* Title */}
      <Text style={[commonStyles.heading, { marginBottom: 8 }]}>
        {report.title}
      </Text>

      {/* Category Badge */}
      <View
        style={[
          commonStyles.badge,
          {
            backgroundColor: categoryColors[report.category] || colors.primary,
          },
          styles.categoryBadge,
        ]}
      >
        <Text style={commonStyles.badgeText}>{report.category}</Text>
      </View>

      {/* Status Card */}
      <View style={[commonStyles.card, styles.statusCard]}>
        <View style={commonStyles.row}>
          <MaterialCommunityIcons
            name="check-circle"
            size={24}
            color={getStatusColor(report.status)}
          />
          <View style={{ marginLeft: 12, flex: 1 }}>
            <Text style={styles.cardLabel}>Status</Text>
            <Text
              style={[
                styles.cardValue,
                { color: getStatusColor(report.status) },
              ]}
            >
              {getStatusLabel(report.status)}
            </Text>
          </View>
        </View>
      </View>

      {/* Status Update Buttons */}
      <Text style={commonStyles.inputLabel}>Update Status</Text>
      <View style={styles.statusButtonsContainer}>
        <TouchableOpacity
          style={[
            styles.statusButton,
            report.status === 'reported' && styles.statusButtonActive,
          ]}
          onPress={() => handleStatusChange('reported')}
        >
          <Text
            style={[
              styles.statusButtonText,
              report.status === 'reported' && styles.statusButtonTextActive,
            ]}
          >
            Reported
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.statusButton,
            report.status === 'in-progress' && styles.statusButtonActive,
          ]}
          onPress={() => handleStatusChange('in-progress')}
        >
          <Text
            style={[
              styles.statusButtonText,
              report.status === 'in-progress' && styles.statusButtonTextActive,
            ]}
          >
            In Progress
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.statusButton,
            report.status === 'fixed' && styles.statusButtonActive,
          ]}
          onPress={() => handleStatusChange('fixed')}
        >
          <Text
            style={[
              styles.statusButtonText,
              report.status === 'fixed' && styles.statusButtonTextActive,
            ]}
          >
            Fixed
          </Text>
        </TouchableOpacity>
      </View>

      {/* Description */}
      <Text style={commonStyles.inputLabel}>Description</Text>
      <View style={[commonStyles.card, styles.descriptionCard]}>
        <Text style={styles.descriptionText}>{report.description}</Text>
      </View>

      {/* Location Card */}
      <Text style={commonStyles.inputLabel}>Location</Text>
      <View style={[commonStyles.card, styles.locationCard]}>
        <View style={commonStyles.row}>
          <MaterialCommunityIcons
            name="map-marker"
            size={24}
            color={colors.primary}
          />
          <View style={styles.locationInfo}>
            <Text style={styles.locationAddress}>{report.location.address}</Text>
            <Text style={styles.locationCoords}>
              {report.location.latitude.toFixed(4)}° N
            </Text>
            <Text style={styles.locationCoords}>
              {report.location.longitude.toFixed(4)}° E
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.mapButton}
          onPress={handleOpenMap}
        >
          <MaterialCommunityIcons
            name="open-in-new"
            size={16}
            color={colors.primary}
          />
          <Text style={styles.mapButtonText}>View on Map</Text>
        </TouchableOpacity>
      </View>

      {/* Date and Engagement */}
      <View style={commonStyles.row}>
        <View style={styles.detailBox}>
          <MaterialCommunityIcons
            name="calendar"
            size={20}
            color={colors.primary}
          />
          <Text style={styles.detailBoxTitle}>Date Reported</Text>
          <Text style={styles.detailBoxValue}>{formatDate(report.date)}</Text>
        </View>

        <View style={styles.detailBox}>
          <MaterialCommunityIcons
            name="thumb-up"
            size={20}
            color={colors.primary}
          />
          <Text style={styles.detailBoxTitle}>Confirmations</Text>
          <Text style={styles.detailBoxValue}>{report.upvotes}</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[commonStyles.secondaryButton, { flex: 1 }]}
          onPress={handleShare}
        >
          <MaterialCommunityIcons
            name="share-variant"
            size={18}
            color={colors.primary}
          />
          <Text style={commonStyles.secondaryButtonText}>Share</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.helpText}>
        Report ID: {report.id}
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  fullPhoto: {
    width: '100%',
    height: 240,
    borderRadius: 12,
    marginBottom: 16,
  },
  photoPlaceholder: {
    backgroundColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryBadge: {
    marginBottom: 12,
  },
  statusCard: {
    marginBottom: 16,
  },
  cardLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  cardValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  statusButtonsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  statusButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  statusButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  statusButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
  },
  statusButtonTextActive: {
    color: colors.surface,
  },
  descriptionCard: {
    marginBottom: 16,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.text,
  },
  locationCard: {
    marginBottom: 16,
  },
  locationInfo: {
    marginLeft: 12,
    flex: 1,
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
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 12,
    paddingVertical: 8,
  },
  mapButtonText: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 12,
  },
  detailBox: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginBottom: 16,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  detailBoxTitle: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 4,
    marginBottom: 2,
  },
  detailBoxValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
    marginVertical: 16,
  },
  helpText: {
    fontSize: 11,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 12,
  },
});

export default ReportDetailsScreen;
