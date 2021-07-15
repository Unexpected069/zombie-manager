
import React ,{useEffect,useContext, useState}from 'react';
import { StyleSheet,View ,Text,ActivityIndicator,TouchableOpacity, Alert} from "react-native";

import {Colors,} from 'react-native/Libraries/NewAppScreen';
import { ApolloProvider, Query, useQuery } from "react-apollo";
import UserContext from '../context/userContext';
import { zombiesQuaratineLocation } from '../data/dummydata';
import { GET_ZOMBIES } from '../data/api';








const Main=({navigation})=>{
   // const getQuarantineFacilities = useQuery(GET_QUARANTINE_FACILITIES);
const context=useContext(UserContext);

const {loading,error,data,refetch}= useQuery(GET_ZOMBIES,{manual:true});
const [quarantineCount,setQuarantineCount]=useState([]);

const countOccurrences = (arr, val) => arr.reduce((a, v) => (v.zombieLocation === val ? a + 1 : a), 0)
            

    useEffect(()=>{
         
        refetch().then((responseData)=>{
          console.log(Object.keys(responseData.data))
           context.setZombies([...responseData.data.zombies])

        })
        .catch((error)=>{
            Alert.alert(error)
        })
  
        return ()=>{
            
            console.log('cleanup')
        }
       

    },[])

    
    useEffect(()=>{
        if(context.zombies.length>0){
            setQuarantineCount([]);
        zombiesQuaratineLocation.map((item)=>{   
           // console.log(countOccurrences(context.zombies, item.quarantineLocation));    
            setQuarantineCount(arr=>[...arr,{
                    location:item.quarantineLocation,
                    count:countOccurrences(context.zombies, item.quarantineLocation)
                }])
             
            })
        }

    },[context.zombies])
    

const Section =({onPress,quarantineFacilitiesCount})=>{
        return (
        quarantineFacilitiesCount!=undefined?
        zombiesQuaratineLocation.map((item,index)=>{
        let obj = quarantineFacilitiesCount.find(o => o.location === item.quarantineLocation);
       return(
           <View key={index} >
          <TouchableOpacity 
          onPress={()=>onPress(item.quarantineLocation)}
          style={styles.sectionContainer}>
            <Text style={[
                styles.sectionTitle,{
                  color:  Colors.dark
                }
              ]}>
              {item.quarantineLocation}
            </Text>
           
                <Text style={[
                    styles.sectionTitle,{
                    color:  Colors.dark
                    }]}>
                    {obj!=undefined?obj.count:'0'}
                </Text>
      
          </TouchableOpacity>
          </View>
          )
        
        } 
          ):null
        );
      };
    
  
    const goToList=(value)=>{
        //console.log('awd '+value)

       navigation.navigate('List',{
           facility:value
       });
    }


    return (
    <View style={{flex:1,marginLeft:30}}>
        
         <Section
         onPress={goToList}
         quarantineFacilitiesCount={quarantineCount}/>
        
    </View>
    )
}


const styles = StyleSheet.create({
    sectionContainer: {
      marginTop: 32,
     // borderColor:'red',
     // borderWidth:1,
      paddingHorizontal: 24,
      justifyContent:'space-between',
      flexDirection:'row',
      width:300,
  
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
    },
    highlight: {
      fontWeight: '700',
    },
  });


export default Main;