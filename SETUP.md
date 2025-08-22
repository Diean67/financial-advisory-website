# Email and SMS Service Setup Guide

## Overview
This project now includes real email and SMS services for business communications. Users can request white papers and receive them via email with SMS confirmations.

## Services Implemented

### 1. Email Service (`src/services/emailService.ts`)
- **SendGrid Integration**: Professional email delivery with PDF attachments
- **HTML Email Templates**: Beautiful, responsive email designs
- **PDF White Papers**: Attached to emails for professional delivery
- **Appointment Confirmations**: Automated appointment emails

### 2. SMS Service (`src/services/smsService.ts`)
- **Twilio Integration**: Reliable SMS delivery worldwide
- **SMS Templates**: Pre-written messages for different scenarios
- **Phone Validation**: German phone number formatting
- **Confirmation Messages**: White paper and appointment confirmations

## Setup Instructions

### Step 1: Choose Email Provider
**Option A: SendGrid (Recommended)**
```bash
# Install SendGrid
npm install @sendgrid/mail

# Set environment variables
REACT_APP_EMAIL_API_KEY=your-sendgrid-api-key
REACT_APP_EMAIL_API_URL=https://api.sendgrid.com/v3
REACT_APP_FROM_EMAIL=noreply@financialfirm.de
REACT_APP_FROM_NAME=Financial Advisory Team
```

**Option B: Mailgun**
```bash
REACT_APP_EMAIL_API_KEY=your-mailgun-api-key
REACT_APP_EMAIL_API_URL=https://api.mailgun.net/v3/your-domain.com
```

### Step 2: Choose SMS Provider
**Option A: Twilio (Recommended)**
```bash
# Install Twilio
npm install twilio

# Set environment variables
REACT_APP_TWILIO_ACCOUNT_SID=your-twilio-account-sid
REACT_APP_TWILIO_AUTH_TOKEN=your-twilio-auth-token
REACT_APP_FROM_NUMBER=+49123456789
```

**Option B: Vonage (Nexmo)**
```bash
REACT_APP_SMS_API_KEY=your-vonage-api-key
REACT_APP_SMS_API_SECRET=your-vonage-api-secret
REACT_APP_SMS_API_URL=https://rest.nexmo.com
```

### Step 3: Create Environment File
Create a `.env` file in your project root:
```env
# Email Service
REACT_APP_EMAIL_API_KEY=your-email-api-key
REACT_APP_EMAIL_API_URL=https://api.sendgrid.com/v3
REACT_APP_FROM_EMAIL=noreply@financialfirm.de
REACT_APP_FROM_NAME=Financial Advisory Team

# SMS Service
REACT_APP_SMS_API_KEY=your-sms-api-key
REACT_APP_SMS_API_URL=https://api.twilio.com/2010-04-01
REACT_APP_FROM_NUMBER=+49123456789

# Twilio (if using)
REACT_APP_TWILIO_ACCOUNT_SID=your-twilio-account-sid
REACT_APP_TWILIO_AUTH_TOKEN=your-twilio-auth-token
```

### Step 4: PDF Generation (Optional)
For professional PDF white papers, consider:
- **jsPDF**: Client-side PDF generation
- **Puppeteer**: Server-side PDF generation
- **External APIs**: DocRaptor, PDFShift, etc.

## How It Works

### 1. User Submits Form
- User fills out lead form with name, email, and phone
- Form data is validated and processed

### 2. Email Service
- Creates personalized HTML email template
- Generates PDF white paper (placeholder for now)
- Sends email with PDF attachment via chosen provider
- Logs success/failure for monitoring

### 3. SMS Service
- Sends confirmation SMS to user's phone
- Uses professional templates with business branding
- Validates and formats phone numbers
- Logs delivery status

### 4. User Experience
- User receives professional email with PDF white paper
- User gets SMS confirmation with next steps
- Backup download option available on website
- Clear call-to-action for booking consultations

## Testing

### Test Email Service
```typescript
import emailService from '@/services/emailService';

// Test connection
const isConnected = await emailService.testConnection();
console.log('Email service connected:', isConnected);

// Test sending
const success = await emailService.sendWhitePaperEmail({
  to: 'test@example.com',
  firstName: 'Test',
  email: 'test@example.com',
  phone: '+49123456789'
});
```

### Test SMS Service
```typescript
import smsService from '@/services/smsService';

// Test connection
const isConnected = await smsService.testConnection();
console.log('SMS service connected:', isConnected);

// Test sending
const success = await smsService.sendWhitePaperConfirmation({
  to: '+49123456789',
  firstName: 'Test',
  message: 'Test message'
});
```

## Production Considerations

### 1. Rate Limiting
- Implement rate limiting for form submissions
- Add CAPTCHA or similar anti-spam measures
- Monitor API usage and costs

### 2. Error Handling
- Graceful fallbacks when services fail
- User-friendly error messages
- Retry mechanisms for failed sends

### 3. Monitoring
- Log all email/SMS attempts
- Track delivery rates and failures
- Set up alerts for service issues

### 4. Compliance
- GDPR compliance for EU users
- CAN-SPAM compliance for emails
- Opt-out mechanisms
- Data retention policies

## Cost Estimates

### SendGrid (Email)
- **Free Tier**: 100 emails/day
- **Paid**: $14.95/month for 50k emails
- **White Papers**: Included in email count

### Twilio (SMS)
- **Free Trial**: $15-20 credit
- **Paid**: ~$0.0075 per SMS (Germany)
- **Monthly**: ~$50-100 for 1000 SMS

## Next Steps

1. **Choose providers** and get API keys
2. **Set up environment variables**
3. **Test services** in development
4. **Implement PDF generation** for white papers
5. **Add appointment booking** functionality
6. **Set up monitoring** and analytics
7. **Deploy to production**

## Support

For issues with specific services:
- **SendGrid**: [SendGrid Support](https://support.sendgrid.com/)
- **Twilio**: [Twilio Support](https://www.twilio.com/help)
- **Mailgun**: [Mailgun Support](https://help.mailgun.com/)

For code issues, check the console logs and service connection tests.
