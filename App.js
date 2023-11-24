// App.js

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Meteo from './components/meteo';

const App = () => {
  const apiKey = '83217590fb3431bae7d759b20382eddac4ed88a396ed2bcd13daa8b9e7debfe9'; // Remplace par ta clé d'API meteo-concept
  const inseeCode = '62041';

  return (
    <View style={styles.container}>
      <Meteo apiKey={apiKey} inseeCode={inseeCode} />
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
