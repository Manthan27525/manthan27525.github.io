// Only skills that appear in project code are listed. `evidence` names the
// projects where each group is used, so a reader can check it.

export interface SkillGroup {
  title: string;
  skills: string[];
  evidence: string;
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Programming',
    skills: ['Python', 'SQL (T-SQL)', 'TypeScript'],
    evidence: 'All projects',
  },
  {
    title: 'Data Analytics',
    skills: ['Pandas', 'NumPy', 'EDA', 'Customer segmentation', 'Matplotlib', 'Seaborn', 'Plotly'],
    evidence: 'Global Superstore, Stock Clustering, AutoDML',
  },
  {
    title: 'Machine Learning',
    skills: ['Scikit-learn', 'Feature engineering', 'XGBoost', 'LightGBM', 'CatBoost', 'Optuna', 'K-Means', 'Model evaluation'],
    evidence: 'AutoDML, S&P 500 Prediction, Stock Clustering',
  },
  {
    title: 'Deep Learning',
    skills: ['TensorFlow / Keras', 'LSTM', 'CNN', 'Keras Tuner', 'PyTorch', 'TFLite'],
    evidence: 'NIFTY 50 Forecasting, Sign Language Recognition, Finance LMs',
  },
  {
    title: 'AI / NLP',
    skills: ['Hugging Face Transformers', 'Fine-tuning (GPT-2, FLAN-T5, BART)', 'LangChain', 'RAG', 'FAISS', 'NLTK'],
    evidence: 'Finance LMs, TradeMindAI, AutoDML',
  },
  {
    title: 'Data / BI',
    skills: ['SQL Server', 'Data warehousing', 'ETL', 'Star schema', 'Medallion architecture'],
    evidence: 'SQL Data Warehouse',
  },
  {
    title: 'Engineering & Deployment',
    skills: ['FastAPI', 'Docker', 'Streamlit', 'Astro', 'Git', 'Logging & modular pipelines'],
    evidence: 'AutoDML, Streamlit apps, live websites',
  },
];

export interface JourneyStep {
  stage: string;
  summary: string;
  projects: { name: string; slug: string }[];
}

export const journey: JourneyStep[] = [
  {
    stage: 'Python',
    summary: 'Core language for every data and ML project, from notebooks to packaged pipelines with logging and custom exceptions.',
    projects: [{ name: 'S&P 500 Prediction', slug: 'sp500-prediction' }],
  },
  {
    stage: 'SQL',
    summary: 'T-SQL stored procedures, ETL and dimensional modelling in a three-layer SQL Server warehouse.',
    projects: [{ name: 'SQL Data Warehouse', slug: 'sql-data-warehouse' }],
  },
  {
    stage: 'Data Analytics',
    summary: 'EDA, customer profiling and business-focused visualisation, plus CPI-based analysis for 192 countries.',
    projects: [
      { name: 'Global Superstore', slug: 'global-superstore-analysis' },
      { name: 'Inflation Calculator', slug: 'yearly-inflation-calculator' },
    ],
  },
  {
    stage: 'Machine Learning',
    summary: 'Supervised and unsupervised modelling, hyperparameter search and automated model selection.',
    projects: [
      { name: 'AutoDML', slug: 'autodml' },
      { name: 'Stock Clustering', slug: 'stock-market-clustering' },
    ],
  },
  {
    stage: 'Deep Learning',
    summary: 'Sequence models for time series and CNNs for computer vision, deployed in Streamlit apps.',
    projects: [
      { name: 'NIFTY 50 Forecasting', slug: 'nifty50-stock-forecasting' },
      { name: 'Sign Language', slug: 'sign-language-classification' },
    ],
  },
  {
    stage: 'Generative AI',
    summary: 'Fine-tuning transformer language models and building LLM + retrieval pipelines with LangChain.',
    projects: [
      { name: 'Finance LMs', slug: 'finance-slm' },
      { name: 'TradeMindAI', slug: 'trademind-ai' },
    ],
  },
];
