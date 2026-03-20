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
  console.log("Respuesta signup:", data);
  if (response.ok) {
    return { success: true, data };
  } else {
    return { success: false, error: data.error || "Error al registrarse" };
  }
};

export const jamendoCall = async (dispatch) => {
  const response = await fetch(
    `https://api.jamendo.com/v3.0/tracks/?client_id=${JamendoUser}&format=json&limit=5&fuzzytags=lofi&order=popularity_month&include=musicinfo`,
  );
  const data = await response.json();
  if (!response.ok) {
    return console.log(data);
  }
  dispatch({ type: "api_call", payload: data.results });
};

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
  
  const clavePhaser = data.michi_accesorio
    ? `${data.michi_color}${data.michi_accesorio}`
    : data.michi_color;

  localStorage.setItem("token", data.token);
  localStorage.setItem("michi_color", clavePhaser); 
  localStorage.setItem("michi_accesorio", data.michi_accesorio || "");

  return {
    success: true,
    michi_color: data.michi_color,
    michi_accesorio: data.michi_accesorio,
    data,
  };
};

export const updateMichiColor = async (color) => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/get_michi`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ color }),
    },
  );
  const data = await response.json();
  if (!response.ok) {
    return { error: data.error || "Error al guardar" };
  }
  return { success: true, data };
};

export const updateMichiColorPhaser = (color) => {
  const token = localStorage.getItem("token");
  if (!token) return;
  fetch(`${import.meta.env.VITE_BACKEND_URL}/api/get_michi`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ color }),
  });
};

export const guardarPartida = async (score) => {
  const token = localStorage.getItem("token");
  const accesorio = localStorage.getItem("michi_accesorio") || null;

  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/get_partida`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ score, accesorio }),
    },
  );
  const data = await response.json();
  return data;
};

export const getRanking = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/ranking`,
  );
  const data = await response.json();
  return data;
};

export const guardarAccesorio = async (accesorio) => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/get_partida`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ accesorio: accesorio || null }),
    },
  );
  const data = await response.json();
  return data;
};
