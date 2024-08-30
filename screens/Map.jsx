import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useLayoutEffect, useState } from 'react'
import MapView , { Marker} from 'react-native-maps'
import IconButton from '../components/UI/IconButton'

const Map = ({navigation, route}) => {
  
  const initialLocation = route.params && {
    lat: route.params.initialLat,
    lng: route.params.initialLng, 
  };
  console.log(initialLocation)
  const [selectedLocation, setSelectedLocation] = useState(initialLocation)

  const region = {
    latitude: initialLocation ? initialLocation.lat : -39.366116846221935,
    longitude: initialLocation ? initialLocation.lng : -72.63064914098794,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };


  function selectLocationHandler(event) {
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;
    console.log(event.nativeEvent.coordinate.longitude)
    console.log(event.nativeEvent.coordinate.latitude)

    setSelectedLocation({ lat: lat, lng: lng })
  }

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation){
      Alert.alert(
        'No location picked',
        'You have to pick a location (by tapping on the map) first!'
      );
      return;
    }

    navigation.navigate('AddPlace', {
      pickedLat: selectedLocation.lat,
      pickedLng: selectedLocation.lng,
    })
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
      if (initialLocation) {
        return;
      }
      navigation.setOptions({
        headerRight: ({tintColor}) => (
        <IconButton 
          icon='save' 
          size={24} 
          color={tintColor}
          onPress={savePickedLocationHandler}
        />
      ),
    });
  },[navigation, savePickedLocationHandler, initialLocation]);

  return (
    <MapView initialRegion={region} style={styles.map} onPress={selectLocationHandler}>
      {selectedLocation && (
        <Marker 
        title="Picked Location"
        coordinate={{ 
          latitude: selectedLocation.lat,
          longitude: selectedLocation.lng,
        }}
      />
      )}
    </MapView>
  )
}

export default Map

const styles = StyleSheet.create({
  map: {
    flex: 1,
  }
})