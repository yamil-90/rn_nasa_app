
import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, StatusBar, Image, Animated } from 'react-native';
import rocket from "./app/assets/rocket.png"


const App = () => {
  const [animation, setanimation] = useState(false)
  const [show] = useState(new Animated.Value(0))
  const [position] = useState(new Animated.Value(700))

  useEffect(() => {
    Animated.parallel([
      Animated.timing(show, {
        delay: 2000,
        toValue: 1,
        duration: 1000,
        useNativeDriver: false
      }),
      Animated.timing(position, {
        toValue: -700,
        duration: 1000,
        useNativeDriver: false
      })
    ]).start(() =>
      Animated.timing(font, {
        toValue: 200,
        duration: 100,
        delay: 3000,
        useNativeDriver: false,
      }).start(() => setAnimated(true))
    );
  }, [])
  if(!animation)
  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor="#003b59"
        barStyle="light-content"
      />
      <View style={styles.viewContainer}>
        <Animated.Image
          source={rocket}
          style={[styles.imageRocket, { top: position }]}
        />
        <Animated.Text style={[styles.textHello, { opacity: show }]} >
          Welcome
          </Animated.Text>

      </View>
    </>
  );
  else
  return(
    
  )
}

export default App;

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "green"
  },
  textHello: {
    fontSize: 50,
    color: "white"
  },
  imageRocket: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  }
})