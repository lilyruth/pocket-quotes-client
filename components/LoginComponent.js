import React, {useState} from 'react';
import { Text, View, StyleSheet, Image, Button, ActivityIndicator, TextInput, Alert} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {Formik} from 'formik';
import {  NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { addUserId, removeUserId } from '../redux/features/userId';
import { signedIn, signedOut } from '../redux/features/signedIn';
import { useSelector, useDispatch} from 'react-redux';
import baseUrl from '../baseUrl';
import axios from 'axios';

const Separator = () => (
 <View style={styles.separator} />
);
const LoginComponent = ({navigation}) => {
 let [errorText,setErrorText] = useState('error');
 let newColor = useSelector(state => state.newColor.value);
 const dispatch = useDispatch();

 const storeId = (info) => {
  dispatch(addUserId(info));
  console.log(info)
 }
 const dispatchSignIn = () => {
  dispatch(signedIn(true));
 }
 
const validateEmailAlert = () => {
  Alert.alert( 'Error', 'Invalid email address' ) 
}

const validatePasswordAlert = () => {
  Alert.alert( 'Error', 'Please only use letters and numbers' ) 
}

 const handleLogin = (loginInfo, setSubmitting) => {
   const url = baseUrl + 'users/login';

   axios.post(url, loginInfo)
    .then((response) => {
     const result = response.data;
     const {message, status, record} = result;

     if (status !== 'success') {
      setErrorText(message);
      tryAgainAlert();
     } else {
    
      storeId(record._id);
      console.log(record._id)
      dispatchSignIn();
       navigation.navigate('Home');

     }
     setSubmitting(false);
    })
    .catch(err => {
     console.log(err)
     setSubmitting(false);
     setErrorText(message);
     tryAgainAlert();
    })
 }
 
 const loginEmailAlert = () => {
  Alert.alert(  
    "Invalid entry",
    "Email must not be blank and can only include letters, numbers, @ and ."
  )
 }

 const loginPasswordAlert = () => {
  Alert.alert(
    "Invalid entry",
    "Password can only be numbers and letters and cannot be blank."
  )
 }

 const tryAgainAlert = () => {
  Alert.alert( 
    "Unsuccessful",
    `${errorText}: Please try again.`
  )
 }

 return(


  <LinearGradient
  colors={['white', newColor]}>
  
  <View style={styles.container}>
 
 
  <Image source={require('../assets/login.jpg')} style={styles.image} alt="Lotus flower" />
  <Text style={styles.title}>Login</Text>
  <Formik
  
    initialValues={{email: 'email address', password: 'password'}}
    onSubmit={(values, {setSubmitting}) => {
      if (values.email === '' ) {
       loginEmailAlert();
       setSubmitting(false);
      } else if (values.password === '') {
        loginPasswordAlert();
        setSubmitting(false);
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) { 
        validateEmailAlert();
        setSubmitting(false);
      } else if (!/[a-zA-Z0-9]/.test(values.password)) { 
        validatePasswordAlert();
        setSubmitting(false);
      }
      
      else {
       handleLogin(values, setSubmitting);
       values.email='';
       values.password='';
      }
      
    }}>
   {({handleChange, handleBlur, handleSubmit, isSubmitting, values}) => 
    (<View style={styles.form}>

   <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
   <MaterialCommunityIcons name='account-circle-outline' size={30} color='black' />
  
   <TextInput
     onChangeText={handleChange('email')}
     onBlur={handleBlur('email')}
     value={values.email} 
     style={{color: 'white', backgroundColor: 'black', marginLeft: 20, marginBottom: 10, width: 210, padding: 2, borderRadius: 5}}
     fontSize={18}
     keyboardType='email-address' />
    </View>

   <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
   <MaterialCommunityIcons name='key' size={30} color='black' />

   <TextInput
     onChangeText={handleChange('password')}
     onBlur={handleBlur('password')}
     value={values.password}

     style={{marginLeft: 20, marginBottom: 10, width: 210, color: 'white', backgroundColor: 'black', padding: 2, borderRadius: 5}}
     fontSize={18}
     secureTextEntry={true}
     />
    </View>
    <Separator/>
    <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>

    {!isSubmitting && 
   <Button onPress={handleSubmit} title='Submit' color='black' /> }

   {isSubmitting && <ActivityIndicator size='large' color='dodgerblue' />}


   </View>

   <Separator/>

   <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
   <Button onPress={() => navigation.navigate('Register')} title='Register' color='black'  />
   </View>
    
    </View>)}
  </Formik>
  
  </View>
  </LinearGradient>

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
 image: {
   borderRadius: 10,
   borderWidth: 4,
   borderColor: 'white',
   marginLeft: 'auto',
   marginRight: 'auto',
   marginTop: 50
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

export default LoginComponent;