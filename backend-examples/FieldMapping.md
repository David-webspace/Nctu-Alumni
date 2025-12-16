# CSV 欄位對應表

## 你的 CSV 格式 → 後端期望格式

| 你的 CSV 欄位 | 後端期望欄位 | 說明 |
|--------------|-------------|------|
| Name | memberName | 會員姓名 |
| Branch | branch | 分會 |
| jobTitle | jobTitle | 職務 |
| termNumber | termNumber | 屆別 |
| personalId | personalId | 身分證號 |
| spouseName | spouseName | 配偶姓名 |
| Birthday | birthday | 生日 (需要 yyyy-MM-dd 格式) |
| Sex | gender | 性別 |
| Location | location | 居住地 |
| Nationality | nationality | 國籍 |
| conditionStatus | conditionStatus | 會員狀況 |
| mobilePhone1 | mobilePhone1 | 行動電話1 |
| mobilePhone2 | mobilePhone2 | 行動電話2 |
| mobilePhone3 | - | 無對應欄位 |
| Chats | - | 無對應欄位 |
| Phone | phone | 電話 |
| zipcode | zipcode | 郵遞區號 |
| residentialAddress | residentialAddress | 戶籍地址 |
| mailingphone | - | 無對應欄位 |
| mailingZipcode | - | 無對應欄位 (被誤認為日期) |
| mailingAddress | mailingAddress | 通訊地址 |
| Email | email | Email |
| Website | - | 無對應欄位 |
| expertise | expertise | 專業領域 |
| Interests | interests | 興趣 |
| Remarks | remarks | 備註 |
| alumniRemarks | alumniRemarks | 校友會備註 |
| bachelorDegree | bachelorDegree | 學士學位 |
| masterDegree | masterDegree | 碩士學位 |
| doctorialDegree | doctoralDegree | 博士學位 |
| companyName | companyName | 公司名稱 |
| industryType | industryType | 產業類別 |
| companyPhone | companyPhone | 公司電話 |
| companyFax | companyFax | 公司傳真 |
| companyZipCode | companyZipcode | 公司郵遞區號 |
| companyAddress | companyAddress | 公司地址 |
| companyEmail | companyEmail | 公司Email |
| memberType | memberType | 會員類型 |
| affliatedUnit | affiliatedUnit | 附屬單位 |
| alumniCardNumber | alumniCardNumber | 校友證號 |
| joinDate | joinDate | 入會日期 (需要 yyyy-MM-dd 格式) |
| expiryDate | expiryDate | 有效日期 (需要 yyyy-MM-dd 格式) |
| newsletterSubscription | newsletterSubscription | 訂閱電子報 |
| paymentRecord | paymentRecord | 繳費紀錄 |
| familyApplication | familyApplication | 家庭應用 |
| alumniAssociationEmail | alumniAssociationEmail | 校友會Email |

## 缺少的必要欄位

你的 CSV 缺少以下欄位，可能需要補充：
- memberId (會員編號)
- department (系所)
- departmentId (系所ID)
- minor (輔系)
- minorId (輔系ID)
- branchName (分會名稱)
- roleId (職務ID)
- role (職務)
- graduatedYear (畢業年份)
- startYear (入學年份)
- title (職稱)

## 建議

1. **使用標準範本**：使用我剛創建的 `member_template.csv` 作為標準格式
2. **資料轉換**：將你現有的資料轉換為標準格式
3. **日期格式**：確保所有日期都是 `yyyy-MM-dd` 格式（例如：1990-01-01）
