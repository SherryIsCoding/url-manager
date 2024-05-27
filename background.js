chrome.runtime.onStartup.addListener(() => {
    chrome.storage.local.get('urls', (data) => {
        const urls = data.urls || [];
        for (const url of urls) {
            chrome.tabs.create({ url });
        }
    });
});
