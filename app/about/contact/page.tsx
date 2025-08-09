import React from 'react';

const contactInfo = {
  workingHours: '週一～週五 上午8:30~12:00 下午1:30~5:30',
  phone: '03-5734558',
  address: '地址：新竹市大學路1001號（交大校友會）辦公室位置：交大浩然圖書館地下一樓',
  email: 'alumni@nctuaa.org.tw',
};

const members = [
  { name: '陳俊秀', title: '執行長', extension: '51479' },
  { name: '王統億', title: '副執行長', extension: '51470' },
  { name: '王怡方', title: '友聲雜誌社 主編', extension: '51472' },
  { name: '李小姐', title: '', extension: '51471' },
  { name: '葉小姐', title: '', extension: '51475' },
  { name: '王小姐', title: '', extension: '51484' },
  { name: '張小姐', title: '', extension: '31926' },
];

export default function ContactPage() {
  return (
    <main className="max-w-3xl sm:max-w-7xl mx-auto text-black my-6 sm:my-8 p-2 sm:p-6 md:p-8 bg-white rounded-md sm:rounded-lg shadow-md text-sm sm:text-base">
      <h1 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-6 text-center">相關聯絡資訊</h1>
      <section className="mb-8">
        <h2 className="text-base sm:text-xl font-semibold mb-2 sm:mb-4">一般資訊</h2>
        <ul className="space-y-1 sm:space-y-2 text-xs sm:text-base">
          <li><span className="font-semibold">上班時間:</span> {contactInfo.workingHours}</li>
          <li><span className="font-semibold">電話:</span> {contactInfo.phone}</li>
          <li><span className="font-semibold">地址:</span> {contactInfo.address}</li>
          <li><span className="font-semibold">電子郵件:</span> <a href={`mailto:${contactInfo.email}`} className="text-blue-600 underline">{contactInfo.email}</a></li>
        </ul>
      </section>
      <section>
        <h2 className="text-base sm:text-xl font-semibold mb-2 sm:mb-4">校友會聯絡分機</h2>
        <h3 className="text-sm sm:text-lg font-semibold mb-2 sm:mb-4">交大總機 03-5712121</h3>
        <div className="overflow-x-auto">
          <table className="min-w-[500px] sm:min-w-full border border-gray-200 rounded-md sm:rounded-lg text-xs sm:text-base">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left px-2 sm:px-3 py-1 sm:py-2 border-b border-gray-200">姓名</th>
                <th className="text-left px-2 sm:px-3 py-1 sm:py-2 border-b border-gray-200">職位</th>
                <th className="text-left px-2 sm:px-3 py-1 sm:py-2 border-b border-gray-200">分機號碼</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr
                  key={member.extension}
                  className="even:bg-gray-50 transition-transform transform hover:scale-101 duration-150 cursor-pointer"
                >
                  <td className="px-2 sm:px-4 py-1 sm:py-2 border-b border-gray-100">{member.name}</td>
                  <td className="px-2 sm:px-3 py-1 sm:py-2 border-b border-gray-100">{member.title}</td>
                  <td className="px-2 sm:px-4 py-1 sm:py-2 border-b border-gray-100">{member.extension}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
