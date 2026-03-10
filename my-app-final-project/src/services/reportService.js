import AsyncStorage from '@react-native-async-storage/async-storage';

const REPORTS_KEY = 'prishtina_reports';

// Sample data for initial state
const initialReports = [
  {
    id: '1',
    title: 'Trash accumulation on Nene Tereza Street',
    category: 'Trash',
    description: 'Large amount of garbage not collected for days',
    location: { latitude: 42.6629, longitude: 21.1580, address: 'Nene Tereza St' },
    photo: null,
    status: 'reported',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    upvotes: 5,
  },
  {
    id: '2',
    title: 'Pothole on Mother Teresa Boulevard',
    category: 'Pothole',
    description: 'Large pothole causing traffic issues',
    location: { latitude: 42.6644, longitude: 21.1590, address: 'Mother Teresa Blvd' },
    photo: null,
    status: 'in-progress',
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    upvotes: 12,
  },
  {
    id: '3',
    title: 'Broken street light on Skanderbeg Street',
    category: 'Broken Light',
    description: 'Street light not functioning, creating safety hazard',
    location: { latitude: 42.6618, longitude: 21.1560, address: 'Skanderbeg St' },
    photo: null,
    status: 'fixed',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    upvotes: 8,
  },
];

// Initialize storage with sample data
export const initializeReports = async () => {
  try {
    const existing = await AsyncStorage.getItem(REPORTS_KEY);
    if (!existing) {
      await AsyncStorage.setItem(REPORTS_KEY, JSON.stringify(initialReports));
    }
  } catch (error) {
    console.error('Error initializing reports:', error);
  }
};

// Get all reports
export const getAllReports = async () => {
  try {
    const data = await AsyncStorage.getItem(REPORTS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting reports:', error);
    return [];
  }
};

// Get single report by ID
export const getReportById = async (id) => {
  try {
    const reports = await getAllReports();
    return reports.find(report => report.id === id);
  } catch (error) {
    console.error('Error getting report:', error);
    return null;
  }
};

// Add new report
export const addReport = async (report) => {
  try {
    const reports = await getAllReports();
    const newReport = {
      ...report,
      id: Date.now().toString(),
      status: 'reported',
      date: new Date().toISOString(),
      upvotes: 0,
    };
    reports.push(newReport);
    await AsyncStorage.setItem(REPORTS_KEY, JSON.stringify(reports));
    return newReport;
  } catch (error) {
    console.error('Error adding report:', error);
    throw error;
  }
};

// Update report status
export const updateReportStatus = async (id, newStatus) => {
  try {
    const reports = await getAllReports();
    const index = reports.findIndex(report => report.id === id);
    if (index !== -1) {
      reports[index].status = newStatus;
      await AsyncStorage.setItem(REPORTS_KEY, JSON.stringify(reports));
      return reports[index];
    }
    return null;
  } catch (error) {
    console.error('Error updating report:', error);
    throw error;
  }
};

// Upvote a report
export const upvoteReport = async (id) => {
  try {
    const reports = await getAllReports();
    const index = reports.findIndex(report => report.id === id);
    if (index !== -1) {
      reports[index].upvotes += 1;
      await AsyncStorage.setItem(REPORTS_KEY, JSON.stringify(reports));
      return reports[index];
    }
    return null;
  } catch (error) {
    console.error('Error upvoting report:', error);
    throw error;
  }
};

// Get reports by category
export const getReportsByCategory = async (category) => {
  try {
    const reports = await getAllReports();
    return reports.filter(report => report.category === category);
  } catch (error) {
    console.error('Error filtering reports:', error);
    return [];
  }
};

// Get reports by status
export const getReportsByStatus = async (status) => {
  try {
    const reports = await getAllReports();
    return reports.filter(report => report.status === status);
  } catch (error) {
    console.error('Error filtering reports:', error);
    return [];
  }
};

// Delete report
export const deleteReport = async (id) => {
  try {
    const reports = await getAllReports();
    const filtered = reports.filter(report => report.id !== id);
    await AsyncStorage.setItem(REPORTS_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error deleting report:', error);
    throw error;
  }
};
