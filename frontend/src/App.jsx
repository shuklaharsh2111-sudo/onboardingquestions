
import { useState } from 'react';
import OnboardingForm from './pages/OnboardingForm';
import Success from './pages/Success';

export default function App() {
  const [submissionId, setSubmissionId] = useState(null);

  if (submissionId) {
    return <Success submissionId={submissionId} />;
  }

  return <OnboardingForm onSuccess={setSubmissionId} />;
}