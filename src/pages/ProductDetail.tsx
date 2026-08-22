import { useParams, Link } from "react-router-dom";
import { PiArrowLeft, PiStarFill, PiTruck } from "react-icons/pi";
import { useState, useEffect } from "react";
import { useCartStore } from "../lib/store";
import toast from "react-hot-toast";
import { lexpayApi } from "../lib/api";
import type { Product } from "../lib/types";

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState("");
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    lexpayApi.product(slug)
      .then(res => {
        setProduct(res.data);
        if (res.data.variants && res.data.variants.length > 0) {
          setSelectedVariant(res.data.variants[0]);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [slug]);

  const handleAddToCart = () => {
    if (!product) return;
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
    toast.dismiss();
    toast.success(`${qty}x ${product.name} ditambahkan ke keranjang!`);
  };

  if (loading) {
    return (
      <div className="pt-24 md:pt-28 pb-16 bg-bg-card min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lex-purple"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-24 md:pt-28 pb-16 bg-bg-card min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <Link to="/explore" className="text-lex-purple hover:underline">Go back to Explore</Link>
      </div>
    );
  }

  return (
    <div className="pt-24 md:pt-28 pb-16 bg-bg-card min-h-screen">
      <div className="mx-auto max-w-6xl px-3 sm:px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-[11px] md:text-xs font-semibold opacity-70 text-text-secondary mb-2 md:mb-3 truncate">
          <Link to="/explore" className="hover:text-text-primary flex items-center gap-1 shrink-0"><PiArrowLeft className="w-3 h-3"/> Explore</Link>
          <span>/</span>
          <span className="shrink-0">{product.category}</span>
          <span>/</span>
          <span className="text-text-primary truncate">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 items-start">
          {/* Gallery */}
          <div className="space-y-3">
            <div className="aspect-video sm:aspect-[4/3] bg-bg-main rounded-xl md:rounded-2xl border border-border-main overflow-hidden flex items-center justify-center p-4 md:p-8 shadow-xs">
               <img src={product.image} alt={product.name} className="w-full h-full object-contain max-h-[200px] md:max-h-[300px]" />
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center">
            <div className="inline-block px-3 py-1 rounded-full bg-lex-purple/10 text-lex-purple font-bold text-xs w-fit mb-2 md:mb-3">
              {product.brand}
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-text-primary mb-2 md:mb-3">{product.name}</h1>
            
            <div className="flex items-center gap-3 mb-4 text-xs md:text-sm">
              <div className="flex items-center gap-1 text-lex-purple font-bold">
                <PiStarFill className="w-4 h-4 fill-current" /> {product.rating}
              </div>
              <span className="opacity-30">•</span>
              <span className="text-text-secondary font-medium">{product.reviewCount} Reviews</span>
            </div>

            <div className="text-2xl md:text-3xl font-black text-text-primary mb-4 md:mb-6">
              Rp{product.price.toLocaleString('id-ID')}
            </div>

            {/* Variants */}
            {product.variants.length > 0 && (
              <div className="mb-4 md:mb-6">
                <div className="font-bold text-xs md:text-sm text-text-secondary uppercase tracking-wider mb-2">Pilih Varian</div>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v, i) => (
                    <button 
                      key={i} 
                      onClick={() => setSelectedVariant(v)}
                      className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold border transition-all cursor-pointer ${
                        selectedVariant === v 
                          ? 'border-lex-purple bg-lex-purple text-white shadow-md' 
                          : 'border-black/10 dark:border-white/10 bg-bg-main text-text-primary hover:border-lex-purple/50'
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Qty & Actions */}
            <div className="flex flex-row items-center gap-3 mb-6">
              <div className="flex items-center justify-between border border-black/10 dark:border-white/10 bg-bg-main rounded-full px-4 py-2.5 w-32 shrink-0">
                <button onClick={() => setQty(Math.max(1, qty-1))} className="opacity-60 text-text-secondary hover:text-text-primary font-bold text-lg cursor-pointer">-</button>
                <span className="font-bold text-sm md:text-base">{qty}</span>
                <button onClick={() => setQty(qty+1)} className="opacity-60 text-text-secondary hover:text-text-primary font-bold text-lg cursor-pointer">+</button>
              </div>
              <button 
                onClick={handleAddToCart} 
                className="flex-1 bg-gradient-to-r from-[#6333FF] to-[#4B1EE3] text-white px-5 py-3 rounded-full font-bold text-xs sm:text-sm hover:shadow-[0_4px_20px_rgba(89,39,229,0.35)] active:scale-95 transition-all cursor-pointer text-center"
              >
                Tambah ke Keranjang
              </button>
            </div>

            {/* Fulfillment */}
            <div className="bg-bg-main border border-border-main rounded-2xl p-4 flex items-center gap-3">
              <div className="w-8 h-8 bg-lex-purple/10 rounded-full flex items-center justify-center shrink-0">
                <PiTruck className="w-4 h-4 text-lex-purple" />
              </div>
              <div>
                <div className="font-bold text-xs md:text-sm text-text-primary">Pengiriman Reguler</div>
                <div className="text-text-secondary font-medium text-xs">Estimasi tiba dalam 1-3 hari kerja.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
