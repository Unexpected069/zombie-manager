import React, {useState} from 'react';

const UserContext=React.createContext(true);

export const UserProvider=({...props})=>{
   
const [quarantineFacility,setQuarantineFacility]=useState([]);
const [zombies,setZombies]=useState([]);

return(
    
<UserContext.Provider value={{
    quarantineFacility,setQuarantineFacility,
    zombies,setZombies}}>

{props.children}

</UserContext.Provider>

)

}
export default UserContext;