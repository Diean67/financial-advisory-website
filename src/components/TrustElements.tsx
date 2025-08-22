import React from 'react';
import { CheckCircle, Shield, Smartphone, Users } from 'lucide-react';

export const TrustElements: React.FC = () => {
  const trustPoints = [
    {
      icon: <Users className="w-5 h-5 text-success" />,
      text: "Personal advice"
    },
    {
      icon: <Smartphone className="w-5 h-5 text-success" />,
      text: "Digital & uncomplicated"
    },
    {
      icon: <Shield className="w-5 h-5 text-success" />,
      text: "Germany's most modern financial law firm"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {trustPoints.map((point, index) => (
          <div key={index} className="flex items-center space-x-3 bg-success/5 rounded-lg p-4 border border-success/20">
            <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
            <span className="text-foreground font-medium">{point.text}</span>
          </div>
        ))}
      </div>
      
      <div className="text-center space-y-4">
        <p className="text-sm text-muted-foreground">Known from:</p>
        <div className="flex justify-center items-center space-x-8 opacity-60">
          <div className="text-sm font-medium text-muted-foreground bg-muted px-4 py-2 rounded">
            Financial Times
          </div>
          <div className="text-sm font-medium text-muted-foreground bg-muted px-4 py-2 rounded">
            Handelsblatt
          </div>
          <div className="text-sm font-medium text-muted-foreground bg-muted px-4 py-2 rounded">
            Focus Money
          </div>
        </div>
      </div>
    </div>
  );
};