import { Link } from "react-router-dom";
import { mockProducts } from "../../data/mockData";
import { PiArrowRight } from "react-icons/pi";

export function FeaturedProducts() {
  const displayedProducts = mockProducts.slice(0, 8);

  return (
    <section className="py-24 px-4 bg-bg-main">
      <div className="mx-auto max-w-7xl">
        <div className="flex justify-between items-end mb-12">
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
          {displayedProducts.map((product) => (
            <Link
              to={`/products/${product.slug}`}
              key={product.id}
              className="bg-bg-card rounded-[20px] md:rounded-[24px] overflow-hidden group hover:shadow-lg transition-shadow cursor-pointer block border border-border-main flex flex-col h-full"
            >
              <div className="aspect-square bg-white/5 overflow-hidden relative p-4 md:p-6">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-3 md:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] md:text-xs opacity-60 text-text-secondary font-bold uppercase tracking-wider mb-1">
                    {product.brand}
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
          ))}
        </div>

        <div className="flex justify-center">
          <Link
            to="/products"
            className="flex items-center gap-2 bg-btn-bg text-btn-text px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform"
          >
            Lihat Produk Lainnya <PiArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
