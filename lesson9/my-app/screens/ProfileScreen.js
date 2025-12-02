import React from 'react';
import { ScrollView, View, Text, StyleSheet, ScrollView as SV } from 'react-native';
import StudentInfo from '../components/StudentInfo';
import Projects from '../components/Projects';

export default function ProfileScreen() {
  const projects = [
    require('../../assets/project1.png'),
    require('../../assets/project2.png'),
    require('../../assets/project3.png'),
    require('../../assets/project1.png'),
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StudentInfo
        fullname="JOHN DOE"
        position="UI/UX Designer"
        description="We're passionate about creating beautiful design for startups & leading brands."
        profileImage={require('../../assets/profile-bg.png')}
      />

      <View style={styles.projectsHeader}>
        <Text style={styles.projectsTitle}>PROJECTS</Text>
        <View style={styles.viewAll}>
          <Text style={styles.viewAllText}>View All</Text>
        </View>
      </View>

      <SV horizontal showsHorizontalScrollIndicator={false} style={styles.projectsRow}>
        {projects.map((p, i) => (
          <Projects key={i} image={p} />
        ))}
      </SV>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    paddingBottom: 40,
  },
  projectsHeader: {
    marginTop: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  projectsTitle: {
    fontWeight: '700',
    fontSize: 12,
    color: '#222',
  },
  viewAll: {
    backgroundColor: '#FFD23F',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 14,
  },
  viewAllText: {
    color: '#111',
    fontWeight: '700',
    fontSize: 12,
  },
  projectsRow: {
    marginTop: 12,
    paddingBottom: 6,
  },
});