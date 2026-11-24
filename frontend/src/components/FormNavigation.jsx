
import { ArrowUp, ShieldCheck } from 'lucide-react';

export default function FormNavigation({ loading, onSubmit }) {
  return (
    <div className="form-navigation">
      <div className="privacy-note">
        <ShieldCheck size={19} />
        <span>Your information is secure and will only be used for business onboarding.</span>
      </div>

      <button type="submit" className="submit-button" disabled={loading}>
        {loading ? 'Submitting Your Responses...' : 'Submit Questionnaire'}
        {!loading && <ArrowUp size={19} className="submit-arrow" />}
      </button>
    </div>
  );
}