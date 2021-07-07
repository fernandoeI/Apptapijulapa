import React from 'react'
import { View, StyleSheet, Dimensions, } from 'react-native'
import CameraRollGallery from "react-native-camera-roll-gallery";

const { width, height } = Dimensions.get('window')


const CarouselItem = ({ item }) => {
    return (

        <View style={styles.cardView} >
            <CameraRollGallery
                enableCameraRoll={false}
                imageMargin={0}
                onGetData={(fetchParams, resolve) => {
                    resolve({
                        assets: [
                            {
                                uri: item.url,
                            },
                        ],
                        pageInfo: {
                            hasNextPage: false,
                        },
                    });
                }}
                backgroundColor="transparent"
                enableModal={true}
                imageContainerStyle={styles.image}

            />

        </View>


    )
}

const styles = StyleSheet.create({
    cardView: {
        flex: 1,
        width: width - 20,
        height: height / 3,
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0.5, height: 0.5 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 5,
    },

    textView: {
        position: 'absolute',
        bottom: 10,
        margin: 10,
        left: 5,
    },
    image: {
        width: width - 20,
        height: height / 3,
        borderRadius: 10,
        backgroundColor: "#f2f2f2"
    },
    itemTitle: {
        color: 'white',
        fontSize: 22,
        shadowColor: '#000',
        shadowOffset: { width: 0.8, height: 0.8 },
        shadowOpacity: 1,
        shadowRadius: 3,
        marginBottom: 5,
        fontWeight: "bold",
        elevation: 5,
        color: "#000"
    },
    itemDescription: {
        color: 'white',
        fontSize: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0.8, height: 0.8 },
        shadowOpacity: 1,
        shadowRadius: 3,
        elevation: 5
    },
})

export default CarouselItem