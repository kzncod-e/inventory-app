export async function registerUser(nama_user: string, password: string) {
  if (!nama_user || !password) {
    throw new Error("Nama user and password are required");
  }
  const response = await fetch("api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nama_user,
      password,
    }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "register failed");
  }
  return data.message;
}

export async function loginUser(nama_user: string, password: string) {
  if (!nama_user || !password) {
    throw new Error("Nama user and password are required");
  }
  const response = await fetch("api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nama_user,
      password,
    }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }
  return data.message;
}
