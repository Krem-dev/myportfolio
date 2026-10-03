// Single source of truth for everything shown on the site.
// Edit this file to update the portfolio — every window reads from it.

export type ProjectCategory = 'Enterprise' | 'Mobile' | 'Web' | 'Embedded & AI' | 'Systems';

export interface Project {
  id: string;
  name: string;
  context: string;
  category: ProjectCategory;
  summary: string;
  highlights: string[];
  metric?: { value: string; label: string };
  stack: string[];
  /** Optional artwork shown on the detail page — a poster, screenshot or diagram. */
  image?: { src: string; alt: string; caption?: string; width: number; height: number };
  links?: { live?: string; code?: string; appStore?: string; playStore?: string };
  featured?: boolean;
}

export interface Role {
  title: string;
  org: string;
  unit?: string;
  location: string;
  start: string;
  end: string;
  points: string[];
  /** Held alongside the role above it rather than after it. */
  concurrent?: boolean;
}

export interface Study {
  school: string;
  program: string;
  start: string;
  end: string;
  note?: string;
  points?: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  date?: string;
  /** Public verification page — omitted where only a PDF certificate exists. */
  credentialUrl?: string;
}

export const profile = {
  name: 'Isaac Yaw Amponsah',
  shortName: 'Isaac',
  initials: 'IA',
  // Square photo in public/ (512×512).
  photo: '/avatar.jpg' as string | undefined,
  title: 'Software Engineer',
  role: 'Developer & Applications Support at AngloGold Ashanti',
  location: 'Ghana',
  availability: 'Open to new opportunities',
  tagline:
    'I build business applications, workflow automations and data tools that real operations depend on.',
  bio: [
    "I'm a Microsoft-certified software engineer (AZ-204) in the Digital Technology team at AngloGold Ashanti's Obuasi Mine. I design, build and support the business applications behind a large mining operation — from Power Platform workflows used by 1,400+ employees to system deployments across multiple sites.",
    'I studied Computer Engineering at KNUST, graduating with First Class honours, and trained in backend engineering with ALX. My work spans Node.js, C# and Python services, SQL Server and Power BI reporting, data integration with FME Workbench and SSIS, ArcGIS Survey123 field apps, and embedded machine learning.',
    'Outside that, I co-founded SleekTeq Solutions, where I lead the backend on client web and mobile products, and I’m building JUGOP HUB with partners — a request network that connects mining companies with verified suppliers and contractors.',
    'I enjoy turning slow, manual processes into reliable, well-documented software — and working closely with the people who use it every day.',
  ],
  highlights: [
    { kind: 'people', value: '1,400+', label: 'employees use an app I built' },
    { kind: 'data', value: '5,000+', label: 'assets migrated across sites' },
    { kind: 'cert', value: 'AZ-204', label: 'Azure Developer Associate' },
  ] as const,
  focus: [
    {
      title: 'Business applications',
      body: 'Power Apps, Power Automate and SharePoint solutions that replace paper and email workflows.',
    },
    {
      title: 'Backend & integration',
      body: 'APIs and databases in Node.js, C# and Python, plus data integration pipelines with FME Workbench and SSIS.',
    },
    {
      title: 'Data & reporting',
      body: 'SQL Server queries and Power BI dashboards that support day-to-day decisions.',
    },
  ],
  languages: ['English (fluent)', 'Twi (native)'],
  interests: ['Cloud computing', 'Digital transformation', 'Cybersecurity', 'IoT & embedded security', 'Secure distributed systems'],
};

export const links = {
  email: 'yawamp27@gmail.com',
  phone: '+233 55 850 7341',
  phoneHref: 'tel:+233558507341',
  github: 'https://github.com/Krem-dev',
  linkedin: 'https://www.linkedin.com/in/isaac-amponsah/',
  blog: 'https://kremlin.hashnode.dev/',
  // Generated from this file by `npm run resume` — never hand-edited, and never includes referees.
  resumePdf: '/resume.pdf' as string | undefined,
  // Optional: create a free form at formspree.io and put its ID here to receive messages directly.
  formspreeId: process.env.NEXT_PUBLIC_FORMSPREE_ID,
};

export const projects: Project[] = [
  {
    id: 'subsidy',
    name: 'Educational Subsidy Workflow',
    context: 'AngloGold Ashanti · Obuasi',
    category: 'Enterprise',
    summary:
      'A digital application that lets employees submit and track dependants’ education subsidy requests, replacing a paper-based process.',
    highlights: [
      'Designed, built and deployed end to end',
      'Automated approval routing and notifications',
    ],
    metric: { value: '1,400+', label: 'employees using it' },
    stack: ['Power Apps', 'Power Automate', 'SharePoint'],
  },
  {
    id: 'asset-mgmt',
    name: 'Asset Management System',
    context: 'AngloGold Ashanti',
    category: 'Enterprise',
    summary:
      'Rebuilt an internal asset management system, replacing a legacy desktop application with a modern web platform, and led its rollout to further operations.',
    highlights: [
      'Replaced a legacy desktop application with a React and Node.js web platform',
      'Asset register, issue and return, inventory, repairs and reporting',
      'Single sign-on with role-based access',
      'Led the rollout to further sites, including data migration and user onboarding',
    ],
    metric: { value: '5,000+', label: 'assets migrated' },
    stack: ['React', 'Fluent UI', 'Node.js', 'Express', 'SQL Server'],
  },
  {
    id: 'evitals',
    name: 'E-Vitals',
    context: 'SleekTeq Solutions · Mobile health app',
    category: 'Mobile',
    summary:
      'A mobile app that helps individuals and families track blood pressure, blood glucose, SpO2, temperature and BMI, with trend charts, plain-language health insights, reminders and premium subscriptions.',
    highlights: [
      'Lead backend developer: built the Express + TypeScript REST API on MySQL',
      'JWT auth with refresh-token rotation, Google sign-in and email OTP verification',
      'Paystack subscriptions with webhook verification',
      'Scheduled jobs for reminders, subscription expiry and Firebase push notifications',
      'Family profiles, server-side unit conversion and PDF / CSV health reports',
      'Contributed to the React Native (Expo) app with the frontend team',
    ],
    stack: ['React Native', 'Expo', 'TypeScript', 'Express', 'MySQL', 'Firebase', 'Paystack'],
    links: {
      appStore: 'https://apps.apple.com/gh/app/e-vitals/id6783346032',
      playStore: 'https://play.google.com/store/apps/details?id=com.sleekteq.evitals',
    },
    featured: true,
  },
  {
    id: 'jugop-hub',
    name: 'JUGOP HUB',
    context: 'Partnership · jugop-hub.com',
    category: 'Web',
    summary:
      'A request network for the global mining industry. Members post a need — equipment, parts, contractors, consultants, services or talent — and it is matched and broadcast to verified providers, who respond with offers. The requester compares, awards one, and both sides rate each other.',
    highlights: [
      'Built the platform with my partners: public site, member portal, admin console and REST API in one TypeScript monorepo',
      'One workflow for every kind of need — post, AI-ranked match, broadcast, offer, award, rate',
      'Express API on MySQL with Prisma, JWT auth, role-based permissions and subscription-gated access',
      'Real-time messaging and presence over Socket.IO, with in-app, email, SMS and push notification channels',
      'Paystack, Flutterwave and Stripe subscriptions, Azure Blob media storage and scheduled jobs for expiry and offer windows',
      'Claude-powered helpers that draft request descriptions and rank best-fit providers',
    ],
    stack: [
      'React',
      'Vite',
      'TypeScript',
      'Tailwind CSS',
      'Node.js',
      'Express',
      'Prisma',
      'MySQL',
      'Socket.IO',
      'Redis',
      'Azure',
    ],
    links: { live: 'https://www.jugop-hub.com' },
    featured: true,
  },
  {
    id: 'mine-entry',
    name: 'Mine Entry Authorization',
    context: 'AngloGold Ashanti · Obuasi',
    category: 'Enterprise',
    summary: 'Redeveloped an internal mine entry authorization process as a digital, multi-stage approval workflow.',
    highlights: ['Multi-level approval routing', 'Replaced a form-and-email process'],
    stack: ['SharePoint', 'Power Automate', 'InfoPath'],
  },
  {
    id: 'safedrive',
    name: 'SafeDrive AI',
    context: 'Final year project · KNUST',
    category: 'Embedded & AI',
    summary:
      'A dashboard-mounted device that watches a driver for signs of drowsiness and alerts them before an accident happens. A vision model runs on the edge, on the Arduino Nicla Vision itself, and events stream to a live monitoring dashboard.',
    highlights: [
      'Curated a dataset of facial images covering drowsiness patterns in varied lighting',
      'Trained an on-device FOMO object-detection model to track prolonged eye closure',
      'Raises visual and audible alerts when the driver’s eyes stay closed for two seconds or more',
      'Built on the Arduino Nicla Vision with an accelerometer, buzzer and LED, so the device only arms once the vehicle is moving',
      'Web dashboard for real-time monitoring and a record of alerts per driver',
      'Presented at the Department of Computer Engineering Technology Week (TWeek 2024)',
    ],
    stack: ['Arduino Nicla Vision', 'Edge Impulse', 'MicroPython', 'OpenMV', 'Flask'],
    image: {
      src: '/projects/safedrive-poster.webp',
      alt: 'SafeDrive AI research poster: introduction, methods, results, discussion and conclusion, with the system schematic, the built device and the monitoring dashboard.',
      caption: 'Research poster presented at Technology Week 2024, KNUST',
      width: 906,
      height: 1280,
    },
  },
  {
    id: 'internship-portal',
    name: 'Internship Registration Portal',
    context: 'Volta River Authority · Accra',
    category: 'Web',
    summary:
      'A full internship registration and application portal that streamlined how the organisation processes student applications.',
    highlights: ['Led backend development', 'Designed the database and application workflow'],
    stack: ['Flask', 'MySQL', 'React', 'Python'],
  },
  {
    id: 'simple-shell',
    name: 'Simple Shell',
    context: 'ALX Software Engineering',
    category: 'Systems',
    summary: 'A UNIX command interpreter written from scratch in C, handling parsing, PATH lookup and process execution.',
    highlights: ['Process creation with fork/execve', 'Built-ins and environment handling'],
    stack: ['C', 'Linux', 'System calls'],
    links: { code: 'https://github.com/Krem-dev/simple_shell' },
  },
];

export const experience: Role[] = [
  {
    title: 'Developer & Applications Support',
    org: 'AngloGold Ashanti',
    unit: 'Digital Technology Department',
    location: 'Obuasi Mine, Ghana',
    start: 'Nov 2024',
    end: 'Present',
    points: [
      'Build, configure and maintain business applications on Microsoft Power Platform (Power Apps, Power Automate, SharePoint).',
      'Test and validate in-house applications before deployment, resolving issues to ensure performance and data accuracy.',
      'Support end users across the mine — gathering feedback, resolving issues and turning needs into system improvements.',
      'Work with vendors on support and updates for DMSI MAINTelligence, Deswik, SKF Analysis and ETAP.',
      'Support Microsoft SQL Server databases and internal applications, including queries and troubleshooting.',
      'Build Power BI reports and dashboards for data-driven decisions across departments.',
      'Rebuilt an internal asset management system as a modern web platform and led its rollout to further operations.',
      'Build data integration pipelines with FME Workbench and SSIS packages, and support ArcGIS Survey123 field apps such as Safety Observation.',
    ],
  },
  {
    title: 'Co-founder & Lead Backend Engineer',
    org: 'SleekTeq Solutions',
    unit: 'Custom software, web and mobile apps',
    location: 'Ghana · Remote',
    start: 'Jan 2026',
    end: 'Present',
    concurrent: true,
    points: [
      'Co-founded a small software studio building custom web and mobile products for clients in Ghana.',
      'Lead the backend across products: API design, databases, authentication, payments and deployments.',
      'Shipped E-Vitals, a family health-tracking app, to both the App Store and Google Play.',
      'Work with a small frontend team, reviewing code and setting the technical direction.',
    ],
  },
  {
    title: 'IT Support & Backend Developer Intern',
    org: 'Volta River Authority',
    unit: 'Management & Information Systems',
    location: 'Accra, Ghana',
    start: 'Sep 2023',
    end: 'Nov 2023',
    points: [
      'Provided development and IT support in the Business Solutions Unit, helping streamline internal systems.',
      'Developed a full internship registration portal (Flask, MySQL) that improved how student applications are processed.',
    ],
  },
];

export const education: Study[] = [
  {
    school: 'Kwame Nkrumah University of Science and Technology',
    program: 'BSc Computer Engineering',
    start: 'Jan 2021',
    end: 'Nov 2024',
    note: 'First Class Honours',
    points: [
      'Coursework: Operating Systems, Software Engineering, Data Structures & Algorithms, Networking, Database Systems, Embedded Systems',
      'Research: Side-channel attacks on IoT devices — techniques and countermeasures',
    ],
  },
  {
    school: 'African Leadership X (ALX)',
    program: 'Software Engineering — Backend Specialization',
    start: 'Aug 2022',
    end: 'Nov 2023',
    points: ['Python, JavaScript, Linux, APIs, databases and backend architecture'],
  },
];

export const certifications: Certification[] = [
  {
    name: 'Azure Developer Associate (AZ-204)',
    issuer: 'Microsoft',
    date: 'Mar 2026',
    credentialUrl: 'https://learn.microsoft.com/en-gb/users/isaacamponsah-3463/credentials/b217260b45716af4',
  },
  {
    name: 'Azure Fundamentals (AZ-900)',
    issuer: 'Microsoft',
    credentialUrl: 'https://learn.microsoft.com/en-gb/users/isaacamponsah-3463/credentials/6133c5dc652499be',
  },
  { name: 'Power BI Reporting', issuer: 'Seidor Analytics', date: 'Nov 2025' },
  { name: 'Networking Technician Career Path', issuer: 'Cisco', date: 'Mar 2024' },
  {
    name: 'Cloud Security Foundations',
    issuer: 'AWS Academy',
    date: 'Mar 2024',
    credentialUrl: 'https://www.credly.com/badges/2f5a2a19-176e-4f89-8901-a6ae5fcb9361/public_url',
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: 'Languages', items: ['Python', 'JavaScript', 'TypeScript', 'C#', 'C', 'SQL'] },
  {
    group: 'Microsoft Platform',
    items: ['Power Apps', 'Power Automate', 'Power Pages', 'SharePoint', 'Power BI', 'Azure'],
  },
  {
    group: 'Backend & Web',
    items: ['Node.js', 'Express', 'Flask', 'Django', 'React', 'Fluent UI', 'Next.js', 'REST APIs', 'Prisma', 'Socket.IO'],
  },
  { group: 'Mobile', items: ['React Native', 'Expo', 'Firebase'] },
  {
    group: 'Integration & GIS',
    items: ['FME Workbench', 'SSIS', 'ArcGIS Survey123', 'ArcGIS', 'API integration', 'System interfacing'],
  },
  { group: 'Data & Reporting', items: ['SQL Server', 'MySQL', 'PostgreSQL', 'SQLite', 'Redis', 'Power BI', 'Data migration'] },
  { group: 'Infrastructure', items: ['IIS', 'Azure', 'AWS', 'Linux', 'Git', 'Networking'] },
  { group: 'Embedded & AI', items: ['Arduino Nicla Vision', 'Edge Impulse', 'OpenMV', 'MicroPython', 'FOMO'] },
  {
    group: 'Support & Delivery',
    items: [
      'Application support',
      'Testing & validation',
      'Deployment',
      'Requirements gathering',
      'Vendor coordination',
      'Hardware & network troubleshooting',
      'Technical documentation',
      'User guides & training',
    ],
  },
];
