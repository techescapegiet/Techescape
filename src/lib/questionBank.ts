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
    hint?: string;
}

const L1_WORDS: Record<AcademicYear, Record<Department, L1Word[]>> = {
    "1st Year": {
        "cse": [
            { word: "ALGO", clue: "Steps to solve a problem.", hint: "Short for ALGORITHM." },
            { word: "CODE", clue: "Translates code to machine language.", hint: "Sounds like COMPILER." },
            { word: "PTR", clue: "Stores a memory address.", hint: "Short for POINTER." },
            { word: "ARRAY", clue: "List of items in memory.", hint: "Linear data structure." },
            { word: "FUNC", clue: "Reusable block of code.", hint: "Short for FUNCTION." },
            { word: "VAR", clue: "Named storage in memory.", hint: "Short for VARIABLE." },
            { word: "SYNTAX", clue: "Rules of a language.", hint: "The grammar of code." },
            { word: "BINARY", clue: "Base-2 number system.", hint: "Zeros and ones." }
        ],
        "ece": [
            { word: "RESISTOR", clue: "Limits electric current.", hint: "V = IR component." },
            { word: "VOLTAGE", clue: "Electric potential.", hint: "Measured in Volts." },
            { word: "CURRENT", clue: "Flow of charge.", hint: "Measured in Amperes." },
            { word: "DIODE", clue: "One-way current flow.", hint: "P-N Junction device." },
            { word: "CIRCUIT", clue: "Path for electricity.", hint: "A closed loop." },
            { word: "CHIP", clue: "Amplify or switch signals.", hint: "Integrated Circuit." },
            { word: "SENSOR", clue: "Detects physical input.", hint: "Transducer device." },
            { word: "BATTERY", clue: "Stores energy.", hint: "Chemical power source." }
        ],
        "mech": [
            { word: "FORCE", clue: "Push or pull.", hint: "Newton's Second Law." },
            { word: "MOTION", clue: "Moving state.", hint: "Kinematics concept." },
            { word: "ENERGY", clue: "Ability to do work.", hint: "Measured in Joules." },
            { word: "ENGINE", clue: "Converts heat to work.", hint: "IC or Steam." },
            { word: "TORQUE", clue: "Twisting force.", hint: "Moment of a force." },
            { word: "GEAR", clue: "Toothed wheel.", hint: "Power transmission." },
            { word: "LEVER", clue: "Rigid bar for lifting.", hint: "Simple machine." },
            { word: "PISTON", clue: "Moving cylinder part.", hint: "Found in engines." }
        ],
        "ce": [
            { word: "BRIDGE", clue: "Structure over gap.", hint: "Arch, Beam, or Cable." },
            { word: "CEMENT", clue: "Binding material.", hint: "Component of concrete." },
            { word: "SURVEY", clue: "Mapping land.", hint: "Theodolite work." },
            { word: "STRESS", clue: "Force on area.", hint: "Pa or N/m2." },
            { word: "COLUMN", clue: "Vertical support.", hint: "Compressive member." },
            { word: "STRUCT", clue: "Building frame.", hint: "Load-bearing skeleton." },
            { word: "DAM", clue: "Barrier for water.", hint: "Hydroelectric source." },
            { word: "SOIL", clue: "Earth material.", hint: "Geotechnical study." }
        ],
        "csM": [
            { word: "PYTHON", clue: "AI coding language.", hint: "Primary language for ML." },
            { word: "NEURAL", clue: "Brain-like network.", hint: "Deep Learning base." },
            { word: "DATA", clue: "Set of information.", hint: "Nourishment for AI." },
            { word: "LEARN", clue: "Improve from data.", hint: "The 'L' in ML." },
            { word: "MODEL", clue: "AI representation.", hint: "Result of training." },
            { word: "LAYER", clue: "Part of a network.", hint: "Input, Hidden, Output." },
            { word: "WEIGHT", clue: "Signal strength.", hint: "Adjusted during training." },
            { word: "TRAIN", clue: "Teach an AI.", hint: "Processing datasets." }
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
            { word: "OBJECT", clue: "An instance of a class.", hint: "The 'O' in OOP." },
            { word: "CLASS", clue: "A blueprint for creating objects.", hint: "Defines properties and methods." },
            { word: "EXTENDS", clue: "Mechanism where one class acquires the properties of another.", hint: "Keyword for Inheritance." },
            { word: "POLY", clue: "Ability of an object to take on many forms.", hint: "Short for Polymorphism." },
            { word: "ENCODER", clue: "Wrapping of data and methods into a single unit.", hint: "Part of Encapsulation." },
            { word: "LIST", clue: "Linear data structure with nodes.", hint: "Linked List." },
            { word: "STACK", clue: "Linear structure following LIFO.", hint: "Last-In, First-Out." },
            { word: "QUEUE", clue: "Linear structure following FIFO.", hint: "First-In, First-Out." }
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
            { word: "NEURAL", clue: "Brain-like network.", hint: "Artificial Neural Network." },
            { word: "LEARN", clue: "Acquire knowledge.", hint: "Machine Learning." },
            { word: "DATA", clue: "Information units.", hint: "Big Data." },
            { word: "MODEL", clue: "AI system type.", hint: "CNN or RNN." },
            { word: "AGENT", clue: "AI that acts.", hint: "Intelligent Agent." },
            { word: "PROMPT", clue: "Input for AI.", hint: "Instruction for LLM." }
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
            { word: "PROCESS", clue: "A program in execution.", hint: "Managed by the OS." },
            { word: "THREAD", clue: "Smallest unit of execution.", hint: "Part of a process." },
            { word: "LOCK", clue: "Situation where processes are blocked.", hint: "Deadlock scenario." },
            { word: "PAGING", clue: "Memory management scheme.", hint: "Virtual memory concept." },
            { word: "DBASE", clue: "Type of database model.", hint: "Rational or SQL." },
            { word: "NORMAL", clue: "Reducing database redundancy.", hint: "First, Second, Third NF." },
            { word: "TXN", clue: "Sequence of database operations.", hint: "Abbreviation for Transaction." },
            { word: "PACKET", clue: "Independent entity of data.", hint: "Network layer unit." }
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
            { word: "CLOUD", clue: "Remote resource availability.", hint: "AWS or Azure." },
            { word: "MACHINE", clue: "Device performing actions.", hint: "Machine Learning." },
            { word: "ML", clue: "AI learning from data.", hint: "Abbreviation for Machine Learning." },
            { word: "SECURE", clue: "System protection.", hint: "Cyber Security." },
            { word: "NETWORK", clue: "Computers sharing resources.", hint: "LAN or WAN." },
            { word: "AGILE", clue: "Iterative development.", hint: "SDLC Methodology." },
            { word: "SCRUM", clue: "Project management framework.", hint: "Part of Agile." },
            { word: "DEVOPS", clue: "Combined Dev and Ops.", hint: "CI/CD Pipeline." }
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
    return [...pool].sort(() => 0.5 - Math.random()).slice(0, 6);
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
            { word: "FUNCTION", hint: "Reusable code block." },
            { word: "HARDWARE", hint: "Physical parts of a computer." },
            { word: "FIREWALL", hint: "Prevents unauthorized network access." }
        ],
        "ece": [
            { word: "DIODE", hint: "Allows current in one way." },
            { word: "RESISTOR", hint: "Limits electric current." },
            { word: "VOLTAGE", hint: "Electric potential difference." },
            { word: "CURRENT", hint: "Flow of electric charge." },
            { word: "CAPACITOR", hint: "Stores electrical energy." },
            { word: "INDUCTOR", hint: "Stores energy in a magnetic field." }
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
            { word: "DATASET", hint: "Collection of records." },
            { word: "NEURON", hint: "Basic unit of a neural network." },
            { word: "CLASSIFY", hint: "Assigning data to categories." }
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
            { word: "INTERFACE", hint: "Shared boundary for components." },
            { word: "SEMAPHORE", hint: "Flag used for thread coordination." },
            { word: "PROTOCOL", hint: "Rules for data exchange." }
        ],
        "ece": [
            { word: "MUX", hint: "Selects between input signals." },
            { word: "OSCILLATE", hint: "Produces periodic signals." },
            { word: "AMPLIFY", hint: "Increase signal power." },
            { word: "MODULATE", hint: "Varying waveform properties." },
            { word: "TRANSISTOR", hint: "Switches electrical signals." },
            { word: "RECTIFY", hint: "Converting AC to DC." }
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
            { word: "LEVEL", hint: "Finding elevation points." },
            { word: "TRUSS", hint: "Triangle-based support structure." }
        ],
        "csM": [
            { word: "REGRESS", hint: "Determining relationship strength." },
            { word: "NUMPY", hint: "Python math library." },
            { word: "PANDAS", hint: "Data manipulation library." },
            { word: "PROB", hint: "Likelihood of an event." },
            { word: "EPOCH", hint: "One full pass over a dataset." },
            { word: "GRADIENT", hint: "Slope used in optimization." }
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
            { word: "DEADLOCK", hint: "Current execution state where processes are stuck." },
            { word: "NORMALIZATION", hint: "Reducing database redundancy." },
            { word: "PROCESS", hint: "A program in execution." },
            { word: "THREAD", hint: "Smallest unit of execution." },
            { word: "DATAGRAM", hint: "Packet unit in networking." },
            { word: "BANDWIDTH", hint: "Maximum data transfer rate." },
            { word: "VLAN", hint: "Logical subnetwork design." }
        ],
        "ece": [
            { word: "FLIPFLOP", hint: "A circuit that has two stable states and can be used to store state information." },
            { word: "MICROPROCESSOR", hint: "A computer processor where the data processing logic and control is included on a single integrated circuit." },
            { word: "ANTENNA", hint: "A device designed to transmit or receive electromagnetic waves." },
            { word: "WAVEGUIDE", hint: "A structure that guides waves, such as electromagnetic waves or sound." },
            { word: "CMOS", hint: "Complementary metal-oxide-semiconductor." }
        ],
        "mech": [
            { word: "CONVECTION", hint: "Heat transfer via fluid movement." },
            { word: "CONDUCTION", hint: "Direct heat transfer via contact." },
            { word: "RADIATION", hint: "Heat transfer via EM waves." },
            { word: "CASTING", hint: "Pouring liquid into a mold." },
            { word: "WELDING", hint: "Joining metal parts." },
            { word: "TURBINE", hint: "Extracts energy from fluid flow." },
            { word: "GEARBOX", hint: "Assembly that provides speed/torque conversion." }
        ],
        "ce": [
            { word: "FOUNDATION", hint: "The lowest part of a civil structure that is in direct contact with the soil." },
            { word: "CONCRETE", hint: "A composite material composed of fine and coarse aggregate bonded together." },
            { word: "STRUCTURE", hint: "An arrangement and organization of interrelated elements in a material object." },
            { word: "BEARING", hint: "The capacity of soil to support the loads applied to the ground." },
            { word: "REINFORCEMENT", hint: "The action or process of strengthening." }
        ],
        "csM": [
            { word: "DEEP", hint: "Neural network layer depth." },
            { word: "NODE", hint: "Neural network signal point." },
            { word: "GPU", hint: "Processors for parallel arithmetic." },
            { word: "PYTHON", hint: "AI primary languge." },
            { word: "CLUSTER", hint: "Grouping similar data points." },
            { word: "OVERFIT", hint: "Model performing too well on train data." }
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
            { word: "CLOUD", hint: "Remote storage and compute." },
            { word: "SECURE", hint: "System protection." },
            { word: "AGILE", hint: "Iterative development methodology." },
            { word: "DEVOPS", hint: "Dev+Ops practice." },
            { word: "KUBERNETES", hint: "Container orchestration system." },
            { word: "DOCKER", hint: "Liquid-less container platform." }
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
    return yrBank[dept] || yrBank["cse"];
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

const L3_MCQ_POOLS: Record<string, MCQQuestion[]> = {
    "computing": [
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
        { id: 21, question: "What is the time complexity of Quick Sort in the worst case?", options: ["O(n log n)", "O(n)", "O(n^2)", "O(log n)"], correct: 2, explanation: "Worst case occurs when pivot is the smallest or largest element." },
        { id: 22, question: "Which scheduling algorithm can lead to starvation?", options: ["Round Robin", "First Come First Served", "Priority Scheduling", "Multilevel Queue"], correct: 2, explanation: "Low priority processes may never execute if high priority ones keep arriving." },
        { id: 23, question: "What is the size of an IPv6 address?", options: ["32 bits", "64 bits", "128 bits", "256 bits"], correct: 2, explanation: "IPv6 uses 128-bit addresses to provide a much larger address space." },
        { id: 24, question: "Which design pattern ensures a class has only one instance?", options: ["Factory", "Observer", "Singleton", "Strategy"], correct: 2, explanation: "Singleton pattern restricts the instantiation of a class to one object." },
        { id: 25, question: "What is a 'Dirty Read' in database transactions?", options: ["Reading data that is being deleted", "Reading uncommitted data from another transaction", "Reading data twice", "Reading corrupted data"], correct: 1, explanation: "A transaction reads data that might be rolled back." }
    ],
    "ece": [
        { id: 101, question: "Which component is used to store electrical charge?", options: ["Resistor", "Inductor", "Capacitor", "Transistor"], correct: 2, explanation: "Capacitors store energy in an electric field." },
        { id: 102, question: "What is the unit of frequency?", options: ["Farad", "Henry", "Hertz", "Ohm"], correct: 2, explanation: "Hertz (Hz) measures cycles per second." },
        { id: 103, question: "Which logic gate gives a High output only if both inputs are High?", options: ["OR", "NAND", "AND", "XOR"], correct: 2, explanation: "AND gate requires all inputs to be 1 for output 1." },
        { id: 104, question: "What does 'VLSI' stand for?", options: ["Very Large Series Integration", "Very Large Scale Integration", "Visual Logic System Interface", "Variable Level Signal Input"], correct: 1, explanation: "VLSI is the process of creating an IC by combining thousands of transistors." },
        { id: 105, question: "Which diode is used for voltage regulation?", options: ["LED", "Photodiode", "Zener Diode", "Varactor Diode"], correct: 2, explanation: "Zener diodes maintain a constant voltage across their terminals." },
        { id: 106, question: "What is the standard frequency of AC power in India?", options: ["60 Hz", "50 Hz", "100 Hz", "120 Hz"], correct: 1, explanation: "India uses 50Hz for its power grid." },
        { id: 107, question: "In a BJT, which region is the most heavily doped?", options: ["Collector", "Base", "Emitter", "Gate"], correct: 2, explanation: "The emitter is heavily doped to inject carriers into the base." },
        { id: 108, question: "Which modulation technique uses a digital signal to vary the frequency of a carrier?", options: ["AM", "FM", "FSK", "ASK"], correct: 2, explanation: "Frequency Shift Keying (FSK) is a digital modulation scheme." },
        { id: 109, question: "What is Shannon's Theorem used for?", options: ["Calculating current", "Calculating channel capacity", "Designing filters", "Transistor biasing"], correct: 1, explanation: "It determines the maximum rate at which error-free data can be transmitted over a noisy channel." },
        { id: 110, question: "Which theorem is used to convert a complex network into a single voltage source and a series resistor?", options: ["Norton's Theorem", "Superposition Theorem", "Thevenin's Theorem", "Millman's Theorem"], correct: 2, explanation: "Thevenin's theorem simplifies linear circuits." },
        { id: 111, question: "What is the decimal equivalent of binary 1011?", options: ["9", "10", "11", "13"], correct: 2, explanation: "8 + 0 + 2 + 1 = 11." },
        { id: 112, question: "Which bridge is used to measure unknown capacitance?", options: ["Wheatstone Bridge", "Maxwell Bridge", "Schering Bridge", "Anderson Bridge"], correct: 2, explanation: "Schering bridges are standard for capacitance measurement." },
        { id: 113, question: "What is the gain of an ideal operational amplifier?", options: ["Zero", "One", "Infinity", "Constant"], correct: 2, explanation: "Ideal op-amps have infinite open-loop gain." },
        { id: 114, question: "Which device converts optical signals into electrical signals?", options: ["Laser", "LED", "Photodiode", "MOSFET"], correct: 2, explanation: "Photodiodes generate current when hit by light." },
        { id: 115, question: "What does GSM stand for?", options: ["Global System for Mobile Communications", "General Signal Module", "Geographic Station Management", "Global Satellite Messaging"], correct: 0, explanation: "GSM is a standard for digital cellular networks." },
        { id: 116, question: "In digital logic, what is the output of an XOR gate with inputs 1 and 1?", options: ["0", "1", "Undefined", "High"], correct: 0, explanation: "XOR returns 1 only if inputs are different." },
        { id: 117, question: "Which microcontroller is based on the AVR architecture?", options: ["8051", "PIC", "Arduino Uno (ATMega328P)", "ARM Cortex"], correct: 2, explanation: "The core of Arduino Uno is the ATMega328P AVR MCU." },
        { id: 118, question: "What is the function of a 'Mux' (Multiplexer)?", options: ["Many inputs to one output", "One input to many outputs", "Voltage regulation", "Signal amplification"], correct: 0, explanation: "Multiplexers select one of several inputs to forward to a single line." },
        { id: 119, question: "Which law states that the current through a conductor between two points is directly proportional to the voltage across the two points?", options: ["Kirchhoff's Law", "Faraday's Law", "Ohm's Law", "Lenz's Law"], correct: 2, explanation: "V = IR defines Ohm's Law." },
        { id: 120, question: "What is the purpose of a filter in a power supply?", options: ["To step up voltage", "To convert AC to DC", "To remove ripples from the DC output", "To protect against surges"], correct: 2, explanation: "Filters smooth the pulsating DC from a rectifier." },
        { id: 121, question: "Which material is a common semiconductor?", options: ["Copper", "Iron", "Silicon", "Rubber"], correct: 2, explanation: "Silicon is the foundation of modern electronics." },
        { id: 122, question: "What is the input impedance of an ideal Op-Amp?", options: ["Zero", "Low", "High", "Infinity"], correct: 3, explanation: "Infinity impedance means it draws no current from the source." },
        { id: 123, question: "Which flip-flop is known as a 'universal' flip-flop?", options: ["D", "T", "SR", "JK"], correct: 3, explanation: "JK flip-flops can emulate any other type." },
        { id: 124, question: "What is the bandwidth of a signal?", options: ["Total power", "Difference between upper and lower frequencies", "Carrier frequency", "Signal strength"], correct: 1, explanation: "Bandwidth is the range of frequencies the signal occupies." },
        { id: 125, question: "Which coupling is typically used in audio amplifiers?", options: ["Direct Coupling", "Transformer Coupling", "RC Coupling", "Impedance Coupling"], correct: 2, explanation: "Resistance-Capacitance (RC) coupling is common for audio frequency range." }
    ],
    "mech": [
        { id: 201, question: "What is the First Law of Thermodynamics equivalent to?", options: ["Law of Entropy", "Conservation of Energy", "Ideal Gas Law", "Newton's Second Law"], correct: 1, explanation: "Energy cannot be created or destroyed, only transformed." },
        { id: 202, question: "Which cycle is the most efficient theoretical heat engine cycle?", options: ["Otto Cycle", "Diesel Cycle", "Carnot Cycle", "Rankine Cycle"], correct: 2, explanation: "The Carnot cycle provides the upper limit on efficiency." },
        { id: 203, question: "What is the ratio of stress to strain within the elastic limit called?", options: ["Poisson's Ratio", "Modulus of Rigidity", "Young's Modulus", "Bulk Modulus"], correct: 2, explanation: "Young's Modulus (E) measures the stiffness of a solid material." },
        { id: 204, question: "Which fluid property describes resistance to flow?", options: ["Density", "Viscosity", "Surface Tension", "Buoyancy"], correct: 1, explanation: "Viscosity is the 'thickness' or internal friction of a fluid." },
        { id: 205, question: "In a 4-stroke engine, which stroke follows the compression stroke?", options: ["Intake", "Exhaust", "Power (Expansion)", "Injection"], correct: 2, explanation: "The sequence is Intake, Compression, Power, Exhaust." },
        { id: 206, question: "Which hardening process involves heating steel and then cooling it rapidly?", options: ["Annealing", "Tempering", "Quenching", "Normalizing"], correct: 2, explanation: "Quenching in oil or water increases hardness." },
        { id: 207, question: "What does 'CNC' stand for in manufacturing?", options: ["Computer Numerical Control", "Central Network Casting", "Complex Node Computing", "Calculated Node Control"], correct: 0, explanation: "CNC uses computers to control machine tools (lathes, mills, etc.)." },
        { id: 208, question: "Which law is used to calculate force for a spring?", options: ["Newton's Law", "Hooke's Law", "Pascal's Law", "Bernoulli's Law"], correct: 1, explanation: "F = -kx, where x is displacement." },
        { id: 209, question: "What is the primary alloy in stainless steel to prevent rusting?", options: ["Carbon", "Chromium", "Nickel", "Zinc"], correct: 1, explanation: "Chromium forms a protective oxide layer." },
        { id: 210, question: "Which governor is known for using centrifugal force?", options: ["Watt Governor", "Hartnell Governor", "Both A and B", "None"], correct: 2, explanation: "Both use rotating masses to regulate engine speed." },
        { id: 211, question: "What is Pascal's Law used to explain?", options: ["Aerodynamics", "Hydraulic lifts", "Heat transfer", "Vibrations"], correct: 1, explanation: "Pressure applied to a fluid is transmitted equally in all directions." },
        { id: 212, question: "Which type of friction occurs between two moving surfaces?", options: ["Static Friction", "Kinetic (Sliding) Friction", "Rolling Friction", "Fluid Friction"], correct: 1, explanation: "Kinetic friction opposes the relative motion of surfaces." },
        { id: 213, question: "What is the unit of power in SI?", options: ["Joule", "Newton", "Watt", "Pascal"], correct: 2, explanation: "Watt is one Joule per second." },
        { id: 214, question: "Which bearing is designed to handle axial loads?", options: ["Radial Bearing", "Thrust Bearing", "Roller Bearing", "Needle Bearing"], correct: 1, explanation: "Thrust bearings prevent a shaft from sliding in the axial direction." },
        { id: 215, question: "What is 'Creep' in material science?", options: ["Fast fracture", "Slow, permanent deformation under constant stress", "Elastic rebound", "Surface wear"], correct: 1, explanation: "Creep happens over long periods, especially at high temperatures." },
        { id: 216, question: "Which instrument is used to measure the thickness of a wire precisely?", options: ["Vernier Caliper", "Screw Gauge (Micrometer)", "Ruler", "Spherometer"], correct: 1, explanation: "Micrometers provide very high precision for small dimensions." },
        { id: 217, question: "What is the purpose of a flywheel?", options: ["To increase speed", "To store energy and smooth out power fluctuations", "To cool the engine", "To shift gears"], correct: 1, explanation: "Flywheels provide rotational inertia." },
        { id: 218, question: "Which welding process uses a non-consumable tungsten electrode?", options: ["MIG", "TIG", "Stick", "Plasma"], correct: 1, explanation: "TIG stands for Tungsten Inert Gas welding." },
        { id: 219, question: "What is the point where the entire weight of a body acts?", options: ["Metacentre", "Centroid", "Center of Gravity", "Center of Pressure"], correct: 2, explanation: "Center of gravity is the point of balance." },
        { id: 220, question: "What is 'Toughness' of a material?", options: ["Resistance to scratching", "Ability to absorb energy before fracture", "Ease of machining", "Strength under heat"], correct: 1, explanation: "Toughness is the area under the stress-strain curve." },
        { id: 221, question: "Which shaft is used to transmit power between non-parallel but intersecting shafts?", options: ["Spur Gear", "Bevel Gear", "Worm Gear", "Helical Gear"], correct: 1, explanation: "Bevel gears are typically used for 90-degree transmission." },
        { id: 222, question: "What is the efficiency of an Otto cycle dependent on?", options: ["Temperature", "Pressure", "Compression Ratio", "Fuel Type"], correct: 2, explanation: "Higher compression ratio leads to higher efficiency." },
        { id: 223, question: "Which pump is commonly used for domestic water supply?", options: ["Centrifugal Pump", "Piston Pump", "Gear Pump", "Vane Pump"], correct: 0, explanation: "Centrifugal pumps are efficient for moving large volumes of water." },
        { id: 224, question: "What is the Poisson's ratio for most metals?", options: ["0.1", "0.3", "0.5", "0.8"], correct: 1, explanation: "Most structural metals have a ratio around 0.25 to 0.35." },
        { id: 225, question: "Which vibration has a frequency equal to the natural frequency?", options: ["Forced", "Damped", "Resonance", "Random"], correct: 2, explanation: "Resonance causes large amplitudes and potential failure." }
    ],
    "ce": [
        { id: 301, question: "Which test is used to measure the workability of concrete?", options: ["Crushing Test", "Slump Test", "Tensile Test", "Impact Test"], correct: 1, explanation: "Slump test measures consistency and workability." },
        { id: 302, question: "What is the main ingredient of cement?", options: ["Silica", "Alumina", "Lime (Calcium Oxide)", "Iron Oxide"], correct: 2, explanation: "Lime makes up about 60-67% of Portland cement." },
        { id: 303, question: "In surveying, what is 'bench mark'?", options: ["A mark on a tree", "A point of known elevation", "A standard for speed", "A type of soil"], correct: 1, explanation: "Bench marks are reference points for vertical control." },
        { id: 304, question: "Which type of foundation is used for weak soil or heavily loaded structures?", options: ["Spread Footing", "Raft (Mat) Foundation", "Pile Foundation", "Strip Footing"], correct: 2, explanation: "Piles transfer loads to deeper, stronger soil layers." },
        { id: 305, question: "What is the standard size of a modular brick in India?", options: ["19x9x9 cm", "20x10x10 cm", "23x11x7 cm", "15x15x15 cm"], correct: 0, explanation: "Modular bricks are standardized for construction efficiency." },
        { id: 306, question: "Which member of a truss primarily takes compressive loads?", options: ["Tie", "Strut", "Beam", "Joist"], correct: 1, explanation: "Struts are compression members; ties are tension members." },
        { id: 307, question: "What does 'RCC' stand for?", options: ["Rapid Concrete Construction", "Reinforced Cement Concrete", "Roller Compacted Cement", "Rigid Casting Concrete"], correct: 1, explanation: "RCC combines concrete with steel reinforcement." },
        { id: 308, question: "Which instrument is used to measure the depth of water in a river?", options: ["Fathometer", "Odometer", "Piezometer", "Hygrometer"], correct: 0, explanation: "Fathometers use echo-sounding to find depth." },
        { id: 309, question: "What is the primary purpose of a lintel?", options: ["To support the roof", "To support the wall above an opening (door/window)", "To decorate the room", "To prevent dampness"], correct: 1, explanation: "Lintels take the load of the masonry above the opening." },
        { id: 310, question: "Which soil is considered best for agriculture but poor for foundations?", options: ["Gravel", "Sand", "Black Cotton Soil", "Laterite"], correct: 2, explanation: "It expands and contracts significantly with moisture changes." },
        { id: 311, question: "What is 'curing' of concrete?", options: ["Heating it up", "Applying a chemical coating", "Maintaining moisture for hydration", "Adding extra water to the mix"], correct: 2, explanation: "Curing ensures the concrete gains its full design strength." },
        { id: 312, question: "Which mapping uses contour lines to show elevation?", options: ["Cadastral Survey", "Topographic Survey", "Hydrographic Survey", "City Survey"], correct: 1, explanation: "Topographic maps show both natural and man-made features and relief." },
        { id: 313, question: "In a beam, what is the point where the bending moment is zero?", options: ["Centroid", "Neutral Axis", "Point of Contraflexure", "Focus"], correct: 2, explanation: "At this point, the beam changes its curvature." },
        { id: 314, question: "What is the unit of measure for cement in standard bags?", options: ["50 kg", "25 kg", "100 kg", "40 kg"], correct: 0, explanation: "Standard cement bags in India are 50kg." },
        { id: 315, question: "Which valve allows water flow in only one direction?", options: ["Gate Valve", "Check (Non-return) Valve", "Globe Valve", "Butterfly Valve"], correct: 1, explanation: "Check valves prevent backflow in pipelines." },
        { id: 316, question: "What does 'initial setting time' of cement mean?", options: ["Time to reach full strength", "Time after which it loses plasticity", "Time to pack the bags", "Time to mix the concrete"], correct: 1, explanation: "It is usually about 30 minutes for ordinary Portland cement." },
        { id: 317, question: "Which scale is used for representing large areas on a small sheet?", options: ["Full Scale", "Enlarging Scale", "Reducing Scale", "Diagonal Scale"], correct: 2, explanation: "Example: 1cm = 1km." },
        { id: 318, question: "What is the function of a 'damp proof course' (DPC)?", options: ["To strengthen the wall", "To prevent moisture from rising into the walls", "To provide a smooth finish", "To cool the building"], correct: 1, explanation: "DPC is a barrier against capillary action of water." },
        { id: 319, question: "Which type of dam uses its weight to resist water pressure?", options: ["Arch Dam", "Gravity Dam", "Earth Dam", "Buttress Dam"], correct: 1, explanation: "Gravity dams are usually built of concrete or stone masonry." },
        { id: 320, question: "What is 'sewerage'?", options: ["The waste itself", "The system of pipes for carrying waste", "The process of treating waste", "The smell of waste"], correct: 1, explanation: "Sewerage is the infrastructure that carries sewage." },
        { id: 321, question: "In bridges, what is the span between two supports called?", options: ["Pier", "Abutment", "Clear Span", "Depth"], correct: 2, explanation: "Clear span is the horizontal distance between supports." },
        { id: 322, question: "Which metal is most commonly used for reinforcement in concrete?", options: ["Aluminum", "Copper", "Steel", "Zinc"], correct: 2, explanation: "Steel has a similar coefficient of thermal expansion to concrete." },
        { id: 323, question: "What is the pH value of pure water?", options: ["0", "7", "14", "5"], correct: 1, explanation: "Pure water is neutral with a pH of 7." },
        { id: 324, question: "Which instrument measures horizontal and vertical angles in surveying?", options: ["Cross-staff", "Theodolite", "Planimeter", "Compass"], correct: 1, explanation: "Theodolites are precise instruments for angle measurement." },
        { id: 325, question: "What is the main contributor to global warming among construction materials?", options: ["Timber", "Glass", "Carbon emissions from Cement production", "Steel"], correct: 2, explanation: "Cement manufacturing is highly energy-intensive and releases CO2." }
    ]
};

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

export function getMCQs(dept: Department = "cse", seed?: string, offset: number = 0): MCQQuestion[] {
    let poolKey = "computing";
    if (dept === "ece") poolKey = "ece";
    else if (dept === "mech") poolKey = "mech";
    else if (dept === "ce") poolKey = "ce";
    else poolKey = "computing"; // Default for cse, csM, csd

    const pool = L3_MCQ_POOLS[poolKey] || L3_MCQ_POOLS["computing"];

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
export interface CodeChallenge {
    id: string;
    language: "C" | "Java" | "Python" | "Logic (Civil/Mech)";
    title: string;
    brokenCode: string;
    initialCode: string;
    solutionCode: string;
    expectedOutput: string;
    errorHint: string;
}


// Completely unsolved set of 10 clear syntax-error questions per language
const L4_SIMPLE_POOL: Record<"C" | "Java" | "Python", CodeChallenge[]> = {
    "C": [
        { id: "c01", language: "C", title: "Missing Semicolon", brokenCode: "", initialCode: "#include <stdio.h>\nint main() {\n  int x = 5\n  printf(\"%d\", x);\n  return 0;\n}", solutionCode: "#include <stdio.h>\nint main() {\n  int x = 5;\n  printf(\"%d\", x);\n  return 0;\n}", expectedOutput: "5", errorHint: "Every statement in C must end with a semicolon (;)." },
        { id: "c02", language: "C", title: "Assignment in Condition", brokenCode: "", initialCode: "#include <stdio.h>\nint main() {\n  int x = 0;\n  if(x = 5) {\n    printf(\"five\");\n  }\n  return 0;\n}", solutionCode: "#include <stdio.h>\nint main() {\n  int x = 0;\n  if(x == 5) {\n    printf(\"five\");\n  }\n  return 0;\n}", expectedOutput: "five", errorHint: "Use == for comparison, not = (which assigns the value)." },
        { id: "c03", language: "C", title: "Wrong Loop Direction", brokenCode: "", initialCode: "#include <stdio.h>\nint main() {\n  for(int i=0; i<5; i--) {\n    printf(\"%d \", i);\n  }\n  return 0;\n}", solutionCode: "#include <stdio.h>\nint main() {\n  for(int i=0; i<5; i++) {\n    printf(\"%d \", i);\n  }\n  return 0;\n}", expectedOutput: "0 1 2 3 4 ", errorHint: "The loop counter is decrementing instead of incrementing — it will never reach the end condition." },
        { id: "c04", language: "C", title: "Format Specifier", brokenCode: "", initialCode: "#include <stdio.h>\nint main() {\n  float pi = 3.14;\n  printf(\"Pi is %d\", pi);\n  return 0;\n}", solutionCode: "#include <stdio.h>\nint main() {\n  float pi = 3.14;\n  printf(\"Pi is %f\", pi);\n  return 0;\n}", expectedOutput: "Pi is 3.140000", errorHint: "Use %f to print float values, not %d (which is for integers)." },
        { id: "c05", language: "C", title: "Missing Address-of", brokenCode: "", initialCode: "#include <stdio.h>\nint main() {\n  int n = 0;\n  printf(\"Enter number: \");\n  scanf(\"%d\", n);\n  printf(\"%d\", n);\n  return 0;\n}", solutionCode: "#include <stdio.h>\nint main() {\n  int n = 0;\n  printf(\"Enter number: \");\n  scanf(\"%d\", &n);\n  printf(\"%d\", n);\n  return 0;\n}", expectedOutput: "42", errorHint: "scanf() needs the address of the variable — use the & operator." },
        { id: "c06", language: "C", title: "Wrong Return Type", brokenCode: "", initialCode: "#include <stdio.h>\nvoid main() {\n  printf(\"Hello\");\n  return 0;\n}", solutionCode: "#include <stdio.h>\nint main() {\n  printf(\"Hello\");\n  return 0;\n}", expectedOutput: "Hello", errorHint: "The standard signature for main is int main(), not void." },
        { id: "c07", language: "C", title: "Missing Return", brokenCode: "", initialCode: "#include <stdio.h>\nint main() {\n  printf(\"Finished\");\n}", solutionCode: "#include <stdio.h>\nint main() {\n  printf(\"Finished\");\n  return 0;\n}", expectedOutput: "Finished", errorHint: "main() returns int. Add 'return 0;' at the end." },
        { id: "c08", language: "C", title: "Array Out of Bounds", brokenCode: "", initialCode: "#include <stdio.h>\nint main() {\n  int a[5] = {0,0,0,0,0};\n  a[5] = 1;\n  printf(\"Done\");\n  return 0;\n}", solutionCode: "#include <stdio.h>\nint main() {\n  int a[5] = {0,0,0,0,0};\n  a[4] = 1;\n  printf(\"Done\");\n  return 0;\n}", expectedOutput: "Done", errorHint: "An array of size 5 has valid indices 0 through 4. Index 5 is out of bounds." },
        { id: "c09", language: "C", title: "Integer Division", brokenCode: "", initialCode: "#include <stdio.h>\nint main() {\n  float result = 5 / 2;\n  printf(\"%.1f\", result);\n  return 0;\n}", solutionCode: "#include <stdio.h>\nint main() {\n  float result = 5.0 / 2.0;\n  printf(\"%.1f\", result);\n  return 0;\n}", expectedOutput: "2.5", errorHint: "Dividing two ints gives an int result. Use 5.0 or 2.0 to force float division." },
        { id: "c10", language: "C", title: "Missing Break", brokenCode: "", initialCode: "#include <stdio.h>\nint main() {\n  int x = 1;\n  switch(x) {\n    case 1: printf(\"one\\n\");\n    case 2: printf(\"two\\n\");\n  }\n  return 0;\n}", solutionCode: "#include <stdio.h>\nint main() {\n  int x = 1;\n  switch(x) {\n    case 1: printf(\"one\\n\"); break;\n    case 2: printf(\"two\\n\"); break;\n  }\n  return 0;\n}", expectedOutput: "one\n", errorHint: "Without break, execution falls through to the next case (printing both 'one' and 'two')." }
    ],

    "Java": [
        { id: "j01", language: "Java", title: "Missing Semicolon", brokenCode: "", initialCode: "public class Main {\n  public static void main(String[] args) {\n    int x = 5\n    System.out.println(x);\n  }\n}", solutionCode: "public class Main {\n  public static void main(String[] args) {\n    int x = 5;\n    System.out.println(x);\n  }\n}", expectedOutput: "5\n", errorHint: "Java statements must end with a semicolon." },
        { id: "j02", language: "Java", title: "String Compare with ==", brokenCode: "", initialCode: "public class Main {\n  public static void main(String[] args) {\n    String s = new String(\"hello\");\n    if (s == \"hello\") {\n      System.out.println(\"Match\");\n    } else {\n      System.out.println(\"No Match\");\n    }\n  }\n}", solutionCode: "public class Main {\n  public static void main(String[] args) {\n    String s = new String(\"hello\");\n    if (s.equals(\"hello\")) {\n      System.out.println(\"Match\");\n    } else {\n      System.out.println(\"No Match\");\n    }\n  }\n}", expectedOutput: "Match\n", errorHint: "Use .equals() to compare String content, not == (which compares object references)." },
        { id: "j03", language: "Java", title: "Array Out of Bounds", brokenCode: "", initialCode: "public class Main {\n  public static void main(String[] args) {\n    int[] a = {1, 2, 3};\n    a[3] = 4;\n    System.out.println(\"Done\");\n  }\n}", solutionCode: "public class Main {\n  public static void main(String[] args) {\n    int[] a = {1, 2, 3};\n    a[2] = 4;\n    System.out.println(\"Done\");\n  }\n}", expectedOutput: "Done\n", errorHint: "Array of size 3 has indices 0, 1, 2. Index 3 is out of bounds." },
        { id: "j04", language: "Java", title: "Wrong main Signature", brokenCode: "", initialCode: "public class Main {\n  public static void main(String args) {\n    System.out.println(\"Hello\");\n  }\n}", solutionCode: "public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"Hello\");\n  }\n}", expectedOutput: "Hello\n", errorHint: "The correct main signature requires String[] args (array), not String args." },
        { id: "j05", language: "Java", title: "Missing new Keyword", brokenCode: "", initialCode: "import java.util.ArrayList;\npublic class Main {\n  public static void main(String[] args) {\n    ArrayList<String> list = ArrayList<>();\n    list.add(\"hi\");\n    System.out.println(list.get(0));\n  }\n}", solutionCode: "import java.util.ArrayList;\npublic class Main {\n  public static void main(String[] args) {\n    ArrayList<String> list = new ArrayList<>();\n    list.add(\"hi\");\n    System.out.println(list.get(0));\n  }\n}", expectedOutput: "hi\n", errorHint: "Objects in Java must be created with the new keyword." },
        { id: "j06", language: "Java", title: "Uninitialized Variable", brokenCode: "", initialCode: "public class Main {\n  public static void main(String[] args) {\n    int x;\n    System.out.println(x);\n  }\n}", solutionCode: "public class Main {\n  public static void main(String[] args) {\n    int x = 0;\n    System.out.println(x);\n  }\n}", expectedOutput: "0\n", errorHint: "Local variables must be initialized before they are used (e.g., int x = 0;)." },
        { id: "j07", language: "Java", title: "Wrong Cast", brokenCode: "", initialCode: "public class Main {\n  public static void main(String[] args) {\n    Object obj = \"text\";\n    Integer n = (Integer) obj;\n    System.out.println(n);\n  }\n}", solutionCode: "public class Main {\n  public static void main(String[] args) {\n    Object obj = \"text\";\n    String n = (String) obj;\n    System.out.println(n);\n  }\n}", expectedOutput: "text\n", errorHint: "Cast to the actual type of the object — it's a String, not Integer." },
        { id: "j08", language: "Java", title: "Wrong Loop Bound", brokenCode: "", initialCode: "public class Main {\n  public static void main(String[] args) {\n    int[] arr = {1, 2, 3};\n    for (int i = 0; i <= arr.length; i++) {\n      System.out.println(arr[i]);\n    }\n  }\n}", solutionCode: "public class Main {\n  public static void main(String[] args) {\n    int[] arr = {1, 2, 3};\n    for (int i = 0; i < arr.length; i++) {\n      System.out.println(arr[i]);\n    }\n  }\n}", expectedOutput: "1\n2\n3\n", errorHint: "Use < (not <=) to prevent accessing index equal to array length." },
        { id: "j09", language: "Java", title: "Static Method Call", brokenCode: "", initialCode: "public class Main {\n  public void greet() {\n    System.out.println(\"Hi\");\n  }\n  public static void main(String[] args) {\n    greet();\n  }\n}", solutionCode: "public class Main {\n  public static void greet() {\n    System.out.println(\"Hi\");\n  }\n  public static void main(String[] args) {\n    greet();\n  }\n}", expectedOutput: "Hi\n", errorHint: "Cannot make a static reference to the non-static method greet(). Either make greet() static or create an instance." },
        { id: "j10", language: "Java", title: "Extends vs Implements", brokenCode: "", initialCode: "class Animal {}\npublic class Dog implements Animal {\n  public static void main(String[] args) {\n    System.out.println(\"Woof\");\n  }\n}", solutionCode: "class Animal {}\npublic class Dog extends Animal {\n  public static void main(String[] args) {\n    System.out.println(\"Woof\");\n  }\n}", expectedOutput: "Woof\n", errorHint: "Use extends to inherit from a class, implements only for interfaces." }
    ],

    "Python": [
        { id: "p01", language: "Python", title: "Missing Colon", brokenCode: "", initialCode: "def greet()\n    print(\"Hello\")\n\ngreet()", solutionCode: "def greet():\n    print(\"Hello\")\n\ngreet()", expectedOutput: "Hello\n", errorHint: "Function definitions must end with a colon (:)." },
        { id: "p02", language: "Python", title: "Indentation Error", brokenCode: "", initialCode: "if True:\nprint(\"Yes\")", solutionCode: "if True:\n    print(\"Yes\")", expectedOutput: "Yes\n", errorHint: "Python uses indentation to define code blocks. Indent the print statement." },
        { id: "p03", language: "Python", title: "Assignment in Condition", brokenCode: "", initialCode: "x = 5\nif x = 5:\n    print(x)", solutionCode: "x = 5\nif x == 5:\n    print(x)", expectedOutput: "5\n", errorHint: "Use == for comparison. = is assignment and causes a SyntaxError." },
        { id: "p04", language: "Python", title: "String + Int", brokenCode: "", initialCode: "age = 20\nprint(\"Age: \" + age)", solutionCode: "age = 20\nprint(\"Age: \" + str(age))", expectedOutput: "Age: 20\n", errorHint: "Python cannot concatenate str and int directly. Wrap the int with str() or use f-strings." },
        { id: "p05", language: "Python", title: "List .add()", brokenCode: "", initialCode: "nums = [1, 2, 3]\nnums.add(4)\nprint(nums)", solutionCode: "nums = [1, 2, 3]\nnums.append(4)\nprint(nums)", expectedOutput: "[1, 2, 3, 4]\n", errorHint: "Python lists use .append() to add items, not .add() (which is for sets)." },
        { id: "p06", language: "Python", title: "Undefined Variable", brokenCode: "", initialCode: "total += 10\nprint(total)", solutionCode: "total = 10\nprint(total)", expectedOutput: "10\n", errorHint: "Initialize the variable 'total' before using it (e.g., total = 0)." },
        { id: "p07", language: "Python", title: "Wrong Range", brokenCode: "", initialCode: "for i in range(5, 0):\n    print(i, end=\" \")", solutionCode: "for i in range(5, 0, -1):\n    print(i, end=\" \")", expectedOutput: "5 4 3 2 1 ", errorHint: "range(5, 0) produces no values without a negative step (range(5, 0, -1))." },
        { id: "p08", language: "Python", title: "Missing Self", brokenCode: "", initialCode: "class Dog:\n    def bark():\n        print(\"Woof\")\n\nd = Dog()\nd.bark()", solutionCode: "class Dog:\n    def bark(self):\n        print(\"Woof\")\n\nd = Dog()\nd.bark()", expectedOutput: "Woof\n", errorHint: "Instance methods in Python must have 'self' as the first parameter." },
        { id: "p09", language: "Python", title: "Infinite Loop", brokenCode: "", initialCode: "i = 0\nwhile i < 1:\n    print(\"Looping\")", solutionCode: "i = 0\nwhile i < 1:\n    print(\"Looping\")\n    i += 1", expectedOutput: "Looping\n", errorHint: "The loop condition never becomes False. Increment i inside the loop." },
        { id: "p10", language: "Python", title: "Index Out of Bounds", brokenCode: "", initialCode: "nums = [10, 20, 30]\nprint(nums[3])", solutionCode: "nums = [10, 20, 30]\nprint(nums[2])", expectedOutput: "30\n", errorHint: "A list of 3 items has indices 0, 1, 2. Index 3 is out of range." }
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
