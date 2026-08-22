import { useState, useEffect } from "react";
import { Plus, Search, Edit2, Trash2, MoreVertical } from "lucide-react";
import { lexpayApi } from "../../lib/api";
import { Product } from "../../lib/types";

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    lexpayApi.getHomePayload().then((res) => {
      setProducts(res.data?.products || []);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Products</h1>
          <p className="text-text-secondary mt-1">Manage your store products and inventory.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary-main hover:bg-primary-hover text-white rounded-lg font-medium transition-colors shrink-0">
          <Plus size={18} />
          Add Product
        </button>
      </div>

      <div className="bg-bg-card border border-border-main rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-border-main flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 px-3 py-2 bg-bg-main border border-border-main rounded-lg text-sm flex-1 max-w-md focus-within:border-primary-main/50 transition-all">
            <Search size={16} className="text-text-secondary" />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="bg-transparent border-none outline-none w-full text-text-primary placeholder:text-text-secondary/50"
            />
          </div>
          <div className="flex gap-2">
            <select className="px-3 py-2 bg-bg-main border border-border-main rounded-lg text-sm text-text-primary outline-none focus:border-primary-main/50">
              <option>All Categories</option>
              <option>Technology</option>
              <option>Lifestyle</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-bg-main/50 text-text-secondary">
              <tr>
                <th className="px-6 py-3 font-medium">Product</th>
                <th className="px-6 py-3 font-medium">Category</th>
                <th className="px-6 py-3 font-medium">Price</th>
                <th className="px-6 py-3 font-medium">Stock</th>
                <th className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-main">
              {isLoading ? (
                Array(5).fill(0).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-border-main rounded-lg"></div>
                        <div className="h-4 bg-border-main rounded w-32"></div>
                      </div>
                    </td>
                    <td className="px-6 py-4"><div className="h-4 bg-border-main rounded w-20"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-border-main rounded w-24"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-border-main rounded w-12"></div></td>
                    <td className="px-6 py-4"></td>
                  </tr>
                ))
              ) : products.length > 0 ? (
                products.map((product) => (
                  <tr key={product.id} className="hover:bg-bg-main/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={product.image || "https://placehold.co/100x100"} 
                          alt={product.title} 
                          className="w-10 h-10 rounded-lg object-cover bg-bg-main"
                        />
                        <div className="font-medium text-text-primary">{product.title}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-text-secondary">{product.category_id === 1 ? 'Technology' : 'Lifestyle'}</td>
                    <td className="px-6 py-4 font-medium text-text-primary">
                      Rp {product.price.toLocaleString("id-ID")}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.stock > 10 ? 'bg-success-main/10 text-success-main' : 'bg-warning-main/10 text-warning-main'
                      }`}>
                        {product.stock} in stock
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 text-text-secondary">
                        <button className="p-1.5 hover:text-primary-main hover:bg-primary-main/10 rounded-md transition-colors">
                          <Edit2 size={16} />
                        </button>
                        <button className="p-1.5 hover:text-error-main hover:bg-error-main/10 rounded-md transition-colors">
                          <Trash2 size={16} />
                        </button>
                        <button className="p-1.5 hover:text-text-primary hover:bg-bg-main rounded-md transition-colors">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-text-secondary">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-border-main flex items-center justify-between text-sm text-text-secondary">
          <div>Showing 1 to {products.length} of {products.length} entries</div>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-border-main rounded-md hover:bg-bg-main disabled:opacity-50" disabled>Prev</button>
            <button className="px-3 py-1 border border-primary-main bg-primary-main/10 text-primary-main rounded-md">1</button>
            <button className="px-3 py-1 border border-border-main rounded-md hover:bg-bg-main disabled:opacity-50" disabled>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
