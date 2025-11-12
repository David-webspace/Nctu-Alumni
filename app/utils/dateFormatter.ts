/**
 * 格式化 timestamp 為指定的日期時間格式
 * @param timestamp - Unix timestamp (毫秒)
 * @returns 格式化後的日期字串，格式為 yyyy年MM月DD日 HH:mm
 */
export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}年${month}月${day}日 ${hours}:${minutes}`;
};

/**
 * 格式化 timestamp 為包含秒數的日期時間格式
 * @param timestamp - Unix timestamp (毫秒)
 * @returns 格式化後的日期字串，格式為 yyyy年MM月DD日 HH:mm:ss
 */
export const formatDateWithSeconds = (timestamp: number): string => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}年${month}月${day}日 ${hours}:${minutes}:${seconds}`;
};

/**
 * 格式化 timestamp 為僅日期格式
 * @param timestamp - Unix timestamp (毫秒)
 * @returns 格式化後的日期字串，格式為 yyyy年MM月DD日
 */
export const formatDateOnly = (timestamp: number): string => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}年${month}月${day}日`;
};

/**
 * 格式化 ISO 日期字串為 yyyy/MM/dd HH:mm:ss 格式
 * @param isoString - ISO 格式日期字串 (例如: "2025-09-21T15:40:00")
 * @returns 格式化後的日期字串，格式為 yyyy/MM/dd HH:mm:ss
 */
export const formatISOToDateTime = (isoString: string | number): string => {
  if (!isoString) return '';
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
};
