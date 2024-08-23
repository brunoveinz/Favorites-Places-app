import { Alert, Button, StyleSheet, Text, View, Image } from 'react-native'
import React, {useState} from 'react'
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker'
import { Colors } from '../../constants/colors';
import OutlinedButton from '../UI/OutlinedButton';

const ImagePicker = ({onTakeImage}) => {
  const [pickedImage, setPickedImage] = useState('');
  const [cameraPermisioInformation, requestPermision] = useCameraPermissions();

  async function verifyPermissions(){
    if (cameraPermisioInformation.status === PermissionStatus.UNDETERMINED ){
        const permissionResponse = await requestPermision();
        return permissionResponse.granted;
    }

    if(cameraPermisioInformation.status === PermissionStatus.DENIED){
        Alert.alert(
            'Insufficient Permissions!',
            'You need to grant camera permissions to use this app.'
        );
        return false;
    } 

    return true;
  }

  async function takeImageHandler(){
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
        return;
    }

    const image = await launchCameraAsync({
        allowsEditing: true,
        aspect: [16,9],
        quality: 0.5,
    });
    setPickedImage(image.assets[0].uri);
    onTakeImage(image.assets[0].uri);
  }

  let imagePreview = <Text>No image taken yet.</Text>

  if(pickedImage){
    imagePreview = <Image style={styles.image} source={{ uri: pickedImage }}/>
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutlinedButton icon="camera" title="Take Photo" onPress={takeImageHandler} />
    </View>
  )
}

export default ImagePicker

const styles = StyleSheet.create({
    imagePreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        overflow: 'hidden'
    },

    image: {
        width: '100%',
        height: '100%',
        borderRadius: 25

    }
})