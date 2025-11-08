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
