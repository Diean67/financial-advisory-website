# HubSpot Integration Setup Guide

## 🚀 Overview
This guide will help you integrate HubSpot for email and SMS services, replacing the simulated services with real business functionality.

## 📋 Prerequisites
- HubSpot Professional or Enterprise account
- API access enabled
- Email templates created in HubSpot
- SMS capabilities (if needed)

## 🔑 Step 1: Get HubSpot API Credentials

### 1.1 Access HubSpot Developer Account
1. Go to [HubSpot Developer Portal](https://developers.hubspot.com/)
2. Sign in with your HubSpot account
3. Create a new app or use existing one

### 1.2 Generate API Key
1. In your HubSpot account, go to **Settings** → **Account Setup** → **Integrations** → **API Keys**
2. Click **Create API Key**
3. Give it a name (e.g., "Website Integration")
4. Copy the generated API key

### 1.3 Get Portal ID
1. In HubSpot, go to **Settings** → **Account Setup** → **Account Defaults**
2. Note your **Portal ID** (found in the URL: `https://app.hubspot.com/contacts/{PORTAL_ID}`)

## 📧 Step 2: Set Up Email Templates

### 2.1 Create White Paper Email Template
1. Go to **Marketing** → **Email** → **Templates**
2. Click **Create Template**
3. Design your white paper email with:
   - Professional header with your logo
   - Personalized greeting using `{{contact.firstname}}`
   - White paper download link
   - Call-to-action for consultation
   - Footer with contact information

### 2.2 Get Template ID
1. After creating template, click **Settings**
2. Note the **Template ID** from the URL

## 📱 Step 3: Configure SMS (Optional)

### 3.1 Enable SMS Features
- SMS capabilities depend on your HubSpot plan
- Contact HubSpot support to enable if needed
- Alternative: Use HubSpot's contact creation as SMS confirmation

## ⚙️ Step 4: Environment Configuration

### 4.1 Create Environment File
Create a `.env` file in your project root:

```env
# HubSpot Configuration
REACT_APP_HUBSPOT_API_KEY=your-hubspot-api-key-here
REACT_APP_HUBSPOT_PORTAL_ID=your-portal-id-here
REACT_APP_HUBSPOT_EMAIL_TEMPLATE_ID=your-email-template-id-here

# Business Information
REACT_APP_BUSINESS_NAME=Financial Advisory Firm
REACT_APP_BUSINESS_EMAIL=noreply@financialfirm.de
REACT_APP_BUSINESS_PHONE=+49 XXX XXX XXXX
```

### 4.2 Replace Placeholder Values
- `your-hubspot-api-key-here` → Your actual API key
- `your-portal-id-here` → Your actual portal ID
- `your-email-template-id-here` → Your email template ID

## 🔧 Step 5: Test Integration

### 5.1 Test Connection
```typescript
import hubspotService from '@/services/hubspotService';

// Test HubSpot connection
const isConnected = await hubspotService.testConnection();
console.log('HubSpot connected:', isConnected);
```

### 5.2 Test Contact Creation
```typescript
// Test creating a contact
const contactCreated = await hubspotService.createOrUpdateContact({
  email: 'test@example.com',
  firstname: 'Test',
  phone: '+49123456789',
  source: 'Test Integration'
});
```

## 📊 Step 6: HubSpot Workflow Setup

### 6.1 Create Contact Workflow
1. Go to **Automation** → **Workflows**
2. Create new workflow: **"White Paper Request"**
3. Trigger: Contact fills out form
4. Actions:
   - Send welcome email
   - Add to "White Paper Leads" list
   - Create deal for follow-up
   - Assign to sales team member

### 6.2 Set Up Lead Scoring
1. Configure lead scoring rules
2. Points for:
   - White paper download (+10)
   - Website visit (+5)
   - Email engagement (+3)

### 6.3 Create Follow-up Sequences
1. **Day 1**: Thank you + white paper
2. **Day 3**: Additional financial tips
3. **Day 7**: Consultation offer
4. **Day 14**: Success story case study

## 🎯 Step 7: Business Process Integration

### 7.1 Lead Management
- **New leads** automatically created in HubSpot
- **Deals** created for white paper requests
- **Contact properties** populated with form data
- **Source tracking** for marketing attribution

### 7.2 Email Marketing
- **Professional templates** with your branding
- **Personalization** using contact data
- **A/B testing** capabilities
- **Analytics** and performance tracking

### 7.3 CRM Integration
- **Contact profiles** with complete interaction history
- **Deal pipeline** management
- **Task creation** for follow-up
- **Reporting** and analytics

## 🔒 Step 8: Security & Compliance

### 8.1 GDPR Compliance
- **Data processing** agreements with HubSpot
- **Consent management** for EU users
- **Right to be forgotten** implementation
- **Data retention** policies

### 8.2 Security Measures
- **API key** stored securely in environment variables
- **HTTPS** for all communications
- **Rate limiting** to prevent abuse
- **Access controls** for team members

## 📈 Step 9: Analytics & Reporting

### 9.1 Track Key Metrics
- **Form submissions** and conversion rates
- **Email open rates** and click-through rates
- **Lead quality** and scoring
- **ROI** from white paper campaigns

### 9.2 Set Up Dashboards
1. **Marketing Performance** dashboard
2. **Lead Generation** metrics
3. **Email Campaign** analytics
4. **Sales Pipeline** overview

## 🚨 Troubleshooting

### Common Issues
1. **API Key Invalid**: Check key permissions and expiration
2. **Template Not Found**: Verify template ID and accessibility
3. **Rate Limits**: Implement proper error handling
4. **Contact Creation Failed**: Check required field validation

### Debug Steps
1. Check browser console for errors
2. Verify environment variables
3. Test API endpoints directly
4. Check HubSpot account permissions

## 💰 Cost Considerations

### HubSpot Plans
- **Professional**: $800/month (includes email marketing)
- **Enterprise**: $3,200/month (includes advanced features)
- **Additional costs**: SMS credits, premium templates

### ROI Benefits
- **Automated lead generation**
- **Professional email campaigns**
- **Advanced analytics** and reporting
- **CRM integration** for sales teams

## 🎉 Next Steps

1. **Complete setup** following this guide
2. **Test integration** with real data
3. **Train team** on HubSpot workflows
4. **Monitor performance** and optimize
5. **Scale campaigns** based on results

## 📞 Support Resources

- **HubSpot Support**: [support.hubspot.com](https://support.hubspot.com/)
- **Developer Documentation**: [developers.hubspot.com](https://developers.hubspot.com/)
- **Community Forum**: [community.hubspot.com](https://community.hubspot.com/)
- **Implementation Services**: HubSpot Solutions Partners

---

**Your website is now ready for professional business operations with HubSpot!** 🚀
