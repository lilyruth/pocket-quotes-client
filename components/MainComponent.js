import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { addUserId, removeUserId } from '../redux/features/userId';
import { signedIn, signedOut } from '../redux/features/signedIn';
import { useSelector, useDispatch} from 'react-redux';

import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import FavoritesComponent from './FavoritesComponent';
import HomeComponent from './HomeComponent';
import LoginComponent from './LoginComponent';
import RegisterComponent from './RegisterComponent';
import BreatheComponent from './BreatheComponent';
import AddComponent from './AddComponent';
import ScheduleComponent from './ScheduleComponent';
import {  NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { 
LovedbytheKing_400Regular 
} from '@expo-google-fonts/loved-by-the-king';
import {
 BalsamiqSans_400Regular
} from '@expo-google-fonts/balsamiq-sans';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { LinearGradient } from 'expo-linear-gradient';


const Tab = createBottomTabNavigator();

const LoginStack = createNativeStackNavigator();

function LoginStackScreen() {
 return (

  <LoginStack.Navigator>
   <LoginStack.Screen 
   name="Login" 
   component={LoginComponent} 
   options={{ headerShown: false }}
  />
   <LoginStack.Screen 
    name="Register" 
    component={RegisterComponent} 
    options={{ headerShown: false }}
    />
   </LoginStack.Navigator>

 )
}

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
 return (
   <HomeStack.Navigator>
     <HomeStack.Screen 
         name="Home" 
         component={HomeComponent} 
         options={{ headerShown: false }}
         />
     <HomeStack.Screen 
    name="Schedule" 
    component={ScheduleComponent} 
    options={{ headerShown: false }}
    />
   </HomeStack.Navigator>
 )
}



const FavoritesStack = createNativeStackNavigator();

function FavoritesStackScreen() {
 return (
   <FavoritesStack.Navigator>
     <FavoritesStack.Screen 
         name="Favorites" 
         component={FavoritesComponent} 
         options={{ headerShown: false }}
         />
   </FavoritesStack.Navigator>
 )
}

const BreatheStack = createNativeStackNavigator();

function BreatheStackScreen() {
 return (
   <BreatheStack.Navigator>
     <BreatheStack.Screen 
         name="Breathe" 
         component={BreatheComponent} 
         options={{ headerShown: false }}
         />
   </BreatheStack.Navigator>
 )
}

const AddStack = createNativeStackNavigator();

function AddStackScreen() {
 return (
   <AddStack.Navigator>
     <AddStack.Screen 
         name="Add Quote" 
         component={AddComponent} 
         options={{ headerShown: false }}
         />
   </AddStack.Navigator>
 )
}

export default function MainComponent() {

 
 let signedIn = useSelector(state => state.signedIn.value);
 let newColor = useSelector(state => state.newColor.value);
 console.log(newColor)

 return (
  <NavigationContainer>
   <Tab.Navigator 
     screenOptions ={({route}) => ({ headerShown: false,
     
     tabBarIcon: ({ focused , color , size }) => {
      let iconName;
      let iconColor;

      if (route.name === 'Login') {
       iconName = 'login-variant';
      } else if (route.name === 'Home') {
       iconName = 'lightbulb-outline';
      } else if (route.name === 'Favorites') {
       iconName = 'bookmark-multiple';
      } else if (route.name === 'Breathe') {
       iconName = 'spa-outline';
      } else if (route.name === 'Add Quote') {
       iconName = 'plus-box-outline';
      }

      if (focused) {
       iconColor = newColor
      } else {
       iconColor = 'black'
      }

      return (
       <MaterialCommunityIcons name={iconName} color={iconColor} size={30} style={{paddingTop: 2}} />
      )},
     tabBarActiveTintColor: newColor,
     tabBarInactiveTintColor: 'black', 
     tabBarActiveBackgroundColor: 'black',
     tabBarInactiveBackgroundColor: newColor,
     tabBarLabelStyle: { fontSize: 14 }
     
  
     })}>

     {(!signedIn) ? (
       <>
       <Tab.Screen name="Login" component={LoginStackScreen} />
       <Tab.Screen name="Home" component={HomeStackScreen} />
       <Tab.Screen name="Breathe" component={BreatheStackScreen} />
       </>
     ) : (
      <>
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Favorites" component={FavoritesStackScreen} />
      <Tab.Screen name="Add Quote" component={AddStackScreen} />
      <Tab.Screen name="Breathe" component={BreatheStackScreen} />
      </>
     )} 

   
   
     </Tab.Navigator>
  </NavigationContainer>
 )
}


const styles = StyleSheet.create({

 quote: {

   flexDirection: 'row',
   alignItems: 'center',
   maxWidth: '85%',
   minHeight: '35%',
   justifyContent: 'center',
   textAlign: 'center',
   fontFamily: 'LovedbytheKing_400Regular',
   fontSize: 40,
   marginTop: 80,
   color: 'black',
   marginLeft: '7.5%',
   letterSpacing: 1.5,
   lineHeight: 50,
   textAlignVertical: 'center',
   textShadowColor: 'white',
   textShadowOffset: { width:1, height:1},
   textShadowRadius: 2


 },
 author: {
  backgroundColor: 'rgba(0,0,0,.3)',
  borderColor: 'white',
  borderBottomWidth: 2,
  borderTopWidth: 2,
   maxWidth: '70%',
   flexDirection: 'row',
   alignItems: 'center',
   justifyContent: 'center',
   textAlign: 'center',
   fontSize: 18,
   marginTop: 10,
   color: 'white',
   marginLeft: '15%',
   letterSpacing: 5,
   lineHeight: 28,
   textAlignVertical: 'center',
   fontFamily: 'BalsamiqSans_400Regular'
 },
 loading: {
  flexDirection: 'row',
  alignItems: 'center',
  maxWidth: '85%',
  minHeight: '35%',
  justifyContent: 'center',
  textAlign: 'center',
  fontFamily: 'LovedbytheKing_400Regular',
  fontSize: 40,
  marginTop: 80,
  color: 'black',
  marginLeft: '7.5%',
  letterSpacing: 1.5,
  lineHeight: 50,
  textAlignVertical: 'center',
  textShadowColor: 'white',
  textShadowOffset: { width:1, height:1},
  textShadowRadius: 2
 },
 background: {
  height: '100%'
},
buttonStyle: {
  backgroundColor: 'white',
  width: 80,
  marginTop: 60,
  marginLeft: 85,
  marginRight: 27
},
buttonStyle2: {
  backgroundColor: 'white',
  width: 80,
  marginTop: 60,
  marginRight: 85,
  marginLeft: 27
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
 marginTop: 100,
 marginBottom: 60,
 marginLeft: '5%',
 paddingBottom: 0,
 fontFamily: 'BalsamiqSans_400Regular',
 backgroundColor: 'white',
 textAlignVertical: 'center',
 color: 'black',
 textShadowOffset: { width:1, height:1},
 textShadowRadius: 2,


},
});