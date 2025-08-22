// SMS Service for Business Communications
// This service integrates with real SMS providers to send confirmations and notifications

export interface SMSData {
  to: string;
  firstName: string;
  message: string;
  templateId?: string;
}

export interface SMSTemplate {
  id: string;
  name: string;
  message: string;
  variables: string[];
}

class SMSService {
  private apiKey: string;
  private fromNumber: string;
  private baseUrl: string;
  private accountSid?: string;
  private authToken?: string;

  constructor() {
    // Configuration for SMS service (you can use Twilio, Vonage, or similar)
    this.apiKey = process.env.REACT_APP_SMS_API_KEY || 'your-sms-api-key';
    this.fromNumber = process.env.REACT_APP_FROM_NUMBER || '+49123456789';
    this.baseUrl = process.env.REACT_APP_SMS_API_URL || 'https://api.twilio.com/2010-04-01';
    this.accountSid = process.env.REACT_APP_TWILIO_ACCOUNT_SID;
    this.authToken = process.env.REACT_APP_TWILIO_AUTH_TOKEN;
  }

  // Send SMS confirmation for white paper request
  async sendWhitePaperConfirmation(data: SMSData): Promise<boolean> {
    try {
      const message = `Hi ${data.firstName}! Your Financial Planning Guide has been sent to your email. Check your inbox and spam folder. Need help? Call us at +49 XXX XXX XXXX. - Financial Advisory Team`;
      
      return await this.sendSMS({
        to: data.to,
        firstName: data.firstName,
        message
      });
    } catch (error) {
      console.error('Error sending white paper SMS confirmation:', error);
      return false;
    }
  }

  // Send appointment confirmation SMS
  async sendAppointmentConfirmation(data: SMSData, appointmentDetails: any): Promise<boolean> {
    try {
      const message = `Hi ${data.firstName}! Your appointment is confirmed for ${appointmentDetails.date} at ${appointmentDetails.time}. Location: ${appointmentDetails.location}. We'll send a calendar invite shortly. - Financial Advisory Team`;
      
      return await this.sendSMS({
        to: data.to,
        firstName: data.firstName,
        message
      });
    } catch (error) {
      console.error('Error sending appointment SMS confirmation:', error);
      return false;
    }
  }

  // Send appointment reminder SMS
  async sendAppointmentReminder(data: SMSData, appointmentDetails: any): Promise<boolean> {
    try {
      const message = `Hi ${data.firstName}! Reminder: Your appointment is tomorrow at ${appointmentDetails.time}. Location: ${appointmentDetails.location}. Need to reschedule? Call +49 XXX XXX XXXX. - Financial Advisory Team`;
      
      return await this.sendSMS({
        to: data.to,
        firstName: data.firstName,
        message
      });
    } catch (error) {
      console.error('Error sending appointment reminder SMS:', error);
      return false;
    }
  }

  // Send follow-up SMS after white paper download
  async sendFollowUpSMS(data: SMSData): Promise<boolean> {
    try {
      const message = `Hi ${data.firstName}! How did you find our Financial Planning Guide? Ready to discuss your financial goals? Book a free consultation: +49 XXX XXX XXXX or reply BOOK to schedule. - Financial Advisory Team`;
      
      return await this.sendSMS({
        to: data.to,
        firstName: data.firstName,
        message
      });
    } catch (error) {
      console.error('Error sending follow-up SMS:', error);
      return false;
    }
  }

  // Core SMS sending function
  private async sendSMS(data: SMSData): Promise<boolean> {
    try {
      // For Twilio integration
      if (this.accountSid && this.authToken) {
        return await this.sendViaTwilio(data);
      }
      
      // For generic SMS API
      return await this.sendViaGenericAPI(data);
    } catch (error) {
      console.error('Error in core SMS sending:', error);
      return false;
    }
  }

  // Send SMS via Twilio
  private async sendViaTwilio(data: SMSData): Promise<boolean> {
    try {
      const formData = new URLSearchParams();
      formData.append('To', data.to);
      formData.append('From', this.fromNumber);
      formData.append('Body', data.message);

      const response = await fetch(`${this.baseUrl}/Accounts/${this.accountSid}/Messages.json`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${btoa(`${this.accountSid}:${this.authToken}`)}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData
      });

      if (response.ok) {
        const result = await response.json();
        console.log('SMS sent successfully via Twilio:', result.sid);
        return true;
      } else {
        console.error('Failed to send SMS via Twilio:', response.statusText);
        return false;
      }
    } catch (error) {
      console.error('Error sending SMS via Twilio:', error);
      return false;
    }
  }

  // Send SMS via generic API
  private async sendViaGenericAPI(data: SMSData): Promise<boolean> {
    try {
      const smsPayload = {
        to: data.to,
        from: this.fromNumber,
        message: data.message,
        api_key: this.apiKey
      };

      const response = await fetch(`${this.baseUrl}/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify(smsPayload)
      });

      if (response.ok) {
        console.log('SMS sent successfully via generic API');
        return true;
      } else {
        console.error('Failed to send SMS via generic API:', response.statusText);
        return false;
      }
    } catch (error) {
      console.error('Error sending SMS via generic API:', error);
      return false;
    }
  }

  // Get SMS templates
  getSMSTemplates(): SMSTemplate[] {
    return [
      {
        id: 'white-paper-confirmation',
        name: 'White Paper Confirmation',
        message: 'Hi {firstName}! Your Financial Planning Guide has been sent to your email. Check your inbox and spam folder. Need help? Call us at +49 XXX XXX XXXX. - Financial Advisory Team',
        variables: ['firstName']
      },
      {
        id: 'appointment-confirmation',
        name: 'Appointment Confirmation',
        message: 'Hi {firstName}! Your appointment is confirmed for {date} at {time}. Location: {location}. We\'ll send a calendar invite shortly. - Financial Advisory Team',
        variables: ['firstName', 'date', 'time', 'location']
      },
      {
        id: 'appointment-reminder',
        name: 'Appointment Reminder',
        message: 'Hi {firstName}! Reminder: Your appointment is tomorrow at {time}. Location: {location}. Need to reschedule? Call +49 XXX XXX XXXX. - Financial Advisory Team',
        variables: ['firstName', 'time', 'location']
      },
      {
        id: 'follow-up',
        name: 'Follow-up Message',
        message: 'Hi {firstName}! How did you find our Financial Planning Guide? Ready to discuss your financial goals? Book a free consultation: +49 XXX XXX XXXX or reply BOOK to schedule. - Financial Advisory Team',
        variables: ['firstName']
      }
    ];
  }

  // Test SMS service connection
  async testConnection(): Promise<boolean> {
    try {
      if (this.accountSid && this.authToken) {
        // Test Twilio connection
        const response = await fetch(`${this.baseUrl}/Accounts/${this.accountSid}.json`, {
          headers: {
            'Authorization': `Basic ${btoa(`${this.accountSid}:${this.authToken}`)}`
          }
        });
        return response.ok;
      } else {
        // Test generic API connection
        const response = await fetch(`${this.baseUrl}/status`, {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`
          }
        });
        return response.ok;
      }
    } catch (error) {
      console.error('SMS service connection test failed:', error);
      return false;
    }
  }

  // Validate phone number format
  validatePhoneNumber(phone: string): boolean {
    // Basic validation for German phone numbers
    const germanPhoneRegex = /^(\+49|0)[0-9]{6,14}$/;
    return germanPhoneRegex.test(phone.replace(/\s/g, ''));
  }

  // Format phone number for international use
  formatPhoneNumber(phone: string): string {
    let formatted = phone.replace(/\s/g, '');
    
    // Convert German format to international
    if (formatted.startsWith('0')) {
      formatted = '+49' + formatted.substring(1);
    }
    
    // Ensure it starts with +
    if (!formatted.startsWith('+')) {
      formatted = '+49' + formatted;
    }
    
    return formatted;
  }
}

export default new SMSService();
