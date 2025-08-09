import React from 'react';

const DashboardCard = ({ title, description, link }: { title: string; description: string; link: string }) => (
  <a href={link} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 block">
    <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
    <p className="text-gray-600">{description}</p>
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
        />
        <DashboardCard 
          title="會員管理"
          description="新增、編輯、管理會員。"
          link="/admin/membership_management"
        />
        <DashboardCard 
          title="活動日曆"
          description="新增、編輯、管理活動日曆。"
          link="/admin/event_calendar"
        />
        <DashboardCard 
          title="協會介紹"
          description="更新協會介紹。"
          link="/admin/association_info"
        />
      </div>
    </div>
  );
}

