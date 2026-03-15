export const initialStore = () => {
  const hasToken = !!localStorage.getItem("token");
  return {
    user: hasToken ? localStorage.getItem("michi_name") : null,
    michiColor: hasToken ? localStorage.getItem("michi_color") : null,
    message: null,
    Music: [],
    // michi:{}
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_hello":
      return {
        ...store,
        message: action.payload,
      };

    case "api_call":
      return {
        ...store,
        Music: action.payload,
      };
    case "login_user":
      return {
        ...store,
        user: action.payload,
      };
    case "logout_user":
      return {
        ...store,
        user: null,
        michiColor: null,
      };
    case "set_michi_color": // 👈 nuevo case
      return { ...store, michiColor: action.payload };
    // case "get_user":
    //   return {
    //     ...store,
    //     michi: action.payload
    //   };
    default:
      throw Error("Unknown action.");
  }
}
