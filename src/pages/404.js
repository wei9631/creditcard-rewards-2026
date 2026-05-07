import Head from 'next/head';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>頁面未找到 - 2026信用卡回饋比價</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
          <p className="text-2xl text-gray-600 mb-8">頁面未找到</p>
          <a href="/" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            返回首頁
          </a>
        </div>
      </div>
    </>
  );
}
