import Head from 'next/head';
import Layout from '@/components/Layout';
import CreditCardTable from '@/components/CreditCardTable';
import SearchBar from '@/components/SearchBar';
import AdBanner from '@/components/AdBanner';
import { useEffect, useState } from 'react';

export default function Home() {
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const res = await fetch('/api/cards');
      const data = await res.json();
      setCards(data);
      setFilteredCards(data);
    } catch (error) {
      console.error('加載數據失敗:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term, filters) => {
    setSearchTerm(term);
    
    let filtered = cards.filter(card => {
      const matchesSearch = 
        card.name.toLowerCase().includes(term.toLowerCase()) ||
        card.bank.toLowerCase().includes(term.toLowerCase()) ||
        card.category.toLowerCase().includes(term.toLowerCase());
      
      const matchesBank = !filters.bank || card.bank === filters.bank;
      const matchesCategory = !filters.category || card.category === filters.category;
      
      return matchesSearch && matchesBank && matchesCategory;
    });

    setFilteredCards(filtered);
  };

  return (
    <>
      <Head>
        <title>2026年信用卡回饋比價網站 - 最佳回饋率對比</title>
        <meta name="description" content="2026年台灣信用卡回饋比價網站，比較各銀行信用卡回饋率、優惠、年費等，幫助您選擇最適合的信用卡。" />
        <meta name="keywords" content="信用卡, 回饋, 比價, 2026, 現金回饋, 紅利點數, 信用卡推薦" />
        <meta property="og:title" content="2026年信用卡回饋比價網站" />
        <meta property="og:description" content="比較2026年最新信用卡回饋率、優惠條件、年費等" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1f2937" />
      </Head>

      <Layout>
        {/* 廣告位置 1 */}
        <AdBanner position="top" />

        <section className="hero py-12 md:py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="max-w-6xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              2026年信用卡回饋比價
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8">
              智慧比較信用卡優惠，找到最適合您的回饋方案
            </p>
            <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-6">
              <SearchBar onSearch={handleSearch} />
            </div>
          </div>
        </section>

        <section className="content py-12">
          <div className="max-w-6xl mx-auto px-4">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                精選信用卡對比
              </h2>
              <p className="text-gray-600">
                {filteredCards.length} 張信用卡 {searchTerm && `/ 搜索: "${searchTerm}"`}
              </p>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-600">加載中...</p>
              </div>
            ) : filteredCards.length > 0 ? (
              <CreditCardTable cards={filteredCards} />
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-600 text-lg">
                  找不到符合條件的信用卡，請修改搜索條件。
                </p>
              </div>
            )}
          </div>
        </section>

        {/* 廣告位置 2 */}
        <AdBanner position="middle" />

        {/* 信息部分 */}
        <section className="info bg-gray-50 py-12">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              如何選擇最適合的信用卡？
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-3xl mb-4">🎯</div>
                <h3 className="text-xl font-bold mb-2">1. 確定消費習慣</h3>
                <p className="text-gray-600">
                  根據您的主要消費類型（餐飲、加油、購物等）選擇相應的回饋卡。
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-3xl mb-4">📊</div>
                <h3 className="text-xl font-bold mb-2">2. 比較回饋率</h3>
                <p className="text-gray-600">
                  在本網站比較不同信用卡的回饋率和優惠條件。
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-3xl mb-4">✅</div>
                <h3 className="text-xl font-bold mb-2">3. 計算年費</h3>
                <p className="text-gray-600">
                  考慮信用卡年費，確保回饋收益大於年費成本。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 廣告位置 3 */}
        <AdBanner position="bottom" />
      </Layout>
    </>
  );
}
