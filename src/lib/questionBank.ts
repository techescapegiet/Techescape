// src/lib/questionBank.ts

export type AcademicYear = "1st Year" | "2nd Year" | "3rd Year" | "4th Year";
export type Department = "cse" | "csM" | "csd" | "ece" | "ce" | "mech";

export const LEVEL_BRIEFINGS: Record<number, { title: string; objective: string; instruction: string }> = {
    1: {
        title: "BRUTE FORCE: WORD SEARCH",
        objective: "The hacker has hidden the first key fragment within the mainframe's terminology database.",
        instruction: "Search the 9x9 matrix for the terms matching the provided clues. Complete the set to extract the fragment."
    },
    2: {
        title: "CRYPTIC CONCEPTS: CONCEPTUAL BLANKS",
        objective: "Node 2 is protected by cryptographic hints based on your core curriculum.",
        instruction: "Identify the missing technical concepts to bypass this node's security. Each correct answer brings you closer to the fragment."
    },
    3: {
        title: "AUTHENTICATION BYPASS: MCQ CHALLENGE",
        objective: "A dual-authentication lock is active. You must prove your technical proficiency.",
        instruction: "Solve the branch-specific technical questions to override the security lock and retrieve the fragment."
    },
    4: {
        title: "LOGIC REPAIR: DEBUGGING PROTOCOL",
        objective: "The hacker left corrupted logic in the system, preventing deeper access.",
        instruction: "Select your preferred language (C, Java, or Python) and fix the syntax errors in the provided code snippets."
    },
    5: {
        title: "ULTIMATE BREACH: THE CROSS-MASHUP",
        objective: "Final security layer. A complex mashup puzzle stands between you and the final key fragment.",
        instruction: "Solve the crossword and handle the interspersed logic challenges to complete the extraction."
    },
    6: {
        title: "MASTER RECONSTRUCTION",
        objective: "All fragments recovered. The GIET server is ready for restoration.",
        instruction: "Assemble the recovered fragments in the correct sequence to reconstruct the master key and end the hacker's control."
    }
};

// -----------------------------------------------------------------------------------
// LEVEL 1: CROSSWORD (WORD SEARCH)
// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------
// LEVEL 1: CROSSWORD (WORD SEARCH)
// -----------------------------------------------------------------------------------
export interface L1Word {
    word: string;
    clue: string;
}

const L1_WORDS: Record<AcademicYear, Record<Department, L1Word[]>> = {
    "1st Year": {
        "cse": [
            { word: "ALGO", clue: "Steps to solve a problem." },
            { word: "CODE", clue: "Translates code to machine language." },
            { word: "PTR", clue: "Stores a memory address." },
            { word: "ARRAY", clue: "List of items in memory." },
            { word: "FUNC", clue: "Reusable block of code." },
            { word: "VAR", clue: "Named storage in memory." },
            { word: "SYNTAX", clue: "Rules of a language." },
            { word: "BINARY", clue: "Base-2 number system." }
        ],
        "ece": [
            { word: "RESISTOR", clue: "Limits electric current." },
            { word: "VOLTAGE", clue: "Electric potential." },
            { word: "CURRENT", clue: "Flow of charge." },
            { word: "DIODE", clue: "One-way current flow." },
            { word: "CIRCUIT", clue: "Path for electricity." },
            { word: "CHIP", clue: "Amplify or switch signals." },
            { word: "SENSOR", clue: "Detects physical input." },
            { word: "BATTERY", clue: "Stores energy." }
        ],
        "mech": [
            { word: "FORCE", clue: "Push or pull." },
            { word: "MOTION", clue: "Moving state." },
            { word: "ENERGY", clue: "Ability to do work." },
            { word: "ENGINE", clue: "Converts heat to work." },
            { word: "TORQUE", clue: "Twisting force." },
            { word: "GEAR", clue: "Toothed wheel." },
            { word: "LEVER", clue: "Rigid bar for lifting." },
            { word: "PISTON", clue: "Moving cylinder part." }
        ],
        "ce": [
            { word: "BRIDGE", clue: "Structure over gap." },
            { word: "CEMENT", clue: "Binding material." },
            { word: "SURVEY", clue: "Mapping land." },
            { word: "STRESS", clue: "Force on area." },
            { word: "COLUMN", clue: "Vertical support." },
            { word: "STRUCT", clue: "Building frame." },
            { word: "DAM", clue: "Barrier for water." },
            { word: "SOIL", clue: "Earth material." }
        ],
        "csM": [
            { word: "PYTHON", clue: "AI coding language." },
            { word: "NEURAL", clue: "Brain-like network." },
            { word: "DATA", clue: "Set of information." },
            { word: "LEARN", clue: "Improve from data." },
            { word: "MODEL", clue: "AI representation." },
            { word: "LAYER", clue: "Part of a network." },
            { word: "WEIGHT", clue: "Signal strength." },
            { word: "TRAIN", clue: "Teach an AI." }
        ],
        "csd": [
            { word: "DESIGN", clue: "User experience plan." },
            { word: "LAYOUT", clue: "Visual arrangement." },
            { word: "COLOR", clue: "Visual property." },
            { word: "WEBSITE", clue: "Online page set." },
            { word: "INTERFACE", clue: "How users interact." },
            { word: "BUTTON", clue: "Clickable item." },
            { word: "GRID", clue: "Alignment system." },
            { word: "FONT", clue: "Text style." }
        ]
    },
    "2nd Year": {
        "cse": [
            { word: "OBJECT", clue: "An instance of a class." },
            { word: "CLASS", clue: "A blueprint for creating objects." },
            { word: "EXTENDS", clue: "Mechanism where one class acquires the properties of another." },
            { word: "POLY", clue: "Ability of an object to take on many forms." },
            { word: "ENCODER", clue: "Wrapping of data and methods into a single unit." },
            { word: "LIST", clue: "Linear data structure with nodes." },
            { word: "STACK", clue: "Linear structure following LIFO." },
            { word: "QUEUE", clue: "Linear structure following FIFO." }
        ],
        "ece": [
            { word: "AMP", clue: "A device that increases the power of a signal." },
            { word: "WAVE", clue: "Electronic circuit producing periodic signal." },
            { word: "MODEM", clue: "Process of varying properties of a waveform." },
            { word: "OPAMP", clue: "Operational Amplifier." },
            { word: "SIGNAL", clue: "Physical quantity varying with time." },
            { word: "SYSTEM", clue: "Combination of components acting together." },
            { word: "BOOLEAN", clue: "Type of algebra used in digital logic." },
            { word: "LOGIC", clue: "The study of formal reasoning." }
        ],
        "mech": [
            { word: "MOTION", clue: "The branch of mechanics concerned with motion." },
            { word: "DYNAMICS", clue: "Mechanics concerned with motion under forces." },
            { word: "THERMO", clue: "Relationship between heat and other energy." },
            { word: "FLUID", clue: "Substance that has no fixed shape." },
            { word: "ENTROPY", clue: "Measure of disorder in a system." },
            { word: "ENTHALPY", clue: "Thermodynamic property (U + PV)." },
            { word: "CARNOT", clue: "Efficient heat engine cycle scientist." },
            { word: "VISCOS", clue: "Measure of fluid resistance to flow." }
        ],
        "ce": [
            { word: "FLUID", clue: "A substance that flows." },
            { word: "MECHANIC", clue: "Science of behavior of physical bodies." },
            { word: "SURVEY", clue: "Technique of determining terrestrial position." },
            { word: "LEVELS", clue: "Finding elevation difference." },
            { word: "CONTOUR", clue: "Line joining points of equal elevation." },
            { word: "OPTICAL", clue: "Precision instrument for measuring angles." },
            { word: "STRESS", clue: "Force per unit area." },
            { word: "DEFORM", clue: "Element displacement under load." }
        ],
        "csM": [
            { word: "NEURAL", clue: "Brain-like network." },
            { word: "LEARN", clue: "Acquire knowledge." },
            { word: "DATA", clue: "Information units." },
            { word: "MODEL", clue: "AI system type." },
            { word: "AGENT", clue: "AI that acts." },
            { word: "PROMPT", clue: "Input for AI." }
        ],
        "csd": [
            { word: "LAYOUT", clue: "Visual arrangement." },
            { word: "USER", clue: "Person using app." },
            { word: "COLOR", clue: "Visual property." },
            { word: "FONT", clue: "Text style." },
            { word: "SPACE", clue: "Area in design." },
            { word: "ICON", clue: "Small symbol." }
        ]
    },
    "3rd Year": {
        "cse": [
            { word: "PROCESS", clue: "A program in execution." },
            { word: "THREAD", clue: "Smallest unit of execution." },
            { word: "LOCK", clue: "Situation where processes are blocked." },
            { word: "PAGING", clue: "Memory management scheme." },
            { word: "DBASE", clue: "Type of database model." },
            { word: "NORMAL", clue: "Reducing database redundancy." },
            { word: "TXN", clue: "Sequence of database operations." },
            { word: "PACKET", clue: "Independent entity of data." }
        ],
        "ece": [
            { word: "CPU", clue: "IC containing functions of a CPU." },
            { word: "MCU", clue: "Small computer on a single IC." },
            { word: "ANTENNA", clue: "Interface for radio waves." },
            { word: "WAVE", clue: "Structure that guides waves." },
            { word: "DSP", clue: "Digital Signal Processing." },
            { word: "VLSI", clue: "Very Large Scale Integration." },
            { word: "CMOS", clue: "Semiconductor technology." },
            { word: "EMBED", clue: "System combined with hardware." }
        ],
        "mech": [
            { word: "HEAT", clue: "Forms of energy transferred between systems due to temperature difference." },
            { word: "TRANSFER", clue: "Movement of something from one place to another." },
            { word: "CONDUCTION", clue: "Heat transfer between parts of a continuum." },
            { word: "CONVECTION", clue: "Heat transfer by mass motion of a fluid." },
            { word: "RADIATION", clue: "Emission of energy as EM waves." },
            { word: "MACHINING", clue: "Process of removing material to achieve a shape." },
            { word: "WELDING", clue: "Fabrication process that joins materials." },
            { word: "CASTING", clue: "Pouring liquid into a mold." }
        ],
        "ce": [
            { word: "CONCRETE", clue: "Material made from cement." },
            { word: "STEEL", clue: "Alloy of iron and carbon." },
            { word: "STRUCT", clue: "System supporting a load." },
            { word: "FOUND", clue: "Connects structure to ground." },
            { word: "SOIL", clue: "Earth material." },
            { word: "BEARING", clue: "Soil load capacity." },
            { word: "REBAR", clue: "Strengthening concrete." },
            { word: "HIGHWAY", clue: "Road for heavy traffic." }
        ],
        "csM": [
            { word: "DEEP", clue: "ML network depth." },
            { word: "NODE", clue: "Point in network." },
            { word: "LINUX", clue: "AI server OS." },
            { word: "CLOUD", clue: "Remote AI compute." },
            { word: "GPU", clue: "Graphics processor." },
            { word: "PYTHON", clue: "Main AI language." }
        ],
        "csd": [
            { word: "COLOR", clue: "Visual shade." },
            { word: "STYLE", clue: "Design look." },
            { word: "GRAPH", clue: "Visual data." },
            { word: "PHOTO", clue: "Digital image." },
            { word: "LOGO", clue: "Brand symbol." },
            { word: "FRAME", clue: "Design border." }
        ]
    },
    "4th Year": {
        "cse": [
            { word: "CLOUD", clue: "Remote resource availability." },
            { word: "MACHINE", clue: "Device performing actions." },
            { word: "ML", clue: "AI learning from data." },
            { word: "SECURE", clue: "System protection." },
            { word: "NETWORK", clue: "Computers sharing resources." },
            { word: "AGILE", clue: "Iterative development." },
            { word: "SCRUM", clue: "Project management framework." },
            { word: "DEVOPS", clue: "Combined Dev and Ops." }
        ],
        "ece": [
            { word: "IOT", clue: "Internet of Things." },
            { word: "WIRELESS", clue: "No-wire communication." },
            { word: "OPTICAL", clue: "Relating to light." },
            { word: "SAT", clue: "Artificial body in orbit." },
            { word: "RADAR", clue: "Object detection system." },
            { word: "NANO", clue: "Atomic scale tech." },
            { word: "ROBOT", clue: "Engineering for machines." },
            { word: "AUTO", clue: "Automatic equipment use." }
        ],
        "mech": [
            { word: "CAD", clue: "Computer Aided Design." },
            { word: "CAM", clue: "Computer Aided Manufacturing." },
            { word: "ROBOTICS", clue: "Interdisciplinary branch of engineering and science." },
            { word: "AUTOMATION", clue: "Use of largely automatic equipment." },
            { word: "MECHATRONICS", clue: "Multidisciplinary branch of engineering combining electronics and mechanics." },
            { word: "VIBRATION", clue: "A periodic motion of the particles of an elastic body." },
            { word: "OPTIMIZATION", clue: "The action of making the best or most effective use of a situation." },
            { word: "RENEWABLE", clue: "Energy from a source that is not depleted when used." }
        ],
        "ce": [
            { word: "ENVIRONMENT", clue: "The surroundings or conditions in which a person lives." },
            { word: "TRANSPORTATION", clue: "Movement of humans, animals and goods from one location to another." },
            { word: "RAILWAY", clue: "A track or set of tracks made of steel rails." },
            { word: "AIRPORT", clue: "A complex of runways and buildings for flying." },
            { word: "BRIDGE", clue: "A structure built to span a physical obstacle." },
            { word: "DAM", clue: "A barrier that stops or restricts the flow of water." },
            { word: "RESERVOIR", clue: "Large natural or artificial lake used as a source of water supply." },
            { word: "IRRIGATION", clue: "The supply of water to land or crops to help growth." }
        ],
        "csM": [
            { word: "DEEP", clue: "Neural network layer type." },
            { word: "VISION", clue: "AI for image analysis." },
            { word: "NATURAL", clue: "Human language type." },
            { word: "LANGUAGE", clue: "Communication method." },
            { word: "TENSOR", clue: "ML math object." },
            { word: "BIGDATA", clue: "Large scale info." },
            { word: "HADOOP", clue: "Data framework." },
            { word: "PYTHON", clue: "Code for AI." }
        ],
        "csd": [
            { word: "DEEP", clue: "Neural network layer type." },
            { word: "VISION", clue: "AI for image analysis." },
            { word: "NATURAL", clue: "Human language type." },
            { word: "LANGUAGE", clue: "Communication method." },
            { word: "TENSOR", clue: "ML math object." },
            { word: "BIGDATA", clue: "Large scale info." },
            { word: "HADOOP", clue: "Data framework." },
            { word: "PYTHON", clue: "Code for AI." }
        ]
    }
};

export function getCrosswordWords(year: AcademicYear, dept: Department): L1Word[] {
    const yrBank = L1_WORDS[year] || L1_WORDS["1st Year"];
    const targetDept = (dept === "csM" || dept === "csd") ? "cse" : dept;
    const pool = yrBank[targetDept] || yrBank["cse"];
    return [...pool].sort(() => 0.5 - Math.random()).slice(0, 3);
}

// -----------------------------------------------------------------------------------
// LEVEL 2: SEMANTIC RECOVERY (GUESS THE WORD)
// -----------------------------------------------------------------------------------
export interface SemanticBlank {
    word: string;
    hint: string;
}

const L2_BLANKS: Record<AcademicYear, Record<Department, SemanticBlank[]>> = {
    "1st Year": {
        "cse": [
            { word: "COMPILER", hint: "Translates code to machine language." },
            { word: "ALGORITHM", hint: "Steps to solve a problem." },
            { word: "VARIABLE", hint: "Named storage location." },
            { word: "DEBUG", hint: "Fixing code errors." },
            { word: "FUNCTION", hint: "Reusable code block." }
        ],
        "ece": [
            { word: "DIODE", hint: "Allows current in one way." },
            { word: "RESISTOR", hint: "Limits electric current." },
            { word: "VOLTAGE", hint: "Electric potential difference." },
            { word: "CURRENT", hint: "Flow of electric charge." },
            { word: "CAPACITOR", hint: "Stores electrical energy." }
        ],
        "mech": [
            { word: "FRICTION", hint: "Force resisting motion." },
            { word: "VELOCITY", hint: "Speed with direction." },
            { word: "MOMENTUM", hint: "Mass times velocity." },
            { word: "INERTIA", hint: "Resistance to change in motion." },
            { word: "GRAVITY", hint: "Force pulling items to earth." }
        ],
        "ce": [
            { word: "BEAM", hint: "Horizontal structural member." },
            { word: "TENSION", hint: "Pulling force." },
            { word: "STATICS", hint: "Analysis of loads." },
            { word: "SURVEY", hint: "Measuring land positions." },
            { word: "CEMENT", hint: "Binding material." }
        ],
        "csM": [
            { word: "PYTHON", hint: "Language used for AI." },
            { word: "ALGORITHM", hint: "Steps to solve a problem." },
            { word: "VARIABLE", hint: "Named storage location." },
            { word: "DATA", hint: "Information used for analysis." },
            { word: "DATASET", hint: "Collection of records." }
        ],
        "csd": [
            { word: "PYTHON", hint: "Language used for AI." },
            { word: "ALGORITHM", hint: "Steps to solve a problem." },
            { word: "VARIABLE", hint: "Named storage location." },
            { word: "DATA", hint: "Information used for analysis." },
            { word: "DATASET", hint: "Collection of records." }
        ]
    },
    "2nd Year": {
        "cse": [
            { word: "POLY", hint: "Single interface for many types." },
            { word: "ENCAP", hint: "Binding data and functions." },
            { word: "INHERIT", hint: "Class deriving from another." },
            { word: "DATABASE", hint: "Collection of structured info." },
            { word: "INTERFACE", hint: "Shared boundary for components." }
        ],
        "ece": [
            { word: "MUX", hint: "Selects between input signals." },
            { word: "OSCILLATE", hint: "Produces periodic signals." },
            { word: "AMPLIFY", hint: "Increase signal power." },
            { word: "MODULATE", hint: "Varying waveform properties." },
            { word: "TRANSISTOR", hint: "Switches electrical signals." }
        ],
        "mech": [
            { word: "THERMO", hint: "Deals with heat and work." },
            { word: "KINE", hint: "Motion without forces." },
            { word: "ENTHALPY", hint: "Internal energy plus PV." },
            { word: "ENTROPY", hint: "System disorder measure." },
            { word: "VISCOSITY", hint: "Fluid resistance to flow." }
        ],
        "ce": [
            { word: "THEO", hint: "Instrument for measuring angles." },
            { word: "CONTOUR", hint: "Outline of a shape." },
            { word: "SURVEY", hint: "Determining earth positions." },
            { word: "MECHANIC", hint: "Concerned with motions." },
            { word: "LEVEL", hint: "Finding elevation points." }
        ],
        "csM": [
            { word: "REGRESS", hint: "Determining relationship strength." },
            { word: "NUMPY", hint: "Python math library." },
            { word: "PANDAS", hint: "Data manipulation library." },
            { word: "STATS", hint: "Analyzing numerical data." },
            { word: "PROB", hint: "Likelihood of an event." }
        ],
        "csd": [
            { word: "LAYOUT", hint: "Visual arrangement." },
            { word: "USER", hint: "App user." },
            { word: "COLOR", hint: "Visual shade." },
            { word: "FONT", hint: "Text style." },
            { word: "SPACE", hint: "Design area." }
        ]
    },
    "3rd Year": {
        "cse": [
            { word: "DEADLOCK", hint: "A state in an OS where each process is waiting for a resource." },
            { word: "NORMALIZATION", hint: "Structuring a relational database to reduce data redundancy." },
            { word: "PROCESS", "hint": "An instance of a computer program that is being executed." },
            { word: "THREAD", hint: "The smallest sequence of programmed instructions managed by a scheduler." },
            { word: "DATAGRAM", hint: "A basic transfer unit associated with a packet-switched network." }
        ],
        "ece": [
            { word: "FLIPFLOP", hint: "A circuit that has two stable states and can be used to store state information." },
            { word: "MICROPROCESSOR", hint: "A computer processor where the data processing logic and control is included on a single integrated circuit." },
            { word: "ANTENNA", hint: "A device designed to transmit or receive electromagnetic waves." },
            { word: "WAVEGUIDE", hint: "A structure that guides waves, such as electromagnetic waves or sound." },
            { word: "CMOS", hint: "Complementary metal-oxide-semiconductor." }
        ],
        "mech": [
            { word: "CONVECTION", hint: "The transfer of heat due to the bulk movement of molecules." },
            { word: "CONDUCTION", hint: "The process by which heat or electricity is directly transmitted." },
            { word: "RADIATION", hint: "The emission of energy as electromagnetic waves." },
            { word: "CASTING", hint: "A manufacturing process in which a liquid material is usually poured into a mold." },
            { word: "WELDING", hint: "A fabrication process that joins materials." }
        ],
        "ce": [
            { word: "FOUNDATION", hint: "The lowest part of a civil structure that is in direct contact with the soil." },
            { word: "CONCRETE", hint: "A composite material composed of fine and coarse aggregate bonded together." },
            { word: "STRUCTURE", hint: "An arrangement and organization of interrelated elements in a material object." },
            { word: "BEARING", hint: "The capacity of soil to support the loads applied to the ground." },
            { word: "REINFORCEMENT", hint: "The action or process of strengthening." }
        ],
        "csM": [
            { word: "DEEP", hint: "ML network depth." },
            { word: "NODE", hint: "Network point." },
            { word: "GPU", hint: "Fast processor." },
            { word: "PYTHON", hint: "AI language." },
            { word: "CLOUD", hint: "Remote AI compute." }
        ],
        "csd": [
            { word: "STYLE", hint: "Visual look." },
            { word: "GRAPH", hint: "Visual data." },
            { word: "PHOTO", hint: "Digital image." },
            { word: "LOGO", hint: "Brand sign." },
            { word: "FRAME", hint: "Design border." }
        ]
    },
    "4th Year": {
        "cse": [
            { word: "CLOUD", hint: "Remote storage." },
            { word: "SECURE", hint: "System protection." },
            { word: "AGILE", hint: "Iterative plan." },
            { word: "DEVOPS", hint: "Dev+Ops practice." },
            { word: "TRUST", hint: "System belief." }
        ],
        "ece": [
            { word: "IOT", hint: "Internet of Things." },
            { word: "RADAR", hint: "Detection system." },
            { word: "SATELLITE", hint: "Orbit object." },
            { word: "AUTO", hint: "Largely automatic." },
            { word: "WAVE", hint: "Radio signal." }
        ],
        "mech": [
            { word: "ROVE", hint: "Mobile machine." },
            { word: "AERO", hint: "Flight branch." },
            { word: "AUTO", hint: "Self moving." },
            { word: "MECH", hint: "Combined branch." },
            { word: "ROBOT", hint: "Computer science branch." }
        ],
        "ce": [
            { word: "HYDRO", hint: "Water study." },
            { word: "ENV", hint: "World surroundings." },
            { word: "TRANS", hint: "Human movement." },
            { word: "BRIDGE", hint: "Gap structure." },
            { word: "DAM", hint: "Water barrier." }
        ],
        "csM": [
            { word: "KERAS", hint: "Python AI interface." },
            { word: "TORCH", hint: "ML framework." },
            { word: "MODEL", hint: "Analysis result." },
            { word: "TEST", hint: "Hold-out data check." },
            { word: "BOT", hint: "Auto program." }
        ],
        "csd": [
            { word: "WEB3", hint: "Future web." },
            { word: "NFT", hint: "Digital asset." },
            { word: "VR", hint: "Virtual reality." },
            { word: "AR", hint: "Augmented reality." },
            { word: "UI", hint: "User interface." }
        ]
    }
};

export function getSemanticBlanks(year: AcademicYear, dept: Department): SemanticBlank[] {
    const yrBank = L2_BLANKS[year] || L2_BLANKS["1st Year"];
    const targetDept = (dept === "csM" || dept === "csd") ? "cse" : dept;
    return yrBank[targetDept] || yrBank["cse"];
}

// -----------------------------------------------------------------------------------
// LEVEL 3: MCQ TACTICS
// -----------------------------------------------------------------------------------
export interface MCQQuestion {
    id: number;
    question: string;
    options: string[];
    correct: number;
    explanation: string;
}

const L3_MCQS: MCQQuestion[] = [
    { id: 1, question: "Which of the following sorting algorithms has the best average-case time complexity?", options: ["Bubble Sort", "Insertion Sort", "Merge Sort", "Selection Sort"], correct: 2, explanation: "Merge Sort consistently runs in O(n log n) time." },
    { id: 2, question: "What does 'ACID' stand for in database transactions?", options: ["Atomicity, Consistency, Isolation, Durability", "Accuracy, Completeness, Integrity, Data", "Auto, Commit, Insert, Delete", "Array, Class, Interface, Delegation"], correct: 0, explanation: "ACID properties ensure reliable database transactions." },
    { id: 3, question: "Which protocol is used for secure communication over a computer network?", options: ["HTTP", "FTP", "HTTPS", "Telnet"], correct: 2, explanation: "HTTPS encrypts the session with TLS/SSL." },
    { id: 4, question: "In object-oriented programming, what is Encapsulation?", options: ["Inheriting traits from a parent", "Hiding internal state and requiring all interaction to be performed through an object's methods", "Writing code in capsules", "Allowing a function to take multiple forms"], correct: 1, explanation: "Encapsulation hides the internal implementation details." },
    { id: 5, question: "What is the time complexity of searching an element in a balanced Binary Search Tree (BST)?", options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"], correct: 2, explanation: "Balanced BST halves the search space each step." },
    { id: 6, question: "Which layer of the OSI model handles routing?", options: ["Data Link Layer", "Network Layer", "Transport Layer", "Session Layer"], correct: 1, explanation: "The Network Layer (Layer 3) handles IP routing." },
    { id: 7, question: "What does CORS stand for in web development?", options: ["Cross-Origin Resource Sharing", "Computer Object Runtime System", "Cascading Order Routing Style", "Control Object Registration Set"], correct: 0, explanation: "CORS is a security feature to restrict cross-origin requests." },
    { id: 8, question: "Which data structure operates on a Last-In-First-Out (LIFO) principle?", options: ["Queue", "Stack", "Linked List", "Tree"], correct: 1, explanation: "Stacks push and pop from the top." },
    { id: 9, question: "What does the 'chmod 777' command do in Linux?", options: ["Deletes a file", "Gives read, write, and execute permissions to everyone", "Changes the file owner", "Compresses the file"], correct: 1, explanation: "777 grants full permissions to owner, group, and others." },
    { id: 10, question: "Which of these is NOT a NoSQL database?", options: ["MongoDB", "Cassandra", "PostgreSQL", "Redis"], correct: 2, explanation: "PostgreSQL is a relational (SQL) database." },
    { id: 11, question: "What is the purpose of Docker?", options: ["To design UIs", "To containerize applications", "To sort arrays", "To compile C code"], correct: 1, explanation: "Docker packages apps into isolated containers." },
    { id: 12, question: "Which Git command is used to save your local changes?", options: ["git push", "git pull", "git commit", "git stash"], correct: 2, explanation: "git commit records changes to the local repository." },
    { id: 13, question: "What is a 'deadlock' in operating systems?", options: ["When the CPU overheats", "When two or more processes wait indefinitely for resources held by each other", "A memory leak", "A broken network connection"], correct: 1, explanation: "Deadlock is a stalemate between processes." },
    { id: 14, question: "Which HTTP method is typically used to update an existing resource?", options: ["GET", "POST", "PUT", "DELETE"], correct: 2, explanation: "PUT replaces the resource; PATCH partially updates it." },
    { id: 15, question: "What does JSON stand for?", options: ["Java Standard Output Network", "JavaScript Object Notation", "Junction Structured Object Network", "Joined String Ordered Notation"], correct: 1, explanation: "JSON is a lightweight data-interchange format." },
    { id: 16, question: "What is the main function of an IP address?", options: ["To name a computer", "To connect to Bluetooth", "To identify a device on a network", "To encrypt data"], correct: 2, explanation: "IP addresses route traffic to specific devices." },
    { id: 17, question: "Which language is heavily used for statistical analysis and machine learning?", options: ["PHP", "R", "Ruby", "Swift"], correct: 1, explanation: "R and Python are dominant in data science." },
    { id: 18, question: "What is 'Polymorphism' in OOP?", options: ["Multiple threads running", "A single interface representing different underlying forms", "Hiding variables", "Connecting to multiple databases"], correct: 1, explanation: "Polymorphism allows objects to be treated as instances of their parent class." },
    { id: 19, question: "What does a DNS server do?", options: ["Hosts websites", "Translates domain names into IP addresses", "Blocks spam", "Increases internet speed"], correct: 1, explanation: "DNS acts like the phonebook of the internet." },
    { id: 20, question: "Which of the following is a CSS preprocessor?", options: ["React", "Babel", "Sass", "Webpack"], correct: 2, explanation: "Sass extends CSS with variables and nesting." },
    { id: 21, question: "What is the result of 10 % 3 in most programming languages?", options: ["3.33", "1", "3", "10"], correct: 1, explanation: "The modulo operator (%) returns the remainder." },
    { id: 22, question: "Which tree traversal visits the root node last?", options: ["In-order", "Pre-order", "Post-order", "Level-order"], correct: 2, explanation: "Post-order visits Left, Right, then Root." },
    { id: 23, question: "What is the difference between TCP and UDP?", options: ["TCP is faster", "UDP guarantees delivery", "TCP is connection-oriented, UDP is connectionless", "UDP is only for local networks"], correct: 2, explanation: "TCP checks for lost packets; UDP just sends them." },
    { id: 24, question: "What does a compiler do?", options: ["Runs code line by line", "Translates high-level source code into machine code", "Formats code visually", "Debugs runtime errors"], correct: 1, explanation: "Compilers convert whole files to binaries before running." },
    { id: 25, question: "Which of the following is a front-end JavaScript framework?", options: ["Express", "Django", "Angular", "Spring"], correct: 2, explanation: "Angular is for UI. The others are backend frameworks." },
    { id: 26, question: "What is 'virtual memory'?", options: ["Memory in the cloud", "Using disk space to simulate additional RAM", "Cache memory", "CPU registers"], correct: 1, explanation: "Virtual memory prevents out-of-memory crashes by swapping to disk." },
    { id: 27, question: "What does 'pwd' stand for in Unix?", options: ["Print Working Directory", "Password", "Process Working Data", "Personal Web Domain"], correct: 0, explanation: "pwd outputs the absolute path of the current directory." },
    { id: 28, question: "Which command lists files in a directory in Linux?", options: ["list", "dir", "ls", "show"], correct: 2, explanation: "ls lists directory contents." },
    { id: 29, question: "What is a REST API?", options: ["An API that sleeps", "Representational State Transfer API", "Responsive Execution System Thread", "A database connection"], correct: 1, explanation: "REST relies on standard HTTP methods." },
    { id: 30, question: "What does SQL stand for?", options: ["Structured Query Language", "Standard Query Logic", "System Query Link", "Server Query Language"], correct: 0, explanation: "SQL is used to manage relational databases." },
    { id: 31, question: "What is an index in a database?", options: ["A list of all users", "A tool to speed up data retrieval", "A backup file", "The first column of a table"], correct: 1, explanation: "Indexes act like a book's index for quick lookups." },
    { id: 32, question: "Which of these is a valid IP address?", options: ["256.1.2.3", "192.168.1.1", "127.0.0.1.0", "999.999.999.999"], correct: 1, explanation: "IPv4 segments range from 0 to 255." },
    { id: 33, question: "What is 'phishing'?", options: ["A data mining technique", "A cyber attack designed to trick users into giving up credentials", "A networking protocol", "A type of sorting algorithm"], correct: 1, explanation: "Phishing usually involves fake emails or websites." },
    { id: 34, question: "What is the primary function of a proxy server?", options: ["To speed up CPU", "To act as an intermediary for requests from clients", "To store passwords", "To replace a router"], correct: 1, explanation: "Proxies forward requests and can cache data or hide IPs." },
    { id: 35, question: "Which keyword is used to handle exceptions in Python?", options: ["catch", "try/except", "error", "throw"], correct: 1, explanation: "Python uses try to test code and except to handle errors." },
    { id: 36, question: "What does MVC stand for?", options: ["Minimum Value Control", "Model View Controller", "Main Virtual CPU", "More Visual Content"], correct: 1, explanation: "MVC is a design pattern separating data, UI, and logic." },
    { id: 37, question: "In Git, what does a 'merge conflict' mean?", options: ["The server went down", "Two branches changed the same part of a file differently", "You forgot your password", "The code won't compile"], correct: 1, explanation: "Conflicts require manual resolution by the developer." },
    { id: 38, question: "What is Big-O notation used for?", options: ["Network speed rating", "Describing the performance or complexity of an algorithm", "Database size limits", "Screen resolution sizes"], correct: 1, explanation: "Big-O maps how time/space grows with input size." },
    { id: 39, question: "Which of the following is NOT a Linux distribution?", options: ["Ubuntu", "CentOS", "Fedora", "macOS"], correct: 3, explanation: "macOS is based on Unix (Darwin), but it is not Linux." },
    { id: 40, question: "What does 'localhost' refer to?", options: ["The server next door", "Your own computer network interface", "A cloud server", "The router"], correct: 1, explanation: "Localhost usually resolves to 127.0.0.1." },
    { id: 41, question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyperlink Text Module Language", "Home Tool Markup Language"], correct: 0, explanation: "HTML structures web pages." },
    { id: 42, question: "Which variable scoping allows reassignment but prevents block-scope leaking in JS?", options: ["var", "let", "const", "def"], correct: 1, explanation: "let allows reassignment inside its block scope." },
    { id: 43, question: "What is standard port for SSH?", options: ["21", "22", "80", "443"], correct: 1, explanation: "Port 22 is used for Secure Shell." },
    { id: 44, question: "Which command drops a table in SQL?", options: ["DELETE TABLE", "REMOVE TABLE", "DROP TABLE", "CLEAR TABLE"], correct: 2, explanation: "DROP TABLE deletes the schema and all data." },
    { id: 45, question: "What is the primary characteristic of an IDE?", options: ["It provides an integrated environment for writing, testing, and debugging code", "It is only used for graphic design", "It compresses files", "It acts as a physical server"], correct: 0, explanation: "IDE stands for Integrated Development Environment." },
    { id: 46, question: "Which concept allows a class to implement multiple interfaces in Java?", options: ["Multiple Inheritance", "Interfaces", "Abstract Classes", "Overloading"], correct: 1, explanation: "Java allows a class to implement many interfaces to avoid the diamond problem." },
    { id: 47, question: "What is a 'hash map'?", options: ["A map of geographical hashes", "A data structure mapping keys to values for fast lookup", "A cryptography tool", "A networking loop"], correct: 1, explanation: "Hash maps provide average O(1) access time." },
    { id: 48, question: "In Linux, how do you see running processes?", options: ["tasklist", "show process", "top", "procstat"], correct: 2, explanation: "top or htop shows real-time process info." },
    { id: 49, question: "What does JVM stand for?", options: ["Java Virtual Machine", "Java Visual Module", "Joint Vector Machine", "Java Variable Manager"], correct: 0, explanation: "JVM allows Java programs to run on any device (Write Once, Run Anywhere)." },
    { id: 50, question: "What is a foreign key in SQL?", options: ["A key used abroad", "A column that uniquely identifies a row in another table", "A password for the database", "An unused index"], correct: 1, explanation: "Foreign keys enforce referential integrity." }
];

/**
 * Seeded shuffle to ensure host and guest get same shuffle order from shared session ID
 */
function seededShuffle<T>(array: T[], seed: string): T[] {
    const shuffled = [...array];
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        hash = ((hash << 5) - hash) + seed.charCodeAt(i);
        hash |= 0;
    }

    const pseudoRandom = () => {
        hash = (hash * 1664525 + 1013904223) | 0;
        return (hash >>> 0) / 0xffffffff;
    };

    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(pseudoRandom() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

export function getMCQs(seed?: string, offset: number = 0): MCQQuestion[] {
    const pool = L3_MCQS;

    // If seed is provided, deterministic shuffle and pick based on offset (Host: 0, Guest: 3)
    if (seed) {
        const shuffled = seededShuffle(pool, seed);
        return shuffled.slice(offset, offset + 3);
    }

    // Default: completely random (for solo runs or Mashup round)
    const count = 3;
    return [...pool].sort(() => 0.5 - Math.random()).slice(0, count);
}

// -----------------------------------------------------------------------------------
// LEVEL 4: CODE DEBUGGING â€” Simple Syntax Errors (20 per language)
// -----------------------------------------------------------------------------------

export interface CodeChallenge {
    id: string;
    language: "C" | "Java" | "Python" | "Logic (Civil/Mech)";
    title: string;
    brokenCode: string;
    initialCode: string;
    expectedSolutionSnippet: string | string[];
    errorHint: string;
}

// Flat pool of 20 simple, clear syntax-error questions per language
const L4_SIMPLE_POOL: Record<"C" | "Java" | "Python", CodeChallenge[]> = {
    "C": [
        { id: "c01", language: "C", title: "Missing Semicolon", brokenCode: "int x = 5\nreturn 0;", initialCode: "#include <stdio.h>\nint main() {\n  int x = 5\n  return 0;\n}", expectedSolutionSnippet: "int x = 5;", errorHint: "Every statement in C must end with a semicolon (;)." },
        { id: "c02", language: "C", title: "Wrong Loop Direction", brokenCode: "for(int i=0; i<5; i--)", initialCode: "#include <stdio.h>\nint main() {\n  for(int i=0; i<5; i--) {\n    printf(\"%d \", i);\n  }\n  return 0;\n}", expectedSolutionSnippet: "i++", errorHint: "The loop counter is decrementing instead of incrementing â€” it will never reach the end condition." },
        { id: "c03", language: "C", title: "Assignment in Condition", brokenCode: "if(x = 5)", initialCode: "#include <stdio.h>\nint main() {\n  int x = 0;\n  if(x = 5) {\n    printf(\"five\");\n  }\n  return 0;\n}", expectedSolutionSnippet: "x == 5", errorHint: "Use == for comparison, not = (which assigns the value)." },
        { id: "c04", language: "C", title: "Missing & in scanf", brokenCode: "scanf(\"%d\", n);", initialCode: "#include <stdio.h>\nint main() {\n  int n;\n  scanf(\"%d\", n);\n  printf(\"%d\", n);\n  return 0;\n}", expectedSolutionSnippet: "&n", errorHint: "scanf() needs the address of the variable â€” use the & operator." },
        { id: "c05", language: "C", title: "Wrong Return Type for main", brokenCode: "void main()", initialCode: "void main() {\n  printf(\"Hello\");\n  return 0;\n}", expectedSolutionSnippet: "int main", errorHint: "The standard signature for main is int main(), not void." },
        { id: "c06", language: "C", title: "Missing #include", brokenCode: "printf(\"Hi\"); // no stdio.h", initialCode: "#include <stdlib.h>\nint main() {\n  printf(\"Hello\");\n  return 0;\n}", expectedSolutionSnippet: "#include <stdio.h>", errorHint: "printf() is declared in <stdio.h>. Add the correct include." },
        { id: "c07", language: "C", title: "Array Out of Bounds", brokenCode: "int a[5]; a[5] = 1;", initialCode: "#include <stdio.h>\nint main() {\n  int a[5];\n  a[5] = 1;\n  return 0;\n}", expectedSolutionSnippet: "a[4]", errorHint: "An array of size 5 has valid indices 0 through 4. Index 5 is out of bounds." },
        { id: "c08", language: "C", title: "Integer Division", brokenCode: "float c = a / b;", initialCode: "#include <stdio.h>\nint main() {\n  int a = 5, b = 2;\n  float c = a / b;\n  printf(\"%f\", c);\n  return 0;\n}", expectedSolutionSnippet: "(float)a / b", errorHint: "Dividing two ints gives an int result. Cast one operand to float first." },
        { id: "c09", language: "C", title: "Missing break in switch", brokenCode: "case 1: printf(\"one\");\ncase 2: printf(\"two\");", initialCode: "#include <stdio.h>\nint main() {\n  int x = 1;\n  switch(x) {\n    case 1: printf(\"one\");\n    case 2: printf(\"two\");\n  }\n  return 0;\n}", expectedSolutionSnippet: "break;", errorHint: "Without break, execution falls through to the next case." },
        { id: "c10", language: "C", title: "Wrong Format Specifier", brokenCode: "printf(\"%d\", x); // x is float", initialCode: "#include <stdio.h>\nint main() {\n  float x = 3.14;\n  printf(\"%d\", x);\n  return 0;\n}", expectedSolutionSnippet: "%f", errorHint: "Use %f to print float values, not %d (which is for integers)." },
        { id: "c11", language: "C", title: "Char Array Too Small", brokenCode: "char s[3] = \"abc\";", initialCode: "#include <stdio.h>\nint main() {\n  char s[4] = \"abc\";\n  printf(\"%s\", s);\n  return 0;\n}", expectedSolutionSnippet: "s[4]", errorHint: "A C string needs one extra byte for the null terminator '\\0'." },
        { id: "c12", language: "C", title: "Uninitialized Pointer", brokenCode: "int *p;\n*p = 5;", initialCode: "#include <stdio.h>\nint main() {\n  int x = 0;\n  int *p = &x;\n  *p = 5;\n  printf(\"%d\", *p);\n  return 0;\n}", expectedSolutionSnippet: "&x", errorHint: "Declare and initialize the variable x, then point p to it using &x." },
        { id: "c13", language: "C", title: "Wrong While Condition", brokenCode: "while(i >= 0) { i++; }", initialCode: "#include <stdio.h>\nint main() {\n  int i = 0;\n  while(i < 5) {\n    printf(\"%d\", i);\n    i++;\n  }\n  return 0;\n}", expectedSolutionSnippet: "i < 5", errorHint: "The condition should stop the loop after 5 iterations. Use i < 5." },
        { id: "c14", language: "C", title: "Double Quotes for Char", brokenCode: "char c = \"A\";", initialCode: "#include <stdio.h>\nint main() {\n  char c = 'A';\n  printf(\"%c\", c);\n  return 0;\n}", expectedSolutionSnippet: "'A'", errorHint: "Use single quotes for character literals in C, not double quotes." },
        { id: "c15", language: "C", title: "Missing return 0", brokenCode: "int main() {\n  printf(\"done\");\n}", initialCode: "#include <stdio.h>\nint main() {\n  printf(\"done\");\n  return 0;\n}", expectedSolutionSnippet: "return 0", errorHint: "main() returns int. Add 'return 0;' at the end." },
        { id: "c16", language: "C", title: "Wrong sizeof for Array Length", brokenCode: "int len = sizeof(arr) / sizeof(arr);", initialCode: "#include <stdio.h>\nint main() {\n  int arr[5] = {1,2,3,4,5};\n  int len = sizeof(arr) / sizeof(arr[0]);\n  printf(\"%d\", len);\n  return 0;\n}", expectedSolutionSnippet: "arr[0]", errorHint: "To get element count, divide total size by size of one element: sizeof(arr[0])." },
        { id: "c17", language: "C", title: "Using = vs == in if", brokenCode: "if(count = 0) printf(\"empty\");", initialCode: "#include <stdio.h>\nint main() {\n  int count = 5;\n  if(count == 0) printf(\"empty\");\n  else printf(\"not empty\");\n  return 0;\n}", expectedSolutionSnippet: "count == 0", errorHint: "Use == to compare; = assigns and always evaluates to a non-zero if assigned value != 0." },
        { id: "c18", language: "C", title: "Wrong Pointer Increment", brokenCode: "printf(\"%d\", *p++); // intent: print then advance", initialCode: "#include <stdio.h>\nint main() {\n  int a[] = {10, 20};\n  int *p = a;\n  printf(\"%d\", *p);\n  p++;\n  printf(\"%d\", *p);\n  return 0;\n}", expectedSolutionSnippet: "*p", errorHint: "Dereference the pointer first, then increment separately to control order of operations." },
        { id: "c19", language: "C", title: "Comparing Strings with ==", brokenCode: "if(s1 == s2) // compares pointers", initialCode: "#include <stdio.h>\n#include <string.h>\nint main() {\n  char s1[] = \"hi\";\n  char s2[] = \"hi\";\n  if(strcmp(s1, s2) == 0) printf(\"equal\");\n  return 0;\n}", expectedSolutionSnippet: "strcmp", errorHint: "Use strcmp() to compare strings in C, not == which compares memory addresses." },
        { id: "c20", language: "C", title: "Missing Closing Brace", brokenCode: "int main() {\n  if(1) {\n    printf(\"yes\");\n  return 0;\n}", initialCode: "#include <stdio.h>\nint main() {\n  if(1) {\n    printf(\"yes\");\n  }\n  return 0;\n}", expectedSolutionSnippet: "}\n  return 0", errorHint: "The if block is missing its closing brace }." }
    ],
    "Java": [
        { id: "j01", language: "Java", title: "Missing Semicolon", brokenCode: "int x = 5\nSystem.out.println(x);", initialCode: "public class Main {\n  public static void main(String[] args) {\n    int x = 5;\n    System.out.println(x);\n  }\n}", expectedSolutionSnippet: "int x = 5;", errorHint: "Java statements must end with a semicolon." },
        { id: "j02", language: "Java", title: "String Compare with ==", brokenCode: "if(s == \"hello\")", initialCode: "public class Main {\n  public static void main(String[] args) {\n    String s = \"hello\";\n    if(s.equals(\"hello\")) System.out.println(\"yes\");\n  }\n}", expectedSolutionSnippet: "equals", errorHint: "Use .equals() to compare String content, not ==." },
        { id: "j03", language: "Java", title: "Array Index Out of Bounds", brokenCode: "int[] a = {1,2,3};\na[3] = 4;", initialCode: "public class Main {\n  public static void main(String[] args) {\n    int[] a = {1,2,3};\n    a[2] = 4;\n    System.out.println(a[2]);\n  }\n}", expectedSolutionSnippet: "a[2]", errorHint: "Array of size 3 has indices 0, 1, 2. Index 3 is out of bounds." },
        { id: "j04", language: "Java", title: "NullPointerException", brokenCode: "String s;\nSystem.out.println(s.length());", initialCode: "public class Main {\n  public static void main(String[] args) {\n    String s = \"\";\n    System.out.println(s.length());\n  }\n}", expectedSolutionSnippet: "= \"\"", errorHint: "Initialize the String variable before calling methods on it." },
        { id: "j05", language: "Java", title: "Wrong main Signature", brokenCode: "public static void main(String args)", initialCode: "public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"Hello\");\n  }\n}", expectedSolutionSnippet: "String[] args", errorHint: "The correct main signature requires String[] args (array), not String args." },
        { id: "j06", language: "Java", title: "Missing new Keyword", brokenCode: "ArrayList<String> list = ArrayList<>();", initialCode: "import java.util.ArrayList;\npublic class Main {\n  public static void main(String[] args) {\n    ArrayList<String> list = new ArrayList<>();\n    list.add(\"hi\");\n  }\n}", expectedSolutionSnippet: "new ArrayList", errorHint: "Objects in Java must be created with the new keyword." },
        { id: "j07", language: "Java", title: "Wrong Return Type", brokenCode: "public void getScore() {\n  return 42;\n}", initialCode: "public class Main {\n  public static int getScore() {\n    return 42;\n  }\n  public static void main(String[] args) {\n    System.out.println(getScore());\n  }\n}", expectedSolutionSnippet: "int getScore", errorHint: "A method that returns an integer must declare return type int, not void." },
        { id: "j08", language: "Java", title: "Missing break in switch", brokenCode: "case 1: System.out.println(\"one\");\ncase 2: System.out.println(\"two\");", initialCode: "public class Main {\n  public static void main(String[] args) {\n    int x = 1;\n    switch(x) {\n      case 1: System.out.println(\"one\"); break;\n      case 2: System.out.println(\"two\"); break;\n    }\n  }\n}", expectedSolutionSnippet: "break;", errorHint: "Without break, execution falls through to the next case in Java." },
        { id: "j09", language: "Java", title: "Extends vs Implements", brokenCode: "class Dog implements Animal {}", initialCode: "class Animal {}\npublic class Dog extends Animal {\n  public static void main(String[] args) {\n    Dog d = new Dog();\n  }\n}", expectedSolutionSnippet: "extends Animal", errorHint: "Use extends to inherit from a class, implements only for interfaces." },
        { id: "j10", language: "Java", title: "Static Method on Instance", brokenCode: "Main obj = new Main();\nobj.staticMethod();", initialCode: "public class Main {\n  public static void staticMethod() {\n    System.out.println(\"static\");\n  }\n  public static void main(String[] args) {\n    Main.staticMethod();\n  }\n}", expectedSolutionSnippet: "Main.staticMethod", errorHint: "Call static methods on the class name, not an instance." },
        { id: "j11", language: "Java", title: "Missing Import", brokenCode: "Scanner sc = new Scanner(System.in);", initialCode: "import java.util.Scanner;\npublic class Main {\n  public static void main(String[] args) {\n    Scanner sc = new Scanner(System.in);\n    sc.close();\n  }\n}", expectedSolutionSnippet: "import java.util.Scanner", errorHint: "Add 'import java.util.Scanner;' at the top of the file." },
        { id: "j12", language: "Java", title: "Integer Overflow", brokenCode: "int result = 2000000000 * 2;", initialCode: "public class Main {\n  public static void main(String[] args) {\n    long result = 2000000000L * 2;\n    System.out.println(result);\n  }\n}", expectedSolutionSnippet: "long result", errorHint: "Large multiplications exceed int range. Use long and add L suffix to literals." },
        { id: "j13", language: "Java", title: "Wrong Loop Bound", brokenCode: "for(int i=0; i<=arr.length; i++)", initialCode: "public class Main {\n  public static void main(String[] args) {\n    int[] arr = {1,2,3};\n    for(int i=0; i<arr.length; i++) {\n      System.out.println(arr[i]);\n    }\n  }\n}", expectedSolutionSnippet: "i<arr.length", errorHint: "Use < (not <=) to prevent accessing index equal to array length." },
        { id: "j14", language: "Java", title: "Unchecked Exception", brokenCode: "int r = 5 / 0;", initialCode: "public class Main {\n  public static void main(String[] args) {\n    try {\n      int r = 5 / 2;\n      System.out.println(r);\n    } catch(ArithmeticException e) {\n      System.out.println(\"error\");\n    }\n  }\n}", expectedSolutionSnippet: "5 / 2", errorHint: "Fix the division. Dividing by zero throws ArithmeticException." },
        { id: "j15", language: "Java", title: "Private Access Modifier", brokenCode: "private static void main(String[] args)", initialCode: "public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"Hello\");\n  }\n}", expectedSolutionSnippet: "public static void main", errorHint: "The main method must be public so the JVM can call it." },
        { id: "j16", language: "Java", title: "Wrong Cast", brokenCode: "Object obj = \"text\";\nInteger n = (Integer) obj;", initialCode: "public class Main {\n  public static void main(String[] args) {\n    Object obj = \"text\";\n    String s = (String) obj;\n    System.out.println(s);\n  }\n}", expectedSolutionSnippet: "(String)", errorHint: "Cast to the actual type of the object â€” it's a String, not Integer." },
        { id: "j17", language: "Java", title: "Concatenation vs Addition", brokenCode: "System.out.println(\"Sum: \" + 1 + 2);", initialCode: "public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"Sum: \" + (1 + 2));\n  }\n}", expectedSolutionSnippet: "(1 + 2)", errorHint: "Without parentheses, + with String performs concatenation left-to-right." },
        { id: "j18", language: "Java", title: "Missing @Override", brokenCode: "public String tostring() { return \"x\"; }", initialCode: "public class Main {\n  @Override\n  public String toString() { return \"MyObj\"; }\n  public static void main(String[] args) {\n    System.out.println(new Main());\n  }\n}", expectedSolutionSnippet: "toString", errorHint: "Java is case-sensitive. Override uses toString(), not tostring()." },
        { id: "j19", language: "Java", title: "Infinite While Loop", brokenCode: "while(true) { i++; } // no break", initialCode: "public class Main {\n  public static void main(String[] args) {\n    int i = 0;\n    while(i < 5) {\n      System.out.println(i);\n      i++;\n    }\n  }\n}", expectedSolutionSnippet: "i < 5", errorHint: "Replace the infinite loop condition with a finite bound like i < 5." },
        { id: "j20", language: "Java", title: "Int vs float Division", brokenCode: "float res = 7 / 2;", initialCode: "public class Main {\n  public static void main(String[] args) {\n    float res = 7.0f / 2;\n    System.out.println(res);\n  }\n}", expectedSolutionSnippet: "7.0f", errorHint: "7/2 performs integer division. Use 7.0f to force float division." }
    ],
    "Python": [
        { id: "p01", language: "Python", title: "Missing Colon after if", brokenCode: "if x > 5\n  print(x)", initialCode: "x = 10\nif x > 5:\n    print(x)", expectedSolutionSnippet: "if x > 5:", errorHint: "if statements in Python must end with a colon (:)." },
        { id: "p02", language: "Python", title: "Indentation Error", brokenCode: "if True:\nprint('hi')", initialCode: "if True:\n    print('hi')", expectedSolutionSnippet: "    print", errorHint: "Python uses indentation to define code blocks. Indent the print statement." },
        { id: "p03", language: "Python", title: "Assignment in Condition", brokenCode: "if x = 5:", initialCode: "x = 0\nif x == 5:\n    print('five')", expectedSolutionSnippet: "x == 5", errorHint: "Use == for comparison. = is assignment and causes a SyntaxError in conditions." },
        { id: "p04", language: "Python", title: "String + Int", brokenCode: "print('Score: ' + score)", initialCode: "score = 90\nprint('Score: ' + str(score))", expectedSolutionSnippet: "str(score)", errorHint: "Python cannot concatenate str and int directly. Wrap the int with str()." },
        { id: "p05", language: "Python", title: "List .add() vs .append()", brokenCode: "nums.add(5)", initialCode: "nums = []\nnums.append(5)\nprint(nums)", expectedSolutionSnippet: "append", errorHint: "Python lists use .append() to add items, not .add() (that's for sets)." },
        { id: "p06", language: "Python", title: "Print Without Parentheses", brokenCode: "print 'Hello'", initialCode: "print('Hello')", expectedSolutionSnippet: "print(", errorHint: "In Python 3, print is a function and requires parentheses." },
        { id: "p07", language: "Python", title: "Wrong range() Arguments", brokenCode: "for i in range(5, 0):", initialCode: "for i in range(0, 5):\n    print(i)", expectedSolutionSnippet: "range(0, 5)", errorHint: "range(5, 0) produces no values. Use range(0, 5) to iterate from 0 to 4." },
        { id: "p08", language: "Python", title: "Missing self Parameter", brokenCode: "def greet():\n    print(self.name)", initialCode: "class Dog:\n    def __init__(self, name):\n        self.name = name\n    def greet(self):\n        print(self.name)", expectedSolutionSnippet: "def greet(self)", errorHint: "Instance methods in Python must have 'self' as the first parameter." },
        { id: "p09", language: "Python", title: "Missing Colon after for", brokenCode: "for i in range(5)\n    print(i)", initialCode: "for i in range(5):\n    print(i)", expectedSolutionSnippet: "range(5):", errorHint: "for loops in Python must end with a colon (:)." },
        { id: "p10", language: "Python", title: "Wrong Dictionary Key", brokenCode: "d = {'a': 1}\nprint(d['b'])", initialCode: "d = {'a': 1, 'b': 2}\nprint(d.get('b', 0))", expectedSolutionSnippet: ".get(", errorHint: "Accessing a non-existent key with [] raises KeyError. Use .get() or add the key." },
        { id: "p11", language: "Python", title: "Infinite While Loop", brokenCode: "i = 0\nwhile i >= 0:\n    print(i)\n    i += 1", initialCode: "i = 0\nwhile i < 5:\n    print(i)\n    i += 1", expectedSolutionSnippet: "i < 5", errorHint: "The loop condition never becomes False. Change to i < 5." },
        { id: "p12", language: "Python", title: "Integer vs Float Division", brokenCode: "result = 7 // 2\nprint(result) # expect 3.5", initialCode: "result = 7 / 2\nprint(result)", expectedSolutionSnippet: "7 / 2", errorHint: "// performs integer (floor) division. Use / for float division." },
        { id: "p13", language: "Python", title: "Missing f in f-string", brokenCode: "name = 'Ali'\nprint('{name} wins')", initialCode: "name = 'Ali'\nprint(f'{name} wins')", expectedSolutionSnippet: "f'", errorHint: "To embed variables in a string, add f before the quote: f'{name}'." },
        { id: "p14", language: "Python", title: "Undefined Variable", brokenCode: "print(total)", initialCode: "total = 0\ntotal += 10\nprint(total)", expectedSolutionSnippet: "total = 0", errorHint: "Declare and initialize 'total' before using it." },
        { id: "p15", language: "Python", title: "Missing return Statement", brokenCode: "def add(a, b):\n    a + b", initialCode: "def add(a, b):\n    return a + b\nprint(add(3, 4))", expectedSolutionSnippet: "return a + b", errorHint: "The function performs the addition but doesn't return the result. Add 'return'." },
        { id: "p16", language: "Python", title: "Wrong List Index", brokenCode: "nums = [1,2,3]\nprint(nums[3])", initialCode: "nums = [1,2,3]\nprint(nums[2])", expectedSolutionSnippet: "nums[2]", errorHint: "A list of 3 items has indices 0, 1, 2. Index 3 is out of range." },
        { id: "p17", language: "Python", title: "Missing colon after while", brokenCode: "while x < 10\n    x += 1", initialCode: "x = 0\nwhile x < 10:\n    x += 1\nprint(x)", expectedSolutionSnippet: "while x < 10:", errorHint: "while statements in Python must end with a colon (:)." },
        { id: "p18", language: "Python", title: "is vs ==", brokenCode: "x = 1000\nif x is 1000:", initialCode: "x = 1000\nif x == 1000:\n    print('match')", expectedSolutionSnippet: "x == 1000", errorHint: "Use == to compare values. 'is' checks object identity which can be unreliable for large integers." },
        { id: "p19", language: "Python", title: "Variable Name Starts with Digit", brokenCode: "1result = 5\nprint(1result)", initialCode: "result1 = 5\nprint(result1)", expectedSolutionSnippet: "result1", errorHint: "Variable names cannot start with a digit in Python. Rename to result1 or similar." },
        { id: "p20", language: "Python", title: "Missing import", brokenCode: "nums = [3,1,2]\nprint(sorted(nums))", initialCode: "import random\nnums = [3,1,2]\nrandom.shuffle(nums)\nprint(nums)", expectedSolutionSnippet: "import random", errorHint: "The random module must be imported before using random.shuffle()." }
    ]
};

export function getDebuggingChallenges(language: "C" | "Java" | "Python", count: number = 5): CodeChallenge[] {
    const pool = L4_SIMPLE_POOL[language] || L4_SIMPLE_POOL["C"];
    return [...pool].sort(() => 0.5 - Math.random()).slice(0, count);
}

// Kept for backward compatibility (Level 5 uses the first item)
export function getSingleDebuggingChallenge(language: "C" | "Java" | "Python"): CodeChallenge {
    const pool = L4_SIMPLE_POOL[language] || L4_SIMPLE_POOL["C"];
    return pool[Math.floor(Math.random() * pool.length)];
}
