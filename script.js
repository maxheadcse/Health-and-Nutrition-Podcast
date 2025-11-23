// Google Drive Configuration
const GOOGLE_DRIVE_FOLDER_ID = 'YOUR_DRIVE_FOLDER_ID_HERE'; // User will need to replace this
const GOOGLE_DRIVE_API_KEY = 'YOUR_API_KEY_HERE'; // User will need to replace this

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

// Load episodes from Google Drive
async function loadEpisodes() {
    try {
        showLoading();
        
        // For demo purposes, create sample episodes
        // In production, this would fetch from Google Drive API
        episodes = createSampleEpisodes();
        
        filteredEpisodes = [...episodes];
        renderEpisodes();
        
    } catch (error) {
        console.error('Error loading episodes:', error);
        showError('Failed to load episodes. Please check your Google Drive configuration.');
    }
}

// Create sample episodes for demo
function createSampleEpisodes() {
    return [
        {
            id: 1,
            number: 'Episode 01',
            title: 'Pizza Dough Digestibility: The Science Behind Fermentation',
            category: 'science',
            description: 'Deep dive into how traditional pizza dough fermentation affects digestibility and nutrient absorption compared to commercial alternatives.',
            duration: '32 min',
            date: '2024-01-15',
            audioUrl: '#',
            transcriptUrl: '#',
            transcript: 'Welcome to our first episode on pizza dough digestibility. Today we\'re exploring how traditional fermentation methods... [Full transcript would appear here]'
        },
        {
            id: 2,
            number: 'Episode 02',
            title: 'Finnish Food Chain: What America Can Learn from Nordic Nutrition',
            category: 'foodchain',
            description: 'Comparing the Finnish food supply chain with American systems, focusing on preservative-free approaches and local sourcing.',
            duration: '28 min',
            date: '2024-01-08',
            audioUrl: '#',
            transcriptUrl: '#',
            transcript: 'In this episode, we examine the Finnish approach to food production and distribution... [Full transcript would appear here]'
        },
        {
            id: 3,
            number: 'Episode 03',
            title: 'Meta Analysis: Artificial Ingredients vs. Natural Foods',
            category: 'meta',
            description: 'Comprehensive research analysis of artificial ingredients in the American food supply and their health impacts compared to natural alternatives.',
            duration: '35 min',
            date: '2024-01-01',
            audioUrl: '#',
            transcriptUrl: '#',
            transcript: 'Today we\'re presenting a meta-analysis of over 100 studies on artificial ingredients... [Full transcript would appear here]'
        },
        {
            id: 4,
            number: 'Episode 04',
            title: 'Sourdough Science: Gut Health and Traditional Breads',
            category: 'science',
            description: 'Exploring the microbiological benefits of sourdough fermentation and its impact on gut health and gluten sensitivity.',
            duration: '30 min',
            date: '2023-12-25',
            audioUrl: '#',
            transcriptUrl: '#',
            transcript: 'Sourdough bread has been a staple for thousands of years, but what makes it special... [Full transcript would appear here]'
        },
        {
            id: 5,
            number: 'Episode 05',
            title: 'European Food Regulations: Why the Ban on Artificial Colors Matters',
            category: 'foodchain',
            description: 'Analyzing European food regulations and why many artificial ingredients banned there are still common in American products.',
            duration: '29 min',
            date: '2023-12-18',
            audioUrl: '#',
            transcriptUrl: '#',
            transcript: 'The European Union has taken a much more cautious approach to food additives... [Full transcript would appear here]'
        },
        {
            id: 6,
            number: 'Episode 06',
            title: 'Research Roundup: Latest Findings on Processed Foods',
            category: 'meta',
            description: 'Monthly roundup of the latest scientific research on processed foods, artificial ingredients, and their health effects.',
            duration: '27 min',
            date: '2023-12-11',
            audioUrl: '#',
            transcriptUrl: '#',
            transcript: 'This month\'s research roundup brings you the latest findings from nutrition science... [Full transcript would appear here]'
        }
    ];
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
    audioElement.src = episode.audioUrl;
    
    const downloadBtn = document.getElementById('modalDownload');
    downloadBtn.href = episode.audioUrl;
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

// Play episode (placeholder)
function playEpisode(episodeId) {
    const episode = episodes.find(e => e.id === episodeId);
    if (episode && episode.audioUrl !== '#') {
        window.open(episode.audioUrl, '_blank');
    } else {
        alert('Audio file not available in demo. Connect your Google Drive to enable playback.');
    }
}

// Download episode (placeholder)
function downloadEpisode(episodeId) {
    const episode = episodes.find(e => e.id === episodeId);
    if (episode && episode.audioUrl !== '#') {
        const downloadBtn = document.createElement('a');
        downloadBtn.href = episode.audioUrl;
        downloadBtn.download = `${episode.number.replace(' ', '-')}-${episode.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.mp3`;
        downloadBtn.click();
    } else {
        alert('Audio file not available in demo. Connect your Google Drive to enable downloads.');
    }
}

// Show loading state
function showLoading() {
    const episodesList = document.getElementById('episodesList');
    episodesList.innerHTML = `
        <div class="loading">
            <i class="fas fa-spinner fa-spin"></i>
            <p>Loading episodes from Google Drive...</p>
        </div>
    `;
}

// Show error state
function showError(message) {
    const episodesList = document.getElementById('episodesList');
    episodesList.innerHTML = `
        <div class="error-state">
            <i class="fas fa-exclamation-triangle"></i>
            <h3>Connection Error</h3>
            <p>${message}</p>
            <button onclick="loadEpisodes()" class="retry-btn">Try Again</button>
        </div>
    `;
}

// Google Drive API integration (for production use)
async function fetchGoogleDriveFiles() {
    const url = `https://www.googleapis.com/drive/v3/files?q='${GOOGLE_DRIVE_FOLDER_ID}'+in+parents&key=${GOOGLE_DRIVE_API_KEY}&fields=files(id,name,mimeType,createdTime,webContentLink)`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        return parseDriveFiles(data.files);
    } catch (error) {
        console.error('Google Drive API error:', error);
        throw error;
    }
}

// Parse Google Drive files into episode format
function parseDriveFiles(files) {
    const episodes = [];
    const audioFiles = files.filter(file => file.mimeType.includes('audio'));
    const transcriptFiles = files.filter(file => file.name.includes('.txt') || file.name.includes('.md'));
    
    audioFiles.forEach((audioFile, index) => {
        const episode = parseEpisodeFromFilename(audioFile.name);
        episode.id = index + 1;
        episode.audioUrl = audioFile.webContentLink;
        episode.date = audioFile.createdTime;
        
        // Find matching transcript
        const transcriptFile = transcriptFiles.find(file => 
            file.name.includes(audioFile.name.replace(/\.(mp3|m4a|wav)$/i, ''))
        );
        
        if (transcriptFile) {
            episode.transcriptUrl = transcriptFile.webContentLink;
            // In production, you would fetch the transcript content
            episode.transcript = 'Transcript loading...';
        }
        
        episodes.push(episode);
    });
    
    return episodes;
}

// Parse episode metadata from filename
function parseEpisodeFromFilename(filename) {
    // Expected format: "Episode-01-[SCIENCE]-Pizza-Dough-Digestibility.mp3"
    const parts = filename.replace(/\.(mp3|m4a|wav)$/i, '').split('-');
    
    let episode = {
        number: 'Episode Unknown',
        title: filename.replace(/\.(mp3|m4a|wav)$/i, ''),
        category: 'science', // default
        description: 'No description available',
        duration: '30 min', // default
        transcript: 'No transcript available'
    };
    
    if (parts.length >= 2) {
        episode.number = `Episode ${parts[1].padStart(2, '0')}`;
    }
    
    // Find category in brackets
    const categoryMatch = filename.match(/\[(.*?)\]/);
    if (categoryMatch) {
        const category = categoryMatch[1].toLowerCase();
        if (['science', 'foodchain', 'meta'].includes(category)) {
            episode.category = category;
        }
    }
    
    // Extract title (everything after episode number and category)
    if (parts.length > 3) {
        const titleParts = parts.slice(3);
        episode.title = titleParts.join('-').replace(/-/g, ' ');
    }
    
    return episode;
}

// Export for potential use
window.podcastApp = {
    loadEpisodes,
    filterEpisodes,
    searchEpisodes,
    openEpisode,
    closeModal
};