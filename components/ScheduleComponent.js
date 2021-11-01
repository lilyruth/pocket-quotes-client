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


const ScheduleComponent = ({navigation}) => {
 let [time, setTime] = useState()
 let newColor = useSelector(state => state.newColor.value);


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
  <Text style={styles.title}>Schedule Notifications</Text>

  <View>
   <Text style={{textAlign: 'center', fontSize: 18}}>Pick a time:</Text>

   <Formik  
   initialValues={{ 
     time: '',
   }}
   
   onSubmit={(values) => {
    console.log(values["time"]);
    setTime(values["time"]) }}>
   
   {({handleChange, handleBlur, handleSubmit, values}) => 
    (<View style={styles.form}>

<View style={{flexDirection: 'row', flexWrap: 'wrap', textAlign: 'center', justifyContent: 'center'}}>

  
   <TextInput
     onChangeText={handleChange('time')}
     onBlur={handleBlur('time')}
     value={values.time} 
     style={{margin: 10, backgroundColor: 'white', padding: 2, borderRadius: 5, textAlign: 'center'}}
     fontSize={18}
     multiline={false}
     width={150}
    />
    </View>


    <Separator/>
    <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
   <Button onPress={handleSubmit} title='Submit' color='black' />
  
   </View>
    
    </View>)}



</Formik>
   
  </View>
  
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

export default ScheduleComponent;