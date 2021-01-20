import Axios from 'axios';
import { Button } from 'native-base';
import React,{useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import User from './components/User';

const URL = `https://randomuser.me/api`
const App = () =>{

  const [details, setDetails] = useState(null)

  const fetchDetails = async () =>{
    try {
      const {data} = await Axios.get(URL)
      const details = data.results[0]
      setDetails(details)

    } catch (error) {
      console.warn(error)
    }
  }

  useEffect(()=>{
    fetchDetails()
  },[])


  if(!details){
    return (
      <View style={styles.container}>
        <Text>Loading.</Text>
      </View>
    )
  }else{
    return (
      <>
      <View style={styles.container}>
        <User details={details}/>
        <View>
          <Button
          rounded
          style={styles.button}
          onPress={()=>fetchDetails()}
          >
            <Text style={{color:'#FFF'}}>New User</Text>
          </Button>
        </View>
      </View>
      </>
    )
  }


}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#222831"
  },

  button: {
    marginTop: 30,
    paddingHorizontal: 30
  }
})


export default App