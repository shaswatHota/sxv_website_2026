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
    <div className="min-h-screen bg-[#E0E5EC] text-[#4A5568] font-sans selection:bg-slate-300 selection:text-slate-800 flex flex-col">

      {/* Custom Neumorphism Styles */}
      <style>{`
        .shadow-neu-flat {
          box-shadow: 9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px rgba(255,255,255, 0.5);
        }
        .shadow-neu-pressed {
          box-shadow: inset 6px 6px 10px 0 rgba(163,177,198, 0.7), inset -6px -6px 10px 0 rgba(255,255,255, 0.8);
        }
        /* Map container styling */
        .map-container {
          position: relative;
          width: 100%;
        }
        .map-container iframe {
          width: 100% !important;
          height: 100% !important;
          min-height: 280px;
        }
        /* Ensure proper mobile rendering */
        @media (max-width: 640px) {
          .map-container {
            min-height: 280px;
          }
          .map-container iframe {
            min-height: 280px;
          }
        }
      `}</style>

      {/* Main Content Wrapper */}
      <main className="flex-grow flex flex-col items-center justify-center p-4 md:p-8">

        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2 text-[#4A5568]">
            Contact Us
          </h1>
          <p className="text-lg text-[#4A5568]/80 font-medium">
            We'd love to help you
          </p>
        </div>

        {/* The Two-Column Card */}
        <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-8 lg:gap-12">

          {/* Left Column: Contact Info */}
          <div className="w-full lg:w-5/12 flex flex-col gap-6 order-2 lg:order-1">
            <ContactUsCard className="bg-[#E0E5EC] border-none shadow-neu-flat min-h-[600px] sm:min-h-[650px] lg:h-full flex flex-col">
              <CardHeader>
                <CardTitle className="text-2xl font-bold pl-2 border-l-4 border-[#4A5568] text-[#4A5568]">
                  Get in Touch
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="flex flex-col gap-6 mb-6">
                  {/* Location */}
                  <div className="flex items-start gap-4 group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full shadow-neu-flat flex items-center justify-center text-[#4A5568] group-hover:scale-105 transition-transform duration-300">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="flex-col">
                      <span className="text-sm font-bold opacity-70 block mb-1">Visit Us</span>
                      <p className="text-sm leading-relaxed">
                        Veer Surendra Sai University of Technology,<br />
                        Siddhi Vihar, Burla, Sambalpur,<br />
                        Odisha, PIN - 768018
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-4 group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full shadow-neu-flat flex items-center justify-center text-[#4A5568] group-hover:scale-105 transition-transform duration-300">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div className="flex-col">
                      <span className="text-sm font-bold opacity-70 block mb-1">Call Us</span>
                      <p className="text-sm font-medium tracking-wide">
                        +91 9861-405-554
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-4 group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full shadow-neu-flat flex items-center justify-center text-[#4A5568] group-hover:scale-105 transition-transform duration-300">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-col">
                      <span className="text-sm font-bold opacity-70 block mb-1">Email Us</span>
                      <p className="text-sm font-medium break-all">
                        festvssut2024@gmail.com
                      </p>
                    </div>
                  </div>
                </div>

                {/* Google Map */}
                <div className="map-container flex-grow w-full rounded-2xl shadow-neu-pressed overflow-hidden min-h-[280px] sm:min-h-[320px] md:min-h-[350px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.0847!2d83.9040!3d21.4973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a21c7e1c7e1c7e1%3A0x1234567890abcdef!2sVSSUT%2C%20Burla%2C%20Sambalpur%2C%20Odisha%20768018!5e0!3m2!1sen!2sin!4v1639123456789"
                    width="100%"
                    height="100%"
                    style={{ border: 0, minHeight: '280px', display: 'block', width: '100%', height: '100%' }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="VSSUT Location Map"
                  ></iframe>
                </div>
              </CardContent>
            </ContactUsCard>
          </div>

          {/* Right Column: The Form */}
          <div className="w-full lg:w-7/12 order-1 lg:order-2">
            <ContactUsCard className="bg-[#E0E5EC] border-none shadow-neu-flat min-h-[600px] sm:min-h-[650px] lg:h-full">
              <CardContent className="p-6 md:p-8 lg:p-12">
                <form onSubmit={handleSubmit(onSubmit)} className="h-full flex flex-col justify-between">
                  <div className="flex flex-col gap-4">

                    {/* Name Input */}
                    <div className="flex flex-col gap-2 group">
                      <Label htmlFor="name" className="text-base font-bold ml-2 text-[#4A5568]">Name</Label>
                      <div className="relative">
                        <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <Input
                          type="text"
                          id="name"
                          {...register('name')}
                          className="bg-[#E0E5EC] text-[#4A5568] rounded-2xl pl-14 pr-6 py-4 shadow-neu-pressed border-none font-medium text-lg h-auto focus-visible:ring-2 focus-visible:ring-[#4A5568]/10"
                          placeholder="Your Name"
                        />
                      </div>
                      {errors.name && (
                        <span className="text-xs text-red-500 ml-2">{errors.name.message}</span>
                      )}
                    </div>

                    {/* Email Input */}
                    <div className="flex flex-col gap-2 group">
                      <Label htmlFor="email" className="text-base font-bold ml-2 text-[#4A5568]">E-mail</Label>
                      <div className="relative">
                        <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <Input
                          type="email"
                          id="email"
                          {...register('email')}
                          className="bg-[#E0E5EC] text-[#4A5568] rounded-2xl pl-14 pr-6 py-4 shadow-neu-pressed border-none font-medium text-lg h-auto focus-visible:ring-2 focus-visible:ring-[#4A5568]/10"
                          placeholder="your@email.com"
                        />
                      </div>
                      {errors.email && (
                        <span className="text-xs text-red-500 ml-2">{errors.email.message}</span>
                      )}
                    </div>

                    {/* Phone Input */}
                    <div className="flex flex-col gap-2 group">
                      <Label htmlFor="phone" className="text-base font-bold ml-2 text-[#4A5568]">Phone No. <span className="text-xs font-normal opacity-60">(Optional)</span></Label>
                      <div className="relative">
                        <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <Input
                          type="tel"
                          id="phone"
                          {...register('phone')}
                          className="bg-[#E0E5EC] text-[#4A5568] rounded-2xl pl-14 pr-6 py-4 shadow-neu-pressed border-none font-medium text-lg h-auto focus-visible:ring-2 focus-visible:ring-[#4A5568]/10"
                          placeholder="Phone Number"
                        />
                      </div>
                      {errors.phone && (
                        <span className="text-xs text-red-500 ml-2">{errors.phone.message}</span>
                      )}
                    </div>

                    {/* Query Textarea */}
                    <div className="flex flex-col gap-2 group">
                      <Label htmlFor="query" className="text-base font-bold ml-2 text-[#4A5568]">Query</Label>
                      <div className="relative">
                        <svg className="absolute left-5 top-5 w-5 h-5 text-gray-400 z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                        </svg>
                        <Textarea
                          id="query"
                          {...register('query')}
                          rows={5}
                          className="bg-[#E0E5EC] text-[#4A5568] rounded-2xl pl-14 pr-6 py-4 shadow-neu-pressed border-none resize-none font-medium text-lg min-h-[120px] focus-visible:ring-2 focus-visible:ring-[#4A5568]/10"
                          placeholder="Your Message"
                        />
                      </div>
                      {errors.query && (
                        <span className="text-xs text-red-500 ml-2">{errors.query.message}</span>
                      )}
                    </div>
                  </div>

                  {/* Status Message */}
                  {statusMessage && (
                    <Alert className={`mt-4 ${
                      submitStatus === 'success' 
                        ? 'bg-green-50 text-green-800 border-green-200' 
                        : 'bg-red-50 text-red-800 border-red-200'
                    }`}>
                      {submitStatus === 'success' ? (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      )}
                      <AlertDescription className="font-medium">
                        {statusMessage}
                      </AlertDescription>
                    </Alert>
                  )}

                  {/* Submit Button */}
                  <div className="flex justify-start mt-6">
                    <ContactUsButton
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-4 bg-[#E0E5EC] text-[#4A5568] font-bold rounded-2xl shadow-neu-flat hover:bg-[#E0E5EC] hover:text-[#2d3748] active:shadow-neu-pressed active:scale-95 border-none h-auto text-lg disabled:opacity-50"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit'}
                    </ContactUsButton>
                  </div>
                </form>
              </CardContent>
            </ContactUsCard>
          </div>

        </div>
      </main>

      
     
    </div>
  );
}