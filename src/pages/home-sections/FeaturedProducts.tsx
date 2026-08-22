import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PiArrowRight } from "react-icons/pi";
import { lexpayApi } from "../../lib/api";
import type { Product } from "../../lib/types";

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    lexpayApi.products()
      .then(res => setProducts(res.data.slice(0, 8)))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="pt-8 pb-2 md:py-12 px-4 bg-bg-main">
      <div className="mx-auto max-w-7xl">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-text-primary mb-4">
              Explore Our Products
            </h2>
            <p className="text-lg text-text-secondary font-medium">
              Find everything you need, from daily essentials to exclusive items.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-12">
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-bg-card rounded-[20px] md:rounded-[24px] overflow-hidden border border-border-main flex flex-col h-full animate-pulse">
                <div className="aspect-square bg-black/5 dark:bg-white/5 relative p-4 md:p-6" />
                <div className="p-3 md:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="w-1/2 h-3 bg-black/5 dark:bg-white/5 rounded mb-2" />
                    <div className="w-full h-4 bg-black/10 dark:bg-white/10 rounded mb-1" />
                    <div className="w-3/4 h-4 bg-black/10 dark:bg-white/10 rounded" />
                  </div>
                  <div className="w-1/3 h-5 bg-black/10 dark:bg-white/10 rounded mt-4" />
                </div>
              </div>
            ))
          ) : (
            products.map((product) => (
              <Link
                to={`/products/${product.slug}`}
                key={product.id}
                className="bg-bg-card rounded-[20px] md:rounded-[24px] overflow-hidden group hover:shadow-lg transition-shadow cursor-pointer block border border-border-main flex flex-col h-full"
              >
                <div className="aspect-square bg-white/5 overflow-hidden relative p-4 md:p-6">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-black/5 flex items-center justify-center text-text-secondary text-sm">No Image</div>
                  )}
                </div>
                <div className="p-3 md:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[10px] md:text-xs opacity-60 text-text-secondary font-bold uppercase tracking-wider mb-1">
                      {product.brand || product.category || 'Product'}
                    </div>
                    <h3 className="font-bold mb-2 group-hover:text-lex-purple transition-colors line-clamp-2 text-[13px] md:text-base leading-snug">
                      {product.name}
                    </h3>
                  </div>
                  <div className="font-black text-sm md:text-lg text-lex-purple mt-2">
                    Rp{product.price.toLocaleString("id-ID")}
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>

        {!loading && products.length > 0 && (
          <div className="flex justify-center">
            <Link
              to="/products"
              className="flex items-center gap-2 bg-btn-bg text-btn-text px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform"
            >
              Lihat Produk Lainnya <PiArrowRight className="w-5 h-5" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
