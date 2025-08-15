"use client";

import type React from "react";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, Upload, GripVertical } from "lucide-react";
import { Kategori, Product } from "@/types/type";

import { uploadFiles } from "@/lib/uploadthing";

interface CreateProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (product: Product) => void;
  categories: Kategori[];
}

export function CreateProductModal({
  isOpen,
  onClose,
  onSubmit,
  categories,
}: CreateProductModalProps) {
  const [formData, setFormData] = useState<Product>({
    nama_produk: "",
    id_kategori: 0,
    foto_produk: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [imagesUrls, setImagesUrls] = useState<string[]>([]);
  const uniqueCategories = categories.filter(
    (cat, index, self) =>
      index === self.findIndex((c) => c.id_kategori === cat.id_kategori)
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData?.foto_produk.length < 3) {
      alert("Please upload at least 3 images");
      return;
    }

    setIsLoading(true);

    try {
      const result = await uploadFiles("imageUploader", {
        files: uploadedImages, // File[]
      });

      let urls: string[] = [];
      if (result.length !== 0) {
        urls = result.map((el) => el.ufsUrl);
        setImagesUrls(urls);
      }

      if (urls.length > 0) {
        onSubmit({
          nama_produk: formData.nama_produk,
          id_kategori: formData.id_kategori,
          foto_produk: urls,
        });
      } // Uncomment when ready
    } catch (error: any) {
      console.log("error happen while creating new product", error.message);
    } finally {
      setFormData({
        nama_produk: "",
        id_kategori: 0,
        foto_produk: [],
      });
      setUploadedImages([]);
      setIsLoading(false);
      onClose();
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploadedImages((prev) => [...prev, ...files]);

    Promise.all(
      files.map(
        (file) =>
          new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target?.result as string);
            reader.onerror = (err) => reject(err);
            reader.readAsDataURL(file);
          })
      )
    ).then((images) => {
      setFormData((prev) => ({
        ...prev,
        foto_produk: [...prev.foto_produk, ...images],
      }));
    });
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      foto_produk: prev.foto_produk.filter((_, i) => i !== index),
    }));
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null) return;

    const newImages = [...formData.foto_produk];
    const draggedImage = newImages[draggedIndex];
    newImages.splice(draggedIndex, 1);
    newImages.splice(index, 0, draggedImage);

    setFormData((prev) => ({ ...prev, foto_produk: newImages }));
    setDraggedIndex(index);
  };
  const handleCreateProduct = () => {};
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-black/90 backdrop-blur-xl border border-purple-500/30 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Create New Product
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
                value={formData.id_kategori.toString()}
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    id_kategori: Number(value),
                  }))
                }>
                <SelectTrigger className="bg-black/50 border-purple-500/30 text-white">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-black/90 text-fuchsia-100 border-purple-500/30">
                  {uniqueCategories.map((category, index) => (
                    <SelectItem
                      key={`category-${index}`}
                      value={category.id_kategori.toString()}>
                      {category.nama_kategori}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-purple-300">Stock Quantity</Label>
              <Input
                type="number"
                value={formData.stock}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, stock: e.target.value }))
                }
                className="bg-black/50 border-purple-500/30 text-white focus:border-purple-400 focus:ring-purple-400/20"
                required
              />
            </div>
          </div> */}

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
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="flex items-center justify-center w-full h-32 border-2 border-dashed border-purple-500/30 rounded-lg cursor-pointer hover:border-purple-400/50 transition-colors bg-black/20">
                <div className="text-center">
                  <Upload className="mx-auto h-8 w-8 text-purple-400 mb-2" />
                  <p className="text-purple-300">Click to upload images</p>
                  <p className="text-xs text-purple-400">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </label>
            </div>

            {formData.foto_produk.length > 0 && (
              <div className="mt-4">
                <p className="text-sm text-purple-300 mb-2">
                  Uploaded Images ({formData.foto_produk.length}/3 minimum) -
                  Drag to reorder
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {formData.foto_produk.map((image, index) => (
                    <div
                      key={`image-${index}`}
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
              disabled={isLoading || formData.foto_produk.length < 3}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg shadow-purple-500/25">
              {isLoading ? "Creating..." : "Create Product"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
