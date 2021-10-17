
import React ,{useEffect,useContext, useState}from 'react';
import { StyleSheet,View ,Text,ActivityIndicator,TouchableOpacity, Alert} from "react-native";
import {Colors} from 'react-native/Libraries/NewAppScreen';
import { ApolloProvider, Query, useQuery } from "react-apollo";
import AppContext from '../context/AppContext';
import { zombiesQuaratineLocation } from '../data/dummydata';
import { GET_ZOMBIES } from '../data/api';




const Main=({navigation})=>{
    const {zombies,dispatch}=useContext(AppContext);
    const {loading,error,data,refetch}= useQuery(GET_ZOMBIES,{manual:true});
    const [quarantineCount,setQuarantineCount]=useState([]);
    const countOccurrences = (arr, val) => arr.reduce((a, v) => (v.zombieLocation === val ? a + 1 : a), 0)
            

    useEffect(()=>{
         
        refetch().then((responseData)=>{
        console.log(responseData.data.zombies)
           dispatch({type:'GETALL_ZOMBIES',data:[...responseData.data.zombies]})
        })
        .catch((error)=>{
            Alert.alert(error)
        })
  
        return ()=>{
            
            console.log('cleanup')
        }
       

    },[])



    useEffect(()=>{
      if(zombies){
     console.log('zombies '+Object.keys(zombies))
    setQuarantineCount([]);
      zombies.map((item)=>{   
         setQuarantineCount(arr=>[...arr,{
                 location:item.zombieLocation,
                 count:countOccurrences(zombies, item.zombieLocation)
             }])
          
         })
      }
    },[zombies])
    

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