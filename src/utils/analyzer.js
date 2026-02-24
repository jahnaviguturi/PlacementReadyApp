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

    // 4. Checklist
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

    // 5. 7-Day Plan
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
        plan
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
