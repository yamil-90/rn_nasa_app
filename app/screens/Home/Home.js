import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useIsFocused } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Item from './components/Item';

const Home = ({ navigation }) => {
    const isFocused = useIsFocused();
    const [rovers, setRovers] = useState([]);

    useEffect(() => {
        async function getData() {
            if (1) {
                const value = await AsyncStorage.getItem('rovers');
                if (value) setRovers(JSON.parse(value));
                console.log(value)
            }
            console.log('get data')
        };
        getData()
    }, [isFocused]);

    const deleteAll = async()=>{
        AsyncStorage.removeItem('rovers')
        console.log('rovers removed')
        setRovers([])
    }
    const onDelete = async item => {
        try {
            const current = rovers.filter(value => value.cod !== item.cod);
            const json_value = JSON.stringify(current);
            await AsyncStorage.setItem('rovers', json_value);
            setRovers(current);
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <View style={styles.container}>
            <FlatList
                data={rovers}
                renderItem={props => (
                    <Item {...props} navigation={navigation}
                        onDelete={onDelete} />
                )}
                keyExtractor={item => item.name}
            />
            <TouchableOpacity
                style={styles.btn}
                activeOpacity={0.97}
                onPress={() => navigation.navigate('Rover')}>
                <Icon name="plus" size={30} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.btn_delete_all}
                activeOpacity={0.97}
                onPress={() => deleteAll()}>
                <Icon name="minus" size={30} color="#FFF" />
            </TouchableOpacity>
        </View>
    );
};
export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    btn: {
        display: 'flex',
        backgroundColor: '#142950',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        shadowColor: '#000',
        borderRadius: 100,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        height: 57,
        padding: 5,
        bottom: 30,
        width: 57,
        right: 30,
    },
    btn_delete_all: {
        display: 'flex',
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        shadowColor: '#000',
        borderRadius: 100,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        height: 57,
        padding: 5,
        bottom: 30,
        width: 57,
        right: 90,
    },
});