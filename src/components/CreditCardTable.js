import React, { useState } from 'react';

export default function CreditCardTable({ cards }) {
  const [sortConfig, setSortConfig] = useState({ key: 'cashback', order: 'desc' });

  const sortedCards = [...cards].sort((a, b) => {
    const aValue = parseFloat(a[sortConfig.key]) || 0;
    const bValue = parseFloat(b[sortConfig.key]) || 0;
    
    if (sortConfig.order === 'asc') {
      return aValue - bValue;
    }
    return bValue - aValue;
  });

  const handleSort = (key) => {
    setSortConfig({
      key,
      order: sortConfig.key === key && sortConfig.order === 'desc' ? 'asc' : 'desc'
    });
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return '';
    return sortConfig.order === 'asc' ? ' ▲' : ' ▼';
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
      <table className="w-full">
        <thead>
          <tr className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
            <th 
              onClick={() => handleSort('name')} 
              className="cursor-pointer hover:bg-blue-700 p-4 text-left"
            >
              信用卡名稱{getSortIndicator('name')}
            </th>
            <th 
              onClick={() => handleSort('bank')} 
              className="cursor-pointer hover:bg-blue-700 p-4 text-left"
            >
              發卡銀行{getSortIndicator('bank')}
            </th>
            <th 
              onClick={() => handleSort('category')} 
              className="cursor-pointer hover:bg-blue-700 p-4 text-left"
            >
              回饋類型{getSortIndicator('category')}
            </th>
            <th 
              onClick={() => handleSort('cashback')} 
              className="cursor-pointer hover:bg-blue-700 p-4 text-center"
            >
              現金回饋{getSortIndicator('cashback')}
            </th>
            <th 
              onClick={() => handleSort('annualFee')} 
              className="cursor-pointer hover:bg-blue-700 p-4 text-center"
            >
              年費{getSortIndicator('annualFee')}
            </th>
            <th className="p-4 text-center">
              詳情
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedCards.map((card, index) => (
            <tr 
              key={index}
              className="border-b hover:bg-blue-50 transition-colors"
            >
              <td className="p-4 font-semibold text-gray-800">
                {card.name}
              </td>
              <td className="p-4">
                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {card.bank}
                </span>
              </td>
              <td className="p-4">
                <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  {card.category}
                </span>
              </td>
              <td className="p-4 text-center font-bold text-green-600 text-lg">
                {card.cashback}%
              </td>
              <td className="p-4 text-center">
                {card.annualFee === 0 ? (
                  <span className="text-green-600 font-bold">免年費</span>
                ) : (
                  <span className="text-gray-700">${card.annualFee}</span>
                )}
              </td>
              <td className="p-4 text-center">
                <a 
                  href={card.applyUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  申請 →
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
