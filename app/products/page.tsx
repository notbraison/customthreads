import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { mockProducts } from '@/lib/mock-data';

export default function ProductsPage() {
  const products = mockProducts;

  return (
    <main className="w-full bg-background text-foreground">
      <Header />

      <div className="mx-auto w-full max-w-none px-6 py-8 lg:px-12">
        <div className="text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>{' '}
          / Products
        </div>

        <h1 className="mt-10 text-center text-4xl font-normal tracking-wide text-foreground md:text-5xl lg:text-6xl">
          PRODUCTS
        </h1>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[320px_1fr] lg:gap-14">
          {/* Filters */}
          <aside className="hidden lg:block">
            <div className="text-sm font-semibold tracking-wide text-foreground">FILTERS</div>
            <div className="mt-6 border-t border-border pt-6">
              <button
                type="button"
                className="flex w-full items-center justify-between text-sm font-semibold text-foreground"
              >
                <span>Availability</span>
                <span className="text-muted-foreground">⌄</span>
              </button>
            </div>
          </aside>

          {/* Products */}
          <section>
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-foreground">
                {products.length} products
              </div>
              <button
                type="button"
                className="flex items-center gap-2 text-sm text-foreground"
              >
                Sort by Featured <span className="text-muted-foreground">⌄</span>
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
