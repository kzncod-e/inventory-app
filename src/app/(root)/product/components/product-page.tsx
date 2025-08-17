"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Search, Edit, Package, Trash2 } from "lucide-react";
import { CreateProductModal } from "./create-product-modal";
import { EditProductModal } from "./edit-prodoct-modal";
import { UpdateStockModal } from "./update-stock-modal";
import { DeleteConfirmationModal } from "./delete-confirmation-modal";
import {
  createProduct,
  deleteProduct,
  getProduct,
  updateProduct,
} from "@/lib/product";

import { Kategori, Product, Produk, StokReq } from "@/types/type";
import Navbar from "@/components/Navbar";
import { getCategories, updateStok } from "@/lib/category";

import { ProductRow } from "./table-row";

export default function ProductManagement() {
  const [products, setProducts] = useState<Produk[]>([]);

  const [category, setCategory] = useState<Kategori[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isStockModalOpen, setIsStockModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Produk>();
  const getAllCategories = async () => {
    try {
      const res = await getCategories();
      setCategory(res);
    } catch (error: any) {
      console.log("error while fetching categories", error.message);
    }
  };
  const getAllProduct = async () => {
    try {
      const res = await getProduct();
      setProducts(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCategories();
    getAllProduct();
  }, []);
  console.log("categories", category);

  const filteredProducts = products.filter(
    (product) =>
      product.nama_produk.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.kategori?.nama_kategori
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const handleCreateProduct = async (newProduct: Product) => {
    try {
      const res = await createProduct(newProduct);
      console.log("success while creating new product", res);
      await getAllProduct(); // Refresh product list after creation
    } catch (error: any) {
      console.log("error while createing new product", error.message);
    }
  };

  const handleEditProduct = async (
    id_kategori: string,
    id_produk: string,
    nama_produk: string,
    foto_produk: string[]
  ) => {
    try {
      const res = await updateProduct(
        id_kategori,
        id_produk,
        nama_produk,
        foto_produk
      );
      console.log("success while updating product", res);
      await getAllProduct(); // Refresh product list after updating
    } catch (error: any) {
      console.log("error while updating product", error.message);
    }
  };

  const handleUpdateStock = async ({ id_produk, jumlah_barang }: StokReq) => {
    try {
      const res = await updateStok(id_produk.toString(), jumlah_barang);
      console.log("success while updating stock", res);
      await getAllProduct();
    } catch (error: any) {
      console.log("error while updating stock", error.message);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      await deleteProduct(productId);
      console.log("Product deleted successfully");
      await getAllProduct(); // Refresh product list after deletion
    } catch (error) {
      console.log("Error deleting product:", error);
    }
  };

  const openEditModal = useCallback((product: Produk) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  }, []);

  const openStockModal = useCallback((product: Produk) => {
    setSelectedProduct(product);
    setIsStockModalOpen(true);
  }, []);

  const openDeleteModal = useCallback((product: Produk) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  }, []);

  return (
    <div className="min-h-screen  w-full neon-gradient-bg ">
      <Navbar className="mb-3 pt-3" />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r  from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
            Product Management
          </h1>
          <p className="text-purple-300">
            Manage your futuristic product inventory
          </p>
        </div>

        {/* Controls */}
        <Card className="mb-6 font-orbitron glassmorphism backdrop-blur-xl border-purple-500/30">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 h-4 w-4" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 glassmorphism border-purple-500/30 text-white focus:border-purple-400 focus:ring-purple-400/20"
                />
              </div>
              <Button
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg shadow-purple-500/25">
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Products Table */}
        <Card className="glassmorphism  font-orbitron backdrop-blur-xl border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-white">
              Products ({filteredProducts.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              {products.length === 0 ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="skeleton h-16 rounded"></div>
                  ))}
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="border-purple-500/30">
                      <TableHead className="text-purple-300">
                        Product Image
                      </TableHead>
                      <TableHead className="text-purple-300">
                        Product Name
                      </TableHead>
                      <TableHead className="text-purple-300">
                        Category
                      </TableHead>

                      <TableHead className="text-purple-300">Stock</TableHead>

                      <TableHead className="text-purple-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {filteredProducts.map((product) => (
                      <ProductRow
                        key={product.id_produk}
                        product={product}
                        onEdit={openEditModal}
                        onStock={openStockModal}
                        onDelete={openDeleteModal}
                      />
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Modals */}
        <CreateProductModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateProduct}
          categories={category}
        />

        <EditProductModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={handleEditProduct}
          product={selectedProduct ?? {}}
          categories={category}
        />

        <UpdateStockModal
          isOpen={isStockModalOpen}
          onClose={() => setIsStockModalOpen(false)}
          onSubmit={handleUpdateStock}
          product={selectedProduct}
        />

        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDeleteProduct}
          product={selectedProduct}
        />
      </div>
    </div>
  );
}
