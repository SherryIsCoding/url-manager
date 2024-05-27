const MAX_URLS = 10; // 设置URL数量限制

// 初始化时加载URL列表
document.addEventListener('DOMContentLoaded', loadUrls);

// 增加URL行
document.getElementById('add-url').addEventListener('click', () => addUrlRow(''));

function loadUrls() {
  chrome.storage.local.get('urls', (data) => {
    const urls = data.urls || [];
    for (const url of urls) {
      addUrlRow(url);
    }
  });
}

function addUrlRow(url = '') {
  const urlList = document.getElementById('url-list');
  const currentUrls = Array.from(urlList.querySelectorAll('input')).map(input => input.value.trim());

  // 检查是否超过最大数量限制
  if (currentUrls.length >= MAX_URLS) {
    alert(`你最多只能添加 ${MAX_URLS} 个URL。`);
    return;
  }

  // 创建新行
  const row = document.createElement('div');
  row.className = 'url-row';

  const input = document.createElement('input');
  input.type = 'text';
  input.value = url;
  row.appendChild(input);

  const removeButton = document.createElement('button');
  removeButton.textContent = '-';
  removeButton.addEventListener('click', () => {
    row.remove();
    saveUrls();
  });
  row.appendChild(removeButton);

  urlList.appendChild(row);
  input.addEventListener('change', () => {
    if (isDuplicateUrl(input.value, currentUrls)) {
      alert('这个URL已经存在。');
      input.value = '';
    } else {
      saveUrls();
    }
  });

  saveUrls();
}

function isDuplicateUrl(url, urlList) {
  return urlList.includes(url.trim());
}

function saveUrls() {
  const urlList = document.getElementById('url-list');
  const urls = [];
  urlList.querySelectorAll('input').forEach(input => {
    if (input.value.trim()) {
      urls.push(input.value.trim());
    }
  });
  chrome.storage.local.set({ urls });
}
