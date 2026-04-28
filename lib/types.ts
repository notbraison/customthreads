export interface Product {
  id: string;
  name: string;
  image: string;
  originalPrice: number;
  salePrice?: number;
  discount?: number;
  featured: boolean;
  description?: string;
}
