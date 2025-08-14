export async function registerUser(nama_user: string, password: string) {
  if (!nama_user || !password) {
    throw new Error("Nama user and password are required");
  }
  const response = await fetch("api/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nama_user,
      password,
    }),
  });
  return response.json();
}

export async function loginUser(nama_user: string, password: string) {
  if (!nama_user || !password) {
    throw new Error("Nama user and password are required");
  }
  const response = await fetch("api/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nama_user,
      password,
    }),
  });
  return response.json();
}
