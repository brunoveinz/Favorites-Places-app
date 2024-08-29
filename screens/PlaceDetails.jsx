import { ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect } from 'react'
import OutlinedButton from '../components/UI/OutlinedButton'
import { Colors } from '../constants/colors'
import { fetchPlaceDetails } from '../util/database'

const PlaceDetails = ({route}) => {

  function showOnMapHandler(){}

  const selectedPlaceId = route.params.placeId;
  
  useEffect(()=>{

    async function loadPLaceData() {
      await fetchPlaceDetails(selectedPlaceId);
    }
    loadPLaceData();
  },[selectedPlaceId])

  return (
    <ScrollView>
      <Image style={styles.image}/>
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{selectedPlaceId}</Text>
        </View>
        <OutlinedButton icon="map" onPress={showOnMapHandler}>
          View on Map
        </OutlinedButton>
      </View>
    </ScrollView>
  )
}

export default PlaceDetails

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center'
  },
  image: {
    height: '35%',
    minHeight: 300,
    width: '100%'
  },
  locationContainer:{
    justifyContent: 'center',
    alignItems: 'center'
  },
  addressContainer: {
    padding: 20
  },
  address: {
    color: Colors.primary200,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16
  }
})