export const initialStore=()=>{
  const hasToken = !!localStorage.getItem("token");
  return{
    user: hasToken ? localStorage.getItem("michi_name") : null,
    message: null,
    Music:[],
    // michi:{}
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
       Music: action.payload
      };
    case "login_user":
      return {
        ...store,
        user: action.payload
      }
    case "logout_user":
      return{
        ...store,
        user: null
      };
    // case "get_user":
    //   return {
    //     ...store,
    //     michi: action.payload
    //   };
    default:
      throw Error('Unknown action.');
  }    
}

