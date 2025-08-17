"use client";

import { useState, useMemo, useEffect } from "react";
import Navbar from "@/components/Navbar";
import autoTable, { RowInput } from "jspdf-autotable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  FileText,
  Search,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Kategori, Produk, ProdukSortField } from "@/types/type";
import { getProduct } from "@/lib/product";

// Mock stock data

type SortDirection = "asc" | "desc" | null;

export default function ReportsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [products, setProducts] = useState<Produk[]>([]);
  const [category, setCategory] = useState<Kategori[]>([]);
  const [sortField, setSortField] = useState<ProdukSortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [loading, setLoading] = useState(false);

  // Filter and sort data
  const getAllProduct = async () => {
    try {
      setLoading(true);
      const res = await getProduct();
      setProducts(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllProduct();
  }, []);

  const filteredAndSortedData = useMemo(() => {
    const filtered = products.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    if (sortField && sortDirection) {
      filtered.sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];

        if (typeof aValue === "number" && typeof bValue === "number") {
          return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
        }

        const aStr = aValue.toString().toLowerCase();
        const bStr = bValue.toString().toLowerCase();

        if (sortDirection === "asc") {
          return aStr < bStr ? -1 : aStr > bStr ? 1 : 0;
        } else {
          return aStr > bStr ? -1 : aStr < bStr ? 1 : 0;
        }
      });
    }

    return filtered;
  }, [searchTerm, products, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredAndSortedData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // const handleSort = (field: ProdukSortField) => {
  //   if (sortField === field) {
  //     setSortDirection(
  //       sortDirection === "asc"
  //         ? "desc"
  //         : sortDirection === "desc"
  //         ? null
  //         : "asc"
  //     );
  //     if (sortDirection === "desc") {
  //       setSortField(null);
  //     }
  //   } else {
  //     setSortField(field);
  //     setSortDirection("asc");
  //   }
  // };

  // const getSortIcon = (field: ProdukSortField) => {
  //   if (sortField !== field) return <ArrowUpDown className="w-4 h-4" />;
  //   if (sortDirection === "asc") return <ArrowUp className="w-4 h-4" />;
  //   if (sortDirection === "desc") return <ArrowDown className="w-4 h-4" />;
  //   return <ArrowUpDown className="w-4 h-4" />;
  // };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredAndSortedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Stock Report");

    // Use browser-compatible export method
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    // Create download link
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "stock-report.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Stock Report", 14, 22);

    const tableData: RowInput[] = filteredAndSortedData.map((item) => [
      item.kode_produk || "-",
      item.nama_produk,
      item.kategori?.nama_kategori || "-",
      item.stok?.length ?? 0,
      new Date(item.tgl_register).toLocaleDateString("id-ID"),
    ]);

    autoTable(doc, {
      head: [
        ["Product Code", "Product Name", "Category", "Stock", "created-at"],
      ],
      body: tableData,
      startY: 30,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [147, 51, 234], textColor: 255 },
    });

    doc.save("stock-report.pdf");
  };

  return (
    <div className="min-h-screen neon-gradient-bg">
      <Navbar />

      <div className="flex">
        <main
          className={`flex-1 p-6 transition-all duration-300 ${
            isSidebarOpen ? "ml-64" : "ml-0"
          } md:ml-0`}>
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold font-orbitron bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
                Stock Reports
              </h1>
              <p className="text-gray-300 font-exo">
                Comprehensive inventory tracking and analytics
              </p>
            </div>

            {/* Controls */}
            <div className="glassmorphism rounded-2xl p-6 mb-6 border border-purple-500/20">
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="pl-10 glassmorphism border-purple-500/30 focus:border-purple-400 glow-input font-exo"
                  />
                </div>

                {/* Export Buttons */}
                <div className="flex gap-3">
                  <Button
                    onClick={exportToExcel}
                    className="futuristic-button text-white font-exo flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Excel
                  </Button>
                  <Button
                    onClick={exportToPDF}
                    className="futuristic-button text-white font-exo flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    PDF
                  </Button>
                </div>
              </div>
            </div>

            {/* Data Table */}
            <div className="glassmorphism rounded-2xl border border-purple-500/20 overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-purple-500/20 hover:bg-purple-500/5">
                      <TableHead
                        className="text-purple-300 font-orbitron cursor-pointer hover:text-purple-200 transition-colors"
                        // onClick={() => handleSort("kode_produk")
                      >
                        <div className="flex items-center gap-2">
                          Product Code
                          {/* {getSortIcon("kode_produk")} */}
                        </div>
                      </TableHead>
                      <TableHead
                        className="text-purple-300 font-orbitron cursor-pointer hover:text-purple-200 transition-colors"
                        // onClick={() => handleSort("nama_produk")}
                      >
                        <div className="flex items-center gap-2">
                          Product Name
                          {/* {getSortIcon("nama_produk")} */}
                        </div>
                      </TableHead>
                      <TableHead
                        className="text-purple-300 font-orbitron cursor-pointer hover:text-purple-200 transition-colors"
                        // onClick={() => handleSort("kategori")}
                      >
                        <div className="flex items-center gap-2">
                          Category
                          {/* {getSortIcon("kategori")} */}
                        </div>
                      </TableHead>
                      <TableHead
                        className="text-purple-300 font-orbitron cursor-pointer hover:text-purple-200 transition-colors"
                        // onClick={() => handleSort("jumlah_barang")}
                      >
                        <div className="flex items-center gap-2">
                          Stock
                          {/* {getSortIcon("jumlah_barang")} */}
                        </div>
                      </TableHead>
                      <TableHead
                        className="text-purple-300 font-orbitron cursor-pointer hover:text-purple-200 transition-colors"
                        // onClick={() => handleSort("tgl_update")

                        // }>
                      >
                        <div className="flex items-center gap-2">
                          created_at
                        </div>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedData.map((item, index) => (
                      <TableRow
                        key={index}
                        className="border-purple-500/10 hover:bg-purple-500/5 transition-colors">
                        <TableCell className="font-mono text-blue-300 font-medium">
                          {item.kode_produk}
                        </TableCell>
                        <TableCell className="text-gray-200 font-exo">
                          {item.nama_produk}
                        </TableCell>
                        <TableCell>
                          <span className="px-3 py-1 rounded-full text-xs font-exo bg-purple-500/20 text-purple-300 border border-purple-500/30">
                            {item.kategori?.nama_kategori || "N/A"}
                          </span>
                        </TableCell>
                        <TableCell className="text-gray-200 font-exo font-medium">
                          {(item.stok?.length &&
                            item.stok
                              .map((el) => el.jumlah_barang)
                              .reduce((a, b) => a + b, 0)) ||
                            0}
                        </TableCell>
                        <TableCell className="text-gray-300 font-exo">
                          {new Date(item.tgl_register).toLocaleString("id-ID")}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between p-4 border-t border-purple-500/20">
                <div className="text-sm text-gray-400 font-exo">
                  Showing {startIndex + 1} to{" "}
                  {Math.min(
                    startIndex + itemsPerPage,
                    filteredAndSortedData.length
                  )}{" "}
                  of {filteredAndSortedData.length} results
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="glassmorphism border-purple-500/30 hover:border-purple-400 text-gray-200 hover:text-white">
                    <ChevronLeft className="w-4 h-4" />
                  </Button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                          className={
                            currentPage === page
                              ? "futuristic-button text-white font-exo"
                              : "glassmorphism border-purple-500/30 hover:border-purple-400 text-gray-200 hover:text-white font-exo"
                          }>
                          {page}
                        </Button>
                      )
                    )}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="glassmorphism border-purple-500/30 hover:border-purple-400 text-gray-200 hover:text-white">
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
