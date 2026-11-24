
import { MessageSquareText } from 'lucide-react';

export default function QuestionCard({ number, question, value, onChange }) {
  return (
    <div className="question-card">
      <div className="question-number">Q{String(number).padStart(2, '0')}</div>
      <div className="question-content">
        <label htmlFor={`question-${number}`}>{question}<span className="required">*</span></label>
        <div className="answer-wrapper">
          <MessageSquareText size={18} />
          <textarea
            id={`question-${number}`}
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder="Share your thoughts and details here..."
            rows={3}
            maxLength={3000}
          />
        </div>
        <div className="answer-footer">
          <span>Be as detailed as possible to help us understand your business.</span>
          <span>{value.length}/3000</span>
        </div>
      </div>
    </div>
  );
}