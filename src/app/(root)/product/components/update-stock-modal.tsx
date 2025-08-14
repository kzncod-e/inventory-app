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

interface UpdateStockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (productId: number, newStock: number) => void;
  product: any;
}

export function UpdateStockModal({
  isOpen,
  onClose,
  onSubmit,
  product,
}: UpdateStockModalProps) {
  const [stock, setStock] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setStock(product.stock || 0);
    }
  }, [product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    onSubmit(product.id, stock);
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
                product.images?.[0] || "/placeholder.svg?height=100&width=100"
              }
              alt={product.name}
              className="w-20 h-20 object-cover rounded-lg mx-auto mb-3 border border-purple-500/30"
            />
            <h3 className="text-lg font-semibold text-white">{product.name}</h3>
            <p className="text-purple-300">Current Stock: {product.stock}</p>
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
              <p className="text-sm text-purple-300">
                Stock Change: {stock - product.stock > 0 ? "+" : ""}
                {stock - product.stock}
              </p>
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
