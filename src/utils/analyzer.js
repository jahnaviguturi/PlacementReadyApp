const SKILL_CATEGORIES = {
    "Core CS": ["DSA", "OOP", "DBMS", "OS", "Networks", "Networking"],
    "Languages": ["Java", "Python", "JavaScript", "TypeScript", "C", "C++", "C#", "Go", "PHP", "Ruby", "Rust"],
    "Web": ["React", "Next.js", "Node.js", "Express", "REST", "GraphQL", "Frontend", "Backend", "Fullstack", "HTML", "CSS", "Tailwind", "Bootstrap"],
    "Data": ["SQL", "MongoDB", "PostgreSQL", "MySQL", "Redis", "Cassandra", "Database"],
    "Cloud/DevOps": ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "CI/CD", "Linux", "Terraform", "Ansible", "Jenkins"],
    "Testing": ["Selenium", "Cypress", "Playwright", "JUnit", "PyTest", "Mocha", "Chai", "Testing", "Unit Testing", "Automation"]
};

const QUESTIONS_BANK = {
    "SQL": "Explain indexing and when it helps optimize performance.",
    "React": "Explain state management options and when to use Context API vs Redux.",
    "DSA": "How would you optimize search in a large sorted dataset?",
    "Java": "Explain the difference between HashMap and ConcurrentHashMap.",
    "Node.js": "How does the Node.js event loop work?",
    "DBMS": "Explain ACID properties and why they are important.",
    "OS": "What is the difference between a process and a thread?",
    "Networks": "Explain the 3-way handshake in TCP.",
    "Docker": "How do Docker layers help in optimizing image size?",
    "CI/CD": "What is the difference between Continuous Delivery and Continuous Deployment?",
    "Python": "Explain decorators and true use cases for them.",
    "JavaScript": "What is a closure and how can it lead to memory leaks?",
    "System Design": "How would you design a rate limiter for a high-traffic API?",
    "OOP": "Explain the difference between Abstraction and Encapsulation.",
    "General": "Describe a difficult technical challenge you solved."
};

const KNOWN_ENTERPRISES = [
    "amazon", "google", "microsoft", "meta", "apple", "netflix", "tcs", "infosys",
    "wipro", "accenture", "cognizant", "ibm", "capgemini", "hcl", "dell",
    "oracle", "sap", "adobe", "salesforce", "intel", "nvidia", "cisco"
];

const getCompanyIntel = (companyName) => {
    const name = companyName.toLowerCase().trim();
    if (!name) return null;

    const isEnterprise = KNOWN_ENTERPRISES.some(e => name.includes(e));
    const category = isEnterprise ? "Enterprise (2000+)" : "Startup (<200)";
    const hiringFocus = isEnterprise
        ? "Highly structured interviews focusing on DSA, Core CS fundamentals, and scalability."
        : "Practical problem solving, tech stack depth, and ability to ship features quickly.";

    return {
        name: companyName,
        industry: "Technology Services",
        sizeCategory: category,
        hiringFocus: hiringFocus,
        isEnterprise: isEnterprise
    };
};

const getRoundMapping = (intel, extractedSkills) => {
    const isEnterprise = intel?.isEnterprise;
    const hasDSA = extractedSkills["Core CS"]?.some(s => s.toLowerCase().includes("dsa"));
    const hasWeb = extractedSkills["Web"]?.length > 0;

    if (isEnterprise && hasDSA) {
        return [
            { name: "Round 1: Online Assessment", focus: "DSA + Aptitude", why: "To filter candidates based on algorithmic thinking and speed." },
            { name: "Round 2: Technical Interview I", focus: "Data Structures & Algorithms", why: "Deep dive into problem-solving capabilities and edge case handling." },
            { name: "Round 3: Technical Interview II", focus: "Core CS + Projects", why: "Verifying theoretical knowledge (OS/DBMS) and real-world application." },
            { name: "Round 4: Bar Raiser / HR", focus: "Behavioral & Culture Fit", why: "Ensuring alignment with company leadership principles and long-term fit." }
        ];
    }

    if (!isEnterprise && hasWeb) {
        return [
            { name: "Round 1: Practical Coding Task", focus: "Live Stack Implementation", why: "Verifying if you can actually build features with their specific tech stack." },
            { name: "Round 2: System Discussion", focus: "Architecture & Workflow", why: "Understanding your thought process on how components interact in a web app." },
            { name: "Round 3: Founder/Culture Fit", focus: "Vision & Soft Skills", why: "Direct interaction with leadership to see if you can thrive in a fast-paced environment." }
        ];
    }

    return [
        { name: "Round 1: Initial Screening", focus: "Resume & Basics", why: "Confirming basic eligibility and interest in the role." },
        { name: "Round 2: Technical Discussion", focus: "Fundamentals & Skills", why: "Ensuring you possess the specific technical skills mentioned in the JD." },
        { name: "Round 3: Managerial Round", focus: "Projects & Scenarios", why: "Reviewing your past work and how you handle teamwork or technical hurdles." },
        { name: "Round 4: HR Interview", focus: "Final Fit & Salary", why: "Standard final check on culture, policies, and expectations." }
    ];
};

export const analyzeJD = (company, role, jdText) => {
    const lowerJD = jdText.toLowerCase();

    // 1. Skill Extraction
    const extractedSkills = {};
    let categoryCount = 0;

    Object.entries(SKILL_CATEGORIES).forEach(([category, skills]) => {
        const found = skills.filter(skill => {
            const escapedSkill = skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(`\\b${escapedSkill}\\b`, 'i');
            return regex.test(lowerJD);
        });
        if (found.length > 0) {
            extractedSkills[category] = found;
            categoryCount++;
        }
    });

    if (Object.keys(extractedSkills).length === 0) {
        extractedSkills["General"] = ["General fresher stack"];
    }

    // 2. Readiness Score
    let readinessScore = 35;
    readinessScore += Math.min(categoryCount * 5, 30);
    if (company.trim()) readinessScore += 10;
    if (role.trim()) readinessScore += 10;
    if (jdText.length > 800) readinessScore += 10;
    readinessScore = Math.min(readinessScore, 100);

    // 3. Questions Generation
    const questions = [];
    const allDetectedSkills = Object.values(extractedSkills).flat();
    allDetectedSkills.forEach(skill => {
        if (QUESTIONS_BANK[skill] && questions.length < 10) {
            questions.push({ skill, question: QUESTIONS_BANK[skill] });
        }
    });

    // Fill remaining if needed
    if (questions.length < 10) {
        const filler = ["OS", "DBMS", "Networks", "OOP", "General"];
        filler.forEach(f => {
            if (questions.length < 10 && !questions.find(q => q.skill === f)) {
                questions.push({ skill: f, question: QUESTIONS_BANK[f] });
            }
        });
    }

    // 4. Intel & Round Mapping
    const companyIntel = getCompanyIntel(company);
    const roundMapping = getRoundMapping(companyIntel, extractedSkills);

    // 5. Checklist
    const checklist = {
        "Round 1: Aptitude / Basics": [
            "Quantitative Aptitude & Logical Reasoning",
            "Core Language Basics (Syntax, Memory)",
            "Time & Space Complexity basics",
            "Company history & Values",
            "Resume walkthrough preparation"
        ],
        "Round 2: DSA + Core CS": [
            "Array & String manipulation",
            "Linked Lists & Trees",
            extractedSkills["Core CS"] ? `Deep dive into ${extractedSkills["Core CS"].join(', ')}` : "Standard Core CS (OS/DBMS)",
            "Sorting & Searching optimization",
            "Dynamic Programming patterns"
        ],
        "Round 3: Tech Interview": [
            "Project architecture explanation",
            extractedSkills["Web"] ? `Frontend/Backend specifics (${extractedSkills["Web"].join(', ')})` : "Standard Stack review",
            extractedSkills["Data"] ? `Database design with ${extractedSkills["Data"].join(', ')}` : "System Design basics",
            "Code quality & Design Patterns",
            "Live coding/Problem solving"
        ],
        "Round 4: Managerial / HR": [
            "Self-introduction (The 90-second pitch)",
            "Strengths & Weaknesses (with examples)",
            "Why this Company/Role?",
            "Conflict resolution scenarios",
            "Long-term career goals alignment"
        ]
    };

    // 6. 7-Day Plan
    const plan = {
        "Day 1–2: Basics + Core CS": [
            "Revise Core Language Fundamentals",
            ... (extractedSkills["Core CS"] || ["OS basics", "DBMS basics"])
        ],
        "Day 3–4: DSA + Coding": [
            "Leetcoding: Easy to Medium problems",
            "Focus on recursion/backtracking",
            "Mock coding assessment"
        ],
        "Day 5: Project + Resume": [
            "Review every line of your Resume",
            "Deep dive into Architecture diagram",
            ... (extractedSkills["Web"] || ["Deployment basics"])
        ],
        "Day 6: Mock Interview": [
            "Peer-to-peer mock interview",
            "Behavioral questions practice",
            "Voice/Body language check"
        ],
        "Day 7: Revision + Weak Areas": [
            "Formula sheet revision",
            "Fast-review of weak patterns",
            "Relax & Final confidence check"
        ]
    };

    return {
        extractedSkills,
        readinessScore,
        questions,
        checklist,
        plan,
        companyIntel,
        roundMapping
    };
};

export const saveToHistory = (data) => {
    const history = JSON.parse(localStorage.getItem('placement_prep_history') || '[]');
    const entry = {
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        ...data
    };
    history.unshift(entry);
    localStorage.setItem('placement_prep_history', JSON.stringify(history));
    return entry;
};

export const getHistory = () => {
    return JSON.parse(localStorage.getItem('placement_prep_history') || '[]');
};

export const getHistoryItem = (id) => {
    const history = getHistory();
    return history.find(item => item.id === id);
};

export const updateHistoryItem = (id, updates) => {
    const history = getHistory();
    const index = history.findIndex(item => item.id === id);
    if (index !== -1) {
        history[index] = { ...history[index], ...updates };
        localStorage.setItem('placement_prep_history', JSON.stringify(history));
        return history[index];
    }
    return null;
};
