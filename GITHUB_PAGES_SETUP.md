# 🚀 GitHub Pages Setup Guide for HubSpot Integration

## 📋 Overview
This guide will help you deploy your financial advisory website to GitHub Pages, giving you a free temporary domain to use with HubSpot setup.

## ✅ Prerequisites
- ✅ GitHub account (you already have this!)
- ✅ Your project code ready
- ✅ Node.js installed locally

## 🔧 Step 1: Prepare Your Local Project

### 1.1 Build Your Project Locally
```bash
# Make sure you're in your project directory
cd financial-future-leap-main

# Install dependencies (if not already done)
npm install

# Test build locally
npm run build
```

### 1.2 Verify Build Output
- Check that `dist/` folder was created
- Ensure all files are present in the build output

## 📁 Step 2: Create GitHub Repository

### 2.1 Create New Repository
1. Go to [GitHub.com](https://github.com) and sign in
2. Click **"New repository"** (green button)
3. Repository name: `financial-advisory-website` (or your preferred name)
4. Description: `Professional financial advisory landing page with HubSpot integration`
5. Make it **Public** (required for free GitHub Pages)
6. **Don't** initialize with README, .gitignore, or license
7. Click **"Create repository"**

### 2.2 Repository Settings
1. Go to **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: **gh-pages** (we'll create this with GitHub Actions)
4. Click **Save**

## 🔄 Step 3: Push Your Code to GitHub

### 3.1 Initialize Git and Push
```bash
# Initialize git repository
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: Financial advisory website with HubSpot integration"

# Add remote origin
git remote add origin https://github.com/YOUR_USERNAME/financial-advisory-website.git

# Push to main branch
git push -u origin main
```

### 3.2 Verify Files Uploaded
- Check your GitHub repository
- Ensure all project files are visible
- Verify the `.github/workflows/deploy.yml` file is present

## 🚀 Step 4: Deploy with GitHub Actions

### 4.1 Automatic Deployment
- The GitHub Actions workflow will automatically trigger
- Go to **Actions** tab in your repository
- Watch the deployment process
- Wait for the green checkmark ✅

### 4.2 Manual Trigger (if needed)
```bash
# Make a small change and push
echo "# Updated" >> README.md
git add README.md
git commit -m "Trigger deployment"
git push
```

## 🌐 Step 5: Access Your Live Website

### 5.1 Get Your GitHub Pages URL
- Go to **Settings** → **Pages**
- Your site will be available at:
  ```
  https://YOUR_USERNAME.github.io/financial-advisory-website/
  ```

### 5.2 Test Your Website
- Visit the URL in your browser
- Test the white paper form
- Verify all interactive elements work
- Check mobile responsiveness

## 🔗 Step 6: Use with HubSpot

### 6.1 HubSpot Domain Setup
1. **Domain**: Use your GitHub Pages URL
   ```
   https://YOUR_USERNAME.github.io/financial-advisory-website/
   ```
2. **Verify domain** in HubSpot
3. **Set up email templates** with this domain
4. **Configure tracking** and analytics

### 6.2 Professional Appearance
- Your domain will look like: `financial-advisory-website.github.io`
- Professional enough for HubSpot setup
- Free hosting included
- Automatic HTTPS

## 🔄 Step 7: Update and Deploy

### 7.1 Make Changes
```bash
# Edit your files locally
# Test with npm run dev

# Build and deploy
git add .
git commit -m "Updated website content"
git push origin main
```

### 7.2 Automatic Updates
- GitHub Actions automatically rebuilds and deploys
- Changes appear on your live site within 2-5 minutes
- No manual deployment needed

## 🎯 Step 8: Custom Domain (Optional)

### 8.1 Add Custom Domain
1. **Buy domain** from Namecheap, GoDaddy, etc.
2. **Add CNAME record** pointing to `YOUR_USERNAME.github.io`
3. **Update GitHub Pages** with custom domain
4. **Update HubSpot** with new domain

### 8.2 Domain Migration
- Start with: `financial-advisory-website.github.io`
- Later upgrade to: `yourcompany.com`
- HubSpot automatically handles the transition

## 🚨 Troubleshooting

### Common Issues

#### Build Fails
```bash
# Check Node.js version
node --version  # Should be 16+ or 18+

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

#### Deployment Fails
- Check **Actions** tab for error messages
- Verify `.github/workflows/deploy.yml` exists
- Ensure repository is **public**
- Check GitHub Pages settings

#### Website Not Loading
- Wait 5-10 minutes after deployment
- Check **Settings** → **Pages** for status
- Verify gh-pages branch exists
- Clear browser cache

## 📱 Mobile Testing

### Test on Multiple Devices
- **Desktop**: Chrome, Firefox, Safari
- **Mobile**: iOS Safari, Android Chrome
- **Tablet**: iPad, Android tablets
- **Responsive**: Check all breakpoints

## 🔒 Security Considerations

### GitHub Pages Security
- **HTTPS**: Automatically enabled
- **Public repository**: Required for free hosting
- **No sensitive data**: Don't commit API keys
- **Environment variables**: Use for production

## 💰 Cost Breakdown

### GitHub Pages (Free)
- ✅ **Hosting**: $0/month
- ✅ **Custom domain**: $0/month
- ✅ **HTTPS**: $0/month
- ✅ **Bandwidth**: 100GB/month free

### Domain (Optional)
- **Custom domain**: $10-15/year
- **Professional email**: $5-10/month (optional)

## 🎉 Success Checklist

- [ ] Repository created on GitHub
- [ ] Code pushed to main branch
- [ ] GitHub Actions deployment successful
- [ ] Website accessible via GitHub Pages URL
- [ ] All functionality working correctly
- [ ] Ready for HubSpot integration

## 🚀 Next Steps

1. **Complete GitHub Pages setup** following this guide
2. **Test your live website** thoroughly
3. **Set up HubSpot account** using your GitHub Pages domain
4. **Configure email templates** and workflows
5. **Test HubSpot integration** with real data
6. **Launch your professional lead generation system!**

---

**Your website will be live at:**
```
https://YOUR_USERNAME.github.io/financial-advisory-website/
```

**Perfect for HubSpot setup and professional business operations!** 🎯
