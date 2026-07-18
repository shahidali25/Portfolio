import { Skill, Project, ExperienceItem, EducationItem, Certification } from './types';

export const SKILLS: Skill[] = [
  // Programming
  { name: 'Python', category: 'programming', rating: 90 },
  { name: 'JavaScript', category: 'programming', rating: 85 },
  { name: 'PHP', category: 'programming', rating: 80 },
  { name: 'SQL', category: 'programming', rating: 85 },
  
  // Web Development
  { name: 'HTML5', category: 'web_dev', rating: 95 },
  { name: 'CSS3', category: 'web_dev', rating: 90 },
  { name: 'JavaScript', category: 'web_dev', rating: 85 },
  { name: 'PHP', category: 'web_dev', rating: 80 },
  { name: 'Responsive Design', category: 'web_dev', rating: 90 },
  { name: 'Bootstrap', category: 'web_dev', rating: 85 },
  
  // Data Analytics
  { name: 'Microsoft Excel', category: 'analytics', rating: 90 },
  { name: 'Power BI', category: 'analytics', rating: 85 },
  { name: 'SQL', category: 'analytics', rating: 85 },
  { name: 'Python', category: 'analytics', rating: 90 },
  { name: 'Data Cleaning', category: 'analytics', rating: 95 },
  { name: 'Data Visualization', category: 'analytics', rating: 90 },
  
  // Database
  { name: 'MySQL', category: 'database', rating: 85 },
  
  // Tools
  { name: 'Visual Studio Code', category: 'tools', rating: 90 },
  { name: 'Git', category: 'tools', rating: 85 },
  { name: 'GitHub', category: 'tools', rating: 85 },
  { name: 'XAMPP', category: 'tools', rating: 80 },
  { name: 'Jupyter Notebook', category: 'tools', rating: 90 },
  { name: 'Power BI', category: 'tools', rating: 85 },
  { name: 'MySQL Workbench', category: 'tools', rating: 80 },
  { name: 'Microsoft Excel', category: 'tools', rating: 90 },
];

export const PROJECTS: Project[] = [
  {
    id: 'easymart',
    title: 'EasyMart – Grocery Shopping Website',
    subtitle: 'Full-Stack E-Commerce Web Application',
    category: 'web',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL'],
    features: [
      'User Login & Registration',
      'Product Search & Categorization',
      'Interactive Shopping Cart',
      'Mock Online Payment Integration',
      'Order Tracking System',
      'Comprehensive Admin Dashboard'
    ],
    description: 'A fully functional grocery e-commerce store enabling customers to browse fresh produce, manage their cart, place mock orders, and track deliveries. Features an administrative portal to manage products, view sales metrics, and update delivery statuses in real-time.'
  },
  {
    id: 'excel-dashboard',
    title: 'Excel Sales Performance Dashboard',
    subtitle: 'Interactive Spreadsheet-Driven Analytics',
    category: 'analytics',
    technologies: ['Microsoft Excel', 'KPIs', 'Pivot Tables', 'Slicers'],
    features: [
      'Interactive Slicers (Region, Category, Year)',
      'Dynamic Sales KPI Indicators',
      'Pivot Table Sales Trend Analyses',
      'Target vs. Achievement Visualizers',
      'Automated Data Model'
    ],
    description: 'An interactive analytical dashboard engineered to track sales operations, profit margins, and sales performance across product lines and regions. Fully responsive slicers allow decision-makers to inspect granular quarterly trends instantly.'
  },
  {
    id: 'powerbi-dashboard',
    title: 'Power BI Executive Intelligence Dashboard',
    subtitle: 'Enterprise Regional Sales & Performance Insights',
    category: 'analytics',
    technologies: ['Power BI', 'DAX', 'Data Modeling', 'Power Query'],
    features: [
      'Granular Profitability Map & Demographics',
      'Interactive Cross-Filtering Visuals',
      'Key Performance Indicators (KPI) & Sparklines',
      'DAX-Engineered Custom Metrics',
      'Regional Performance Metrics'
    ],
    description: 'A business intelligence solution visualizing sales distribution, customer segmentation, and regional profit margins. Combines deep data cleaning with customized DAX calculations to isolate drivers of revenue and business bottlenecks.'
  },
  {
    id: 'python-analysis',
    title: 'Python Exploratory Data Analysis (EDA)',
    subtitle: 'Data Wrangling, Sentiment & Business Insights',
    category: 'python',
    technologies: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn'],
    features: [
      'Missing Value Imputation & Outlier Removal',
      'Feature Engineering & Casing Standardization',
      'Descriptive & Correlation Matrices',
      'Custom Plotly/Matplotlib Graphs',
      'Automated Reporting Pipeline'
    ],
    description: 'An end-to-end data science workbook conducting extensive exploratory data analysis. Reads raw messy transaction feeds, cleans records programmatically using Pandas, filters anomalies, and visualizes insights using Matplotlib and Seaborn.'
  },
  {
    id: 'sql-project',
    title: 'SQL Relational Reporting & Schema Design',
    subtitle: 'Business Aggregations, Joins, and Optimizations',
    category: 'sql',
    technologies: ['MySQL', 'Relational Schemas', 'Database Normalization', 'Complex Queries'],
    features: [
      'Multi-Table Inner/Left Joins',
      'Aggregated Grouping (COUNT, SUM, AVG)',
      'Subqueries & Window Functions (ROW_NUMBER)',
      'Index Optimizations & Report Views',
      'Real-world Business Scenario Scripts'
    ],
    description: 'A comprehensive database engineering project showing robust relational database management. Includes structural table definitions, indexing optimization for high-throughput reads, and complex joins designed for executive-level reporting.'
  }
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    role: 'Web Development Intern',
    company: 'SkillCraft Technology',
    period: 'Internship',
    bullets: [
      'Built responsive, high-performance web applications using HTML5, CSS3, JavaScript, PHP, and MySQL.',
      'Designed and normalized database schemas for inventory tracking and customer accounts.',
      'Improved front-end loading speeds by 30% through lightweight responsive Bootstrap grid layouts.',
      'Collaborated on back-end API construction and session-based authentication protocols.'
    ]
  }
];

export const EDUCATION: EducationItem[] = [
  {
    degree: 'Bachelor of Computer Applications (BCA)',
    institution: 'Al-Ameen Institute of Information Sciences',
    period: 'Graduated',
    gpa: 'CGPA: 7.79 / 10'
  }
];

export const CERTIFICATIONS: Certification[] = [
  { name: 'Python Programming', issuer: 'Skill Academy', year: '2025' },
  { name: 'Power BI Data Analyst', issuer: 'Microsoft Certification / Coursera', year: '2025' },
  { name: 'Advanced Microsoft Excel for Analytics', issuer: 'Corporate Finance Institute', year: '2024' },
  { name: 'SQL (Basic & Intermediate)', issuer: 'HackerRank / Udemy', year: '2025' },
  { name: 'Responsive Web Development Bootcamp', issuer: 'freeCodeCamp', year: '2024' }
];

// Master Sales & Business dataset for dashboards (Excel, Power BI, Python, SQL)
export interface MasterSalesRecord {
  order_id: number;
  date: string;
  year: number;
  month: string;
  customer_name: string;
  category: string;
  product: string;
  region: string;
  sales: number;
  profit: number;
  segment: string;
  quantity: number;
}

export const MASTER_DATASET: MasterSalesRecord[] = [
  { order_id: 1001, date: '2025-01-15', year: 2025, month: 'Jan', customer_name: 'Aditya Sen', category: 'Grocery', product: 'Fresh Apples', region: 'North', sales: 120, profit: 30, segment: 'Consumer', quantity: 5 },
  { order_id: 1002, date: '2025-02-18', year: 2025, month: 'Feb', customer_name: 'Pooja Sharma', category: 'Grocery', product: 'Organic Milk', region: 'West', sales: 80, profit: 16, segment: 'Consumer', quantity: 8 },
  { order_id: 1003, date: '2025-03-12', year: 2025, month: 'Mar', customer_name: 'Vikram Nair', category: 'Household', product: 'Detergent Powder', region: 'South', sales: 250, profit: 75, segment: 'Corporate', quantity: 2 },
  { order_id: 1004, date: '2025-04-25', year: 2025, month: 'Apr', customer_name: 'Neha Gupta', category: 'Beverages', product: 'Green Tea Pack', region: 'East', sales: 150, profit: 45, segment: 'Home Office', quantity: 10 },
  { order_id: 1005, date: '2025-05-14', year: 2025, month: 'May', customer_name: 'Aditya Sen', category: 'Grocery', product: 'Whole Wheat Bread', region: 'North', sales: 60, profit: 12, segment: 'Consumer', quantity: 12 },
  { order_id: 1006, date: '2025-06-22', year: 2025, month: 'Jun', customer_name: 'Rohan Mehta', category: 'Household', product: 'Disinfectant Spray', region: 'West', sales: 180, profit: 36, segment: 'Consumer', quantity: 4 },
  { order_id: 1007, date: '2025-07-09', year: 2025, month: 'Jul', customer_name: 'Kiran Patel', category: 'Beverages', product: 'Filter Coffee Powder', region: 'East', sales: 320, profit: 96, segment: 'Corporate', quantity: 6 },
  { order_id: 1008, date: '2025-08-30', year: 2025, month: 'Aug', customer_name: 'Suresh Rao', category: 'Grocery', product: 'Basmati Rice 5kg', region: 'South', sales: 450, profit: 112, segment: 'Corporate', quantity: 3 },
  { order_id: 1009, date: '2025-09-15', year: 2025, month: 'Sep', customer_name: 'Pooja Sharma', category: 'Beverages', product: 'Fruit Juice Box', region: 'West', sales: 110, profit: 22, segment: 'Consumer', quantity: 5 },
  { order_id: 1010, date: '2025-10-05', year: 2025, month: 'Oct', customer_name: 'Anjali Desai', category: 'Household', product: 'Paper Towels', region: 'North', sales: 130, profit: 26, segment: 'Home Office', quantity: 13 },
  { order_id: 1011, date: '2025-11-19', year: 2025, month: 'Nov', customer_name: 'Vikram Nair', category: 'Grocery', product: 'Fresh Apples', region: 'South', sales: 140, profit: 35, segment: 'Corporate', quantity: 6 },
  { order_id: 1012, date: '2025-12-24', year: 2025, month: 'Dec', customer_name: 'Rahul Kumar', category: 'Beverages', product: 'Green Tea Pack', region: 'East', sales: 210, profit: 63, segment: 'Consumer', quantity: 14 },
  
  { order_id: 1013, date: '2026-01-10', year: 2026, month: 'Jan', customer_name: 'Neha Gupta', category: 'Grocery', product: 'Fresh Apples', region: 'East', sales: 180, profit: 45, segment: 'Home Office', quantity: 7 },
  { order_id: 1014, date: '2026-02-14', year: 2026, month: 'Feb', customer_name: 'Aditya Sen', category: 'Household', product: 'Detergent Powder', region: 'North', sales: 290, profit: 87, segment: 'Consumer', quantity: 3 },
  { order_id: 1015, date: '2026-03-21', year: 2026, month: 'Mar', customer_name: 'Kiran Patel', category: 'Beverages', product: 'Filter Coffee Powder', region: 'East', sales: 400, profit: 120, segment: 'Corporate', quantity: 8 },
  { order_id: 1016, date: '2026-04-11', year: 2026, month: 'Apr', customer_name: 'Rohan Mehta', category: 'Grocery', product: 'Organic Milk', region: 'West', sales: 95, profit: 19, segment: 'Consumer', quantity: 9 },
  { order_id: 1017, date: '2026-05-18', year: 2026, month: 'May', customer_name: 'Suresh Rao', category: 'Household', product: 'Disinfectant Spray', region: 'South', sales: 220, profit: 44, segment: 'Corporate', quantity: 5 },
  { order_id: 1018, date: '2026-06-29', year: 2026, month: 'Jun', customer_name: 'Rahul Kumar', category: 'Beverages', product: 'Fruit Juice Box', region: 'East', sales: 175, profit: 35, segment: 'Consumer', quantity: 7 },
  { order_id: 1019, date: '2026-07-04', year: 2026, month: 'Jul', customer_name: 'Anjali Desai', category: 'Grocery', product: 'Basmati Rice 5kg', region: 'North', sales: 490, profit: 122, segment: 'Home Office', quantity: 4 },
  { order_id: 1020, date: '2026-08-15', year: 2026, month: 'Aug', customer_name: 'Pooja Sharma', category: 'Household', product: 'Paper Towels', region: 'West', sales: 150, profit: 30, segment: 'Consumer', quantity: 15 },
  { order_id: 1021, date: '2026-09-22', year: 2026, month: 'Sep', customer_name: 'Vikram Nair', category: 'Beverages', product: 'Filter Coffee Powder', region: 'South', sales: 380, profit: 114, segment: 'Corporate', quantity: 7 },
  { order_id: 1022, date: '2026-10-09', year: 2026, month: 'Oct', customer_name: 'Kiran Patel', category: 'Grocery', product: 'Organic Milk', region: 'East', sales: 115, profit: 23, segment: 'Corporate', quantity: 11 },
  { order_id: 1023, date: '2026-11-26', year: 2026, month: 'Nov', customer_name: 'Aditya Sen', category: 'Household', product: 'Detergent Powder', region: 'North', sales: 310, profit: 93, segment: 'Consumer', quantity: 3 },
  { order_id: 1024, date: '2026-12-15', year: 2026, month: 'Dec', customer_name: 'Pooja Sharma', category: 'Beverages', product: 'Green Tea Pack', region: 'West', sales: 240, profit: 72, segment: 'Consumer', quantity: 15 },
];
