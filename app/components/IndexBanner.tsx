import Image from "next/image";

const IndexBanner = () => {
  return (
    <main className="flex flex-col md:flex-row min-h-[400px] md:h-[calc(100vh-120px)]">
      {/* Left Side */}
      <section className="w-full md:w-2/5 flex flex-col justify-center items-start px-4 sm:px-8 md:px-16 py-8 bg-white">
        {/* Logo */}
        <Image src="/logo.png" alt="NCTU Alumni Logo" width={140} height={80} className="mb-2 sm:mb-4 w-28 sm:w-36 md:w-48" />
        {/* Chinese Title */}
        <Image src="/index-title.png" alt="NCTU Alumni Association" width={260} height={70} className="mb-2 sm:mb-4 w-48 sm:w-72 md:w-[450px]"/>
        {/* English Subtitle */}
        {/* <h2 className="text-xl md:text-2xl text-black mb-2">NCTU Alumni Association</h2> */}
        {/* Blue Line */}
        <div className="w-8 h-2 bg-blue-700 rounded mt-2 mb-4" />
        {/* Contact Info */}
        <div className="mt-6 text-xs sm:text-sm text-black leading-relaxed">
          <div>新竹市大學路1001號 交大校友會</div>
          <div>1001, Ta Hsueh Rd, Hsin-chu, Taiwan, R.O.C.</div>
          <div>校友會專線：03-5734558</div>
          <div>傳真：03-5721497</div>
          <div>校內電話：03-5712121轉31926</div>
          <div>校友會信箱：alumni@nctuaa.org.tw</div>
        </div>
      </section>
      {/* Right Side */}
      <section className="w-full md:w-4/5 flex justify-center items-center relative min-h-[200px] md:min-h-0">
        <div className="w-full">
          <Image
            src="/index-bg-color.png"
            alt="NCTU Main Building"
            width={1600}
            height={1200}
            className="w-full h-40 sm:h-64 md:h-full object-cover"
            priority
          />
        </div>
      </section>
    </main>
  );
};

export default IndexBanner;
