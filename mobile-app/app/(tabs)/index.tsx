import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, RefreshControl, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; 
import api from '../../src/utils/api';
import storage from '../../src/utils/storage';

type Project = { _id: string; title: string; category?: string; user?: { _id: string, name: string } };
const FILTERS = ['Karya Saya', 'Semua', 'Otomotif', 'Elektronika', 'Bangunan', 'IT', 'Kayu', 'Robotika', 'Umum', 'Energi Terbarukan'];

export default function HomeScreen() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [activeFilter, setActiveFilter] = useState('Semua');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const userStr = await storage.getItem('userData');
      let userFinal = null;
      if (userStr) {
        const parsed = JSON.parse(userStr);
        userFinal = parsed?.data || parsed?.user || parsed;
        setCurrentUser(userFinal);
      }
      const response = await api.get('/projects');
      setProjects(response.data);
      applyFilter(activeFilter, response.data, userFinal);
    } catch (error) {
      // Ignore
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, [activeFilter]);

  const applyFilter = (filter: string, data: Project[] = projects, user: any = currentUser) => {
    setActiveFilter(filter);
    if (filter === 'Semua') {
      setFilteredProjects(data);
    } else if (filter === 'Karya Saya') {
      if (!user?._id) return setFilteredProjects([]);
      setFilteredProjects(data.filter(p => p.user?._id === user._id));
    } else {
      setFilteredProjects(data.filter(p => p.category === filter));
    }
  };

  const renderProjectCard = ({ item }: { item: Project }) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.7} onPress={() => router.push(`/${item._id}`)}>
      <View style={styles.cardHeader}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{item.category || 'UMUM'}</Text>
        </View>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
        <View style={styles.authorContainer}>
          <Ionicons name="person-circle-outline" size={16} color="#888888" style={styles.authorIcon} />
          <Text style={styles.authorLabel}>Oleh:</Text>
          <Text style={styles.authorName}>{item.user?.name || 'Pengguna'}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (isLoading) return <View style={styles.centerContainer}><ActivityIndicator size="large" color="#121212" /></View>;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>Galeri Karya</Text>
          <TouchableOpacity style={styles.addButton} onPress={() => router.push('/create')}>
            <Ionicons name="add-circle" size={18} color="#FFFFFF" style={styles.addIcon} />
            <Text style={styles.addButtonText}>Tambah</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.filterContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
            {FILTERS.map(filter => (
              <TouchableOpacity key={filter} style={[styles.filterChip, activeFilter === filter && styles.filterChipActive]} onPress={() => applyFilter(filter)}>
                {filter === 'Karya Saya' && <Ionicons name="folder-open" size={14} color={activeFilter === filter ? '#FFF' : '#666'} style={styles.filterIcon} />}
                <Text style={[styles.filterText, activeFilter === filter && styles.filterTextActive]}>{filter}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
      <FlatList 
        data={filteredProjects} 
        keyExtractor={(item) => item._id} 
        renderItem={renderProjectCard} 
        contentContainerStyle={styles.listContainer} 
        showsVerticalScrollIndicator={false} 
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#121212" />} 
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="document-text-outline" size={48} color="#CCCCCC" />
            <Text style={styles.emptyText}>Belum ada karya.</Text>
          </View>
        } 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    paddingTop: 64,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#121212',
    letterSpacing: -0.5,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#121212',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addIcon: {
    marginRight: 6,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  filterContainer: {
    paddingBottom: 16,
  },
  filterScroll: {
    paddingHorizontal: 24,
    gap: 8,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    backgroundColor: '#FFFFFF',
  },
  filterChipActive: {
    backgroundColor: '#121212',
    borderColor: '#121212',
  },
  filterIcon: {
    marginRight: 6,
  },
  filterText: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  listContainer: {
    padding: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  cardHeader: {
    marginBottom: 12,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#121212',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  cardContent: {
    marginTop: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#121212',
    lineHeight: 28,
    marginBottom: 16,
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 16,
  },
  authorIcon: {
    marginRight: 4,
  },
  authorLabel: {
    fontSize: 12,
    color: '#888888',
    marginRight: 4,
  },
  authorName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
  },
  emptyContainer: {
    paddingTop: 60,
    alignItems: 'center',
    gap: 12,
  },
  emptyText: {
    fontSize: 16,
    color: '#888888',
  },
});