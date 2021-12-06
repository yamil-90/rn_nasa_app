import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, View, StyleSheet } from 'react-native';
import Item from '../Home/components/Item';
import axios, { Axios } from 'axios';

const Detail = ({ route }) => {
    const key = 'LOiPYETqmWkJFa3TFajTC5d1Hi6ufd1WhdjqmiOq';

    const { code } = route.params;
    const [photos, setPhotos] = useState([])
    useEffect(() => {
        const getData = async () => {
            const items = await axios.get(
                `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&camera=${code}&api_key=${key}`
            )
            console.log(items.data)
            setPhotos(items.data?.photos || [])
        }
        getData()
    }, [code, key])

    const renderItem = ({ item }) => {
        return (
            <View
                style={styles.container_image}>
                <Image

                    style={styles.image}
                    source={{ uri: item.img_src }}
                />
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <FlatList
                data={photos}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    container_image: {
        backgroundColor: '#000',
        marginBottom: 5,
    },
    image: {
        resizeMode: 'contain',
        width: '100%',
        height: 350,
    }
})
export default Detail;