"use client";

import type React from "react";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Minus, Plus } from "lucide-react";
import { Produk, StokReq } from "@/types/type";

interface UpdateStockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: ({ id_produk, jumlah_barang }: StokReq) => void;
  product: Produk | undefined;
}

export function UpdateStockModal({
  isOpen,
  onClose,
  onSubmit,
  product,
}: UpdateStockModalProps) {
  const [stock, setStock] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const handleStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStock(Number(e.target.value));
  };
  useEffect(() => {
    if (product) {
      setStock(
        product.stok
          ? product.stok.length > 0
            ? product.stok
                .map((s) => s.jumlah_barang)
                .reduce((a, b) => a + b, 0)
            : 0
          : 0
      );
    }
  }, [product]);
  console.log(product, "ini produk");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    onSubmit({ id_produk: product?.id_produk, jumlah_barang: stock });
    setIsLoading(false);
    onClose();
  };

  const incrementStock = () => {
    setStock((prev) => prev + 1);
  };

  const decrementStock = () => {
    setStock((prev) => Math.max(0, prev - 1));
  };

  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-black/90 backdrop-blur-xl border border-purple-500/30 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Update Stock
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="text-center">
            <img
              src={
                product.foto_produk[0] ||
                "/placeholder.svg?height=100&width=100"
              }
              alt={product.nama_produk}
              className="w-20 h-20 object-cover rounded-lg mx-auto mb-3 border border-purple-500/30"
            />
            <h3 className="text-lg font-semibold text-white">
              {product.nama_produk}
            </h3>
            <p className="text-purple-300">Current Stock: {stock}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label className="text-purple-300">New Stock Quantity</Label>
              <div className="flex items-center space-x-3 mt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={decrementStock}
                  className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10 bg-transparent">
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  type="number"
                  value={stock}
                  onChange={(e) =>
                    setStock(Math.max(0, Number.parseInt(e.target.value) || 0))
                  }
                  className="bg-black/50 border-purple-500/30 text-white text-center focus:border-purple-400 focus:ring-purple-400/20"
                  min="0"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={incrementStock}
                  className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10 bg-transparent">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <label className="text-sm text-purple-300">Stock:</label>
                <input
                  type="number"
                  value={stock}
                  onChange={handleStockChange}
                  className="w-20 px-2 py-1 text-sm bg-purple-900/30 border border-purple-500/30 rounded text-purple-200 focus:outline-none focus:border-purple-400"
                />
              </div>
              <p className="text-sm text-purple-300">
                New Status: {stock > 0 ? "In Stock" : "Out of Stock"}
              </p>
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
                disabled={isLoading}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg shadow-purple-500/25">
                {isLoading ? "Updating..." : "Update Stock"}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
