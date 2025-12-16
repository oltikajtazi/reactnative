import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TextInput,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
  Platform,
  Modal,
  Linking,
  Animated,
  Pressable,
  SafeAreaView,
} from "react-native";

class FetchScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      loading: true,
      refreshing: false,
      query: "",
      modalVisible: false,
      selectedUser: null,
      sortAsc: true,
      viewMode: "list", // 'list' or 'grid'
    };
  }

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = async () => {
    try {
      if (!this.state.refreshing) this.setState({ loading: true });
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const jsonData = await response.json();
      this.setState({ users: jsonData, loading: false, refreshing: false });
    } catch (error) {
      console.log("Error fetching users:", error);
      this.setState({ loading: false, refreshing: false });
    }
  };

  onRefresh = () => {
    this.setState({ refreshing: true }, this.fetchUsers);
  };

  openModal = (user) => this.setState({ modalVisible: true, selectedUser: user });
  closeModal = () => this.setState({ modalVisible: false, selectedUser: null });

  toggleSort = () => this.setState((s) => ({ sortAsc: !s.sortAsc }));
  toggleView = () => this.setState((s) => ({ viewMode: s.viewMode === "list" ? "grid" : "list" }));

  onAction = async (type, user) => {
    try {
      if (type === "email") await Linking.openURL(`mailto:${user.email}`);
      if (type === "website") await Linking.openURL(`http://${user.website}`);
      if (type === "phone") await Linking.openURL(`tel:${user.phone}`);
    } catch (e) {
      Alert.alert("Could not open", e.message);
    }
  };

  renderItem = ({ item }) => (
    <UserCard
      user={item}
      onPress={() => this.openModal(item)}
      viewMode={this.state.viewMode}
    />
  );

  render() {
    const { loading, users, refreshing, query, modalVisible, selectedUser, sortAsc, viewMode } = this.state;

    const q = query.trim().toLowerCase();

    let filtered = users.filter((u) => {
      if (!q) return true;
      return (
        u.name.toLowerCase().includes(q) ||
        u.username.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q)
      );
    });

    filtered = filtered.sort((a, b) => {
      const na = a.name.toLowerCase();
      const nb = b.name.toLowerCase();
      if (na === nb) return 0;
      return sortAsc ? (na < nb ? -1 : 1) : na < nb ? 1 : -1;
    });

    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Users</Text>
            <Text style={styles.subtitle}>Tap a card for details • Pull to refresh</Text>
          </View>

          <View style={styles.headerControls}>
            <Pressable onPress={this.toggleSort} style={styles.iconBtn}>
              <Text style={styles.iconText}>{sortAsc ? "A→Z" : "Z→A"}</Text>
            </Pressable>

            <Pressable onPress={this.toggleView} style={styles.iconBtn}>
              <Text style={styles.iconText}>{viewMode === "list" ? "▦" : "☰"}</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.searchWrap}>
          <TextInput
            value={query}
            onChangeText={(query) => this.setState({ query })}
            placeholder="Search by name, username or email"
            style={styles.search}
            clearButtonMode="while-editing"
          />
        </View>

        {loading && !refreshing ? (
          <View style={[styles.container, styles.center]}>
            <ActivityIndicator size="large" color="#0a84ff" />
          </View>
        ) : (
          <FlatList
            contentContainerStyle={styles.list}
            data={filtered}
            keyExtractor={(item) => item.id.toString()}
            renderItem={this.renderItem}
            ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} tintColor="#0a84ff" />
            }
            numColumns={viewMode === "grid" ? 2 : 1}
            columnWrapperStyle={viewMode === "grid" ? { justifyContent: "space-between" } : null}
            ListEmptyComponent={() => (
              <View style={[styles.container, styles.center]}>
                <Text style={styles.empty}>No users found.</Text>
              </View>
            )}
          />
        )}

        <Modal visible={modalVisible} animationType="slide" transparent>
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              {selectedUser && (
                <View style={{ alignItems: "center" }}>
                  <Image source={{ uri: `https://i.pravatar.cc/200?img=${selectedUser.id}` }} style={styles.modalAvatar} />
                  <Text style={styles.modalName}>{selectedUser.name}</Text>
                  <Text style={styles.modalUsername}>@{selectedUser.username}</Text>

                  <View style={styles.modalInfo}>
                    <Text style={styles.modalLabel}>Email</Text>
                    <Pressable onPress={() => this.onAction("email", selectedUser)}>
                      <Text style={styles.modalLink}>{selectedUser.email}</Text>
                    </Pressable>

                    <Text style={[styles.modalLabel, { marginTop: 10 }]}>Phone</Text>
                    <Pressable onPress={() => this.onAction("phone", selectedUser)}>
                      <Text style={styles.modalLink}>{selectedUser.phone}</Text>
                    </Pressable>

                    <Text style={[styles.modalLabel, { marginTop: 10 }]}>Website</Text>
                    <Pressable onPress={() => this.onAction("website", selectedUser)}>
                      <Text style={styles.modalLink}>{selectedUser.website}</Text>
                    </Pressable>

                    <Text style={[styles.modalLabel, { marginTop: 10 }]}>Address</Text>
                    <Text style={styles.modalText}>{`${selectedUser.address.street}, ${selectedUser.address.suite}, ${selectedUser.address.city} ${selectedUser.address.zipcode}`}</Text>

                    <Text style={[styles.modalLabel, { marginTop: 10 }]}>Company</Text>
                    <Text style={styles.modalText}>{selectedUser.company.name} — {selectedUser.company.catchPhrase}</Text>
                  </View>

                  <View style={styles.modalActions}>
                    <Pressable style={[styles.modalBtn, { backgroundColor: "#0a84ff" }]} onPress={this.closeModal}>
                      <Text style={{ color: "#fff" }}>Close</Text>
                    </Pressable>
                  </View>
                </View>
              )}
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }
}

// Small functional UserCard component with press animation
function UserCard({ user, onPress, viewMode }) {
  const scale = useRef(new Animated.Value(1)).current;

  const pressIn = () => {
    Animated.spring(scale, { toValue: 0.97, useNativeDriver: true }).start();
  };
  const pressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
  };

  const cardStyle = [
    styles.card,
    viewMode === "grid" ? styles.cardGrid : null,
    { transform: [{ scale }] },
  ];

  return (
    <TouchableWithoutFeedback onPressIn={pressIn} onPressOut={pressOut} onPress={onPress}>
      <Animated.View style={cardStyle}>
        <Image source={{ uri: `https://i.pravatar.cc/150?img=${user.id}` }} style={styles.avatar} />
        <View style={styles.cardContent}>
          <View style={styles.row}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.username}>@{user.username}</Text>
          </View>
          <Text style={styles.email}>{user.email}</Text>
          <Text style={styles.meta}>{user.company?.name} • {user.address?.city}</Text>
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f2f6ff",
  },
  header: {
    paddingTop: Platform.OS === "ios" ? 60 : 40,
    paddingBottom: 18,
    paddingHorizontal: 20,
    backgroundColor: "#0a84ff",
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerControls: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBtn: {
    marginLeft: 8,
    backgroundColor: "rgba(255,255,255,0.12)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  iconText: {
    color: "#fff",
    fontWeight: "700",
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
  },
  subtitle: {
    color: "rgba(255,255,255,0.9)",
    marginTop: 6,
    fontSize: 13,
  },
  searchWrap: {
    paddingHorizontal: 20,
    marginTop: -28,
    marginBottom: 8,
  },
  search: {
    backgroundColor: "#fff",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    fontSize: 14,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: "0 6px 18px rgba(12,24,60,0.08)",
      },
    }),
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    paddingHorizontal: 20,
    paddingTop: 6,
    paddingBottom: 20,
  },
  card: {
    flexDirection: "row",
    padding: 14,
    backgroundColor: "#fff",
    borderRadius: 14,
    alignItems: "center",
    width: "100%",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.08,
        shadowRadius: 18,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: "0 8px 30px rgba(12,24,60,0.08)",
      },
    }),
  },
  cardGrid: {
    width: "48%",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 12,
    backgroundColor: "#e6eefc",
  },
  cardContent: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0b2545",
  },
  username: {
    color: "#5b6b8a",
    fontSize: 13,
  },
  email: {
    marginTop: 6,
    fontSize: 13,
    color: "#334155",
  },
  meta: {
    marginTop: 6,
    color: "#6b7280",
    fontSize: 12,
  },
  empty: {
    color: "#6b7280",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalCard: {
    width: "100%",
    maxWidth: 520,
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 18,
  },
  modalAvatar: {
    width: 110,
    height: 110,
    borderRadius: 56,
    marginBottom: 12,
  },
  modalName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0b2545",
  },
  modalUsername: {
    color: "#5b6b8a",
  },
  modalInfo: {
    marginTop: 12,
  },
  modalLabel: {
    color: "#334155",
    fontWeight: "700",
    fontSize: 12,
  },
  modalLink: {
    color: "#0a84ff",
    marginTop: 6,
  },
  modalText: {
    color: "#334155",
    marginTop: 6,
  },
  modalActions: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "center",
  },
  modalBtn: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
  },
});

export default FetchScreen;
