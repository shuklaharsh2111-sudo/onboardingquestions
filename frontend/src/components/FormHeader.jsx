
import { Building2, Sparkles, ShieldCheck } from 'lucide-react';

export default function FormHeader({ progress }) {
  return (
    <header className="form-header">
      <div className="brand-logo">
        <div className="logo-icon"><Building2 size={23} /></div>
        <span>COMPANY<span className="brand-highlight">ONBOARDING</span></span>
      </div>

      <div className="header-badge">
        <ShieldCheck size={15} />
        Confidential Information
      </div>

      <div className="hero-content">
        <div className="eyebrow"><Sparkles size={15} /> LET'S GET TO KNOW YOUR BUSINESS</div>
        <h1>Let's build something <span>remarkable.</span></h1>
        <p>Help us understand your company, your vision, and your goals. Your answers will help us create a strategy that truly represents your brand.</p>
      </div>

      <div className="progress-wrapper">
        <div className="progress-info">
          <span>YOUR ONBOARDING PROGRESS</span>
          <strong>{progress}%</strong>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </header>
  );
}