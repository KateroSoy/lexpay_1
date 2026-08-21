import { Link } from "react-router-dom";
import { mockProducts } from "../../data/mockData";
import { ArrowRight } from "lucide-react";

export function FeaturedProducts() {
  const displayedProducts = mockProducts.slice(0, 8);

  return (
    <section className="py-24 px-4 bg-lex-soft">
      <div className="mx-auto max-w-7xl">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-lex-black mb-4">
              Explore Our Products
            </h2>
            <p className="text-lg text-black/60 font-medium">
              Find everything you need, from daily essentials to exclusive items.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {displayedProducts.map((product) => (
            <Link
              to={`/products/${product.slug}`}
              key={product.id}
              className="bg-white rounded-[24px] overflow-hidden group hover:shadow-lg transition-shadow cursor-pointer block border border-black/5"
            >
              <div className="aspect-square bg-gray-50 overflow-hidden relative p-6">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <div className="text-xs text-black/40 font-bold uppercase tracking-wider mb-1">
                  {product.brand}
                </div>
                <h3 className="font-bold mb-2 group-hover:text-lex-purple transition-colors line-clamp-2 text-sm md:text-base">
                  {product.name}
                </h3>
                <div className="font-black text-lg">
                  Rp{product.price.toLocaleString("id-ID")}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex justify-center">
          <Link
            to="/products"
            className="flex items-center gap-2 bg-lex-black text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform"
          >
            Lihat Produk Lainnya <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
