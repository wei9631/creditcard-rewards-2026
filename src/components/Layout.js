import React from 'react';

export default function Layout({ children }) {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen flex flex-col">
      {/* 頭部導航 */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <nav className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <a href="/" className="text-2xl font-bold text-blue-600">
              💳 信用卡比價
            </a>
            <p className="text-sm text-gray-500">{currentYear}年最新回饋</p>
          </div>
          <div className="flex gap-6">
            <a href="/" className="text-gray-700 hover:text-blue-600 font-medium">
              首頁
            </a>
            <a href="/admin/login" className="text-gray-700 hover:text-blue-600 font-medium">
              管理後台
            </a>
          </div>
        </nav>
      </header>

      {/* 主要內容 */}
      <main className="flex-1">
        {children}
      </main>

      {/* 頁腳 */}
      <footer className="bg-gray-900 text-white mt-12">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-3">關於本站</h3>
              <p className="text-gray-400 text-sm">
                提供最新、最準確的信用卡回饋比較信息，幫助用戶做出明智的選擇。
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-3">常見問題</h3>
              <ul className="text-gray-400 text-sm space-y-2">
                <li><a href="#" className="hover:text-white">如何申請信用卡？</a></li>
                <li><a href="#" className="hover:text-white">回饋如何計算？</a></li>
                <li><a href="#" className="hover:text-white">聯絡我們</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-3">聯絡方式</h3>
              <p className="text-gray-400 text-sm">
                Email: contact@creditcard2026.com<br />
                電話: (02) 1234-5678
              </p>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8 flex justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} 信用卡回饋比價網。保留所有權利。
            </p>
            <div className="text-gray-400 text-sm space-x-4">
              <a href="#" className="hover:text-white">隱私政策</a>
              <a href="#" className="hover:text-white">服務條款</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
