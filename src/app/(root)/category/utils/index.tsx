import { getCategories } from "@/lib/category";
import { Kategori } from "@/types/type";

interface getAllCategoriesProps {
  setIsLoading: (loading: boolean) => void;
  setCategories: (categories: Kategori[]) => void;
}

export const getAllCategories = async ({
  setIsLoading,
  setCategories,
}: getAllCategoriesProps) => {
  setIsLoading(true);
  try {
    const res = await getCategories();
    setCategories(res);
  } catch (error: any) {
    console.log("error happen when fething categories", error.message);
  } finally {
    setIsLoading(false);
  }
};
