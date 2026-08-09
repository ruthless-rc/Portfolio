export const personalInfo = {
  name: "Rishi Choudhary",
  title: "Computer Science Engineer & Developer",
  subTitle: "Android & Web Tech | Robotics Lead | AI Solutions",
  degree: "B.E. Computer Science Engineering (2023 - 2027)",
  institution: "Shree Swaminarayan Institute of Technology",
  location: "Ahmedabad, Gujarat, India",

  email: "rishimadeforindia@gmail.com",
  photo: "/rishi-photo.jpg",
  bio: "Passionate Computer Science undergraduate engineering solutions at the intersection of Mobile App Development, Web Tech, IoT Systems, and AI Prompt Workflows. Leadership lead for campus robotics and hackathon operations.",
  socials: {
    github: "https://github.com",
    linkedin: "https://www.linkedin.com/in/rishi-choudhary-0b5baa31b/",
    instagram: "https://www.instagram.com/l__rishi_choudhary__l?igsh=eWUxNHdvODZ4MmF6",
    email: "mailto:rishimadeforindia@gmail.com",

  }
};

export const heroStats = [
  { value: "4+", label: "Key Systems Built", desc: "IoT, AI & Web Tech" },
  { value: "40+", label: "Volunteers Lead", desc: "AI Hackathons" },
  { value: "3+", label: "Certifications", desc: "Android, Play & Prompting" },
  { value: "Robotics", label: "Club President", desc: "SSIT Campus" }
];

export const strengths = [
  {
    title: "Problem Solving & Prototyping",
    description: "Rapidly transforming abstract logic into working software & hardware systems.",
    icon: "Zap",
    color: "from-zinc-800 to-zinc-950"
  },
  {
    title: "Team Leadership & Coordination",
    description: "Experienced in managing 40–50 volunteer crews for high-stakes tech hackathons.",
    icon: "Users",
    color: "from-zinc-800 to-zinc-950"
  },
  {
    title: "Public Speaking & Workshops",
    description: "Delivering technical seminars on Arduino, microcontrollers, and software design.",
    icon: "Presentation",
    color: "from-zinc-800 to-zinc-950"
  },
  {
    title: "Product-Oriented Engineering",
    description: "Focused on clean UX, modular architecture, and real-world practical utility.",
    icon: "Sparkles",
    color: "from-zinc-800 to-zinc-950"
  }
];

export const skillCategories = [
  {
    category: "Languages & Frameworks",
    icon: "Code",
    skills: [
      { name: "Python", level: 85, badge: "Intermediate", icon: "FileCode" },
      { name: "C / C++", level: 80, badge: "Intermediate", icon: "Cpu" },
      { name: "Java", level: 82, badge: "Intermediate", icon: "Coffee" },
      { name: "JavaScript", level: 78, badge: "Foundational", icon: "Code2" }
    ]
  },
  {
    category: "Web & Mobile Ecosystem",
    icon: "Globe",
    skills: [
      { name: "HTML5 & CSS3", level: 92, badge: "Advanced", icon: "Layout" },
      { name: "Android Studio (Java/Kotlin)", level: 84, badge: "Intermediate", icon: "Smartphone" },
      { name: "Vite / Modern JS", level: 75, badge: "Foundational", icon: "Zap" }
    ]
  },
  {
    category: "Core CS Fundamentals",
    icon: "Database",
    skills: [
      { name: "Data Structures & Algorithms", level: 78, badge: "Foundational", icon: "Binary" },
      { name: "Computer Architecture", level: 80, badge: "Academic", icon: "HardDrive" }
    ]
  },
  {
    category: "AI & Embedded Systems",
    icon: "BrainCircuit",
    skills: [
      { name: "LLM Prompt Engineering", level: 90, badge: "Certified", icon: "BrainCircuit" },
      { name: "Arduino / Microcontrollers", level: 86, badge: "Robotics Lead", icon: "Cpu" },
      { name: "IoT Sensor Integration", level: 84, badge: "Intermediate", icon: "Zap" },
      { name: "Google Play Console", level: 78, badge: "Certified", icon: "Play" }
    ]
  }
];

export const projects = [
  {
    id: "fire-detection",
    title: "Fire Detection & Hazard Alert System",
    category: "IoT & Smart Systems",
    shortCategory: "IoT",
    image: "/iot.png",
    description: "Automated early fire hazard detection platform equipped with multi-sensor smoke, heat, and flame tracking for instant emergency alerts.",
    fullDescription: "Built an embedded IoT telemetry platform utilizing thermal sensors, smoke detectors, and automated alarm systems to detect early-stage fire indicators in residential or industrial premises. Features real-time threshold monitoring and instant safety alerts.",
    techStack: ["Python", "IoT Sensors", "C++", "Embedded Logic"],
    features: [
      "Real-time sensor telemetry & multi-threshold safety triggers",
      "Automated audio-visual emergency signal dispatches",
      "Industrial sensor calibration with robust hardware fail-safes"
    ],
    metrics: "Instant <1s hazard detection response time",
    github: "https://github.com",
    demo: "",
    gradient: "from-zinc-800 to-zinc-950"
  },
  {
    id: "career-setu",
    title: "Career Setu — Career Navigation Platform",
    category: "Web Application",
    shortCategory: "Web",
    image: "/cs.png",
    description: "A digital career mapping web app connecting students with skill roadmaps, educational hubs, and location-aware opportunities.",
    fullDescription: "Career Setu is a comprehensive career guidance web platform that pairs interactive skill acquisition roadmaps with location-based educational counseling hubs powered by the Google Maps API. Built for intuitive discovery and smooth responsive browsing.",
    techStack: ["HTML5", "CSS3", "JavaScript", "Google Maps API"],
    features: [
      "Interactive map overlays pinpointing nearby skill counseling centers",
      "Structured step-by-step career path roadmaps",
      "High-contrast glassmorphism mobile-first interface"
    ],
    metrics: "Empowering 100+ student guidance pathways",
    github: "https://github.com",
    demo: "",
    gradient: "from-zinc-800 to-zinc-950"
  },
  {
    id: "ai-assistant",
    title: "AI Virtual Assistant & Workflow Engine",
    category: "AI & Automation",
    shortCategory: "AI",
    image: "/ai.png",
    description: "Intelligent virtual assistant utilizing modern prompt engineering techniques for task automation and interactive query resolution.",
    fullDescription: "Developed a modular AI assistant application leveraging structured prompt engineering pipelines to handle complex query contexts, automate daily task schedules, and integrate custom micro-tools for enhanced developer productivity.",
    techStack: ["Python", "Prompt Engineering", "REST APIs", "NLP"],
    features: [
      "Custom multi-step prompt execution pipelines",
      "Contextual natural language task execution",
      "Extensible modular API architecture for tool calling"
    ],
    metrics: "Automates repetitive daily developer routines",
    github: "https://github.com",
    demo: "",
    gradient: "from-zinc-800 to-zinc-950"
  },
  {
    id: "hostel-management",
    title: "Hostel Operations & Management System",
    category: "Native Android & Web App",
    shortCategory: "Software",
    image: "/hostel.png",
    description: "Modern Native Android & Web application engineered for dynamic room allocation, bed inventory monitoring, and gender-partitioned hostel administration.",
    fullDescription: "The Hostel Management System is an end-to-end platform designed to solve room allocation friction, prevent double bookings, and eliminate manual register paperwork. Built using modern Android architecture components (Jetpack Room, LiveData, ViewModel, Kotlin Coroutines, ViewBinding) and deployed as a responsive web platform.",
    techStack: ["Kotlin 1.9+", "Android SDK 36", "Jetpack Room DB", "MVVM + Repository", "Coroutines", "ViewBinding", "Gradle 8.9"],
    features: [
      "Role-Based Security: Privilege separation between Institutional Administrators and Resident Students",
      "Gender-Segregated Allocation Logic: Automated room visibility filtering to strictly display Male rooms to Male students and Female rooms to Female students",
      "Real-Time Analytics & Inventory Tracking: Dynamic computation of total capacity, total beds, occupied beds, and real-time available beds",
      "Atomic Bed Booking Mechanism: Thread-safe decrement of available bed counts upon instant student reservation",
      "Offline-First Persistence: Powered by SQLite via Android Jetpack Room DB (UserDao & RoomDao interfaces)"
    ],
    metrics: "Instant <1s thread-safe bed booking & real-time analytics",
    github: "https://github.com",
    demo: "https://hostel-management-app-nu.vercel.app/login",
    liveUrl: "https://hostel-management-app-nu.vercel.app/login",
    gradient: "from-zinc-800 to-zinc-950",
    architectureSpecs: {
      package: "com.example.hostel",
      targetSdk: "Android SDK 36 (Min SDK 24)",
      runtime: "Kotlin 1.9+ / JVM 17",
      pattern: "MVVM + Repository Pattern",
      database: "Jetpack Room DB 2.7.0-alpha01 (SQLite)",
      concurrency: "Kotlin Coroutines (Dispatchers.IO)",
      stateManagement: "ViewModel & LiveData 2.9.0"
    },
    reportSections: [
      {
        tabId: "overview",
        tabLabel: "📋 Project Overview",
        heading: "Project Overview & Objectives",
        content: "Managing educational institution residential hostels manually using paper registers leads to double bookings, data inconsistency, and lack of occupancy visibility. This system solves operational challenges by providing a synchronized, role-driven platform with full administrative governance and student self-service."
      },
      {
        tabId: "architecture",
        tabLabel: "🏗️ MVVM Architecture",
        heading: "System Architecture & Layer Responsibilities",
        content: "Implements Google's recommended MVVM (Model-View-ViewModel) + Repository pattern. UI View Layer (LoginActivity, RegisterActivity, AdminDashboardActivity, StudentDashboardActivity) handles rendering, ViewModel holds state, and Repository guarantees Dispatchers.IO safety."
      },
      {
        tabId: "database",
        tabLabel: "🗄️ Database & Schema",
        heading: "Room Entities & DAO Specifications",
        content: "Room DB consists of two core entities: 'User' (id, name, collegeName, password, gender, role) and 'Room' (id, roomNumber, genderType, totalBeds, availableBeds). UserDao & RoomDao execute atomic SQL operations for room allocation and bed reservations."
      },
      {
        tabId: "workflows",
        tabLabel: "⚡ Modules & Workflows",
        heading: "Admin Governance & Student Self-Service Modules",
        content: "Admin Module provides dynamic occupancy dashboards (Occupied Beds = Total Beds - Available Beds) and room configuration. Student Module enforces gender filtering (Male students only see Male rooms) and instant bed reservation with color-coded availability badges."
      }
    ]
  }
];

export const leadershipExperience = [
  {
    role: "Lead of Robotics Club",
    organization: "Shree Swaminarayan Institute of Technology",
    period: "2024 – Present",
    badge: "Leadership Role",
    description: "Spearheading the campus Robotics Club. Organise practical workshops on microcontrollers, Arduino programming, and lead student teams to build autonomous robocars.",
    tags: ["Robotics", "Arduino", "Leadership", "Hands-on Workshops"]
  },
  {
    role: "Hackathon Organizer — AI Hackathon",
    organization: "Inter-College AI Event",
    period: "March 12 – 13, 2026",
    badge: "Major Event",
    description: "Managed logistics and team operations for an inter-college AI hackathon, directing a volunteer team of 40–50 students to ensure seamless participant support.",
    tags: ["Event Logistics", "Team Management", "AI Hackathon", "Volunteer Lead"]
  },
  {
    role: "Logistics Lead — 36-Hour Hackathon",
    organization: "Annual Tech Fest",
    period: "September 14 – 15, 2025",
    badge: "36-Hour Hackathon",
    description: "Coordinated volunteer crews for a continuous 36-hour hackathon, supervising venue arrangements, judging schedules, and mentor support.",
    tags: ["Operations", "36-Hour Event", "Coordination", "Judging Schedules"]
  },
  {
    role: "Robo Akhada Event Convener",
    organization: "Engineer's Day Tech Fest",
    period: "September 15, 2025",
    badge: "Flagship Arena",
    description: "Organized and hosted the flagship combat robotics arena competition ('Robo Akhada') during Engineer's Day, orchestrating safety rules, match scoring, and public announcements.",
    tags: ["Robotics Competition", "Public Speaking", "Fest Hosting"]
  }
];

export const education = [
  {
    degree: "B.E. in Computer Science Engineering",
    institution: "Shree Swaminarayan Institute of Technology",
    period: "2023 – 2027",
    score: "Undergraduate Degree",
    status: "Current",
    details: "Focusing on Core Computer Science principles, Software Engineering, Mobile App Development, and Embedded Systems."
  },
  {
    degree: "Class XII (HSC) — Senior Secondary",
    institution: "CBSE Board",
    period: "2020 – 2021",
    score: "66%",
    status: "Completed",
    details: "Science stream with Physics, Chemistry, and Mathematics focus."
  },
  {
    degree: "Class X (SSC) — Secondary Education",
    institution: "CBSE Board",
    period: "2018 – 2019",
    score: "66%",
    status: "Completed",
    details: "Secondary academic curriculum with foundational math & science."
  }
];

export const certifications = [
  {
    title: "Android Development",
    issuer: "Industry Specialization",
    icon: "Smartphone",
    color: "from-zinc-800 to-zinc-950",
    desc: "Mobile app creation using Android Studio, Java/Kotlin UI components, and lifecycle architecture."
  },
  {
    title: "Prompt Engineering",
    issuer: "AI Specialization",
    icon: "BrainCircuit",
    color: "from-zinc-800 to-zinc-950",
    desc: "Mastering LLM prompt strategies, structured outputs, and agentic tool integrations."
  },
  {
    title: "Google Play Academy",
    issuer: "Google",
    icon: "Play",
    color: "from-zinc-800 to-zinc-950",
    desc: "Android store listing optimization, publishing standards, and Play ecosystem guidelines."
  }
];

export const trainingMentorship = {
  title: "Android App Development (1-Month Intensive)",
  program: "Hands-on Technical Training",
  tech: "Android Studio, Java/Kotlin, UI Lifecycle",
  summary: "Completed rigorous 1-month hands-on application development training. Designed responsive mobile screens, implemented local database features, and built functional Android applications."
};
