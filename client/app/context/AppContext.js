import React, {useState,useReducer,useEffect,createContext} from 'react';
import {zombieReducer} from '../reducer/zombieReducer'
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppContext=createContext() 
const storeData = async (jsonValue) => {
  try {
    
    await AsyncStorage.setItem('zombies', jsonValue?jsonValue:'')
 
  } catch (e) {
    // saving error
    console.log(`error storing data ${e}`)
  }
}


const getData = async () => {
  try {
  const jsonValue = await AsyncStorage.getItem('zombies')
  return jsonValue != null ? JSON.parse(jsonValue) : {};
  } catch(e) {
  // error reading value
  console.log(`error gettng data ${e}`)
  }
}


export const AppContextProvider=(props)=>{
   
    const [zombies,dispatch]=useReducer(zombieReducer,[],()=>{
   getData();

    });

    useEffect(()=>{

        storeData(JSON.stringify(zombies));
        
    },[zombies])




return(
    
<AppContext.Provider value={{zombies,dispatch}}>
{props.children}
</AppContext.Provider>

)

}
export default AppContext;