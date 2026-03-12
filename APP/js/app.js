// Navigation
function showHome() {
    document.querySelector('.categories-grid').parentElement.style.display = 'block';
    document.querySelector('.reports-view').style.display = 'none';
    document.getElementById('homeIcon').classList.add('active');
    document.getElementById('reportsIcon').classList.remove('active');
}

// Settings modal
const settingsModal = document.getElementById('settingsModal');
const closeSettingsBtn = document.querySelector('.close-settings');

function openSettings() {
    settingsModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeSettings() {
    settingsModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

closeSettingsBtn.addEventListener('click', closeSettings);
window.addEventListener('click', (e) => {
    if (e.target === settingsModal) closeSettings();
});

// theme preference
function applyTheme(pref) {
    // remove any existing theme classes
    document.body.classList.remove('dark-mode');
    document.body.classList.remove('bright-mode');
    if (pref === 'dark') {
        document.body.classList.add('dark-mode');
    } else if (pref === 'bright') {
        document.body.classList.add('bright-mode');
    }
    localStorage.setItem('theme', pref);
}

function loadTheme() {
    const t = localStorage.getItem('theme') || 'light';
    const sel = document.getElementById('themeSelect');
    if (sel) sel.value = t;
    applyTheme(t);
}

// notification preference
function loadNotifications() {
    const toggle = document.getElementById('notifToggle');
    if (!toggle) return;
    const pref = localStorage.getItem('notifications') || 'off';
    toggle.checked = pref === 'on';
    if (pref === 'on' && Notification.permission === 'default') {
        Notification.requestPermission().then(p => {
            if (p !== 'granted') toggle.checked = false;
        });
    }
}

function saveNotificationPref(enabled) {
    localStorage.setItem('notifications', enabled ? 'on' : 'off');
    if (enabled && Notification.permission !== 'granted') {
        Notification.requestPermission().then(p => {
            if (p !== 'granted') {
                localStorage.setItem('notifications','off');
                document.getElementById('notifToggle').checked = false;
            }
        });
    }
}

// app title & municipality email
function loadAppSettings() {
    const title = localStorage.getItem('appTitle');
    if (title) {
        const h1 = document.querySelector('header h1');
        if (h1) h1.textContent = title;
        const input = document.getElementById('appTitleInput');
        if (input) input.value = title;
    }
    const email = localStorage.getItem('municipalityEmail');
    if (email) {
        const input = document.getElementById('municipalityEmailInput');
        if (input) input.value = email;
        const link = document.querySelector('#settingsModal a');
        if (link) { link.href = 'mailto:'+email; link.textContent = email; }
    }
}

function saveAppSettings() {
    const titleEl = document.getElementById('appTitleInput');
    if (titleEl && titleEl.value.trim()) {
        const t = titleEl.value.trim();
        localStorage.setItem('appTitle', t);
        const h1 = document.querySelector('header h1');
        if (h1) h1.textContent = t;
    }
    const emailEl = document.getElementById('municipalityEmailInput');
    if (emailEl && emailEl.value.trim()) {
        const e = emailEl.value.trim();
        localStorage.setItem('municipalityEmail', e);
        const link = document.querySelector('#settingsModal a');
        if (link) { link.href = 'mailto:'+e; link.textContent = e; }
    }
}

// ... existing code continues below ...

function showReports() {
    document.querySelector('.categories-grid').parentElement.style.display = 'none';
    document.querySelector('.reports-view').style.display = 'block';
    document.getElementById('homeIcon').classList.remove('active');
    document.getElementById('reportsIcon').classList.add('active');
    loadReports();
}

function loadReports() {
    fetch('get_reports.php')
        .then(response => response.json())
        .then(data => {
            const reportsList = document.getElementById('reportsList');
            
            if (data.length === 0) {
                reportsList.innerHTML = `
                    <div class="report-no-data">
                        <i class="fas fa-inbox"></i>
                        <h3>Nuk ka raporte</h3>
                        <p>Nuk keni dërguar asnjë raport ende</p>
                    </div>
                `;
            } else {
                reportsList.innerHTML = '<div class="reports-list">' + 
                    data.map(report => `
                        <div class="report-card">
                            <div class="report-header">
                                <div class="report-category">${report.category}</div>
                                <div class="report-status ${getStatusClass(report.status)}">${report.status}</div>
                            </div>
                            
                            <div class="report-description">${report.description}</div>
                            
                            <div class="report-details">
                                <div class="report-detail">
                                    <div class="report-detail-label">Kur u raportua</div>
                                    <div class="report-detail-value">${formatDate(report.created_at)}</div>
                                </div>
                                
                                <div class="report-detail">
                                    <div class="report-detail-label">Vendndodhja</div>
                                    <div class="report-detail-value">
                                        ${report.latitude && report.longitude ? 
                                            `${parseFloat(report.latitude).toFixed(4)}, ${parseFloat(report.longitude).toFixed(4)}` : 
                                            'Nuk u specifikua'}
                                    </div>
                                </div>
                            </div>
                            
                            ${report.photo ? `
                                <div style="margin-top: 1rem;">
                                    <img src="${report.photo}" style="width: 100%; border-radius: 8px; max-height: 300px; object-fit: cover;">
                                </div>
                            ` : ''}
                        </div>
                    `).join('') +
                    '</div>';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('reportsList').innerHTML = `
                <div class="report-no-data">
                    <i class="fas fa-exclamation-circle"></i>
                    <h3>Gabim</h3>
                    <p>Nuk mund të ngarkohen raportet</p>
                </div>
            `;
        });
}

function getStatusClass(status) {
    if (status === 'Në pritje') return 'pending';
    if (status === 'Në përpunim') return 'processing';
    if (status === 'Zgjidhur') return 'resolved';
    return '';
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

// Modal handling
const modal = document.getElementById('reportModal');
const closeBtn = document.querySelector('.close');

function openModal() {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    // Reset form
    document.querySelector('form').reset();
    document.getElementById('selectedCategory').value = '';
}

closeBtn.addEventListener('click', closeModal);

window.addEventListener('click', function(event) {
    if (event.target === modal) {
        closeModal();
    }
});

// Category selection
function selectCategory(category) {
    document.getElementById('selectedCategory').value = category;
    document.getElementById('modalTitle').textContent = 'Dërso raport - ' + category;
    openModal();
}

// Form validation
function validateForm() {
    const category = document.getElementById('selectedCategory').value;
    const description = document.getElementById('description').value.trim();
    
    if (!category) {
        alert('Zgjidhni kategorinë');
        return false;
    }
    if (description.length < 10) {
        alert('Përshkrimi duhet të ketë të paktën 10 karaktere');
        return false;
    }
    return true;
}

// Geolocation
function setLocation(lat, lng) {
    document.getElementById('latitude').value = lat.toFixed(6);
    document.getElementById('longitude').value = lng.toFixed(6);
}

function detectLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(pos) {
                setLocation(pos.coords.latitude, pos.coords.longitude);
                if (window.map && window.marker) {
                    window.marker.setLatLng([pos.coords.latitude, pos.coords.longitude]);
                    window.map.setView([pos.coords.latitude, pos.coords.longitude], 15);
                }
            },
            function(error) {
                alert('Nuk u arrit të zbulohej vendndodhja. Mundohuni më vonë.');
                console.error(error);
            }
        );
    } else {
        alert('Gjeolokacioni nuk suportohet në shfletuesin tuaj.');
    }
}

// Initialize Leaflet map for manual selection
function initMap() {
    if (!document.getElementById('map')) return;
    
    const map = L.map('map').setView([42.6667, 21.1667], 13); // Prishtina center
    window.map = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    const marker = L.marker([42.6667, 21.1667], {draggable: true}).addTo(map);
    window.marker = marker;

    marker.on('dragend', function(e) {
        const latlng = marker.getLatLng();
        setLocation(latlng.lat, latlng.lng);
    });

    map.on('click', function(e) {
        marker.setLatLng(e.latlng);
        setLocation(e.latlng.lat, e.latlng.lng);
    });
}

// Initialize everything on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    const locationBtn = document.getElementById('detect-location');
    if (locationBtn) {
        locationBtn.addEventListener('click', detectLocation);
    }
    initMap();
    // theme settings
    loadTheme();
    const themeSel = document.getElementById('themeSelect');
    if (themeSel) {
        themeSel.addEventListener('change', function() {
            applyTheme(this.value);
        });
    }
    // notifications
    loadNotifications();
    const notifEl = document.getElementById('notifToggle');
    if (notifEl) {
        notifEl.addEventListener('change', function() {
            saveNotificationPref(this.checked);
        });
    }
    // app title & email settings
    loadAppSettings();
    const saveBtn = document.getElementById('saveSettingsBtn');
    if (saveBtn) {
        saveBtn.addEventListener('click', function() {
            saveAppSettings();
            closeSettings();
        });
    }
});
