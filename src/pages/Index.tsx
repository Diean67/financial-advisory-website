import React, { useState, useEffect, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { LeadForm } from '@/components/LeadForm';
import { TrustElements } from '@/components/TrustElements';
import FailedIntegrations from '@/components/FailedIntegrations';
import { CheckCircle, ArrowRight, FileText, Shield, TrendingUp, Mail, MessageSquare, XCircle } from 'lucide-react';
import heroProfessional from '@/assets/hero-professional.jpg';
import heroConsulting from '@/assets/hero-consulting.jpg';
import handelsblattLogo from '@/assets/Handelsblatt Flipboard Image.png';
import focusMoneyLogo from '@/assets/focusMoney.png';
import financialTimesLogo from '@/assets/Financial Times Logo.svg';

// Import HubSpot service with error handling
let hubspotService: any = null;
try {
  hubspotService = require('@/services/hubspotService').default;
} catch (error) {
  console.warn('HubSpot service not available:', error);
  // Create a mock service for development
  hubspotService = {
    sendEmail: async () => true,
    sendSMS: async () => true,
    createDeal: async () => true
  };
}

const Index = () => {
  const [showWhitePaper, setShowWhitePaper] = useState(false);
  const [leadData, setLeadData] = useState<{ firstName: string; email: string; phone: string } | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [sendStatus, setSendStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleFormSubmit = async (data: { firstName: string; email: string; phone: string }) => {
    console.log('Lead form submitted:', data);
    setIsSending(true);
    setSendStatus('sending');
    
    try {
      if (hubspotService) {
        // Use HubSpot for real business operations
        console.log('Processing white paper request via HubSpot...');
        
        // Send email with white paper via HubSpot
        const emailSuccess = await hubspotService.sendEmail({
          to: data.email,
          firstName: data.firstName,
          email: data.email,
          phone: data.phone,
          source: 'White Paper Request'
        });

        // Create contact and send SMS confirmation via HubSpot
        const smsSuccess = await hubspotService.sendSMS({
          to: data.phone,
          firstName: data.firstName,
          message: 'White paper confirmation'
        });

        // Create a deal for follow-up
        if (emailSuccess) {
          await hubspotService.createDeal(
            data.email, 
            `White Paper Request - ${data.firstName}`, 
            0
          );
        }

        if (emailSuccess && smsSuccess) {
          setSendStatus('success');
          setLeadData(data);
          setShowWhitePaper(true);
        } else {
          setSendStatus('error');
          console.error('Failed to process via HubSpot');
        }
      } else {
        // Fallback for development
        setSendStatus('success');
        setLeadData(data);
        setShowWhitePaper(true);
      }
    } catch (error) {
      console.error('Error in form submission:', error);
      setSendStatus('error');
    } finally {
      setIsSending(false);
    }
  };

  const downloadWhitePaper = () => {
    // Create a simple white paper content
    const whitePaperContent = `
Financial Planning Guide for Young Professionals

Dear ${leadData?.firstName || 'Professional'},

Thank you for requesting our comprehensive financial planning guide. Here's what you'll learn:

1. The biggest financial misconceptions young professionals make
2. 5 strategies for smart protection & wealth creation  
3. Bonus: Checklist for your financial start in 2025

Key Takeaways:
• Start retirement planning early - compound interest is your friend
• Get proper insurance coverage before you think you need it
• Invest in yourself and your skills for long-term growth
• Create an emergency fund of 3-6 months expenses
• Seek professional advice for complex financial decisions

Remember: The best time to start planning your financial future is now!

Best regards,
Financial Advisory Team
    `;

    // Create and download the file
    const blob = new Blob([whitePaperContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Financial-Planning-Guide-2025.txt';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const whitepaperBenefits = [
    "The biggest financial misconceptions young professionals make",
    "5 strategies for smart protection & wealth creation", 
    "Bonus: Checklist for your financial start in 2025"
  ];

  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Add error boundary
  if (typeof window === 'undefined') {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-gradient-to-r from-accent to-primary transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 bg-primary/90"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-20 h-20 bg-accent/20 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-accent/30 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-accent/25 rounded-full animate-bounce" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 right-1/3 w-8 h-8 bg-accent/20 rounded-full animate-pulse"></div>
        </div>

        <div className="relative container mx-auto px-4 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="text-center lg:text-left animate-fade-in-up group">
              <h1 className="font-heading text-4xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight transition-all duration-300 group-hover:scale-105">
                80% of career starters make these financial mistakes –{' '}
                <span className="text-accent relative">
                  are you one of them?
                  <div className="absolute -bottom-2 left-0 w-0 h-1 bg-accent transition-all duration-500 group-hover:w-full"></div>
                </span>
              </h1>
              <p className="text-xl text-primary-foreground/90 mb-8 leading-relaxed transition-all duration-300 group-hover:text-accent/80">
                Get our free white paper and learn how to get retirement planning, 
                insurance, and wealth creation right from the start.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  variant="cta" 
                  size="lg" 
                  className="text-lg px-8 py-4 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-accent/50"
                  onClick={() => document.getElementById('lead-form-section')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <span className="relative overflow-hidden">
                    <span className="block transition-transform duration-300 group-hover:-translate-y-full">Get the white paper now</span>
                    <span className="absolute inset-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0">🚀 Launch Now!</span>
                  </span>
                  <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  Learn more
                </Button>
              </div>
            </div>

            {/* Right Column - Hero Images */}
            <div className="relative animate-scale-in group">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative overflow-hidden rounded-lg shadow-strong transform transition-all duration-500 hover:scale-105 hover:shadow-2xl group-hover:rotate-1">
                    <img 
                      src={heroProfessional} 
                      alt="Young professional reviewing financial documents"
                      className="w-full transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
                <div className="pt-8 space-y-4">
                  <div className="relative overflow-hidden rounded-lg shadow-strong transform transition-all duration-500 hover:scale-105 hover:shadow-2xl group-hover:-rotate-1">
                    <img 
                      src={heroConsulting} 
                      alt="Financial consulting session"
                      className="w-full transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-accent/20 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-accent/30 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Statistics Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-purple-50 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="relative container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">
              Trusted by <span className="text-accent">Thousands</span> of Professionals
            </h2>
            <p className="text-xl text-muted-foreground">
              Real results from real people who transformed their financial future
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: 15000, label: 'Happy Clients', icon: '👥', color: 'from-blue-500 to-blue-600' },
              { number: 95, label: 'Success Rate %', icon: '📈', color: 'from-green-500 to-green-600' },
              { number: 500, label: 'Million € Saved', icon: '💰', color: 'from-yellow-500 to-yellow-600' },
              { number: 8, label: 'Years Experience', icon: '🏆', color: 'from-purple-500 to-purple-600' }
            ].map((stat, index) => (
              <div key={index} className="group text-center transform hover:scale-110 transition-all duration-300">
                <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center text-3xl shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors duration-300">
                  {stat.number.toLocaleString()}+
                </div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Form Section */}
      <section id="lead-form-section" className="py-16 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {!showWhitePaper ? (
              <>
                <div className="text-center mb-8">
                  <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                    Get Your Free Financial Planning Guide
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    Join thousands who have already secured their financial future
                  </p>
                </div>
                <LeadForm 
                  onSubmit={handleFormSubmit} 
                  isSending={isSending}
                  sendStatus={sendStatus}
                />
              </>
            ) : (
              <div className="text-center">
                <div className="mb-8">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
                  <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                    Thank you, {leadData?.firstName}!
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    Your white paper has been sent to your email and you'll receive an SMS confirmation shortly.
                  </p>
                  
                  {/* Email and SMS Status */}
                  <div className="grid md:grid-cols-2 gap-4 max-w-md mx-auto mb-6">
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <Mail className="w-5 h-5 text-green-600" />
                      <div className="text-left">
                        <p className="font-medium text-green-800">Email Sent</p>
                        <p className="text-sm text-green-600">Check your inbox</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <MessageSquare className="w-5 h-5 text-blue-600" />
                      <div className="text-left">
                        <p className="font-medium text-blue-800">SMS Sent</p>
                        <p className="text-sm text-blue-600">Check your phone</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Button 
                    variant="cta" 
                    size="lg" 
                    className="text-lg px-8 py-4"
                    onClick={downloadWhitePaper}
                  >
                    <FileText className="mr-2" />
                    Download Backup Copy
                  </Button>
                  <div>
                    <Button 
                      variant="outline" 
                      onClick={() => setShowWhitePaper(false)}
                    >
                      Request Another Copy
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Problem → Solution Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-heading text-3xl font-bold text-foreground mb-6">
                  The Problem
                </h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Many people start their careers unprepared – and pay dearly for it later. 
                  Without proper financial planning, young professionals often make costly 
                  mistakes that compound over decades.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center text-muted-foreground">
                    <XCircle className="w-5 h-5 text-destructive mr-3" />
                    <span>Inadequate retirement savings</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <XCircle className="w-5 h-5 text-destructive mr-3" />
                    <span>Wrong insurance choices</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <XCircle className="w-5 h-5 text-destructive mr-3" />
                    <span>Missed investment opportunities</span>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="font-heading text-3xl font-bold text-foreground mb-6">
                  The Solution
                </h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  With the right steps, you can secure financial freedom right from the start. 
                  Our white paper shows you the 5 most important strategies for a successful beginning.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center text-foreground">
                    <CheckCircle className="w-5 h-5 text-success mr-3" />
                    <span>Evidence-based strategies</span>
                  </div>
                  <div className="flex items-center text-foreground">
                    <CheckCircle className="w-5 h-5 text-success mr-3" />
                    <span>Actionable steps</span>
                  </div>
                  <div className="flex items-center text-foreground">
                    <CheckCircle className="w-5 h-5 text-success mr-3" />
                    <span>Personalized approach</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Features Showcase */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-200/30 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-200/30 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
        </div>
        
        <div className="relative container mx-auto px-4">
          <div className="text-center mb-16">
            <FileText className="w-20 h-20 text-accent mx-auto mb-6 animate-float" />
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">
              What's Inside Your <span className="text-accent">White Paper?</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Your comprehensive guide to financial success as a young professional
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: '🚨',
                title: 'Financial Misconceptions',
                description: 'The biggest financial mistakes young professionals make and how to avoid them',
                color: 'from-red-500 to-pink-500',
                delay: '0s'
              },
              {
                icon: '🛡️',
                title: 'Smart Protection Strategies',
                description: '5 proven strategies for insurance and wealth protection from day one',
                color: 'from-blue-500 to-cyan-500',
                delay: '0.2s'
              },
              {
                icon: '📋',
                title: 'Action Checklist',
                description: 'Bonus: Complete checklist for your financial start in 2025',
                color: 'from-green-500 to-emerald-500',
                delay: '0.4s'
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="group transform hover:scale-105 transition-all duration-500 hover:shadow-2xl"
                style={{ animationDelay: feature.delay }}
              >
                <Card className="h-full bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-500 group-hover:bg-white overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${feature.color}`}></div>
                  <CardContent className="p-8 text-center">
                    <div className={`w-20 h-20 mx-auto mb-6 text-4xl bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110`}>
                      {feature.icon}
                    </div>
                    
                    <h3 className="font-semibold text-xl text-foreground mb-4 group-hover:text-accent transition-colors duration-300">
                      {feature.title}
                    </h3>
                    
                    <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
                      {feature.description}
                    </p>
                    
                    <div className="mt-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <div className="w-16 h-1 bg-gradient-to-r from-accent to-primary mx-auto rounded-full"></div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Button 
              variant="cta" 
              size="lg" 
              className="text-lg px-8 py-4 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
              onClick={() => document.getElementById('lead-form-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get Your Free White Paper Now
              <ArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Interactive Testimonials Carousel */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-gray-100 relative overflow-hidden">
        {/* Floating Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-32 h-32 bg-accent/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-24 h-24 bg-primary/10 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="relative container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">
              What Our <span className="text-accent">Clients Say</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Real stories from real people who transformed their financial future
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: 'Sarah Müller',
                role: 'Software Engineer, 28',
                image: '👩‍💻',
                quote: 'The white paper completely changed my approach to retirement planning. I started investing at 25 and now I\'m on track for early retirement!',
                rating: 5,
                company: 'TechCorp GmbH'
              },
              {
                name: 'Michael Weber',
                role: 'Marketing Manager, 31',
                image: '👨‍💼',
                quote: 'I was making all the wrong insurance choices. This guide saved me €2,000 annually and gave me peace of mind.',
                rating: 5,
                company: 'Marketing Solutions AG'
              },
              {
                name: 'Lisa Schmidt',
                role: 'Doctor, 29',
                image: '👩‍⚕️',
                quote: 'As a doctor, I had no time to learn about finances. This white paper gave me a clear roadmap in just 30 minutes.',
                rating: 5,
                company: 'City Hospital Berlin'
              }
            ].map((testimonial, index) => (
              <div key={index} className="group transform hover:scale-105 transition-all duration-500 hover:shadow-2xl">
                <Card className="h-full bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:bg-white">
                  <CardContent className="p-8 text-center">
                    <div className="w-20 h-20 mx-auto mb-6 text-4xl bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                      {testimonial.image}
                    </div>
                    
                    <div className="flex justify-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-xl">⭐</span>
                      ))}
                    </div>
                    
                    <blockquote className="text-lg text-muted-foreground mb-6 italic leading-relaxed group-hover:text-foreground transition-colors duration-300">
                      "{testimonial.quote}"
                    </blockquote>
                    
                    <div className="border-t pt-4">
                      <div className="font-semibold text-foreground text-lg">{testimonial.name}</div>
                      <div className="text-muted-foreground">{testimonial.role}</div>
                      <div className="text-sm text-accent font-medium">{testimonial.company}</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Elements Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                Why Trust Us?
              </h2>
              <p className="text-lg text-muted-foreground">
                We've helped thousands of young professionals secure their financial future
              </p>
            </div>
            
            {/* Media Recognition */}
            <div className="mb-16">
              <div className="text-center mb-8">
                <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                  Featured In
                </h3>
                <p className="text-muted-foreground">
                  Recognized by leading financial publications worldwide
                </p>
              </div>
              
              <div className="flex justify-center items-center space-x-16 md:space-x-24">
                {/* Handelsblatt */}
                <a 
                  href="https://www.handelsblatt.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group transform hover:scale-110 transition-all duration-300 cursor-pointer"
                >
                  <img 
                    src={handelsblattLogo} 
                    alt="Handelsblatt Logo" 
                    className="h-12 md:h-16 object-contain filter hover:brightness-110 transition-all duration-300"
                  />
                </a>
                
                {/* Financial Times */}
                <a 
                  href="https://www.ft.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group transform hover:scale-110 transition-all duration-300 cursor-pointer"
                >
                  <img 
                    src={financialTimesLogo} 
                    alt="Financial Times Logo" 
                    className="h-12 md:h-16 object-contain filter hover:brightness-110 transition-all duration-300"
                />
                </a>
                
                {/* Focus Money */}
                <a 
                  href="https://www.focus.de/finanzen" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group transform hover:scale-110 transition-all duration-300 cursor-pointer"
                >
                  <img 
                    src={focusMoneyLogo} 
                    alt="Focus Money Logo" 
                    className="h-12 md:h-16 object-contain filter hover:brightness-110 transition-all duration-300"
                  />
                </a>
              </div>
            </div>
            
            <TrustElements />
          </div>
        </div>
      </section>

      {/* Failed Integrations Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <FailedIntegrations />
          </div>
        </div>
      </section>

      {/* Interactive FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-slate-100 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-blue-200/30 to-purple-200/30 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="relative container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">
              Frequently Asked <span className="text-accent">Questions</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to know about our financial planning approach
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                question: 'Is the white paper really free?',
                answer: 'Yes, absolutely! Our white paper is completely free with no hidden costs. We believe financial education should be accessible to everyone starting their career.',
                icon: '🎯'
              },
              {
                question: 'How long does it take to read?',
                answer: 'The white paper is designed to be read in 30-45 minutes. It\'s structured with actionable insights you can implement immediately.',
                icon: '⏱️'
              },
              {
                question: 'Will I be contacted by sales people?',
                answer: 'No, we respect your privacy. You\'ll only receive the white paper and optional follow-up content if you choose to subscribe.',
                icon: '🔒'
              },
              {
                question: 'Is this relevant for German residents?',
                answer: 'Yes! Our guide is specifically tailored for German tax laws, insurance regulations, and retirement planning systems.',
                icon: '🇩🇪'
              },
              {
                question: 'Can I share this with colleagues?',
                answer: 'Absolutely! We encourage sharing knowledge. The more people who make smart financial decisions, the better for everyone.',
                icon: '🤝'
              }
            ].map((faq, index) => (
              <div key={index} className="group">
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:bg-white transform hover:scale-[1.02]">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="text-2xl group-hover:scale-110 transition-transform duration-300">
                        {faq.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-foreground mb-2 group-hover:text-accent transition-colors duration-300">
                          {faq.question}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-primary relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/10 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-heading text-3xl font-bold text-primary-foreground mb-4">
              Don't Make the Same Mistakes 80% of Young Professionals Do
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Get your free white paper today and start building your financial future the right way.
            </p>
            <Button 
              variant="cta" 
              size="lg" 
              className="text-lg px-8 py-4 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
              onClick={() => document.getElementById('lead-form-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get Your Free White Paper Now
              <ArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-16 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="relative container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="font-heading text-2xl font-bold mb-6">Financial Advisory Firm</h3>
              <p className="text-background/80 mb-6 text-lg leading-relaxed">
                Helping young professionals build wealth and secure their financial future 
                through personalized, modern financial planning.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-background/20 rounded-full flex items-center justify-center hover:bg-accent transition-all duration-300 cursor-pointer group">
                  <span className="text-background group-hover:text-white">📧</span>
                </div>
                <div className="w-10 h-10 bg-background/20 rounded-full flex items-center justify-center hover:bg-accent transition-all duration-300 cursor-pointer group">
                  <span className="text-background group-hover:text-white">📱</span>
                </div>
                <div className="w-10 h-10 bg-background/20 rounded-full flex items-center justify-center hover:bg-accent transition-all duration-300 cursor-pointer group">
                  <span className="text-background group-hover:text-white">💼</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-lg">Contact</h4>
              <div className="space-y-3 text-background/80">
                <div className="flex items-center space-x-3 hover:text-accent transition-colors duration-300 cursor-pointer group">
                  <span className="text-lg">📞</span>
                  <p>+49 XXX XXX XXXX</p>
                </div>
                <div className="flex items-center space-x-3 hover:text-accent transition-colors duration-300 cursor-pointer group">
                  <span className="text-lg">📧</span>
                  <p>info@financialfirm.de</p>
                </div>
                <div className="flex items-center space-x-3 hover:text-accent transition-colors duration-300 cursor-pointer group">
                  <span className="text-lg">📍</span>
                  <p>Berlin, Germany</p>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-lg">Legal</h4>
              <div className="space-y-3 text-sm text-background/80">
                <a href="#" className="hover:text-accent transition-colors duration-300 block hover:translate-x-1 transform">Legal Notice</a>
                <a href="#" className="hover:text-accent transition-colors duration-300 block hover:translate-x-1 transform">Privacy Policy</a>
                <a href="#" className="hover:text-accent transition-colors duration-300 block hover:translate-x-1 transform">Terms of Service</a>
              </div>
            </div>
          </div>
          <Separator className="my-12 bg-background/20" />
          <div className="text-center text-background/80">
            <p className="text-lg">&copy; 2024 Financial Advisory Firm. All rights reserved.</p>
            <p className="text-sm mt-2">Built with ❤️ for your financial future</p>
          </div>
        </div>
      </footer>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <Button 
          variant="cta" 
          size="lg" 
          className="rounded-full w-16 h-16 shadow-2xl hover:shadow-accent/50 transform hover:scale-110 transition-all duration-300 animate-float"
          onClick={() => document.getElementById('lead-form-section')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <FileText className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
};

export default Index;