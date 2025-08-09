export default function CEOPage() {
  return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50 py-6 sm:py-10 flex items-center justify-center">
        <div className="bg-white/80 shadow-xl sm:shadow-2xl rounded-lg sm:rounded-2xl max-w-3xl sm:max-w-7xl w-full p-3 sm:p-8 md:p-12 border border-blue-100">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-blue-900 mb-5 sm:mb-6 text-center tracking-wide drop-shadow-sm">
            理事長的話
            </h1>
            <div className="mb-8">
            <h2 className="text-base sm:text-xl md:text-2xl font-bold text-blue-700 mb-2">
                控制工程學系66級 現任 聯傑國際董事長
            </h2>
            <span className="inline-block text-sm sm:text-base text-gray-500">郝挺</span>
            </div>
            <div className="space-y-5 sm:space-y-7 text-gray-800 leading-relaxed text-sm sm:text-base">
            <p className="text-base sm:text-lg indent-6 sm:indent-8">
                我是交大控制工程系66級的郝挺，一向以身為交大人為榮，很高興、也很榮幸能夠擔任交通大學第七屆校友總會理事長，我將繼續前幾任理事長的願景和期許，領導校友會執行長工作團隊，遵循前例、循序漸進，以服務校友，回饋交大為首要任務，包含以下兩大重點：
            </p>
            <ol className="list-decimal list-inside pl-4 space-y-1 sm:space-y-2">
                <li>
                <span className="font-semibold text-blue-800">建立校友聯絡平台：</span>
                包括尋友、娛樂、深造、社團、運動……等方式讓校友們更能緊密交流、凝聚情感，同時擴大在兩岸三地校友們的互動與影響，協助年輕的學弟妹們創業與就業，形成交大人幫交大人的良性串聯，一起同心創造被交大人利用的價值。
                </li>
                <li>
                <span className="font-semibold text-blue-800">全力輔助母校推動重大計畫：</span>
                在募款、人力、時間等多方面協助母校儘速達成計畫目標，校友與學校攜手讓交大成為一所偉大大學。
                </li>
            </ol>
            <p className="text-base sm:text-lg indent-6 sm:indent-8">
                本屆任內除每年校慶及五校之間的交流活動外，母校目前重大事項有五大項目：
            </p>
            <ol className="list-decimal list-inside pl-4 space-y-0.5 sm:space-y-1">
                <li>陽明交大合校事宜。</li>
                <li>校友捐贈交大智慧醫院的興建、核准及營運。</li>
                <li>台南校區致遠樓產學研平台–智慧綠能AI學院的捐建及啟用。</li>
                <li>交大與國防大學理工學院長期合作，培育國防科技人才。</li>
                <li>交通大學電工和電機的合併，成為全國最大的電機系。</li>
            </ol>
            <p className="text-base sm:text-lg indent-6 sm:indent-8">
                本屆校友會理監事共48人，每位都是企業、學界與社會的菁英。弟深感一個人的時間、能力有限，希望全體理監事群策群力，發揮交大人引以為傲的團隊精神，凝聚力量，做更多對學校、對校友，乃至對社會有影響的事情。
            </p>
            <blockquote className="border-l-4 border-blue-300 pl-2 sm:pl-4 italic text-blue-900 bg-blue-50/50 rounded py-1 sm:py-2 text-sm sm:text-base">
                我篤信責任和使命，「知新致遠，崇實篤行」是個人奉行的準則，我將以熱情、謙卑、謹慎的態度和大家攜手併進，為母校寫一段精彩的歷史。
            </blockquote>
            <ul className="list-disc pl-4 sm:pl-6 pt-1 sm:pt-2 space-y-0.5 sm:space-y-1">
                <li>
                <a href="https://www.nycu.edu.tw/" target="_blank" className="text-blue-700 underline hover:text-blue-900 transition">國立陽明交通大學網站</a>
                </li>
                <li>
                <a href="https://www.facebook.com/NCTUer" target="_blank" className="text-blue-700 underline hover:text-blue-900 transition">交大校友會FB</a>
                </li>
            </ul>
            </div>
        </div>
    </div>
  );
}