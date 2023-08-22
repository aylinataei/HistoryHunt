


// import React, { useRef, useState, useEffect } from 'react';
// import { Button, Dimensions, View, StyleSheet, Text, Image } from 'react-native';
// import { Camera, CameraType } from 'expo-camera';

// const ImagePicker = () => {
//   const cameraRef = useRef();
//   const [photo, setPhoto] = useState();
//   const [cameraReady, setCameraReady] = useState(false);

//   useEffect(() => {
//     const prepareCamera = async () => {
//       const { status } = await Camera.requestCameraPermissionsAsync();
//       if (status === 'granted') {
//         setCameraReady(true);
//       }
//     };

//     prepareCamera();
//   }, []);

//   const takeImageHandler = async () => {
//     if (cameraReady && cameraRef.current) {
//       const takenPhoto = await cameraRef.current.takePictureAsync({
//         quality: 0.7,
//         exif: false,
//       });
//       console.log(takenPhoto);
//       setPhoto(takenPhoto);
//     }
//   };

//   let previewContent = <Text>No photo taken yet</Text>;
//   if (photo) {
//     previewContent = <Image source={{ uri: photo.uri }} style={styles.photo} />;
//   }

//   return (
//     <View style={styles.container}>
//       {cameraReady ? (
//         <Camera style={styles.camera} ref={cameraRef} type={CameraType.back}>
//           <Button title="Take Image" onPress={takeImageHandler} />
//         </Camera>
//       ) : (
//         <Text>Camera is not ready</Text>
//       )}
//       <View style={styles.preview}>{previewContent}</View>
//     </View>
//   );
// };

// const { width, height } = Dimensions.get('window');

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   camera: {
//     width: width,
//     height: height / 2.5,
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//   },
//   preview: {
//     width: width,
//     height: height / 3,
//     marginVertical: 8,
//     backgroundColor: 'blue',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   photo: {
//     width: '100%',
//     height: '100%',
//   },
// });

// export default ImagePicker;


import React, { useRef, useState, useEffect } from 'react';
import { Button, Dimensions, View, StyleSheet, Image } from 'react-native';
import { Camera, CameraType } from 'expo-camera';

const ImagePicker = () => {
  const cameraRef = useRef();
  const [photo, setPhoto] = useState();
  const [cameraReady, setCameraReady] = useState(false);

  useEffect(() => {
    const prepareCamera = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status === 'granted') {
        setCameraReady(true);
      }
    };

    prepareCamera();
  }, []);

  const takeImageHandler = async () => {
    if (cameraReady && cameraRef.current) {
      const takenPhoto = await cameraRef.current.takePictureAsync({
        quality: 0.7,
        exif: false,
      });
      console.log(takenPhoto);
      setPhoto(takenPhoto);
    }
  };

  const takeNewImage = () => {
    setPhoto(null); // Reset the photo state to allow taking a new picture
  };

  return (
    <View style={styles.container}>
      <View style={styles.profilePictureContainer}>
        {!photo && (
          <View style={styles.captureButtonContainer}>
            <Button title="Take Picture" onPress={takeImageHandler} />
          </View>
        )}
        <View style={styles.profilePicture}>
          {photo ? (
            <Image source={{ uri: photo.uri }} style={styles.profilePictureImage} />
          ) : (
            <Camera style={styles.camera} ref={cameraRef} type={CameraType.front} />
          )}
        </View>
        {photo && (
          <View style={styles.captureButtonContainer}>
            <Button title="Take Another Picture" onPress={takeNewImage} />
          </View>
        )}
      </View>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profilePictureContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start', // Align content at the top
    marginTop: 20, // Add some top margin for spacing
    marginBottom: 20,
  },
  profilePicture: {
    width: 160,
    height: 160,
    borderRadius: 80,
    overflow: 'hidden',
    backgroundColor: '#EAEAEA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePictureImage: {
    width: '100%',
    height: '100%',
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  captureButtonContainer: {
    marginTop: 10, // Adjust the margin top for spacing under the content
    marginBottom: 20,
    alignSelf: 'center',
  },
  photo: {
    width: 160,
    height: 160,
    marginTop: 16,

  },
});

export default ImagePicker;
