import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Layout from '@/components/Layout';

export default function Dashboard() {
  const router = useRouter();
  const [cards, setCards] = useState([]);
  const [editingCard, setEditingCard] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    bank: '',
    category: '',
    cashback: 0,
    annualFee: 0,
    description: '',
    applyUrl: ''
  });

  const handleLogout = () => {
    router.push('/admin/login');
  };

  const handleAddCard = () => {
    setEditingCard(null);
    setFormData({
      name: '',
      bank: '',
      category: '',
      cashback: 0,
      annualFee: 0,
      description: '',
      applyUrl: ''
    });
    setShowForm(true);
  };

  const handleSaveCard = async (e) => {
    e.preventDefault();
    // 在這裡添加保存邏輯
    console.log('保存卡片:', formData);
    setShowForm(false);
  };

  return (
    <>
      <Head>
        <title>管理後台 - 信用卡回饋比價</title>
      </Head>

      <Layout>
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">管理後台</h1>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              登出
            </button>
          </div>

          {/* 統計卡片 */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-gray-600 text-sm font-medium mb-2">總信用卡數</h3>
              <p className="text-3xl font-bold text-blue-600">6</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-gray-600 text-sm font-medium mb-2">平均回饋率</h3>
              <p className="text-3xl font-bold text-green-600">2.1%</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-gray-600 text-sm font-medium mb-2">今月流量</h3>
              <p className="text-3xl font-bold text-purple-600">1,234</p>
            </div>
          </div>

          {/* 操作按鈕 */}
          <div className="mb-6">
            <button
              onClick={handleAddCard}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold"
            >
              + 添加新信用卡
            </button>
          </div>

          {/* 表單 */}
          {showForm && (
            <div className="bg-white p-8 rounded-lg shadow-md mb-8">
              <h2 className="text-2xl font-bold mb-6">
                {editingCard ? '編輯信用卡' : '添加新信用卡'}
              </h2>
              <form onSubmit={handleSaveCard} className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">信用卡名稱</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">發卡銀行</label>
                  <input
                    type="text"
                    value={formData.bank}
                    onChange={(e) => setFormData({ ...formData, bank: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">回饋類型</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">現金回饋 (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.cashback}
                    onChange={(e) => setFormData({ ...formData, cashback: parseFloat(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">年費 ($)</label>
                  <input
                    type="number"
                    value={formData.annualFee}
                    onChange={(e) => setFormData({ ...formData, annualFee: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">申請 URL</label>
                  <input
                    type="url"
                    value={formData.applyUrl}
                    onChange={(e) => setFormData({ ...formData, applyUrl: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-medium mb-2">描述</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    rows="3"
                  />
                </div>
                <div className="md:col-span-2 flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-semibold"
                  >
                    保存
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 bg-gray-400 text-white py-2 rounded-lg hover:bg-gray-500 font-semibold"
                  >
                    取消
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* 信用卡列表 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <h2 className="text-2xl font-bold p-6 border-b">信用卡列表</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-4 text-left">卡片名稱</th>
                    <th className="p-4 text-left">銀行</th>
                    <th className="p-4 text-left">回饋率</th>
                    <th className="p-4 text-center">操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="p-4">現金回饋卡</td>
                    <td className="p-4">台灣銀行</td>
                    <td className="p-4">1.5%</td>
                    <td className="p-4 text-center">
                      <button className="text-blue-600 hover:underline mr-3">編輯</button>
                      <button className="text-red-600 hover:underline">刪除</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
