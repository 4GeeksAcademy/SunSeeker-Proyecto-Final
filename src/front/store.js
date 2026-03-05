export const initialStore=()=>{
  return{
    message: null,
    Music:[]
  }
}



export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'set_hello':
      return {
        ...store,
        message: action.payload
      };
      
    case 'api_call':

      return {
        ...store,
       Music: [... store.Music, action.payload ]
      };
    default:
      throw Error('Unknown action.');
  }    
}

