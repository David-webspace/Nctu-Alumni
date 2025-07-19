import Link from 'next/link';

const Footer = () => {

  return (
    <footer className="relative bg-[#0033a0] text-white pt-24 pb-8">

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-center items-center text-center md:text-left gap-8 md:gap-16 mb-8">
          {/* University Link */}
          <div className="text-sm">
            <p className="font-semibold">國立陽明交通大學網站</p>
            <Link href="https://www.nycu.edu.tw/" target='_blank' rel="noopener noreferrer">
              <span className="hover:underline">https://www.nycu.edu.tw/</span>
            </Link>
          </div>

          {/* Facebook Link */}
          <div className="flex items-center gap-3 text-sm">
            <svg
              className="w-8 h-8"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <p className="font-semibold">交大校友會FB</p>
              <Link href="https://www.facebook.com/NCTUer" target="_blank" rel="noopener noreferrer">
                <span className="hover:underline">https://www.facebook.com/NCTUer</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-xs text-gray-300 border-t border-gray-600 pt-6">
          <p>Copyright © 台灣交通大學校友總會, National Chiao Tung University Alumni Association All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
