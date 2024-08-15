import { IAgent } from '../types/interfaces/agent';

export const agents: IAgent[] = [
  {
    role: 'trend analyzer',
    id: 'ta1',
    goal: 'Analyze market data to identify trends and patterns.',
    backstory:
      'Developed to handle large volumes of financial data and provide actionable insights.',
    modelName: 'GPT-4',
    tools: ['analysis-tool', 'data-visualization']
  },
  {
    role: 'prediction engine',
    id: 'pe1',
    goal: 'Predict future market movements based on historical data and current trends.',
    backstory: 'Built with advanced algorithms to offer reliable predictions.',
    modelName: 'GPT-4',
    tools: ['analysis-tool', 'data-visualization']
  },
  {
    role: 'report generator',
    id: 'rg1',
    goal: 'Generate comprehensive reports summarizing the analysis and predictions.',
    backstory: 'Designed to create easy-to-understand reports for investors and stakeholders.',
    modelName: 'GPT-4',
    tools: ['summary-tool', 'report-tool']
  },
  {
    role: 'symptom checker',
    id: 'sc1',
    goal: 'Assist patients in identifying potential medical conditions based on their symptoms.',
    backstory: 'Trained with vast medical knowledge to provide accurate assessments.',
    modelName: 'GPT-4',
    tools: ['medical-database', 'symptom-database']
  },
  {
    role: 'appointment scheduler',
    id: 'as1',
    goal: 'Help patients schedule appointments with healthcare providers.',
    backstory: 'Integrated with clinic databases to manage appointment bookings efficiently.',
    modelName: 'GPT-4',
    tools: ['calendar-tool', 'clinic-database']
  },
  {
    role: 'reminder bot',
    id: 'rb1',
    goal: 'Send reminders to patients about their medication and appointments.',
    backstory: 'Ensures patients adhere to their treatment plans and never miss an appointment.',
    modelName: 'GPT-4',
    tools: ['reminder-tool', 'notification-system']
  },
  {
    role: 'recommendation-engine',
    id: 're1',
    goal: 'Recommend products to users based on their browsing and purchase history.',
    backstory: 'Developed to enhance the shopping experience by offering personalized suggestions.',
    modelName: 'GPT-4',
    tools: ['recommendation-tool', 'user-history-database ']
  },
  {
    role: 'user tracker',
    id: 'ut1',
    goal: 'Track user behavior to gather data for personalized recommendations.',
    backstory:
      'Ensures that the recommendation engine has up-to-date information on user preferences.',
    modelName: 'GPT-4',
    tools: ['tracking-tool', 'user-history-database']
  },
  {
    role: 'feedback collector',
    id: 'fc1',
    goal: 'Collect feedback from users about their shopping experience.',
    backstory: 'Helps improve the system by understanding user satisfaction and preferences.',
    modelName: 'GPT-4',
    tools: ['feedback-tool', 'survey-tool']
  },
  {
    role: 'content filter',
    id: 'cf1',
    goal: 'Filter out inappropriate or harmful content on social media platforms.',
    backstory: 'Built to ensure a safe and respectful online environment.',
    modelName: 'GPT-4',
    tools: ['filter-tool', 'moderation-tool']
  },
  {
    role: 'user-reporter',
    id: 'ur1',
    goal: 'Report users who consistently post inappropriate content.',
    backstory: 'Assists in maintaining community standards by flagging problematic users.',
    modelName: 'GPT-4',
    tools: ['report-tool', 'moderation-tool']
  },
  {
    role: 'violation detector',
    id: 'vd1',
    goal: 'Detect violations of platform policies and guidelines.',
    backstory: 'Works to uphold the integrity of the platform by identifying rule breaches.',
    modelName: 'GPT-4',
    tools: ['detection-tool', 'moderation-tool']
  },
  {
    role: 'transaction monitor',
    id: 'tm1',
    goal: 'Monitor transactions for signs of fraudulent activity.',
    backstory: 'Trained to recognize patterns that indicate potential fraud.',
    modelName: 'GPT-4',
    tools: ['monitoring-tool', 'fraud-detection']
  },
  {
    role: 'risk analyzer',
    id: 'ra1',
    goal: 'Analyze the risk level of transactions and flag suspicious ones.',
    backstory: 'Helps prevent financial losses by identifying high-risk activities.',
    modelName: 'GPT-4',
    tools: ['risk-analysis-tool', 'fraud-detection']
  },
  {
    role: 'alert generator',
    id: 'ag1',
    goal: 'Generate alerts for transactions that require further investigation.',
    backstory: 'Ensures timely action is taken to address potential fraud.',
    modelName: 'GPT-4',
    tools: []
  },
  {
    role: 'device controller',
    id: 'dc1',
    goal: 'Control various smart home devices for automation and convenience.',
    backstory: 'Integrated with multiple home systems to offer seamless control.',
    modelName: 'GPT-4',
    tools: []
  },
  {
    role: 'energy optimizer',
    id: 'eo1',
    goal: 'Optimize energy usage to improve efficiency and reduce costs.',
    backstory: 'Works by analyzing energy consumption patterns and making adjustments.',
    modelName: 'GPT-4',
    tools: []
  },
  {
    role: 'security monitor',
    id: 'sm1',
    goal: 'Monitor home security systems and alert homeowners of potential threats.',
    backstory: 'Ensures the safety and security of the home through constant vigilance.',
    modelName: 'GPT-4',
    tools: []
  },
  {
    role: 'translator',
    id: 'tr1',
    goal: 'Provide real-time language translation to assist in communication.',
    backstory: 'Trained in multiple languages to offer accurate and context-aware translations.',
    modelName: 'GPT-4',
    tools: []
  },
  {
    role: 'language detector',
    id: 'ld1',
    goal: 'Detect the language being spoken or written to ensure proper translation.',
    backstory: 'Enhances the translation process by accurately identifying languages.',
    modelName: 'GPT-4',
    tools: ['language-detection-tool', 'translation-tool']
  },
  {
    role: 'context analyzer',
    id: 'ca1',
    goal: 'Analyze the context of conversations to provide meaningful translations.',
    backstory: 'Works to ensure translations maintain the original intent and nuance.',
    modelName: 'GPT-4',
    tools: ['context-analysis-tool', 'translation-tool']
  },
  {
    role: 'lesson planner',
    id: 'lp1',
    goal: 'Assist students by planning personalized lessons and study schedules.',
    backstory: 'Developed to adapt to individual learning styles and needs.',
    modelName: 'GPT-4',
    tools: []
  },
  {
    role: 'question answerer',
    id: 'qa1',
    goal: 'Answer student questions and provide explanations on various topics.',
    backstory: 'Trained with extensive educational material to support student learning.',
    modelName: 'GPT-4',
    tools: []
  },
  {
    role: 'progress-tracker',
    id: 'pt1',
    goal: 'Track student progress and provide feedback on their performance.',
    backstory: 'Helps students stay on track and identify areas for improvement.',
    modelName: 'GPT-4',
    tools: ['tracking-tool', 'feedback-tool']
  },
  {
    role: 'news fetcher',
    id: 'nf1',
    goal: 'Fetch news articles from various sources for aggregation.',
    backstory: 'Gathers diverse news content to provide a comprehensive overview.',
    modelName: 'GPT-4',
    tools: ['news-api', 'web-scraping']
  },
  {
    role: 'summary generator',
    id: 'sg1',
    goal: 'Generate summaries of news articles to present key information quickly.',
    backstory: 'Ensures users can stay informed with minimal time investment.',
    modelName: 'GPT-4',
    tools: []
  },
  {
    role: 'topic clusterer',
    id: 'tc1',
    goal: 'Cluster news articles by topic to help users find related content.',
    backstory: 'Organizes news in a way that makes it easy to explore different subjects.',
    modelName: 'GPT-4',
    tools: ['clustering-tool', 'topic-analysis']
  },
  {
    role: 'document verifier',
    id: 'dv1',
    goal: 'Verify employee documents during the onboarding process.',
    backstory: 'Ensures all necessary documents are valid and complete.',
    modelName: 'GPT-4',
    tools: []
  },
  {
    role: 'training bot',
    id: 'tb1',
    goal: 'Provide training modules to new employees.',
    backstory: 'Offers comprehensive training to help employees get up to speed.',
    modelName: 'GPT-4',
    tools: ['training-tool', 'learning-management-system']
  },
  {
    role: 'orientation guide',
    id: 'og1',
    goal: 'Guide new employees through the orientation process.',
    backstory: 'Helps new hires acclimate to the company culture and processes.',
    modelName: 'GPT-4',
    tools: []
  }
];
