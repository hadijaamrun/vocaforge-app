import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, ActivityIndicator, Alert, SafeAreaView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import api from '../../src/utils/api'; 

const CATEGORIES = ['Umum', 'Otomotif', 'Elektronika', 'Bangunan', 'IT', 'Kayu', 'Robotika', 'Energi Terbarukan'];

export default function EditProjectScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [isFetching, setIsFetching] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Umum',
    description: ''
  });

  useEffect(() => {
    if (id) fetchProjectDetail();
  }, [id]);

  const fetchProjectDetail = async () => {
    try {
      const response = await api.get(`/projects/${id}`);
      const project = response.data;
      setFormData({
        title: project.title || '',
        category: project.category || 'Umum',
        description: project.description || ''
      });
    } catch (error) {
      Alert.alert('Error', 'Gagal mengambil data karya');
      router.back();
    } finally {
      setIsFetching(false);
    }
  };

  const handleUpdate = async () => {
    if (!formData.title || !formData.description) {
      Alert.alert('Error', 'Judul dan Deskripsi wajib diisi!');
      return;
    }

    setIsSaving(true);
    try {
      await api.put(`/projects/${id}`, formData);
      Alert.alert('Sukses', 'Karya berhasil diperbarui!', [
        { text: 'OK', onPress: () => router.replace(`/${id}`) } 
      ]);
    } catch (error) {
      Alert.alert('Error', 'Gagal memperbarui karya. Coba lagi.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isFetching) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#121212" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← Batal</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Karya</Text>
        <View style={styles.spacer} />
      </View>

      <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.label}>Judul Karya</Text>
        <TextInput
          style={styles.input}
          value={formData.title}
          onChangeText={(text) => setFormData({ ...formData, title: text })}
        />

        <Text style={styles.label}>Kategori</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.categoryBadge, formData.category === cat && styles.categoryBadgeActive]}
              onPress={() => setFormData({ ...formData, category: cat })}
            >
              <Text style={[styles.categoryText, formData.category === cat && styles.categoryTextActive]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.label}>Deskripsi & Langkah-langkah</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={formData.description}
          onChangeText={(text) => setFormData({ ...formData, description: text })}
          multiline
          numberOfLines={8}
          textAlignVertical="top"
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleUpdate} disabled={isSaving}>
          {isSaving ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.submitButtonText}>Perbarui Karya</Text>}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 25,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  backText: {
    fontSize: 16,
    color: '#666666',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#121212',
  },
  spacer: {
    width: 60,
  },
  formContainer: {
    padding: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#121212',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#FAFAFA',
  },
  textArea: {
    minHeight: 180,
  },
  categoryScroll: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  categoryBadge: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  categoryBadgeActive: {
    backgroundColor: '#121212',
    borderColor: '#121212',
  },
  categoryText: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '600',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  submitButton: {
    backgroundColor: '#121212',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});