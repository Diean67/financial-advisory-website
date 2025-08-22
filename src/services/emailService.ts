// Email Service for Business Communications
// This service integrates with real email providers to send white papers and business emails

export interface EmailData {
  to: string;
  firstName: string;
  email: string;
  phone: string;
  whitePaperUrl?: string;
}

export interface EmailTemplate {
  subject: string;
  htmlBody: string;
  textBody: string;
}

class EmailService {
  private apiKey: string;
  private fromEmail: string;
  private fromName: string;
  private baseUrl: string;

  constructor() {
    // Configuration for email service (you can use SendGrid, Mailgun, or similar)
    this.apiKey = process.env.REACT_APP_EMAIL_API_KEY || 'your-email-api-key';
    this.fromEmail = process.env.REACT_APP_FROM_EMAIL || 'noreply@financialfirm.de';
    this.fromName = process.env.REACT_APP_FROM_NAME || 'Financial Advisory Team';
    this.baseUrl = process.env.REACT_APP_EMAIL_API_URL || 'https://api.sendgrid.com/v3';
  }

  // Send white paper email with PDF attachment
  async sendWhitePaperEmail(data: EmailData): Promise<boolean> {
    try {
      const template = this.createWhitePaperEmailTemplate(data);
      
      // For production, integrate with real email service
      const emailPayload = {
        personalizations: [{
          to: [{ email: data.to, name: data.firstName }],
          subject: template.subject
        }],
        from: { email: this.fromEmail, name: this.fromName },
        content: [
          {
            type: 'text/html',
            value: template.htmlBody
          },
          {
            type: 'text/plain',
            value: template.textBody
          }
        ],
        attachments: [
          {
            content: await this.generateWhitePaperPDF(data),
            filename: 'Financial-Planning-Guide-2025.pdf',
            type: 'application/pdf',
            disposition: 'attachment'
          }
        ]
      };

      // Send email via API
      const response = await fetch(`${this.baseUrl}/mail/send`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(emailPayload)
      });

      if (response.ok) {
        console.log('White paper email sent successfully to:', data.to);
        return true;
      } else {
        console.error('Failed to send email:', response.statusText);
        return false;
      }
    } catch (error) {
      console.error('Error sending white paper email:', error);
      return false;
    }
  }

  // Send appointment confirmation email
  async sendAppointmentEmail(data: EmailData, appointmentDetails: any): Promise<boolean> {
    try {
      const template = this.createAppointmentEmailTemplate(data, appointmentDetails);
      
      const emailPayload = {
        personalizations: [{
          to: [{ email: data.to, name: data.firstName }],
          subject: template.subject
        }],
        from: { email: this.fromEmail, name: this.fromName },
        content: [
          {
            type: 'text/html',
            value: template.htmlBody
          },
          {
            type: 'text/plain',
            value: template.textBody
          }
        ]
      };

      const response = await fetch(`${this.baseUrl}/mail/send`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(emailPayload)
      });

      return response.ok;
    } catch (error) {
      console.error('Error sending appointment email:', error);
      return false;
    }
  }

  // Create white paper email template
  private createWhitePaperEmailTemplate(data: EmailData): EmailTemplate {
    const subject = `Your Financial Planning Guide is Ready, ${data.firstName}!`;
    
    const htmlBody = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Financial Planning Guide</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; }
          .cta-button { display: inline-block; background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { background: #333; color: white; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; }
          .highlight { background: #fff3cd; padding: 15px; border-left: 4px solid #ffc107; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎯 Your Financial Planning Guide</h1>
            <p>Exclusively prepared for ${data.firstName}</p>
          </div>
          
          <div class="content">
            <h2>Dear ${data.firstName},</h2>
            
            <p>Thank you for requesting our comprehensive <strong>Financial Planning Guide for Young Professionals</strong>!</p>
            
            <div class="highlight">
              <h3>📋 What's Inside Your Guide:</h3>
              <ul>
                <li>The biggest financial misconceptions young professionals make</li>
                <li>5 strategies for smart protection & wealth creation</li>
                <li>Bonus: Checklist for your financial start in 2025</li>
              </ul>
            </div>
            
            <p>Your white paper is attached to this email as a PDF file. This comprehensive guide contains actionable strategies that can help you:</p>
            
            <ul>
              <li>✅ Start retirement planning early</li>
              <li>✅ Choose the right insurance coverage</li>
              <li>✅ Build wealth through smart investing</li>
              <li>✅ Create emergency funds</li>
              <li>✅ Avoid common financial pitfalls</li>
            </ul>
            
            <h3>🚀 Ready to Take Action?</h3>
            <p>Don't just read the guide - implement it! We're here to help you put these strategies into practice.</p>
            
            <a href="#" class="cta-button">📅 Book Free Consultation</a>
            
            <p><strong>Next Steps:</strong></p>
            <ol>
              <li>Download and read your white paper</li>
              <li>Complete the action items in the guide</li>
              <li>Book a free 30-minute consultation with our experts</li>
              <li>Start building your financial future today!</li>
            </ol>
            
            <p>If you have any questions about the content or want to discuss your personal financial situation, don't hesitate to reach out.</p>
            
            <p>Best regards,<br>
            <strong>Financial Advisory Team</strong><br>
            📧 info@financialfirm.de<br>
            📱 +49 XXX XXX XXXX</p>
          </div>
          
          <div class="footer">
            <p>© 2024 Financial Advisory Firm. All rights reserved.</p>
            <p>Berlin, Germany | <a href="#" style="color: #fff;">Privacy Policy</a> | <a href="#" style="color: #fff;">Unsubscribe</a></p>
          </div>
        </div>
      </body>
      </html>
    `;

    const textBody = `
Your Financial Planning Guide is Ready, ${data.firstName}!

Dear ${data.firstName},

Thank you for requesting our comprehensive Financial Planning Guide for Young Professionals!

What's Inside Your Guide:
- The biggest financial misconceptions young professionals make
- 5 strategies for smart protection & wealth creation  
- Bonus: Checklist for your financial start in 2025

Your white paper is attached to this email as a PDF file.

Next Steps:
1. Download and read your white paper
2. Complete the action items in the guide
3. Book a free 30-minute consultation with our experts
4. Start building your financial future today!

If you have any questions, contact us:
Email: info@financialfirm.de
Phone: +49 XXX XXX XXXX

Best regards,
Financial Advisory Team

© 2024 Financial Advisory Firm. All rights reserved.
    `;

    return { subject, htmlBody, textBody };
  }

  // Create appointment email template
  private createAppointmentEmailTemplate(data: EmailData, appointmentDetails: any): EmailTemplate {
    const subject = `Appointment Confirmed - ${appointmentDetails.date}`;
    
    const htmlBody = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Appointment Confirmation</title>
      </head>
      <body>
        <h2>Appointment Confirmed</h2>
        <p>Dear ${data.firstName},</p>
        <p>Your appointment has been confirmed for ${appointmentDetails.date} at ${appointmentDetails.time}.</p>
        <p>Location: ${appointmentDetails.location}</p>
        <p>We look forward to meeting with you!</p>
      </body>
      </html>
    `;

    const textBody = `
Appointment Confirmed

Dear ${data.firstName},

Your appointment has been confirmed for ${appointmentDetails.date} at ${appointmentDetails.time}.

Location: ${appointmentDetails.location}

We look forward to meeting with you!
    `;

    return { subject, htmlBody, textBody };
  }

  // Generate PDF white paper (placeholder - integrate with real PDF generation service)
  private async generateWhitePaperPDF(data: EmailData): Promise<string> {
    // In production, use a service like Puppeteer, jsPDF, or external PDF generation API
    // For now, return a placeholder base64 string
    return 'base64-pdf-content-placeholder';
  }

  // Test email service connection
  async testConnection(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/user/profile`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      });
      return response.ok;
    } catch (error) {
      console.error('Email service connection test failed:', error);
      return false;
    }
  }
}

export default new EmailService();
