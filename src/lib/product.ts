import { Product, Produk } from "@/types/type";

export const getProduct = async () => {
  const response = await fetch("api/product", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  const data = await response.json();
  return data.data;
};

export const createProduct = async (product: Product) => {
  const response = await fetch("api/product", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  if (!response.ok) {
    throw new Error("Failed to create product");
  }
  const data = await response.json();
  return data.data;
};
export const updateProduct = async (
  id_kategori: string,
  nama_produk: string,
  id_produk: string,
  foto_produk: string[]
) => {
  const response = await fetch(`api/product/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id_kategori,
      nama_produk,
      id_produk,
      foto_produk,
    }),
  });
  if (!response.ok) {
    throw new Error("Failed to update product");
  }
  const data = await response.json();
  return data.data;
};
