
import Onboarding from '../models/Onboarding.js';

const questionData = [
  {
    id: 'q1',
    section: 'Brand Background & Identity',
    question: 'What is the story behind your company? Why was your company established?'
  },
  {
    id: 'q2',
    section: 'Brand Background & Identity',
    question: 'Is your company a standalone business or part of a larger group, organization, or parent company?'
  },
  {
    id: 'q3',
    section: 'Brand Background & Identity',
    question: 'Should your parent company or associated brands be mentioned in your social media communication, or should your company operate as an independent consumer-facing brand?'
  },
  {
    id: 'q4',
    section: 'Brand Background & Identity',
    question: 'What was the idea behind launching your company, and what gap in the market was it created to address?'
  },
  {
    id: 'q5',
    section: 'Brand Background & Identity',
    question: 'What does your company name represent, and is there a brand story that we should communicate?'
  },
  {
    id: 'q6',
    section: 'Brand Background & Identity',
    question: 'Are there long-term plans to expand your company or introduce additional products, services, or business locations?'
  },
  {
    id: 'q7',
    section: 'Business Details & Offerings',
    question: 'What is the scale and capacity of your business? Do you have multiple branches, locations, departments, or service categories?'
  },
  {
    id: 'q8',
    section: 'Business Details & Offerings',
    question: 'What products or services does your company offer, and which customer requirements or occasions do they cater to?'
  },
  {
    id: 'q9',
    section: 'Business Details & Offerings',
    question: 'What are your company’s biggest USPs compared with competitors in your industry?'
  },
  {
    id: 'q10',
    section: 'Business Details & Offerings',
    question: 'What facilities, features, benefits, or services are included in your offerings?'
  },
  {
    id: 'q11',
    section: 'Business Details & Offerings',
    question: 'Do you offer different packages, pricing plans, or customized solutions based on customer requirements?'
  },
  {
    id: 'q12',
    section: 'Business Goals & Priorities',
    question: 'What is the primary objective for your company over the next three months — brand awareness, more enquiries, sales, or customer acquisition?'
  },
  {
    id: 'q13',
    section: 'Business Goals & Priorities',
    question: 'Which types of customers, clients, or market segments would you most like to attract?'
  },
  {
    id: 'q14',
    section: 'Business Goals & Priorities',
    question: 'Are there particular days, months, or seasons when your business experiences lower demand and needs additional marketing support?'
  },
  {
    id: 'q15',
    section: 'Business Goals & Priorities',
    question: 'How many qualified enquiries, leads, or sales would you ideally like to generate each month?'
  },
  {
    id: 'q16',
    section: 'Customer Insights',
    question: 'What matters most to your customers when selecting your company — location, quality, pricing, experience, service, reputation, or something else?'
  },
  {
    id: 'q17',
    section: 'Customer Insights',
    question: 'What are the most common questions customers ask before purchasing your products or using your services?'
  },
  {
    id: 'q18',
    section: 'Customer Insights',
    question: 'Why do prospective customers sometimes choose a competitor instead of your company?'
  },
  {
    id: 'q19',
    section: 'Content & Creative Direction',
    question: 'Can we showcase the same product, service, or business offering through different themes, concepts, and creative approaches?'
  },
  {
    id: 'q20',
    section: 'Content & Creative Direction',
    question: 'Can we create walkthrough videos, reels, or behind-the-scenes content showcasing your business, facilities, products, services, and customer experience?'
  },
  {
    id: 'q21',
    section: 'Content & Creative Direction',
    question: 'Would your management be comfortable featuring customer testimonials, clients, employees, partners, or other people associated with your business?'
  },
  {
    id: 'q22',
    section: 'Content & Creative Direction',
    question: 'Is there a particular visual identity or mood your company wants to establish — elegant, premium, modern, contemporary, traditional, minimal, or luxurious?'
  },
  {
    id: 'q23',
    section: 'Content & Creative Direction',
    question: 'What would you want a customer to remember about your company after comparing it with three competitors online?'
  }
];

export const createOnboarding = async (req, res) => {
  try {
    const { companyName, contactPerson, email, answers } = req.body;

    if (!companyName?.trim() || !contactPerson?.trim() || !email?.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Please complete all company and contact details.'
      });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address.'
      });
    }

    if (!Array.isArray(answers) || answers.length !== 23) {
      return res.status(400).json({
        success: false,
        message: 'All 23 questions must be answered.'
      });
    }

    const formattedAnswers = questionData.map(question => {
      const submittedAnswer = answers.find(
        item => item.questionId === question.id
      );

      if (!submittedAnswer || typeof submittedAnswer.answer !== 'string' || !submittedAnswer.answer.trim()) {
        throw new Error(`Please answer question ${question.id.replace('q', '')}.`);
      }

      return {
        questionId: question.id,
        section: question.section,
        question: question.question,
        answer: submittedAnswer.answer.trim()
      };
    });

    const submission = await Onboarding.create({
      companyName: companyName.trim(),
      contactPerson: contactPerson.trim(),
      email: email.trim().toLowerCase(),
      answers: formattedAnswers
    });

    return res.status(201).json({
      success: true,
      message: 'Your company onboarding form has been submitted successfully.',
      submissionId: submission._id
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || 'Unable to submit onboarding form.'
    });
  }
};

export const getOnboardings = async (req, res) => {
  try {
    const submissions = await Onboarding.find()
      .sort({ createdAt: -1 })
      .select('-__v');

    return res.status(200).json({
      success: true,
      count: submissions.length,
      submissions
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Unable to fetch submissions.'
    });
  }
};

export const getOnboardingById = async (req, res) => {
  try {
    const submission = await Onboarding.findById(req.params.id);

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found.'
      });
    }

    return res.status(200).json({
      success: true,
      submission
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Invalid submission ID.'
    });
  }
};

export { questionData };
