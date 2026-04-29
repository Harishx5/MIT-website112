
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
  Section,
  Img,
} from 'npm:@react-email/components@0.0.22'
import * as React from 'npm:react@18.3.1'

interface VerificationEmailProps {
  supabase_url: string
  email_action_type: string
  redirect_to: string
  token_hash: string
  token: string
  user_email: string
}

export const VerificationEmail = ({
  token,
  supabase_url,
  email_action_type,
  redirect_to,
  token_hash,
  user_email,
}: VerificationEmailProps) => (
  <Html>
    <Head />
    <Preview>Thank you for choosing Marzelet Info Technology - Confirm your email to get started</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={logoSection}>
          <Img
            src="https://uogpaqssqqneedzxppzm.supabase.co/storage/v1/object/public/lovable-uploads/20bccd18-ba77-439c-bcf7-22f74f1420a3.png"
            width="60"
            height="60"
            alt="Marzelet Logo"
            style={logo}
          />
          <Heading style={companyName}>MARZELET</Heading>
        </Section>
        
        <Heading style={h1}>Thank You for Choosing Marzelet Info Technology!</Heading>
        
        <Text style={welcomeText}>
          Dear Valued Client,
        </Text>

        <Text style={text}>
          We are thrilled to welcome you to the Marzelet Info Technology family! Thank you for choosing us 
          as your trusted technology partner. Your decision to join our platform marks the beginning of an 
          exciting journey towards digital excellence.
        </Text>

        <Text style={text}>
          To complete your registration and unlock access to our comprehensive technology solutions, 
          please confirm your email address by clicking the button below:
        </Text>

        <Section style={buttonSection}>
          <Link
            href={`${supabase_url}/auth/v1/verify?token=${token_hash}&type=${email_action_type}&redirect_to=${redirect_to}`}
            style={button}
          >
            Confirm Your Email
          </Link>
        </Section>

        <Text style={text}>
          Or copy and paste this verification code if the button doesn't work:
        </Text>
        <Section style={codeSection}>
          <Text style={code}>{token}</Text>
        </Section>

        <Section style={servicesSection}>
          <Text style={servicesTitle}>What Awaits You at Marzelet:</Text>
          <Text style={servicesList}>
            🚀 <strong>Custom Software Development</strong> - Tailored solutions for your unique business needs<br/>
            📱 <strong>Mobile App Development</strong> - iOS & Android applications that engage your customers<br/>
            🌐 <strong>Web Development</strong> - Modern, responsive websites that drive results<br/>
            🎨 <strong>UI/UX Design</strong> - Beautiful, user-friendly interfaces that convert<br/>
            📊 <strong>Digital Marketing</strong> - Strategic campaigns that grow your online presence<br/>
            🤖 <strong>IoT & Embedded Solutions</strong> - Cutting-edge technology for smart innovations<br/>
            💼 <strong>Business Consulting</strong> - Expert guidance to accelerate your digital transformation
          </Text>
        </Section>

        <Section style={benefitsSection}>
          <Text style={benefitsTitle}>Why Choose Marzelet?</Text>
          <Text style={benefitsList}>
            ✓ <strong>Expert Team:</strong> Skilled professionals with years of industry experience<br/>
            ✓ <strong>Quality Assurance:</strong> Rigorous testing and quality control processes<br/>
            ✓ <strong>24/7 Support:</strong> Round-the-clock assistance when you need it most<br/>
            ✓ <strong>Competitive Pricing:</strong> Premium services at affordable rates<br/>
            ✓ <strong>On-Time Delivery:</strong> We respect your deadlines and deliver as promised<br/>
            ✓ <strong>Latest Technologies:</strong> We stay ahead with cutting-edge tools and frameworks
          </Text>
        </Section>

        <Section style={nextStepsSection}>
          <Text style={nextStepsTitle}>Next Steps:</Text>
          <Text style={nextStepsList}>
            1. <strong>Confirm your email</strong> using the button above<br/>
            2. <strong>Complete your profile</strong> to help us serve you better<br/>
            3. <strong>Explore our services</strong> and find the perfect solution for your needs<br/>
            4. <strong>Get in touch</strong> with our team to discuss your project requirements<br/>
            5. <strong>Start your digital transformation</strong> journey with Marzelet
          </Text>
        </Section>

        <Section style={contactSection}>
          <Text style={contactTitle}>Ready to Get Started?</Text>
          <Text style={contactInfo}>
            Our team is excited to hear about your project and discuss how we can help bring your vision to life.<br/><br/>
            📞 <strong>Call us:</strong> +91-9629997391<br/>
            📧 <strong>Email us:</strong> info@marzelet.info<br/>
            📍 <strong>Visit us:</strong> No.7, College Road, Opp. St. Peter's Engineering College, Avadi Chennai-54<br/>
            🌐 <strong>Website:</strong> marzelet.info
          </Text>
        </Section>

        <Text style={thankYouText}>
          Once again, thank you for choosing Marzelet Info Technology. We look forward to building 
          something amazing together and helping your business thrive in the digital world.
        </Text>

        <Text style={disclaimer}>
          If you didn't create an account with Marzelet Info Technology, you can safely ignore this email.
        </Text>

        <Text style={footer}>
          © 2025 Marzelet Info Technology. All rights reserved.<br/>
          <strong>Leading the future of technology solutions since our inception.</strong><br/>
          Empowering businesses through innovative technology and exceptional service.
        </Text>
      </Container>
    </Body>
  </Html>
)

export default VerificationEmail

const main = {
  backgroundColor: '#f8fafc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  maxWidth: '650px',
  borderRadius: '8px',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
}

const logoSection = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '30px 0 20px',
  borderBottom: '2px solid #e2e8f0',
  marginBottom: '32px',
}

const logo = {
  marginRight: '12px',
}

const companyName = {
  color: '#1e293b',
  fontSize: '28px',
  fontWeight: 'bold',
  margin: '0',
  letterSpacing: '1px',
}

const h1 = {
  color: '#1e293b',
  fontSize: '26px',
  fontWeight: 'bold',
  textAlign: 'center' as const,
  margin: '0 0 24px 0',
  padding: '0 20px',
  lineHeight: '1.3',
}

const welcomeText = {
  color: '#3b82f6',
  fontSize: '18px',
  fontWeight: '600',
  margin: '0 0 16px 0',
  padding: '0 20px',
}

const text = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '16px 0',
  padding: '0 20px',
}

const servicesSection = {
  margin: '32px 0',
  padding: '24px 20px',
  backgroundColor: '#f1f5f9',
  borderRadius: '8px',
  border: '1px solid #cbd5e1',
}

const servicesTitle = {
  color: '#1e40af',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 16px 0',
}

const servicesList = {
  color: '#1e3a8a',
  fontSize: '15px',
  lineHeight: '22px',
  margin: '0',
}

const benefitsSection = {
  margin: '32px 0',
  padding: '24px 20px',
  backgroundColor: '#ecfdf5',
  borderRadius: '8px',
  border: '1px solid #bbf7d0',
}

const benefitsTitle = {
  color: '#065f46',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 16px 0',
}

const benefitsList = {
  color: '#047857',
  fontSize: '15px',
  lineHeight: '22px',
  margin: '0',
}

const nextStepsSection = {
  margin: '32px 0',
  padding: '24px 20px',
  backgroundColor: '#fef3c7',
  borderRadius: '8px',
  border: '1px solid #fbbf24',
}

const nextStepsTitle = {
  color: '#92400e',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 16px 0',
}

const nextStepsList = {
  color: '#a16207',
  fontSize: '15px',
  lineHeight: '22px',
  margin: '0',
}

const buttonSection = {
  textAlign: 'center' as const,
  margin: '32px 0',
}

const button = {
  backgroundColor: '#3b82f6',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '14px 32px',
  margin: '0 auto',
  boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.3)',
}

const codeSection = {
  textAlign: 'center' as const,
  margin: '24px 0',
  padding: '0 20px',
}

const code = {
  backgroundColor: '#f3f4f6',
  border: '2px solid #d1d5db',
  borderRadius: '8px',
  color: '#1f2937',
  fontSize: '18px',
  fontWeight: 'bold',
  padding: '16px',
  textAlign: 'center' as const,
  letterSpacing: '3px',
  fontFamily: 'monospace',
}

const contactSection = {
  margin: '32px 0',
  padding: '24px 20px',
  backgroundColor: '#eff6ff',
  borderRadius: '8px',
  border: '1px solid #bfdbfe',
}

const contactTitle = {
  color: '#1e40af',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 16px 0',
}

const contactInfo = {
  color: '#1e3a8a',
  fontSize: '15px',
  lineHeight: '22px',
  margin: '0',
}

const thankYouText = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '32px 0',
  padding: '24px 20px',
  backgroundColor: '#f9fafb',
  borderRadius: '8px',
  fontStyle: 'italic',
  textAlign: 'center' as const,
}

const disclaimer = {
  color: '#6b7280',
  fontSize: '13px',
  lineHeight: '18px',
  margin: '32px 0 16px 0',
  padding: '0 20px',
  textAlign: 'center' as const,
}

const footer = {
  color: '#9ca3af',
  fontSize: '12px',
  lineHeight: '18px',
  textAlign: 'center' as const,
  margin: '16px 0 0 0',
  padding: '20px 20px 0',
  borderTop: '1px solid #e5e7eb',
}
