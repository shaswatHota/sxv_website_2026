'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { ContactUsButton as ContactUsButton } from '@/components/ui/contactUsButton';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ContactUsCard as ContactUsCard, CardContent, CardHeader, CardTitle } from '@/components/ui/contactUsCard';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Simple validation schema
const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().optional(),
  query: z.string().min(1, 'Message is required'),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Page() {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = (data: ContactFormData) => {
    setSubmitStatus('success');
    setStatusMessage('Thank you! Your message has been received.');
    console.log('Form data:', data);
    reset();
    
    // Clear message after 3 seconds
    setTimeout(() => {
      setSubmitStatus('idle');
      setStatusMessage('');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans selection:bg-blue-200 selection:text-blue-900 relative overflow-hidden">

      {/* Advanced Clean Styles */}
      <style>{`
        /* Festive particle animations */
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
          50% { opacity: 1; transform: scale(1) rotate(180deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(1deg); }
        }
        
        @keyframes slide-in-left {
          from { transform: translateX(-100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slide-in-right {
          from { transform: translateX(100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes fade-in-up {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes swing {
          0%, 100% { transform: rotate(-2deg); }
          50% { transform: rotate(2deg); }
        }
        
        @keyframes bulb-glow {
          0%, 100% { 
            box-shadow: 0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor;
            filter: brightness(1.1);
          }
          50% { 
            box-shadow: 0 0 15px currentColor, 0 0 30px currentColor, 0 0 45px currentColor;
            filter: brightness(1.3);
          }
        }

        /* Clean card effects */
        .clean-card {
          background: white;
          border: 1px solid #e5e7eb;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        
        .clean-input {
          background: white;
          border: 2px solid #e5e7eb;
          transition: all 0.3s ease;
        }
        
        .clean-input:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        
        /* Clean button effects */
        .clean-button {
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          color: white;
          transition: all 0.3s ease;
        }
        
        .clean-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
        }
        
        /* Castle styling - Fixed and prominent */
        .castle-fixed {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 50;
          opacity: 0.7;
          animation: float 6s ease-in-out infinite;
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
        }
        
        .castle-fixed:hover {
          opacity: 0.9;
          transform: scale(1.05);
        }
        
        /* Contact info hover effects */
        .contact-item {
          transition: all 0.3s ease;
          border-radius: 12px;
          padding: 1rem;
        }
        
        .contact-item:hover {
          background: #f8fafc;
          transform: translateX(5px);
        }
        
        /* String Lights Styling */
        .lights-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 80px;
          z-index: 10;
          pointer-events: none;
        }
        
        .lights-wire {
          position: absolute;
          top: 20px;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(107, 114, 128, 0.3), transparent);
        }
        
        .light-bulb {
          position: absolute;
          top: 20px;
          width: 18px;
          height: 24px;
          border-radius: 0 0 50% 50%;
          animation: swing 3s ease-in-out infinite, bulb-glow 2s ease-in-out infinite;
          transition: all 1s ease;
          box-shadow: 0 0 12px currentColor, 0 0 24px currentColor;
          border: 1px solid currentColor;
          background-color: #3b82f6;
          color: #3b82f6;
        }
        
        .light-bulb::before {
          content: '';
          position: absolute;
          top: -6px;
          left: 50%;
          transform: translateX(-50%);
          width: 8px;
          height: 6px;
          background: rgba(107, 114, 128, 0.4);
          border-radius: 3px;
        }
        
        .light-bulb::after {
          content: '';
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          width: 1px;
          height: 12px;
          background: rgba(107, 114, 128, 0.3);
        }
        
        /* Radial glow behind bulb */
        .light-bulb-glow {
          position: absolute;
          top: 28px;
          width: 35px;
          height: 35px;
          border-radius: 50%;
          opacity: 0.4;
          filter: blur(12px);
          pointer-events: none;
          animation: bulb-glow 2s ease-in-out infinite;
          transition: background-color 1s ease;
          background-color: #3b82f6;
        }
        
        /* Responsive animations */
        .slide-in-left { animation: slide-in-left 0.8s ease-out; }
        .slide-in-right { animation: slide-in-right 0.8s ease-out; }
        .fade-in-up { animation: fade-in-up 0.6s ease-out; }
        
        /* Clean text styling */
        .text-gradient {
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      {/* Festive String Lights */}
      <div className="lights-container">
        <div className="lights-wire"></div>
        {[...Array(20)].map((_, i) => (
          <div key={i} style={{ position: 'absolute', left: `${(i * 5) + 2.5}%` }}>
            <div
              className="light-bulb-glow"
              id={`glow-${i}`}
              style={{
                left: '-11px',
                animationDelay: `${i * 0.1}s`,
              }}
            />
            <div
              className="light-bulb"
              id={`bulb-${i}`}
              style={{
                animationDelay: `${i * 0.2}s`,
              }}
            />
          </div>
        ))}
      </div>

      <script dangerouslySetInnerHTML={{
        __html: `
          (function() {
            const colors = [
              '#7aa2f7', // Tokyo Blue - Enhanced
              '#bb9af7', // Tokyo Purple - Enhanced
              '#7dcfff', // Tokyo Cyan - Enhanced
              '#9ece6a', // Tokyo Green - Enhanced
              '#f7768e', // Tokyo Red - Enhanced
              '#e0af68', // Tokyo Yellow - Enhanced
              '#ff9e64', // Tokyo Orange - Enhanced
              '#73daca', // Teal - Added for variety
              '#ff7a93', // Pink - Added for variety
              '#ffc777', // Gold - Added for variety
            ];
            
            function getRandomColor() {
              return colors[Math.floor(Math.random() * colors.length)];
            }
            
            function changeAllBulbColors() {
              for (let i = 0; i < 20; i++) {
                const bulb = document.getElementById('bulb-' + i);
                const glow = document.getElementById('glow-' + i);
                if (bulb && glow) {
                  // Each bulb gets its own random color
                  const randomColor = getRandomColor();
                  bulb.style.backgroundColor = randomColor;
                  bulb.style.color = randomColor;
                  bulb.style.borderColor = randomColor;
                  glow.style.backgroundColor = randomColor;
                  
                  // Add extra brightness for better visibility
                  bulb.style.filter = 'brightness(1.2) saturate(1.3)';
                }
              }
            }
            
            function initializeBulbs() {
              // Wait a bit to ensure DOM is fully loaded
              setTimeout(() => {
                // Set initial random colors for all bulbs
                changeAllBulbColors();
                
                // Change all bulbs' colors every 4 seconds
                setInterval(changeAllBulbColors, 4000);
              }, 100);
            }
            
            // Initialize when DOM is ready
            if (document.readyState === 'loading') {
              document.addEventListener('DOMContentLoaded', initializeBulbs);
            } else {
              initializeBulbs();
            }
          })();
        `
      }} />

      {/* Fixed Castle in Right Corner */}
      <div className="castle-fixed">
        <img 
          src="/castle.png" 
          alt="Festival Castle" 
          className="w-24 h-24 md:w-32 md:h-32 object-contain cursor-pointer transition-transform duration-300"
        />
      </div>

      {/* Hero Section */}
      <div className="relative pt-20 pb-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center fade-in-up">
            <div className="flex items-center justify-center mb-6">
              <img 
                src="/logo.svg" 
                alt="Festival Logo" 
                className="w-16 h-16 md:w-20 md:h-20 mr-4 opacity-80"
              />
              <h1 className="text-5xl md:text-7xl font-bold text-gradient">
                Contact Us
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-gray-600 font-medium mb-2">
              Join the Festive Celebration
            </p>
            <p className="text-lg text-gray-500">
              We'd love to hear from you and help make your experience magical
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          
          {/* Contact Information Card */}
          <div className="slide-in-left">
            <div className="clean-card rounded-3xl p-8 h-full">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-blue-600 mb-2">Get in Touch</h2>
                <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
              </div>
              
              <div className="space-y-6 mb-8">
                {/* Location */}
                <div className="contact-item group">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-blue-600 mb-1">Visit Our Campus</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Veer Surendra Sai University of Technology<br />
                        Siddhi Vihar, Burla, Sambalpur<br />
                        Odisha, PIN - 768018
                      </p>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="contact-item group">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-green-600 mb-1">Call Us</h3>
                      <p className="text-xl font-semibold text-gray-800">+91 9861-405-554</p>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="contact-item group">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-purple-600 mb-1">Email Us</h3>
                      <p className="text-lg font-medium text-gray-800 break-all">festvssut2024@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="border-2 border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.0847!2d83.9040!3d21.4973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a21c7e1c7e1c7e1%3A0x1234567890abcdef!2sVSSUT%2C%20Burla%2C%20Sambalpur%2C%20Odisha%20768018!5e0!3m2!1sen!2sin!4v1639123456789"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="VSSUT Location Map"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="slide-in-right">
            <div className="clean-card rounded-3xl p-8 h-full">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-blue-600 mb-2">Send us a Message</h2>
                <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name Input */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-lg font-semibold text-gray-700 ml-2">Name</Label>
                  <div className="relative">
                    <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-500 z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <Input
                      type="text"
                      id="name"
                      {...register('name')}
                      className="clean-input text-gray-800 rounded-2xl pl-12 pr-4 py-4 text-lg h-auto focus-visible:ring-0 focus-visible:ring-offset-0"
                      placeholder="Your Name"
                    />
                  </div>
                  {errors.name && (
                    <span className="text-sm text-red-500 ml-2">{errors.name.message}</span>
                  )}
                </div>

                {/* Email Input */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-lg font-semibold text-gray-700 ml-2">Email</Label>
                  <div className="relative">
                    <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-500 z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <Input
                      type="email"
                      id="email"
                      {...register('email')}
                      className="clean-input text-gray-800 rounded-2xl pl-12 pr-4 py-4 text-lg h-auto focus-visible:ring-0 focus-visible:ring-offset-0"
                      placeholder="your@email.com"
                    />
                  </div>
                  {errors.email && (
                    <span className="text-sm text-red-500 ml-2">{errors.email.message}</span>
                  )}
                </div>

                {/* Phone Input */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-lg font-semibold text-gray-700 ml-2">
                    Phone <span className="text-sm font-normal text-gray-500">(Optional)</span>
                  </Label>
                  <div className="relative">
                    <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-500 z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <Input
                      type="tel"
                      id="phone"
                      {...register('phone')}
                      className="clean-input text-gray-800 rounded-2xl pl-12 pr-4 py-4 text-lg h-auto focus-visible:ring-0 focus-visible:ring-offset-0"
                      placeholder="Phone Number"
                    />
                  </div>
                  {errors.phone && (
                    <span className="text-sm text-red-500 ml-2">{errors.phone.message}</span>
                  )}
                </div>

                {/* Message Textarea */}
                <div className="space-y-2">
                  <Label htmlFor="query" className="text-lg font-semibold text-gray-700 ml-2">Message</Label>
                  <div className="relative">
                    <svg className="absolute left-4 top-4 w-5 h-5 text-blue-500 z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                    <Textarea
                      id="query"
                      {...register('query')}
                      rows={5}
                      className="clean-input text-gray-800 rounded-2xl pl-12 pr-4 py-4 text-lg resize-none focus-visible:ring-0 focus-visible:ring-offset-0"
                      placeholder="Tell us about your query or how we can help you..."
                    />
                  </div>
                  {errors.query && (
                    <span className="text-sm text-red-500 ml-2">{errors.query.message}</span>
                  )}
                </div>

                {/* Status Message */}
                {statusMessage && (
                  <Alert className={`rounded-2xl border-0 ${
                    submitStatus === 'success' 
                      ? 'bg-green-50 text-green-700 border border-green-200' 
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}>
                    {submitStatus === 'success' ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                    <AlertDescription className="font-medium text-lg">
                      {statusMessage}
                    </AlertDescription>
                  </Alert>
                )}

                {/* Submit Button */}
                <div className="pt-4">
                  <ContactUsButton
                    type="submit"
                    disabled={isSubmitting}
                    className="clean-button w-full py-4 font-bold rounded-2xl text-lg border-0 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Sending Message...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        Send Message
                      </div>
                    )}
                  </ContactUsButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}