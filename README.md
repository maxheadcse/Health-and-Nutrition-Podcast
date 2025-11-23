# Food Science Podcast Website

A beautiful, mobile-responsive podcast website that automatically pulls episodes from your Google Drive. Perfect for hosting your health and nutrition journey content with minimal technical setup.

## 🚀 Quick Start

1. **Upload the website files** to any free hosting service (GitHub Pages, Netlify, Vercel)
2. **Configure Google Drive** (see setup below)
3. **Start uploading episodes** - they'll appear automatically!

## 📁 File Structure

```
├── index.html          # Main website
├── styles.css          # Responsive styling
├── script.js           # Google Drive integration & functionality
└── README.md           # This setup guide
```

## 🔧 Google Drive Setup

### Step 1: Create Google Drive API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable "Google Drive API" 
4. Create credentials → API Key
5. **Important**: Restrict your API key to your domain for security

### Step 2: Share Your Drive Folder
1. Create a folder in Google Drive (e.g., "Podcast Episodes")
2. Set folder sharing to "Anyone with link can view"
3. Copy the folder ID from the URL:
   - URL: `https://drive.google.com/drive/folders/YOUR_FOLDER_ID_HERE`
   - Copy: `YOUR_FOLDER_ID_HERE`

### Step 3: Update the Configuration
Edit `script.js` and replace:
```javascript
const GOOGLE_DRIVE_FOLDER_ID = 'YOUR_FOLDER_ID_HERE'; // ← Replace with your folder ID
const GOOGLE_DRIVE_API_KEY = 'YOUR_API_KEY_HERE';     // ← Replace with your API key
```

## 📱 Episode File Naming

Name your files with this format to automatically categorize:

```
Episode-01-[SCIENCE]-Pizza-Dough-Digestibility.mp3
Episode-01-[SCIENCE]-Pizza-Dough-Digestibility.txt
Episode-02-[FOODCHAIN]-Finnish-Food-Supply.mp3
Episode-02-[FOODCHAIN]-Finnish-Food-Supply.txt
Episode-03-[META]-Artificial-Ingredients-Analysis.mp3
Episode-03-[META]-Artificial-Ingredients-Analysis.txt
```

### Categories:
- **[SCIENCE]** - Food science deep dives
- **[FOODCHAIN]** - Food supply chain analysis  
- **[META]** - Research meta-analysis

## 🎤 Your Workflow

1. **Record** your 30-minute podcast episode
2. **Generate transcript** using Notebook LM
3. **Name files** with the category convention
4. **Upload both** audio and transcript files to your Google Drive folder
5. **Visit your website** - episodes appear automatically!

## 📋 Supported File Formats

- **Audio**: MP3, M4A, WAV
- **Transcripts**: TXT, MD (plain text or markdown)

## 🎨 Features

✅ **Automatic episode detection** from Google Drive  
✅ **Category filtering** (Science, Food Chain, Meta)  
✅ **Search functionality** across titles and descriptions  
✅ **Mobile-responsive design** - looks great on Android  
✅ **Audio playback** with built-in controls  
✅ **Download buttons** for offline listening  
✅ **Transcript display** in beautiful modal windows  
✅ **No database required** - everything lives in Google Drive  

## 🆓 Free Hosting Options

### GitHub Pages (Recommended)
1. Upload files to a GitHub repository
2. Go to Settings → Pages
3. Select "Deploy from a branch" → Main branch
4. Your site is live at `https://yourusername.github.io/repository-name`

### Netlify
1. Drag and drop the website folder to [netlify.com](https://app.netlify.com/drop)
2. Get a custom URL instantly
3. Optional: Connect to GitHub for automatic updates

### Vercel
1. Sign up at [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Deploy with one click

## 📱 Mobile Testing

The website is optimized for Android devices:
- Touch-friendly buttons and controls
- Responsive grid layout
- Fast loading on mobile connections
- Works great in mobile browsers

## 🔒 Security Notes

- Your Google Drive folder should be "view only" 
- API key should be restricted to your domain
- Never share your API key publicly

## 🛠️ Customization

### Colors & Styling
Edit `styles.css` to customize:
- Header gradient colors
- Category tag colors  
- Font choices
- Layout spacing

### Categories
Add new categories in:
1. `styles.css` - add new category color classes
2. `script.js` - update the `parseEpisodeFromFilename` function
3. `index.html` - add new filter buttons

### Features
All functionality is in `script.js`:
- Modify episode parsing logic
- Add new search filters
- Customize modal behavior

## 📞 Support

This is a self-hosted solution using:
- HTML5, CSS3, JavaScript (vanilla)
- Google Drive API
- No backend server required

For questions about:
- **Google Drive API**: Google Cloud documentation
- **Hosting**: Netlify/GitHub Pages support
- **File naming**: Follow the conventions above

## 🎉 Ready to Launch!

Once you've:
1. ✅ Set up Google Drive API key
2. ✅ Created and shared your Drive folder
3. ✅ Updated the configuration in `script.js`
4. ✅ Deployed to a free hosting service

You're ready to start uploading episodes and sharing your food science journey with the world!