// prisma/seed.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // 1. Users
  await prisma.user.create({
    data: {
      nama_user: "Admin",
      password: "admin123",
    },
  });

  // 2. Categories
  const electronicsCategory = await prisma.kategori.create({
    data: { nama_kategori: "Electronics" },
  });

  const clothingCategory = await prisma.kategori.create({
    data: { nama_kategori: "Clothing" },
  });

  const foodCategory = await prisma.kategori.create({
    data: { nama_kategori: "Food" },
  });

  // 3. Products dengan foto array
  const laptopProduct = await prisma.produk.create({
    data: {
      id_kategori: electronicsCategory.id_kategori,
      nama_produk: "Asus ROG Laptop",
      kode_produk: "EL001",
      foto_produk: [
        "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcREiXss_pkIwnX0B2FKNI1swYLKUM0V3vcdj_UkXiu3qezpE9L1d8yu9aY6t8gnvkrH8SPrDi9BjqeCL4bBEA-N03UzrEKkQHH_6rQ9af00RQ",
      ],
      tgl_register: new Date("2025-01-10"),
    },
  });

  const tshirtProduct = await prisma.produk.create({
    data: {
      id_kategori: clothingCategory.id_kategori,
      nama_produk: "Black Plain T-Shirt",
      kode_produk: "CL001",
      foto_produk: [
        "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcREiXss_pkIwnX0B2FKNI1swYLKUM0V3vcdj_UkXiu3qezpE9L1d8yu9aY6t8gnvkrH8SPrDi9BjqeCL4bBEA-N03UzrEKkQHH_6rQ9af00RQ",
      ],
      tgl_register: new Date("2025-02-05"),
    },
  });

  const chipsProduct = await prisma.produk.create({
    data: {
      id_kategori: foodCategory.id_kategori,
      nama_produk: "Potato Chips",
      kode_produk: "FD001",
      foto_produk: [
        "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcREiXss_pkIwnX0B2FKNI1swYLKUM0V3vcdj_UkXiu3qezpE9L1d8yu9aY6t8gnvkrH8SPrDi9BjqeCL4bBEA-N03UzrEKkQHH_6rQ9af00RQ",
      ],
      tgl_register: new Date("2025-03-15"),
    },
  });

  // 4. Stock
  await prisma.stok.createMany({
    data: [
      {
        id_produk: laptopProduct.id_produk,
        jumlah_barang: 10,
        tgl_update: new Date("2025-08-01"),
      },
      {
        id_produk: tshirtProduct.id_produk,
        jumlah_barang: 50,
        tgl_update: new Date("2025-08-05"),
      },
      {
        id_produk: chipsProduct.id_produk,
        jumlah_barang: 100,
        tgl_update: new Date("2025-08-07"),
      },
    ],
  });

  console.log("✅ Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
