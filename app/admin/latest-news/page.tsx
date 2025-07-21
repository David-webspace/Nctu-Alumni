import React from 'react';

const newsData = [
  { id: 1, title: '新竹陽明交大互貴商會精彩校友分享會', startDate: '2025-07-17', endDate: '2025-07-26' },
  { id: 2, title: '新竹校友會高爾夫球社第147期、第148期高爾夫入門班報名中', startDate: '2025-07-01', endDate: '2025-07-20' },
  { id: 3, title: '生涯教練團7月分享活動', startDate: '2025-07-14', endDate: '2025-07-22' },
  { id: 4, title: '交大台北校友會港湖幫 7月份 講座-Neogence霓淨思從實驗室創業到全球品牌之路', startDate: '2025-07-14', endDate: '2025-07-24' },
  { id: 5, title: '交大校友會自行車社-鶯歌陶瓷老街單車逍遙遊', startDate: '2025-04-01', endDate: '2025-04-24' },
  { id: 6, title: '第38屆交大高階經理人培訓班(新竹)開放報名', startDate: '2025-04-01', endDate: '2025-05-10' },
  { id: 7, title: 'Test creating new news', startDate: '2025-02-02', endDate: '2025-05-31' },
  { id: 8, title: '一本書讀懂美元', startDate: '2025-03-06', endDate: '2025-04-30' },
  { id: 9, title: 'Lorem ipsum dolor sit amet', startDate: '2025-03-01', endDate: '2025-09-03' },
];

const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 hover:text-blue-500" viewBox="0 0 20 20" fill="currentColor">
    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
    <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
  </svg>
);

const DeleteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 hover:text-red-500" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
  </svg>
);

const LatestNewsPage = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">最新消息</h1>
        <button className="bg-white text-gray-800 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50 flex items-center">
          <span className="text-lg mr-2">+</span> 新增
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-left text-gray-500">
              <th className="py-3 px-2 font-normal w-12">#</th>
              <th className="py-3 px-2 font-normal">標題</th>
              <th className="py-3 px-2 font-normal w-64">有效時間</th>
              <th className="py-3 px-2 font-normal w-24">動作</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {newsData.map((item) => (
              <tr key={item.id} className="border-b border-gray-200">
                <td className="py-4 px-2">{item.id}</td>
                <td className="py-4 px-2">{item.title}</td>
                <td className="py-4 px-2 text-gray-600">{`${item.startDate} - ${item.endDate}`}</td>
                <td className="py-4 px-2">
                  <div className="flex items-center space-x-4">
                    <button><DeleteIcon /></button>
                    <button><EditIcon /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LatestNewsPage;

