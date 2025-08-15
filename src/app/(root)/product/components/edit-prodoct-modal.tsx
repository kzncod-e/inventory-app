"use client";

import type React from "react";

import { useState, useEffect, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, Upload, GripVertical } from "lucide-react";
import { Kategori, Product, Produk } from "@/types/type";

interface EditProductFormData {
  id_produk: string | undefined;
  nama_produk: string | undefined;
  kategori: string | undefined;
  foto_produk: string[] | undefined;
}
interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    id_kategori: string,
    nama_produk: string,
    id_produk: string,
    foto_produk: string[]
  ) => void;
  product: Partial<Produk>;
  categories: Kategori[];
}
export function EditProductModal({
  isOpen,
  onClose,
  onSubmit,
  product,
  categories,
}: EditProductModalProps) {
  const [formData, setFormData] = useState<EditProductFormData>({
    id_produk: "",
    nama_produk: "",
    kategori: "",
    foto_produk: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [uniqueCategories, setUniqueCategories] = useState<Kategori[]>([]);
  useEffect(() => {
    if (product) {
      setFormData({
        id_produk: product.id_produk?.toString() ?? "",
        nama_produk: product.nama_produk,
        kategori: product.kategori?.nama_kategori,
        foto_produk: product.foto_produk,
      });
    }
    if (categories && categories.length > 0) {
      setUniqueCategories(() => {
        return categories.filter(
          (cat, index, self) =>
            index === self.findIndex((c) => c.id_kategori === cat.id_kategori)
        );
      });
    }
  }, [product, categories]);
  console.log("ini categories halaman edit:", categories);
  console.log("product:", product);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((formData.foto_produk?.length ?? 0) < 3) {
      alert("Please upload at least 3 images");
      return;
    }

    setIsLoading(true);

    onSubmit(
      formData.kategori ?? "",
      formData.nama_produk ?? "",
      formData.id_produk ?? "",
      formData.foto_produk ?? []
    );

    setIsLoading(false);
    onClose();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData((prev) => ({
          ...prev,
          foto_produk: [
            ...(prev.foto_produk ?? []),
            e.target?.result as string,
          ],
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      foto_produk: (prev.foto_produk ?? []).filter((_, i) => i !== index),
    }));
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null) return;

    const newImages = [...(formData.foto_produk ?? [])];
    const draggedImage = newImages[draggedIndex];
    newImages.splice(draggedIndex, 1);
    newImages.splice(index, 0, draggedImage);

    setFormData((prev) => ({ ...prev, foto_produk: newImages }));
    setDraggedIndex(index);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-black/90 backdrop-blur-xl border border-purple-500/30 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Edit Product
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-purple-300">Product Name</Label>
              <Input
                value={formData.nama_produk}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    nama_produk: e.target.value,
                  }))
                }
                className="bg-black/50 border-purple-500/30 text-white focus:border-purple-400 focus:ring-purple-400/20"
                required
              />
            </div>
            <div>
              <Label className="text-purple-300">Category</Label>
              <Select
                value={formData.kategori}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, kategori: value }))
                }>
                <SelectTrigger className="bg-black/50 border-purple-500/30 text-white">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-black/90 border-purple-500/30">
                  {uniqueCategories &&
                    uniqueCategories.length > 0 &&
                    uniqueCategories.map((category, index) => (
                      <SelectItem
                        key={category.id_kategori}
                        value={category.nama_kategori}>
                        {category.nama_kategori}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4"></div>

          <div>
            <Label className="text-purple-300">
              Product Images (Minimum 3 required)
            </Label>
            <div className="mt-2">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload-edit"
              />
              <label
                htmlFor="image-upload-edit"
                className="flex items-center justify-center w-full h-32 border-2 border-dashed border-purple-500/30 rounded-lg cursor-pointer hover:border-purple-400/50 transition-colors bg-black/20">
                <div className="text-center">
                  <Upload className="mx-auto h-8 w-8 text-purple-400 mb-2" />
                  <p className="text-purple-300">Click to upload more images</p>
                  <p className="text-xs text-purple-400">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </label>
            </div>

            {(formData.foto_produk?.length ?? 0) > 0 && (
              <div className="mt-4">
                <p className="text-sm text-purple-300 mb-2">
                  Product Images ({formData.foto_produk?.length ?? 0}/3 minimum)
                  - Drag to reorder
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {(formData.foto_produk ?? []).map((image, index) => (
                    <div
                      key={index}
                      draggable
                      onDragStart={() => handleDragStart(index)}
                      onDragOver={(e) => handleDragOver(e, index)}
                      onDragEnd={() => setDraggedIndex(null)}
                      className="relative group cursor-move">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Product ${index + 1}`}
                        className="w-full h-24 object-cover rounded border border-purple-500/30"
                      />
                      <div className="absolute top-1 left-1">
                        <GripVertical className="h-4 w-4 text-white/70" />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10 bg-transparent">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading || (formData.foto_produk?.length ?? 0) < 3}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg shadow-purple-500/25">
              {isLoading ? "Updating..." : "Update Product"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
