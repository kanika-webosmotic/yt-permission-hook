import React, {useState} from 'react';
import {View, Button, Image, StyleSheet} from 'react-native';
import usePermission from './src/hooks/usePermission';
import {RESULTS} from 'react-native-permissions';
import {launchCamera, MediaType} from 'react-native-image-picker';
import {permission} from './src/utils/permissions';

const App = () => {
  const [imageUrl, setImageUrl] = useState('');
  const {checkAndRequestPermission} = usePermission(permission.camera);

  const handleImagePicker = async () => {
    const options = {
      saveToPhotos: false,
      mediaType: 'photo' as MediaType,
    };
    const image = await launchCamera(options, response => {
      if (response.didCancel) {
      } else {
        return response?.assets?.[0]?.uri;
      }
    });
    const imageUri = image?.assets?.[0]?.uri;
    if (imageUri) {
      setImageUrl(imageUri);
    }
  };

  const captureImage = async () => {
    const status = await checkAndRequestPermission();
    if (status === RESULTS.GRANTED) {
      handleImagePicker();
    }
  };

  return (
    <View style={styles.centeredContent}>
      {imageUrl ? (
        <Image source={{uri: imageUrl}} style={styles.selectedImage} />
      ) : null}
      <Button title="Select Image" onPress={captureImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  centeredContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  selectedImage: {
    marginBottom: 20,
    height: 300,
    width: 300,
    borderRadius: 16,
  },
  pemissionStatusText: {
    fontSize: 16,
    marginTop: 20,
  },
});

export default App;
