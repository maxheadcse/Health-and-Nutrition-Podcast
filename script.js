// Episode data storage
let episodes = [];
let filteredEpisodes = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    loadEpisodes();
}

function setupEventListeners() {
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filterEpisodes(this.dataset.category);
        });
    });

    // Search input
    document.getElementById('searchInput').addEventListener('input', function() {
        searchEpisodes(this.value);
    });

    // Modal close
    document.querySelector('.close').addEventListener('click', closeModal);
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('episodeModal');
        if (event.target === modal) {
            closeModal();
        }
    });
}

// Load episodes from JSON file
async function loadEpisodes() {
    try {
        showLoading();
        
        const response = await fetch('episodes.json');
        if (!response.ok) {
            throw new Error('Failed to load episodes data');
        }
        
        episodes = await response.json();
        filteredEpisodes = [...episodes];
        renderEpisodes();
        
    } catch (error) {
        console.error('Error loading episodes:', error);
        showError('Failed to load episodes. Please check if episodes.json exists in your repository.');
    }
}

// Render episodes to the DOM
function renderEpisodes() {
    const episodesList = document.getElementById('episodesList');
    
    if (filteredEpisodes.length === 0) {
        episodesList.innerHTML = `
            <div class="no-episodes">
                <i class="fas fa-podcast"></i>
                <h3>No episodes found</h3>
                <p>Try adjusting your filters or search terms.</p>
            </div>
        `;
        return;
    }
    
    episodesList.innerHTML = filteredEpisodes.map(episode => `
        <div class="episode-card" onclick="openEpisode(${episode.id})">
            <div class="episode-header">
                <span class="episode-number">${episode.number}</span>
                <span class="category-tag ${episode.category}">${episode.category}</span>
            </div>
            <h3 class="episode-title">${episode.title}</h3>
            <p class="episode-description">${episode.description}</p>
            <div class="episode-meta">
                <span class="episode-duration">
                    <i class="fas fa-clock"></i>
                    ${episode.duration}
                </span>
                <div class="episode-actions">
                    <button class="action-btn" onclick="event.stopPropagation(); playEpisode(${episode.id})">
                        <i class="fas fa-play"></i>
                    </button>
                    <button class="action-btn" onclick="event.stopPropagation(); downloadEpisode(${episode.id})">
                        <i class="fas fa-download"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Filter episodes by category
function filterEpisodes(category) {
    if (category === 'all') {
        filteredEpisodes = [...episodes];
    } else {
        filteredEpisodes = episodes.filter(episode => episode.category === category);
    }
    renderEpisodes();
}

// Search episodes
function searchEpisodes(query) {
    const searchTerm = query.toLowerCase();
    
    if (searchTerm === '') {
        filteredEpisodes = [...episodes];
    } else {
        filteredEpisodes = episodes.filter(episode => 
            episode.title.toLowerCase().includes(searchTerm) ||
            episode.description.toLowerCase().includes(searchTerm) ||
            episode.category.toLowerCase().includes(searchTerm)
        );
    }
    renderEpisodes();
}

// Open episode modal
function openEpisode(episodeId) {
    const episode = episodes.find(e => e.id === episodeId);
    if (!episode) return;
    
    document.getElementById('modalTitle').textContent = episode.title;
    document.getElementById('modalCategory').textContent = episode.category;
    document.getElementById('modalCategory').className = `category-tag ${episode.category}`;
    document.getElementById('modalDate').textContent = new Date(episode.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    const audioElement = document.getElementById('modalAudio');
    audioElement.src = episode.audioFile;
    
    const downloadBtn = document.getElementById('modalDownload');
    downloadBtn.href = episode.audioFile;
    downloadBtn.download = `${episode.number.replace(' ', '-')}-${episode.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.mp3`;
    
    document.getElementById('modalTranscript').textContent = episode.transcript;
    
    document.getElementById('episodeModal').style.display = 'block';
}

// Close modal
function closeModal() {
    document.getElementById('episodeModal').style.display = 'none';
    const audioElement = document.getElementById('modalAudio');
    audioElement.pause();
    audioElement.src = '';
}

// Play episode
function playEpisode(episodeId) {
    const episode = episodes.find(e => e.id === episodeId);
    if (episode) {
        // Open in modal for better mobile experience
        openEpisode(episodeId);
        // Auto-play when modal opens
        setTimeout(() => {
            const audioElement = document.getElementById('modalAudio');
            audioElement.play().catch(e => {
                console.log('Auto-play prevented, user needs to click play button');
            });
        }, 500);
    }
}

// Download episode
function downloadEpisode(episodeId) {
    const episode = episodes.find(e => e.id === episodeId);
    if (episode) {
        const downloadBtn = document.createElement('a');
        downloadBtn.href = episode.audioFile;
        downloadBtn.download = `${episode.number.replace(' ', '-')}-${episode.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.mp3`;
        downloadBtn.click();
    }
}

// Show loading state
function showLoading() {
    const episodesList = document.getElementById('episodesList');
    episodesList.innerHTML = `
        <div class="loading">
            <i class="fas fa-spinner fa-spin"></i>
            <p>Loading episodes from GitHub...</p>
        </div>
    `;
}

// Show error state
function showError(message) {
    const episodesList = document.getElementById('episodesList');
    episodesList.innerHTML = `
        <div class="error-state">
            <i class="fas fa-exclamation-triangle"></i>
            <h3>Loading Error</h3>
            <p>${message}</p>
            <button onclick="loadEpisodes()" class="retry-btn">Try Again</button>
        </div>
    `;
}

// Export for potential use
window.podcastApp = {
    loadEpisodes,
    filterEpisodes,
    searchEpisodes,
    openEpisode,
    closeModal
};