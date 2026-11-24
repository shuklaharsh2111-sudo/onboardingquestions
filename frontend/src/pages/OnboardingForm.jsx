
import { useMemo, useState } from 'react';
import { Building2, UserRound, Mail, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import FormHeader from '../components/FormHeader';
import QuestionCard from '../components/QuestionCard';
import FormNavigation from '../components/FormNavigation';
import { submitOnboarding } from '../services/OnboardingApi';

const sections = [
  {
    title: 'Brand Background & Identity',
    description: 'Let us understand your company story, identity, and long-term vision.',
    questions: [
      'What is the story behind your company? Why was your company established?',
      'Is your company a standalone business or part of a larger group, organization, or parent company?',
      'Should your parent company or associated brands be mentioned in your social media communication, or should your company operate as an independent consumer-facing brand?',
      'What was the idea behind launching your company, and what gap in the market was it created to address?',
      'What does your company name represent, and is there a brand story that we should communicate?',
      'Are there long-term plans to expand your company or introduce additional products, services, or business locations?'
    ]
  },
  {
    title: 'Business Details & Offerings',
    description: 'Tell us about your business operations, offerings, and competitive advantages.',
    questions: [
      'What is the scale and capacity of your business? Do you have multiple branches, locations, departments, or service categories?',
      'What products or services does your company offer, and which customer requirements or occasions do they cater to?',
      'What are your company’s biggest USPs compared with competitors in your industry?',
      'What facilities, features, benefits, or services are included in your offerings?',
      'Do you offer different packages, pricing plans, or customized solutions based on customer requirements?'
    ]
  },
  {
    title: 'Business Goals & Priorities',
    description: 'Help us understand your immediate business objectives and growth expectations.',
    questions: [
      'What is the primary objective for your company over the next three months — brand awareness, more enquiries, sales, or customer acquisition?',
      'Which types of customers, clients, or market segments would you most like to attract?',
      'Are there particular days, months, or seasons when your business experiences lower demand and needs additional marketing support?',
      'How many qualified enquiries, leads, or sales would you ideally like to generate each month?'
    ]
  },
  {
    title: 'Customer Insights',
    description: 'Understand your customers, their expectations, and their decision-making process.',
    questions: [
      'What matters most to your customers when selecting your company — location, quality, pricing, experience, service, reputation, or something else?',
      'What are the most common questions customers ask before purchasing your products or using your services?',
      'Why do prospective customers sometimes choose a competitor instead of your company?'
    ]
  },
  {
    title: 'Content & Creative Direction',
    description: 'Define the creative direction, visual identity, and communication style of your brand.',
    questions: [
      'Can we showcase the same product, service, or business offering through different themes, concepts, and creative approaches?',
      'Can we create walkthrough videos, reels, or behind-the-scenes content showcasing your business, facilities, products, services, and customer experience?',
      'Would your management be comfortable featuring customer testimonials, clients, employees, partners, or other people associated with your business?',
      'Is there a particular visual identity or mood your company wants to establish — elegant, premium, modern, contemporary, traditional, minimal, or luxurious?',
      'What would you want a customer to remember about your company after comparing it with three competitors online?'
    ]
  }
];

const questions = sections.flatMap((section, sectionIndex) =>
  section.questions.map((question, index) => ({
    questionId: `q${sections.slice(0, sectionIndex).reduce((sum, item) => sum + item.questions.length, 0) + index + 1}`,
    section: section.title,
    question
  }))
);

const initialAnswers = Object.fromEntries(
  questions.map(question => [question.questionId, ''])
);

export default function OnboardingForm({ onSuccess }) {
  const [company, setCompany] = useState({
    companyName: '',
    contactPerson: '',
    email: ''
  });

  const [answers, setAnswers] = useState(initialAnswers);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const answeredCount = useMemo(
    () => Object.values(answers).filter(answer => answer.trim()).length,
    [answers]
  );

  const progress = Math.round((answeredCount / 23) * 100);

  const updateAnswer = (id, value) => {
    setAnswers(previous => ({
      ...previous,
      [id]: value
    }));
    setError('');
  };

  const updateCompany = e => {
    setCompany(previous => ({
      ...previous,
      [e.target.name]: e.target.value
    }));
    setError('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    if (!company.companyName.trim() || !company.contactPerson.trim() || !company.email.trim()) {
      setError('Please complete all company information fields.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(company.email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    const unanswered = questions.filter(question => !answers[question.questionId].trim());

    if (unanswered.length > 0) {
      setError(`Please complete all questions. ${unanswered.length} question(s) are still unanswered.`);
      document.getElementById(`question-${Number(unanswered[0].questionId.slice(1))}`)?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
      return;
    }

    try {
      setLoading(true);

      const payload = {
        ...company,
        answers: questions.map(question => ({
          questionId: question.questionId,
          answer: answers[question.questionId]
        }))
      };

      const response = await submitOnboarding(payload);

      setSubmitted(true);
      onSuccess(response.submissionId);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="app-container">
      <div className="form-shell">
        <FormHeader progress={progress} />

        <form onSubmit={handleSubmit} noValidate>
          {error && (
            <div className="error-message">
              <AlertCircle size={19} />
              {error}
            </div>
          )}

          <section className="company-section">
            <div className="section-topline">
              <span className="section-index">01</span>
              <span>COMPANY INFORMATION</span>
            </div>

            <h2>Let's start with the basics.</h2>
            <p className="section-description">Tell us who we will be working with.</p>

            <div className="company-grid">
              <div className="field-group">
                <label htmlFor="companyName">Company Name <span>*</span></label>
                <div className="input-wrapper">
                  <Building2 size={19} />
                  <input id="companyName" name="companyName" value={company.companyName} onChange={updateCompany} placeholder="Enter your company name" maxLength={150} />
                </div>
              </div>

              <div className="field-group">
                <label htmlFor="contactPerson">Contact Person <span>*</span></label>
                <div className="input-wrapper">
                  <UserRound size={19} />
                  <input id="contactPerson" name="contactPerson" value={company.contactPerson} onChange={updateCompany} placeholder="Enter contact person's name" maxLength={100} />
                </div>
              </div>

              <div className="field-group full-width">
                <label htmlFor="email">Business Email Address <span>*</span></label>
                <div className="input-wrapper">
                  <Mail size={19} />
                  <input id="email" type="email" name="email" value={company.email} onChange={updateCompany} placeholder="name@company.com" />
                </div>
              </div>
            </div>
          </section>

          <div className="questionnaire-heading">
            <div>
              <div className="section-topline">
                <span className="section-index">02</span>
                <span>YOUR BUSINESS QUESTIONNAIRE</span>
              </div>
              <h2>Tell us more about your business.</h2>
              <p className="section-description">There are 23 questions across 5 sections. All questions are required.</p>
            </div>
            <div className="completion-count">
              <CheckCircle2 size={17} />
              {answeredCount}/23
            </div>
          </div>

          {sections.map((section, sectionIndex) => {
            const startNumber = sections.slice(0, sectionIndex).reduce(
              (sum, item) => sum + item.questions.length, 0
            );

            return (
              <section className="question-section" key={section.title}>
                <div className="question-section-header">
                  <div className="section-title-row">
                    <span className="section-number">{String(sectionIndex + 1).padStart(2, '0')}</span>
                    <h3>{section.title}</h3>
                  </div>
                  <p>{section.description}</p>
                </div>

                {section.questions.map((question, index) => {
                  const number = startNumber + index + 1;
                  const id = `q${number}`;

                  return (
                    <QuestionCard
                      key={id}
                      number={number}
                      question={question}
                      value={answers[id]}
                      onChange={value => updateAnswer(id, value)}
                    />
                  );
                })}
              </section>
            );
          })}

          <div className="form-bottom">
            <div className="final-note">
              <CheckCircle2 size={20} />
              <div>
                <strong>You're almost there!</strong>
                <p>Review your responses before submitting your questionnaire.</p>
              </div>
            </div>

            <FormNavigation loading={loading || submitted} onSubmit={() => {}} />
            <button className="submit-button final-submit" type="submit" disabled={loading || submitted}>
              {loading ? 'Submitting...' : 'Submit Questionnaire'}
              {!loading && <ArrowRight size={19} />}
            </button>
          </div>
        </form>

        <footer className="form-footer">
          <span>COMPANY ONBOARDING</span>
          <span>YOUR BUSINESS. YOUR VISION. OUR STRATEGY.</span>
        </footer>
      </div>
    </main>
  );
}