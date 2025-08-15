"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Kategori } from "@/types/type";

interface DeleteCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (id_kategori: string) => Promise<void>;
  category: Kategori | null;
}

export function DeleteCategoryModal({
  isOpen,
  onClose,
  onConfirm,
  category,
}: DeleteCategoryModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    if (!category) return;

    setIsLoading(true);
    try {
      await onConfirm(category.id_kategori.toString());
      onClose();
    } catch (error: any) {
      console.error("Error deleting category:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-modal border-white/20 text-white max-w-md">
        <div className="text-center">
          <div className="mb-4">
            <svg
              className="w-16 h-16 mx-auto text-red-500 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
          </div>

          <DialogHeader className="mb-4">
            <DialogTitle className="font-orbitron text-2xl font-bold text-white text-center">
              Delete Category
            </DialogTitle>
          </DialogHeader>

          <p className="text-gray-300 mb-2">
            Are you sure you want to delete "
            <span className="text-white font-semibold">
              {category?.nama_kategori}
            </span>
            "?
          </p>

          {category && category.produk.length > 0 && (
            <p className="text-yellow-400 text-sm mb-6">
              Warning: This category has {category.produk.length} product
              {category.produk.length !== 1 ? "s" : ""} associated with it.
            </p>
          )}

          <p className="text-gray-400 text-sm mb-6">
            This action cannot be undone.
          </p>

          <div className="flex justify-center gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
              className="border-gray-500 text-gray-300 hover:bg-gray-500/20 bg-transparent">
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={isLoading}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 glow-red">
              {isLoading ? (
                <>
                  <svg
                    className="w-4 h-4 animate-spin mr-2"
                    fill="none"
                    viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Deleting...
                </>
              ) : (
                "Delete Category"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
