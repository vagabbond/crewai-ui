import { IProject } from '../types/interfaces/project';

export const projects: IProject[] = [
  {
    id: 'a12f1c34-5678-4abc-9def-123456789abc',
    name: 'Market Trend Analysis',
    isSequential: true,
    description:
      'Analyzing market trends using AI to provide insights and predictions for financial investments.',

    agents: ['ta1', 'pe1', 'rg1'],
    llm: 'GPT-4',
    workflow: {
      nodes: [
        {
          id: 'ta1',
          type: 'customNode',
          position: { x: 0, y: 50 },
          data: { label: 'trend-analyzer', id: 'ta1', isSequential: true }
        },
        {
          id: 'pe1',
          type: 'customNode',
          position: { x: 300, y: 50 },
          data: {
            label: 'prediction-engine',
            id: 'pe1',
            isSequential: true
          }
        },
        {
          id: 'rg1',
          type: 'customNode',
          position: { x: 600, y: 50 },
          data: { label: 'report-generator', id: 'rg1', isSequential: true }
        }
      ],
      edges: [
        { id: 'ta1-pe1', source: 'ta1', target: 'pe1', type: 'customEdge' },
        { id: 'pe1-rg1', source: 'pe1', target: 'rg1', type: 'customEdge' }
      ]
    }
  },
  {
    id: 'b23g2d45-6789-5bcd-0efg-234567890bcd',
    name: 'Healthcare Chatbot',
    isSequential: true,
    description:
      'Developing a chatbot to assist patients with medical inquiries, appointment scheduling, and medication reminders.',

    agents: ['sc1', 'as1', 'rb1'],
    llm: 'GPT-4',
    workflow: {
      nodes: [
        {
          id: 'sc1',
          type: 'customNode',
          position: { x: 0, y: 50 },
          data: { label: 'symptom-checker', id: 'sc1', isSequential: true }
        },
        {
          id: 'as1',
          type: 'customNode',
          position: { x: 300, y: 50 },
          data: { label: 'appointment-scheduler', id: 'as1', isSequential: true }
        },
        {
          id: 'rb1',
          type: 'customNode',
          position: { x: 600, y: 50 },
          data: { label: 'reminder-bot', id: 'rb1', isSequential: true }
        }
      ],
      edges: [
        { id: 'sc1-as1', source: 'sc1', target: 'as1', type: 'customEdge' },
        { id: 'as1-rb1', source: 'as1', target: 'rb1', type: 'customEdge' }
      ]
    }
  },
  {
    id: 'c34h3e56-7890-6cde-1fgh-345678901cde',
    name: 'E-commerce Personalization',
    isSequential: true,
    description:
      'Creating a personalized shopping experience for users by recommending products based on their browsing and purchase history.',

    agents: ['re1', 'ut1', 'fc1'],
    llm: 'GPT-4',
    workflow: {
      nodes: [
        {
          id: 're1',
          type: 'customNode',
          position: { x: 0, y: 50 },
          data: { label: 'recommendation-engine', id: 're1', isSequential: true }
        },
        {
          id: 'ut1',
          type: 'customNode',
          position: { x: 300, y: 50 },
          data: { label: 'user-tracker', id: 'ut1', isSequential: true }
        },
        {
          id: 'fc1',
          type: 'customNode',
          position: { x: 600, y: 50 },
          data: { label: 'feedback-collector', id: 'fc1', isSequential: true }
        }
      ],
      edges: [
        { id: 're1-ut1', source: 're1', target: 'ut1', type: 'customEdge' },
        { id: 'ut1-fc1', source: 'ut1', target: 'fc1', type: 'customEdge' }
      ]
    }
  },
  {
    id: 'd45i4f67-8901-7def-2ghi-456789012def',
    name: 'Content Moderation',
    isSequential: true,
    description:
      'Implementing an AI-driven content moderation system to filter out inappropriate or harmful content on social media platforms.',
    agents: ['cf1', 'ur1', 'vd1'],
    llm: 'GPT-4',
    workflow: {
      nodes: [
        {
          id: 'cf1',
          type: 'customNode',
          position: { x: 0, y: 50 },
          data: { label: 'content-filter', id: 'cf1', isSequential: true }
        },
        {
          id: 'ur1',
          type: 'customNode',
          position: { x: 300, y: 50 },
          data: { label: 'user-reporter', id: 'ur1', isSequential: true }
        },
        {
          id: 'vd1',
          type: 'customNode',
          position: { x: 600, y: 50 },
          data: { label: 'violation-detector', id: 'vd1', isSequential: true }
        }
      ],
      edges: [
        { id: 'cf1-ur1', source: 'cf1', target: 'ur1', type: 'customEdge' },
        { id: 'ur1-vd1', source: 'ur1', target: 'vd1', type: 'customEdge' }
      ]
    }
  },
  {
    id: 'e56j5g78-9012-8efg-3hij-567890123efg',
    name: 'Fraud Detection',
    isSequential: true,
    description:
      'Developing an AI system to detect and prevent fraudulent activities in online transactions.',
    agents: ['tm1', 'ra1'],
    llm: 'GPT-4',
    workflow: {
      nodes: [
        {
          id: 'tm1',
          type: 'customNode',
          position: { x: 0, y: 50 },
          data: { label: 'transaction-monitor', id: 'tm1', isSequential: true }
        },
        {
          id: 'ra1',
          type: 'customNode',
          position: { x: 300, y: 50 },
          data: { label: 'risk-analyzer', id: 'ra1', isSequential: true }
        }
      ],
      edges: [{ id: 'tm1-ra1', source: 'tm1', target: 'ra1', type: 'customEdge' }]
    }
  },
  {
    id: 'f67k6h89-0123-9fgh-4ijk-678901234fgh',
    name: 'Smart Home Automation',
    isSequential: true,
    description:
      'Creating an AI-powered system to automate and control home devices for energy efficiency and convenience.',
    agents: ['dc1', 'eo1', 'sm1'],
    llm: 'GPT-4',
    workflow: {
      nodes: [
        {
          id: 'dc1',
          type: 'customNode',
          position: { x: 0, y: 50 },
          data: { label: 'device-controller', id: 'dc1', isSequential: true }
        },
        {
          id: 'eo1',
          type: 'customNode',
          position: { x: 300, y: 50 },
          data: { label: 'energy-optimizer', id: 'eo1', isSequential: true }
        },
        {
          id: 'sm1',
          type: 'customNode',
          position: { x: 600, y: 50 },
          data: { label: 'security-monitor', id: 'sm1', isSequential: true }
        }
      ],
      edges: [
        { id: 'dc1-eo1', source: 'dc1', target: 'eo1', type: 'customEdge' },
        { id: 'eo1-sm1', source: 'eo1', target: 'sm1', type: 'customEdge' }
      ]
    }
  },
  {
    id: 'g78l7i90-1234-0ghi-5jkl-789012345ghi',
    name: 'Language Translation',
    isSequential: true,
    description:
      'Building a real-time language translation service to assist in communication across different languages.',

    agents: ['tr1', 'ld1', 'ca1'],
    llm: 'GPT-4',
    workflow: {
      nodes: [
        {
          id: 'tr1',
          type: 'customNode',
          position: { x: 0, y: 50 },
          data: { label: 'translator', id: 'tr1', isSequential: true }
        },
        {
          id: 'ld1',
          type: 'customNode',
          position: { x: 300, y: 50 },
          data: {
            label: 'language-detector',
            id: 'ld1',
            isSequential: true
          }
        },
        {
          id: 'ca1',
          type: 'customNode',
          position: { x: 600, y: 50 },
          data: {
            label: 'context-analyzer',
            id: 'ca1',
            isSequential: true
          }
        }
      ],
      edges: [
        { id: 'tr1-ld1', source: 'tr1', target: 'ld1', type: 'customEdge' },
        { id: 'ld1-ca1', source: 'ld1', target: 'ca1', type: 'customEdge' }
      ]
    }
  }
];
