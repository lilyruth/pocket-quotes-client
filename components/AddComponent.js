import React, {useState} from 'react';
import { Text, View, StyleSheet, Image, Button, Alert, TextInput, ScrollView } from 'react-native';
import { useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {Formik} from 'formik';
import {  NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import baseUrl from '../baseUrl';
import { NavigationActions, NavigationEvents } from 'react-navigation';

const Separator = () => (
 <View style={styles.separator} />
);
const AddComponent = ({navigation}) => {
 const userId = useSelector(state => state.userId.value);

 let newColor = useSelector(state => state.newColor.value);
 
 const [saved, setSaved] = useState(false);

 const sendQuote = (values)=> {
  const url = baseUrl + 'quotes/' + userId;
  console.log(values)
  axios.post(url, values)
  
  .then((response) => {
      console.log(response.status);
      setSaved(true); 
  })
  navigation.navigate('Favorites');
} 
const validateAlert = () => {
  Alert.alert(
    "Invalid entry",
    "Please only use letters, numbers, periods, spaces and dashes."
  )
 }
 return(
  
  <LinearGradient
  colors={['white', newColor]}>
  
  <ScrollView style={styles.container}>
 
  <Image source={require('../assets/stones.jpeg')} style={styles.image} alt="Lotus flower" />
  <Text style={styles.title}>Add a Quote</Text>
  <Formik
  
    initialValues={{quote: '', author: ''}}
    onSubmit={(values) => {
     if (values.quote === '' || values.author === '') {
      Alert.alert ( "Both quote and author are required");
     } else if (!/[a-zA-Z0-9 .,-]*/.test(values.quote) || !/[a-zA-Z0-9 .-]*/.test(values.author)) {   
       validateAlert();   
     } else {
      sendQuote(values);
      values.author='';
      values.quote='';
     }
   }}>
   {({handleChange, handleBlur, handleSubmit, values}) => 
    (<View style={styles.form}>

<View style={{flexDirection: 'row', flexWrap: 'wrap'}}>

  
   <TextInput
     onChangeText={handleChange('quote')}
     onBlur={handleBlur('quote')}
     value={values.quote} 
     placeholder='Write your quote here'
     style={{marginBottom: 10, backgroundColor: 'white', padding: 2, borderRadius: 5}}
     fontSize={18}
     multiline={true}
     width={275}
     height={150}
    />
    </View>

   <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
   
  
   <TextInput
     onChangeText={handleChange('author')}
     onBlur={handleBlur('author')}
     value={values.author} 
     placeholder='author'
     style={{marginBottom: 10, backgroundColor: 'white', padding: 2, borderRadius: 5}}
     fontSize={18}
     width={275}
     />
    </View>


    <Separator/>
    <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
   <Button onPress={handleSubmit} title='Submit' color='black' />
  
   </View>
    
    </View>)}
  </Formik>
  </ScrollView>
  </LinearGradient>
 );
}

const styles = StyleSheet.create({
 container: {
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
 image: {
   borderRadius: 10,
   borderWidth: 4,
   borderColor: 'white',
   marginLeft: 'auto',
   marginRight: 'auto',
   marginTop: 100,
   maxHeight: 300,
   
 },
 form: {
   fontSize: 16,
   width: '75%', 
   marginLeft: 'auto',
   marginRight: 'auto',
   lineHeight: 30,
   textAlign: 'justify'

 },
 separator: {
  marginVertical: 8,
  borderBottomColor: '#737373',
  borderBottomWidth: StyleSheet.hairlineWidth,
}

})

export default AddComponent;