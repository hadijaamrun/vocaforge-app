import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import api from '../src/utils/api';
import storage from '../src/utils/storage';

export default function ProjectDetailScreen() {
  const { id } = useLocalSearchParams(); 
  const router = useRouter();
  const [project, setProject] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCurrentUser();
    if (id) fetchProjectDetail();
  }, [id]);

  const fetchCurrentUser = async () => {
    const dataStr = await storage.getItem('userData');
    if (dataStr) {
      const parsed = JSON.parse(dataStr);
      const userFinal = parsed?.data || parsed?.user || parsed;
      setCurrentUser(userFinal);
    }
  };

  const fetchProjectDetail = async () => {
    try {
      const response = await api.get(`/projects/${id}`);
      setProject(response.data);
    } catch (error) {
      // Ignore
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = () => {
    Alert.alert("Hapus Karya", "Yakin ingin menghapus karya ini?", [
      { text: "Batal", style: "cancel" },
      { text: "Ya, Hapus", style: "destructive", onPress: async () => {
          try {
            setIsLoading(true);
            await api.delete(`/projects/${id}`);
            Alert.alert("Sukses", "Karya berhasil dihapus!");
            router.replace('/(tabs)'); 
          } catch (error) {
            Alert.alert("Error", "Gagal menghapus karya.");
            setIsLoading(false);
          }
        } 
      }
    ]);
  };

  if (isLoading) return <View style={styles.centerContainer}><ActivityIndicator size="large" color="#121212" /></View>;

  const currentUserId = currentUser?._id;
  const projectUserId = project?.user?._id || project?.user;
  const isAuthor = Boolean(currentUserId && projectUserId && currentUserId === projectUserId);

  const createdAt = project?.createdAt ? new Date(project.createdAt).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric'
  }) : 'Tanggal tidak diketahui';

  return (
    <View style={styles.container}>
      <View style={styles.topNav}>
        <TouchableOpacity style={styles.navButton} onPress={() => router.back()}>
          <Text style={styles.navText}>← Kembali</Text>
        </TouchableOpacity>

        {isAuthor && (
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.editButton} onPress={() => router.push(`/edit/${id}`)}>
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
              <Text style={styles.deleteText}>Hapus</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.badge}>
            <Text style={styles.categoryText}>{project?.category || 'UMUM'}</Text>
          </View>
          <Text style={styles.title}>{project?.title || 'Judul Tidak Tersedia'}</Text>
          
          <View style={styles.metaContainer}>
            <Text style={styles.author}>
              Ditulis oleh: <Text style={styles.authorName}>{project?.user?.name || 'Pengguna'}</Text>
            </Text>
            <Text style={styles.date}>🗓 {createdAt}</Text>
          </View>
          
          <View style={styles.divider} />
          <Text style={styles.label}>Deskripsi & Langkah-langkah:</Text>
          <Text style={styles.description}>{project?.description || 'Tidak ada deskripsi.'}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 64,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    zIndex: 10,
  },
  navButton: {
    paddingVertical: 8,
    paddingRight: 16,
  },
  navText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#121212',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  editButton: {
    backgroundColor: '#121212',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  editText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  deleteText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  content: {
    padding: 24,
  },
  badge: {
    backgroundColor: '#121212',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 16,
    marginTop: 12,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#121212',
    marginBottom: 12,
  },
  metaContainer: {
    marginBottom: 24,
  },
  author: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 4,
  },
  authorName: {
    color: '#121212',
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
    color: '#888888',
  },
  divider: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    color: '#888',
    marginBottom: 12,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    lineHeight: 28,
    color: '#333',
  },
});