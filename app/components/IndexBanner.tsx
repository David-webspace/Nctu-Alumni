import Image from "next/image";

const IndexBanner = () => {
  return (
    <main className="flex flex-col md:flex-row h-[calc(100vh-120px)]">
      {/* Left Side */}
      <section className="w-full md:w-2/5 flex flex-col justify-center items-start px-8 md:px-16 bg-white">
        {/* Logo */}
        <Image src="/logo.png" alt="NCTU Alumni Logo" width={200} height={120} className="mb-4" />
        {/* Chinese Title */}
        <Image src="/index-title.png" alt="NCTU Alumni Association" width={450} height={120} className="mb-4"/>
        {/* English Subtitle */}
        {/* <h2 className="text-xl md:text-2xl text-black mb-2">NCTU Alumni Association</h2> */}
        {/* Blue Line */}
        <div className="w-8 h-2 bg-blue-700 rounded mt-2 mb-4" />
        {/* Contact Info */}
        <div className="mt-6 text-sm text-black leading-relaxed">
          <div>新竹市大學路1001號 交大校友會</div>
          <div>1001, Ta Hsueh Rd, Hsin-chu, Taiwan, R.O.C.</div>
          <div>校友會專線：03-5734558</div>
          <div>傳真：03-5721473</div>
          <div>或校友交流中心：03-5712121 轉分機31926</div>
          <div>alumni@aa.nctu.edu.tw</div>
        </div>
      </section>
      {/* Right Side */}
      <section className="w-full md:w-4/5 flex justify-center items-center relative">
        <div className="w-full">
          <Image
            src="/index-bg-color.png"
            alt="NCTU Main Building"
            width={1600}
            height={1200}
            className="w-full h-full object-cover"
            priority
          />
        </div>
      </section>
    </main>
  );
};

export default IndexBanner;
