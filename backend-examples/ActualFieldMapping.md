# 實際資料庫欄位對應表

## 基於你的 MembersEntity 的正確 CSV 格式

### 支援的欄位（共 43 個）

| CSV 欄位名稱 | 資料庫欄位 | 資料類型 | 說明 |
|-------------|-----------|---------|------|
| memberId | MEMBER_ID | String | 會員編號 |
| memberName | MEMBER_NAME | String | 會員姓名 |
| personalId | PERSONAL_ID | String | 身分證號 |
| gender | GENDER | String | 性別 |
| phone | PHONE | String | 電話 |
| email | EMAIL | String | Email |
| department | DEPARTMENT | String | 系所 |
| minor | MINOR | String | 輔系 |
| branch | BRANCH | String | 分會 |
| graduatedYear | GRADUATED_YEAR | String | 畢業年份 |
| startYear | START_YEAR | String | 入學年份 |
| title | TITLE | String | 職稱 |
| termNumber | TERM_NUMBER | String | 屆別 |
| spouseName | SPOUSE_NAME | String | 配偶姓名 |
| birthday | BIRTHDAY | Date | 生日 (yyyy-MM-dd) |
| location | LOCATION | String | 居住地 |
| nationality | NATIONALITY | String | 國籍 |
| conditionStatus | CONDITION_STATUS | String | 會員狀況 |
| mobilePhone1 | MOBILE_PHONE1 | String | 行動電話1 |
| mobilePhone2 | MOBILE_PHONE2 | String | 行動電話2 |
| zipcode | ZIPCODE | String | 郵遞區號 |
| mailingAddress | MAILING_ADDRESS | String | 通訊地址 |
| residentialAddress | RESIDENTIAL_ADDRESS | String | 戶籍地址 |
| expertise | EXPERTISE | String | 專業領域 |
| interests | INTERESTS | String | 興趣 |
| remarks | REMARKS | String | 備註 |
| alumniRemarks | ALUMNI_REMARKS | String | 校友會備註 |
| bachelorDegree | BACHELOR_DEGREE | String | 學士學位 |
| masterDegree | MASTER_DEGREE | String | 碩士學位 |
| doctoralDegree | DOCTORAL_DEGREE | String | 博士學位 |
| companyName | COMPANY_NAME | String | 公司名稱 |
| industryType | INDUSTRY_TYPE | String | 產業類別 |
| jobTitle | JOB_TITLE | String | 職務 |
| companyPhone | COMPANY_PHONE | String | 公司電話 |
| companyFax | COMPANY_FAX | String | 公司傳真 |
| companyZipcode | COMPANY_ZIPCODE | String | 公司郵遞區號 |
| companyAddress | COMPANY_ADDRESS | String | 公司地址 |
| companyEmail | COMPANY_EMAIL | String | 公司Email |
| memberType | MEMBER_TYPE | String | 會員類型 |
| affiliatedUnit | AFFILIATED_UNIT | String | 附屬單位 |
| alumniCardNumber | ALUMNI_CARD_NUMBER | String | 校友證號 |
| joinDate | JOIN_DATE | Date | 入會日期 (yyyy-MM-dd) |
| expiryDate | EXPIRY_DATE | Date | 有效日期 (yyyy-MM-dd) |
| newsletterSubscription | NEWSLETTER_SUBSCRIPTION | String | 訂閱電子報 |
| paymentRecord | PAYMENT_RECORD | String | 繳費紀錄 |
| familyApplication | FAMILY_APPLICATION | String | 家庭應用 |
| alumniAssociationEmail | ALUMNI_ASSOCIATION_EMAIL | String | 校友會Email |

### 移除的欄位（前端 interface 有但資料庫沒有）

以下欄位在前端 MemberItem interface 中存在，但在你的資料庫 Entity 中不存在：
- `departmentId` - 系所ID
- `minorId` - 輔系ID  
- `branchName` - 分會名稱
- `roleId` - 職務ID
- `role` - 職務

### 重要注意事項

1. **日期格式**：`birthday`, `joinDate`, `expiryDate` 必須使用 `yyyy-MM-dd` 格式
2. **必填欄位**：建議至少填寫 `memberId`, `memberName`, `personalId`
3. **字串長度**：注意資料庫欄位的長度限制
4. **空值處理**：空欄位可以留空，但不要使用 `null` 字串

### CSV 範例

```csv
memberId,memberName,personalId,gender,phone,email,department,minor,branch,graduatedYear,startYear,title,termNumber,spouseName,birthday,location,nationality,conditionStatus,mobilePhone1,mobilePhone2,zipcode,mailingAddress,residentialAddress,expertise,interests,remarks,alumniRemarks,bachelorDegree,masterDegree,doctoralDegree,companyName,industryType,jobTitle,companyPhone,companyFax,companyZipcode,companyAddress,companyEmail,memberType,affiliatedUnit,alumniCardNumber,joinDate,expiryDate,newsletterSubscription,paymentRecord,familyApplication,alumniAssociationEmail
M001,張三,A123456789,男,0912345678,zhang@example.com,資訊工程學系,電子工程學系,台北分會,2020,2016,工程師,第10屆,李四,1990-01-01,台北市,中華民國,正常,0987654321,0923456789,10001,台北市信義區信義路1號,台北市大安區復興南路1號,軟體開發,閱讀,無,表現優秀,資訊工程學士,資訊工程碩士,,Google,科技業,軟體工程師,02-12345678,02-12345679,10001,台北市信義區信義路100號,zhang.work@example.com,正式會員,台北分會,AA001,2020-01-01,2025-12-31,是,已繳費,否,alumni@example.com
```
