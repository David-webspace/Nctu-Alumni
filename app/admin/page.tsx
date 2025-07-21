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
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
      <p className="text-lg text-gray-600 mb-8">
        Welcome to the control center. Manage your website content and members from here.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard 
          title="Latest News"
          description="Create, edit, and manage news articles."
          link="/admin/latest-news"
        />
        <DashboardCard 
          title="Membership Management"
          description="View and manage all registered members."
          link="/admin/membership-management"
        />
        <DashboardCard 
          title="Event Calendar"
          description="Schedule and organize upcoming events."
          link="/admin/event-calendar"
        />
        <DashboardCard 
          title="Association Info"
          description="Update information about the association."
          link="/admin/association-info"
        />
      </div>
    </div>
  );
}

