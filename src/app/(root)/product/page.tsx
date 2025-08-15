"use client";

import { useEffect, useState } from "react";
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
import { CreateProductModal } from "./components/create-product-modal";
import { EditProductModal } from "./components/edit-prodoct-modal";
import { UpdateStockModal } from "./components/update-stock-modal";
import { DeleteConfirmationModal } from "./components/delete-confirmation-modal";
import { createProduct, getProduct, updateProduct } from "@/lib/product";

import { Kategori, Product, Produk, StokReq } from "@/types/type";
import Navbar from "@/components/Navbar";
import { updateStok } from "@/lib/category";
import { get } from "http";

export default function ProductManagement() {
  const [products, setProducts] = useState<Produk[]>([]);
  const [productsi, setProductsi] = useState([]);
  const [category, setCategory] = useState<Kategori[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isStockModalOpen, setIsStockModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Produk>();
  const getAllProduct = async () => {
    try {
      const res = await getProduct();
      setProducts(res);
      const categories = res.map((product: Produk) => product.kategori);
      setCategory(categories);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllProduct();
  }, []);

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

  const handleDeleteProduct = (productId: number) => {
    setProducts((prev) => prev.filter((p) => p.id_produk !== productId));
  };

  const openEditModal = (product: Produk) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const openStockModal = (product: Produk) => {
    setSelectedProduct(product);
    setIsStockModalOpen(true);
  };

  const openDeleteModal = (product: Produk) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 ">
      <Navbar className="mb-3 pt-3" />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
            Product Management
          </h1>
          <p className="text-purple-300">
            Manage your futuristic product inventory
          </p>
        </div>

        {/* Controls */}
        <Card className="mb-6 bg-black/40 backdrop-blur-xl border-purple-500/30">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 h-4 w-4" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-black/50 border-purple-500/30 text-white focus:border-purple-400 focus:ring-purple-400/20"
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
        <Card className="bg-black/40 backdrop-blur-xl border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-white">
              Products ({filteredProducts.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-purple-500/30">
                    <TableHead className="text-purple-300">Product</TableHead>
                    <TableHead className="text-purple-300">Category</TableHead>

                    <TableHead className="text-purple-300">Stock</TableHead>

                    <TableHead className="text-purple-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow
                      key={product.id_produk}
                      className="border-purple-500/20 hover:bg-purple-500/5">
                      <TableCell className="text-white">
                        <div className="flex items-center space-x-3">
                          <img
                            src={product.foto_produk[0] || "/placeholder.svg"}
                            alt={product.nama_produk}
                            className="w-12 h-12 object-cover rounded border border-purple-500/30"
                          />
                          <div>
                            <div className="font-medium">
                              {product.nama_produk}
                            </div>
                            <div className="text-sm text-purple-300 truncate max-w-xs"></div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-purple-300">
                        {product.kategori?.nama_kategori || "N/A"}
                      </TableCell>

                      <TableCell className="text-white">
                        {product.stok
                          ? product.stok.length > 0 &&
                            product.stok
                              .map((s) => s.jumlah_barang)
                              .reduce((a, b) => a + b, 0)
                          : 0}{" "}
                        pcs
                      </TableCell>

                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openEditModal(product)}
                            className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openStockModal(product)}
                            className="border-blue-500/30 text-blue-300 hover:bg-blue-500/10">
                            <Package className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openDeleteModal(product)}
                            className="border-red-500/30 text-red-300 hover:bg-red-500/10">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
