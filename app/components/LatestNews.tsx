import Image from "next/image";
import Link from "next/link";

const newsList = [
  {
    text: "台灣交通大學校友總會第九屆理監事候選人徵求公告 (2024/9/13)",
  },
  {
    text: "悼 施敏院士 (2023/11/9)",
  },
  {
    text: "12/23(六) 交大校友會Salesclub經驗傳承講座(早鳥報名預告) (2023/11/8)",
  },
  {
    text: "11/23 交大台北校友會港湖聯誼感恩餐會 (2023/11/17)",
  },
  {
    text: "2023高中基礎科學教學研習會-11/25(六)舉行,歡迎踴躍報名參加! (2023/11/6)",
  },
];

const LatestNews = () => {
  return (
    <section className="w-full flex flex-col md:flex-row items-start justify-between px-6 md:px-20 py-50">
    {/* Left: News List */}
    <div className="flex-1 min-w-0">
      {/* Section Title */}
      <div className="mb-2">
        <div className="flex items-end space-x-4">
          <h2 className="text-2xl font-bold text-black">最新消息</h2>
          <div className="w-28 h-1 bg-gray-300" />
        </div>
        <div className="h-2 flex items-center mt-2">
          <div className="w-8 h-1.5 bg-blue-700 rounded" />
        </div>
      </div>
      {/* News List */}
      <ul className="mt-6 space-y-4">
        {newsList.map((item, idx) => (
          <li key={idx} className="flex items-start space-x-3 text-black text-base font-medium">
            <span className="mt-1 w-3 h-3 bg-blue-700 rounded-full inline-block" />
            <span>{item.text}</span>
          </li>
        ))}
      </ul>
      <Link href="/news" className="block mt-10 text-black font-bold hover:underline">更多最新消息...</Link>
    </div>
    {/* Right: Banner Image */}
    <div className="hidden md:flex flex-1 justify-center items-center">
      <Image
        src="/news-banner.png"
        alt="最新消息 Banner"
        width={400}
        height={300}
        className="object-contain"
      />
    </div>
  </section>
  )
}

export default LatestNews