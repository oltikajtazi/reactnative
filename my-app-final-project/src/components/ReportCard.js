import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, categoryColors } from '../styles/colors';
import { commonStyles } from '../styles/commonStyles';

const { width } = Dimensions.get('window');

const ReportCard = ({ report, onPress, onUpvote }) => {
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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'reported':
        return 'alert-circle';
      case 'in-progress':
        return 'progress-clock';
      case 'fixed':
        return 'check-circle';
      default:
        return 'information';
    }
  };

  const getStatusLabel = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <TouchableOpacity
      style={[commonStyles.card, styles.cardContainer]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.cardContent}>
        {/* Image placeholder or actual image */}
        <View style={styles.imageContainer}>
          {report.photo ? (
            <Image source={{ uri: report.photo }} style={styles.image} />
          ) : (
            <View style={[styles.image, styles.imagePlaceholder]}>
              <MaterialCommunityIcons
                name="image-off"
                size={32}
                color={colors.textSecondary}
              />
            </View>
          )}
        </View>

        <View style={styles.infoContainer}>
          {/* Category badge */}
          <View
            style={[
              commonStyles.badge,
              {
                backgroundColor: categoryColors[report.category] || colors.primary,
              },
            ]}
          >
            <Text style={commonStyles.badgeText}>{report.category}</Text>
          </View>

          {/* Title */}
          <Text style={styles.title} numberOfLines={2}>
            {report.title}
          </Text>

          {/* Description */}
          <Text style={styles.description} numberOfLines={1}>
            {report.description}
          </Text>

          {/* Location and details row */}
          <View style={styles.detailsRow}>
            <View style={styles.detailItem}>
              <MaterialCommunityIcons
                name="map-marker"
                size={14}
                color={colors.primary}
              />
              <Text style={styles.detailText} numberOfLines={1}>
                {report.location.address}
              </Text>
            </View>
            <Text style={styles.dateText}>{formatDate(report.date)}</Text>
          </View>

          {/* Status and upvotes row */}
          <View style={styles.footerRow}>
            <View
              style={[
                styles.statusBadge,
                { backgroundColor: getStatusColor(report.status) },
              ]}
            >
              <MaterialCommunityIcons
                name={getStatusIcon(report.status)}
                size={12}
                color={colors.surface}
              />
              <Text style={styles.statusText}>
                {getStatusLabel(report.status)}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.upvoteButton}
              onPress={onUpvote}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <MaterialCommunityIcons
                name="thumb-up-outline"
                size={14}
                color={colors.primary}
              />
              <Text style={styles.upvoteText}>{report.upvotes}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 0,
    marginVertical: 8,
  },
  cardContent: {
    flexDirection: 'row',
    gap: 12,
  },
  imageContainer: {
    marginRight: 8,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  imagePlaceholder: {
    backgroundColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginTop: 4,
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 6,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flex: 1,
  },
  detailText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
    flex: 1,
  },
  dateText: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    gap: 4,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.surface,
  },
  upvoteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  upvoteText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },
});

export default ReportCard;
