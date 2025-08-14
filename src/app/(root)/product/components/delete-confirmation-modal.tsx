"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (productId: number) => void;
  product: any;
}

export function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  product,
}: DeleteConfirmationModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    onConfirm(product.id);
    setIsLoading(false);
    onClose();
  };

  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-black/90 backdrop-blur-xl border border-red-500/30 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-red-400 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Delete Product
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="text-center">
            <img
              src={
                product.images?.[0] || "/placeholder.svg?height=100&width=100"
              }
              alt={product.name}
              className="w-20 h-20 object-cover rounded-lg mx-auto mb-3 border border-red-500/30"
            />
            <h3 className="text-lg font-semibold text-white">{product.name}</h3>
            <p className="text-gray-300">{product.category}</p>
          </div>

          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <p className="text-red-300 text-sm">
              <strong>Warning:</strong> This action cannot be undone. The
              product will be permanently deleted from your inventory.
            </p>
          </div>

          <div className="flex justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10 bg-transparent">
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={isLoading}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg shadow-red-500/25">
              {isLoading ? "Deleting..." : "Delete Product"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
