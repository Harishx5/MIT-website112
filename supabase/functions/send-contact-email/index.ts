
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@4.0.0";

const resend = new Resend('re_8vAvyhEX_6HsW2v8F6GHBTdQoSubVreck');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ContactEmailRequest {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  type?: 'contact' | 'demo_request' | 'support_ticket';
  projectTitle?: string;
  category?: string;
  priority?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, company, subject, message, type = 'contact', projectTitle, category, priority }: ContactEmailRequest = await req.json();

    console.log('Processing email submission:', { name, email, subject, type });

    const isDemo = type === 'demo_request';
    const isSupportTicket = type === 'support_ticket';
    
    let emailSubject = '';
    let submissionType = '';

    if (isSupportTicket) {
      emailSubject = `New Support Ticket: ${category || subject}`;
      submissionType = `<span style="background: #ef4444; color: white; padding: 4px 12px; border-radius: 6px; font-size: 12px; font-weight: 600; letter-spacing: 0.5px;">SUPPORT TICKET</span>`;
    } else if (isDemo) {
      emailSubject = `New Live Demo Request: ${projectTitle || subject}`;
      submissionType = `<span style="background: #3b82f6; color: white; padding: 4px 12px; border-radius: 6px; font-size: 12px; font-weight: 600; letter-spacing: 0.5px;">LIVE DEMO REQUEST</span>`;
    } else {
      emailSubject = `New Contact Form Submission: ${subject}`;
      submissionType = `<span style="background: #10b981; color: white; padding: 4px 12px; border-radius: 6px; font-size: 12px; font-weight: 600; letter-spacing: 0.5px;">CONTACT SUBMISSION</span>`;
    }

    // Send email to admin
    const emailResponse = await resend.emails.send({
      from: "admin@send.marzelet.info",
      to: ["info@marzelet.info"],
      subject: emailSubject,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${emailSubject}</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f8fafc;
            }
            .container {
              background: white;
              border-radius: 8px;
              padding: 30px;
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            .header {
              background: ${isSupportTicket ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' : isDemo ? 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)' : 'linear-gradient(135deg, #10b981 0%, #059669 100%)'};
              color: white;
              padding: 20px 30px;
              margin: -30px -30px 30px -30px;
              border-radius: 8px 8px 0 0;
            }
            .header h1 {
              margin: 0;
              font-size: 24px;
              font-weight: 600;
            }
            .submission-type {
              margin-top: 10px;
            }
            .field {
              margin-bottom: 20px;
              padding-bottom: 15px;
              border-bottom: 1px solid #e5e7eb;
            }
            .field:last-child {
              border-bottom: none;
              margin-bottom: 0;
            }
            .label {
              font-weight: 600;
              color: #374151;
              display: block;
              margin-bottom: 5px;
              font-size: 14px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            .value {
              color: #1f2937;
              font-size: 16px;
              word-wrap: break-word;
            }
            .message-content {
              background: #f9fafb;
              padding: 15px;
              border-radius: 6px;
              border-left: 4px solid ${isSupportTicket ? '#ef4444' : isDemo ? '#3b82f6' : '#10b981'};
              font-style: italic;
            }
            .footer {
              margin-top: 30px;
              padding-top: 20px;
              border-top: 2px solid #e5e7eb;
              text-align: center;
              color: #6b7280;
              font-size: 14px;
            }
            .company-name {
              color: ${isSupportTicket ? '#ef4444' : isDemo ? '#3b82f6' : '#10b981'};
              font-weight: 600;
            }
            .demo-info, .support-info {
              background: ${isSupportTicket ? '#fef2f2' : '#eff6ff'};
              padding: 15px;
              border-radius: 6px;
              border-left: 4px solid ${isSupportTicket ? '#ef4444' : '#3b82f6'};
              margin-bottom: 20px;
            }
            .priority-badge {
              display: inline-block;
              padding: 4px 8px;
              border-radius: 4px;
              font-size: 12px;
              font-weight: 600;
              text-transform: uppercase;
              ${priority === 'high' ? 'background: #fef2f2; color: #dc2626;' : 
                priority === 'medium' ? 'background: #fffbeb; color: #d97706;' : 
                'background: #f0fdf4; color: #16a34a;'}
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>${isSupportTicket ? '🎫 New Support Ticket' : isDemo ? '🎯 New Live Demo Request' : '📧 New Contact Form Submission'}</h1>
              <div class="submission-type">
                ${submissionType}
              </div>
            </div>
            
            ${isSupportTicket && category ? `
            <div class="support-info">
              <div class="label">Support Category</div>
              <div class="value" style="font-weight: 600; color: #ef4444;">${category}</div>
              ${priority ? `<div style="margin-top: 10px;"><span class="priority-badge">${priority} Priority</span></div>` : ''}
            </div>
            ` : ''}
            
            ${isDemo && projectTitle ? `
            <div class="demo-info">
              <div class="label">Requested Demo For</div>
              <div class="value" style="font-weight: 600; color: #3b82f6;">${projectTitle}</div>
            </div>
            ` : ''}
            
            <div class="field">
              <span class="label">Full Name</span>
              <div class="value">${name}</div>
            </div>
            
            <div class="field">
              <span class="label">Email Address</span>
              <div class="value"><a href="mailto:${email}" style="color: ${isSupportTicket ? '#ef4444' : isDemo ? '#3b82f6' : '#10b981'}; text-decoration: none;">${email}</a></div>
            </div>
            
            ${phone ? `
            <div class="field">
              <span class="label">Phone Number</span>
              <div class="value"><a href="tel:${phone}" style="color: ${isSupportTicket ? '#ef4444' : isDemo ? '#3b82f6' : '#10b981'}; text-decoration: none;">${phone}</a></div>
            </div>
            ` : ''}
            
            ${company ? `
            <div class="field">
              <span class="label">Company</span>
              <div class="value">${company}</div>
            </div>
            ` : ''}
            
            <div class="field">
              <span class="label">Subject</span>
              <div class="value">${subject}</div>
            </div>
            
            <div class="field">
              <span class="label">${isSupportTicket ? 'Issue Details' : isDemo ? 'Additional Details' : 'Message'}</span>
              <div class="message-content">${message.replace(/\n/g, '<br>')}</div>
            </div>
            
            <div class="footer">
              <p>This ${isSupportTicket ? 'support ticket' : isDemo ? 'demo request' : 'message'} was sent from the <span class="company-name">Marzelet Info Technology</span> website ${isSupportTicket ? 'support center' : isDemo ? 'portfolio page' : 'contact form'}.</p>
              <p style="margin-top: 10px; font-size: 12px;">Please respond to this ${isSupportTicket ? 'support ticket' : 'inquiry'} as soon as possible.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log('Email sent successfully:', emailResponse);

    return new Response(JSON.stringify({ 
      success: true, 
      message: `${isSupportTicket ? 'Support ticket' : isDemo ? 'Demo request' : 'Contact form'} email sent successfully`,
      emailId: emailResponse.data?.id 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);
