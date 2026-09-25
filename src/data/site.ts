export const site = {
  name: 'Manthan Singh',
  role: 'Data Scientist',
  title: 'Manthan Singh — Data Science, Analytics & Machine Learning',
  description:
    'Portfolio of Manthan Singh: data science, analytics and machine learning projects spanning SQL data warehousing, EDA, AutoML, LSTM forecasting on NIFTY 50 data, and fine-tuned transformer models.',
  location: 'Kangra, Himachal Pradesh, India',
  email: 'manthansingh27525@gmail.com',
  resume: '/resume.pdf',
  links: {
    github: 'https://github.com/Manthan27525',
    linkedin: 'https://www.linkedin.com/in/manthan077',
    x: 'https://x.com/Manthan0088',
  },
} as const;

export const nav = [
  { href: '/#about', label: 'About' },
  { href: '/#skills', label: 'Skills' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#focus', label: 'Focus' },
  { href: '/#journey', label: 'Journey' },
  { href: '/#contact', label: 'Contact' },
] as const;
