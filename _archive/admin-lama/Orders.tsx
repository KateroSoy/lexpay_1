import { useState, useEffect } from "react";
import { Search, Edit2, Trash2, MoreVertical, Eye } from "lucide-react";

export default function AdminOrders() {
  const [isLoading, setIsLoading] = useState(true);

  // Mock orders data for UI Demo
  const mockOrders = [
    { id: "ORD-1005", customer: "John Doe", date: "2026-08-22", total: 450000, status: "pending", items: 2 },
    { id: "ORD-1004", customer: "Jane Smith", date: "2026-08-21", total: 1250000, status: "processing", items: 1 },
    { id: "ORD-1003", customer: "Michael Chen", date: "2026-08-20", total: 75000, status: "completed", items: 3 },
    { id: "ORD-1002", customer: "Sarah Johnson", date: "2026-08-19", total: 2500000, status: "completed", items: 1 },
    { id: "ORD-1001", customer: "Budi Santoso", date: "2026-08-18", total: 150000, status: "cancelled", items: 2 },
  ];

  useEffect(() => {
    // Simulate API delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed': return 'bg-success-main/10 text-success-main border-success-main/20';
      case 'processing': return 'bg-secondary-main/10 text-secondary-main border-secondary-main/20';
      case 'pending': return 'bg-warning-main/10 text-warning-main border-warning-main/20';
      case 'cancelled': return 'bg-error-main/10 text-error-main border-error-main/20';
      default: return 'bg-bg-main text-text-secondary';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Orders</h1>
          <p className="text-text-secondary mt-1">Manage customer orders and tracking.</p>
        </div>
      </div>

      <div className="bg-bg-card border border-border-main rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-border-main flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 px-3 py-2 bg-bg-main border border-border-main rounded-lg text-sm flex-1 max-w-md focus-within:border-primary-main/50 transition-all">
            <Search size={16} className="text-text-secondary" />
            <input 
              type="text" 
              placeholder="Search by order ID or customer..." 
              className="bg-transparent border-none outline-none w-full text-text-primary placeholder:text-text-secondary/50"
            />
          </div>
          <div className="flex gap-2">
            <select className="px-3 py-2 bg-bg-main border border-border-main rounded-lg text-sm text-text-primary outline-none focus:border-primary-main/50">
              <option>All Status</option>
              <option>Pending</option>
              <option>Processing</option>
              <option>Completed</option>
              <option>Cancelled</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-bg-main/50 text-text-secondary">
              <tr>
                <th className="px-6 py-3 font-medium">Order ID</th>
                <th className="px-6 py-3 font-medium">Customer</th>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Total</th>
                <th className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-main">
              {isLoading ? (
                Array(5).fill(0).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4"><div className="h-4 bg-border-main rounded w-20"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-border-main rounded w-32"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-border-main rounded w-24"></div></td>
                    <td className="px-6 py-4"><div className="h-6 bg-border-main rounded-full w-24"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-border-main rounded w-24"></div></td>
                    <td className="px-6 py-4"></td>
                  </tr>
                ))
              ) : mockOrders.length > 0 ? (
                mockOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-bg-main/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-text-primary">{order.id}</td>
                    <td className="px-6 py-4 text-text-secondary">{order.customer}</td>
                    <td className="px-6 py-4 text-text-secondary">{order.date}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)} uppercase tracking-wider`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-text-primary">
                      Rp {order.total.toLocaleString("id-ID")}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 text-text-secondary">
                        <button className="p-1.5 hover:text-primary-main hover:bg-primary-main/10 rounded-md transition-colors" title="View Details">
                          <Eye size={16} />
                        </button>
                        <button className="p-1.5 hover:text-primary-main hover:bg-primary-main/10 rounded-md transition-colors" title="Edit Status">
                          <Edit2 size={16} />
                        </button>
                        <button className="p-1.5 hover:text-error-main hover:bg-error-main/10 rounded-md transition-colors" title="Delete">
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
                  <td colSpan={6} className="px-6 py-12 text-center text-text-secondary">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-border-main flex items-center justify-between text-sm text-text-secondary">
          <div>Showing 1 to {mockOrders.length} of {mockOrders.length} entries</div>
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
