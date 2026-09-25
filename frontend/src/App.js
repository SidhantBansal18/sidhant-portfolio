import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, RefreshCw, AlertCircle, Loader2 } from 'lucide-react';
import './index.css';

const API_URL = 'http://localhost:8000/stocks';
const POLL_INTERVAL = 5000;

const StockDashboard = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchStocks = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setStocks(data);
      setError(null);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      console.error("Failed to fetch stocks:", err);
      setError("Unable to connect to stock server. Please check if the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStocks();
    const interval = setInterval(fetchStocks, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-2">
              <TrendingUp className="text-blue-500" size={32} />
              Market Pulse
            </h1>
            <p className="text-slate-400 mt-1">Real-time financial asset monitoring</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-xs text-slate-500 uppercase font-semibold">Last Updated</p>
              <p className="text-sm font-mono text-slate-300">{lastUpdated || 'Initializing...'}</p>
            </div>
            <div className="bg-slate-800 p-2 rounded-full animate-pulse">
              <RefreshCw size={20} className="text-blue-400" />
            </div>
          </div>
        </header>

        {/* Error State */}
        {error && (
          <div className="mb-6 p-4 bg-red-900/30 border border-red-500/50 rounded-lg flex items-start gap-3 text-red-200">
            <AlertCircle className="shrink-0 text-red-500" size={20} />
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <Loader2 className="animate-spin mb-4" size={40} />
            <p className="text-lg font-medium">Fetching market data...</p>
          </div>
        )}

        {/* Data Table */}
        {!loading && !error && (
          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="px-6 py-4 font-semibold">Symbol</th>
                  <th className="px-6 py-4 font-semibold">Price</th>
                  <th className="px-6 py-4 font-semibold">Change</th>
                  <th className="px-6 py-4 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {stocks.length > 0 ? (
                  stocks.map((stock) => {
                    const isPositive = stock.change >= 0;
                    return (
                      <tr key={stock.symbol} className="hover:bg-slate-800/30 transition-colors group">
                        <td className="px-6 py-4">
                          <span className="font-bold text-white group-hover:text-blue-400 transition-colors">
                            {stock.symbol}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-mono font-medium">
                          ${stock.price.toFixed(2)}
                        </td>
                        <td className={`px-6 py-4 font-medium flex items-center gap-1 ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                          {isPositive ? '+' : ''}{stock.change.toFixed(2)}%
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                            isPositive ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
                          }`}>
                            {isPositive ? 'Bullish' : 'Bearish'}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-12 text-center text-slate-500 italic">
                      No stock data available at the moment.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default StockDashboard;
