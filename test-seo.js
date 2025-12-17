const { spawn } = require('child_process');
const http = require('http');

// 啟動開發服務器
console.log('🚀 啟動開發服務器...');
const server = spawn('npm', ['run', 'dev'], {
  stdio: 'pipe',
  shell: true
});

// 等待服務器啟動
setTimeout(async () => {
  try {
    console.log('🔍 測試首頁SEO...');
    
    const response = await fetch('http://localhost:3000');
    const html = await response.text();
    
    console.log('\n=== SEO 測試結果 ===');
    
    // 檢查是否有實際的HTML內容而不只是script標籤
    const hasRealContent = html.includes('<header') && html.includes('<main') && html.includes('<footer');
    console.log(`✅ 包含實際HTML結構: ${hasRealContent ? '是' : '否'}`);
    
    // 檢查meta標籤
    const hasTitle = html.includes('<title>首頁 | 國立陽明交通大學校友總會</title>');
    console.log(`✅ 正確的標題: ${hasTitle ? '是' : '否'}`);
    
    const hasDescription = html.includes('國立陽明交通大學校友總會官方網站首頁');
    console.log(`✅ SEO描述: ${hasDescription ? '是' : '否'}`);
    
    const hasOG = html.includes('og:title') && html.includes('og:description');
    console.log(`✅ Open Graph標籤: ${hasOG ? '是' : '否'}`);
    
    const hasStructuredData = html.includes('"@type":"Organization"');
    console.log(`✅ 結構化數據: ${hasStructuredData ? '是' : '否'}`);
    
    // 檢查是否主要是script標籤
    const scriptCount = (html.match(/<script/g) || []).length;
    const htmlTagCount = (html.match(/<(?!script|\/script)[a-z]/g) || []).length;
    console.log(`📊 HTML標籤數量: ${htmlTagCount}, Script標籤數量: ${scriptCount}`);
    console.log(`✅ HTML內容比例良好: ${htmlTagCount > scriptCount ? '是' : '否'}`);
    
    console.log('\n=== 首頁HTML預覽 (前500字符) ===');
    console.log(html.substring(0, 500) + '...');
    
  } catch (error) {
    console.error('❌ 測試失敗:', error.message);
  } finally {
    // 關閉服務器
    server.kill();
    process.exit(0);
  }
}, 5000);

server.stdout.on('data', (data) => {
  const output = data.toString();
  if (output.includes('Ready')) {
    console.log('✅ 服務器已準備就緒');
  }
});

server.stderr.on('data', (data) => {
  // 忽略一些常見的警告
});
