
import { CheckCircle2, Building2, ShieldCheck } from 'lucide-react';

export default function Success({ submissionId }) {
  return (
    <main className="success-page">
      <div className="success-card">
        <div className="success-icon">
          <CheckCircle2 size={52} />
        </div>

        <div className="success-badge">
          <ShieldCheck size={15} />
          SUBMISSION RECEIVED
        </div>

        <h1>Thank you for sharing <span>your vision.</span></h1>

        <p>
          Your company onboarding questionnaire has been successfully submitted.
          Your information will help us understand your business and build a strategy
          aligned with your goals.
        </p>

        <div className="success-details">
          <Building2 size={20} />
          <div>
            <span>SUBMISSION REFERENCE</span>
            <strong>{submissionId}</strong>
          </div>
        </div>

        <div className="success-bottom">
          <CheckCircle2 size={17} />
          All 23 responses have been securely received.
        </div>
      </div>
    </main>
  );
}