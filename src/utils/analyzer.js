const SKILL_CATEGORIES = {
    "coreCS": ["DSA", "OOP", "DBMS", "OS", "Networks", "Networking"],
    "languages": ["Java", "Python", "JavaScript", "TypeScript", "C", "C++", "C#", "Go", "PHP", "Ruby", "Rust"],
    "web": ["React", "Next.js", "Node.js", "Express", "REST", "GraphQL", "Frontend", "Backend", "Fullstack", "HTML", "CSS", "Tailwind", "Bootstrap"],
    "data": ["SQL", "MongoDB", "PostgreSQL", "MySQL", "Redis", "Cassandra", "Database"],
    "cloud": ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "CI/CD", "Linux", "Terraform", "Ansible", "Jenkins"],
    "testing": ["Selenium", "Cypress", "Playwright", "JUnit", "PyTest", "Mocha", "Chai", "Testing", "Unit Testing", "Automation"]
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
    const hasDSA = extractedSkills.coreCS?.some(s => s.toLowerCase().includes("dsa"));
    const hasWeb = extractedSkills.web?.length > 0;

    if (isEnterprise && hasDSA) {
        return [
            { roundTitle: "Round 1: Online Assessment", focusAreas: ["DSA", "Aptitude"], whyItMatters: "To filter candidates based on algorithmic thinking and speed." },
            { roundTitle: "Round 2: Technical Interview I", focusAreas: ["Data Structures", "Algorithms"], whyItMatters: "Deep dive into problem-solving capabilities and edge case handling." },
            { roundTitle: "Round 3: Technical Interview II", focusAreas: ["Core CS", "Projects"], whyItMatters: "Verifying theoretical knowledge (OS/DBMS) and real-world application." },
            { roundTitle: "Round 4: Bar Raiser / HR", focusAreas: ["Behavioral", "Culture Fit"], whyItMatters: "Ensuring alignment with company leadership principles and long-term fit." }
        ];
    }

    if (!isEnterprise && hasWeb) {
        return [
            { roundTitle: "Round 1: Practical Coding Task", focusAreas: ["Live Stack Implementation"], whyItMatters: "Verifying if you can actually build features with their specific tech stack." },
            { roundTitle: "Round 2: System Discussion", focusAreas: ["Architecture", "Workflow"], whyItMatters: "Understanding your thought process on how components interact in a web app." },
            { roundTitle: "Round 3: Founder/Culture Fit", focusAreas: ["Vision", "Soft Skills"], whyItMatters: "Direct interaction with leadership to see if you can thrive in a fast-paced environment." }
        ];
    }

    return [
        { roundTitle: "Round 1: Initial Screening", focusAreas: ["Resume", "Basics"], whyItMatters: "Confirming basic eligibility and interest in the role." },
        { roundTitle: "Round 2: Technical Discussion", focusAreas: ["Fundamentals", "Skills"], whyItMatters: "Ensuring you possess the specific technical skills mentioned in the JD." },
        { roundTitle: "Round 3: Managerial Round", focusAreas: ["Projects", "Scenarios"], whyItMatters: "Reviewing your past work and how you handle teamwork or technical hurdles." },
        { roundTitle: "Round 4: HR Interview", focusAreas: ["Final Fit", "Salary"], whyItMatters: "Standard final check on culture, policies, and expectations." }
    ];
};

export const analyzeJD = (company = "", role = "", jdText = "") => {
    const lowerJD = jdText.toLowerCase();

    // 1. Skill Extraction
    const extractedSkills = {
        coreCS: [],
        languages: [],
        web: [],
        data: [],
        cloud: [],
        testing: [],
        other: []
    };
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

    // Default behavior if no skills extracted
    if (categoryCount === 0) {
        extractedSkills.other = ["Communication", "Problem solving", "Basic coding", "Projects"];
    }

    // 2. Base Score Calculation
    let baseScore = 35;
    baseScore += Math.min(categoryCount * 5, 30);
    if (company.trim()) baseScore += 10;
    if (role.trim()) baseScore += 10;
    if (jdText.length > 800) baseScore += 10;
    baseScore = Math.min(baseScore, 100);

    // 3. Questions Generation
    const questions = [];
    const allDetectedSkills = Object.values(extractedSkills).flat();
    allDetectedSkills.forEach(skill => {
        if (QUESTIONS_BANK[skill] && questions.length < 10) {
            questions.push(`[${skill}] ${QUESTIONS_BANK[skill]}`);
        }
    });

    // Fill remaining if needed
    if (questions.length < 10) {
        const filler = ["OS", "DBMS", "Networks", "OOP", "General"];
        filler.forEach(f => {
            if (questions.length < 10 && !questions.find(q => q.includes(`[${f}]`))) {
                questions.push(`[${f}] ${QUESTIONS_BANK[f]}`);
            }
        });
    }

    // 4. Intel & Round Mapping
    const companyIntel = getCompanyIntel(company);
    const roundMapping = getRoundMapping(companyIntel, extractedSkills);

    // 5. Checklist (Array of objects)
    const checklist = [
        {
            roundTitle: "Round 1: Aptitude / Basics",
            items: [
                "Quantitative Aptitude & Logical Reasoning",
                "Core Language Basics (Syntax, Memory)",
                "Time & Space Complexity basics",
                "Company history & Values",
                "Resume walkthrough preparation"
            ]
        },
        {
            roundTitle: "Round 2: DSA + Core CS",
            items: [
                "Array & String manipulation",
                "Linked Lists & Trees",
                extractedSkills.coreCS.length > 0 ? `Deep dive into ${extractedSkills.coreCS.join(', ')}` : "Standard Core CS (OS/DBMS)",
                "Sorting & Searching optimization",
                "Dynamic Programming patterns"
            ]
        },
        {
            roundTitle: "Round 3: Tech Interview",
            items: [
                "Project architecture explanation",
                extractedSkills.web.length > 0 ? `Frontend/Backend specifics (${extractedSkills.web.join(', ')})` : "Standard Stack review",
                extractedSkills.data.length > 0 ? `Database design with ${extractedSkills.data.join(', ')}` : "System Design basics",
                "Code quality & Design Patterns",
                "Live coding/Problem solving"
            ]
        },
        {
            roundTitle: "Round 4: Managerial / HR",
            items: [
                "Self-introduction (The 90-second pitch)",
                "Strengths & Weaknesses (with examples)",
                "Why this Company/Role?",
                "Conflict resolution scenarios",
                "Long-term career goals alignment"
            ]
        }
    ];

    // 6. 7-Day Plan (Array of objects)
    const plan7Days = [
        {
            day: "Day 1–2",
            focus: "Basics + Core CS",
            tasks: [
                "Revise Core Language Fundamentals",
                ...(extractedSkills.coreCS.length > 0 ? extractedSkills.coreCS : ["OS basics", "DBMS basics"])
            ]
        },
        {
            day: "Day 3–4",
            focus: "DSA + Coding",
            tasks: [
                "Leetcoding: Easy to Medium problems",
                "Focus on recursion/backtracking",
                "Mock coding assessment"
            ]
        },
        {
            day: "Day 5",
            focus: "Project + Resume",
            tasks: [
                "Review every line of your Resume",
                "Deep dive into Architecture diagram",
                ...(extractedSkills.web.length > 0 ? extractedSkills.web : ["Deployment basics"])
            ]
        },
        {
            day: "Day 6",
            focus: "Mock Interview",
            tasks: [
                "Peer-to-peer mock interview",
                "Behavioral questions practice",
                "Voice/Body language check"
            ]
        },
        {
            day: "Day 7",
            focus: "Revision + Weak Areas",
            tasks: [
                "Formula sheet revision",
                "Fast-review of weak patterns",
                "Relax & Final confidence check"
            ]
        }
    ];

    return {
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        company,
        role,
        jdText,
        extractedSkills,
        roundMapping,
        checklist,
        plan7Days,
        questions,
        baseScore,
        skillConfidenceMap: {},
        finalScore: baseScore,
        companyIntel // Optional but keep for UI
    };
};

export const saveToHistory = (entry) => {
    try {
        const history = JSON.parse(localStorage.getItem('placement_prep_history') || '[]');
        history.unshift(entry);
        localStorage.setItem('placement_prep_history', JSON.stringify(history));
        return entry;
    } catch (e) {
        console.error("Failed to save to history", e);
        return entry;
    }
};

export const getHistory = () => {
    try {
        const rawHistory = JSON.parse(localStorage.getItem('placement_prep_history') || '[]');
        // Filter out corrupted entries
        return rawHistory.filter(entry => {
            return entry && entry.id && entry.jdText && entry.extractedSkills;
        });
    } catch (e) {
        console.error("Failed to load history", e);
        return [];
    }
};

export const getHistoryItem = (id) => {
    const history = getHistory();
    return history.find(item => item.id === id);
};

export const updateHistoryItem = (id, updates) => {
    const history = getHistory();
    const index = history.findIndex(item => item.id === id);
    if (index !== -1) {
        const updatedEntry = {
            ...history[index],
            ...updates,
            updatedAt: new Date().toISOString()
        };

        // Recalculate finalScore if skillConfidenceMap changed
        if (updates.skillConfidenceMap) {
            let bonus = 0;
            Object.values(updates.skillConfidenceMap).forEach(status => {
                if (status === 'know') bonus += 2;
                if (status === 'practice') bonus -= 2;
            });
            updatedEntry.finalScore = Math.min(100, Math.max(0, updatedEntry.baseScore + bonus));
        }

        history[index] = updatedEntry;
        localStorage.setItem('placement_prep_history', JSON.stringify(history));
        return updatedEntry;
    }
    return null;
};
