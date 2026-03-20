export const initialStore = () => {
  const COLORES_VALIDOS = ["Naranja", "Blanco", "Negro"];
  const ACCESORIOS_VALIDOS = ["Gafas", "Sombrero"];

  const savedColor = localStorage.getItem("michi_color");
  const savedAccesorio = localStorage.getItem("michi_accesorio");
  const hasToken = !!localStorage.getItem("token");

  return {
    user: hasToken ? localStorage.getItem("michi_name") : null,
    michiColor: COLORES_VALIDOS.includes(savedColor) ? savedColor : "Naranja",
    michiAccesorio: ACCESORIOS_VALIDOS.includes(savedAccesorio)
      ? savedAccesorio
      : null,
    message: null,
    Music: [],
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
        michiAccesorio: null,
      };
    case "set_michi_accesorio":
      return {
        ...store,
        michiAccesorio: action.payload,
      };
    case "set_michi_color":
      return { ...store, michiColor: action.payload };
    default:
      throw Error("Unknown action.");
  }
}
