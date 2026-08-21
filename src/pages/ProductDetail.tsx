import { useParams, Link } from "react-router-dom";
import { mockProducts } from "../data/mockData";
import { ArrowLeft, Star, Truck } from "lucide-react";
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
    <div className="pt-24 pb-24 bg-white min-h-screen">
      <div className="mx-auto max-w-7xl px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm font-semibold text-black/40 mb-8">
          <Link to="/explore" className="hover:text-black flex items-center gap-1"><ArrowLeft className="w-4 h-4"/> Back to Explore</Link>
          <span>/</span>
          <span>{product.category}</span>
          <span>/</span>
          <span className="text-black">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="aspect-[4/3] bg-lex-soft rounded-[40px] overflow-hidden flex items-center justify-center p-12">
               <img src={product.image} alt={product.name} className="w-full h-full object-contain mix-blend-multiply" />
            </div>
            {/* Thumbs would go here */}
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center">
            <div className="inline-block px-4 py-1.5 rounded-full bg-black/5 text-black/60 font-bold text-sm w-fit mb-4">
              {product.brand}
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-1 text-lex-purple font-bold">
                <Star className="w-5 h-5 fill-current" /> {product.rating}
              </div>
              <span className="text-black/30">•</span>
              <span className="text-black/60 font-medium">{product.reviewCount} Reviews</span>
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
                      className={`px-6 py-3 rounded-full font-semibold border ${selectedVariant === v ? 'border-lex-black bg-lex-black text-white' : 'border-black/10 bg-white text-black hover:border-black/30'}`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Qty & Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex items-center justify-between border border-black/10 rounded-full px-6 py-4 w-full sm:w-40">
                <button onClick={() => setQty(Math.max(1, qty-1))} className="text-black/40 hover:text-black font-bold text-xl">-</button>
                <span className="font-bold text-lg">{qty}</span>
                <button onClick={() => setQty(qty+1)} className="text-black/40 hover:text-black font-bold text-xl">+</button>
              </div>
              <button onClick={handleAddToCart} className="flex-1 bg-lex-black text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-black/90 active:scale-95 transition-all cursor-pointer">
                Tambah ke Keranjang
              </button>
            </div>

            {/* Fulfillment */}
            <div className="bg-lex-soft rounded-3xl p-6 flex items-start gap-4">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5 text-lex-black" />
              </div>
              <div>
                <div className="font-bold mb-1">Pengiriman Reguler</div>
                <div className="text-black/60 font-medium text-sm">Estimasi tiba dalam 1-3 hari kerja.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
