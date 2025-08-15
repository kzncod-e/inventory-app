export async function getCategories() {
  try {
    const res = await fetch("/api/category", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }
    const categories = await res.json();
    return categories;
  } catch (error) {
    console.error(error);
    return [];
  }
}
export async function createCategory(nama_kategori: string) {
  try {
    const res = await fetch("/api/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nama_kategori }),
    });
    if (!res.ok) {
      throw new Error("Failed to create category");
    }
    const category = await res.json();
    return category;
  } catch (error) {
    console.error(error);
    return null;
  }
}
export async function updateCategory(
  id_kategori: string,
  nama_kategori: string
) {
  try {
    const res = await fetch(`/api/category`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id_kategori, nama_kategori }),
    });
    if (!res.ok) {
      throw new Error("Failed to update category");
    }
    const category = await res.json();
    return category;
  } catch (error) {
    console.error(error);
    return null;
  }
}
export async function deleteCategory(id_kategori: string) {
  try {
    const res = await fetch(`/api/category`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id_kategori }),
    });
    if (!res.ok) {
      throw new Error("Failed to delete category");
    }
    const category = await res.json();
    return category;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function updateStok(id_produk: string, jumlah_barang: number) {
  try {
    const res = await fetch(`/api/stok`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id_produk, jumlah_barang }),
    });
    if (!res.ok) {
      throw new Error("Failed to update stock");
    }
    const stok = await res.json();
    return stok.data;
  } catch (error: any) {
    console.error(error.message);
    return null;
  }
}
