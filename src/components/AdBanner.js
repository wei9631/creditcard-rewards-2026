import React from 'react';

export default function AdBanner({ position }) {
  return (
    <div className={`ads-container ${position} py-4 md:py-8 bg-gray-100 border-y border-gray-200`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-gray-300 rounded-lg h-24 md:h-32 flex items-center justify-center text-gray-600 font-semibold">
          {/* Google AdSense 廣告位 */}
          {/* 
            將以下代碼替換為您的 Google AdSense 代碼：
            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
            <ins className="adsbygoogle"
                 style={{ display: 'block' }}
                 data-ad-client="ca-pub-xxxxxxxxxxxxxxxx"
                 data-ad-slot="xxxxxxxxxx"
                 data-ad-format="auto"
                 data-full-width-responsive="true"></ins>
          */}
          <div className="text-center">
            <p className="text-sm">廣告位置 - {position}</p>
            <p className="text-xs text-gray-500">在此處添加您的 Google AdSense 代碼</p>
          </div>
        </div>
      </div>
    </div>
  );
}
