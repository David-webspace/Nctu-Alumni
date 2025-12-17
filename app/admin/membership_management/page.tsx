"use client";

import { queryMembers, updateMember, createMember, importMembers, exportMembers } from '@/app/api/members';
import { queryDepartments } from '@/app/api/departments';
import Pagination from '@/app/components/Pagination';
import React, { useState, useEffect } from 'react';
import { MemberItem, DepartmentItem } from './interface.dto';
import EditMemberModal from './EditMemberModal';

// 將 InputField 移到組件外部，避免每次渲染時重新創建
const InputField = ({ label, id, value, onChange, maxLength, placeholder }: {
  label: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength: number;
  placeholder?: string;
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
        placeholder={placeholder}
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
  const [title, setTitle] = useState('');
  const [termNumber, setTermNumber] = useState('');
  const [memberType, setMemberType] = useState('');
  const [conditionStatus, setConditionStatus] = useState('');
  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);

  // Advanced search fields
  const [spouseName, setSpouseName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [location, setLocation] = useState('');
  const [nationality, setNationality] = useState('');
  const [mobilePhone1, setMobilePhone1] = useState('');
  const [mobilePhone2, setMobilePhone2] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [mailingAddress, setMailingAddress] = useState('');
  const [residentialAddress, setResidentialAddress] = useState('');
  const [expertise, setExpertise] = useState('');
  const [interests, setInterests] = useState('');
  const [remarks, setRemarks] = useState('');
  const [alumniRemarks, setAlumniRemarks] = useState('');
  const [bachelorDegree, setBachelorDegree] = useState('');
  const [masterDegree, setMasterDegree] = useState('');
  const [doctoralDegree, setDoctoralDegree] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [industryType, setIndustryType] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [companyPhone, setCompanyPhone] = useState('');
  const [companyFax, setCompanyFax] = useState('');
  const [companyZipcode, setCompanyZipcode] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [affiliatedUnit, setAffiliatedUnit] = useState('');
  const [alumniCardNumber, setAlumniCardNumber] = useState('');
  const [joinDate, setJoinDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [newsletterSubscription, setNewsletterSubscription] = useState('');
  const [paymentRecord, setPaymentRecord] = useState('');
  const [familyApplication, setFamilyApplication] = useState('');
  const [alumniAssociationEmail, setAlumniAssociationEmail] = useState('');
  const [role, setRole] = useState('');

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<MemberItem | null>(null);
  const [isCreateMode, setIsCreateMode] = useState(false);

  // State for search results and loading
  const [members, setMembers] = useState<MemberItem[]>([]);
  const [departments, setDepartments] = useState<DepartmentItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // 確保頁面初始載入時清空資料並載入科系選項
  useEffect(() => {
    setMembers([]);
    setTotalCount(0);
    setCurrentPage(1);

    // 載入科系選項
    const loadDepartments = async () => {
      try {
        const response = await queryDepartments("");
        setDepartments(response.items);
      } catch (error) {
        console.error('Failed to load departments:', error);
      }
    };

    loadDepartments();
  }, []);

  const fetchMembers = async (page: number = currentPage) => {
    setLoading(true);
    try {
      const requestParams = {
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
        title: title,
        termNumber: termNumber,
        memberType: memberType,
        conditionStatus: conditionStatus,
        spouseName: spouseName,
        birthday: birthday,
        location: location,
        nationality: nationality,
        mobilePhone1: mobilePhone1,
        mobilePhone2: mobilePhone2,
        zipcode: zipcode,
        mailingAddress: mailingAddress,
        residentialAddress: residentialAddress,
        expertise: expertise,
        interests: interests,
        remarks: remarks,
        alumniRemarks: alumniRemarks,
        bachelorDegree: bachelorDegree,
        masterDegree: masterDegree,
        doctoralDegree: doctoralDegree,
        companyName: companyName,
        industryType: industryType,
        jobTitle: jobTitle,
        companyPhone: companyPhone,
        companyFax: companyFax,
        companyZipcode: companyZipcode,
        companyAddress: companyAddress,
        companyEmail: companyEmail,
        affiliatedUnit: affiliatedUnit,
        alumniCardNumber: alumniCardNumber,
        joinDate: joinDate,
        expiryDate: expiryDate,
        newsletterSubscription: newsletterSubscription,
        paymentRecord: paymentRecord,
        familyApplication: familyApplication,
        alumniAssociationEmail: alumniAssociationEmail,
        role: role,
        pageItem: {
          pageNumber: page,
          pageSize: pageSize
        }
      };

      const response = await queryMembers(requestParams);
      console.log('API Response:', response);
      console.log('Items count:', response.items.length);
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
    setTitle('');
    setTermNumber('');
    setMemberType('');
    setConditionStatus('');
    setSpouseName('');
    setBirthday('');
    setLocation('');
    setNationality('');
    setMobilePhone1('');
    setMobilePhone2('');
    setZipcode('');
    setMailingAddress('');
    setResidentialAddress('');
    setExpertise('');
    setInterests('');
    setRemarks('');
    setAlumniRemarks('');
    setBachelorDegree('');
    setMasterDegree('');
    setDoctoralDegree('');
    setCompanyName('');
    setIndustryType('');
    setJobTitle('');
    setCompanyPhone('');
    setCompanyFax('');
    setCompanyZipcode('');
    setCompanyAddress('');
    setCompanyEmail('');
    setAffiliatedUnit('');
    setAlumniCardNumber('');
    setJoinDate('');
    setExpiryDate('');
    setNewsletterSubscription('');
    setPaymentRecord('');
    setFamilyApplication('');
    setAlumniAssociationEmail('');
    setRole('');
    setMembers([]);
    setTotalCount(0);
    setCurrentPage(1);
    setLoading(false);
  };

  const handleEdit = (member: MemberItem) => {
    setEditingMember(member);
    setIsCreateMode(false);
    setIsEditModalOpen(true);
  };

  const handleCreate = () => {
    setEditingMember(null);
    setIsCreateMode(true);
    setIsEditModalOpen(true);
  };

  // CSV 匯入功能
  const handleImportCSV = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      alert('請選擇 CSV 檔案');
      return;
    }

    try {
      setLoading(true);
      const result = await importMembers(file);

      alert(`匯入成功！共匯入 ${result.successCount} 筆資料`);
      fetchMembers(1); // 重新載入第一頁資料
      setCurrentPage(1);
    } catch (error: any) {
      console.error('Import error:', error);
      
      // 顯示更詳細的錯誤訊息
      let errorMessage = '匯入過程中發生錯誤';
      if (error?.response?.data?.message) {
        errorMessage = `匯入失敗：${error.response.data.message}`;
      } else if (error?.message) {
        errorMessage = `匯入失敗：${error.message}`;
      }
      
      alert(errorMessage);
    } finally {
      setLoading(false);
      // 清空 input 值，讓使用者可以重複選擇同一個檔案
      event.target.value = '';
    }
  };

  // CSV 匯出功能
  const handleExportCSV = async () => {
    try {
      setLoading(true);
      
      // 重新執行查詢以獲取完整的回應資料
      const requestParams = {
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
        title: title,
        termNumber: termNumber,
        memberType: memberType,
        conditionStatus: conditionStatus,
        spouseName: spouseName,
        birthday: birthday,
        location: location,
        nationality: nationality,
        mobilePhone1: mobilePhone1,
        mobilePhone2: mobilePhone2,
        zipcode: zipcode,
        mailingAddress: mailingAddress,
        residentialAddress: residentialAddress,
        expertise: expertise,
        interests: interests,
        remarks: remarks,
        alumniRemarks: alumniRemarks,
        bachelorDegree: bachelorDegree,
        masterDegree: masterDegree,
        doctoralDegree: doctoralDegree,
        companyName: companyName,
        industryType: industryType,
        jobTitle: jobTitle,
        companyPhone: companyPhone,
        companyFax: companyFax,
        companyZipcode: companyZipcode,
        companyAddress: companyAddress,
        companyEmail: companyEmail,
        affiliatedUnit: affiliatedUnit,
        alumniCardNumber: alumniCardNumber,
        joinDate: joinDate,
        expiryDate: expiryDate,
        newsletterSubscription: newsletterSubscription,
        paymentRecord: paymentRecord,
        familyApplication: familyApplication,
        alumniAssociationEmail: alumniAssociationEmail,
        role: role,
        pageItem: {
          pageNumber: 1,
          pageSize: 999999 // 設定很大的數字來匯出所有符合條件的資料
        }
      };

      const queryResponse = await queryMembers(requestParams);
      const blob = await exportMembers(queryResponse);

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `members_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export error:', error);
      alert('匯出過程中發生錯誤');
    } finally {
      setLoading(false);
    }
  };

  // 下載 CSV 範本
  const handleDownloadTemplate = () => {
    // 根據後端實際匯出格式調整欄位順序
    const csvHeaders = [
      'memberId', 'memberName', 'personalId', 'gender', 'phone', 'email',
      'department', 'departmentId', 'minorId', 'minor', 'branchId', 'branchName',
      'roleId', 'role', 'graduatedYear', 'startYear', 'title', 'termNumber',
      'spouseName', 'birthday', 'location', 'nationality', 'conditionStatus',
      'mobilePhone1', 'mobilePhone2', 'zipcode', 'mailingAddress', 'residentialAddress',
      'expertise', 'interests', 'remarks', 'alumniRemarks',
      'bachelorDegree', 'masterDegree', 'doctoralDegree',
      'companyName', 'industryType', 'jobTitle', 'companyPhone', 'companyFax',
      'companyZipcode', 'companyAddress', 'companyEmail',
      'memberType', 'affiliatedUnit', 'alumniCardNumber',
      'joinDate', 'expiryDate', 'newsletterSubscription', 'paymentRecord',
      'familyApplication', 'alumniAssociationEmail'
    ];

    // 根據實際匯出格式調整範例資料
    const sampleData = [
      '0123456789', '王小明', 'B987654321', 'M', '0912345678', 'wang@example.com',
      '電機工程學系', 'DP002', 'DP001', '資訊工程學系', 'D02', '新竹分會',
      'R01', '會長', '2023', '2019', '教授', '第15屆',
      '陳美麗', '1985-03-15', '新竹市', '中華民國', '正常',
      '0987654321', '0923456789', '30001', '新竹市東區光復路二段101號', '新竹市北區中正路50號',
      '人工智慧', '攝影', '積極參與', '優秀校友',
      '電機工程學士', '電機工程碩士', '電機工程博士',
      '台積電', '半導體', '資深工程師', '03-12345678', '03-12345679',
      '30078', '新竹科學園區力行路1號', 'wang.work@tsmc.com',
      '終身會員', '新竹分會', 'NC001',
      '2019-09-01', '2030-08-31', '是', '已繳費',
      '是', 'alumni.hsinchu@nctu.edu.tw'
    ];

    const csvContent = [
      csvHeaders.join(','),
      sampleData.join(',')
    ].join('\n');

    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'member_template.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const handleSave = async (memberData: MemberItem) => {
    try {
      let response;
      if (isCreateMode) {
        response = await createMember(memberData);
      } else {
        response = await updateMember(memberData);
      }

      if (response.status === 'SUCCESS') {
        setIsEditModalOpen(false);
        setEditingMember(null);
        setIsCreateMode(false);
        fetchMembers(currentPage); // Refresh the list
      } else {
        throw new Error(`${isCreateMode ? 'Create' : 'Update'} failed with status: ${response.status}`);
      }
    } catch (error: unknown) {
      console.error(`Failed to ${isCreateMode ? 'create' : 'update'} member:`, error);
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response: { data: unknown; status: number } };
        console.error('Error response data:', axiosError.response.data);
        console.error('Error response status:', axiosError.response.status);
      }
      throw error; // Re-throw to let the modal handle the error display
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">會員維護與查詢</h1>

      <form onSubmit={handleSearch} className="mb-10 pb-8 border-b border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-6 text-gray-700">
          <InputField label="中文姓名" id="chineseName" value={chineseName} onChange={(e) => setChineseName(e.target.value)} maxLength={10} />
          <InputField label="學號" id="studentId" value={studentId} onChange={(e) => setStudentId(e.target.value)} maxLength={10} />
          <InputField label="身分證字號" id="idNumber" value={idNumber} onChange={(e) => setIdNumber(e.target.value)} maxLength={10} />
          <InputField label="畢業年份" id="graduationYear" value={graduationYear} onChange={(e) => setGraduationYear(e.target.value)} maxLength={4} />
          <InputField label="入學年份" id="startYear" value={startYear} onChange={(e) => setStartYear(e.target.value)} maxLength={4} />
        </div>

        {isAdvancedSearchOpen && (
          <div className="space-y-8 mt-6">
            {/* 基本資訊 */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 col-span-full">基本資訊</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-6 text-gray-700 mt-4">
                <InputField label="職稱" id="title" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={20} />
                <InputField label="屆別" id="termNumber" value={termNumber} onChange={(e) => setTermNumber(e.target.value)} maxLength={10} />
                <InputField label="配偶姓名" id="spouseName" value={spouseName} onChange={(e) => setSpouseName(e.target.value)} maxLength={20} />
                <InputField label="生日" id="birthday" value={birthday} onChange={(e) => setBirthday(e.target.value)} maxLength={10} placeholder="YYYY-MM-DD" />
                <InputField label="居住地" id="location" value={location} onChange={(e) => setLocation(e.target.value)} maxLength={50} />
                <InputField label="國籍" id="nationality" value={nationality} onChange={(e) => setNationality(e.target.value)} maxLength={20} />
                <InputField label="會員狀況" id="conditionStatus" value={conditionStatus} onChange={(e) => setConditionStatus(e.target.value)} maxLength={10} />
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium text-gray-700">性別</label>
                  <div className="flex items-center space-x-6 h-full">
                    <label className="flex items-center cursor-pointer"><input type="radio" name="gender" value="unspecified" checked={gender === 'unspecified'} onChange={(e) => setGender(e.target.value)} className="form-radio h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500" /><span className="ml-2 text-gray-700">未指定</span></label>
                    <label className="flex items-center cursor-pointer"><input type="radio" name="gender" value="male" checked={gender === 'male'} onChange={(e) => setGender(e.target.value)} className="form-radio h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500" /><span className="ml-2 text-gray-700">男</span></label>
                    <label className="flex items-center cursor-pointer"><input type="radio" name="gender" value="female" checked={gender === 'female'} onChange={(e) => setGender(e.target.value)} className="form-radio h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500" /><span className="ml-2 text-gray-700">女</span></label>
                  </div>
                </div>
              </div>
            </div>

            {/* 聯絡資訊 */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 col-span-full">聯絡資訊</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-6 text-gray-700 mt-4">
                <InputField label="聯絡電話" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} maxLength={15} />
                <InputField label="電子郵件" id="email" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={50} />
                <InputField label="行動電話1" id="mobilePhone1" value={mobilePhone1} onChange={(e) => setMobilePhone1(e.target.value)} maxLength={20} />
                <InputField label="行動電話2" id="mobilePhone2" value={mobilePhone2} onChange={(e) => setMobilePhone2(e.target.value)} maxLength={20} />
                <InputField label="郵遞區號" id="zipcode" value={zipcode} onChange={(e) => setZipcode(e.target.value)} maxLength={10} />
                <InputField label="通訊地址" id="mailingAddress" value={mailingAddress} onChange={(e) => setMailingAddress(e.target.value)} maxLength={100} />
                <InputField label="戶籍地址" id="residentialAddress" value={residentialAddress} onChange={(e) => setResidentialAddress(e.target.value)} maxLength={100} />
              </div>
            </div>

            {/* 學歷與個人特質 */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 col-span-full">學歷與個人特質</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-6 text-gray-700 mt-4">
                <div className="flex flex-col">
                  <label htmlFor="department" className="mb-1 text-sm font-medium text-gray-700">科系</label>
                  <select
                    id="department"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">請選擇科系</option>
                    {departments.map((dept) => (
                      <option key={dept.departmentId} value={dept.departmentId}>
                        {dept.departmentName}
                      </option>
                    ))}
                  </select>
                </div>
                <InputField label="輔系" id="minor" value={minor} onChange={(e) => setMinor(e.target.value)} maxLength={20} />
                <InputField label="學士學位" id="bachelorDegree" value={bachelorDegree} onChange={(e) => setBachelorDegree(e.target.value)} maxLength={50} />
                <InputField label="碩士學位" id="masterDegree" value={masterDegree} onChange={(e) => setMasterDegree(e.target.value)} maxLength={50} />
                <InputField label="博士學位" id="doctoralDegree" value={doctoralDegree} onChange={(e) => setDoctoralDegree(e.target.value)} maxLength={50} />
                <InputField label="專業領域" id="expertise" value={expertise} onChange={(e) => setExpertise(e.target.value)} maxLength={100} />
                <InputField label="興趣" id="interests" value={interests} onChange={(e) => setInterests(e.target.value)} maxLength={100} />
                <InputField label="備註" id="remarks" value={remarks} onChange={(e) => setRemarks(e.target.value)} maxLength={200} />
                <InputField label="校友會備註" id="alumniRemarks" value={alumniRemarks} onChange={(e) => setAlumniRemarks(e.target.value)} maxLength={200} />
              </div>
            </div>

            {/* 工作資訊 */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 col-span-full">工作資訊</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-6 text-gray-700 mt-4">
                <InputField label="公司名稱" id="companyName" value={companyName} onChange={(e) => setCompanyName(e.target.value)} maxLength={50} />
                <InputField label="產業類別" id="industryType" value={industryType} onChange={(e) => setIndustryType(e.target.value)} maxLength={50} />
                <InputField label="職務" id="jobTitle" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} maxLength={50} />
                <InputField label="公司電話" id="companyPhone" value={companyPhone} onChange={(e) => setCompanyPhone(e.target.value)} maxLength={20} />
                <InputField label="公司傳真" id="companyFax" value={companyFax} onChange={(e) => setCompanyFax(e.target.value)} maxLength={20} />
                <InputField label="公司郵遞區號" id="companyZipcode" value={companyZipcode} onChange={(e) => setCompanyZipcode(e.target.value)} maxLength={10} />
                <InputField label="公司地址" id="companyAddress" value={companyAddress} onChange={(e) => setCompanyAddress(e.target.value)} maxLength={100} />
                <InputField label="公司Email" id="companyEmail" value={companyEmail} onChange={(e) => setCompanyEmail(e.target.value)} maxLength={50} />
              </div>
            </div>

            {/* 會員資訊 */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 col-span-full">會員資訊</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-6 text-gray-700 mt-4">
                <InputField label="分校" id="branch" value={branch} onChange={(e) => setBranch(e.target.value)} maxLength={20} />
                <InputField label="角色" id="role" value={role} onChange={(e) => setRole(e.target.value)} maxLength={20} />
                <InputField label="會員類型" id="memberType" value={memberType} onChange={(e) => setMemberType(e.target.value)} maxLength={10} />
                <InputField label="附屬單位" id="affiliatedUnit" value={affiliatedUnit} onChange={(e) => setAffiliatedUnit(e.target.value)} maxLength={50} />
                <InputField label="校友證號" id="alumniCardNumber" value={alumniCardNumber} onChange={(e) => setAlumniCardNumber(e.target.value)} maxLength={20} />
                <InputField label="入會日期" id="joinDate" value={joinDate} onChange={(e) => setJoinDate(e.target.value)} maxLength={10} placeholder="YYYY-MM-DD" />
                <InputField label="有效日期" id="expiryDate" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} maxLength={10} placeholder="YYYY-MM-DD" />
                <InputField label="訂閱電子報" id="newsletterSubscription" value={newsletterSubscription} onChange={(e) => setNewsletterSubscription(e.target.value)} maxLength={10} />
                <InputField label="繳費紀錄" id="paymentRecord" value={paymentRecord} onChange={(e) => setPaymentRecord(e.target.value)} maxLength={50} />
                <InputField label="家庭應用" id="familyApplication" value={familyApplication} onChange={(e) => setFamilyApplication(e.target.value)} maxLength={10} />
                <InputField label="校友會Email" id="alumniAssociationEmail" value={alumniAssociationEmail} onChange={(e) => setAlumniAssociationEmail(e.target.value)} maxLength={50} />
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={() => setIsAdvancedSearchOpen(!isAdvancedSearchOpen)}
            className="px-8 py-2 bg-white text-indigo-600 font-semibold rounded-md border border-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            {isAdvancedSearchOpen ? '收合進階查詢' : '顯示進階查詢'}
          </button>
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

      {/* 操作按鈕 */}
      <div className="mb-4 flex justify-between items-center">
        <div className="flex gap-3">
          {/* 匯入按鈕 */}
          <div className="relative">
            <input
              type="file"
              id="csv-import"
              accept=".csv"
              onChange={handleImportCSV}
              className="hidden"
            />
            <label
              htmlFor="csv-import"
              className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span className="text-lg">↑</span>
              匯入 CSV
            </label>
          </div>

          {/* 匯出按鈕 */}
          <button
            onClick={handleExportCSV}
            className="px-4 py-2 bg-orange-600 text-white font-semibold rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors flex items-center gap-2"
          >
            <span className="text-lg">↓</span>
            匯出 CSV
          </button>

          {/* 下載範本按鈕 */}
          <button
            onClick={handleDownloadTemplate}
            className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors flex items-center gap-2"
          >
            <span className="text-lg">📄</span>
            下載範本
          </button>
        </div>

        {/* 新增會員按鈕 */}
        <button
          onClick={() => handleCreate()}
          className="px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors flex items-center gap-2"
        >
          <span className="text-lg">+</span>
          新增會員
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              {['姓名', '學號', '身分證號', '性別', '電話', 'Email', '系所', '輔系', '分會', '畢業年份', '入學年份', '職稱', '屆別', '配偶姓名', '生日', '居住地', '國籍', '會員狀況', '行動電話1', '行動電話2', '郵遞區號', '通訊地址', '戶籍地址', '專業領域', '興趣', '備註', '校友會備註', '學士學位', '碩士學位', '博士學位', '公司名稱', '產業類別', '職務', '公司電話', '公司傳真', '公司郵遞區號', '公司地址', '公司Email', '會員類型', '附屬單位', '校友證號', '入會日期', '有效日期', '訂閱電子報', '繳費紀錄', '家庭應用', '校友會Email', '動作'].map(header => (
                <th key={header} className={`py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap ${
                  header === '動作' ? 'sticky right-0 bg-gray-50 border-l border-gray-200 z-10' : ''
                }`}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {loading ? (
              <tr>
                <td colSpan={49} className="text-center py-16 text-gray-500">
                  載入中...
                </td>
              </tr>
            ) : members.length === 0 ? (
              <tr>
                <td colSpan={49} className="text-center py-16 text-gray-500">
                  查無資料
                </td>
              </tr>
            ) : (
              members.map((member) => (
                <tr key={member.memberId} className="border-b border-gray-200 hover:bg-gray-50 group">
                  <td className="py-4 px-4 whitespace-nowrap">{member.memberName}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{member.memberId}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{member.personalId}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{member.gender}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{member.phone}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{member.email}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{member.department}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{member.minor}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{member.branchName}</td>
                  {/* <td className="py-4 px-4 whitespace-nowrap">{member.role}</td> */}
                  <td className="py-4 px-4 whitespace-nowrap">{member.graduatedYear}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{member.startYear}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{member.title}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{member.termNumber}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{member.spouseName}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{member.birthday ? new Date(member.birthday).toLocaleDateString() : ''}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{member.location}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{member.nationality}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{member.conditionStatus}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{member.mobilePhone1}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{member.mobilePhone2}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{member.zipcode}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{member.mailingAddress}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{member.residentialAddress}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{member.expertise}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{member.interests}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{member.remarks}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{member.alumniRemarks}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{member.bachelorDegree}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{member.masterDegree}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{member.doctoralDegree}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{member.companyName}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{member.industryType}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{member.jobTitle}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{member.companyPhone}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{member.companyFax}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{member.companyZipcode}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{member.companyAddress}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{member.companyEmail}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{member.memberType}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{member.affiliatedUnit}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{member.alumniCardNumber}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{member.joinDate ? new Date(member.joinDate).toLocaleDateString() : ''}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{member.expiryDate ? new Date(member.expiryDate).toLocaleDateString() : ''}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{member.newsletterSubscription}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{member.paymentRecord}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{member.familyApplication}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{member.alumniAssociationEmail}</td>
                  <td className="py-4 px-4 whitespace-nowrap sticky right-0 bg-white group-hover:bg-gray-50 border-l border-gray-200">
                    <button onClick={() => handleEdit(member)} className="text-indigo-600 hover:text-indigo-900 font-medium">編輯</button>
                  </td>
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

      <EditMemberModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingMember(null);
          setIsCreateMode(false);
        }}
        member={editingMember}
        onSave={handleSave}
        isCreateMode={isCreateMode}
      />
    </div>
  );
};

export default MembershipManagementPage;
