javascript:(function() {
    const BASE_URL = 'https://p23api.onrender.com';

    // Create notification system
    const createNotification = (message, type = 'info') => {
        const notification = document.createElement('div');
        const colors = {
            info: '#2196F3',
            success: '#4CAF50',
            error: '#f44336',
            warning: '#ff9800'
        };
        notification.style.cssText = `position:fixed;top:20px;right:20px;padding:15px;background:${colors[type]};color:white;border-radius:5px;z-index:9999;transition:0.3s;box-shadow:0 2px 5px rgba(0,0,0,0.2);`;
        notification.textContent = message;
        document.body.appendChild(notification);
        return notification;
    };

    // One-time check function
    const notification = createNotification('Checking for instructions...', 'info');
    
    fetch(`${BASE_URL}/get_node`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (!data.type || !data.content) {
                notification.style.background = '#ff9800';
                notification.textContent = 'No active instructions';
                setTimeout(() => notification.remove(), 3000);
                return;
            }

            switch(data.type) {
                case 'message':
                    notification.remove()
                    alert(data.content)
                    break;
                case 'website':
                    if (data.content.startsWith('http://') || data.content.startsWith('https://')) {
                        notification.style.background = '#4CAF50';
                        notification.textContent = 'Opening shared website...';
                        window.open(data.content, '_blank');
                        setTimeout(() => notification.remove(), 3000);
                    } else {
                        notification.style.background = '#f44336';
                        notification.textContent = 'Invalid website URL received';
                        setTimeout(() => notification.remove(), 5000);
                    }
                    break;
                case 'reset':
                    notification.style.background = '#ff9800';
                    notification.textContent = 'No active nodes';
                    setTimeout(() => notification.remove(), 3000);
                    break;
                default:
                    notification.style.background = '#f44336';
                    notification.textContent = `Unknown instruction type: ${data.type}`;
                    setTimeout(() => notification.remove(), 5000);
            }
        })
        .catch(error => {
            console.error('Error fetching node data:', error);
            notification.style.background = '#f44336';
            notification.textContent = 'Error checking for instructions. Please try again.';
            setTimeout(() => notification.remove(), 5000);
        });
})();
