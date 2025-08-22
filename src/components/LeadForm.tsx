import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';

interface LeadFormProps {
  onSubmit?: (data: { firstName: string; email: string; phone: string }) => void;
  className?: string;
  isSending?: boolean;
  sendStatus?: 'idle' | 'sending' | 'success' | 'error';
}

export const LeadForm: React.FC<LeadFormProps> = ({ onSubmit, className = "", isSending = false, sendStatus = 'idle' }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (onSubmit) {
      onSubmit(formData);
    }
    
    console.log('Form submitted:', formData);
    setIsSubmitting(false);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className={`shadow-medium bg-background border-border ${className}`}>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-foreground font-medium">
              First Name*
            </Label>
            <Input
              id="firstName"
              type="text"
              value={formData.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              required
              className="border-input focus:ring-primary"
              placeholder="Enter your first name"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground font-medium">
              Email Address*
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              required
              className="border-input focus:ring-primary"
              placeholder="your@email.com"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-foreground font-medium">
              Mobile Number*
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              required
              className="border-input focus:ring-primary"
              placeholder="+49 XXX XXX XXXX"
            />
          </div>
          
          <p className="text-sm text-muted-foreground">
            Your data is secure. We only use your number for verification purposes.
          </p>
          
          <Button 
            type="submit" 
            variant="cta" 
            size="lg" 
            className="w-full"
            disabled={isSubmitting || isSending}
          >
            {isSubmitting || isSending ? 'Sending white paper...' : 'Get the white paper now'}
          </Button>
          
          {sendStatus === 'error' && (
            <p className="text-sm text-red-600 text-center">
              There was an issue sending your white paper. Please try again or contact us directly.
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  );
};