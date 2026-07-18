import React, { useState, useMemo } from 'react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  PieChart, 
  Pie, 
  Cell, 
  AreaChart, 
  Area,
  ComposedChart
} from 'recharts';
import { 
  ShoppingCart, 
  Search, 
  CreditCard, 
  Truck, 
  Settings, 
  CheckCircle, 
  Database, 
  Play, 
  RefreshCw, 
  Table, 
  BarChart3, 
  Terminal, 
  Layers, 
  TrendingUp, 
  AlertCircle,
  FileSpreadsheet,
  ChevronRight,
  Filter,
  User,
  Activity
} from 'lucide-react';
import { MASTER_DATASET, MasterSalesRecord } from '../data';

// ==========================================
// 1. EASYMART GROCERY WEBSITE PREVIEW
// ==========================================
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const EASYMART_PRODUCTS = [
  { id: 1, name: 'Fresh Gala Apples (1kg)', price: 120, category: 'Grocery', icon: '🍎' },
  { id: 2, name: 'Organic Whole Milk (1L)', price: 80, category: 'Grocery', icon: '🥛' },
  { id: 3, name: 'Whole Wheat Bread (400g)', price: 45, category: 'Grocery', icon: '🍞' },
  { id: 4, name: 'Filter Coffee Powder (250g)', price: 160, category: 'Beverages', icon: '☕' },
];

export const EasyMartPreview: React.FC = () => {
  const [view, setView] = useState<'customer' | 'admin'>('customer');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [checkoutStep, setCheckoutStep] = useState<'shop' | 'cart' | 'tracking'>('shop');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [deliveryStep, setDeliveryStep] = useState(1); // 1: Received, 2: Packing, 3: Dispatched, 4: Delivered
  
  // Admin state
  const [adminOrders, setAdminOrders] = useState([
    { id: 2348, customer: 'Vikram Nair', items: 'Filter Coffee x2, Apples x1', total: 440, status: 'Delivered', date: 'Today' },
    { id: 2349, customer: 'Aditya Sen', items: 'Organic Milk x3, Bread x2', total: 330, status: 'In Transit', date: 'Today' },
    { id: 2350, customer: 'Neha Gupta', items: 'Fresh Gala Apples x2', total: 240, status: 'Processing', date: 'Today' },
  ]);

  const [newProductPrice, setNewProductPrice] = useState('120');

  // Customer handlers
  const filteredProducts = EASYMART_PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToCart = (product: typeof EASYMART_PRODUCTS[0]) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountedTotal = discountApplied ? Math.round(cartTotal * 0.7) : cartTotal;

  const handleApplyDiscount = () => {
    if (discountCode.toUpperCase() === 'SHAHID30') {
      setDiscountApplied(true);
    } else {
      alert('Invalid code! Use "SHAHID30" for 30% off.');
    }
  };

  const handleCheckout = () => {
    setCheckoutStep('tracking');
    setDeliveryStep(1);
    // Add to admin orders simulation
    const newOrder = {
      id: Math.floor(Math.random() * 1000) + 2400,
      customer: 'Guest Buyer',
      items: cart.map(c => `${c.name.split(' ')[0]} x${c.quantity}`).join(', '),
      total: discountedTotal,
      status: 'Processing',
      date: 'Just Now'
    };
    setAdminOrders(prev => [newOrder, ...prev]);
    setCart([]);
  };

  const updateOrderStatus = (orderId: number, nextStatus: string) => {
    setAdminOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: nextStatus } : o));
    if (orderId >= 2400) {
      // If it is the active guest order, mirror status in delivery tracking
      if (nextStatus === 'Processing') setDeliveryStep(1);
      if (nextStatus === 'Packing') setDeliveryStep(2);
      if (nextStatus === 'In Transit') setDeliveryStep(3);
      if (nextStatus === 'Delivered') setDeliveryStep(4);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
      {/* Header Tabs */}
      <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex justify-between items-center flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <ShoppingCart className="w-5 h-5 text-indigo-600" />
          <span className="font-bold text-slate-800 text-sm md:text-base">EasyMart Grocery Platform Demo</span>
        </div>
        <div className="flex bg-slate-200 p-1 rounded-lg">
          <button 
            onClick={() => setView('customer')}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${view === 'customer' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Customer View
          </button>
          <button 
            onClick={() => setView('admin')}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${view === 'admin' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Admin Dashboard View
          </button>
        </div>
      </div>

      {/* Main Sandbox Area */}
      <div className="p-4 md:p-6 min-h-[400px]">
        {view === 'customer' ? (
          <div>
            {/* Step navigation */}
            <div className="flex items-center justify-center gap-2 mb-6 text-xs md:text-sm font-medium border-b border-slate-100 pb-4">
              <button 
                onClick={() => setCheckoutStep('shop')}
                className={`pb-2 px-2 transition-all border-b-2 ${checkoutStep === 'shop' ? 'border-indigo-600 text-indigo-600 font-semibold' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
              >
                1. Browse Grocery
              </button>
              <ChevronRight className="w-4 h-4 text-slate-300" />
              <button 
                onClick={() => setCheckoutStep('cart')}
                className={`pb-2 px-2 transition-all border-b-2 ${checkoutStep === 'cart' ? 'border-indigo-600 text-indigo-600 font-semibold' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
              >
                2. Cart & Payment ({cart.reduce((s, i) => s + i.quantity, 0)})
              </button>
              <ChevronRight className="w-4 h-4 text-slate-300" />
              <button 
                disabled={checkoutStep !== 'tracking'}
                onClick={() => setCheckoutStep('tracking')}
                className={`pb-2 px-2 transition-all border-b-2 disabled:opacity-50 ${checkoutStep === 'tracking' ? 'border-indigo-600 text-indigo-600 font-semibold' : 'border-transparent text-slate-400'}`}
              >
                3. Order Delivery Tracking
              </button>
            </div>

            {/* SHOPPING STEP */}
            {checkoutStep === 'shop' && (
              <div>
                {/* Search Bar */}
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search fresh groceries... (e.g. Apples, Milk, Coffee)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  />
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {filteredProducts.map(p => (
                    <div key={p.id} className="border border-slate-100 rounded-xl p-4 hover:shadow-md hover:border-indigo-100 transition-all flex flex-col justify-between">
                      <div>
                        <div className="text-4xl mb-2">{p.icon}</div>
                        <h4 className="font-semibold text-slate-800 text-sm">{p.name}</h4>
                        <p className="text-xs text-slate-400 mb-2">{p.category}</p>
                      </div>
                      <div className="flex items-center justify-between mt-4 border-t border-slate-50 pt-3">
                        <span className="font-bold text-indigo-600 text-sm">₹{p.price}</span>
                        <button 
                          onClick={() => addToCart(p)}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs px-2.5 py-1.5 rounded-lg transition-all flex items-center gap-1 cursor-pointer"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {cart.length > 0 && (
                  <div className="mt-8 bg-indigo-50 border border-indigo-100 rounded-xl p-4 flex justify-between items-center flex-wrap gap-3">
                    <div>
                      <p className="text-xs text-indigo-800 font-medium">Items in Cart: {cart.reduce((s, i) => s + i.quantity, 0)}</p>
                      <p className="text-base font-bold text-indigo-950">Subtotal: ₹{cartTotal}</p>
                    </div>
                    <button 
                      onClick={() => setCheckoutStep('cart')}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-all flex items-center gap-2 cursor-pointer shadow-sm"
                    >
                      View Cart & Checkout <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* CART & CHECKOUT STEP */}
            {checkoutStep === 'cart' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Cart details */}
                <div className="lg:col-span-2 border border-slate-100 rounded-xl p-4 bg-slate-50/50">
                  <h3 className="font-bold text-slate-800 mb-4 text-sm flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4 text-indigo-600" />
                    Your Shopping Basket
                  </h3>
                  {cart.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-slate-400 text-sm mb-4">Your basket is empty!</p>
                      <button 
                        onClick={() => setCheckoutStep('shop')}
                        className="text-indigo-600 text-xs font-semibold border border-indigo-200 px-3 py-1.5 rounded-lg hover:bg-indigo-50 transition-all cursor-pointer"
                      >
                        Browse Groceries
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {cart.map(item => (
                        <div key={item.id} className="bg-white border border-slate-100 rounded-lg p-3 flex justify-between items-center gap-4">
                          <div>
                            <h4 className="text-xs font-bold text-slate-800">{item.name}</h4>
                            <p className="text-[10px] text-slate-400">Unit Price: ₹{item.price}</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-xs font-medium text-slate-500">Qty: {item.quantity}</span>
                            <span className="text-xs font-bold text-indigo-600 min-w-[50px] text-right">₹{item.price * item.quantity}</span>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-500 hover:text-red-700 text-xs font-medium cursor-pointer"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Checkout Summary & Payment */}
                <div className="border border-slate-200 rounded-xl p-4 bg-white flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-slate-800 mb-4 text-sm flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-indigo-600" />
                      Order Invoice Summary
                    </h3>
                    
                    <div className="space-y-2 border-b border-slate-100 pb-3 mb-3 text-xs text-slate-600">
                      <div className="flex justify-between">
                        <span>Cart Subtotal</span>
                        <span>₹{cartTotal}</span>
                      </div>
                      <div className="flex justify-between text-emerald-600">
                        <span>Discount Coupon</span>
                        <span>-{discountApplied ? '30%' : '₹0'}</span>
                      </div>
                      <div className="flex justify-between font-bold text-slate-800 text-sm border-t border-slate-100 pt-2">
                        <span>Final Total</span>
                        <span>₹{discountedTotal}</span>
                      </div>
                    </div>

                    {/* Promo Code */}
                    <div className="mb-4">
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Apply Coupon Code</label>
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          placeholder="Try: SHAHID30" 
                          value={discountCode}
                          onChange={(e) => setDiscountCode(e.target.value)}
                          className="flex-1 px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                        <button 
                          onClick={handleApplyDiscount}
                          className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all cursor-pointer"
                        >
                          Apply
                        </button>
                      </div>
                      {discountApplied && (
                        <p className="text-[10px] text-emerald-600 mt-1 font-semibold flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" /> Coupon "SHAHID30" successfully applied! Saved ₹{cartTotal - discountedTotal}.
                        </p>
                      )}
                    </div>
                  </div>

                  <button 
                    disabled={cart.length === 0}
                    onClick={handleCheckout}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <CheckCircle className="w-4 h-4" /> Place Order & Simulate Payment
                  </button>
                </div>
              </div>
            )}

            {/* TRACKING STEP */}
            {checkoutStep === 'tracking' && (
              <div className="border border-indigo-100 rounded-xl p-6 bg-indigo-50/20 max-w-2xl mx-auto">
                <h3 className="font-bold text-slate-800 text-center mb-6 text-sm flex items-center justify-center gap-2">
                  <Truck className="w-4 h-4 text-indigo-600 animate-bounce" />
                  Live Order Delivery Tracking Simulator
                </h3>

                {/* Progress bar line */}
                <div className="relative flex justify-between items-center max-w-md mx-auto mb-10">
                  <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -translate-y-1/2 z-0"></div>
                  <div 
                    className="absolute top-1/2 left-0 h-1 bg-indigo-600 -translate-y-1/2 z-0 transition-all duration-500"
                    style={{ width: `${((deliveryStep - 1) / 3) * 100}%` }}
                  ></div>

                  {/* Step dots */}
                  {[
                    { s: 1, name: 'Received', label: 'Order Received' },
                    { s: 2, name: 'Packing', label: 'Processed & Packed' },
                    { s: 3, name: 'In Transit', label: 'Out for Delivery' },
                    { s: 4, name: 'Delivered', label: 'Delivered safely' },
                  ].map(step => (
                    <div key={step.s} className="relative z-10 flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${deliveryStep >= step.s ? 'bg-indigo-600 text-white ring-4 ring-indigo-100' : 'bg-white text-slate-400 border border-slate-200'}`}>
                        {deliveryStep > step.s ? '✓' : step.s}
                      </div>
                      <span className={`text-[10px] font-semibold mt-2 absolute top-8 whitespace-nowrap ${deliveryStep >= step.s ? 'text-indigo-900 font-bold' : 'text-slate-400'}`}>
                        {step.name}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="bg-white border border-slate-100 rounded-xl p-4 text-center mt-6 text-xs max-w-sm mx-auto">
                  <p className="text-slate-500 mb-2">Want to simulate advances in order delivery?</p>
                  <div className="flex justify-center gap-2">
                    <button 
                      disabled={deliveryStep === 1}
                      onClick={() => setDeliveryStep(prev => prev - 1)}
                      className="border border-slate-200 hover:bg-slate-50 disabled:opacity-50 text-slate-600 px-2 py-1 rounded text-[10px] font-semibold cursor-pointer"
                    >
                      Previous Step
                    </button>
                    <button 
                      disabled={deliveryStep === 4}
                      onClick={() => setDeliveryStep(prev => prev + 1)}
                      className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white px-2.5 py-1 rounded text-[10px] font-semibold cursor-pointer"
                    >
                      Advance Step
                    </button>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-3 italic">Tip: You can also control this status in the "Admin Dashboard View" tab above!</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* ADMIN PORTAL VIEW */
          <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border border-slate-100 rounded-xl p-4 bg-slate-50/50">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Sales Today</p>
                <p className="text-xl font-bold text-slate-800">₹{adminOrders.reduce((s,o) => s + (o.status !== 'Cancelled' ? o.total : 0), 0) + 1240}</p>
                <p className="text-[10px] text-emerald-600 font-semibold mt-1">▲ +12% from yesterday</p>
              </div>
              <div className="border border-slate-100 rounded-xl p-4 bg-slate-50/50">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pending Orders</p>
                <p className="text-xl font-bold text-slate-800">{adminOrders.filter(o => o.status !== 'Delivered').length}</p>
                <p className="text-[10px] text-indigo-600 font-semibold mt-1">Requires immediate packing</p>
              </div>
              <div className="border border-slate-100 rounded-xl p-4 bg-slate-50/50">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Operational Status</p>
                <p className="text-xl font-bold text-emerald-600">Active / Live</p>
                <p className="text-[10px] text-slate-400 mt-1">All delivery fleets online</p>
              </div>
            </div>

            {/* Active Orders Table */}
            <div className="border border-slate-100 rounded-xl overflow-hidden bg-white">
              <div className="bg-slate-100 px-4 py-2.5 border-b border-slate-200">
                <h4 className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5" />
                  Interactive Orders Queue (Real-Time Mock Database)
                </h4>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
                      <th className="p-3">Order ID</th>
                      <th className="p-3">Customer</th>
                      <th className="p-3">Groceries Ordered</th>
                      <th className="p-3">Total Amount</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Actions (Update DB)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {adminOrders.map(order => (
                      <tr key={order.id} className="hover:bg-slate-50/50">
                        <td className="p-3 font-mono font-bold text-indigo-600">#{order.id}</td>
                        <td className="p-3 font-medium text-slate-700">{order.customer}</td>
                        <td className="p-3 text-slate-500 truncate max-w-[200px]">{order.items}</td>
                        <td className="p-3 font-bold text-slate-800">₹{order.total}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                            order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-600' :
                            order.status === 'In Transit' ? 'bg-indigo-50 text-indigo-600' :
                            order.status === 'Packing' ? 'bg-yellow-50 text-yellow-600' :
                            'bg-amber-50 text-amber-600'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="p-3 text-right space-x-1">
                          {order.status === 'Processing' && (
                            <button 
                              onClick={() => updateOrderStatus(order.id, 'Packing')}
                              className="bg-yellow-600 hover:bg-yellow-700 text-white text-[10px] font-semibold px-2 py-0.5 rounded cursor-pointer"
                            >
                              Pack
                            </button>
                          )}
                          {order.status === 'Packing' && (
                            <button 
                              onClick={() => updateOrderStatus(order.id, 'In Transit')}
                              className="bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-semibold px-2 py-0.5 rounded cursor-pointer"
                            >
                              Dispatch
                            </button>
                          )}
                          {order.status === 'In Transit' && (
                            <button 
                              onClick={() => updateOrderStatus(order.id, 'Delivered')}
                              className="bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-semibold px-2 py-0.5 rounded cursor-pointer"
                            >
                              Complete
                            </button>
                          )}
                          <button 
                            onClick={() => updateOrderStatus(order.id, 'Cancelled')}
                            disabled={order.status === 'Delivered'}
                            className="text-red-500 hover:text-red-700 disabled:opacity-40 text-[10px] font-semibold px-1.5 py-0.5 cursor-pointer"
                          >
                            Cancel
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ==========================================
// 2. EXCEL SALES PERFORMANCE DASHBOARD PREVIEW
// ==========================================
export const ExcelDashboardPreview: React.FC = () => {
  // Slicers filter selections
  const [selectedYear, setSelectedYear] = useState<number | 'All'>('All');
  const [selectedRegion, setSelectedRegion] = useState<string | 'All'>('All');
  const [selectedCategory, setSelectedCategory] = useState<string | 'All'>('All');

  // Filter Master Dataset in real-time
  const filteredData = useMemo(() => {
    return MASTER_DATASET.filter(row => {
      const yearMatch = selectedYear === 'All' || row.year === selectedYear;
      const regionMatch = selectedRegion === 'All' || row.region === selectedRegion;
      const categoryMatch = selectedCategory === 'All' || row.category === selectedCategory;
      return yearMatch && regionMatch && categoryMatch;
    });
  }, [selectedYear, selectedRegion, selectedCategory]);

  // Compute live Excel KPI aggregates
  const kpis = useMemo(() => {
    const totalSales = filteredData.reduce((sum, row) => sum + row.sales, 0);
    const totalProfit = filteredData.reduce((sum, row) => sum + row.profit, 0);
    const totalTransactions = filteredData.length;
    const profitMargin = totalSales > 0 ? Math.round((totalProfit / totalSales) * 100) : 0;
    const avgOrderValue = totalTransactions > 0 ? Math.round(totalSales / totalTransactions) : 0;

    return { totalSales, totalProfit, totalTransactions, profitMargin, avgOrderValue };
  }, [filteredData]);

  // Process data for Monthly Trends Chart
  const monthlyTrends = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months.map(m => {
      const monthData = filteredData.filter(row => row.month === m);
      const sales = monthData.reduce((s, r) => s + r.sales, 0);
      const profit = monthData.reduce((s, r) => s + r.profit, 0);
      return { month: m, Sales: sales, Profit: profit };
    });
  }, [filteredData]);

  // Process data for Category Bar Chart
  const categoryData = useMemo(() => {
    const categories = ['Grocery', 'Household', 'Beverages'];
    return categories.map(cat => {
      const catData = filteredData.filter(row => row.category === cat);
      const sales = catData.reduce((s, r) => s + r.sales, 0);
      return { Category: cat, Sales: sales };
    });
  }, [filteredData]);

  // Process data for Regional Donut
  const regionalData = useMemo(() => {
    const regions = ['North', 'South', 'East', 'West'];
    const colors = ['#0284c7', '#0d9488', '#4f46e5', '#e11d48'];
    return regions.map((reg, idx) => {
      const regData = filteredData.filter(row => row.region === reg);
      const sales = regData.reduce((s, r) => s + r.sales, 0);
      return { name: reg, value: sales, color: colors[idx] };
    }).filter(d => d.value > 0);
  }, [filteredData]);

  return (
    <div className="bg-[#f8fafc] border border-emerald-600/30 rounded-xl overflow-hidden shadow-sm font-sans">
      {/* Excel Ribbon Style Header */}
      <div className="bg-[#107c41] text-white px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileSpreadsheet className="w-5 h-5 text-emerald-100" />
          <span className="font-bold text-xs md:text-sm tracking-wide">Excel_Sales_Model.xlsx — Dynamic Pivot View</span>
        </div>
        <div className="flex items-center gap-1 text-[10px] bg-[#0b592e] px-2 py-1 rounded">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Online Engine Active</span>
        </div>
      </div>

      {/* Excel Workspace Grid Layout */}
      <div className="p-4 md:p-6 grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* SLICERS SIDE PANEL (Excel Slicers) */}
        <div className="xl:col-span-1 space-y-4">
          <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm">
            <h4 className="text-xs font-bold text-slate-700 mb-2 border-b border-emerald-50 pb-1.5 flex items-center gap-1.5 text-emerald-800">
              <Filter className="w-3.5 h-3.5 text-emerald-600" />
              Slicer: Calendar Year
            </h4>
            <div className="space-y-1">
              {['All', 2025, 2026].map(year => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year as any)}
                  className={`w-full text-left text-xs px-2.5 py-1.5 rounded font-medium border transition-all cursor-pointer ${
                    selectedYear === year 
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-800 font-bold' 
                      : 'bg-white border-slate-100 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {year === 'All' ? 'All Years' : `FY ${year}`}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm">
            <h4 className="text-xs font-bold text-slate-700 mb-2 border-b border-emerald-50 pb-1.5 flex items-center gap-1.5 text-emerald-800">
              <Filter className="w-3.5 h-3.5 text-emerald-600" />
              Slicer: Territory Region
            </h4>
            <div className="grid grid-cols-2 gap-1.5">
              {['All', 'North', 'South', 'East', 'West'].map(region => (
                <button
                  key={region}
                  onClick={() => setSelectedRegion(region)}
                  className={`text-center text-xs px-2 py-1.5 rounded font-medium border transition-all cursor-pointer ${
                    selectedRegion === region 
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-800 font-bold col-span-2' 
                      : 'bg-white border-slate-100 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {region === 'All' ? 'All Regions' : region}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm">
            <h4 className="text-xs font-bold text-slate-700 mb-2 border-b border-emerald-50 pb-1.5 flex items-center gap-1.5 text-emerald-800">
              <Filter className="w-3.5 h-3.5 text-emerald-600" />
              Slicer: Product Line
            </h4>
            <div className="space-y-1">
              {['All', 'Grocery', 'Household', 'Beverages'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left text-xs px-2.5 py-1.5 rounded font-medium border transition-all cursor-pointer ${
                    selectedCategory === cat 
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-800 font-bold' 
                      : 'bg-white border-slate-100 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {cat === 'All' ? 'All Categories' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Pivot summary log */}
          <div className="bg-slate-100/70 border border-slate-200 rounded-lg p-3 text-[11px] text-slate-500">
            <span className="font-bold block text-slate-700 mb-1">Pivot Engine Metrics:</span>
            <ul className="space-y-1 list-disc list-inside">
              <li>Query scan count: <span className="font-mono">{filteredData.length} rows</span></li>
              <li>Calculated indices: <span className="font-mono">4 fields</span></li>
              <li>Recompute speed: <span className="font-mono text-emerald-700">&lt; 1ms (Native)</span></li>
            </ul>
          </div>
        </div>

        {/* PRIMARY EXCEL VISUAL SHEET */}
        <div className="xl:col-span-3 space-y-6">
          {/* KPI Dashboard Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white border-l-4 border-emerald-600 rounded-lg p-3 shadow-sm border border-slate-200">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Total Sales</span>
              <span className="text-lg font-bold text-slate-800 block mt-0.5">₹{kpis.totalSales.toLocaleString()}</span>
              <span className="text-[10px] text-slate-400">Sum of revenue items</span>
            </div>
            <div className="bg-white border-l-4 border-teal-500 rounded-lg p-3 shadow-sm border border-slate-200">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Total Profit</span>
              <span className="text-lg font-bold text-teal-700 block mt-0.5">₹{kpis.totalProfit.toLocaleString()}</span>
              <span className="text-[10px] text-emerald-600 font-medium">Margin: {kpis.profitMargin}%</span>
            </div>
            <div className="bg-white border-l-4 border-indigo-500 rounded-lg p-3 shadow-sm border border-slate-200">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Volume Orders</span>
              <span className="text-lg font-bold text-slate-800 block mt-0.5">{kpis.totalTransactions}</span>
              <span className="text-[10px] text-slate-400">Total transaction feeds</span>
            </div>
            <div className="bg-white border-l-4 border-blue-400 rounded-lg p-3 shadow-sm border border-slate-200">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Avg Ticket</span>
              <span className="text-lg font-bold text-slate-800 block mt-0.5">₹{kpis.avgOrderValue}</span>
              <span className="text-[10px] text-slate-400">Average order basket</span>
            </div>
          </div>

          {/* Excel Pivot Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Sales Trends Line Chart */}
            <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
              <h5 className="text-xs font-bold text-slate-700 mb-3 flex items-center justify-between border-b border-slate-100 pb-2">
                <span>Month-on-Month Trends Analysis</span>
                <span className="text-[10px] font-normal text-slate-400">Excel Chart Type: Line with Markers</span>
              </h5>
              <div className="h-56 w-full text-[10px]">
                {filteredData.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-slate-400">No data fits current filter criteria</div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="month" tick={{ fill: '#64748b' }} />
                      <YAxis tick={{ fill: '#64748b' }} />
                      <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '6px' }} />
                      <Legend wrapperStyle={{ fontSize: '10px' }} />
                      <Line type="monotone" dataKey="Sales" stroke="#107c41" strokeWidth={2.5} activeDot={{ r: 6 }} />
                      <Line type="monotone" dataKey="Profit" stroke="#0ea5e9" strokeWidth={1.5} />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>

            {/* Category Performance Bar Chart */}
            <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
              <h5 className="text-xs font-bold text-slate-700 mb-3 flex items-center justify-between border-b border-slate-100 pb-2">
                <span>Category Revenue Distribution</span>
                <span className="text-[10px] font-normal text-slate-400">Excel Chart Type: Clustered Column</span>
              </h5>
              <div className="h-56 w-full text-[10px]">
                {filteredData.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-slate-400">No data fits current filter criteria</div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={categoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="Category" tick={{ fill: '#64748b' }} />
                      <YAxis tick={{ fill: '#64748b' }} />
                      <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '6px' }} />
                      <Bar dataKey="Sales" fill="#107c41" radius={[4, 4, 0, 0]} barSize={40} />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
          </div>

          {/* Regional Contribution Donut Chart */}
          <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <h5 className="text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
                  <span>Territory Market Share (Region breakdown)</span>
                </h5>
                <p className="text-[11px] text-slate-400 mb-4">Calculates sales percentage contribution by sales territory.</p>
                
                <div className="space-y-1.5">
                  {regionalData.map(d => {
                    const pct = kpis.totalSales > 0 ? Math.round((d.value / kpis.totalSales) * 100) : 0;
                    return (
                      <div key={d.name} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }}></span>
                          <span className="text-slate-600">{d.name}</span>
                        </div>
                        <span className="font-bold text-slate-800">₹{d.value.toLocaleString()} ({pct}%)</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="w-44 h-44 flex-shrink-0 relative">
                {filteredData.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-slate-400 text-xs">No Data</div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={regionalData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={75}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {regionalData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                )}
                {/* Center total sales overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">Total</span>
                  <span className="text-xs font-extrabold text-slate-700">₹{kpis.totalSales.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 3. POWER BI BUSINESS INTELLIGENCE DASHBOARD
// ==========================================
export const PowerBiDashboardPreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'summary' | 'profitability'>('summary');
  const [selectedSegment, setSelectedSegment] = useState<string | 'All'>('All');

  // Cross-filtering by Segment
  const filteredData = useMemo(() => {
    return MASTER_DATASET.filter(row => {
      return selectedSegment === 'All' || row.segment === selectedSegment;
    });
  }, [selectedSegment]);

  // Aggregate stats
  const totals = useMemo(() => {
    const sales = filteredData.reduce((s, r) => s + r.sales, 0);
    const profit = filteredData.reduce((s, r) => s + r.profit, 0);
    const margin = sales > 0 ? (profit / sales) * 100 : 0;
    const units = filteredData.reduce((s, r) => s + r.quantity, 0);
    return { sales, profit, margin, units };
  }, [filteredData]);

  // Data grouped by Segment for segment breakdown comparison
  const segmentPerformance = useMemo(() => {
    const segments = ['Consumer', 'Corporate', 'Home Office'];
    return segments.map(seg => {
      const segRows = MASTER_DATASET.filter(r => r.segment === seg);
      const sales = segRows.reduce((s, r) => s + r.sales, 0);
      const profit = segRows.reduce((s, r) => s + r.profit, 0);
      return { segment: seg, Sales: sales, Profit: profit };
    });
  }, []);

  // Time Series Area charts
  const areaChartData = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months.map(m => {
      const rows = filteredData.filter(r => r.month === m);
      const sales = rows.reduce((s, r) => s + r.sales, 0);
      const profit = rows.reduce((s, r) => s + r.profit, 0);
      return { month: m, Sales: sales, Profit: profit };
    });
  }, [filteredData]);

  return (
    <div className="bg-slate-900 text-slate-100 border border-slate-800 rounded-xl overflow-hidden shadow-md font-sans">
      {/* Power BI Styled Dark Titlebar */}
      <div className="bg-[#1f1f1f] border-b border-slate-800 px-4 py-3 flex justify-between items-center flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-amber-500" />
          <span className="font-bold text-xs md:text-sm text-slate-200">Power BI Corporate Analytics Dashboard — Exec View</span>
        </div>
        <div className="flex bg-slate-800 p-0.5 rounded text-[11px] font-semibold">
          <button 
            onClick={() => setActiveTab('summary')}
            className={`px-3 py-1 rounded transition-all ${activeTab === 'summary' ? 'bg-[#f2c811] text-slate-900 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Sales & Segment Mix
          </button>
          <button 
            onClick={() => setActiveTab('profitability')}
            className={`px-3 py-1 rounded transition-all ${activeTab === 'profitability' ? 'bg-[#f2c811] text-slate-900 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Regional KPIs & Tables
          </button>
        </div>
      </div>

      <div className="p-4 md:p-6 space-y-6">
        {/* Banner Explaining Cross-Filtering */}
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 text-xs text-amber-300 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <span>
            <strong>Interactive Feature:</strong> Click on the <strong>Segment pill buttons</strong> below. The entire dashboard charts will cross-filter instantly to reflect that consumer segment, matching true Power BI cross-report filtering!
          </span>
        </div>

        {/* Dynamic Segment Selection Pill Filter */}
        <div className="flex items-center gap-2 flex-wrap text-xs font-semibold">
          <span className="text-slate-400 flex items-center gap-1"><Filter className="w-3.5 h-3.5" /> Segment Filter:</span>
          {['All', 'Consumer', 'Corporate', 'Home Office'].map(seg => (
            <button
              key={seg}
              onClick={() => setSelectedSegment(seg)}
              className={`px-3 py-1 rounded-full transition-all border cursor-pointer ${
                selectedSegment === seg 
                  ? 'bg-[#f2c811] text-slate-950 border-amber-500 font-bold shadow' 
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
            >
              {seg === 'All' ? 'All Segments' : seg}
            </button>
          ))}
        </div>

        {/* 3 Large KPI Indicator Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">YTD Corporate Revenue</span>
              <span className="text-2xl font-extrabold text-white block mt-1">₹{totals.sales.toLocaleString()}</span>
            </div>
            <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-700/50 pt-2">
              <span>Target: ₹5,000</span>
              <span className="text-emerald-400 font-bold">✓ Achieved</span>
            </div>
          </div>
          <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Net Segment Margin</span>
              <span className="text-2xl font-extrabold text-amber-400 block mt-1">{totals.margin.toFixed(1)}%</span>
            </div>
            <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-700/50 pt-2">
              <span>Profit: ₹{totals.profit.toLocaleString()}</span>
              <span className="text-indigo-400 font-bold">Stable mix</span>
            </div>
          </div>
          <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Units Dispatched (Qty)</span>
              <span className="text-2xl font-extrabold text-white block mt-1">{totals.units} units</span>
            </div>
            <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-700/50 pt-2">
              <span>Orders: {filteredData.length}</span>
              <span className="text-teal-400 font-bold">Avg: {totals.units > 0 ? (totals.units/filteredData.length).toFixed(1) : 0}/ord</span>
            </div>
          </div>
        </div>

        {/* TAB CONTENTS */}
        {activeTab === 'summary' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sales vs Profit monthly trend line/area */}
            <div className="bg-slate-800/40 border border-slate-800 rounded-xl p-4">
              <h5 className="text-xs font-bold text-slate-200 mb-4 flex items-center gap-1.5 border-b border-slate-800 pb-2">
                <Activity className="w-4 h-4 text-amber-500" />
                Monthly Revenue & Profit Growth Cycle
              </h5>
              <div className="h-64 w-full text-[10px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={areaChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f2c811" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#f2c811" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="month" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', color: '#f1f5f9', fontSize: '11px', borderRadius: '6px' }} />
                    <Legend wrapperStyle={{ fontSize: '10px' }} />
                    <Area type="monotone" dataKey="Sales" stroke="#f2c811" strokeWidth={2.5} fillOpacity={1} fill="url(#colorSales)" />
                    <Area type="monotone" dataKey="Profit" stroke="#0ea5e9" strokeWidth={1.5} fillOpacity={1} fill="url(#colorProfit)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Segment Breakdown Composed Chart */}
            <div className="bg-slate-800/40 border border-slate-800 rounded-xl p-4">
              <h5 className="text-xs font-bold text-slate-200 mb-4 flex items-center gap-1.5 border-b border-slate-800 pb-2">
                <Layers className="w-4 h-4 text-amber-500" />
                Segment Comparative Analysis (Unfiltered master reference)
              </h5>
              <div className="h-64 w-full text-[10px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={segmentPerformance} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="segment" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', color: '#f1f5f9', fontSize: '11px', borderRadius: '6px' }} />
                    <Legend wrapperStyle={{ fontSize: '10px' }} />
                    <Bar dataKey="Sales" fill="#f2c811" radius={[4, 4, 0, 0]} barSize={40} />
                    <Line type="monotone" dataKey="Profit" stroke="#38bdf8" strokeWidth={3} dot={{ stroke: '#38bdf8', strokeWidth: 2, r: 4 }} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        ) : (
          /* TAB 2: REGIONAL TABLES */
          <div className="bg-slate-800/20 border border-slate-800 rounded-xl p-4 space-y-4">
            <h5 className="text-xs font-bold text-slate-200 border-b border-slate-800 pb-2">
              Territory Analytics Breakdown
            </h5>
            
            <div className="overflow-x-auto rounded-lg border border-slate-800">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-800 text-slate-300 font-semibold border-b border-slate-700">
                    <th className="p-3">Sales Region</th>
                    <th className="p-3">Volume Records</th>
                    <th className="p-3">Aggregated Revenue</th>
                    <th className="p-3">Aggregated Profit</th>
                    <th className="p-3">Average Margin</th>
                    <th className="p-3">Share Contribution</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {['North', 'South', 'East', 'West'].map(region => {
                    const regRows = filteredData.filter(r => r.region === region);
                    const sales = regRows.reduce((sum, r) => sum + r.sales, 0);
                    const profit = regRows.reduce((sum, r) => sum + r.profit, 0);
                    const margin = sales > 0 ? (profit / sales) * 100 : 0;
                    const totalSalesAllFiltered = totals.sales || 1;
                    const share = (sales / totalSalesAllFiltered) * 100;

                    return (
                      <tr key={region} className="hover:bg-slate-800/40 text-slate-300">
                        <td className="p-3 font-semibold text-white">{region}</td>
                        <td className="p-3 font-mono text-slate-400">{regRows.length} feeds</td>
                        <td className="p-3 font-bold text-slate-100">₹{sales.toLocaleString()}</td>
                        <td className="p-3 font-bold text-emerald-400">₹{profit.toLocaleString()}</td>
                        <td className="p-3 font-mono">{margin.toFixed(1)}%</td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-slate-800 h-1.5 rounded-full overflow-hidden max-w-[80px]">
                              <div className="bg-[#f2c811] h-full" style={{ width: `${share}%` }}></div>
                            </div>
                            <span className="font-mono text-[10px] text-slate-400">{share.toFixed(0)}%</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ==========================================
// 4. PYTHON DATA ANALYSIS JUPYTER PREVIEW
// ==========================================
export const PythonAnalysisPreview: React.FC = () => {
  const [activeCell, setActiveCell] = useState(1);
  const [cell1Running, setCell1Running] = useState(false);
  const [cell1Output, setCell1Output] = useState<any[] | null>(null);
  
  const [cell2Running, setCell2Running] = useState(false);
  const [cell2Output, setCell2Output] = useState<string | null>(null);
  
  const [cell3Running, setCell3Running] = useState(false);
  const [cell3Output, setCell3Output] = useState<boolean>(false);

  // Raw, messy sales records before Pandas cleaning simulation
  const MESSY_RECORDS = [
    { order_id: 1001, date: '2025-01-15', customer_name: 'Aditya Sen', category: 'grocery', sales: 120, profit: null },
    { order_id: 1002, date: '2025-02-18', customer_name: 'Pooja Sharma', category: 'Grocery  ', sales: 80, profit: 16 },
    { order_id: 1003, date: '2025-03-12', customer_name: 'Vikram Nair', category: 'household', sales: 250, profit: 75 },
    { order_id: 1003, date: '2025-03-12', customer_name: 'Vikram Nair', category: 'household', sales: 250, profit: 75 }, // duplicate
    { order_id: 1004, date: '2025-04-25', customer_name: 'Neha Gupta', category: 'BEVERAGES', sales: 150, profit: null },
  ];

  const runCell1 = () => {
    setCell1Running(true);
    setTimeout(() => {
      setCell1Running(false);
      setCell1Output(MESSY_RECORDS);
      setActiveCell(2);
    }, 800);
  };

  const runCell2 = () => {
    setCell2Running(true);
    setTimeout(() => {
      setCell2Running(false);
      setCell2Output(`DataFrame Cleaned Successfully!
- Removed 1 duplicate rows
- Imputed 2 missing (NaN) values in 'profit' column (using default 20% margin calculation)
- Standardized and stripped text casing in 'category' column
- Clean Dataframe shape: (4 rows, 6 columns)`);
      setActiveCell(3);
    }, 1200);
  };

  const runCell3 = () => {
    setCell3Running(true);
    setTimeout(() => {
      setCell3Running(false);
      setCell3Output(true);
    }, 900);
  };

  const resetNotebook = () => {
    setActiveCell(1);
    setCell1Output(null);
    setCell2Output(null);
    setCell3Output(false);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm font-sans text-slate-800">
      {/* Jupyter Hub Notebook Bar */}
      <div className="bg-[#f1f5f9] border-b border-slate-200 px-4 py-2 flex justify-between items-center flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Terminal className="w-5 h-5 text-amber-600" />
          <span className="font-bold text-xs font-mono text-slate-700">exploratory_analysis.ipynb — Jupyter Sandbox</span>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={resetNotebook}
            className="flex items-center gap-1.5 border border-slate-200 hover:bg-slate-200 text-[10px] font-bold px-2.5 py-1 rounded transition-all cursor-pointer bg-white"
          >
            <RefreshCw className="w-3 h-3" /> Clear Kernel & Reset
          </button>
          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">Python 3.10 (ipykernel)</span>
        </div>
      </div>

      <div className="p-4 md:p-6 space-y-6">
        {/* Cell 1 */}
        <div className={`border rounded-lg overflow-hidden transition-all duration-300 ${activeCell === 1 ? 'ring-2 ring-amber-500 border-amber-500' : 'border-slate-200'}`}>
          <div className="bg-slate-50 border-b border-slate-100 px-3 py-2 flex items-center justify-between">
            <span className="font-mono text-[10px] text-slate-500">In [1]:</span>
            <button 
              disabled={cell1Running}
              onClick={runCell1}
              className="bg-slate-200 hover:bg-amber-500 hover:text-white px-3 py-1 rounded text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-all disabled:opacity-50"
            >
              <Play className="w-2.5 h-2.5 fill-current" /> Run Cell
            </button>
          </div>
          <div className="p-3 bg-slate-950 font-mono text-xs text-amber-400 overflow-x-auto whitespace-pre">
{`import pandas as pd
import numpy as np

# Load raw transactional database feed
raw_df = pd.DataFrame(messy_transaction_records)
print("Raw Data Shape:", raw_df.shape)
raw_df.head()`}
          </div>

          {/* Cell 1 Output */}
          {cell1Running && (
            <div className="p-3 bg-slate-50 border-t border-slate-100 text-xs text-slate-500 flex items-center gap-2">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-500" /> Running python code cell...
            </div>
          )}

          {cell1Output && (
            <div className="p-3 bg-white border-t border-slate-100 text-xs">
              <p className="text-[10px] text-slate-400 font-bold uppercase mb-2">Cell Output (Messy Raw DataFrame):</p>
              <p className="font-mono text-[11px] text-slate-600 mb-2">Raw Data Shape: (5 rows, 6 columns)</p>
              <div className="overflow-x-auto border rounded border-slate-100">
                <table className="w-full text-left font-mono text-[10px] border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 border-b border-slate-100">
                      <th className="p-2">order_id</th>
                      <th className="p-2">date</th>
                      <th className="p-2">customer_name</th>
                      <th className="p-2 bg-rose-50 text-rose-700">category (casing / spaces)</th>
                      <th className="p-2">sales</th>
                      <th className="p-2 bg-rose-50 text-rose-700">profit (Missing NaN)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {cell1Output.map((row, idx) => (
                      <tr key={idx} className={idx === 3 ? 'bg-red-50 text-red-600' : ''}>
                        <td className="p-2">{row.order_id}</td>
                        <td className="p-2">{row.date}</td>
                        <td className="p-2">{row.customer_name}</td>
                        <td className="p-2">{row.category}</td>
                        <td className="p-2">₹{row.sales}</td>
                        <td className="p-2">{row.profit === null ? <span className="text-rose-500 font-bold">NaN</span> : `₹${row.profit}`}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-[10px] text-red-500 font-semibold mt-2">Anomaly Found: Row 3 is an exact duplicate. Categories have trailing spaces & case discrepancies. Missing NaN profits found in Row 0 and Row 4.</p>
            </div>
          )}
        </div>

        {/* Cell 2 */}
        <div className={`border rounded-lg overflow-hidden transition-all duration-300 ${activeCell === 2 ? 'ring-2 ring-amber-500 border-amber-500' : 'border-slate-200'}`}>
          <div className="bg-slate-50 border-b border-slate-100 px-3 py-2 flex items-center justify-between">
            <span className="font-mono text-[10px] text-slate-500">In [2]:</span>
            <button 
              disabled={cell2Running || !cell1Output}
              onClick={runCell2}
              className="bg-slate-200 hover:bg-amber-500 hover:text-white px-3 py-1 rounded text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-all disabled:opacity-50"
            >
              <Play className="w-2.5 h-2.5 fill-current" /> Run Cell
            </button>
          </div>
          <div className="p-3 bg-slate-950 font-mono text-xs text-amber-400 overflow-x-auto whitespace-pre">
{`# Pandas Data Wrangling Pipeline
# 1. Drop complete duplicates
cleaned_df = raw_df.drop_duplicates()

# 2. Impute missing profit values based on constant 20% sales margin
cleaned_df['profit'] = cleaned_df['profit'].fillna(cleaned_df['sales'] * 0.20)

# 3. Clean string column trailing whitespace and standardize title casing
cleaned_df['category'] = cleaned_df['category'].str.strip().str.title()

print("DataFrame Cleaned Successfully!")
print("- Remaining duplicates:", cleaned_df.duplicated().sum())
print("- Total Null counts:", cleaned_df.isnull().sum().sum())`}
          </div>

          {/* Cell 2 Output */}
          {cell2Running && (
            <div className="p-3 bg-slate-50 border-t border-slate-100 text-xs text-slate-500 flex items-center gap-2">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-500" /> Applying Pandas vector transformations...
            </div>
          )}

          {cell2Output && (
            <div className="p-3 bg-white border-t border-slate-100 text-xs">
              <p className="text-[10px] text-slate-400 font-bold uppercase mb-2">Cell Output (Data Wrangling Summary):</p>
              <pre className="font-mono text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-100 rounded p-3 mb-4">{cell2Output}</pre>
              
              <div className="overflow-x-auto border rounded border-slate-100">
                <table className="w-full text-left font-mono text-[10px] border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 border-b border-slate-100">
                      <th className="p-2">order_id</th>
                      <th className="p-2">date</th>
                      <th className="p-2">customer_name</th>
                      <th className="p-2 bg-emerald-50 text-emerald-800">category (Standardized)</th>
                      <th className="p-2">sales</th>
                      <th className="p-2 bg-emerald-50 text-emerald-800">profit (Imputed 20%)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      { order_id: 1001, date: '2025-01-15', customer_name: 'Aditya Sen', category: 'Grocery', sales: 120, profit: 24 },
                      { order_id: 1002, date: '2025-02-18', customer_name: 'Pooja Sharma', category: 'Grocery', sales: 80, profit: 16 },
                      { order_id: 1003, date: '2025-03-12', customer_name: 'Vikram Nair', category: 'Household', sales: 250, profit: 75 },
                      { order_id: 1004, date: '2025-04-25', customer_name: 'Neha Gupta', category: 'Beverages', sales: 150, profit: 30 },
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="p-2">{row.order_id}</td>
                        <td className="p-2">{row.date}</td>
                        <td className="p-2">{row.customer_name}</td>
                        <td className="p-2 font-semibold text-emerald-800">{row.category}</td>
                        <td className="p-2">₹{row.sales}</td>
                        <td className="p-2 text-emerald-800 font-bold">₹{row.profit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Cell 3 */}
        <div className={`border rounded-lg overflow-hidden transition-all duration-300 ${activeCell === 3 ? 'ring-2 ring-amber-500 border-amber-500' : 'border-slate-200'}`}>
          <div className="bg-slate-50 border-b border-slate-100 px-3 py-2 flex items-center justify-between">
            <span className="font-mono text-[10px] text-slate-500">In [3]:</span>
            <button 
              disabled={cell3Running || !cell2Output}
              onClick={runCell3}
              className="bg-slate-200 hover:bg-amber-500 hover:text-white px-3 py-1 rounded text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-all disabled:opacity-50"
            >
              <Play className="w-2.5 h-2.5 fill-current" /> Run Cell
            </button>
          </div>
          <div className="p-3 bg-slate-950 font-mono text-xs text-amber-400 overflow-x-auto whitespace-pre">
{`import matplotlib.pyplot as plt

# Plot Category-wise total Sales contribution
plt.figure(figsize=(8, 4))
category_totals = cleaned_df.groupby('category')['sales'].sum()

# Render custom bar chart using Seaborn style
category_totals.plot(kind='bar', color=['#0284c7', '#0ea5e9', '#0d9488'], width=0.5)
plt.title("Total Revenue by Category (Matplotlib Plot)", fontsize=11, fontweight='bold')
plt.xlabel("Category")
plt.ylabel("Revenue in ₹")
plt.grid(axis='y', linestyle='--', alpha=0.5)
plt.tight_layout()
plt.show()`}
          </div>

          {/* Cell 3 Output */}
          {cell3Running && (
            <div className="p-3 bg-slate-50 border-t border-slate-100 text-xs text-slate-500 flex items-center gap-2">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-500" /> Compiling Matplotlib figure...
            </div>
          )}

          {cell3Output && (
            <div className="p-3 bg-white border-t border-slate-100 text-xs">
              <p className="text-[10px] text-slate-400 font-bold uppercase mb-2">Cell Output (Matplotlib Rendered Figure):</p>
              
              <div className="bg-slate-50 border border-slate-100 rounded-lg p-4 max-w-md mx-auto text-[10px]">
                <div className="text-center font-extrabold text-slate-800 text-sm mb-2">Total Revenue by Category (Matplotlib Plot)</div>
                <div className="h-44 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                      { name: 'Grocery', Sales: 200 },
                      { name: 'Household', Sales: 250 },
                      { name: 'Beverages', Sales: 150 },
                    ]} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="name" tick={{ fill: '#475569', fontSize: 10 }} />
                      <YAxis tick={{ fill: '#475569', fontSize: 10 }} />
                      <Tooltip />
                      <Bar dataKey="Sales" fill="#0ea5e9" radius={[3, 3, 0, 0]} barSize={35}>
                        <Cell fill="#0284c7" />
                        <Cell fill="#0ea5e9" />
                        <Cell fill="#0d9488" />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 5. SQL DATABASE INTERACTIVE TERMINAL PREVIEW
// ==========================================
export const SqlProjectPreview: React.FC = () => {
  const [selectedPresetQuery, setSelectedPresetQuery] = useState(1);
  const [customQueryText, setCustomQueryText] = useState('');
  const [queryExecuting, setQueryExecuting] = useState(false);
  const [queryResultRows, setQueryResultRows] = useState<any[] | null>(null);
  const [queryTime, setQueryTime] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  // Sample Relational Tables definitions
  const MOCK_CUSTOMERS_TABLE = [
    { customer_id: 201, customer_name: 'Aditya Sen', city: 'Bangalore', segment: 'Consumer' },
    { customer_id: 202, customer_name: 'Pooja Sharma', city: 'Mumbai', segment: 'Consumer' },
    { customer_id: 203, customer_name: 'Vikram Nair', city: 'Chennai', segment: 'Corporate' },
    { customer_id: 204, customer_name: 'Neha Gupta', city: 'Delhi', segment: 'Home Office' },
  ];

  const MOCK_ORDERS_TABLE = [
    { order_id: 4001, customer_id: 201, product: 'Fresh Apples', sales: 120, profit: 30 },
    { order_id: 4002, customer_id: 202, product: 'Organic Milk', sales: 80, profit: 16 },
    { order_id: 4003, customer_id: 203, product: 'Detergent Powder', sales: 250, profit: 75 },
    { order_id: 4004, customer_id: 204, product: 'Green Tea Pack', sales: 150, profit: 45 },
    { order_id: 4005, customer_id: 201, product: 'Wheat Bread', sales: 60, profit: 12 },
  ];

  const presetQueries = [
    {
      id: 1,
      name: '1. SELECT * FROM customers',
      sql: 'SELECT customer_id, customer_name, city, segment \nFROM customers;',
      description: 'Fetch all registered corporate and retail client accounts in the database.'
    },
    {
      id: 2,
      name: '2. INNER JOIN Customers & Orders',
      sql: 'SELECT o.order_id, c.customer_name, o.product, o.sales, o.profit \nFROM customers c \nINNER JOIN orders o ON c.customer_id = o.customer_id;',
      description: 'Combine demographic variables with sales receipts to isolate purchase patterns.'
    },
    {
      id: 3,
      name: '3. GROUP BY Aggregation (Sales by City)',
      sql: 'SELECT c.city, COUNT(o.order_id) AS total_orders, SUM(o.sales) AS total_revenue \nFROM customers c \nINNER JOIN orders o ON c.customer_id = o.customer_id \nGROUP BY c.city \nORDER BY total_revenue DESC;',
      description: 'Calculate geographic financial reports. Sum revenue and count orders grouped by regional headquarters.'
    }
  ];

  const executePreset = (id: number) => {
    setSelectedPresetQuery(id);
    const query = presetQueries.find(q => q.id === id);
    if (!query) return;

    setQueryExecuting(true);
    setErrorMessage('');
    
    setTimeout(() => {
      setQueryExecuting(false);
      setQueryTime(parseFloat((Math.random() * 8 + 3).toFixed(2))); // Simulated response time 3ms to 11ms

      if (id === 1) {
        setQueryResultRows(MOCK_CUSTOMERS_TABLE);
      } else if (id === 2) {
        // Mock join results
        const joinResults = MOCK_ORDERS_TABLE.map(order => {
          const cust = MOCK_CUSTOMERS_TABLE.find(c => c.customer_id === order.customer_id);
          return {
            order_id: order.order_id,
            customer_name: cust?.customer_name || 'N/A',
            product: order.product,
            sales: `₹${order.sales}`,
            profit: `₹${order.profit}`
          };
        });
        setQueryResultRows(joinResults);
      } else if (id === 3) {
        // Mock aggregation results
        const aggResults = [
          { city: 'Chennai', total_orders: 1, total_revenue: '₹250' },
          { city: 'Bangalore', total_orders: 2, total_revenue: '₹180' },
          { city: 'Delhi', total_orders: 1, total_revenue: '₹150' },
          { city: 'Mumbai', total_orders: 1, total_revenue: '₹80' },
        ];
        setQueryResultRows(aggResults);
      }
    }, 600);
  };

  const handleRunCustomQuery = () => {
    if (!customQueryText.trim()) return;
    setQueryExecuting(true);
    setErrorMessage('');
    setQueryResultRows(null);

    setTimeout(() => {
      setQueryExecuting(false);
      setQueryTime(parseFloat((Math.random() * 15 + 8).toFixed(2)));

      const queryNormalized = customQueryText.toLowerCase();

      if (queryNormalized.includes('select') && queryNormalized.includes('customers')) {
        setQueryResultRows(MOCK_CUSTOMERS_TABLE);
      } else if (queryNormalized.includes('select') && queryNormalized.includes('orders')) {
        setQueryResultRows(MOCK_ORDERS_TABLE);
      } else if (queryNormalized.includes('join')) {
        // return mock join
        const joinResults = MOCK_ORDERS_TABLE.map(order => {
          const cust = MOCK_CUSTOMERS_TABLE.find(c => c.customer_id === order.customer_id);
          return {
            order_id: order.order_id,
            customer_name: cust?.customer_name || 'N/A',
            product: order.product,
            sales: `₹${order.sales}`,
            profit: `₹${order.profit}`
          };
        });
        setQueryResultRows(joinResults);
      } else {
        setErrorMessage(`SQL Syntax Analysis Error: Table or statement not recognized. 
Tip: Our SQL sandbox engine supports standard relational syntax. 
Try queries utilizing table terms "customers" or "orders".`);
      }
    }, 800);
  };

  return (
    <div className="bg-slate-900 border border-indigo-900/40 rounded-xl overflow-hidden shadow-sm font-sans text-slate-100">
      {/* Title */}
      <div className="bg-[#1e293b] border-b border-slate-800 px-4 py-2.5 flex items-center gap-2">
        <Database className="w-5 h-5 text-indigo-400" />
        <span className="font-bold text-xs md:text-sm font-mono text-slate-200">MySQL Server Instance Terminal — Shahid_Ali_DB</span>
      </div>

      <div className="p-4 md:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: DB Schema & Preset queries list */}
        <div className="space-y-4">
          {/* Mock Schema Structure */}
          <div className="bg-slate-950 border border-slate-800 rounded-lg p-3">
            <h5 className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider mb-2 flex items-center gap-1">
              <Table className="w-3.5 h-3.5" /> Schema Metadata Inspector
            </h5>
            <div className="space-y-3 text-[11px] font-mono text-slate-400">
              <div>
                <span className="text-white font-bold">📂 Table: customers</span>
                <ul className="pl-3 list-disc text-slate-500">
                  <li>customer_id <span className="text-indigo-400">INT (PK)</span></li>
                  <li>customer_name <span className="text-amber-400">VARCHAR</span></li>
                  <li>city <span className="text-amber-400">VARCHAR</span></li>
                  <li>segment <span className="text-amber-400">VARCHAR</span></li>
                </ul>
              </div>
              <div>
                <span className="text-white font-bold">📂 Table: orders</span>
                <ul className="pl-3 list-disc text-slate-500">
                  <li>order_id <span className="text-indigo-400">INT (PK)</span></li>
                  <li>customer_id <span className="text-indigo-400">INT (FK)</span></li>
                  <li>product <span className="text-amber-400">VARCHAR</span></li>
                  <li>sales <span className="text-indigo-400">DECIMAL</span></li>
                  <li>profit <span className="text-indigo-400">DECIMAL</span></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Preset Buttons */}
          <div className="space-y-2">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Run Pre-engineered SQL Scripts:</span>
            {presetQueries.map(q => (
              <button
                key={q.id}
                onClick={() => executePreset(q.id)}
                className={`w-full text-left p-2.5 rounded-lg border text-xs transition-all cursor-pointer flex flex-col justify-between ${
                  selectedPresetQuery === q.id 
                    ? 'bg-indigo-950/75 border-indigo-500 text-indigo-200' 
                    : 'bg-slate-800/40 border-slate-800 text-slate-300 hover:bg-slate-800/80'
                }`}
              >
                <span className="font-bold block">{q.name}</span>
                <span className="text-[10px] text-slate-400 mt-1 font-sans line-clamp-2">{q.description}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: Terminal Execution & Output Screen */}
        <div className="lg:col-span-2 space-y-4 flex flex-col justify-between">
          {/* Query Editor */}
          <div className="bg-slate-950 border border-slate-800 rounded-lg overflow-hidden flex flex-col">
            <div className="bg-slate-800/80 border-b border-slate-800 px-3 py-1.5 flex justify-between items-center text-xs">
              <span className="font-mono text-slate-400 text-[10px]">SQL Sandbox Terminal Console</span>
              <button 
                disabled={queryExecuting}
                onClick={() => {
                  setSelectedPresetQuery(0);
                  handleRunCustomQuery();
                }}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[10px] px-3 py-1 rounded flex items-center gap-1 cursor-pointer transition-all disabled:opacity-50"
              >
                <Play className="w-2.5 h-2.5 fill-current" /> Run Custom SQL
              </button>
            </div>
            
            {/* Custom Input */}
            <textarea
              placeholder="-- Write custom relational query scripts here or run presets on left...&#10;SELECT * FROM customers WHERE city = 'Bangalore';"
              value={selectedPresetQuery !== 0 ? presetQueries.find(q => q.id === selectedPresetQuery)?.sql : customQueryText}
              onChange={(e) => {
                setSelectedPresetQuery(0);
                setCustomQueryText(e.target.value);
              }}
              className="w-full bg-slate-950 text-emerald-400 font-mono text-xs p-3 focus:outline-none min-h-[110px] resize-none"
            />
          </div>

          {/* Results Console Output Screen */}
          <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 flex-1 flex flex-col justify-between min-h-[200px]">
            <div>
              <div className="flex items-center justify-between text-[10px] font-bold uppercase text-slate-500 border-b border-slate-800 pb-2 mb-3">
                <span>SQL Output Console</span>
                {queryResultRows && !queryExecuting && (
                  <span className="text-emerald-500 font-mono text-[9px]">Query Completed in {queryTime}ms — {queryResultRows.length} rows</span>
                )}
              </div>

              {queryExecuting && (
                <div className="flex flex-col items-center justify-center py-12 text-slate-500 text-xs">
                  <RefreshCw className="w-6 h-6 animate-spin text-indigo-500 mb-2" />
                  <span className="font-mono">Executing query plan on relational node...</span>
                </div>
              )}

              {errorMessage && !queryExecuting && (
                <div className="text-rose-400 font-mono text-xs p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg whitespace-pre-wrap">
                  {errorMessage}
                </div>
              )}

              {queryResultRows && !queryExecuting && (
                <div className="overflow-x-auto border border-slate-800 rounded max-h-[160px]">
                  <table className="w-full text-left font-mono text-[10px] border-collapse">
                    <thead>
                      <tr className="bg-slate-900 text-slate-400 border-b border-slate-800">
                        {Object.keys(queryResultRows[0] || {}).map(key => (
                          <th key={key} className="p-2 font-bold text-slate-300">{key}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {queryResultRows.map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-900/50">
                          {Object.values(row).map((val: any, colIdx) => (
                            <td key={colIdx} className="p-2 text-emerald-400 font-mono">{String(val)}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {!queryResultRows && !queryExecuting && !errorMessage && (
                <div className="text-center py-12 text-slate-600 font-mono text-xs">
                  &gt; Select an engineered relational preset query or write custom statements above to scan.
                </div>
              )}
            </div>

            <div className="text-[9px] text-slate-500 font-mono text-right mt-3 border-t border-slate-800/30 pt-2">
              MySQL v8.0.35 // Connections: 1 active // Host: localhost
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
