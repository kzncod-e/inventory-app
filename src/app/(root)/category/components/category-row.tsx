import React from "react";
import { Button } from "@/components/ui/button";
import { Kategori } from "@/types/type"; // sesuaikan path type

interface CategoryRowProps {
  category: Kategori;
  onEdit: (category: Kategori) => void;
  onDelete: (category: Kategori) => void;
}

const CategoryRow = React.memo(
  ({ category, onEdit, onDelete }: CategoryRowProps) => {
    return (
      <tr className="border-b font-orbitron border-white/10 hover:bg-white/5 transition-colors">
        <td className="py-4 px-4">
          <span className="text-white font-medium">
            {category.nama_kategori}
          </span>
        </td>
        <td className="py-4 px-4">
          <span className="text-white font-medium">
            {category.code_category}
          </span>
        </td>

        <td className="py-4 px-4">
          <span
            className={`font-semibold ${
              category.produk && category.produk.length > 0
                ? "text-green-400"
                : category.produk && category.produk.length === 0
                ? "text-yellow-400"
                : "text-gray-400"
            }`}>
            {category.produk.length}
          </span>
        </td>

        <td className="py-4 px-4">
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onEdit(category)}
              className="text-blue-400 hover:text-blue-300 hover:bg-blue-400/10">
              {/* Edit Icon */}
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
            </Button>

            <Button
              size="sm"
              variant="ghost"
              onClick={() => onDelete(category)}
              className="text-red-400 hover:text-red-300 hover:bg-red-400/10">
              {/* Delete Icon */}
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
            </Button>
          </div>
        </td>
      </tr>
    );
  }
);

export default CategoryRow;
