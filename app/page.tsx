import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { ProductGrid } from '@/components/ProductGrid';
import { Footer } from '@/components/Footer';
import { mockProducts } from '@/lib/mock-data';

export default function Home() {
  return (
    <main className="w-full bg-white">
      <Header />
      <Hero />
      <ProductGrid products={mockProducts} />
      <Footer />
    </main>
  );
}
