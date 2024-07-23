import React, { useEffect, useState } from 'react';
import {
    Image,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    View,
} from 'react-native';

import {
    Colors
} from 'react-native/Libraries/NewAppScreen';

import ImagePicker, { Image as ImageType } from 'react-native-image-crop-picker';
import "react-native-get-random-values";
import "react-native-url-polyfill/auto";

import { S3 } from 'aws-sdk';

// Set up AWS credentials
const s3 = new S3({
    accessKeyId: 'ACCESS_KEY_ID',
    secretAccessKey: 'SECRET_ACCESS_KEY',
    region: 'YOUR_REGION',
});

const App = () => {
    const isDarkMode = useColorScheme() === 'dark';
    const [imagePath, setImagePath] = useState<any | null>(null);

    useEffect(() => {
    }, []);

    const onOptionSelected = async (index: number) => {
        try {
            let response: any;

            if (index === 0) {
                // Open Camera
                response = await ImagePicker.openCamera({
                    mediaType: 'photo',
                    width: 500,
                    height: 500,
                    cropping: true,
                });
            } else if (index === 1) {
                // Select from Gallery
                response = await ImagePicker.openPicker({
                    mediaType: 'photo',
                    includeBase64: false,
                });
            }

            if (response && response.path) {
                setImagePath({
                    path: response.path,
                    ...response,
                });

                // AWS Sample
                if (response.path) {
                    let path = "IMAGE_PATH";
                    const awsData = await handleAWS(response, path).catch((err: any) => console.log('err', err));
                }
            } else {
                console.log('Invalid image data:', response);
            }
        } catch (error) {
            console.log('Error selecting image:', error);
        }
    };

    const handleAWS = async (file: any, path: any): Promise<any> => {
        try {
            // Simulate fetching image blob
            const imgBlob = await fetch(file.path).then(response => response.blob());

            // Mock timestamp generation
            const timestamp = new Date().getTime();

            // Generate file URL
            const result: any = getFileUrl(file, path, timestamp);
            result.size = imgBlob.size;

            // Prepare PutObjectRequest
            const params: S3.PutObjectRequest = {
                Bucket: 'BUCKET_NAME',
                Key: result.key,
                Body: imgBlob,
                ContentType: file.mime,
                ACL: "YOUR_ACL",
            };

            // Upload file to S3
            await s3.upload(params).promise().then(function (response: S3.ManagedUpload.SendData) {
                result.url = response.Location;
            }).catch(function (err: Error) {
                console.log('err', err);
            });

            return result;
        } catch (error) {
            console.error('Error uploading file:', error);
            throw error;
        }
    };

    const getFileUrl = (file: any, path: any, timestamp: any) => {
        let tempName: string;
        let filename: string;
        let key: string;
        if (Platform.OS === 'ios') {
            tempName = file.filename.split(".");
            filename = tempName[0].replace(/[!@#$%^&*()_+\[\]{};:'",<>?\\| ]/g, "") + '.' + tempName[tempName.length - 1];
        } else {
            filename = 'YOUR_FILE_NAME' + timestamp + '.jpeg';
        }

        key = `${path}/${filename.split('.')[0]}_${timestamp}.jpeg`;

        let resultFile = {
            url: '', //"https://" + AwsConfig.s3BucketName + ".s3." + AwsConfig.s3BucketRegion + ".amazonaws.com/" + String(key),
            timestamp: timestamp,
            height: file.height,
            width: file.width,
            key: key,
            name: filename,
            size: ''
        }

        return resultFile;
    }


    const handleCancel = () => {
        setImagePath(null);
    };

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    return (
        <SafeAreaView style={backgroundStyle}>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={backgroundStyle.backgroundColor}
            />
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={backgroundStyle}>
                <View
                    style={{
                        backgroundColor: isDarkMode ? Colors.black : Colors.white,
                    }}>
                    <View style={styles.mainView}>
                        <Text style={styles.uploadPhoto}>Upload Photo</Text>
                        {!imagePath ? (
                            <View style={styles.boxView}>
                                <View style={styles.optionView}>
                                    <TouchableOpacity onPress={() => onOptionSelected(0)}>
                                        <Text style={{ fontWeight: 'bold' }}>Camera</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => onOptionSelected(1)}>
                                        <Text style={{ fontWeight: 'bold' }}>Gallery</Text>
                                    </TouchableOpacity>
                                </View>
                                <Text style={{ marginTop: 10 }}>Click Here to Select or Capture Image</Text>
                            </View>
                        ) : (
                            <View style={styles.photoview1}>
                                <View style={styles.photoview2}>
                                    <TouchableOpacity onPress={handleCancel}>
                                        <Text>Delete</Text>
                                    </TouchableOpacity>
                                </View>
                                <Image
                                    source={{ uri: imagePath.path }}
                                    style={{ width: 100, height: 100 }}
                                />
                            </View>
                        )}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
    mainView: {
        marginTop: 20,
        padding: 16
    },
    uploadPhoto: {
        color: '#111111',
        marginBottom: 5,
        marginLeft: 2
    },
    boxView: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 160,
        borderRadius: 2,
        borderStyle: 'dashed',
        borderWidth: 1,
        backgroundColor: '#ffffff',
    },
    photoview1: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 2,
        height: 160,
        borderRadius: 2,
        borderStyle: 'dashed',
        borderWidth: 1,
    },
    optionView: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20
    },
    photoview2: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        width: 240,
    },
});

export default App;
