import React from 'react';
import { TouchableOpacity, Animated, View, StyleSheet, Text } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

const Item = ({ item, navigation, onDelete }) => {
  const swipeDelete = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
    });

    return (
      <TouchableOpacity
        style={styles.content_delete}
        activeOpacity={0.8}
        onPress={() => onDelete(item)}>
        <Animated.Text
          style={[
            styles.content_delete_text,
            {
              transform: [{ translateX: trans }],
            },
          ]}>
          Delete
        </Animated.Text>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable renderLeftActions={swipeDelete}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.item}
        onPress={() => navigation.navigate('Detail', item)}>
        <Text style={styles.item_cod}>{item.code}</Text>
        <Text style={styles.item_name}>{item.name}</Text>
      </TouchableOpacity>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  item: {
    width: '100%',
    backgroundColor: '#373737',
    marginBottom: 3,
    paddingVertical: 17,
    paddingHorizontal: 15,
  },
  item_cod: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  item_name: {
    color: '#FFF',
  },
  content_delete: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'red',
    marginBottom: 3,
  },
  content_delete_text: {
    color: '#FFF',
  },
});

export default Item;
