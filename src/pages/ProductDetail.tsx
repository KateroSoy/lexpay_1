import { useParams, Link } from "react-router-dom";
import { mockProducts } from "../data/mockData";
import { PiArrowLeft, PiStarFill, PiTruck } from "react-icons/pi";
import { useState } from "react";
import { useCartStore } from "../lib/store";
import toast from "react-hot-toast";

export default function ProductDetail() {
  const { slug } = useParams();
  const product = mockProducts.find(p => p.slug === slug) || mockProducts[0];
  const [qty, setQty] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0] || "");
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      id: `${product.id}-${selectedVariant}`,
      productId: product.id,
      type: 'product',
      name: product.name,
      price: product.price,
      quantity: qty,
      image: product.image,
      metadata: { variant: selectedVariant }
    });
    toast.success(`${qty}x ${product.name} added to cart!`);
  };

  return (
    <div className="pt-24 pb-24 bg-bg-card min-h-screen">
      <div className="mx-auto max-w-7xl px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm font-semibold opacity-60 text-text-secondary mb-8">
          <Link to="/explore" className="hover:text-text-primary flex items-center gap-1"><PiArrowLeft className="w-4 h-4"/> Back to Explore</Link>
          <span>/</span>
          <span>{product.category}</span>
          <span>/</span>
          <span className="text-text-primary">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="aspect-[4/3] bg-bg-main rounded-[40px] overflow-hidden flex items-center justify-center p-12">
               <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
            </div>
            {/* Thumbs would go here */}
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center">
            <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-text-secondary font-bold text-sm w-fit mb-4">
              {product.brand}
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-1 text-lex-purple font-bold">
                <PiStarFill className="w-5 h-5 fill-current" /> {product.rating}
              </div>
              <span className="text-white/30">•</span>
              <span className="text-text-secondary font-medium">{product.reviewCount} Reviews</span>
            </div>

            <div className="text-4xl font-black mb-8">Rp{product.price.toLocaleString('id-ID')}</div>

            {/* Variants */}
            {product.variants.length > 0 && (
              <div className="mb-8">
                <div className="font-bold mb-4">Select Variant</div>
                <div className="flex gap-3">
                  {product.variants.map((v, i) => (
                    <button 
                      key={i} 
                      onClick={() => setSelectedVariant(v)}
                      className={`px-6 py-3 rounded-full font-semibold border ${selectedVariant === v ? 'border-white bg-btn-bg text-btn-text' : 'border-white/20 bg-bg-card text-white hover:border-white/50'}`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Qty & Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex items-center justify-between border border-white/20 rounded-full px-6 py-4 w-full sm:w-40">
                <button onClick={() => setQty(Math.max(1, qty-1))} className="opacity-60 text-text-secondary hover:text-text-primary font-bold text-xl">-</button>
                <span className="font-bold text-lg">{qty}</span>
                <button onClick={() => setQty(qty+1)} className="opacity-60 text-text-secondary hover:text-text-primary font-bold text-xl">+</button>
              </div>
              <button onClick={handleAddToCart} className="flex-1 bg-btn-bg text-btn-text px-8 py-4 rounded-full font-bold text-lg hover:bg-white/80 active:scale-95 transition-all cursor-pointer">
                Tambah ke Keranjang
              </button>
            </div>

            {/* Fulfillment */}
            <div className="bg-bg-main rounded-3xl p-6 flex items-start gap-4">
              <div className="w-10 h-10 bg-bg-card rounded-full flex items-center justify-center shrink-0">
                <PiTruck className="w-5 h-5 text-text-primary" />
              </div>
              <div>
                <div className="font-bold mb-1">Pengiriman Reguler</div>
                <div className="text-text-secondary font-medium text-sm">Estimasi tiba dalam 1-3 hari kerja.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
