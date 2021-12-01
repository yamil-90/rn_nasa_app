
import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, StatusBar, Image, Animated } from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import rocket from "./app/assets/rocket.png";

import Home from './app/screens/Home';
import Rover from './app/screens/Rover';
import Detail from './app/screens/Detail';

const Stack = createNativeStackNavigator();

const App = () => {
  const [animation, setanimation] = useState(false)
  const [show] = useState(new Animated.Value(0))
  const [position] = useState(new Animated.Value(700))
  const [font] = useState(new Animated.Value(1))

  useEffect(() => {
    Animated.parallel([
      Animated.timing(show, {
        delay: 2000,
        toValue: 1,
        duration: 1000,
        useNativeDriver: false
      }),
      Animated.timing(position, {
        toValue: -600,
        duration: 2000,
        useNativeDriver: false
      })
    ]).start(() =>
      Animated.timing(font, {
        toValue: 200,
        duration: 500,
        delay: 2000,
        useNativeDriver: false,
      }).start(() => setanimation(true))
    );
  }, [])
  if(!animation)
  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor="#142950"
        barStyle="light-content"
      />
      <View style={styles.viewContainer}>
        <Animated.Image
          style={[styles.imageRocket, { top: position }]}
          source={rocket}
        />
        <Animated.Text style={[styles.textHello, { opacity: show,  transform: [{scale: font}]}]} >
          Welcome
          </Animated.Text>

      </View>
    </>
  );
  else
  return(
    <GestureHandlerRootView style={{flex:1}}>
      <StatusBar
      animated={true}
      backgroundColor="#142950"
      barStyle="light-content"
      />
      <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          name={"Home"}
          component={Home}
          options={{title: 'My Rovers'}}
        />
        <Stack.Screen
          name={"Detail"}
          component={Detail}
          options={{title: 'Images'}}
        />
        <Stack.Screen
          name={"Rover"}
          component={Rover}
          options={{title: 'Add Rover'}}
        />
      </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  )
}

export default App;

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#142950"
  },
  textHello: {
    fontSize: 50,
    color: "white"
  },
  imageRocket: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  }
})