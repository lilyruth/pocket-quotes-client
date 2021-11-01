import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, Share, Alert} from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import QuoteComponent from './QuoteComponent';
import { useSelector, useDispatch} from 'react-redux';
import { addNewColor } from '../redux/features/color';
import { 
LovedbytheKing_400Regular 
} from '@expo-google-fonts/loved-by-the-king';
import {
 BalsamiqSans_400Regular
} from '@expo-google-fonts/balsamiq-sans';
import axios from 'axios';
import baseUrl from '../baseUrl';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationActions, NavigationEvents } from 'react-navigation';
import { LinearGradient } from 'expo-linear-gradient';
import * as Notifications from 'expo-notifications';

const HomeComponent = ({navigation}) => {
  let randomColor;
  const dispatch = useDispatch();
  let userId = useSelector(state => state.userId.value);
  let signedIn = useSelector(state => state.signedIn.value);
  let quote = useSelector(state => state.quote.value);



  const getRandom = () => {
    let randomNumber = Math.floor(Math.random() * colors.length);
    randomColor = colors[randomNumber];
    dispatch(addNewColor(randomColor));  
    console.log(randomColor)
    return randomColor;
  };

  const colors = ['thistle', 'powderblue', '#CCFFCB', '#CEFDFF', '#BBD5ED', '#BEACEC', '#EDABB1', ];   
  
  getRandom(); 

  const quoteSaved = () => {
 
    Alert.alert(
     
      "Quote saved"
    )
   }

  const saveQuote = (quote, userId)=> {
    const url =  baseUrl + 'quotes/' + userId;
    let quoteObject = {};
    quoteObject.quote = quote.content;
    quoteObject.author = quote.author;
    axios.post(url, quoteObject)
    .then((response) => {
        console.log(response.status);
    })
    quoteSaved();
  } 
 

  const onShare = async () => {
    console.log(quote.content, quote.author)
    try {
      const result = await Share.share({
        message:
          `I wanted to share a quote with you: \n '${quote.content}' \n ${quote.author} \n Shared from 'Quote in My Pocket'` ,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
   
    <View>

      <LinearGradient
        colors={['rgba(255,255,255, 1)',randomColor]}
        style={styles.background}>

        <View>
        <Text style={[styles.title, {textShadowColor: randomColor, borderColor: randomColor}]}>Quote in My Pocket</Text>
        </View>
     
      <QuoteComponent/>
     
      <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
    
      { signedIn &&  <Button title=' Save' type="outline"  icon={<Icon name="heart" size={16}  color='palevioletred' />} buttonStyle={styles.buttonStyle} 
        onPress={() => saveQuote(quote, userId)}/> }
     

<Button title=' ' type="outline"  icon={<Icon name="calendar" size={16} color='black' />} buttonStyle={styles.buttonStyle3} 
        onPress={() => navigation.navigate("Schedule")}/>

<Button title=' Share' type="outline"  icon={<Icon name="share" size={16} color='dodgerblue' />} buttonStyle={styles.buttonStyle2} 
        onPress={onShare}/>

      </View>
     
      </LinearGradient>
    </View>   
  )
}

const styles = StyleSheet.create({
 
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
  background: {
    height: '100%'
  },
  buttonStyle: {
    backgroundColor: 'white',
    width: 70,
    marginTop: 30,
    marginLeft: 5,
    marginRight: 5
  },
  buttonStyle2: {
    backgroundColor: 'white',
    width: 70,
    marginTop: 30,
    marginLeft: 5,
    marginRight: 5,
  },
  buttonStyle3: {
    backgroundColor: 'white',
    width: 70,
    marginTop: 30,
    marginLeft: 5,
    marginRight: 5,
  },

});

export default HomeComponent;