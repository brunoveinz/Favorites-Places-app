import { StyleSheet, Text, View, Alert, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import OutlinedButton from '../UI/OutlinedButton'
import { Colors } from '../../constants/colors'
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location'
import { getAddress, getMapPreview } from '../../util/location'
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native'



const LocationPicker = ({onPickLocation}) => {
    const [pickedLocation, setPickedLocation] = useState()
    const [locationPermissionInformation, requestPermission] = useForegroundPermissions();
    
    const isFocused = useIsFocused();
    const navigation = useNavigation();
    const route = useRoute();
    
    useEffect(() => {
        if (isFocused && route.params){
            const mapPickedLocation = {
                lat: route.params.pickedLat,
                lng: route.params.pickedLng
            };
            setPickedLocation(mapPickedLocation)
        }
    },[route, isFocused]);

    useEffect(() => {
        async function handleLocation() {
            if(pickedLocation){
                const address = await getAddress(pickedLocation.lat, pickedLocation.lng)
                console.log(address)
                onPickLocation({ ...pickedLocation, address: address });
            }
        }
        handleLocation();
    },[pickedLocation, onPickLocation])

    async function verifyPermissions() {
        if (locationPermissionInformation.status === PermissionStatus.UNDETERMINED ){
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }

        if(locationPermissionInformation.status === PermissionStatus.DENIED){
            Alert.alert(
                'Insufficient Permissions!',
                'You need to grant location permissions to use this app.'
            );
            return false;
        } 
        return true;
    }

    async function getLocationHandler() {
        const hasPermission = await verifyPermissions();

        if (!hasPermission) {
            return;
        }

        const location = await getCurrentPositionAsync()
        setPickedLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude
        });
    }

    function pickOnMapHandler() {
        navigation.navigate('Map');
    }

    let locationPreview = <Text>No location picket yet.</Text>

    if (pickedLocation){
        locationPreview = (
            <Image
            style={styles.image}
            source={{uri: getMapPreview(pickedLocation.lat, pickedLocation.lng)}}
            />
        );
    }
    
  return (
    <View>
        <View style={styles.mapPreview}>{locationPreview}</View>
        <View style={styles.actions}>
            <OutlinedButton icon="location" onPress={getLocationHandler} title="Locate user"/>
            <OutlinedButton icon="map" onPress={pickOnMapHandler} title="Pick on Map"/>
        </View>
    </View>
  )
}

export default LocationPicker

const styles = StyleSheet.create({
    mapPreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4,
        overflow: 'hidden'
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    image:{
        width: '100%',
        height: '100%',
    }
    
})