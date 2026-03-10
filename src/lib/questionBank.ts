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
            { word: "ALGORITHM", clue: "Steps to solve a problem." },
            { word: "COMPILER", clue: "Translates code to machine language." },
            { word: "POINTER", clue: "Stores a memory address." },
            { word: "ARRAY", clue: "List of items in memory." },
            { word: "FUNCTION", clue: "Reusable block of code." },
            { word: "VARIABLE", clue: "Named storage in memory." },
            { word: "SYNTAX", clue: "Rules of a language." },
            { word: "BINARY", clue: "Base-2 number system." }
        ],
        "ece": [
            { word: "RESISTOR", clue: "Limits electric current." },
            { word: "VOLTAGE", clue: "Electric potential." },
            { word: "CURRENT", clue: "Flow of charge." },
            { word: "DIODE", clue: "One-way current flow." },
            { word: "CIRCUIT", clue: "Path for electricity." },
            { word: "TRANSISTOR", clue: "Amplify or switch signals." },
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
            { word: "INHERITANCE", clue: "Mechanism where one class acquires the properties of another." },
            { word: "POLYMORPHISM", clue: "Ability of an object to take on many forms." },
            { word: "ENCAPSULATION", clue: "Wrapping of data and methods into a single unit." },
            { word: "LINKEDLIST", clue: "A linear data structure where elements are not stored at contiguous locations." },
            { word: "STACK", clue: "A linear data structure which follows LIFO (Last In First Out)." },
            { word: "QUEUE", clue: "A linear data structure which follows FIFO (First In First Out)." }
        ],
        "ece": [
            { word: "AMPLIFIER", clue: "A device that increases the power of a signal." },
            { word: "OSCILLATOR", clue: "An electronic circuit that produces a periodic, oscillating signal." },
            { word: "MODULATION", clue: "Process of varying properties of a periodic waveform." },
            { word: "OPAMP", clue: "Operational Amplifier." },
            { word: "SIGNAL", clue: "A physical quantity that varies with time, space, or any other variable." },
            { word: "SYSTEM", clue: "A combination of components that act together to perform a function." },
            { word: "BOOLEAN", clue: "A type of algebra used in digital logic." },
            { word: "LOGIC", clue: "The study of formal reasoning." }
        ],
        "mech": [
            { word: "KINEMATICS", clue: "The branch of mechanics concerned with motion without forces." },
            { word: "DYNAMICS", clue: "Mechanics concerned with the motion of bodies under forces." },
            { word: "THERMODYNAMICS", clue: "Relationship between heat and other forms of energy." },
            { word: "FLUID", clue: "A substance that has no fixed shape and yields to external pressure." },
            { word: "ENTROPY", clue: "A measure of disorder or randomness in a system." },
            { word: "ENTHALPY", clue: "A property of a thermodynamic system equal to inner energy plus PV." },
            { word: "CARNOT", clue: "Scientist famous for the most efficient heat engine cycle." },
            { word: "VISCOSITY", clue: "A measure of a fluid's resistance to flow." }
        ],
        "ce": [
            { word: "FLUID", clue: "A substance that flows." },
            { word: "MECHANICS", clue: "The branch of science concerned with the behavior of physical bodies." },
            { word: "SURVEYING", clue: "Technique of determining terrestrial position of points." },
            { word: "LEVELING", clue: "Finding the difference in elevation between points." },
            { word: "CONTOUR", clue: "An imaginary line on the ground joining points of equal elevation." },
            { word: "THEODOLITE", clue: "Precision optical instrument for measuring angles." },
            { word: "STRESS", clue: "Force per unit area." },
            { word: "DEFLECTION", clue: "The degree to which a structural element is displaced under a load." }
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
            { word: "THREAD", clue: "Smallest unit of execution within a process." },
            { word: "DEADLOCK", clue: "A situation where processes are blocked forever." },
            { word: "PAGING", clue: "Memory management scheme that eliminates the need for contiguous allocation." },
            { word: "RELATIONAL", clue: "Type of database based on the relational model." },
            { word: "NORMALIZATION", clue: "Process of organizing data in a database to reduce redundancy." },
            { word: "TRANSACTION", clue: "A sequence of database operations processed as a single unit." },
            { word: "DATAGRAM", clue: "A self-contained, independent entity of data." }
        ],
        "ece": [
            { word: "MICROPROCESSOR", clue: "An IC that contains the functions of a CPU." },
            { word: "MICROCONTROLLER", clue: "A small computer on a single IC." },
            { word: "ANTENNA", clue: "Interface between radio waves and electric currents." },
            { word: "WAVEGUIDE", clue: "Structure that guides waves, such as EM waves." },
            { word: "DSP", clue: "Digital Signal Processing." },
            { word: "VLSI", clue: "Very Large Scale Integration." },
            { word: "CMOS", clue: "Complementary Metal-Oxide Semiconductor." },
            { word: "EMBEDDED", clue: "Computer system combined with hardware." }
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
            { word: "CONCRETE", clue: "Composite building material made from aggregate and cement." },
            { word: "STEEL", clue: "Alloy of iron and carbon." },
            { word: "STRUCTURE", clue: "System of connected parts used to support a load." },
            { word: "FOUNDATION", clue: "The element of a structure which connects it to the ground." },
            { word: "SOIL", clue: "Mixture of organic matter, minerals, gases, liquids, and organisms." },
            { word: "BEARING", clue: "Capacity of soil to support loads." },
            { word: "REINFORCEMENT", clue: "Strengthening of concrete." },
            { word: "HIGHWAY", clue: "Public road for heavy traffic." }
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
            { word: "CLOUD", clue: "On-demand availability of computer system resources." },
            { word: "MACHINE", clue: "A device that uses energy to perform some action." },
            { word: "LEARNING", clue: "A branch of AI focused on building systems that learn from data." },
            { word: "SECURITY", clue: "Protection of computer systems from information disclosure." },
            { word: "NETWORK", clue: "A set of computers sharing resources." },
            { word: "AGILE", clue: "Methods for software development based on iterative development." },
            { word: "SCRUM", clue: "Framework for project management." },
            { word: "DEVOPS", clue: "Set of practices that combine software development and IT operations." }
        ],
        "ece": [
            { word: "IOT", clue: "Internet of Things." },
            { word: "WIRELESS", clue: "Communication without wires." },
            { word: "OPTICAL", clue: "Relating to sight or light." },
            { word: "SATELLITE", clue: "An artificial body placed in orbit round the earth." },
            { word: "RADAR", clue: "System for detecting the presence, direction, distance, and speed of objects." },
            { word: "NANOTECH", clue: "Manipulation of matter on an atomic, molecular, and supramolecular scale." },
            { word: "ROBOTICS", clue: "Interdisciplinary branch of engineering and science." },
            { word: "AUTOMATION", clue: "Use of largely automatic equipment." }
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

const L3_MCQS: Record<AcademicYear, Record<Department, MCQQuestion[]>> = {
    "1st Year": {
        "cse": [
            { id: 101, question: "Which of the following is NOT a fundamental data type in C?", options: ["int", "float", "string", "char"], correct: 2, explanation: "C does not have a built-in 'string' type; arrays of char are used instead." },
            { id: 102, question: "What does the 'sizeof' operator evaluate?", options: ["Execution time", "Memory size in bytes", "String length", "Array size"], correct: 1, explanation: "sizeof returns memory footprint." },
            { id: 103, question: "Which header file is required for printf()?", options: ["conio.h", "math.h", "stdio.h", "stdlib.h"], correct: 2, explanation: "stdio.h stands for Standard Input Output." },
            { id: 104, question: "What is the result of 5 / 2 in integer division in C?", options: ["2.5", "2", "3", "0"], correct: 1, explanation: "Integer division truncates decimals." },
            { id: 105, question: "Which of these is used for multi-line comments in C?", options: ["//", "/* */", "--", "#"], correct: 1, explanation: "/* */ is standard for multi-line." },
            { id: 106, question: "What is the escape sequence for a newline?", options: ["\\t", "\\r", "\\n", "\\b"], correct: 2, explanation: "\\n is newline." },
            { id: 107, question: "Complexity of Binary Search?", options: ["O(n)", "O(log n)", "O(n^2)", "O(1)"], correct: 1, explanation: "Divide and conquer." },
            { id: 108, question: "Which logic gate is universal?", options: ["AND", "OR", "NAND", "XOR"], correct: 2, explanation: "NAND can build all." },
            { id: 109, question: "First index of an array in C?", options: ["0", "1", "-1", "any"], correct: 0, explanation: "0-based." }
        ],
        "ece": [
            { id: 121, question: "KCL is based on the law of conservation of:", options: ["Energy", "Momentum", "Charge", "Mass"], correct: 2, explanation: "KCL states charge cannot be created/destroyed at a node." },
            { id: 122, question: "An ideal voltmeter has:", options: ["Zero resistance", "Infinite resistance", "Finite small", "Reactance"], correct: 1, explanation: "Infinite resistance prevents current flow." },
            { id: 123, question: "Silicon is a:", options: ["Conductor", "Semiconductor", "Insulator", "Superconductor"], correct: 1, explanation: "Silicon is the base of electronics." },
            { id: 124, question: "What is the unit of Capacitance?", options: ["Ohm", "Henry", "Farad", "Volt"], correct: 2, explanation: "Farad (F)." },
            { id: 125, question: "PN junction diode allows current in:", options: ["Both directions", "One direction", "Neither", "Depends on heat"], correct: 1, explanation: "Diodes are unidirectional." },
            { id: 126, question: "Resistance of an ideal wire is:", options: ["Infinite", "Zero", "1 Ohm", "Variable"], correct: 1, explanation: "Ideal wires have no lost energy." },
            { id: 127, question: "Unit of Inductance?", options: ["Farad", "Henry", "Ohm", "Watt"], correct: 1, explanation: "Henry (H)." },
            { id: 128, question: "Which component stores energy in a magnetic field?", options: ["Resistor", "Capacitor", "Inductor", "Transistor"], correct: 2, explanation: "Inductors store magnetic energy." },
            { id: 129, question: "Zener diode is used for:", options: ["Rectification", "Amplification", "Voltage Regulation", "Filtering"], correct: 2, explanation: "Works in breakdown region." }
        ],
        "mech": [
            { id: 131, question: "Newton's Second Law relates force to:", options: ["Velocity/Time", "Mass/Acceleration", "Work/Distance", "Pressure/Area"], correct: 1, explanation: "F = ma." },
            { id: 132, question: "Hooke's Law holds good up to:", options: ["Yield point", "Proportionality limit", "Breaking point", "Elastic limit"], correct: 1, explanation: "Stress prop to Strain." },
            { id: 133, question: "Unit of Work is:", options: ["Watt", "Newton", "Joule", "Pascal"], correct: 2, explanation: "Joule (J)." },
            { id: 134, question: "Vector quantity among these is:", options: ["Mass", "Distance", "Velocity", "Temperature"], correct: 2, explanation: "Velocity has direction." },
            { id: 135, question: "Power is defined as:", options: ["Force x Time", "Work / Time", "Mass x Velocity", "Force / Area"], correct: 1, explanation: "Rate of doing work." },
            { id: 136, question: "Density is defined as:", options: ["Mass x Volume", "Volume / Mass", "Mass / Volume", "Weight / Area"], correct: 2, explanation: "m / V." },
            { id: 137, question: "Boiling point of water at 1 atm?", options: ["0 C", "100 C", "200 C", "373 C"], correct: 1, explanation: "100 Degrees Celsius." },
            { id: 138, question: "What is the unit of Pressure?", options: ["Newton", "Joule", "Pascal", "Watt"], correct: 2, explanation: "Pascal (Pa)." },
            { id: 139, question: "Which is a simple machine?", options: ["Lever", "Car", "Engine", "Robot"], correct: 0, explanation: "Basic mechanical advantage." }
        ],
        "ce": [
            { id: 141, question: "Unit of force in SI system:", options: ["Dyne", "Newton", "Pound", "Joule"], correct: 1, explanation: "Newton." },
            { id: 142, question: "Moment of force is product of force and:", options: ["Parallel dist", "Perpendicular dist", "Velocity", "Time"], correct: 1, explanation: "M = F * d_perp." },
            { id: 143, question: "Friction always acts in direction:", options: ["Parallel", "Perpendicular", "Opposite to motion", "45 deg"], correct: 2, explanation: "Opposes motion." },
            { id: 144, question: "Stress is defined as:", options: ["Force / Area", "Force x Area", "Mass / Area", "Volume / Force"], correct: 0, explanation: "Standard definition." },
            { id: 145, question: "The SI unit of pressure is:", options: ["Newton", "Joule", "Pascal", "Watt"], correct: 2, explanation: "Pascal (N/m^2)." },
            { id: 146, question: "A body at rest is in:", options: ["Motion", "Static equilibrium", "Dynamic equilibrium", "Acceleration"], correct: 1, explanation: "Sum of forces = 0." },
            { id: 147, question: "Purpose of a surveyor?", options: ["Map making", "Cooking", "Driving", "Painting"], correct: 0, explanation: "Land measurement." },
            { id: 148, question: "Full form of RCC?", options: ["Reinforced Cement Concrete", "Rapid Core C", "Real Civil C", "None"], correct: 0, explanation: "Steel + Concrete." },
            { id: 149, question: "Material used to make concrete?", options: ["Water+Cement+Sand", "Oil+Iron", "Plastic+Mud", "None"], correct: 0, explanation: "Binders and aggregates." }
        ],
        "csM": [
            { id: 151, question: "Primary library for data manipulation in Python?", options: ["Numpy", "Pandas", "Matplotlib", "Scikit"], correct: 1, explanation: "Pandas for dataframes." },
            { id: 152, question: "Keyword to define a function in Python?", options: ["func", "def", "lambda", "function"], correct: 1, explanation: "def." },
            { id: 153, question: "Standard Mean is:", options: ["Sum", "Sum / Count", "Product", "Middle"], correct: 1, explanation: "Average." },
            { id: 154, question: "What is an Outlier?", options: ["Center value", "Extreme value", "Average value", "Most frequent"], correct: 1, explanation: "Data point significantly different from others." },
            { id: 155, question: "Median of [1, 3, 5] is?", options: ["1", "3", "5", "9"], correct: 1, explanation: "Middle value." },
            { id: 156, question: "Python is a ___ type language.", options: ["Compiled", "Interpreted", "Low level", "Hardware"], correct: 1, explanation: "Interpreted." },
            { id: 157, question: "Which is a tuple?", options: ["(1,2)", "[1,2]", "{1,2}", "<1,2>"], correct: 0, explanation: "Parentheses indicate tuple." },
            { id: 158, question: "Library for numerical computing in Python?", options: ["Numpy", "Flask", "Django", "PyGame"], correct: 0, explanation: "NumPy is the base for math." },
            { id: 159, question: "What is AI?", options: ["Artificial Intelligence", "Auto Info", "Actual Input", "None"], correct: 0, explanation: "Machine smarts." }
        ],
        "csd": [
            { id: 161, question: "What does UI stand for?", options: ["User Interface", "User Input", "User Info", "User Interaction"], correct: 0, explanation: "User Interface." },
            { id: 162, question: "What does UX stand for?", options: ["User Experience", "User Extreme", "User Example", "User Expand"], correct: 0, explanation: "User Experience." },
            { id: 163, question: "Primary color model for screen?", options: ["RGB", "CMYK", "HSL", "RYB"], correct: 0, explanation: "Red Green Blue." },
            { id: 164, question: "Which tool is for UI design?", options: ["Figma", "Excel", "Word", "Outlook"], correct: 0, explanation: "Figma is industry standard." },
            { id: 165, question: "What is a wireframe?", options: ["Low-fi sketch", "High-fi code", "Database schema", "Hardware frame"], correct: 0, explanation: "A simple visual guide." },
            { id: 166, question: "What is white space?", options: ["Empty area", "White text", "Clean code", "Empty folder"], correct: 0, explanation: "Breathing room in design." },
            { id: 167, question: "What is a font?", options: ["Text style", "Image type", "Color code", "Web address"], correct: 0, explanation: "Typography style." },
            { id: 168, question: "What is a Mockup?", options: ["Static design", "Working code", "Meeting", "File name"], correct: 0, explanation: "Visual representation." },
            { id: 169, question: "Which is a design principle?", options: ["Balance", "Gravity", "Friction", "Torque"], correct: 0, explanation: "Visual harmony." }
        ]
    },
    "2nd Year": {
        "cse": [
            { id: 201, question: "In Java, standard classes are inherited from:", options: ["System", "Class", "Object", "Main"], correct: 2, explanation: "java.lang.Object." },
            { id: 202, question: "Optimal DS for priority queue?", options: ["Linked List", "BST", "Heap", "Hash Table"], correct: 2, explanation: "Heaps for O(log n)." },
            { id: 203, question: "Time complexity of linear search?", options: ["O(log n)", "O(1)", "O(n^2)", "O(n)"], correct: 3, explanation: "Worst case n." },
            { id: 204, question: "Which is not an OOP concept?", options: ["Encapsulation", "Inheritance", "Compilation", "Polymorphism"], correct: 2, explanation: "Compilation is a process." },
            { id: 205, question: "Private members can be accessed by:", options: ["Child classes", "Same class", "Main method", "Public methods"], correct: 1, explanation: "Strict class scope." },
            { id: 206, question: "Java uses which for memory management?", options: ["Manual delete", "Garbage Collector", "Destructors", "Free()"], correct: 1, explanation: "Automatic GC." },
            { id: 207, question: "Which collection allows unique elements only?", options: ["List", "Set", "Map", "Vector"], correct: 1, explanation: "Sets don't allow duplicates." },
            { id: 208, question: "Size of 'int' in Java?", options: ["16-bit", "32-bit", "64-bit", "8-bit"], correct: 1, explanation: "Standard 4 bytes." },
            { id: 209, question: "Keyword to inherit a class in Java?", options: ["implements", "extends", "inherits", "import"], correct: 1, explanation: "extends for classes." },
            { id: 210, question: "Constructor return type is:", options: ["void", "int", "None", "class name"], correct: 2, explanation: "No return type allowed." }
        ],
        "ece": [
            { id: 221, question: "Op-Amp ideally has:", options: ["Zero input imp", "Inf input imp", "Inf output imp", "Unity gain"], correct: 1, explanation: "Infinite input impedance." },
            { id: 222, question: "In boolean algebra, A + A.B equals:", options: ["A", "B", "A.B", "1"], correct: 0, explanation: "A(1+B) = A." },
            { id: 223, question: "Base of Hexadecimal?", options: ["2", "8", "10", "16"], correct: 3, explanation: "16." },
            { id: 224, question: "AND gate output is 1 if:", options: ["Any input 1", "No input 1", "All inputs 1", "Inputs different"], correct: 2, explanation: "Strict AND logic." },
            { id: 225, question: "Binary 1010 in decimal is?", options: ["8", "10", "12", "14"], correct: 1, explanation: "8+2." },
            { id: 226, question: "Zener diode is used for:", options: ["Amplification", "Rectification", "Voltage regulation", "Oscillation"], correct: 2, explanation: "Works in breakdown region." },
            { id: 227, question: "Mod/Base of a 4-bit Counter is:", options: ["4", "8", "16", "32"], correct: 2, explanation: "2^4 = 16." },
            { id: 228, question: "How many selection lines for 8:1 MUX?", options: ["2", "3", "4", "8"], correct: 1, explanation: "2^3 = 8." },
            { id: 229, question: "Flip-flop that has both J and K as 1 toggles:", options: ["SR", "D", "JK", "T"], correct: 2, explanation: "JK property." },
            { id: 230, question: "Karnaugh Map is used for:", options: ["Minimizing logic", "Multiplying", "Adding", "None"], correct: 0, explanation: "Simplification." }
        ],
        "mech": [
            { id: 231, question: "First law of thermodynamics is law of conservation of:", options: ["Momentum", "Mass", "Energy", "Entropy"], correct: 2, explanation: "Energy conserved." },
            { id: 232, question: "In reversible process, entropy of universe:", options: ["Increases", "Decreases", "Constant", "Unknown"], correct: 2, explanation: "Total entropy constant in ideal reversibility." },
            { id: 233, question: "Bernoulli equation applies to:", options: ["Viscous", "Compressible", "Ideal incompressible", "Turbulent"], correct: 2, explanation: "Inviscid/Incompressible." },
            { id: 234, question: "Viscosity of water compared to air is:", options: ["Higher", "Lower", "Same", "Zero"], correct: 0, explanation: "Water is more viscous." },
            { id: 235, question: "Centrifugal pump is a ___ machine.", options: ["Power absorbing", "Power producing", "Static", "Efficiency"], correct: 0, explanation: "Takes work to move fluid." },
            { id: 236, question: "Standard gravity (g) value in m/s^2:", options: ["8.9", "9.81", "10.5", "7.5"], correct: 1, explanation: "Constant." },
            { id: 237, question: "Otto cycle is used in:", options: ["Petrol engine", "Diesel engine", "Steam engine", "None"], correct: 0, explanation: "Spark ignition." },
            { id: 238, question: "Point at which fluid stops moving:", options: ["Stagnation", "Static", "Dynamic", "None"], correct: 0, explanation: "Stagnation point." },
            { id: 239, question: "Efficiency of Carnot engine depends on:", options: ["Working fluid", "Temperature limits", "Speed", "Load"], correct: 1, explanation: "Source and sink temp." },
            { id: 240, question: "Pascal's law relates to:", options: ["Solid", "Fluid pressure", "Gas only", "None"], correct: 1, explanation: "Fluid mechanics." }
        ],
        "ce": [
            { id: 241, question: "Determining heights of points is called:", options: ["Levelling", "Contouring", "Surveying", "Traversing"], correct: 0, explanation: "Levelling." },
            { id: 242, question: "Purpose of Theodolite?", options: ["Distances", "Angles", "Flow", "Pressure"], correct: 1, explanation: "Measuring angles." },
            { id: 243, question: "Stress at which material breaks:", options: ["Yield", "Ultimate", "Failure", "Working"], correct: 2, explanation: "Breaking point." },
            { id: 244, question: "Contours of equal elevation that close indicate a:", options: ["Valley", "Hill or Depression", "Cliff", "Road"], correct: 1, explanation: "Circular contours." },
            { id: 245, question: "Unit of Stress:", options: ["N", "N/m", "N/m^2", "m"], correct: 2, explanation: "Pascal." },
            { id: 246, question: "Concrete is strong in:", options: ["Tension", "Compression", "Torsion", "Bending"], correct: 1, explanation: "Brittle nature." },
            { id: 247, question: "Scale of a map is 1:100. 1cm on map is:", options: ["1cm", "1m", "10m", "100m"], correct: 1, explanation: "100cm = 1m." },
            { id: 248, question: "Which is a coarse aggregate?", options: ["Sand", "Gravel", "Cement", "Water"], correct: 1, explanation: "Large particles." },
            { id: 249, question: "Bearing capacity is for:", options: ["Beam", "Soil", "Road", "Steel"], correct: 1, explanation: "Foundation support." },
            { id: 250, question: "Slump test is for:", options: ["Durability", "Workability", "Strength", "None"], correct: 1, explanation: "Consistency of concrete." }
        ],
        "csM": [
            { id: 251, question: "Algorithm for Linear Regression?", options: ["Gradient Descent", "Backprop", "K-Means", "Dijkstra"], correct: 0, explanation: "Minimizes cost." },
            { id: 252, question: "Standard Deviation measures:", options: ["Central tendency", "Dispersion", "Probability", "Linearity"], correct: 1, explanation: "Spread of data." },
            { id: 253, question: "Numpy stands for:", options: ["Number Py", "Numerical Py", "Null Py", "New Py"], correct: 1, explanation: "Numerical Python." },
            { id: 254, question: "Normal Distribution is also called:", options: ["Bell curve", "S-Curve", "Step curve", "Log curve"], correct: 0, explanation: "Symmetric shape." },
            { id: 255, question: "Correlation coefficient range:", options: ["0 to 1", "-1 to 1", "-inf to inf", "0 to inf"], correct: 1, explanation: "Pearson r." },
            { id: 256, question: "Target variable in regression is:", options: ["Discrete", "Continuous", "Categorical", "Binary"], correct: 1, explanation: "Real numbers." },
            { id: 257, question: "Which is a classification algorithm?", options: ["Linear Regression", "Logistic Regression", "K-Means", "PCA"], correct: 1, explanation: "Logistic is for categories." },
            { id: 258, question: "What is 'Overfitting'?", options: ["Model too simple", "Model too complex", "No data", "Fast training"], correct: 1, explanation: "Memorizing noise." },
            { id: 259, question: "Common activation function?", options: ["Sigmoid", "Plus", "Minus", "Divide"], correct: 0, explanation: "Squash values." },
            { id: 260, question: "Data splitting ratio (typical)?", options: ["50/50", "80/20", "100/0", "10/90"], correct: 1, explanation: "Train / Test." }
        ],
        "csd": [
            { id: 261, question: "What is Responsive Design?", options: ["Adapts to screen size", "High speed", "New colors", "Database type"], correct: 0, explanation: "Critical for mobile web." },
            { id: 262, question: "Which is a CSS framework?", options: ["Tailwind", "Java", "Python", "SQL"], correct: 0, explanation: "Utility-first CSS." },
            { id: 263, question: "What is an SVG?", options: ["Vector image", "Video file", "Source code", "Sound file"], correct: 0, explanation: "Scalable Vector Graphics." },
            { id: 264, question: "What is a HEX code?", options: ["Color code", "Secret key", "File type", "User ID"], correct: 0, explanation: "Hexadecimal color." },
            { id: 265, question: "What is accessibility in design?", options: ["Design for all", "Fast loading", "Rich colors", "Cloud storage"], correct: 0, explanation: "Inclusive design." },
            { id: 266, question: "What does DOM stand for?", options: ["Document Object Model", "Data Object Main", "Digital Online Mark", "Direct Order Map"], correct: 0, explanation: "Web page structure." },
            { id: 267, question: "Space between element border and content?", options: ["Margin", "Padding", "Gap", "Border"], correct: 1, explanation: "Padding." },
            { id: 268, question: "Space outside element border?", options: ["Margin", "Padding", "Gap", "Radius"], correct: 0, explanation: "Margin." },
            { id: 269, question: "Which property makes text bold?", options: ["font-weight", "font-size", "font-style", "text-decoration"], correct: 0, explanation: "Weight controls thickness." },
            { id: 270, question: "Media queries are used for:", options: ["Interactivity", "Responsiveness", "Database", "Security"], correct: 1, explanation: "Screen adaptive design." }
        ]
    },
    "3rd Year": {
        "cse": [
            { id: 301, question: "Property NOT required for deadlock?", options: ["Mutual Exclusion", "Hold and Wait", "Preemption", "Circular Wait"], correct: 2, explanation: "NO preemption required." },
            { id: 302, question: "In database, ACID stands for:", options: ["Atomicity...", "Accuracy...", "Allocation...", "None"], correct: 0, explanation: "A,C,I,D." },
            { id: 303, question: "OSI layer for IP protocol?", options: ["Data Link", "Network", "Transport", "Session"], correct: 1, explanation: "Layer 3." },
            { id: 304, question: "Which scheduling is non-preemptive?", options: ["Round Robin", "FCFS", "Priority", "SRTF"], correct: 1, explanation: "First Come First Served." },
            { id: 305, question: "HTTP port?", options: ["21", "25", "80", "443"], correct: 2, explanation: "Standard web port." },
            { id: 306, question: "What is a Trojan Horse?", options: ["Protocol", "Hardware", "Malware disguised as good", "Antivirus"], correct: 2, explanation: "Security threat." },
            { id: 307, question: "B-Tree is primarily for:", options: ["Main memory", "Disk storage", "CPU Cache", "Registers"], correct: 1, explanation: "Indexing large data." },
            { id: 308, question: "Which is a synchronization tool?", options: ["Semaphore", "Thread", "Process", "Socket"], correct: 0, explanation: "Prevents race conditions." },
            { id: 309, question: "Virtual memory uses:", options: ["RAM only", "Disk space as RAM", "Cache only", "None"], correct: 1, explanation: "Extends physical memory." },
            { id: 310, question: "TCP is ___ protocol.", options: ["Connectionless", "Connection-oriented", "Hardware", "None"], correct: 1, explanation: "Handshake required." }
        ],
        "ece": [
            { id: 321, question: "8085 is an ____ bit processor.", options: ["4", "8", "16", "32"], correct: 1, explanation: "8-bit data bus." },
            { id: 322, question: "Aliasing occurs when:", options: ["fs > 2f", "fs < 2f", "Amp increased", "Filtered"], correct: 1, explanation: "Nyquist fails." },
            { id: 323, question: "CMOS stands for:", options: ["Complementary Metal-Oxide...", "Complex...", "Capacitive...", "Current..."], correct: 0, explanation: "n-type + p-type." },
            { id: 324, question: "Modulation is done at:", options: ["Transmitter", "Receiver", "Channel", "Antenna"], correct: 0, explanation: "Encoding signal." },
            { id: 325, question: "Full Duplex means:", options: ["One way", "Two way alternate", "Two way simultaneous", "No way"], correct: 2, explanation: "Phone call type." },
            { id: 326, question: "Microprocessor 8086 has address bus of:", options: ["8 bit", "16 bit", "20 bit", "32 bit"], correct: 2, explanation: "1MB memory addressable." },
            { id: 327, question: "The number of flags in 8085 is:", options: ["3", "5", "8", "10"], correct: 1, explanation: "Sign, Zero, Auxiliary Carry, Parity, Carry." },
            { id: 328, question: "Which is a non-maskable interrupt?", options: ["TRAP", "RST 7.5", "RST 6.5", "INTR"], correct: 0, explanation: "TRAP has highest priority." },
            { id: 329, question: "A system with multiple inputs and outputs is:", options: ["SISO", "MIMO", "SIMO", "MISO"], correct: 1, explanation: "Multiple Input Multiple Output." },
            { id: 330, question: "Unit of Gain in Decibels (dB) is:", options: ["Joule", "Watt", "Dimensionless Ratio", "None"], correct: 2, explanation: "Logarithmic ratio." }
        ],
        "mech": [
            { id: 331, question: "Stefan-Boltzmann law is for:", options: ["Conduction", "Convection", "Thermal Radiation", "Mass Transfer"], correct: 2, explanation: "Power radiated." },
            { id: 332, question: "Pouring molten metal into mold:", options: ["Forging", "Welding", "Machining", "Casting"], correct: 3, explanation: "Casting." },
            { id: 333, question: "In orthogonal cutting, edge is:", options: ["Parallel", "Perpendicular", "Acute", "Obtuse"], correct: 1, explanation: "90 deg." },
            { id: 334, question: "Heat engine converts heat into:", options: ["Work", "Mass", "Density", "Gravity"], correct: 0, explanation: "Energy conversion." },
            { id: 335, question: "COP is for:", options: ["Engines", "Refrigerators", "Pumps", "Motors"], correct: 1, explanation: "Coefficient of Performance." },
            { id: 336, question: "Latent heat is heat for:", options: ["Phase change", "Temp change", "Force change", "Mass change"], correct: 0, explanation: "Constant temp." },
            { id: 337, question: "Which is a surface hardening process?", options: ["Annealing", "Nitriding", "Tempering", "Normalizing"], correct: 1, explanation: "Hardens only the outer layer." },
            { id: 338, question: "Governor is used to control:", options: ["Mean speed", "Cyclic speed", "Load", "Pressure"], correct: 0, explanation: "Regulates fuel based on load." },
            { id: 339, question: "Unit of Thermal Conductivity?", options: ["W/m-K", "J/s", "N/m", "None"], correct: 0, explanation: "Standard SI." },
            { id: 340, question: "Torsion test determines:", options: ["Modulus of Elasticity", "Modulus of Rigidity", "Bulk Modulus", "None"], correct: 1, explanation: "Shear properties." }
        ],
        "ce": [
            { id: 341, question: "Strength of M20 concrete at 28 days:", options: ["10 MPa", "15 MPa", "20 MPa", "25 MPa"], correct: 2, explanation: "N/mm^2 unit." },
            { id: 342, question: "Reinforcement material in concrete:", options: ["Aluminum", "Copper", "Steel", "Iron"], correct: 2, explanation: "Steel." },
            { id: 343, question: "Bearing capacity is:", options: ["Permeability", "Support loads", "Moisture", "Density"], correct: 1, explanation: "Soil strength." },
            { id: 344, question: "Piles are used in ___ foundation.", options: ["Shallow", "Deep", "Isolated", "Combined"], correct: 1, explanation: "Transfer load to deep strata." },
            { id: 345, question: "Slump test is for:", options: ["Strength", "Workability", "Durability", "Elasticity"], correct: 1, explanation: "Consistency of concrete." },
            { id: 346, question: "Cement setting time:", options: ["10 min", "30 min (Initial)", "10 hours (Final)", "Both B and C"], correct: 3, explanation: "Standard ASTM." },
            { id: 347, question: "Size of standard modular brick?", options: ["19x9x9 cm", "20x10x10 cm", "23x11x7 cm", "None"], correct: 0, explanation: "Standard dimensions." },
            { id: 348, question: "The main constituent of cement is:", options: ["Alumina", "Lime", "Silica", "Iron oxide"], correct: 1, explanation: "Calcium carbonate based." },
            { id: 349, question: "Unit weight of RCC (kg/m3):", options: ["2400", "2500", "2000", "1500"], correct: 1, explanation: "Standard estimate." },
            { id: 350, question: "DPC stands for:", options: ["Damp Proof Course", "Dry Pipe Circle", "Dual Point Connection", "None"], correct: 0, explanation: "Moisture barrier." }
        ],
        "csM": [
            { id: 351, question: "What is a 'Perceptron'?", options: ["Hidden layer", "Single layer NN", "Activation", "Dataset"], correct: 1, explanation: "Simplest NN." },
            { id: 352, question: "Function outputs between 0 and 1?", options: ["ReLU", "Sigmoid", "Tanh", "Softmax"], correct: 1, explanation: "Sigmoid." },
            { id: 353, question: "Backpropagation is for:", options: ["Cleaning", "Updating weights", "Clustering", "Visualizing"], correct: 1, explanation: "Gradient calculation." },
            { id: 354, question: "Supervised learning requires:", options: ["Labels", "No labels", "Large CPU", "Internet"], correct: 0, explanation: "Matching inputs to targets." },
            { id: 355, question: "K-Means is for:", options: ["Classification", "Clustering", "Regression", "Cleaning"], correct: 1, explanation: "Unsupervised grouping." },
            { id: 356, question: "CNN stands for:", options: ["Computer Neural Net", "Convolutional Neural Net", "Circuit Neural Net", "Circular Neural Net"], correct: 1, explanation: "Image processing." },
            { id: 357, question: "What is 'Pruning' in Decision Trees?", options: ["Growing branches", "Removing branches", "Splitting nodes", "None"], correct: 1, explanation: "Reduces complexity/overfitting." },
            { id: 358, question: "Which is a generative model?", options: ["GAN", "SVM", "KNN", "Dijkstra"], correct: 0, explanation: "Generative Adversarial Net." },
            { id: 359, question: "NLP technique to find root of word?", options: ["Stemming", "Pruning", "Hashing", "None"], correct: 0, explanation: "Reduces words like 'running' to 'run'." },
            { id: 360, question: "A 'Neuron' in NN is primarily:", options: ["A mathematical function", "Hardware chip", "Physical wire", "None"], correct: 0, explanation: "Abstract computation unit." }
        ],
        "csd": [
            { id: 361, question: "What is a 'Prototype'?", options: ["Test version", "Final code", "Server type", "Database"], correct: 0, explanation: "Preliminary model." },
            { id: 362, question: "What is A/B testing?", options: ["Comparing versions", "Coding test", "Hardware test", "Grade test"], correct: 0, explanation: "Testing two variants." },
            { id: 363, question: "What is a 'Persona'?", options: ["User profile", "Password", "Code name", "Icon"], correct: 0, explanation: "Representative user." },
            { id: 364, question: "What is 'Pain point'?", options: ["User problem", "Code error", "Design color", "Server lag"], correct: 0, explanation: "Specific problem faced by users." },
            { id: 365, question: "What is 'Affordance'?", options: ["Design hint for use", "Project cost", "Color depth", "Font size"], correct: 0, explanation: "Visual clue to function." },
            { id: 366, question: "What is 'Mental model'?", options: ["User's belief on how it works", "AI logic", "Database design", "Design software"], correct: 0, explanation: "User's internal understanding." },
            { id: 367, question: "Which is a UX law?", options: ["Hick's Law", "Newton's Law", "Ohm's Law", "None"], correct: 0, explanation: "Time to decide increases with choices." },
            { id: 368, question: "What is 'Grid System'?", options: ["Alignment tool", "Database type", "Hardware frame", "None"], correct: 0, explanation: "Helper for layout consistency." },
            { id: 369, question: "What is 'Typography'?", options: ["Font design", "Map making", "Code style", "None"], correct: 0, explanation: "Art of arranging type." },
            { id: 370, question: "User flow is:", options: ["Path user takes", "Water flow", "Code execution", "None"], correct: 0, explanation: "Sequence of steps in task." }
        ]
    },
    // Adding 4th year for complete coverage
    "4th Year": {
        "cse": [
            { id: 401, question: "In ML, what is overfitting?", options: ["Good on train, bad on test", "Bad on both", "Good on both", "Too fast"], correct: 0, explanation: "Memorizes noise." },
            { id: 402, question: "Cloud computing 'SaaS' stands for:", options: ["Software as a Service", "System as a Service", "Storage as a Service", "Service as a Software"], correct: 0, explanation: "Application via web." },
            { id: 403, question: "Cyber security 'Worm' differs from Virus by:", options: ["Size", "Self-replication without host", "Color", "Price"], correct: 1, explanation: "Active spread." },
            { id: 404, question: "What is 'Distributed Computing'?", options: ["Many computers one task", "One computer many tasks", "Slow computer", "None"], correct: 0, explanation: "Work shared across nodes." },
            { id: 405, question: "A 'Botnet' is a network of:", options: ["Servers", "Compromised computers", "Routers", "Switches"], correct: 1, explanation: "Controlled by attacker." },
            { id: 406, question: "Which is a 'Deep Learning' framework?", options: ["TensorFlow", "Excel", "Word", "Outlook"], correct: 0, explanation: "Google's open source lib." }
        ],
        "ece": [
            { id: 421, question: "Advantage of Optical Fiber:", options: ["Attenuation", "Bandwidth", "EMI susceptibility", "Cost"], correct: 1, explanation: "Immense channel capacity." },
            { id: 422, question: "GPS uses which frequency band?", options: ["HF", "VHF", "L-Band", "MF"], correct: 2, explanation: "Microwave region." },
            { id: 423, question: "Radar stands for:", options: ["Radio Detection and Ranging", "Rapid Delay and Range", "Radio Digital and Run", "None"], correct: 0, explanation: "Standard acronym." },
            { id: 424, question: "Which is a Wireless Standard?", options: ["802.11", "8086", "MP3", "JPEG"], correct: 0, explanation: "Wi-Fi." },
            { id: 425, question: "What is 'Embedded System'?", options: ["Dedicated computer system", "General PC", "Database server", "Cloud"], correct: 0, explanation: "Hardware/Software combo for specific task." },
            { id: 426, question: "GSM uses which access method?", options: ["TDMA", "CSMA", "ALOHA", "None"], correct: 0, explanation: "Time Division Multiple Access." }
        ],
        "mech": [
            { id: 431, question: "In CAD, B-rep stands for:", options: ["Boundary Rep", "Basic Rep", "Binary Repl", "Broken Res"], correct: 0, explanation: "Solid modeling." },
            { id: 432, question: "Robotics 'DOF' stands for:", options: ["Depth of Field", "Degrees of Freedom", "Data of Force", "Dual Operating Factor"], correct: 1, explanation: "Independent motions." },
            { id: 433, question: "CNC stands for:", options: ["Computer Numerical Control", "Central Network Code", "Circular Node Control", "None"], correct: 0, explanation: "Automated machining." },
            { id: 434, question: "What is 'JIT' in Manufacturing?", options: ["Just In Time", "Joint Info Team", "Job In Track", "None"], correct: 0, explanation: "Efficiency strategy." },
            { id: 435, question: "A 'G-Code' controls:", options: ["CNC Machines", "Database", "UI", "Cloud"], correct: 0, explanation: "Motion commands." },
            { id: 436, question: "TQM stands for:", options: ["Total Quality Mgmt", "Top Query Model", "Total Quantity Method", "None"], correct: 0, explanation: "Continuous improvement." }
        ],
        "ce": [
            { id: 441, question: "BOD stands for:", options: ["Biological...", "Biochemical...", "Basic...", "Bacterial..."], correct: 1, explanation: "Oxygen metric." },
            { id: 442, question: "Railway 'Gauge' is distance between:", options: ["Outer rails", "Inner faces of rails", "Sleepers", "Signals"], correct: 1, explanation: "Standard definition." },
            { id: 443, question: "Traffic density is measured in:", options: ["km/hr", "vehicles/km", "tons/day", "liters"], correct: 1, explanation: "Road capacity metric." },
            { id: 444, question: "What is 'BIM'?", options: ["Building Info Modeling", "Basic Iron Main", "Below Iron Mass", "None"], correct: 0, explanation: "Digital representation of facility." },
            { id: 445, question: "A 'Retaining Wall' resists:", options: ["Soil pressure", "Air flow", "Sound", "None"], correct: 0, explanation: "Prevents slopes from sliding." },
            { id: 446, question: "What is 'Pre-stressing'?", options: ["Stressing before load", "Stress after load", "No stress", "None"], correct: 0, explanation: "Enhances concrete strength." }
        ],
        "csM": [
            { id: 451, question: "CNNs are primarily for:", options: ["NLP", "Image Recognition", "Tabular", "Audio"], correct: 1, explanation: "Spatial features." },
            { id: 452, question: "NLP 'Tokenization' is:", options: ["Encrypting", "Breaking text into words", "Combining sentences", "Deleting stop words"], correct: 1, explanation: "Preprocessing step." },
            { id: 453, question: "RNNs are good for:", options: ["Static images", "Sequential data", "Single values", "Colors"], correct: 1, explanation: "Time-series or text." },
            { id: 454, question: "What is 'Transfer Learning'?", options: ["Using pre-trained models", "Moving nodes", "Deleting layers", "None"], correct: 0, explanation: "Leveraging existing knowledge." },
            { id: 455, question: "A 'Loss Function' measures:", options: ["Model error", "Model speed", "Data size", "Price"], correct: 0, explanation: "Difference between actual and predicted." },
            { id: 456, question: "What is 'Epoch'?", options: ["One full pass of data", "One node", "One layer", "One month"], correct: 0, explanation: "Training cycle." }
        ],
        "csd": [
            { id: 461, question: "What is 'Design Thinking'?", options: ["Problem solving process", "Graphic tool", "Coding style", "Font type"], correct: 0, explanation: "Human-centered approach." },
            { id: 462, question: "What is 'Empathy map'?", options: ["User insight tool", "GPS map", "Code structure", "Server list"], correct: 0, explanation: "Visualizing user behavior." },
            { id: 463, question: "What is 'High-fidelity'?", options: ["Close to final product", "Fast speed", "Low cost", "Old version"], correct: 0, explanation: "Detailed representation." },
            { id: 464, question: "What is 'Gamification'?", options: ["Game elements in non-games", "Playing games", "Making games", "Game engine"], correct: 0, explanation: "Enhancing engagement." },
            { id: 465, question: "What is 'Iterative design'?", options: ["Cyclic improvement", "One-time design", "Buying designs", "Copying designs"], correct: 0, explanation: "Refining based on feedback." },
            { id: 466, question: "What is 'Visual Hierarchy'?", options: ["Order of importance", "File list", "Code layers", "None"], correct: 0, explanation: "Guiding the eye." },
            { id: 467, question: "Which tool is for vector icons?", options: ["Adobe Illustrator", "Notepad", "Calculator", "None"], correct: 0, explanation: "Vector industry standard." },
            { id: 468, question: "What is 'Affinity Diagram'?", options: ["Grouping ideas", "Circuit diagram", "Map", "None"], correct: 0, explanation: "UX synthesis tool." }
        ]
    }
};

/**
 * Seeded shuffle to ensure host and guest get same shuffle order from shared session ID
 */
function seededShuffle<T>(array: T[], seed: string): T[] {
    const shuffled = [...array];
    // Simple LCG or similar based on string hash
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

export function getMCQs(year: AcademicYear, dept: Department, seed?: string, offset: number = 0): MCQQuestion[] {
    const yrBank = L3_MCQS[year] || L3_MCQS["1st Year"];
    const targetDept = (dept === "csM" || dept === "csd") ? "cse" : dept;
    let qs = yrBank[targetDept];
    if (!qs || qs.length < 3) qs = yrBank["cse"];

    // If seed is provided, shuffle and pick based on offset
    if (seed) {
        const shuffled = seededShuffle(qs, seed);
        // If offset + 3 exceeds length, wrap around or just slice safely
        return shuffled.slice(offset, offset + 3);
    }

    // Default: return first 3 (legacy/solo)
    return qs.slice(0, 3);
}

// -----------------------------------------------------------------------------------
// LEVEL 4: CODE DEBUGGING
// -----------------------------------------------------------------------------------

export interface CodeChallenge {
    id: string;
    language: "C" | "Java" | "Python" | "Logic (Civil/Mech)";
    title: string;
    brokenCode: string; // Used strictly for display
    initialCode: string; // Editable starter state
    expectedSolutionSnippet: string | string[];
    errorHint: string;
}

// For Level 4, we want to give C to 1st year. Java/Python/C for CS/IT 2/3. Logic to Mech/Civil.
const L4_POOL: Record<AcademicYear, Record<Department, CodeChallenge[]>> = {
    "1st Year": {
        "cse": [
            { id: "c_p1", language: "C", title: "Pointer Dereference", brokenCode: "int main() {\n  int x = 10;\n  int *p = &x;\n  printf(\"%d\", p); // Error\n}", initialCode: "int main() {\n  int x = 10;\n  int *p = &x;\n  printf(\"%d\", p);\n  return 0;\n}", expectedSolutionSnippet: "printf(\"%d\", *p)", errorHint: "Use the dereference operator (*)." },
            { id: "c_p2", language: "C", title: "Array OOB", brokenCode: "int a[5];\na[5] = 10; // Error", initialCode: "int main() {\n  int a[5];\n  a[5] = 10;\n  return 0;\n}", expectedSolutionSnippet: "a[4]", errorHint: "Array indices for size 5 are 0-4." },
            { id: "c_p3", language: "C", title: "Missing Semicolon", brokenCode: "int x = 5\nreturn 0;", initialCode: "int main() {\n  int x = 5\n  return 0;\n}", expectedSolutionSnippet: "int x = 5;", errorHint: "Statements in C must end with a semicolon." },
            { id: "c_p4", language: "C", title: "Incorrect Loop Condition", brokenCode: "for(int i=0; i<=5; i--)", initialCode: "int main() {\n  for(int i=0; i<5; i--) {\n    printf(\"%d\", i);\n  }\n  return 0;\n}", expectedSolutionSnippet: "i++", errorHint: "Increment the loop variable." },
            { id: "c_p5", language: "C", title: "String Null Terminator", brokenCode: "char s[3] = \"abc\";", initialCode: "char s[3] = \"abc\";", expectedSolutionSnippet: "s[4]", errorHint: "Strings need space for null terminator \\0." }
        ],
        "ece": [
            { id: "ece_p1", language: "C", title: "Loop logic", brokenCode: "for(i=0; i<10; i--)", initialCode: "int main() {\n  for(int i=0; i<10; i--) {\n    printf(\"%d\", i);\n  }\n  return 0;\n}", expectedSolutionSnippet: "i++", errorHint: "Ensure the loop terminates." },
            { id: "ece_p2", language: "Logic (Civil/Mech)", title: "Ohm's Law", brokenCode: "V = I / R", initialCode: "float V = I / R;", expectedSolutionSnippet: "I * R", errorHint: "Voltage is current times resistance." },
            { id: "ece_p3", language: "C", title: "Array Size", brokenCode: "int a[x]; // x not const", initialCode: "int main() {\n  int x = 5;\n  int a[5];\n  return 0;\n}", expectedSolutionSnippet: "a[5]", errorHint: "Array size must be constant or literal." },
            { id: "ece_p4", language: "C", title: "Character Quote", brokenCode: "char c = \"a\";", initialCode: "char c = 'a';", expectedSolutionSnippet: "'a'", errorHint: "Single quotes for characters." }
        ],
        "mech": [
            { id: "mech_p1", language: "C", title: "Main Signature", brokenCode: "void main()", initialCode: "void main() {\n  return 0;\n}", expectedSolutionSnippet: "int main", errorHint: "In standard C, main returns int." },
            { id: "mech_p2", language: "Logic (Civil/Mech)", title: "Density", brokenCode: "rho = m * V", initialCode: "float rho = m * V;", expectedSolutionSnippet: "m / V", errorHint: "Density is mass divided by volume." },
            { id: "mech_p3", language: "C", title: "If Condition", brokenCode: "if(x=5)", initialCode: "int x = 0;\nif(x == 5) {\n}", expectedSolutionSnippet: "==", errorHint: "Use == for comparison, not =." },
            { id: "mech_p4", language: "C", title: "Comment Error", brokenCode: "/ Comment", initialCode: "// Comment\nint main() {\n  return 0;\n}", expectedSolutionSnippet: "//", errorHint: "Standard line comment is //." }
        ],
        "ce": [
            { id: "civ_p1", language: "C", title: "Missing include", brokenCode: "printf(\"Hello\"); // no stdio", initialCode: "#include <stdlib.h>\nint main() {\n  printf(\"Hello\");\n  return 0;\n}", expectedSolutionSnippet: "#include <stdio.h>", errorHint: "Add the standard I/O header." },
            { id: "civ_p2", language: "Logic (Civil/Mech)", title: "Force Formula", brokenCode: "F = m / a", initialCode: "float F = m / a;", expectedSolutionSnippet: "m * a", errorHint: "Force equals mass times acceleration." },
            { id: "civ_p3", language: "C", title: "Constant Define", brokenCode: "#define PI = 3.14", initialCode: "#define PI 3.14\nint main() {\n  return 0;\n}", expectedSolutionSnippet: "PI 3.14", errorHint: "Do not use = in #define." },
            { id: "civ_p4", language: "C", title: "Switch Break", brokenCode: "case 1: do(); // no break", initialCode: "switch(x) {\n  case 1:\n    printf(\"1\");\n    break;\n}", expectedSolutionSnippet: "break", errorHint: "Use break to exit switch cases." }
        ],
        "csM": [
            { id: "csm_p1", language: "Python", title: "Indentation", brokenCode: "if True:\nprint(1)", initialCode: "if True:\nprint(1)", expectedSolutionSnippet: "    print", errorHint: "Python uses indentation for blocks." },
            { id: "csm_p2", language: "Python", title: "Type Conversion", brokenCode: "int('abc')", initialCode: "s = '123'\nx = int(s)\nprint(x)", expectedSolutionSnippet: "int(s)", errorHint: "Convert a numeric string to int." },
            { id: "csm_p3", language: "Python", title: "List Append", brokenCode: "list.add(1)", initialCode: "l = []\nl.append(1)", expectedSolutionSnippet: "append", errorHint: "Use .append() for lists." },
            { id: "csm_p4", language: "Python", title: "Range usage", brokenCode: "range(10, 0)", initialCode: "for i in range(0, 10):", expectedSolutionSnippet: "0, 10", errorHint: "Range(start, stop)." }
        ],
        "csd": [
            { id: "csd_p1", language: "Python", title: "List Slicing", brokenCode: "s[5:1]", initialCode: "s = 'design'\nsub = s[0:2]", expectedSolutionSnippet: "0:2", errorHint: "Start index should be less than end index." },
            { id: "csd_p2", language: "Python", title: "Variable Name", brokenCode: "1var = 10", initialCode: "var1 = 10", expectedSolutionSnippet: "var1", errorHint: "Variable names cannot start with a number." }
        ]
    },
    "2nd Year": {
        "cse": [
            { id: "cs2_p1", language: "Java", title: "Array index", brokenCode: "int[] a={1}; a[1]=2;", initialCode: "int[] a = {1};\na[0] = 2;", expectedSolutionSnippet: "a[0]", errorHint: "Indices start at 0." },
            { id: "cs2_p2", language: "Java", title: "Null check", brokenCode: "String s; s.len();", initialCode: "String s = \"\";\nSystem.out.println(s.length());", expectedSolutionSnippet: ["\"\"", "new String"], errorHint: "Initialize the string." },
            { id: "cs2_p3", language: "Java", title: "Class access", brokenCode: "private int x; // in another class", initialCode: "class A { public int x; }\nA obj = new A(); obj.x = 5;", expectedSolutionSnippet: "public", errorHint: "Private members aren't accessible from outside." },
            { id: "cs2_p4", language: "Java", title: "Method Override", brokenCode: "@Override public void wrongName()", initialCode: "@Override\npublic String toString() {\n  return \"\";\n}", expectedSolutionSnippet: "toString", errorHint: "Ensure method name matches exactly for override." },
            { id: "cs2_p5", language: "Java", title: "Static access", brokenCode: "this.static_var", initialCode: "ClassName.static_var = 5;", expectedSolutionSnippet: "ClassName", errorHint: "Access static variables via class name." }
        ],
        "ece": [
            { id: "ece2_p1", language: "C", title: "Pointer Arith", brokenCode: "p++ // size mismatch", initialCode: "int a[2];\nint *p = a;\n*(p+1) = 5;", expectedSolutionSnippet: "+1", errorHint: "Index using p+1." },
            { id: "ece2_p2", language: "C", title: "Bitwise OR", brokenCode: "x || y // intent bitwise", initialCode: "unsigned char x = 0x01;\nunsigned char y = 0x02;\nunsigned char z = x | y;", expectedSolutionSnippet: "|", errorHint: "Use | for bitwise OR." }
        ],
        "mech": [
            { id: "mech2_p1", language: "Logic (Civil/Mech)", title: "Efficiency", brokenCode: "Eff = In / Out", initialCode: "float Eff = Power_Out / Power_In;", expectedSolutionSnippet: "Out / In", errorHint: "Efficiency is Output/Input." },
            { id: "mech2_p2", language: "C", title: "Math.h", brokenCode: "pow(2,3) // no math.h", initialCode: "#include <math.h>\nint main() {\n  double x = pow(2,3);\n  return 0;\n}", expectedSolutionSnippet: "#include <math.h>", errorHint: "POW needs math.h." }
        ],
        "ce": [
            { id: "civ2_p1", language: "Logic (Civil/Mech)", title: "Bending Moment", brokenCode: "M = F + d", initialCode: "float M = F * d;", expectedSolutionSnippet: "F * d", errorHint: "Moment is force times distance." },
            { id: "civ2_p2", language: "C", title: "Scanf error", brokenCode: "scanf(\"%d\", n);", initialCode: "int n;\nscanf(\"%d\", &n);", expectedSolutionSnippet: "&n", errorHint: "Scanf needs the address operator &." }
        ],
        "csM": [
            { id: "csm2_p1", language: "Python", title: "Dictionary keys", brokenCode: "d[key]", initialCode: "d = {'a': 1}\nval = d.get('a')", expectedSolutionSnippet: "get", errorHint: "Use .get() or ensure key exists." },
            { id: "csm2_p2", language: "Python", title: "Lambda", brokenCode: "f = lambda x: x*x", initialCode: "f = lambda x: x*x\nprint(f(5))", expectedSolutionSnippet: "x*x", errorHint: "Square the input." }
        ],
        "csd": [
            { id: "csd2_p1", language: "Python", title: "String Method", brokenCode: "s.ups()", initialCode: "s = 'hi'\ns.upper()", expectedSolutionSnippet: "upper", errorHint: "Use .upper() for uppercase." },
            { id: "csd2_p2", language: "Python", title: "List Append", brokenCode: "l + 1", initialCode: "l = []\nl.append(1)", expectedSolutionSnippet: "append", errorHint: "Use .append() to add to a list." }
        ]
    },
    "3rd Year": {
        "cse": [
            { id: "cs3_p1", language: "Python", title: "List comprehension", brokenCode: "[x for x in l if x=2]", initialCode: "l = [1,2,3]\nnew_l = [x for x in l if x == 2]", expectedSolutionSnippet: "== 2", errorHint: "Use == for comparison." },
            { id: "cs3_p2", language: "Python", title: "File close", brokenCode: "f = open('t.txt')", initialCode: "with open('file.txt', 'r') as f:\n    data = f.read()", expectedSolutionSnippet: "with", errorHint: "Use 'with' block for auto-close." },
            { id: "cs3_p3", language: "Python", title: "Decorator", brokenCode: "@dec def f():", initialCode: "def dec(func):\n    return func\n\n@dec\ndef my_func():\n    pass", expectedSolutionSnippet: "@dec", errorHint: "Correct decorator syntax." }
        ],
        "ece": [
            { id: "ece3_p1", language: "C", title: "Struct access", brokenCode: "s->val // if s is object", initialCode: "struct Node { int val; };\nstruct Node s;\ns.val = 10;", expectedSolutionSnippet: "s.val", errorHint: "Use . for objects, -> for pointers." },
            { id: "ece3_p2", language: "C", title: "Type cast", brokenCode: "int x = (int)\"5\";", initialCode: "int x = atoi(\"5\");", expectedSolutionSnippet: "atoi", errorHint: "Use atoi to convert string to int." },
            { id: "ece3_j1", language: "Java", title: "Exception Catch", brokenCode: "try { } catch { }", initialCode: "try {\n  int x = 5 / 0;\n} catch (ArithmeticException e) {\n  e.printStackTrace();\n}", expectedSolutionSnippet: "(ArithmeticException e)", errorHint: "Catch requires exception type." }
        ],
        "mech": [
            { id: "mech3_p1", language: "Logic (Civil/Mech)", title: "Heat Transfer", brokenCode: "Q = m * c / dT", initialCode: "float Q = m * c * dT;", expectedSolutionSnippet: "m * c * dT", errorHint: "Heat is mass * specific heat * delta T." },
            { id: "mech3_p2", language: "C", title: "Const error", brokenCode: "const int x=5; x=6;", initialCode: "const int x = 5;\n// x = 6; // remove this", expectedSolutionSnippet: "//", errorHint: "Cannot modify a constant." }
        ],
        "ce": [
            { id: "civ3_p1", language: "Logic (Civil/Mech)", title: "Hydraulic Head", brokenCode: "H = P/rho + g", initialCode: "float H = P/(rho * g) + z;", expectedSolutionSnippet: "rho * g", errorHint: "Pressure head involves rho*g." },
            { id: "civ3_p2", language: "C", title: "Bool type", brokenCode: "bool x = true; // no stdbool", initialCode: "#include <stdbool.h>\nbool x = true;", expectedSolutionSnippet: "#include <stdbool.h>", errorHint: "Include stdbool.h for bool type in C." }
        ],
        "csM": [
            { id: "csm3_p1", language: "Python", title: "NumPy shape", brokenCode: "a.reshape(3,3) // for size 10", initialCode: "import numpy as np\na = np.arange(9)\nb = a.reshape(3, 3)", expectedSolutionSnippet: "(3, 3)", errorHint: "Ensure new shape matches size." },
            { id: "csm3_p2", language: "Python", title: "LR parameter", brokenCode: "Adam(lr=0.01) // old param", initialCode: "from tensorflow.keras.optimizers import Adam\nopt = Adam(learning_rate=0.001)", expectedSolutionSnippet: "learning_rate", errorHint: "Use learning_rate instead of lr." }
        ],
        "csd": [
            { id: "csd3_p1", language: "Python", title: "Matplotlib Plot", brokenCode: "plt.plot(x)", initialCode: "import matplotlib.pyplot as plt\nplt.plot([1,2,3], [4,5,6])", expectedSolutionSnippet: "plot", errorHint: "Provide x and y data." },
            { id: "csd3_p2", language: "Python", title: "Pandas Head", brokenCode: "df.heads()", initialCode: "import pandas as pd\ndf = pd.DataFrame()\ndf.head()", expectedSolutionSnippet: "head", errorHint: "Use .head() to see first rows." }
        ]
    },
    "4th Year": {
        "cse": [
            { id: "cs4_p1", language: "Python", title: "Async await", brokenCode: "def f(): await g()", initialCode: "async def f():\n    await g()", expectedSolutionSnippet: "async def", errorHint: "Await requires an async function." },
            { id: "cs4_p2", language: "Python", title: "Set ops", brokenCode: "s.add([1,2])", initialCode: "s = set()\ns.add(1)", expectedSolutionSnippet: "add(1)", errorHint: "Cannot add list to set." }
        ],
        "ece": [
            { id: "ece4_p1", language: "C", title: "Memcpy overlap", brokenCode: "memcpy(s, s+1, 10);", initialCode: "memmove(s, s+1, 10);", expectedSolutionSnippet: "memmove", errorHint: "Use memmove for overlapping regions." }
        ],
        "mech": [
            { id: "mech4_p1", language: "Logic (Civil/Mech)", title: "Mach No", brokenCode: "M = c / v", initialCode: "float Mach = v / c;", expectedSolutionSnippet: "v / c", errorHint: "Mach is velocity over sound speed." }
        ],
        "ce": [
            { id: "civ4_p1", language: "Logic (Civil/Mech)", title: "Reynolds", brokenCode: "Re = mu / (rho*v*d)", initialCode: "float Re = (rho * v * d) / mu;", expectedSolutionSnippet: "rho * v * d", errorHint: "Reynolds number formula error." }
        ],
        "csM": [
            { id: "csm4_p1", language: "Python", title: "PyTorch Grad", brokenCode: "x.grad = None", initialCode: "optimizer.zero_grad()", expectedSolutionSnippet: "zero_grad", errorHint: "Use zero_grad() to reset gradients." }
        ],
        "csd": [
            { id: "csd4_p1", language: "Python", title: "Flask Route", brokenCode: "@app.route(methods=['POST'])", initialCode: "@app.route('/api', methods=['POST'])", expectedSolutionSnippet: "'/api'", errorHint: "Missing path in route." }
        ]
    }
};

export function getDebuggingChallenge(year: AcademicYear, dept: Department, language: "C" | "Java" | "Python"): CodeChallenge {
    const yrBank = L4_POOL[year] || L4_POOL["1st Year"];
    const targetDept = (dept === "csM" || dept === "csd") ? "cse" : dept;
    let qs = yrBank[targetDept] || yrBank["cse"];

    // Filter by language
    const filtered = qs.filter(q => q.language === language);

    // If no exact match for language in this branch/year, fall back to any branch's match for that language
    if (filtered.length === 0) {
        // Search other departments in the same year
        for (const d in yrBank) {
            const fallbackQs = yrBank[d as Department].filter(q => q.language === language);
            if (fallbackQs.length > 0) return fallbackQs[Math.floor(Math.random() * fallbackQs.length)];
        }
        // Final fallback to 1st year CS
        const ultimateFallback = L4_POOL["1st Year"]["cse"].filter(q => q.language === language);
        return ultimateFallback[Math.floor(Math.random() * ultimateFallback.length)] || ultimateFallback[0];
    }

    return filtered[Math.floor(Math.random() * filtered.length)];
}
