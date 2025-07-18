import ActivityCalendar from "./components/ActivityCalendar";
import IndexBanner from "./components/IndexBanner";
import LatestNews from "./components/LatestNews";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Index Banner Section */}
      <IndexBanner />

      {/* Latest News Section */}
      <div id="latest-news">
        <LatestNews />
      </div>
      
      {/* Activity Calendar Section */}
      <div id="activity-calendar">
        <ActivityCalendar />
      </div>
    </div>
  );
}

