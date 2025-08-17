"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreateCategoryModal } from "./components/create-category-modal";
import { EditCategoryModal } from "./components/edit-category-modal";
import { DeleteCategoryModal } from "./components/delete-category-modal";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "@/lib/category";
import { Kategori } from "@/types/type";
import Navbar from "@/components/Navbar";
import CategoryRow from "./components/category-row";
import { getAllCategories } from "./utils";

export default function CategoryManagement() {
  const [categories, setCategories] = useState<Kategori[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<Kategori[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Kategori | null>(
    null
  );

  // Toast state
  const [toasts, setToasts] = useState<
    Array<{ id: number; message: string; type: "success" | "error" }>
  >([]);

  const showToast = (
    message: string,
    type: "success" | "error" = "success"
  ) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  };

  useEffect(() => {
    getAllCategories({
      setIsLoading,
      setCategories,
    });
  }, []);

  useEffect(() => {
    const filtered = categories.filter((category) =>
      category.nama_kategori.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCategories(filtered);
  }, [categories, searchTerm]);

  const handleCreateCategory = async (nama_kategori: string) => {
    try {
      const res = await createCategory(nama_kategori);
      if (res) {
        showToast("Kategori berhasil ditambahkan", "success");
        await getAllCategories({
          setIsLoading,
          setCategories,
        });
      }
      return res;
    } catch (error: any) {
      showToast("Gagal menambah kategori: " + error.message, "error");
      console.log("Error creating category:", error.message);
      return null;
    }
  };

  const handleEditCategory = async (
    id_kategori: string,
    nama_kategori: string
  ) => {
    try {
      const res = await updateCategory(id_kategori, nama_kategori);
      if (res) {
        showToast("Kategori berhasil diubah", "success");
        await getAllCategories({
          setIsLoading,
          setCategories,
        });
      }
      return res;
    } catch (error: any) {
      showToast("Gagal mengubah kategori: " + error.message, "error");
      console.log("Error updating category:", error.message);
      return null;
    }
  };

  const handleDeleteCategory = async (id_kategori: string) => {
    try {
      await deleteCategory(id_kategori);
      showToast("Kategori berhasil dihapus", "success");
      await getAllCategories({
        setIsLoading,
        setCategories,
      });
    } catch (error: any) {
      showToast("Gagal menghapus kategori: " + error.message, "error");
      console.log("error happen while deleting category", error.message);
    }
  };

  return (
    <>
      <div className="neon-gradient-bg relative font-orbitron  min-h-screen ">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="glass rounded-2xl p-6 mb-8 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-orbitron text-3xl font-bold text-white mb-2">
                  Category Management
                </h1>
                <p className="text-purple-200">
                  Organize your products with precision
                </p>
              </div>
              <Button
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 glow-purple hover:glow-blue">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"></path>
                </svg>
                Add Category
              </Button>
            </div>
          </div>

          {/* Search and Table Container */}
          <div className="glass rounded-2xl p-6 shadow-2xl">
            {/* Search */}
            <div className="mb-6">
              <Input
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-md bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500/50"
              />
            </div>

            {/* Loading State */}
            {categories.length === 0 ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="skeleton h-16 rounded"></div>
                ))}
              </div>
            ) : filteredCategories.length === 0 ? (
              /* Empty State */
              <div className="text-center py-16">
                <svg
                  className="w-24 h-24 mx-auto text-purple-400 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                </svg>
                <h3 className="font-orbitron text-2xl font-bold text-white mb-4">
                  {searchTerm ? "No Categories Found" : "No Categories Yet"}
                </h3>
                <p className="text-purple-200 mb-8">
                  {searchTerm
                    ? `No categories match "${searchTerm}"`
                    : "Start organizing your products by creating your first category"}
                </p>
                {!searchTerm && (
                  <Button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 glow-purple hover:glow-blue">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4v16m8-8H4"></path>
                    </svg>
                    Add Your First Category
                  </Button>
                )}
              </div>
            ) : (
              /* Categories Table */
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-4 px-4 text-white font-semibold">
                        Category Name
                      </th>

                      <th className="text-left py-4 px-4 text-white font-semibold">
                        Products
                      </th>

                      <th className="text-left py-4 px-4 text-white font-semibold">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCategories.map((category) => (
                      <CategoryRow
                        key={category.id_kategori}
                        category={category}
                        onEdit={(cat) => {
                          setSelectedCategory(cat);
                          setIsEditModalOpen(true);
                        }}
                        onDelete={(cat) => {
                          setSelectedCategory(cat);
                          setIsDeleteModalOpen(true);
                        }}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Modals */}
        <CreateCategoryModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateCategory}
        />

        <EditCategoryModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedCategory(null);
          }}
          onSubmit={handleEditCategory}
          category={selectedCategory}
        />

        <DeleteCategoryModal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setSelectedCategory(null);
          }}
          onConfirm={handleDeleteCategory}
          category={selectedCategory}
        />

        {/* Toast Container */}
        <div className="fixed top-4 right-4 z-50 space-y-2">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className={`toast glass rounded-lg p-4 text-white shadow-lg ${
                toast.type === "success" ? "glow-green" : "glow-red"
              } show`}>
              <div className="flex items-center gap-3">
                <svg
                  className={`w-5 h-5 ${
                    toast.type === "success" ? "text-green-400" : "text-red-400"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  {toast.type === "success" ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"></path>
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"></path>
                  )}
                </svg>
                <span>{toast.message}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
