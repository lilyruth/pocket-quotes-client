import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, Image, Animated, Button, Easing, Pressable} from 'react-native';
import { useSelector, useDispatch} from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {Formik} from 'formik';
import {  NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Separator = () => (
 <View style={styles.separator} />
);
const BreatheComponent = () => {

 let newColor = useSelector(state => state.newColor.value);
 
 const [started, setStarted] = useState(false)
 const [animation, setAnimation] = useState(new Animated.Value(0));

 
 const ballAnimation = () => {
    const toValue = started ? 0 : 60;

    setStarted(!started)
    
    Animated.timing(animation, {
      toValue,
      easing: Easing.linear,
      duration: 60000,
      useNativeDriver: false
    }).start()
  
 }

 const handleBreathing = () => {
  ballAnimation();    
 }

 const handleText = () => {
  buttonText === 'start' ? setButtonText('pause') : setButtonText('start')
 }

 return(

  <LinearGradient
  colors={['white', newColor]}>
  
  <View style={styles.container}>
 
  <Image source={require('../assets/water.jpg')} style={styles.image} alt="waterfall" />
  <Text style={styles.title}>Breathe</Text>
  <View style={{alignItems: 'center', justifyContent: 'center', flex: .8}}>
    <Animated.View style={[{ 
        borderRadius: 100, 
        borderWidth: 5,
        borderColor: 'white',
        backgroundColor: animation.interpolate({
          inputRange: [0,7.5,15,22.5,30,37.5,45,52.5,60],
          outputRange: ['palevioletred', 'lightsalmon', 'gold', 'mediumseagreen', 'turquoise', 'powderblue', 'skyblue', 'plum', 'pink']
        }),
        width: animation.interpolate({
          inputRange: [0,7.5,15,22.5,30,37.5,45,52.5,60],
          outputRange: [100,200,100,200,100,200,100,200,100]
        }),
        height: animation.interpolate({
          inputRange: [0,7.5,15,22.5,30,37.5,45,52.5,60],
          outputRange: [100,200,100,200,100,200,100,200,100]
        }),
        borderRadius: 100 },
        {} 
        ]}>

    </Animated.View>
  </View>
  <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
   
   <Pressable><Button onPress={handleBreathing} title="be at peace" color="black" /></Pressable> 
  </View>
  </View>
  </LinearGradient>
 );
}

const styles = StyleSheet.create({
 container: {
   alignContent: 'center',
   justifyContent: 'center',
   width: '95%',
   height: '100%',
   marginLeft: '2.5%',
 },
 title: {
  borderBottomWidth: 2,
  borderTopWidth: 2,
  flexDirection: 'row',
  maxWidth: '90%',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  fontSize: 28,
  marginTop: 50,
  marginLeft: '5%',
  paddingBottom: 0,
  fontFamily: 'BalsamiqSans_400Regular',
  backgroundColor: 'white',
  textAlignVertical: 'center',
  color: 'black',
  textShadowOffset: { width:1, height:1},
  textShadowRadius: 2,

},
 image: {
   borderRadius: 10,
   borderWidth: 4,
   borderColor: 'white',
   marginLeft: 'auto',
   marginRight: 'auto',
   marginTop: 100,
   maxHeight: 300,
   
 },

 separator: {
  marginVertical: 8,
  borderBottomColor: '#737373',
  borderBottomWidth: StyleSheet.hairlineWidth,
},

})



export default BreatheComponent;