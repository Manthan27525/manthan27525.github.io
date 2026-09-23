// Every statement here is sourced from the project's GitHub README, code or
// notebook outputs. Figures only appear where the repo itself reports them.

export type Category = 'Data Science' | 'Data Analytics' | 'AI' | 'Finance' | 'SQL' | 'Web Apps';

export const categories: Category[] = ['Data Science', 'Data Analytics', 'AI', 'Finance', 'SQL', 'Web Apps'];

export interface Stat {
  value: string;
  label: string;
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  categories: Category[];
  status?: string;
  problem: string;
  solution: string;
  features: string[];
  stack: string[];
  /** Verifiable figures taken from the repository. Omitted when the repo reports none. */
  stats?: Stat[];
  repo?: string;
  demo?: string;
  /** Label for the demo link; defaults to "Live demo". */
  demoLabel?: string;
  details: {
    overview: string;
    dataset: string;
    approach: string[];
    results: string[];
    challenges: { title: string; body: string }[];
  };
}

const gh = (repo: string) => `https://github.com/Manthan27525/${repo}`;

export const projects: Project[] = [
  {
    slug: 'autodml',
    name: 'AutoDML',
    tagline: 'End-to-end automated machine learning pipeline, served through FastAPI and Streamlit.',
    categories: ['Data Science', 'Data Analytics'],
    problem:
      'Building a model from a new tabular dataset means repeating the same steps every time: cleaning, feature engineering, model selection and tuning. Those steps are slow and easy to get wrong.',
    solution:
      'A modular Python package that takes a CSV or Excel file and a target column, then automatically preprocesses the data, detects the problem type, trains candidate models, tunes the best one with Optuna and writes an evaluation report.',
    features: [
      'Detects regression vs. classification from the target column',
      'Handles missing values, duplicates, skew, outliers, datetime and free-text columns',
      'Trains a registry of scikit-learn models and tunes the best one with Optuna',
      'Exports a serialized pipeline, analysis JSON and a PDF report',
      'FastAPI backend with /train, /predict and /report endpoints, containerised with Docker',
    ],
    stack: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Optuna', 'NLTK', 'FastAPI', 'Docker', 'Streamlit'],
    repo: gh('AutoDML'),
    demo: 'https://autodml.streamlit.app/',
    details: {
      overview:
        'AutoDML (Automated Data Mining and Machine Learning) is a Python package plus API that runs the full tabular ML lifecycle from a single upload: preprocessing, analysis, visualization, model training, hyperparameter optimization and evaluation. A separate Streamlit frontend calls the API so the whole flow can be used without writing code.',
      dataset:
        'Any user-supplied CSV or XLSX file with at least two columns. The API detects the file encoding before loading and rejects empty or single-column datasets. The repo includes experiment folders showing the pipeline run on different datasets.',
      approach: [
        'Preprocessor: validates the frame, drops unhelpful columns, converts datetime columns, detects feature types, and extracts datetime features.',
        'Text columns are cleaned with NLTK and vectorised; categorical columns are encoded; numeric columns are imputed, skew-corrected and scaled, with optional PCA.',
        'Problem detection chooses regression or classification. ModelTrainer fits every model in the registry and ranks them by R² or weighted F1.',
        'ModelOptimizer runs an Optuna study over the winning model’s search space using 5-fold cross-validation, then refits and saves the best model.',
        'All fitted preprocessors are pickled so the same transformations are replayed at prediction time.',
      ],
      results: [
        'Deployed Streamlit app at autodml.streamlit.app.',
        'Each run produces reusable artifacts: processed data, plots, an analysis report, an evaluation report, a trained model and a PDF report.',
      ],
      challenges: [
        {
          title: 'Unknown, messy inputs',
          body: 'Because the dataset is not known in advance, the preprocessor has explicit stages for encoding detection, datetime coercion, feature-type detection, outlier handling (IQR or z-score) and skew correction.',
        },
        {
          title: 'Reproducible predictions',
          body: 'Every fitted imputer, encoder, scaler, vectorizer and PCA step is saved separately so inference applies exactly the transformations used in training.',
        },
        {
          title: 'Debuggability',
          body: 'Each stage raises its own typed exception (for example ModelTrainingError, OptimizationError) and writes to a shared logger.',
        },
      ],
    },
  },
  {
    slug: 'sql-data-warehouse',
    name: 'SQL Data Warehouse',
    tagline: 'Medallion-architecture warehouse in SQL Server that merges CRM and ERP data into a star schema.',
    categories: ['SQL', 'Data Analytics'],
    problem:
      'Sales data lived in two separate source systems (CRM and ERP) with different key formats, inconsistent codes and data-quality issues, so it could not be reported on directly.',
    solution:
      'An end-to-end T-SQL warehouse using Bronze → Silver → Gold layers: raw CSVs are bulk-loaded, cleansed and conformed with stored procedures, then exposed as a star schema of views for reporting and ad-hoc SQL.',
    features: [
      'Bronze layer bulk-loads six CSV files as-is for traceability',
      'Silver layer deduplicates, standardizes codes and aligns CRM/ERP keys',
      'Gold layer exposes dim_customers, dim_products and fact_sales views',
      'Re-runnable loads with TRY…CATCH error reporting and per-table timings',
      'Documented architecture, data-flow and integration diagrams',
    ],
    stack: ['SQL Server', 'T-SQL', 'Stored Procedures', 'Star Schema', 'ETL', 'SSMS', 'draw.io'],
    stats: [
      { value: '~116K', label: 'source rows' },
      { value: '18,484', label: 'customers' },
      { value: '60,398', label: 'sales order lines' },
    ],
    repo: gh('SQL-Data-Warehouse-Project'),
    details: {
      overview:
        'A data warehouse built entirely in Microsoft SQL Server that consolidates sales data from a CRM and an ERP system into one analytics-ready model, following the Medallion (Bronze / Silver / Gold) architecture.',
      dataset:
        'Six CSV exports: CRM customer info (~18.5K rows), product history (397 rows) and sales details (~60.4K rows); ERP customer demographics, customer locations and product categories (37 rows).',
      approach: [
        'init_database.sql creates the DataWarehouse database and bronze, silver and gold schemas.',
        'bronze.load_bronze uses BULK INSERT with truncate-and-insert full loads.',
        'silver.load_silver trims names, maps codes (e.g. S/M → Single/Married), deduplicates customers keeping the latest record, rebuilds product end dates with LEAD(), converts integer dates and recalculates inconsistent sales values.',
        'Gold views join the conformed tables into a star schema with surrogate keys.',
      ],
      results: [
        'Gold layer: 18,484 customers, 295 current products and 60,398 sales order lines built from ~116K source rows.',
        'Example queries in the README cover revenue by country, top products and yearly sales trend.',
      ],
      challenges: [
        {
          title: 'Joining systems with different keys',
          body: 'CRM and ERP keys did not match (e.g. AW00011000 vs NASAW00011000 vs AW-00011000). The Silver layer strips prefixes, removes hyphens and re-slices product keys so the tables join cleanly.',
        },
        {
          title: 'Bad and missing values in sales data',
          body: 'Sales amounts are recomputed as quantity × |price| when missing or inconsistent, prices are derived with NULLIF to avoid divide-by-zero, and malformed dates become NULL.',
        },
        {
          title: 'Slowly changing product data',
          body: 'Product history has multiple versions per product. End dates are rebuilt with LEAD() and the Gold dimension keeps only current versions.',
        },
      ],
    },
  },
  {
    slug: 'nifty50-stock-forecasting',
    name: 'NIFTY 50 Stock Price Forecasting',
    tagline: 'One stacked-LSTM model per NIFTY 50 stock, with an interactive forecasting app.',
    categories: ['Finance', 'Data Science'],
    problem:
      'Exploring short-term price behaviour across all 50 NIFTY 50 stocks needs a repeatable pipeline: fetching fresh data, preparing sequences and keeping 50 separate models up to date.',
    solution:
      'An automated pipeline that downloads 20 years of daily data from Yahoo Finance, builds 100-day sliding windows, trains a stacked LSTM per ticker, and serves forecasts through a Streamlit app with retrain-on-demand.',
    features: [
      'Per-ticker models for all 50 NIFTY 50 constituents',
      'Forecast horizon selectable from 1 to 60 days',
      'Stacked LSTM (3 × LSTM(50) + dropout) with optional Keras Tuner search',
      'Retrain one model or all 50 from the UI',
      'Plots the last 100 days of history alongside the forecast',
    ],
    stack: ['Python', 'TensorFlow / Keras', 'Keras Tuner', 'yfinance', 'Pandas', 'Scikit-learn', 'Plotly', 'Streamlit'],
    stats: [
      { value: '50', label: 'per-ticker models' },
      { value: '20 yrs', label: 'daily price history' },
      { value: '1–60', label: 'day forecast horizon' },
    ],
    repo: gh('stock-price-forecasting'),
    details: {
      overview:
        'A deep-learning time-series project that trains and serves LSTM models for every NIFTY 50 stock. It is built for learning and research; the README is explicit that forecasts are not financial advice.',
      dataset:
        'Daily OHLCV data for each NIFTY 50 ticker (<TICKER>.NS) pulled automatically from Yahoo Finance via yfinance, covering 20 years. The model uses the Close series.',
      approach: [
        'fetch_data.py downloads the price history; preprocess_data.py scales Close to [0, 1] with MinMaxScaler.',
        'Data is split 65/35 chronologically (no shuffling) and turned into 100-step input windows.',
        'The model stacks three LSTM(50) layers, each followed by Dropout(0.2), with a Dense(1) output trained on MSE with Adam.',
        'Optional Keras Tuner random search over layers, units, dropout and optimizer.',
        'Saved models and scalers are loaded in the Streamlit app to forecast forward and inverse-scale the output.',
      ],
      results: [
        'A working forecasting app covering all 50 tickers with retraining built into the UI.',
        'The repo does not publish a benchmark metric, so none is shown here.',
      ],
      challenges: [
        {
          title: 'Avoiding look-ahead leakage',
          body: 'The train/test split is chronological with no shuffling, so the model is always evaluated on data that comes after its training window.',
        },
        {
          title: 'Keeping 50 models current',
          body: 'A batch trainer (model_trainer.py) and UI buttons retrain one or all models against freshly downloaded data.',
        },
      ],
    },
  },
  {
    slug: 'finance-slm',
    name: 'Finance Q&A Language Models',
    tagline: 'Fine-tuned GPT-2, FLAN-T5 and BART on a finance instruction dataset, compared in one app.',
    categories: ['AI', 'Finance'],
    problem:
      'General-purpose small language models give vague answers to finance and stock-market questions. The goal was to see how far compact models can go after domain fine-tuning.',
    solution:
      'Parsed a financial instruction–answer corpus, fine-tuned three transformer architectures (decoder-only GPT-2, and encoder-decoder FLAN-T5 and BART) with Hugging Face Trainer, and built a Streamlit app to compare their answers side by side.',
    features: [
      'Instruction dataset parsed from raw text into 5,968 question–answer pairs',
      'Causal LM fine-tuning for GPT-2 and seq2seq fine-tuning for FLAN-T5 and BART',
      'Evaluated each model with validation loss and perplexity',
      'Streamlit app to switch between models and generate answers',
      'Decoding tuned per model (top-k/top-p sampling, beam search, n-gram blocking)',
    ],
    stack: ['Python', 'PyTorch', 'Hugging Face Transformers', 'Datasets', 'GPT-2', 'FLAN-T5', 'BART', 'Streamlit'],
    stats: [
      { value: '5,968', label: 'instruction pairs' },
      { value: '3', label: 'models fine-tuned' },
      { value: '90 / 10', label: 'train / test split' },
    ],
    repo: gh('stockmarket-SLM'),
    details: {
      overview:
        'An NLP project comparing how three small transformer models learn to answer finance questions after supervised fine-tuning, packaged as a “Finance & Stock Market AI Assistant” Streamlit app for educational use.',
      dataset:
        'A financial instruction dataset (financial_data.txt, ~1.4 MB) of “instruction / output” samples, parsed with regular expressions into 5,968 pairs and split 90/10 into 5,371 training and 597 test examples.',
      approach: [
        'GPT-2: prompts formatted as “Instruction / Answer”, tokenized to 256 tokens, padding masked out of the loss, trained as a causal LM.',
        'FLAN-T5-base and BART-base: instruction as source, answer as target, trained with DataCollatorForSeq2Seq.',
        'Each model is evaluated on the held-out split with eval loss and perplexity, then saved with its tokenizer.',
        'The app loads the chosen model and applies model-specific decoding settings.',
      ],
      results: [
        'Three fine-tuned models saved and runnable from one interface.',
        'Loss and perplexity are computed in the training notebook; the saved notebook does not include the final values, so none are quoted here.',
      ],
      challenges: [
        {
          title: 'Repetitive generations from small models',
          body: 'Generation uses no_repeat_ngram_size, top-k/top-p sampling or beam search depending on the model, plus a post-processing step that removes repeated sentences.',
        },
        {
          title: 'Two different model families',
          body: 'Decoder-only and encoder-decoder models need different tokenization, label construction and collators, so each has its own preprocessing path.',
        },
      ],
    },
  },
  {
    slug: 'global-superstore-analysis',
    name: 'Global Superstore Analysis',
    tagline: 'End-to-end EDA of a global retail dataset: sales, profit, customers, regions and shipping.',
    categories: ['Data Analytics'],
    problem:
      'A large retail dataset with customer, order, product, shipping and regional data needed to be turned into clear answers on what drives sales and profit.',
    solution:
      'A structured exploratory analysis in Python: cleaning and feature engineering, then focused analyses of trends, customer profiles, product categories, markets and shipping modes, each backed by exported charts.',
    features: [
      'Data cleaning, preprocessing and feature engineering',
      'Sales and profit trend analysis over time',
      'Customer profiling by purchase frequency and revenue contribution',
      'Country, market and category performance comparisons',
      'Shipping-mode analysis against delivery time and profitability',
    ],
    stack: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Jupyter'],
    repo: gh('global-superstore-data-analysis'),
    details: {
      overview:
        'A business-focused exploratory data analysis project on the Global Superstore dataset, aimed at supporting data-driven decisions on customers, products, markets and fulfilment.',
      dataset:
        'The Global Superstore retail dataset, covering customers, orders, products, shipping details and regional performance.',
      approach: [
        'Clean and preprocess the raw data and engineer analysis features.',
        'Analyse sales and profit trends to find seasonal patterns.',
        'Profile customers by purchase frequency and contribution to revenue and profit.',
        'Compare categories, products, countries and markets.',
        'Evaluate shipping modes on delivery time and profitability.',
      ],
      results: [
        'Charts exported to the repo’s visuals/ folder, including top 10 countries by sales contribution, average delivery time for the top 10 countries, customer purchase frequency distribution, and revenue and profit contribution by customer profile.',
      ],
      challenges: [
        {
          title: 'From charts to decisions',
          body: 'Each analysis is framed around a business question (who are the most valuable customers, which markets underperform, which shipping modes cost profit) rather than plotting every column.',
        },
      ],
    },
  },
  {
    slug: 'trademind-ai',
    name: 'TradeMindAI',
    tagline: 'LLM-powered stock assistant: natural-language ticker extraction and RAG over market data.',
    categories: ['AI', 'Finance'],
    status: 'In progress',
    problem:
      'Users ask about companies in plain language (“What’s going on with NVIDIA?”), but market-data tools need exact ticker symbols and structured data.',
    solution:
      'A LangChain pipeline that uses an LLM (Gemini, wrapped as a custom LangChain LLM) to extract a yfinance-compatible ticker, downloads five years of price history, and indexes it in a FAISS vector store for retrieval-augmented answers.',
    features: [
      'Custom LangChain LLM wrapper around the Google GenAI client',
      'Few-shot prompt that maps company names to NSE (.NS), US and crypto tickers',
      'Converts daily OHLCV rows into LangChain documents',
      'Embeds with Hugging Face sentence embeddings and stores in FAISS',
    ],
    stack: ['Python', 'LangChain', 'Gemini API', 'FAISS', 'Hugging Face Embeddings', 'yfinance', 'RAG'],
    repo: gh('TradeMindAI'),
    details: {
      overview:
        'An early-stage generative-AI project exploring retrieval-augmented generation for stock-market questions. The current code implements ticker extraction and the vector store; the user-facing app is still being built.',
      dataset: 'Five years of daily OHLCV history per ticker, fetched live from Yahoo Finance with yfinance.',
      approach: [
        'A few-shot PromptTemplate instructs the LLM to return only a ticker symbol (or NONE).',
        'Price history is converted into one text document per trading day.',
        'Documents are embedded with HuggingFaceEmbeddings and indexed with FAISS, then saved locally for retrieval.',
      ],
      results: ['Working ticker-extraction and vector-store pipeline. No evaluation has been published yet.'],
      challenges: [
        {
          title: 'Free text to exact symbols',
          body: 'Company names, exchange suffixes and crypto pairs vary widely, so the extraction prompt encodes explicit rules and examples (e.g. Reliance → RELIANCE.NS, Bitcoin → BTC-USD).',
        },
      ],
    },
  },
  {
    slug: 'sp500-prediction',
    name: 'S&P 500 Price Prediction',
    tagline: 'Modular ML pipeline comparing tuned regressors on S&P 500 stock data, with a Streamlit app.',
    categories: ['Finance', 'Data Science'],
    problem:
      'Turning a notebook experiment on stock price data into something repeatable: ingestion, transformation, feature engineering, training and prediction as separate, logged components.',
    solution:
      'A packaged pipeline with dedicated ingestion, transformation, feature-extraction and training components, hyperparameters searched in a notebook and stored as artifacts, and a Streamlit front end for predictions.',
    features: [
      'Calendar features (day, week, quarter, month/quarter start and end)',
      'Exponential moving averages over 5, 10 and 20 days for OHLC prices',
      'Compared linear, tree, boosting (XGBoost, LightGBM, CatBoost) and SVR models with RandomizedSearchCV',
      'Best parameters, model, scaler and preprocessor saved as artifacts',
      'Custom logging and exception handling across the pipeline',
    ],
    stack: ['Python', 'Pandas', 'Scikit-learn', 'XGBoost', 'LightGBM', 'CatBoost', 'Streamlit'],
    repo: gh('sp500-prediction-model'),
    details: {
      overview:
        'An end-to-end supervised learning project on S&P 500 constituent price data, structured as a production-style Python package with training and prediction pipelines.',
      dataset:
        'Historical daily OHLCV data for S&P 500 stocks (date, open, high, low, close, volume, ticker name), stored under artifacts/data.',
      approach: [
        'Data ingestion splits raw data into train and test sets.',
        'Feature extraction adds calendar features and 5/10/20-day EMAs for open, high, low and close.',
        'Transformation scales features and saves the preprocessor.',
        'Candidate regressors are tuned with RandomizedSearchCV; best parameters are written to best_params.json and reused by the trainer.',
      ],
      results: [
        'Reusable train and prediction pipelines with saved artifacts and an interactive Streamlit app.',
        'Notebook scores are not shown here because the engineered features include the same-day close price, which makes the reported fit optimistic.',
      ],
      challenges: [
        {
          title: 'From notebook to pipeline',
          body: 'Each step lives in its own component with config dataclasses, logging and a custom exception class, so training and inference can be rerun end to end.',
        },
      ],
    },
  },
  {
    slug: 'stock-market-clustering',
    name: 'NIFTY 50 Stock Clustering',
    tagline: 'Unsupervised grouping of NIFTY 50 stocks by daily price movement, with a Streamlit app.',
    categories: ['Finance', 'Data Science'],
    problem:
      'Sector labels do not always reflect how stocks actually move. Grouping stocks by their price behaviour can reveal which ones tend to move together.',
    solution:
      'Downloaded two years of daily data for NIFTY 50 stocks, used daily open-to-close movement as the feature vector, and clustered with a normalise + K-Means pipeline. The Streamlit app assigns user-entered NSE symbols to a cluster.',
    features: [
      'Daily movement (close − open) features across ~500 trading days',
      'Imputation → Normalizer → K-Means (5 clusters) scikit-learn pipeline',
      't-SNE projection for interactive cluster visualisation with Plotly',
      'Clusters interpreted as sector / risk profiles in the app',
    ],
    stack: ['Python', 'Scikit-learn', 'K-Means', 't-SNE', 'Plotly', 'yfinance', 'Streamlit'],
    repo: gh('stock-market-clustering'),
    details: {
      overview:
        'An unsupervised learning project that clusters Indian large-cap stocks by the shape of their daily price moves rather than by sector classification.',
      dataset:
        'Two years of daily prices for NIFTY 50 stocks from Yahoo Finance (48 tickers returned at download time), plus stored per-ticker CSVs in the repo.',
      approach: [
        'Compute daily movement as close minus open for each stock and trading day.',
        'Impute gaps with column means and L2-normalise each stock’s movement vector.',
        'Fit K-Means with 5 clusters and summarise the average daily movement per cluster.',
        'Visualise clusters in 2-D with t-SNE and Plotly.',
      ],
      results: [
        'Five clusters, labelled in the app as profiles such as Consumer Staples (defensive) and Information Technology.',
      ],
      challenges: [
        {
          title: 'Comparing stocks at different price levels',
          body: 'Raw rupee movements are not comparable across stocks, so each vector is normalised before clustering.',
        },
      ],
    },
  },
  {
    slug: 'sign-language-classification',
    name: 'Sign Language Recognition',
    tagline: 'Lightweight CNN that classifies 28 ASL hand signs from images or a webcam.',
    categories: ['AI', 'Data Science'],
    problem:
      'Recognising American Sign Language letters from camera input needs a model that is accurate enough to be useful but small enough to run in real time.',
    solution:
      'A compact CNN trained on 64×64 grayscale images with TensorFlow, exported to TensorFlow Lite, and served in a Streamlit app that accepts uploaded images or webcam captures.',
    features: [
      '28 classes: letters A–Z plus “Space” and “Nothing”',
      'Lightweight CNN with batch normalisation (~552K parameters)',
      'Early stopping and learning-rate scheduling during training',
      'TFLite export for lightweight deployment',
      'Streamlit app with image upload and webcam input',
    ],
    stack: ['Python', 'TensorFlow / Keras', 'CNN', 'OpenCV', 'TFLite', 'Streamlit'],
    stats: [
      { value: '165,782', label: 'training images' },
      { value: '28', label: 'classes' },
      { value: '~552K', label: 'model parameters' },
    ],
    repo: gh('sign-language-classification'),
    details: {
      overview:
        'A computer-vision classifier for ASL hand signs, built around a deliberately small CNN so it can run in real time and be exported to TFLite.',
      dataset: 'An ASL image dataset of 165,782 images across 28 classes, split 80/20 into training and validation sets.',
      approach: [
        'Load images with tf.keras image_dataset_from_directory at 64×64 grayscale.',
        'Train a lightweight CNN (“LightweightGestureCNN”) with batch normalisation, early stopping and learning-rate reduction.',
        'Convert the trained Keras model to TensorFlow Lite.',
        'Serve predictions in Streamlit, preprocessing inputs with OpenCV.',
      ],
      results: ['A ~552K-parameter model (2.1 MB) exported to TFLite and usable from a webcam in real time.'],
      challenges: [
        {
          title: 'Size vs. speed',
          body: 'Using small grayscale inputs and a compact architecture keeps the model at about 2 MB, which suits real-time webcam inference.',
        },
      ],
    },
  },

  // Live websites. Descriptions come from each site's own pages and
  // methodology notes; all four are built with Astro and Claude Code.
  {
    slug: 'yearly-inflation-calculator',
    name: 'Yearly Inflation Calculator',
    tagline: 'CPI-based inflation and purchasing-power calculator for 192 countries, built on World Bank data.',
    categories: ['Web Apps', 'Finance', 'Data Analytics'],
    problem:
      'People want to know what an amount of money, or a salary, from one year is worth in another year and another country. Most calculators cover a single country or hide which data and formulas they use.',
    solution:
      'A static, multilingual site that stores the World Bank consumer price index series in the build and computes the inflation-adjusted value, cumulative inflation, average annual inflation and purchasing power in the browser, with the methodology published in full.',
    features: [
      'World Bank CPI series (FP.CPI.TOTL, 2010 = 100) covering 192 countries',
      'Inflation-adjusted value, cumulative and geometric-mean annual inflation, and purchasing power',
      'Year-by-year breakdown table and future-value projection',
      'Country landing pages and 9 language versions',
      'Works offline once loaded because the dataset is stored in the site at build time',
    ],
    stack: ['Astro', 'TypeScript', 'World Bank Open Data', 'Claude Code'],
    stats: [
      { value: '192', label: 'countries' },
      { value: '9', label: 'languages' },
      { value: 'CPI', label: 'World Bank series' },
    ],
    demo: 'https://yearlyinflationcalculator.com/',
    demoLabel: 'Visit site',
    details: {
      overview:
        'A production website answering “what is this amount worth today?” for almost any country. It is aimed at a general audience and explains its data source, formulas and limits on a dedicated methodology page.',
      dataset:
        'World Bank Open Data, Consumer price index (2010 = 100), indicator FP.CPI.TOTL: annual averages for 192 countries with at least two years of data. The series is snapshotted and stored in the site at build time.',
      approach: [
        'Adjusted value = amount × CPI[end] ÷ CPI[start], so the index base year cancels out.',
        'Average annual inflation uses the geometric mean ((CPI[end] ÷ CPI[start])^(1/years) − 1) rather than the arithmetic mean of yearly rates, which would overstate it.',
        'Purchasing power is the reciprocal of the adjustment ratio.',
        'Year menus only offer years with published figures; gap years are skipped in the year-by-year table.',
      ],
      results: [
        'Live at yearlyinflationcalculator.com, with country pages and 9 language versions.',
      ],
      challenges: [
        {
          title: 'Messy long-run economic data',
          body: 'Countries re-base their indices, revise them and have missing years. The methodology page states these limits, and the UI only exposes years that have data.',
        },
        {
          title: 'Correct statistics',
          body: 'Annual inflation over a period is reported as a compound (geometric) rate so the figures are consistent with the cumulative change.',
        },
      ],
    },
  },
  {
    slug: 'asset-allocation-calculator',
    name: 'Asset Allocation Calculator',
    tagline: 'Rule-based portfolio allocation by goal, horizon and risk tolerance, with a glide path and drift check.',
    categories: ['Web Apps', 'Finance'],
    problem:
      'Most asset allocation tools are black boxes or sales funnels that push specific funds. Investors need a transparent starting point that works for their own country.',
    solution:
      'A browser-only calculator that turns four risk questions and a time horizon into a 0–100 risk score, maps it to one of five risk profiles across five asset classes, and adjusts the mix with a smoothed glide path as the goal date approaches.',
    features: [
      'Risk score from horizon, reaction to a 20% drawdown, experience and income stability',
      'Five risk profiles, from Conservative to Aggressive, across five asset classes',
      'Glide path toward capital preservation for horizons under 15 years',
      'Rebalancing check that flags any asset class 5+ percentage points from target',
      'Country options, 9 languages and a set of long-form guides',
    ],
    stack: ['Astro', 'TypeScript', 'Claude Code'],
    stats: [
      { value: '5', label: 'risk profiles' },
      { value: '5', label: 'asset classes' },
      { value: '9', label: 'languages' },
    ],
    demo: 'https://assetallocationcalc.com/',
    demoLabel: 'Visit site',
    details: {
      overview:
        'A free, no-sign-up asset allocation tool that shows its full scoring logic. It recommends percentages across broad asset classes only and never names specific funds or products.',
      dataset:
        'User inputs only: country, goal, horizon, risk answers and optional current allocation. Everything runs in the browser and nothing is stored or sent.',
      approach: [
        'Weighted scoring combines the four answers into a 0–100 risk score, with horizon weighted most heavily.',
        'Short-term goals, such as an emergency fund or a purchase within three years, cap the score.',
        'The score maps to a strategic base allocation; horizons under 15 years ease toward a capital-preservation mix on a smoothed curve, charted year by year.',
        'An optional current mix is compared with the target to flag drift of 5 percentage points or more.',
      ],
      results: ['Live at assetallocationcalc.com with a calculator, methodology page, FAQ and guides.'],
      challenges: [
        {
          title: 'Transparency over black-box advice',
          body: 'The methodology page publishes every profile’s base allocation and the glide-path target, so users can check the logic instead of trusting a number.',
        },
      ],
    },
  },
  {
    slug: 'tif-to-jpg-converter',
    name: 'TIF to JPG Converter',
    tagline: 'Private, in-browser batch image converter with multi-page TIFF support.',
    categories: ['Web Apps'],
    problem:
      'Online converters usually upload your files to a server, cap daily use and struggle with large or multi-page TIFFs.',
    solution:
      'A converter that decodes TIFFs on the user’s device in Web Workers, lets them preview JPG quality, and packages batch output into a ZIP, with no uploads.',
    features: [
      'TIFF decoding in the browser with UTIF, off the main thread in Web Workers',
      'Multi-page TIFF handling and true batch conversion',
      'Adjustable JPG quality with preview before saving',
      'ZIP download for batches (JSZip)',
      'Works offline once loaded, in 9 languages',
    ],
    stack: ['Astro', 'TypeScript', 'Web Workers', 'UTIF', 'JSZip', 'Claude Code'],
    demo: 'https://tiftojpg.com/',
    demoLabel: 'Visit site',
    details: {
      overview: 'A privacy-first image conversion tool where all processing happens client-side.',
      dataset: 'User-supplied TIF/TIFF files, processed locally and never uploaded.',
      approach: [
        'Decode TIFF pages with UTIF inside Web Workers so the UI stays responsive.',
        'Encode to JPG at a user-selected quality.',
        'Bundle multiple outputs into a ZIP with JSZip.',
      ],
      results: ['Live at tiftojpg.com.'],
      challenges: [
        {
          title: 'Large files without a server',
          body: 'Moving decoding into Web Workers lets the browser handle big and multi-page TIFFs without freezing the page.',
        },
      ],
    },
  },
  {
    slug: 'mpg-to-mp4-converter',
    name: 'MPG to MP4 Converter',
    tagline: 'Video converter that runs FFmpeg compiled to WebAssembly entirely in the browser.',
    categories: ['Web Apps'],
    problem:
      'Converting legacy MPG video usually means installing desktop software or uploading large files to an unknown server.',
    solution:
      'A web app that loads FFmpeg (WebAssembly) on demand and transcodes to H.264/AAC MP4 on the user’s device, with control over quality, resolution and audio.',
    features: [
      'FFmpeg.wasm transcoding to H.264 (libx264) video and AAC audio',
      'Adjustable quality (CRF), output resolution and optional audio removal',
      'No upload, no file-size cap and no watermark',
      'Works offline after the page has loaded',
    ],
    stack: ['Astro', 'TypeScript', 'FFmpeg.wasm', 'WebAssembly', 'Claude Code'],
    demo: 'https://mpgtomp4.com/',
    demoLabel: 'Visit site',
    details: {
      overview: 'A privacy-first video converter that brings a native media toolchain into the browser.',
      dataset: 'User-supplied MPG files, processed locally and never uploaded.',
      approach: [
        'Lazy-load the FFmpeg core and WebAssembly binary only when a conversion starts.',
        'Write the input to FFmpeg’s in-memory file system and run libx264 with a user-selected CRF, plus optional scaling.',
        'Return the result as a Blob URL for preview and download, then clean up memory.',
      ],
      results: ['Live at mpgtomp4.com.'],
      challenges: [
        {
          title: 'Heavy tooling in a web page',
          body: 'FFmpeg’s WebAssembly core is large, so it loads only on demand, with a progress indicator, and the page stays light until the user converts a file.',
        },
      ],
    },
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
