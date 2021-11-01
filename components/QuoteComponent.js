import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { addQuote } from '../redux/features/quote';
import { useSelector, useDispatch} from 'react-redux';
import { 
LovedbytheKing_400Regular 
} from '@expo-google-fonts/loved-by-the-king';
import { LinearGradient } from 'expo-linear-gradient';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const QuoteComponent = () => {
 const [isLoading, setLoading] = useState(true);
 const dispatch = useDispatch();
 let quote = useSelector(state => state.quote.value);


 const getQuote = async () => {
  try {
    const response = await fetch('https://api.quotable.io/random?maxLength=90');
    let quoteObject = await response.json();
    console.log(quoteObject);
    if (quoteObject.authorSlug === 'woody-allen') {
     const response = await fetch('https://api.quotable.io/random?maxLength=90');
     quoteObject = await response.json();
    }
    dispatch(addQuote(quoteObject));
   } catch (error) {
    console.error(error);
   } finally {
     setLoading(false);
   }
 }
 useEffect(() => {
  getQuote();
 }, []);


  return (
    
    <View>
      {isLoading &&  <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row', flexWrap: 'wrap'}}><Text style={styles.loading}>Loading</Text><MaterialCommunityIcons name='heart-outline' size={40} color='black' /></View>}
    <LinearGradient
      colors={['rgba(255,255,255, .7)', 'transparent']}>
    <Text style={styles.quote}>{quote.content}</Text>
    </LinearGradient>
    <Text style={styles.author}>{quote.author}</Text>
  
  </View>
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
   backgroundColor: 'rgba(0,0,0,.4)',
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
  
});

export default QuoteComponent;