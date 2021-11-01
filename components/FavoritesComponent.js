import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, Button, ScrollView} from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import {Formik} from 'formik';
import {  NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

 import {
  BalsamiqSans_400Regular
 } from '@expo-google-fonts/balsamiq-sans';
 import axios from 'axios';
 import baseUrl from '../baseUrl';
 import { LinearGradient } from 'expo-linear-gradient';
import { addUserId, removeUserId } from '../redux/features/userId';
import { signedIn, signedOut } from '../redux/features/signedIn';
import { useSelector, useDispatch} from 'react-redux';
import { quoteSlice } from '../redux/features/quote';

const Separator = () => (
 <View style={styles.separator} />
);
const FavoritesComponent = ({navigation}) => {

 const [isLoading, setLoading] = useState(true);
 const [favorites, setFavorites] = useState([]);
 let newColor = useSelector(state => state.newColor.value);
 let dispatch = useDispatch();
 let userId = useSelector(state => state.userId.value);


 const handleLogout = () => {
  dispatch(signedOut(null));
  dispatch(removeUserId());
 }


 const getQuotes = async () => {
  try {
    const url = baseUrl + 'quotes/' + userId;
    const response = await fetch(url);
    let quoteArray = await response.json();
    quoteArray = quoteArray.response.quotes;
    setFavorites(quoteArray);
   } catch (error) {
    console.error(error);
   } finally {
     setLoading(false);
   }
 }

 useEffect(() => {
  getQuotes();
 }, []);


const deleteQuote = async (item) => {
  console.log(item)
  try {
  const url = baseUrl + 'quotes/' + userId+ '/' + item
  console.log(url)
  const response = await fetch(url,
    { method: 'DELETE',
      headers: {
        'Content-type': 'applicaton/json'
      },
      body: null
    })
  console.log(response)

  } catch (error) {
    console.log(error)
  } finally {
  getQuotes();
  }
 }

 let quotesList = favorites.map((item, index) => 
     <View key={item._id} style={{borderTopColor: 'black', borderBottomColor: 'black', borderTopWidth: 1, borderBottomWidth: 1, marginTop: 2, minheight: 2225}}>
       <Text style={styles.quote}>{index+1}. {item.quote}</Text>
      <View>
      <Text style={styles.author}>{item.author}</Text>
      </View>
      <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly', marginBottom: 5, marginTop: 20}}> 
      <Button
     title="x"
     color='black'
     onPress={() => deleteQuote(item._id)}></Button></View></View>
 )

 return(
  <ScrollView>
    <LinearGradient
  colors={['white', newColor]}  style={{minHeight: 750}}>
  <View style={styles.container}>
 
  <Text style={styles.title}>Favorites</Text>

  <View>
      {isLoading &&  <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row', flexWrap: 'wrap'}}><Text style={styles.loading}>Loading</Text><MaterialCommunityIcons name='heart-outline' size={40} color='black' /></View>}
        
    <ScrollView>{quotesList}</ScrollView>
    
  </View>


   <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly', marginTop: 20, marginBottom: 20}}>
   <Button onPress={() => getQuotes()} title='Reload Favorites' color='black' />
  <Button onPress={handleLogout} title='Log out' color='black' />
  
   </View>

  
 
  </View>
  </LinearGradient>
  </ScrollView>
 );
}

const styles = StyleSheet.create({
 container: {
   alignContent: 'center',
   justifyContent: 'center',
   height: '100%',
   width: '95%',
   marginLeft: '2.5%'
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
  marginBottom: 50,
  marginLeft: '5%',
  paddingBottom: 0,
  fontFamily: 'BalsamiqSans_400Regular',
  backgroundColor: 'white',
  textAlignVertical: 'center',
  color: 'black',
  textShadowOffset: { width:1, height:1},
  textShadowRadius: 2,

},
  quote: {

    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '85%',
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'BalsamiqSans_400Regular',
    fontSize: 26,
    marginTop: 5,
    color: 'black',
    marginLeft: '7.5%',
    letterSpacing: 1.5,
    textAlignVertical: 'center',
    textShadowColor: 'white',
    textShadowOffset: { width:1, height:1},
    textShadowRadius: 2
 
 
  },
  author: {

    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 18,
    marginTop: 10,
    marginLeft: 50,
    marginRight: 50,
    color: 'black',
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
 separator: {
  marginVertical: 8,
  borderBottomColor: '#737373',
  borderBottomWidth: StyleSheet.hairlineWidth,
}

})

export default FavoritesComponent;