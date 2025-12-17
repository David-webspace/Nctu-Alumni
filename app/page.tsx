import ActivityCalendar from "./components/ActivityCalendar";
import IndexBanner from "./components/IndexBanner";
import LatestNews from "./components/LatestNews";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "首頁 | 國立陽明交通大學校友總會",
  description: "國立陽明交通大學校友總會官方網站首頁，查看最新校友消息、活動行事曆，了解校友會相關資訊。",
};

// 結構化數據
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "國立陽明交通大學校友總會",
  "alternateName": "NCTU Alumni Association",
  "url": "https://nctualumni.org.tw",
  "logo": "https://nctualumni.org.tw/logo.png",
  "description": "國立陽明交通大學校友總會官方網站，提供校友最新消息、活動行事曆、校友會組織章程等資訊。",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "大學路1001號",
    "addressLocality": "新竹市",
    "addressCountry": "TW"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+886-3-5734558",
    "contactType": "customer service",
    "email": "alumni@nctuaa.org.tw"
  },
  "sameAs": [
    "https://www.facebook.com/NCTUer",
    "https://nctu-alumni-voice.sec.nycu.edu.tw/"
  ]
};

export default function Home() {
  return (
    <>
      {/* 結構化數據 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <div className="min-h-screen bg-white">
        {/* Index Banner Section */}
        <IndexBanner />

        {/* Latest News Section */}
        <section id="latest-news" aria-labelledby="latest-news-title">
          <LatestNews />
        </section>
        
        {/* Activity Calendar Section */}
        <section id="activity-calendar" aria-labelledby="activity-calendar-title">
          <ActivityCalendar />
        </section>
      </div>
    </>
  );
}

