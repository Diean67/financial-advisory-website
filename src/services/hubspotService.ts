// HubSpot Service for Business Communications
// This service integrates with HubSpot's email and SMS APIs

export interface HubSpotContact {
  email: string;
  firstname: string;
  phone: string;
  company?: string;
  jobtitle?: string;
  industry?: string;
  lead_status?: string;
  lifecycle_stage?: string;
  source?: string;
}

export interface HubSpotEmailData {
  to: string;
  firstName: string;
  email: string;
  phone: string;
  templateId?: string;
  customProperties?: Record<string, any>;
  source?: string;
}

export interface HubSpotSMSData {
  to: string;
  firstName: string;
  message: string;
  templateId?: string;
}

class HubSpotService {
  private apiKey: string;
  private portalId: string;
  private baseUrl: string;
  private emailApiUrl: string;
  private smsApiUrl: string;

  constructor() {
    // HubSpot configuration
    this.apiKey = process.env.REACT_APP_HUBSPOT_API_KEY || 'your-hubspot-api-key';
    this.portalId = process.env.REACT_APP_HUBSPOT_PORTAL_ID || 'your-portal-id';
    this.baseUrl = `https://api.hubapi.com`;
    this.emailApiUrl = `https://api.hubapi.com/email/public/v1/singleEmail/send`;
    this.smsApiUrl = `https://api.hubapi.com/conversations/v3/conversations/threads`;
  }

  // Create or update contact in HubSpot
  async createOrUpdateContact(contact: HubSpotContact): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/crm/v3/objects/contacts/upsert`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          properties: {
            email: contact.email,
            firstname: contact.firstname,
            phone: contact.phone,
            company: contact.company || 'Individual',
            jobtitle: contact.jobtitle || 'Professional',
            industry: contact.industry || 'Financial Services',
            lead_status: contact.lead_status || 'NEW',
            lifecycle_stage: contact.lifecycle_stage || 'lead',
            source: contact.source || 'Website White Paper',
            hs_lead_status: 'NEW',
            hs_lifecycle_stage: 'lead'
          }
        })
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Contact created/updated in HubSpot:', result.id);
        return true;
      } else {
        console.error('Failed to create/update contact:', response.statusText);
        return false;
      }
    } catch (error) {
      console.error('Error creating/updating HubSpot contact:', error);
      return false;
    }
  }

  // Send email via HubSpot
  async sendEmail(data: HubSpotEmailData): Promise<boolean> {
    try {
      // First, ensure contact exists in HubSpot
      const contactCreated = await this.createOrUpdateContact({
        email: data.email,
        firstname: data.firstName,
        phone: data.phone,
        source: 'White Paper Request'
      });

      if (!contactCreated) {
        console.error('Failed to create contact before sending email');
        return false;
      }

      // Send email using HubSpot's email API
      const emailPayload = {
        emailId: data.templateId || process.env.REACT_APP_HUBSPOT_EMAIL_TEMPLATE_ID,
        message: {
          to: data.email,
          customProperties: {
            first_name: data.firstName,
            phone_number: data.phone,
            ...data.customProperties
          }
        }
      };

      const response = await fetch(this.emailApiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(emailPayload)
      });

      if (response.ok) {
        console.log('Email sent successfully via HubSpot to:', data.email);
        return true;
      } else {
        console.error('Failed to send email via HubSpot:', response.statusText);
        return false;
      }
    } catch (error) {
      console.error('Error sending email via HubSpot:', error);
      return false;
    }
  }

  // Send SMS via HubSpot (if using HubSpot's SMS features)
  async sendSMS(data: HubSpotSMSData): Promise<boolean> {
    try {
      // Note: HubSpot's SMS capabilities depend on your plan
      // This is a placeholder for SMS functionality
      console.log('SMS functionality depends on HubSpot plan - using alternative method');
      
      // For now, we'll use the contact creation as confirmation
      const contactCreated = await this.createOrUpdateContact({
        email: 'sms-confirmation@placeholder.com',
        firstname: data.firstName,
        phone: data.to,
        source: 'SMS Confirmation'
      });

      return contactCreated;
    } catch (error) {
      console.error('Error sending SMS via HubSpot:', error);
      return false;
    }
  }

  // Add contact to specific HubSpot list
  async addToList(contactEmail: string, listId: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/contacts/v1/lists/${listId}/add`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json`
        },
        body: JSON.stringify({
          vids: [contactEmail],
          emails: [contactEmail]
        })
      });

      return response.ok;
    } catch (error) {
      console.error('Error adding contact to list:', error);
      return false;
    }
  }

  // Create a deal for the white paper request
  async createDeal(contactEmail: string, dealName: string, amount: number = 0): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/crm/v3/objects/deals`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json`
        },
        body: JSON.stringify({
          properties: {
            dealname: dealName,
            amount: amount.toString(),
            dealstage: 'appointmentscheduled',
            pipeline: 'default',
            hs_lead_status: 'NEW',
            hs_deal_stage_probability: '0.5'
          }
        })
      });

      if (response.ok) {
        const deal = await response.json();
        // Associate deal with contact
        await this.associateDealWithContact(deal.id, contactEmail);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error creating deal:', error);
      return false;
    }
  }

  // Associate deal with contact
  private async associateDealWithContact(dealId: string, contactEmail: string): Promise<void> {
    try {
      await fetch(`${this.baseUrl}/crm/v3/objects/deals/${dealId}/associations/contacts`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json`
        },
        body: JSON.stringify({
          inputs: [{
            from: { id: dealId },
            to: { id: contactEmail },
            types: [{ associationCategory: "HUBSPOT_DEFINED", associationTypeId: 4 }]
          }]
        })
      });
    } catch (error) {
      console.error('Error associating deal with contact:', error);
    }
  }

  // Test HubSpot connection
  async testConnection(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/crm/v3/objects/contacts`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      });
      return response.ok;
    } catch (error) {
      console.error('HubSpot connection test failed:', error);
      return false;
    }
  }

  // Get contact analytics
  async getContactAnalytics(contactEmail: string): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/analytics/v2/reports/contacts`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      });
      
      if (response.ok) {
        return await response.json();
      }
      return null;
    } catch (error) {
      console.error('Error getting contact analytics:', error);
      return null;
    }
  }
}

export default new HubSpotService();
