import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFocusEffect } from '@react-navigation/native';
import ReportCard from '../components/ReportCard';
import { getAllReports, upvoteReport } from '../services/reportService';
import { colors } from '../styles/colors';
import { commonStyles } from '../styles/commonStyles';

const HomeScreen = ({ navigation }) => {
  const [reports, setReports] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const loadReports = useCallback(async () => {
    try {
      const allReports = await getAllReports();
      setReports(allReports.sort((a, b) => new Date(b.date) - new Date(a.date)));
    } catch (error) {
      Alert.alert('Error', 'Failed to load reports');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadReports();
  }, [loadReports]);

  useFocusEffect(
    useCallback(() => {
      loadReports();
    }, [loadReports])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadReports();
  }, [loadReports]);

  const handleUpvote = async (reportId) => {
    try {
      await upvoteReport(reportId);
      loadReports();
    } catch (error) {
      Alert.alert('Error', 'Failed to upvote report');
    }
  };

  const handleReportPress = (report) => {
    navigation.navigate('ReportDetails', { reportId: report.id });
  };

  const getFilteredReports = () => {
    if (selectedFilter === 'all') {
      return reports;
    }
    return reports.filter(report => report.status === selectedFilter);
  };

  const filteredReports = getFilteredReports();

  const filterButtons = [
    { id: 'all', label: 'All', icon: 'view-list' },
    { id: 'reported', label: 'Reported', icon: 'alert-circle' },
    { id: 'in-progress', label: 'In Progress', icon: 'progress-clock' },
    { id: 'fixed', label: 'Fixed', icon: 'check-circle' },
  ];

  return (
    <View style={commonStyles.container}>
      {/* Filter bar */}
      <View style={styles.filterBar}>
        <FlatList
          data={filterButtons}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.filterButton,
                selectedFilter === item.id && styles.filterButtonActive,
              ]}
              onPress={() => setSelectedFilter(item.id)}
            >
              <MaterialCommunityIcons
                name={item.icon}
                size={16}
                color={selectedFilter === item.id ? colors.surface : colors.primary}
              />
              <Text
                style={[
                  styles.filterButtonText,
                  selectedFilter === item.id && styles.filterButtonTextActive,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.filterContent}
        />
      </View>

      {/* Reports list */}
      <FlatList
        data={filteredReports}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ReportCard
            report={item}
            onPress={() => handleReportPress(item)}
            onUpvote={() => handleUpvote(item.id)}
          />
        )}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
          />
        }
        ListEmptyComponent={
          <View style={commonStyles.centerContent}>
            <MaterialCommunityIcons
              name="inbox-multiple"
              size={64}
              color={colors.border}
            />
            <Text style={styles.emptyText}>No reports found</Text>
          </View>
        }
      />

      {/* Stats footer */}
      <View style={styles.statsFooter}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{reports.length}</Text>
          <Text style={styles.statLabel}>Total Reports</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>
            {reports.filter(r => r.status === 'fixed').length}
          </Text>
          <Text style={styles.statLabel}>Fixed</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>
            {reports.filter(r => r.status === 'in-progress').length}
          </Text>
          <Text style={styles.statLabel}>In Progress</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  filterBar: {
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingVertical: 8,
  },
  filterContent: {
    paddingHorizontal: 12,
    gap: 8,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 4,
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },
  filterButtonTextActive: {
    color: colors.surface,
  },
  listContent: {
    padding: 12,
    paddingBottom: 80,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 12,
  },
  statsFooter: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.surface,
  },
  statLabel: {
    fontSize: 11,
    color: colors.surface,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
});

export default HomeScreen;
