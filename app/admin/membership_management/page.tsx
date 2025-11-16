"use client";

import { queryMembers } from '@/app/api/members';
import Pagination from '@/app/components/Pagination';
import React, { useState } from 'react';
import { MemberItem } from './interface.dto';

// 將 InputField 移到組件外部，避免每次渲染時重新創建
const InputField = ({ label, id, value, onChange, maxLength }: {
  label: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength: number
}) => (
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

const MembershipManagementPage = () => {
  // State for form inputs
  const [chineseName, setChineseName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [genderInput, setGenderInput] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [minor, setMinor] = useState('');
  const [branch, setBranch] = useState('');
  const [graduationYear, setGraduationYear] = useState('');
  const [startYear, setStartYear] = useState('');
  const [gender, setGender] = useState('unspecified');

  // State for search results and loading
  const [members, setMembers] = useState<MemberItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const fetchMembers = async (page: number = currentPage) => {
    setLoading(true);
    try {
      const response = await queryMembers<MemberItem>({
        memberId: studentId,
        memberName: chineseName,
        personalId: idNumber,
        gender: genderInput || (gender === 'unspecified' ? '' : gender),
        phone: phone,
        email: email,
        department: department,
        minor: minor,
        branch: branch,
        graduatedYear: graduationYear,
        startYear: startYear,
        pageItem: {
          pageNumber: page,
          pageSize: pageSize
        }
      });
      setMembers(response.items);
      setTotalCount(response.pageItem.totalCount);
      setCurrentPage(page);
    } catch (error) {
      console.error('Failed to fetch members:', error);
      setMembers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1); // 重置到第一頁
    await fetchMembers(1);
  };

  const handlePageChange = (page: number) => {
    fetchMembers(page);
  };

  const handleClear = () => {
    setChineseName('');
    setStudentId('');
    setIdNumber('');
    setGenderInput('');
    setPhone('');
    setEmail('');
    setDepartment('');
    setMinor('');
    setBranch('');
    setGraduationYear('');
    setStartYear('');
    setGender('unspecified');
    setMembers([]);
    setTotalCount(0);
    setCurrentPage(1);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">會員維護與查詢</h1>

      <form onSubmit={handleSearch} className="mb-10 pb-8 border-b border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6 text-gray-700">
          <InputField label="中文姓名" id="chineseName" value={chineseName} onChange={(e) => setChineseName(e.target.value)} maxLength={10} />
          <InputField label="學號" id="studentId" value={studentId} onChange={(e) => setStudentId(e.target.value)} maxLength={10} />
          <InputField label="身分證字號" id="idNumber" value={idNumber} onChange={(e) => setIdNumber(e.target.value)} maxLength={10} />
          <InputField label="聯絡電話" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} maxLength={15} />
          <InputField label="電子郵件" id="email" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={50} />
          <InputField label="科系" id="department" value={department} onChange={(e) => setDepartment(e.target.value)} maxLength={20} />
          <InputField label="輔系" id="minor" value={minor} onChange={(e) => setMinor(e.target.value)} maxLength={20} />
          <InputField label="分校" id="branch" value={branch} onChange={(e) => setBranch(e.target.value)} maxLength={20} />
          <InputField label="畢業年份" id="graduationYear" value={graduationYear} onChange={(e) => setGraduationYear(e.target.value)} maxLength={4} />
          <InputField label="入學年份" id="startYear" value={startYear} onChange={(e) => setStartYear(e.target.value)} maxLength={4} />

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

        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={handleClear}
            className="px-8 py-2 bg-gray-100 text-gray-700 font-semibold rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-colors"
          >
            清空
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? '查詢中...' : '查詢'}
          </button>
        </div>
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              {['姓名', '學號', '身分證號', '性別', '電話', 'Email', '系所', '輔系', '分會', '角色', '畢業年份', '入學年份', '動作'].map(header => (
                <th key={header} className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {loading ? (
              <tr>
                <td colSpan={13} className="text-center py-16 text-gray-500">
                  載入中...
                </td>
              </tr>
            ) : members.length === 0 ? (
              <tr>
                <td colSpan={13} className="text-center py-16 text-gray-500">
                  尚無資料
                </td>
              </tr>
            ) : (
              members.map((member) => (
                <tr key={member.memberId} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-4 px-4 whitespace-nowrap">{member.memberName}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{member.memberId}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{member.personalId}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{member.gender}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{member.phone}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{member.email}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{member.department}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{member.minor}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{member.branch}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{member.role}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{member.graduatedYear}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{member.startYear}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{/* Action buttons go here */}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 分頁組件 */}
      {totalCount > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(totalCount / pageSize)}
          onPageChange={handlePageChange}
          totalCount={totalCount}
          pageSize={pageSize}
        />
      )}
    </div>
  );
};

export default MembershipManagementPage;
