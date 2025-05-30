javascript:(function() {
    const BASE_URL = 'https://p23api.onrender.com';
    
    function shareCurrentPage() {
        const currentUrl = window.location.href;
        const formData = new FormData();
        formData.append('type', 'website');
        formData.append('content', currentUrl);
        
        // Add visual feedback
        const notification = document.createElement('div');
        notification.style.cssText = 'position:fixed;top:20px;right:20px;padding:15px;background:#4CAF50;color:white;border-radius:5px;z-index:9999;transition:0.3s;box-shadow:0 2px 5px rgba(0,0,0,0.2);';
        notification.textContent = 'Sharing page...';
        document.body.appendChild(notification);
        
        fetch(`${BASE_URL}/set_node`, {
            method: 'GET',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                notification.style.background = '#4CAF50';
                notification.textContent = data.message || 'Successfully shared the current page!';
                setTimeout(() => notification.remove(), 3000);
            } else {
                throw new Error(data.message || 'Failed to share page');
            }
        })
        .catch(error => {
            console.error('Error sharing page:', error);
            notification.style.background = '#f44336';
            notification.textContent = 'Failed to share page. Please try again.';
            setTimeout(() => notification.remove(), 5000);
        });
    }
    
    shareCurrentPage();
})();