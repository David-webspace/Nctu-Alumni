import React from 'react';

// 自定義 SVG 圖示組件
const NewsIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
  </svg>
);

const UsersIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const CalendarIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const BuildingIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const FileTextIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const UserCheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const PhoneIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const DashboardCard = ({
  title,
  description,
  link,
  icon: Icon
}: {
  title: string;
  description: string;
  link: string;
  icon: React.ComponentType<{ className?: string }>;
}) => (
  <a href={link} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 block pointer">
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
      <div className="ml-4 flex-shrink-0">
        <Icon className="w-8 h-8 text-gray-600" />
      </div>
    </div>
  </a>
);

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-800 mb-6">管理主頁</h1>
      <p className="text-lg text-gray-600 mb-8">
        歡迎使用控制中心。從這裡管理您的網站內容和會員。
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard
          title="最新消息"
          description="新增、編輯、管理最新消息。"
          link="/admin/latest_news"
          icon={NewsIcon}
        />
        <DashboardCard
          title="會員管理"
          description="新增、編輯、管理會員。"
          link="/admin/membership_management"
          icon={UsersIcon}
        />
        <DashboardCard
          title="活動日曆"
          description="新增、編輯、管理活動日曆。"
          link="/admin/event_calendar"
          icon={CalendarIcon}
        />
        <DashboardCard
          title="校友會資訊"
          description="更新校友會資訊。"
          link="/admin/association_info"
          icon={BuildingIcon}
        />
        <DashboardCard
          title="組織章程架構"
          description="更新組織章程架構。"
          link="/admin/association_info/constitution"
          icon={FileTextIcon}
        />
        <DashboardCard
          title="理監事名單"
          description="更新理監事名單。"
          link="/admin/association_info/board"
          icon={UserCheckIcon}
        />
        <DashboardCard
          title="相關聯絡資訊"
          description="更新相關聯絡資訊。"
          link="/admin/association_info/contact"
          icon={PhoneIcon}
        />
      </div>
    </div>
  );
}

