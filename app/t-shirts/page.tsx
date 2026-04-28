import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { mockProducts } from '@/lib/mock-data';

export default function TshirtsPage() {
  const products = mockProducts.filter((p) => p.name.toLowerCase().includes('t-shirt'));

  return (
    <main className="w-full bg-white">
      <Header />

      <div className="mx-auto w-full max-w-none px-6 py-8 lg:px-12">
        <div className="text-sm text-gray-500">
          <Link href="/" className="hover:text-black">
            Home
          </Link>{' '}
          / T-Shirts
        </div>

        <h1 className="mt-10 text-center text-4xl font-normal tracking-wide text-black md:text-5xl lg:text-6xl">
          T-SHIRTS
        </h1>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[320px_1fr] lg:gap-14">
          {/* Filters */}
          <aside className="hidden lg:block">
            <div className="text-sm font-semibold tracking-wide text-black">FILTERS</div>
            <div className="mt-6 border-t border-gray-200 pt-6">
              <button
                type="button"
                className="flex w-full items-center justify-between text-sm font-semibold text-black"
              >
                <span>Availability</span>
                <span className="text-gray-500">⌄</span>
              </button>
            </div>
          </aside>

          {/* Products */}
          <section>
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-black">
                {products.length} products
              </div>
              <button
                type="button"
                className="flex items-center gap-2 text-sm text-black"
              >
                Sort by Featured <span className="text-gray-500">⌄</span>
              </button>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
