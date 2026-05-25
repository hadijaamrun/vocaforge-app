import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import storage from '../src/utils/storage';

export default function InitialScreen() {
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = await storage.getItem('userToken');
        setTimeout(() => {
          if (token) {
            router.replace('/(tabs)');
          } else {
            router.replace('/login');
          }
        }, 100);
      } catch (error) {
        router.replace('/login');
      }
    };

    checkAuthStatus();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#121212" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
});