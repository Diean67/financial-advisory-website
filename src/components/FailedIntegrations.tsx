import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  AlertTriangle, 
  RefreshCw, 
  Mail, 
  CreditCard, 
  Users, 
  BarChart3, 
  MessageCircle, 
  Calendar,
  FileText,
  Share2,
  Zap,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface IntegrationStatus {
  name: string;
  status: 'success' | 'failed' | 'loading' | 'retrying';
  lastCheck: Date;
  errorMessage?: string;
  retryCount: number;
}

const FailedIntegrations: React.FC = () => {
  const [integrations, setIntegrations] = useState<IntegrationStatus[]>([
    {
      name: 'CRM System (Salesforce)',
      status: 'failed',
      lastCheck: new Date(),
      errorMessage: 'Authentication failed: Invalid API credentials',
      retryCount: 3
    },
    {
      name: 'Payment Processor (Stripe)',
      status: 'failed',
      lastCheck: new Date(),
      errorMessage: 'Webhook verification failed: Invalid signature',
      retryCount: 2
    },
    {
      name: 'Email Marketing (Mailchimp)',
      status: 'failed',
      lastCheck: new Date(),
      errorMessage: 'Rate limit exceeded: Too many requests',
      retryCount: 1
    },
    {
      name: 'Analytics (Google Analytics)',
      status: 'failed',
      lastCheck: new Date(),
      errorMessage: 'Tracking code not loading: Ad blocker detected',
      retryCount: 0
    },
    {
      name: 'Live Chat (Intercom)',
      status: 'failed',
      lastCheck: new Date(),
      errorMessage: 'Service unavailable: Maintenance mode',
      retryCount: 0
    },
    {
      name: 'Calendar Booking (Calendly)',
      status: 'failed',
      lastCheck: new Date(),
      errorMessage: 'API timeout: Request took too long',
      retryCount: 1
    },
    {
      name: 'Document Signing (DocuSign)',
      status: 'failed',
      lastCheck: new Date(),
      errorMessage: 'Authentication expired: Token refresh failed',
      retryCount: 2
    },
    {
      name: 'Social Media Integration',
      status: 'failed',
      lastCheck: new Date(),
      errorMessage: 'OAuth flow failed: User denied access',
      retryCount: 0
    }
  ]);

  const [isChecking, setIsChecking] = useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'loading':
        return <RefreshCw className="w-5 h-5 text-blue-500 animate-spin" />;
      case 'retrying':
        return <RefreshCw className="w-5 h-5 text-orange-500 animate-spin" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      success: 'bg-green-100 text-green-800 hover:bg-green-100',
      failed: 'bg-red-100 text-red-800 hover:bg-red-100',
      loading: 'bg-blue-100 text-blue-800 hover:bg-blue-100',
      retrying: 'bg-orange-100 text-orange-800 hover:bg-orange-100'
    };
    
    return (
      <Badge className={variants[status as keyof typeof variants] || 'bg-gray-100 text-gray-800'}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const retryIntegration = async (index: number) => {
    const newIntegrations = [...integrations];
    newIntegrations[index].status = 'retrying';
    newIntegrations[index].retryCount += 1;
    setIntegrations(newIntegrations);

    // Simulate retry attempt
    setTimeout(() => {
      const success = Math.random() > 0.7; // 30% success rate
      newIntegrations[index].status = success ? 'success' : 'failed';
      newIntegrations[index].lastCheck = new Date();
      if (!success) {
        newIntegrations[index].errorMessage = `Retry attempt ${newIntegrations[index].retryCount} failed`;
      }
      setIntegrations([...newIntegrations]);
    }, 2000);
  };

  const checkAllIntegrations = async () => {
    setIsChecking(true);
    
    // Simulate checking all integrations
    for (let i = 0; i < integrations.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const newIntegrations = [...integrations];
      newIntegrations[i].status = 'loading';
      setIntegrations([...newIntegrations]);
    }

    // Simulate results
    setTimeout(() => {
      const newIntegrations = integrations.map(integration => ({
        ...integration,
        status: (Math.random() > 0.3 ? 'failed' : 'success') as 'success' | 'failed',
        lastCheck: new Date()
      }));
      setIntegrations(newIntegrations);
      setIsChecking(false);
    }, 3000);
  };

  const getIntegrationIcon = (name: string) => {
    if (name.includes('CRM') || name.includes('Salesforce')) return <Users className="w-5 h-5" />;
    if (name.includes('Payment') || name.includes('Stripe')) return <CreditCard className="w-5 h-5" />;
    if (name.includes('Email') || name.includes('Mailchimp')) return <Mail className="w-5 h-5" />;
    if (name.includes('Analytics') || name.includes('Google')) return <BarChart3 className="w-5 h-5" />;
    if (name.includes('Chat') || name.includes('Intercom')) return <MessageCircle className="w-5 h-5" />;
    if (name.includes('Calendar') || name.includes('Calendly')) return <Calendar className="w-5 h-5" />;
    if (name.includes('Document') || name.includes('DocuSign')) return <FileText className="w-5 h-5" />;
    if (name.includes('Social')) return <Share2 className="w-5 h-5" />;
    return <Zap className="w-5 h-5" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          System Integration Status
        </h2>
        <p className="text-muted-foreground">
          Monitor the health of our critical business systems and integrations
        </p>
      </div>

      {/* Control Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Integration Control Panel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button 
              onClick={checkAllIntegrations} 
              disabled={isChecking}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${isChecking ? 'animate-spin' : ''}`} />
              {isChecking ? 'Checking...' : 'Check All Integrations'}
            </Button>
            <Button 
              variant="outline" 
              onClick={() => window.location.reload()}
            >
              Refresh Page
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Integration Status Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {integrations.map((integration, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getIntegrationIcon(integration.name)}
                  <div>
                    <CardTitle className="text-lg">{integration.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Last checked: {integration.lastCheck.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                {getStatusIcon(integration.status)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Status:</span>
                  {getStatusBadge(integration.status)}
                </div>
                
                {integration.status === 'failed' && (
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      {integration.errorMessage}
                    </AlertDescription>
                  </Alert>
                )}

                <div className="flex items-center justify-between text-sm">
                  <span>Retry attempts: {integration.retryCount}</span>
                  {integration.status === 'failed' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => retryIntegration(index)}
                      disabled={false}
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Retry
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Integration Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">
                {integrations.filter(i => i.status === 'success').length}
              </div>
              <div className="text-sm text-muted-foreground">Working</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">
                {integrations.filter(i => i.status === 'failed').length}
              </div>
              <div className="text-sm text-muted-foreground">Failed</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {integrations.filter(i => i.status === 'loading' || i.status === 'retrying').length}
              </div>
              <div className="text-sm text-muted-foreground">In Progress</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-600">
                {integrations.length}
              </div>
              <div className="text-sm text-muted-foreground">Total</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FailedIntegrations;
