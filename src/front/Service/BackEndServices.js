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
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/signin`);
  const data = await response.json();
  if (!response.ok){
    throw new Error(data.error)
  };
  return data;
};