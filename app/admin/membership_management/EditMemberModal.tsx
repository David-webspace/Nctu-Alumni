"use client";

import React, { useState, useEffect } from 'react';
import { MemberItem } from './interface.dto';

interface EditMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: MemberItem | null;
  onSave: (updatedMember: MemberItem) => void;
}

const EditMemberModal: React.FC<EditMemberModalProps> = ({ isOpen, onClose, member, onSave }) => {
  const [formData, setFormData] = useState<MemberItem | null>(null);

  useEffect(() => {
    setFormData(member);
  }, [member]);

  if (!isOpen || !formData) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => prev ? { ...prev, [name]: value } : null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      onSave(formData);
    }
  };

  // Helper to render input fields
  const renderInputField = (label: string, name: keyof MemberItem, type: string = 'text') => (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        value={String(formData[name] || '')}
        onChange={handleChange}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">編輯會員資料</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {renderInputField('姓名', 'memberName')}
            {renderInputField('學號', 'memberId')}
            {renderInputField('身分證號', 'personalId')}
            {renderInputField('性別', 'gender')}
            {renderInputField('電話', 'phone')}
            {renderInputField('Email', 'email')}
            {renderInputField('系所', 'department')}
            {renderInputField('輔系', 'minor')}
            {renderInputField('分會', 'branchName')}
            {renderInputField('角色', 'role')}
            {renderInputField('畢業年份', 'graduatedYear')}
            {renderInputField('入學年份', 'startYear')}
            {renderInputField('職稱', 'title')}
            {renderInputField('屆別', 'termNumber')}
            {renderInputField('配偶姓名', 'spouseName')}
            {renderInputField('生日', 'birthday', 'date')}
            {renderInputField('居住地', 'location')}
            {renderInputField('國籍', 'nationality')}
            {renderInputField('會員狀況', 'conditionStatus')}
            {renderInputField('行動電話1', 'mobilePhone1')}
            {renderInputField('行動電話2', 'mobilePhone2')}
            {renderInputField('郵遞區號', 'zipcode')}
            {renderInputField('通訊地址', 'mailingAddress')}
            {renderInputField('戶籍地址', 'residentialAddress')}
            {renderInputField('專業領域', 'expertise')}
            {renderInputField('興趣', 'interests')}
            {renderInputField('備註', 'remarks')}
            {renderInputField('校友會備註', 'alumniRemarks')}
            {renderInputField('學士學位', 'bachelorDegree')}
            {renderInputField('碩士學位', 'masterDegree')}
            {renderInputField('博士學位', 'doctoralDegree')}
            {renderInputField('公司名稱', 'companyName')}
            {renderInputField('產業類別', 'industryType')}
            {renderInputField('職務', 'jobTitle')}
            {renderInputField('公司電話', 'companyPhone')}
            {renderInputField('公司傳真', 'companyFax')}
            {renderInputField('公司郵遞區號', 'companyZipcode')}
            {renderInputField('公司地址', 'companyAddress')}
            {renderInputField('公司Email', 'companyEmail')}
            {renderInputField('會員類型', 'memberType')}
            {renderInputField('附屬單位', 'affiliatedUnit')}
            {renderInputField('校友證號', 'alumniCardNumber')}
            {renderInputField('入會日期', 'joinDate', 'date')}
            {renderInputField('有效日期', 'expiryDate', 'date')}
            {renderInputField('訂閱電子報', 'newsletterSubscription')}
            {renderInputField('繳費紀錄', 'paymentRecord')}
            {renderInputField('家庭應用', 'familyApplication')}
            {renderInputField('校友會Email', 'alumniAssociationEmail')}
          </div>
          <div className="flex justify-end gap-4 pt-6">
            <button type="button" onClick={onClose} className="px-6 py-2 bg-gray-100 text-gray-700 font-semibold rounded-md hover:bg-gray-200">取消</button>
            <button type="submit" className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700">儲存</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMemberModal;
