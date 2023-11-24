import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import moment from 'moment';

const Meteo = ({ apiKey, inseeCode }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [currentDay, setCurrentDay] = useState(0);

  useEffect(() => {
    const getWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.meteo-concept.com/api/forecast/daily?token=${apiKey}&insee=${inseeCode}&days=7`
        );

        const cityName = response.data.city.name;
        const dailyForecasts = response.data.forecast.slice(1, 8);
        
        setWeatherData({
          cityName,
          dailyForecasts,
        });
      } catch (error) {
        console.error('Erreur lors de la récupération des données météo', error);
      }
    };

    getWeatherData();
  }, [apiKey, inseeCode]);

  const handleNextDay = () => {
    setCurrentDay((prevDay) => prevDay + 1);
  };

  const renderDailyForecastItem = ({ item }) => {
    const day = new Date(item.datetime).toLocaleDateString('fr-FR', { weekday: 'long' });

    return (
      <View style={styles.forecastItem}>
        <Text style={styles.dayText}>{day}</Text>
        <Text>Date : {item.datetime}</Text>
        <Text>Température prévue : {item.tmin} °C à {item.tmax} °C</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {weatherData ? (
        <>
          <Text style={styles.cityText}>Météo en direct de : {weatherData.cityName}</Text>
          <Text style={styles.temperatureText}>
            Température prévue : {weatherData.dailyForecasts[currentDay].tmin} °C à {weatherData.dailyForecasts[currentDay].tmax} °C
          </Text>

          <Text style={styles.forecastHeader}>Prévisions météorologiques des 7 prochains jours :</Text>
          <FlatList
            data={weatherData.dailyForecasts}
            renderItem={renderDailyForecastItem}
            keyExtractor={(item) => item.day.toString()}
            style={styles.flatList}
          />
        </>
      ) : (
        <Text style={styles.loadingText}>Chargement des données météo...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    paddingTop: 150,
  },
  cityText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  temperatureText: {
    fontSize: 16,
    marginBottom: 10,
  },
  forecastHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  forecastItem: {
    marginBottom: 20,
  },
  dayText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  flatList: {
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 16,
  },
});

export default Meteo;
