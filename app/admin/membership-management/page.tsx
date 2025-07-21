"use client";

import React, { useState } from 'react';

// Define a type for the member data for the table
type Member = {
  id: number;
  name: string;
  gender: string;
  graduationYear: string;
  department: string;
  class: string;
  email: string;
  phone: string;
};

// Sample data - for now it will be empty to show "尚無資料"
const sampleData: Member[] = [];

const MembershipManagementPage = () => {
  // State for form inputs
  const [chineseName, setChineseName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [graduationYear, setGraduationYear] = useState('');
  const [otherSearch, setOtherSearch] = useState('');
  const [gender, setGender] = useState('unspecified');

  // State for search results
  const [members, setMembers] = useState<Member[]>(sampleData);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would fetch data from your API here
    // based on the form state.
    console.log('Searching with:', {
      chineseName,
      studentId,
      idNumber,
      graduationYear,
      otherSearch,
      gender,
    });
  };

  const InputField = ({ label, id, value, onChange, maxLength }: { label: string; id: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; maxLength: number }) => (
    <div className="flex flex-col">
      <label htmlFor={id} className="mb-1 text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        <input 
          type="text" 
          id={id}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-12"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">{value.length}/{maxLength}</span>
      </div>
    </div>
  );

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">會員維護與查詢</h1>
      
      <form onSubmit={handleSearch} className="mb-10 pb-8 border-b border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
          <InputField label="中文姓名" id="chineseName" value={chineseName} onChange={(e) => setChineseName(e.target.value)} maxLength={10} />
          <InputField label="學生證號" id="studentId" value={studentId} onChange={(e) => setStudentId(e.target.value)} maxLength={7} />
          <InputField label="身分證號" id="idNumber" value={idNumber} onChange={(e) => setIdNumber(e.target.value)} maxLength={10} />
          <InputField label="畢業年份" id="graduationYear" value={graduationYear} onChange={(e) => setGraduationYear(e.target.value)} maxLength={4} />
          <InputField label="其他文字欄位檢索" id="otherSearch" value={otherSearch} onChange={(e) => setOtherSearch(e.target.value)} maxLength={10} />
          
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">性別</label>
            <div className="flex items-center space-x-6 h-full">
              <label className="flex items-center cursor-pointer">
                <input type="radio" name="gender" value="unspecified" checked={gender === 'unspecified'} onChange={(e) => setGender(e.target.value)} className="form-radio h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500" />
                <span className="ml-2 text-gray-700">未指定</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input type="radio" name="gender" value="male" checked={gender === 'male'} onChange={(e) => setGender(e.target.value)} className="form-radio h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500" />
                <span className="ml-2 text-gray-700">男</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input type="radio" name="gender" value="female" checked={gender === 'female'} onChange={(e) => setGender(e.target.value)} className="form-radio h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500" />
                <span className="ml-2 text-gray-700">女</span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button type="submit" className="px-8 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
            查詢
          </button>
        </div>
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              {['中文姓名', '性別', '畢業年份', '系所', '班別', 'E-mail', '電話', '動作'].map(header => (
                <th key={header} className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {members.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-16 text-gray-500">
                  尚無資料
                </td>
              </tr>
            ) : (
              members.map((member) => (
                <tr key={member.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-4 px-4 whitespace-nowrap">{member.name}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{member.gender}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{member.graduationYear}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{member.department}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{member.class}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{member.email}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{member.phone}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{/* Action buttons go here */}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MembershipManagementPage;
