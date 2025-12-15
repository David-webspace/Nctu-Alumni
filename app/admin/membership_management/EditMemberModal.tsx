"use client";

import React, { useState, useEffect } from 'react';
import { MemberItem, DepartmentItem, BranchItem } from './interface.dto';
import { queryDepartments } from '@/app/api/departments';
import { queryBranches } from '@/app/api/branches';

interface EditMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: MemberItem | null;
  onSave: (updatedMember: MemberItem) => Promise<void>;
  isCreateMode?: boolean;
}

const EditMemberModal: React.FC<EditMemberModalProps> = ({ isOpen, onClose, member, onSave, isCreateMode = false }) => {
  const [formData, setFormData] = useState<MemberItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [departments, setDepartments] = useState<DepartmentItem[]>([]);
  const [branches, setBranches] = useState<BranchItem[]>([]);

  useEffect(() => {
    console.log('Received member data:', member);
    if (member) {
      console.log('Birthday field:', member.birthday, typeof member.birthday);
      console.log('JoinDate field:', member.joinDate, typeof member.joinDate);
      console.log('ExpiryDate field:', member.expiryDate, typeof member.expiryDate);
      console.log('Department field:', member.department, 'type:', typeof member.department);
      console.log('DepartmentId field:', member.departmentId, 'type:', typeof member.departmentId);
      console.log('Minor field:', member.minor, 'type:', typeof member.minor);
      console.log('MinorId field:', member.minorId, 'type:', typeof member.minorId);
      console.log('Branch field:', member.branch, 'type:', typeof member.branch);
      console.log('BranchName field:', member.branchName, 'type:', typeof member.branchName);
    }
    // 如果是新增模式且沒有傳入 member，創建一個空的 member 物件
    if (isCreateMode && !member) {
      const emptyMember: MemberItem = {
        memberId: '',
        memberName: '',
        personalId: '',
        gender: '',
        phone: '',
        email: '',
        department: '',
        departmentId: '',
        minor: '',
        minorId: '',
        branch: '',
        branchName: '',
        role: '',
        roleId: '',
        graduatedYear: '',
        startYear: ''
      };
      setFormData(emptyMember);
    } else {
      setFormData(member);
    }
    setIsSubmitting(false);
    setSubmitMessage(null);
  }, [member, isCreateMode]);

  // 載入部門和分會資料
  useEffect(() => {
    const loadDepartments = async () => {
      try {
        const response = await queryDepartments(''); // 傳入空字串載入所有部門
        console.log('Loaded departments:', response.items);
        setDepartments(response.items);
      } catch (error) {
        console.error('Failed to load departments:', error);
      }
    };

    const loadBranches = async () => {
      try {
        const branchItems = await queryBranches();
        console.log('Loaded branches:', branchItems);
        setBranches(branchItems);
      } catch (error) {
        console.error('Failed to load branches:', error);
      }
    };

    if (isOpen) {
      loadDepartments();
      loadBranches();
    }
  }, [isOpen]);

  // 當部門和分會資料載入完成且有 formData 時，檢查並修正相關欄位
  useEffect(() => {
    if (!formData) return;

    let needsUpdate = false;
    const updates: Partial<typeof formData> = {};

    // 處理 department 欄位
    if (departments.length > 0 && formData.department) {
      const deptExists = departments.find(dept => dept.departmentId === formData.department);
      
      if (!deptExists) {
        // 如果不是有效的 departmentId，嘗試用 departmentName 查找
        const deptByName = departments.find(dept => dept.departmentName === formData.department);
        if (deptByName) {
          console.log('Converting department name to departmentId:', formData.department, '->', deptByName.departmentId);
          updates.department = deptByName.departmentName;
          updates.departmentId = deptByName.departmentId;
          needsUpdate = true;
        }
      } else {
        // 如果是有效的 departmentId，確保 department 也正確
        if (!formData.departmentId || formData.departmentId !== formData.department) {
          console.log('Updating departmentId for department:', formData.department);
          updates.departmentId = formData.department;
          updates.department = deptExists.departmentName;
          needsUpdate = true;
        }
      }
    }

    // 處理 minor 欄位
    if (departments.length > 0 && formData.minor) {
      const minorExists = departments.find(dept => dept.departmentId === formData.minor);
      
      if (!minorExists) {
        // 如果不是有效的 departmentId，嘗試用 departmentName 查找
        const minorByName = departments.find(dept => dept.departmentName === formData.minor);
        if (minorByName) {
          console.log('Converting minor name to minorId:', formData.minor, '->', minorByName.departmentId);
          updates.minor = minorByName.departmentName;
          updates.minorId = minorByName.departmentId;
          needsUpdate = true;
        }
      } else {
        // 如果是有效的 departmentId，確保 minor 也正確
        if (!formData.minorId || formData.minorId !== formData.minor) {
          console.log('Updating minorId for minor:', formData.minor);
          updates.minorId = formData.minor;
          updates.minor = minorExists.departmentName;
          needsUpdate = true;
        }
      }
    }

    // 處理 branch 欄位
    if (branches.length > 0 && formData.branch) {
      const branchExists = branches.find(branch => branch.branchId === formData.branch);
      
      if (!branchExists) {
        // 如果不是有效的 branchId，嘗試用 branchName 查找
        const branchByName = branches.find(branch => branch.branchName === formData.branch);
        if (branchByName) {
          console.log('Converting branch name to branchId:', formData.branch, '->', branchByName.branchId);
          updates.branch = branchByName.branchId;
          updates.branchName = branchByName.branchName;
          needsUpdate = true;
        }
      } else {
        // 如果是有效的 branchId，確保 branchName 也正確
        if (!formData.branchName || formData.branchName !== branchExists.branchName) {
          console.log('Updating branchName for branchId:', formData.branch, '->', branchExists.branchName);
          updates.branchName = branchExists.branchName;
          needsUpdate = true;
        }
      }
    }

    // 如果需要更新，一次性更新所有欄位
    if (needsUpdate) {
      setFormData(prev => prev ? { ...prev, ...updates } : null);
    }
  }, [departments, branches, formData?.department, formData?.minor, formData?.branch]);

  if (!isOpen || !formData) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    // 如果是 branch 欄位，同時更新 branchName
    if (name === 'branch') {
      setFormData(prev => prev ? { ...prev, [name]: value, branchName: value } : null);
    } else {
      setFormData(prev => prev ? { ...prev, [name]: value } : null);
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'department') {
      // 當選擇系所時，需要同時更新 department 和 departmentId
      const selectedDept = departments.find(dept => dept.departmentId === value);
      setFormData(prev => prev ? {
        ...prev,
        department: selectedDept?.departmentName || '',
        departmentId: value
      } : null);
      console.log('Updated department:', selectedDept?.departmentName, 'departmentId:', value);
    } else if (name === 'minor') {
      // 當選擇輔系時，需要同時更新 minor 和 minorId
      const selectedMinor = departments.find(dept => dept.departmentId === value);
      setFormData(prev => prev ? {
        ...prev,
        minor: selectedMinor?.departmentName || '',
        minorId: value
      } : null);
      console.log('Updated minor:', selectedMinor?.departmentName, 'minorId:', value);
    } else if (name === 'branch') {
      // 當選擇分會時，需要同時更新 branch 和 branchName
      const selectedBranch = branches.find(branch => branch.branchId === value);
      setFormData(prev => prev ? {
        ...prev,
        branch: value,
        branchName: selectedBranch?.branchName || ''
      } : null);
      console.log('Updated branch:', selectedBranch?.branchName, 'branchId:', value);
    } else {
      setFormData(prev => prev ? { ...prev, [name]: value } : null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData && !isSubmitting) {
      setIsSubmitting(true);
      setSubmitMessage(null);
      try {
        await onSave(formData);
        setSubmitMessage({ type: 'success', text: isCreateMode ? '會員新增成功！' : '會員資料更新成功！' });
        setTimeout(() => {
          setSubmitMessage(null);
        }, 2000);
      } catch (error) {
        setSubmitMessage({ type: 'error', text: isCreateMode ? '新增失敗，請稍後再試。' : '更新失敗，請稍後再試。' });
        console.error('Update failed:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Helper to render input fields
  const renderInputField = (label: string, name: keyof MemberItem, type: string = 'text', required: boolean = false) => {
    let displayValue = formData[name] || '';

    // 處理日期欄位的格式
    if (type === 'date' && displayValue) {
      console.log(`Processing date field ${name}:`, displayValue, typeof displayValue);

      if (displayValue instanceof Date) {
        displayValue = displayValue.toISOString().split('T')[0];
      } else if (typeof displayValue === 'string' && displayValue.trim() !== '') {
        // 嘗試解析各種日期格式
        let date;

        // 如果已經是 YYYY-MM-DD 格式，直接使用
        if (/^\d{4}-\d{2}-\d{2}$/.test(displayValue)) {
          displayValue = displayValue;
        } else {
          // 嘗試解析其他格式
          date = new Date(displayValue);
          if (!isNaN(date.getTime())) {
            displayValue = date.toISOString().split('T')[0];
          } else {
            // 如果無法解析，保持原值或設為空
            displayValue = '';
          }
        }
      }
    }

    return (
      <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <input
          type={type}
          id={name}
          name={name}
          value={String(displayValue)}
          onChange={handleChange}
          required={required}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
    );
  };

  // Helper to render department select field
  const renderDepartmentSelect = () => {
    console.log('Current formData.department:', formData.department);
    console.log('Current formData.departmentId:', formData.departmentId);
    console.log('Available departments:', departments);

    return (
      <div>
        <label htmlFor="department" className="block text-sm font-medium text-gray-700">
          系所
          <span className="text-red-500 ml-1">*</span>
        </label>
        <select
          id="department"
          name="department"
          value={formData.departmentId || ''}
          onChange={handleSelectChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">請選擇系所</option>
          {departments.map((dept) => (
            <option key={dept.departmentId} value={dept.departmentId}>
              {dept.departmentName}
            </option>
          ))}
        </select>
      </div>
    );
  };

  // Helper to render minor select field
  const renderMinorSelect = () => {
    console.log('Current formData.minor:', formData.minor);
    console.log('Current formData.minorId:', formData.minorId);

    return (
      <div>
        <label htmlFor="minor" className="block text-sm font-medium text-gray-700">
          輔系
          <span className="text-red-500 ml-1">*</span>
        </label>
        <select
          id="minor"
          name="minor"
          value={formData.minorId || ''}
          onChange={handleSelectChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">請選擇輔系</option>
          {departments.map((dept) => (
            <option key={dept.departmentId} value={dept.departmentId}>
              {dept.departmentName}
            </option>
          ))}
        </select>
      </div>
    );
  };

  // Helper to render branch select field
  const renderBranchSelect = () => {
    // 找到當前分會對應的 branchId
    // 優先使用 formData.branch (branchId)，如果沒有則嘗試用 branchName 查找
    let currentBranch = null;
    if (formData.branch) {
      // 如果有 branchId，直接用 branchId 查找
      currentBranch = branches.find(branch => branch.branchId === formData.branch);
    } else if (formData.branchName) {
      // 如果沒有 branchId 但有 branchName，用 branchName 查找
      currentBranch = branches.find(branch => branch.branchName === formData.branchName);
    }

    console.log('Current formData.branch:', formData.branch);
    console.log('Current formData.branchName:', formData.branchName);
    console.log('Available branches:', branches);
    console.log('Found current branch:', currentBranch);

    return (
      <div>
        <label htmlFor="branch" className="block text-sm font-medium text-gray-700">
          分會
          <span className="text-red-500 ml-1">*</span>
        </label>
        <select
          id="branch"
          name="branch"
          value={formData.branch || ''}
          onChange={handleSelectChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">請選擇分會</option>
          {branches.map((branch) => (
            <option key={branch.branchId} value={branch.branchId}>
              {branch.branchName}
            </option>
          ))}
        </select>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">{isCreateMode ? '新增會員' : '編輯會員資料'}</h2>
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-sm text-blue-800">
            <span className="text-red-500">*</span> 標記為必填欄位
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-8 text-gray-800">
            {/* 基本資料 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">基本資料</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {renderInputField('姓名', 'memberName', 'text', true)}
                {renderInputField('學號', 'memberId', 'text', true)}
                {renderInputField('身分證號', 'personalId')}
                {renderInputField('性別', 'gender')}
                {renderInputField('生日', 'birthday', 'date')}
                {renderInputField('國籍', 'nationality')}
                {renderInputField('配偶姓名', 'spouseName')}
              </div>
            </div>

            {/* 聯絡資訊 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">聯絡資訊</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {renderInputField('電話', 'phone')}
                {renderInputField('行動電話1', 'mobilePhone1')}
                {renderInputField('行動電話2', 'mobilePhone2')}
                {renderInputField('Email', 'email')}
                {renderInputField('郵遞區號', 'zipcode')}
                {renderInputField('通訊地址', 'mailingAddress')}
                {renderInputField('戶籍地址', 'residentialAddress')}
                {renderInputField('居住地', 'location')}
              </div>
            </div>

            {/* 學歷資訊 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">學歷資訊</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {renderDepartmentSelect()}
                {renderMinorSelect()}
                {renderInputField('入學年份', 'startYear')}
                {renderInputField('畢業年份', 'graduatedYear')}
                {renderInputField('學士學位', 'bachelorDegree')}
                {renderInputField('碩士學位', 'masterDegree')}
                {renderInputField('博士學位', 'doctoralDegree')}
              </div>
            </div>

            {/* 工作資訊 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">工作資訊</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {renderInputField('公司名稱', 'companyName')}
                {renderInputField('產業類別', 'industryType')}
                {renderInputField('職務', 'jobTitle')}
                {renderInputField('職稱', 'title')}
                {renderInputField('公司電話', 'companyPhone')}
                {renderInputField('公司傳真', 'companyFax')}
                {renderInputField('公司郵遞區號', 'companyZipcode')}
                {renderInputField('公司地址', 'companyAddress')}
                {renderInputField('公司Email', 'companyEmail')}
              </div>
            </div>

            {/* 會員資訊 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">會員資訊</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {renderInputField('會員類型', 'memberType')}
                {renderInputField('會員狀況', 'conditionStatus')}
                {renderBranchSelect()}
                {renderInputField('角色', 'role')}
                {renderInputField('屆別', 'termNumber')}
                {renderInputField('附屬單位', 'affiliatedUnit')}
                {renderInputField('校友證號', 'alumniCardNumber')}
                {renderInputField('入會日期', 'joinDate', 'date')}
                {renderInputField('有效日期', 'expiryDate', 'date')}
                {renderInputField('校友會Email', 'alumniAssociationEmail')}
              </div>
            </div>

            {/* 其他資訊 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">其他資訊</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {renderInputField('專業領域', 'expertise')}
                {renderInputField('興趣', 'interests')}
                {renderInputField('訂閱電子報', 'newsletterSubscription')}
                {renderInputField('繳費紀錄', 'paymentRecord')}
                {renderInputField('家庭應用', 'familyApplication')}
                {renderInputField('備註', 'remarks')}
                {renderInputField('校友會備註', 'alumniRemarks')}
              </div>
            </div>
          </div>

          {/* Success/Error Message */}
          {submitMessage && (
            <div className={`mt-4 p-3 rounded-md ${
              submitMessage.type === 'success'
                ? 'bg-green-50 border border-green-200 text-green-800'
                : 'bg-red-50 border border-red-200 text-red-800'
            }`}>
              {submitMessage.text}
            </div>
          )}

          <div className="flex justify-end gap-4 pt-6">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-6 py-2 bg-gray-100 text-gray-700 font-semibold rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              取消
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting && (
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {isSubmitting ? (isCreateMode ? '新增中...' : '儲存中...') : (isCreateMode ? '新增' : '儲存')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMemberModal;
