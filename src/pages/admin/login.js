import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (res.ok) {
        router.push('/admin/dashboard');
      } else {
        setError('用戶名或密碼錯誤');
      }
    } catch (err) {
      setError('登入失敗，請重試');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>管理員登入 - 信用卡回饋比價</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
            💳 管理後台
          </h1>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                用戶名
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="輸入用戶名"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                密碼
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="輸入密碼"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 font-semibold transition-colors"
            >
              {loading ? '登入中...' : '登入'}
            </button>
          </form>

          <p className="text-center text-gray-500 text-sm mt-6">
            測試帳號: admin / admin123456
          </p>
        </div>
      </div>
    </>
  );
}
