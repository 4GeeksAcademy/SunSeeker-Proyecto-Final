const JamendoUser = "4a2b553e";

export const signup = async (user) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/signup`,
    {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json",
      },
    },
  );
  const data = await response.json();
  if (response.ok) {
    return { success: true, data };
  } else {
    return { success: false, error: data.error || "Error al registrarse" };
  }
};

export const jamendoCall = async (dispatch) => {
  const response = await fetch(
    `https://api.jamendo.com/v3.0/tracks/?client_id=${JamendoUser}&format=json&limit=5&fuzzytags=lofi&order=popularity_month`,
  );
  const data = await response.json();
  if (!response.ok) {
    return console.log(data);
  }
  dispatch({ type: "api_call", payload: data.results });
};

// export const SendScore = async () =>{
//   const response = await fetch ( `${import.meta.env.VITE_BACKEND_URL}/api/signup`,)
// }
export const signin = async (user) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/signin`,
    {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json",
      },
    },
  );
  const data = await response.json();
  if (!response.ok) {
    return { error: data.msg || data.error || "Error al iniciar sesión" };
  }
  localStorage.setItem("token", data.token);
  return { success: true, data };
};

export const queryRanking = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/partidas`,
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error);
  }
  return data;
};
