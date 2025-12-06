"use client";
import React, { useState, useEffect } from 'react';
import { getContactInfo, updateContactInfo, createContactInfo } from '@/app/api/contact';
import { getEmployees, createEmployee, updateEmployee, deleteEmployee } from '@/app/api/employees';
import { ContactInfo, ContactInfoRequest } from './interface.dto';
import { EmployeeItem } from '@/app/components/interface.dto';

interface EmployeeFormData {
  empName: string;
  title: string;
  tel: string;
}

const ContactManagementPage = () => {
  // 聯絡資訊狀態
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    workingHours: '',
    phone: '',
    address: '',
    email: '',
    generalPhone: ''
  });

  // 員工管理狀態
  const [employees, setEmployees] = useState<EmployeeItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [employeeLoading, setEmployeeLoading] = useState(false);
  
  // 表單狀態
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [isAddingEmployee, setIsAddingEmployee] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<EmployeeItem | null>(null);
  const [employeeForm, setEmployeeForm] = useState<EmployeeFormData>({
    empName: '',
    title: '',
    tel: ''
  });

  // 載入聯絡資訊
  const loadContactInfo = async () => {
    try {
      setLoading(true);
      const response = await getContactInfo();
      setContactInfo(response);
    } catch (error) {
      console.error('Failed to load contact info:', error);
      // 如果沒有聯絡資訊，使用預設值
      setContactInfo({
        workingHours: '週一～週五 上午9:00~下午6:00',
        phone: '03-5734558',
        address: '新竹市大學路1001號（交大校友會）辦公室位置：交大浩然圖書館地下一樓',
        email: 'alumni@nctuaa.org.tw',
        generalPhone: '03-5712121'
      });
    } finally {
      setLoading(false);
    }
  };

  // 載入員工資料
  const loadEmployees = async () => {
    try {
      setEmployeeLoading(true);
      const response = await getEmployees<EmployeeItem>("", 1, 100);
      setEmployees(response.items);
    } catch (error) {
      console.error('Failed to load employees:', error);
      setEmployees([]);
    } finally {
      setEmployeeLoading(false);
    }
  };

  useEffect(() => {
    loadContactInfo();
    loadEmployees();
  }, []);

  // 保存聯絡資訊
  const handleSaveContactInfo = async () => {
    try {
      setLoading(true);
      const contactRequest: ContactInfoRequest = {
        workingHours: contactInfo.workingHours,
        phone: contactInfo.phone,
        address: contactInfo.address,
        email: contactInfo.email,
        generalPhone: contactInfo.generalPhone
      };

      if (contactInfo.id) {
        await updateContactInfo(contactRequest);
      } else {
        await createContactInfo(contactRequest);
      }
      
      setIsEditingContact(false);
      await loadContactInfo();
      alert('聯絡資訊已更新');
    } catch (error) {
      console.error('Failed to save contact info:', error);
      alert('更新失敗');
    } finally {
      setLoading(false);
    }
  };

  // 處理員工表單提交
  const handleEmployeeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setEmployeeLoading(true);
      
      if (editingEmployee) {
        // 更新員工
        const updatedEmployee: EmployeeItem = {
          ...editingEmployee,
          empName: employeeForm.empName,
          title: employeeForm.title,
          tel: employeeForm.tel
        };
        await updateEmployee(updatedEmployee);
        alert('員工資料已更新');
      } else {
        // 新增員工
        await createEmployee(employeeForm);
        alert('員工已新增');
      }
      
      // 重置表單
      setEmployeeForm({ empName: '', title: '', tel: '' });
      setIsAddingEmployee(false);
      setEditingEmployee(null);
      await loadEmployees();
    } catch (error) {
      console.error('Failed to save employee:', error);
      alert('操作失敗');
    } finally {
      setEmployeeLoading(false);
    }
  };

  // 編輯員工
  const handleEditEmployee = (employee: EmployeeItem) => {
    setEditingEmployee(employee);
    setEmployeeForm({
      empName: employee.empName,
      title: employee.title,
      tel: employee.tel
    });
    setIsAddingEmployee(true);
  };

  // 刪除員工
  const handleDeleteEmployee = async (empId: string) => {
    if (confirm('確定要刪除此員工嗎？')) {
      try {
        setEmployeeLoading(true);
        await deleteEmployee(empId);
        alert('員工已刪除');
        await loadEmployees();
      } catch (error) {
        console.error('Failed to delete employee:', error);
        alert('刪除失敗');
      } finally {
        setEmployeeLoading(false);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">聯絡資訊管理</h1>

      {/* 聯絡資訊區塊 */}
      <div className="bg-white rounded-lg shadow-md p-6 text-gray-900">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">基本聯絡資訊</h2>
          <button
            onClick={() => setIsEditingContact(!isEditingContact)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            disabled={loading}
          >
            {isEditingContact ? '取消編輯' : '編輯資訊'}
          </button>
        </div>

        {loading ? (
          <div className="text-center py-4">載入中...</div>
        ) : isEditingContact ? (
          <div className="space-y-4 text-gray-700">
            <div>
              <label className="block text-sm font-medium mb-1">上班時間</label>
              <input
                type="text"
                value={contactInfo.workingHours}
                onChange={(e) => setContactInfo({...contactInfo, workingHours: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">電話</label>
              <input
                type="text"
                value={contactInfo.phone}
                onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">總機號碼</label>
              <input
                type="text"
                value={contactInfo.generalPhone}
                onChange={(e) => setContactInfo({...contactInfo, generalPhone: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">地址</label>
              <textarea
                value={contactInfo.address}
                onChange={(e) => setContactInfo({...contactInfo, address: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">電子郵件</label>
              <input
                type="email"
                value={contactInfo.email}
                onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={handleSaveContactInfo}
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              disabled={loading}
            >
              {loading ? '保存中...' : '保存'}
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <p><span className="font-medium">上班時間:</span> {contactInfo.workingHours}</p>
            <p><span className="font-medium">電話:</span> {contactInfo.phone}</p>
            <p><span className="font-medium">總機:</span> {contactInfo.generalPhone}</p>
            <p><span className="font-medium">地址:</span> {contactInfo.address}</p>
            <p><span className="font-medium">電子郵件:</span> {contactInfo.email}</p>
          </div>
        )}
      </div>

      {/* 員工管理區塊 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">員工分機管理</h2>
          <button
            onClick={() => {
              setIsAddingEmployee(true);
              setEditingEmployee(null);
              setEmployeeForm({ empName: '', title: '', tel: '' });
            }}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            新增員工
          </button>
        </div>

        {/* 新增/編輯員工表單 */}
        {isAddingEmployee && (
          <form onSubmit={handleEmployeeSubmit} className="mb-6 p-4 bg-gray-50 rounded-md">
            <h3 className="text-lg font-medium mb-4">
              {editingEmployee ? '編輯員工' : '新增員工'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-900">
              <div>
                <label className="block text-sm font-medium mb-1">姓名</label>
                <input
                  type="text"
                  value={employeeForm.empName}
                  onChange={(e) => setEmployeeForm({...employeeForm, empName: e.target.value})}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">職位</label>
                <input
                  type="text"
                  value={employeeForm.title}
                  onChange={(e) => setEmployeeForm({...employeeForm, title: e.target.value})}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">分機號碼</label>
                <input
                  type="text"
                  value={employeeForm.tel}
                  onChange={(e) => setEmployeeForm({...employeeForm, tel: e.target.value})}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="mt-4 flex space-x-2">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                disabled={employeeLoading}
              >
                {employeeLoading ? '保存中...' : '保存'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsAddingEmployee(false);
                  setEditingEmployee(null);
                  setEmployeeForm({ empName: '', title: '', tel: '' });
                }}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                取消
              </button>
            </div>
          </form>
        )}

        {/* 員工列表 */}
        {employeeLoading ? (
          <div className="text-center py-4">載入中...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-md text-gray-900">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left px-4 py-2 border-b border-gray-200">姓名</th>
                  <th className="text-left px-4 py-2 border-b border-gray-200">職位</th>
                  <th className="text-left px-4 py-2 border-b border-gray-200">分機號碼</th>
                  <th className="text-left px-4 py-2 border-b border-gray-200">操作</th>
                </tr>
              </thead>
              <tbody>
                {employees.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-4 text-gray-400">暫無員工資料</td>
                  </tr>
                ) : (
                  employees.map((employee) => (
                    <tr key={employee.empId} className="hover:bg-gray-50">
                      <td className="px-4 py-2 border-b border-gray-100">{employee.empName}</td>
                      <td className="px-4 py-2 border-b border-gray-100">{employee.title}</td>
                      <td className="px-4 py-2 border-b border-gray-100">{employee.tel}</td>
                      <td className="px-4 py-2 border-b border-gray-100">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditEmployee(employee)}
                            className="px-3 py-1 bg-yellow-600 text-white text-sm rounded hover:bg-yellow-700"
                          >
                            編輯
                          </button>
                          <button
                            onClick={() => handleDeleteEmployee(employee.empId)}
                            className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                          >
                            刪除
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactManagementPage;
