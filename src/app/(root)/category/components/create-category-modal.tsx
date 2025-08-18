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

interface CreateCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (nama_kategori: string, code_category: string) => Promise<void>;
}

export function CreateCategoryModal({
  isOpen,
  onClose,
  onSubmit,
}: CreateCategoryModalProps) {
  const [formData, setFormData] = useState({ name: "", code_category: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ name?: string }>({});

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleNameChange = (name: string) => {
    setFormData((prev) => ({
      ...prev,
      name,
    }));
  };
  const handleCodeChange = (code_category: string) => {
    setFormData((prev) => ({
      ...prev,
      code_category,
    }));
  };

  const validateForm = () => {
    const newErrors: { name?: string; code_category?: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Category name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await onSubmit(formData.name, formData.code_category);
      setFormData({ name: "", code_category: "" });
      setErrors({});
      onClose();
    } catch (error: any) {
      console.error("Error creating category:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({ name: "", code_category: "" });
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="glass-modal border-white/20 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="font-orbitron text-2xl font-bold text-white">
            Add Category
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label className="text-white font-semibold mb-2 block">
              Category Name *
            </Label>
            <Input
              value={formData.name}
              onChange={(e) => handleNameChange(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500/50"
              placeholder="Enter category name"
              required
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name}</p>
            )}
          </div>
          <div>
            <Label className="text-white font-semibold mb-2 block">
              Category Code
            </Label>
            <Input
              value={formData.code_category}
              onChange={(e) => handleCodeChange(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500/50"
              placeholder="Enter category code"
              required
            />
          </div>

          {/* <div>
            <Label className="text-white font-semibold mb-2 block">
              Category Slug *
            </Label>
            <Input
              value={formData.slug}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, slug: e.target.value }))
              }
              className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500/50"
              placeholder="category-slug"
              required
            />
            {errors.slug && (
              <p className="text-red-400 text-sm mt-1">{errors.slug}</p>
            )}
          </div> */}

          <div className="flex justify-end gap-4 pt-6 border-t border-white/20">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="border-gray-500 text-gray-300 hover:bg-gray-500/20 bg-transparent">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 glow-purple hover:glow-blue">
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
                  Adding...
                </>
              ) : (
                "Add Category"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
