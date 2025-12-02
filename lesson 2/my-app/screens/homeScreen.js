import React from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
    const headerImage = 'https://picsum.photos/800/500?blur=2';
    const projectImages = [
        'https://picsum.photos/seed/p1/400/300',
        'https://picsum.photos/seed/p2/400/300',
        'https://picsum.photos/seed/p3/400/300',
    ];

    return (
        <SafeAreaView style={styles.safe}>
            <View style={styles.container}>
                <View style={styles.topRow}>
                    <TouchableOpacity onPress={() => navigation?.goBack?.()}>
                        <Text style={styles.back}>{'\u2190'}</Text>
                    </TouchableOpacity>
                    <Text style={styles.title}>App</Text>
                    <View style={{ width: 24 }} />
                </View>

                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.headerWrap}>
                        <Image source={{ uri: headerImage }} style={styles.headerImage} />
                        <View style={styles.profileCard}>
                            <Image
                                source={{ uri: 'https://i.pravatar.cc/120' }}
                                style={styles.avatar}
                            />
                            <Text style={styles.name}>JOHN DOE</Text>
                            <Text style={styles.role}>UI/UX Designer</Text>
                            <Text style={styles.desc}>
                                We're passionate about creating beautiful design for startups & leading brands
                            </Text>
                            <TouchableOpacity style={styles.hireBtn}>
                                <Text style={styles.hireText}>HIRE HIM</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>PROJECTS</Text>
                        <TouchableOpacity style={styles.viewAll}>
                            <Text style={styles.viewAllText}>View All</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.projectsRow}>
                        {projectImages.map((uri, i) => (
                            <View key={i} style={styles.projectCard}>
                                <Image source={{ uri }} style={styles.projectImage} />
                                <Text style={styles.projectLabel}>Project {i + 1}</Text>
                            </View>
                        ))}
                    </ScrollView>

                    <View style={{ height: 40 }} />
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: '#fff' },
    container: { flex: 1 },
    topRow: {
        height: 48,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
    },
    back: { fontSize: 20, color: '#444' },
    title: { flex: 1, textAlign: 'center', fontSize: 16, color: '#222' },

    scrollContent: { paddingBottom: 20 },

    headerWrap: {
        alignItems: 'center',
        marginHorizontal: 16,
        marginTop: 8,
    },
    headerImage: {
        width: width - 32,
        height: 220,
        borderRadius: 8,
        backgroundColor: '#eee',
    },
    profileCard: {
        position: 'absolute',
        bottom: -40,
        left: 24,
        right: 24,
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingTop: 48,
        paddingHorizontal: 20,
        paddingBottom: 18,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.12,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 6,
    },
    avatar: {
        position: 'absolute',
        top: -36,
        width: 72,
        height: 72,
        borderRadius: 36,
        borderWidth: 4,
        borderColor: '#fff',
    },
    name: { marginTop: 4, fontWeight: '700', fontSize: 14, color: '#111' },
    role: { fontSize: 12, color: '#777', marginTop: 4 },
    desc: { textAlign: 'center', fontSize: 12, color: '#666', marginTop: 8, lineHeight: 18 },
    hireBtn: {
        marginTop: 12,
        backgroundColor: '#F7C948',
        paddingHorizontal: 18,
        paddingVertical: 8,
        borderRadius: 20,
    },
    hireText: { color: '#222', fontWeight: '700' },

    sectionHeader: {
        marginTop: 60,
        marginHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    sectionTitle: { fontSize: 12, fontWeight: '700', color: '#222' },
    viewAll: {
        backgroundColor: '#FDE68A',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 16,
    },
    viewAllText: { fontSize: 12, fontWeight: '700', color: '#222' },

    projectsRow: {
        marginTop: 12,
        paddingLeft: 16,
    },
    projectCard: {
        width: 140,
        height: 180,
        marginRight: 12,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        elevation: 3,
    },
    projectImage: { width: '100%', height: 120, backgroundColor: '#ddd' },
    projectLabel: { padding: 8, fontSize: 12, fontWeight: '600', color: '#333' },
});