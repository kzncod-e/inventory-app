"use client";

import { memo } from "react";
import { Button } from "@/components/ui/button";
import { TableRow, TableCell } from "@/components/ui/table";
import { Edit, Package, Trash2 } from "lucide-react";
import { Produk } from "@/types/type";

type ProductRowProps = {
  product: Produk;
  onEdit: (product: Produk) => void;
  onStock: (product: Produk) => void;
  onDelete: (product: Produk) => void;
};

function ProductRowComponent({
  product,
  onEdit,
  onStock,
  onDelete,
}: ProductRowProps) {
  return (
    <TableRow
      key={product.id_produk}
      className="border-purple-500/20 hover:bg-purple-500/5">
      {/* Foto Produk */}
      <TableCell className="text-white">
        <div className="flex items-center space-x-3">
          {product.foto_produk.length > 0 ? (
            product.foto_produk.map((foto, index) => (
              <img
                key={index}
                src={foto || "/placeholder.svg"}
                alt={product.nama_produk}
                className="w-12 h-12 object-cover rounded border border-purple-500/30"
              />
            ))
          ) : (
            <img
              src="/placeholder.svg?height=100&width=100"
              alt={product.nama_produk}
              className="w-12 h-12 object-cover rounded border border-purple-500/30"
            />
          )}
        </div>
      </TableCell>

      {/* Nama Produk */}
      <TableCell className="text-purple-300">
        <div>
          <div className="font-medium">{product.nama_produk}</div>
        </div>
      </TableCell>

      {/* Kategori */}
      <TableCell className="text-purple-300">
        {product.kategori?.nama_kategori || "N/A"}
      </TableCell>

      {/* Stok */}
      <TableCell className="text-white">
        {product.stok
          ? product.stok.length > 0
            ? product.stok
                .map((s) => s.jumlah_barang)
                .reduce((a, b) => a + b, 0)
            : 0
          : 0}{" "}
        pcs
      </TableCell>

      {/* Actions */}
      <TableCell>
        <div className="flex space-x-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onEdit(product)}
            className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10">
            <Edit className="h-3 w-3" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onStock(product)}
            className="border-blue-500/30 text-blue-300 hover:bg-blue-500/10">
            <Package className="h-3 w-3" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onDelete(product)}
            className="border-red-500/30 text-red-300 hover:bg-red-500/10">
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}

// React.memo agar hanya re-render kalau props product berubah
export const ProductRow = memo(ProductRowComponent);
