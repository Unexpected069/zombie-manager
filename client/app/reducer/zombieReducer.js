export const zombieReducer=(state,action)=>{
    switch(action.type){
        case 'GETALL_ZOMBIES':
            return [
                ...action.data
            ]

        case 'ADD_ZOMBIES':
           // console.log('ADD_ZOMBIES '+action.data[1].zombieLocation);
        return [...state,
            {
            __typename:action.__typename,
             id: action.id ,
             zombieLocation: action.zombieLocation ,
             zombieName:  action.zombieName,
            }
        ]

        case 'REMOVE_ZOMBIES':
            console.log(action.id);
            return state.filter(zombies=>zombies.id!==action.data.id);
        default:
            return state;

    }

}