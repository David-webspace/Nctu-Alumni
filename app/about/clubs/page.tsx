'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { 
  FaChevronRight as ChevronRight, 
  FaUsers as Users, 
  FaCalendarAlt as Calendar, 
  FaMapMarkerAlt as MapPin, 
  FaEnvelope as Mail, 
  FaPhone as Phone, 
  FaGlobe as Globe, 
  FaAward as Award, 
  FaBullseye as Target, 
  FaHeart as Heart,
  FaTimes as X,
  FaEye as Eye
} from 'react-icons/fa';

interface Club {
  id: string;
  name: string;
  category: 'academic' | 'sports' | 'arts' | 'service' | 'technology';
  description: string;
  detailedDescription?: string;
  keyPoints: string[];
  contact: {
    email?: string;
    phone?: string;
    website?: string;
  };
  established?: string;
  members?: number;
  activities: string[];
  achievements?: string[];
  image?: string;
  gallery?: string[];
  meetingTime?: string;
  location?: string;
}

interface AlumniAssociation {
  id: string;
  department: string;
  name: string;
  description: string;
  keyFeatures: string[];
  contact: {
    email?: string;
    phone?: string;
    website?: string;
  };
  established?: string;
  members?: number;
  recentEvents: string[];
}

const clubs: Club[] = [
  {
    id: 'tech-club',
    name: '資訊技術研習社',
    category: 'technology',
    description: '致力於推廣資訊技術，培養學生程式設計與創新能力',
    detailedDescription: '資訊技術研習社成立於2010年，是校內最活躍的技術社團之一。我們致力於推廣最新的資訊技術，培養學生的程式設計能力和創新思維。社團定期舉辦技術分享會、工作坊和黑客松活動，讓成員能夠在實作中學習成長。我們也與業界保持密切合作，為成員提供實習和就業機會。',
    keyPoints: ['程式設計教學', '技術分享會', '專案開發', '業界交流'],
    contact: {
      email: 'tech@nctu.edu.tw',
      website: 'https://tech-club.nctu.edu.tw'
    },
    established: '2010',
    members: 120,
    activities: ['每週技術分享', '黑客松競賽', '企業參訪', '開源專案'],
    achievements: ['全國程式競賽冠軍', '創新創業競賽優選'],
    image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=250&fit=crop',
    meetingTime: '每週三 18:30-21:00',
    location: '工程三館 EC114'
  },
  {
    id: 'debate-club',
    name: '辯論社',
    category: 'academic',
    description: '培養邏輯思維與口語表達能力，參與各項辯論競賽',
    detailedDescription: '辯論社創立於1995年，是校內歷史悠久的學術性社團。我們專注於培養學生的邏輯思維、批判性思考和口語表達能力。透過定期的辯論練習、工作坊和競賽參與，成員能夠提升自己的思辨能力和溝通技巧。社團曾多次在全國性辯論競賽中獲得佳績，培養出許多優秀的辯論人才。',
    keyPoints: ['邏輯思維訓練', '口語表達', '批判性思考', '團隊合作'],
    contact: {
      email: 'debate@nctu.edu.tw',
      phone: '03-5712121'
    },
    established: '1995',
    members: 45,
    activities: ['每週辯論練習', '校際辯論賽', '公開演講', '邏輯思維工作坊'],
    achievements: ['大專盃辯論賽亞軍', '最佳辯士獎'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop',
    meetingTime: '每週二、四 19:00-21:00',
    location: '人社二館 HS210'
  },
  {
    id: 'volunteer-club',
    name: '志工服務社',
    category: 'service',
    description: '關懷社會，服務人群，培養學生社會責任感',
    detailedDescription: '志工服務社成立於2000年，致力於培養學生的社會責任感和服務精神。我們定期組織各種志工服務活動，包括偏鄉教學、環境保護、弱勢關懷等。透過實際的服務行動，讓成員能夠關懷社會、回饋社區，同時培養團隊合作和領導能力。社團曾獲得教育部優秀志工團體等多項殊榮。',
    keyPoints: ['社區服務', '環境保護', '弱勢關懷', '教育服務'],
    contact: {
      email: 'volunteer@nctu.edu.tw',
      phone: '03-5712122'
    },
    established: '2000',
    members: 80,
    activities: ['偏鄉教學', '環境清潔', '老人關懷', '募款活動'],
    achievements: ['教育部優秀志工團體', '社會服務貢獻獎'],
    image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=250&fit=crop',
    meetingTime: '每週六 09:00-17:00',
    location: '活動中心 AC201'
  }
];

const alumniAssociations: AlumniAssociation[] = [
  {
    id: 'cs-alumni',
    department: '資訊工程學系',
    name: '資工系友會',
    description: '連結資工系畢業校友，促進學術交流與職涯發展',
    keyFeatures: ['職涯輔導', '技術交流', '創業支持', '學弟妹指導'],
    contact: {
      email: 'cs-alumni@nctu.edu.tw',
      website: 'https://cs-alumni.nctu.edu.tw'
    },
    established: '1985',
    members: 2500,
    recentEvents: ['年度聚會', '技術研討會', '新創分享會', '職涯講座']
  },
  {
    id: 'ee-alumni',
    department: '電機工程學系',
    name: '電機系友會',
    description: '電機系校友聯誼組織，推動產學合作與人才培育',
    keyFeatures: ['產學合作', '獎學金設立', '實習機會', '技術顧問'],
    contact: {
      email: 'ee-alumni@nctu.edu.tw',
      website: 'https://ee-alumni.nctu.edu.tw'
    },
    established: '1980',
    members: 3200,
    recentEvents: ['校友大會', '產業論壇', '獎學金頒獎', '企業參訪']
  },
  {
    id: 'me-alumni',
    department: '機械工程學系',
    name: '機械系友會',
    description: '機械系校友交流平台，促進工程技術發展與創新',
    keyFeatures: ['技術創新', '工程顧問', '設備捐贈', '研究合作'],
    contact: {
      email: 'me-alumni@nctu.edu.tw',
      phone: '03-5712130'
    },
    established: '1982',
    members: 1800,
    recentEvents: ['技術展示會', '工程創新競賽', '校友座談', '設備捐贈儀式']
  }
];

const categoryColors = {
  academic: 'bg-blue-100 text-blue-800 border-blue-200',
  sports: 'bg-green-100 text-green-800 border-green-200',
  arts: 'bg-purple-100 text-purple-800 border-purple-200',
  service: 'bg-red-100 text-red-800 border-red-200',
  technology: 'bg-orange-100 text-orange-800 border-orange-200'
};

const categoryIcons = {
  academic: Award,
  sports: Target,
  arts: Heart,
  service: Users,
  technology: Globe
};

export default function ClubsPage() {
  const [activeTab, setActiveTab] = useState<'clubs' | 'alumni'>('clubs');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openClubDetail = (club: Club) => {
    setSelectedClub(club);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedClub(null);
  };

  const filteredClubs = selectedCategory === 'all' 
    ? clubs 
    : clubs.filter(club => club.category === selectedCategory);

  const categories = [
    { id: 'all', name: '全部', count: clubs.length },
    { id: 'technology', name: '科技', count: clubs.filter(c => c.category === 'technology').length },
    { id: 'academic', name: '學術', count: clubs.filter(c => c.category === 'academic').length },
    { id: 'service', name: '服務', count: clubs.filter(c => c.category === 'service').length },
    { id: 'sports', name: '體育', count: clubs.filter(c => c.category === 'sports').length },
    { id: 'arts', name: '藝文', count: clubs.filter(c => c.category === 'arts').length }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              社團與系友會
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              豐富的社團活動與強大的校友網絡
            </p>
            <div className="flex justify-center space-x-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="text-2xl font-bold">{clubs.length}+</div>
                <div className="text-sm text-blue-100">活躍社團</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="text-2xl font-bold">{alumniAssociations.length}+</div>
                <div className="text-sm text-blue-100">系友會</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="text-2xl font-bold">7000+</div>
                <div className="text-sm text-blue-100">校友成員</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-lg p-1 shadow-lg border">
            <button
              onClick={() => setActiveTab('clubs')}
              className={`px-8 py-3 rounded-md font-semibold transition-all duration-200 ${
                activeTab === 'clubs'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              社團介紹
            </button>
            <button
              onClick={() => setActiveTab('alumni')}
              className={`px-8 py-3 rounded-md font-semibold transition-all duration-200 ${
                activeTab === 'alumni'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              系友會介紹
            </button>
          </div>
        </div>

        {/* Clubs Section */}
        {activeTab === 'clubs' && (
          <div>
            {/* Category Filter */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">社團分類</h3>
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-full border transition-all duration-200 ${
                      selectedCategory === category.id
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300 hover:text-blue-600'
                    }`}
                  >
                    {category.name} ({category.count})
                  </button>
                ))}
              </div>
            </div>

            {/* Clubs Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredClubs.map((club) => {
                const IconComponent = categoryIcons[club.category];
                return (
                  <div 
                    key={club.id} 
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
                    onClick={() => openClubDetail(club)}
                  >
                    {/* Club Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={club.image || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=250&fit=crop'} 
                        alt={club.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3">
                        <div className={`p-2 rounded-lg backdrop-blur-sm bg-white/90 ${categoryColors[club.category]} border-0`}>
                          <IconComponent className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="absolute top-3 right-3">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm bg-white/90 ${categoryColors[club.category]} border-0`}>
                          {club.category === 'technology' ? '科技' : 
                           club.category === 'academic' ? '學術' :
                           club.category === 'service' ? '服務' :
                           club.category === 'sports' ? '體育' : '藝文'}
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    <div className="p-6">
                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                          {club.name}
                        </h3>
                        <p className="text-gray-600 leading-relaxed line-clamp-2">{club.description}</p>
                      </div>

                      {/* Key Points */}
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                          {club.keyPoints.slice(0, 3).map((point, index) => (
                            <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                              {point}
                            </span>
                          ))}
                          {club.keyPoints.length > 3 && (
                            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                              +{club.keyPoints.length - 3} 更多
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-4">
                          {club.established && (
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{club.established}</span>
                            </div>
                          )}
                          {club.members && (
                            <div className="flex items-center space-x-1">
                              <Users className="w-4 h-4" />
                              <span>{club.members}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* View Details Button */}
                      <div className="border-t pt-4">
                        <div className="flex items-center justify-between">
                          <div className="flex space-x-3">
                            {club.contact.email && (
                              <a 
                                href={`mailto:${club.contact.email}`} 
                                className="text-blue-600 hover:text-blue-800"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Mail className="w-4 h-4" />
                              </a>
                            )}
                            {club.contact.phone && (
                              <a 
                                href={`tel:${club.contact.phone}`} 
                                className="text-blue-600 hover:text-blue-800"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Phone className="w-4 h-4" />
                              </a>
                            )}
                            {club.contact.website && (
                              <a 
                                href={club.contact.website} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-blue-600 hover:text-blue-800"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Globe className="w-4 h-4" />
                              </a>
                            )}
                          </div>
                          <div className="flex items-center space-x-2 text-blue-600 group-hover:text-blue-800">
                            <Eye className="w-4 h-4" />
                            <span className="text-sm font-medium">查看詳情</span>
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Alumni Associations Section */}
        {activeTab === 'alumni' && (
          <div>
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">系友會介紹</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                各系友會致力於連結校友網絡，促進學術交流與職涯發展，為學弟妹提供寶貴的指導與支持
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {alumniAssociations.map((association) => (
                <div key={association.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                  <div className="p-6">
                    <div className="mb-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"></div>
                        <span className="text-sm font-medium text-blue-600">{association.department}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {association.name}
                      </h3>
                    </div>

                    <p className="text-gray-600 mb-4 leading-relaxed">{association.description}</p>

                    {/* Key Features */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-800 mb-2">主要服務</h4>
                      <div className="space-y-1">
                        {association.keyFeatures.map((feature, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                            <span className="text-sm text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center space-x-4 mb-4 text-sm text-gray-500">
                      {association.established && (
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>成立於 {association.established}</span>
                        </div>
                      )}
                      {association.members && (
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{association.members.toLocaleString()} 位校友</span>
                        </div>
                      )}
                    </div>

                    {/* Recent Events */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-800 mb-2">近期活動</h4>
                      <div className="flex flex-wrap gap-2">
                        {association.recentEvents.slice(0, 3).map((event, index) => (
                          <span key={index} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
                            {event}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Contact */}
                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between">
                        <div className="flex space-x-3">
                          {association.contact.email && (
                            <a href={`mailto:${association.contact.email}`} className="text-blue-600 hover:text-blue-800">
                              <Mail className="w-4 h-4" />
                            </a>
                          )}
                          {association.contact.phone && (
                            <a href={`tel:${association.contact.phone}`} className="text-blue-600 hover:text-blue-800">
                              <Phone className="w-4 h-4" />
                            </a>
                          )}
                          {association.contact.website && (
                            <a href={association.contact.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                              <Globe className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">想要加入我們嗎？</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            無論是參與社團活動還是加入系友會，都能讓您在交大的求學或職涯路上獲得更多支持與成長機會
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              聯絡我們
            </Link>
            <Link href="/about" className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
              了解更多
            </Link>
          </div>
        </div>
      </div>

      {/* Club Detail Modal */}
      {isModalOpen && selectedClub && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="relative">
              <img 
                src={selectedClub.image || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=300&fit=crop'} 
                alt={selectedClub.name}
                className="w-full h-64 object-cover rounded-t-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-t-2xl"></div>
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-6 left-6 text-white">
                <div className="flex items-center space-x-3 mb-2">
                  <div className={`p-2 rounded-lg backdrop-blur-sm bg-white/20 ${categoryColors[selectedClub.category]} border-0`}>
                    {React.createElement(categoryIcons[selectedClub.category], { className: "w-5 h-5 text-white" })}
                  </div>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm bg-white/20 text-white border border-white/30`}>
                    {selectedClub.category === 'technology' ? '科技' : 
                     selectedClub.category === 'academic' ? '學術' :
                     selectedClub.category === 'service' ? '服務' :
                     selectedClub.category === 'sports' ? '體育' : '藝文'}
                  </span>
                </div>
                <h2 className="text-3xl font-bold mb-2">{selectedClub.name}</h2>
                <p className="text-lg text-white/90">{selectedClub.description}</p>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              <div className="grid md:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="md:col-span-2 space-y-6">
                  {/* Detailed Description */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">社團介紹</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {selectedClub.detailedDescription || selectedClub.description}
                    </p>
                  </div>

                  {/* Activities */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">主要活動</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {selectedClub.activities.map((activity, index) => (
                        <div key={index} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-gray-700">{activity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Achievements */}
                  {selectedClub.achievements && selectedClub.achievements.length > 0 && (
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">獲獎紀錄</h3>
                      <div className="space-y-2">
                        {selectedClub.achievements.map((achievement, index) => (
                          <div key={index} className="flex items-center space-x-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <Award className="w-5 h-5 text-yellow-600" />
                            <span className="text-gray-700">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Key Points */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">核心特色</h3>
                    <div className="flex flex-wrap gap-3">
                      {selectedClub.keyPoints.map((point, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                          {point}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Basic Info */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">基本資訊</h3>
                    <div className="space-y-3">
                      {selectedClub.established && (
                        <div className="flex items-center space-x-3">
                          <Calendar className="w-5 h-5 text-gray-500" />
                          <div>
                            <div className="text-sm text-gray-500">成立時間</div>
                            <div className="font-medium">{selectedClub.established} 年</div>
                          </div>
                        </div>
                      )}
                      {selectedClub.members && (
                        <div className="flex items-center space-x-3">
                          <Users className="w-5 h-5 text-gray-500" />
                          <div>
                            <div className="text-sm text-gray-500">成員人數</div>
                            <div className="font-medium">{selectedClub.members} 人</div>
                          </div>
                        </div>
                      )}
                      {selectedClub.meetingTime && (
                        <div className="flex items-center space-x-3">
                          <Calendar className="w-5 h-5 text-gray-500" />
                          <div>
                            <div className="text-sm text-gray-500">聚會時間</div>
                            <div className="font-medium">{selectedClub.meetingTime}</div>
                          </div>
                        </div>
                      )}
                      {selectedClub.location && (
                        <div className="flex items-center space-x-3">
                          <MapPin className="w-5 h-5 text-gray-500" />
                          <div>
                            <div className="text-sm text-gray-500">活動地點</div>
                            <div className="font-medium">{selectedClub.location}</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="bg-blue-50 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">聯絡方式</h3>
                    <div className="space-y-3">
                      {selectedClub.contact.email && (
                        <a 
                          href={`mailto:${selectedClub.contact.email}`}
                          className="flex items-center space-x-3 text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          <Mail className="w-5 h-5" />
                          <span className="break-all">{selectedClub.contact.email}</span>
                        </a>
                      )}
                      {selectedClub.contact.phone && (
                        <a 
                          href={`tel:${selectedClub.contact.phone}`}
                          className="flex items-center space-x-3 text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          <Phone className="w-5 h-5" />
                          <span>{selectedClub.contact.phone}</span>
                        </a>
                      )}
                      {selectedClub.contact.website && (
                        <a 
                          href={selectedClub.contact.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-3 text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          <Globe className="w-5 h-5" />
                          <span className="break-all">官方網站</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Join Button */}
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-6 text-white text-center">
                    <h3 className="text-lg font-bold mb-2">有興趣加入嗎？</h3>
                    <p className="text-blue-100 text-sm mb-4">歡迎聯絡我們了解更多資訊</p>
                    <button 
                      onClick={() => selectedClub.contact.email && window.open(`mailto:${selectedClub.contact.email}?subject=詢問加入${selectedClub.name}`)}
                      className="w-full bg-white text-blue-600 py-2 px-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                    >
                      聯絡社團
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
