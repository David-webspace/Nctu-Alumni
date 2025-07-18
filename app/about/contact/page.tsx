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
    <main className="max-w-7xl mx-auto text-black my-8 p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">相關聯絡資訊</h1>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">一般資訊</h2>
        <ul className="space-y-2">
          <li><span className="font-semibold">上班時間:</span> {contactInfo.workingHours}</li>
          <li><span className="font-semibold">電話:</span> {contactInfo.phone}</li>
          <li><span className="font-semibold">地址:</span> {contactInfo.address}</li>
          <li><span className="font-semibold">電子郵件:</span> <a href={`mailto:${contactInfo.email}`} className="text-blue-600 underline">{contactInfo.email}</a></li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-4">校友會聯絡分機</h2>
        <h3 className="text-lg font-semibold mb-4">交大總機 03-5712121</h3>
        <div className="">
          <table className="min-w-full border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left px-4 py-2 border-b border-gray-200">姓名</th>
                <th className="text-left px-4 py-2 border-b border-gray-200">職位</th>
                <th className="text-left px-4 py-2 border-b border-gray-200">分機號碼</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr
                  key={member.extension}
                  className="even:bg-gray-50 transition-transform transform hover:scale-101 duration-150 cursor-pointer"
                >
                  <td className="px-4 py-2 border-b border-gray-100">{member.name}</td>
                  <td className="px-4 py-2 border-b border-gray-100">{member.title}</td>
                  <td className="px-4 py-2 border-b border-gray-100">{member.extension}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
