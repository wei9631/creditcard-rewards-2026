import React, { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ bank: '', category: '' });
  const [showFilters, setShowFilters] = useState(false);

  const banks = [
    '台灣銀行',
    '中國信託',
    '中華開發',
    '玉山銀行',
    '永豐銀行',
    '聯邦銀行',
    '東亞銀行'
  ];

  const categories = [
    '現金回饋',
    '紅利點數',
    '里程數',
    '購物優惠',
    '餐飲優惠'
  ];

  const handleSearch = (value) => {
    setSearchTerm(value);
    onSearch(value, filters);
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onSearch(searchTerm, newFilters);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="搜索信用卡名稱、銀行或類型..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
        >
          🔍 篩選
        </button>
      </div>

      {showFilters && (
        <div className="bg-white bg-opacity-95 p-4 rounded-lg grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              銀行
            </label>
            <select
              value={filters.bank}
              onChange={(e) => handleFilterChange('bank', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">全部銀行</option>
              {banks.map(bank => (
                <option key={bank} value={bank}>{bank}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              回饋類型
            </label>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">全部類型</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
