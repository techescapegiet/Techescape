// src/lib/questionBank.ts

export type AcademicYear = "1st Year" | "2nd Year" | "3rd Year" | "4th Year";
export type Department = "Computer Science" | "Information Tech" | "Electronics" | "Mechanical" | "Civil" | "CSM";

// -----------------------------------------------------------------------------------
// LEVEL 1: CROSSWORD (WORD SEARCH)
// -----------------------------------------------------------------------------------
const L1_WORDS: Record<AcademicYear, Record<Department, string[]>> = {
    "1st Year": {
        "Computer Science": ["ALGORITHM", "COMPILER", "POINTER", "ARRAY", "FUNCTION", "VARIABLE", "SYNTAX", "BINARY"],
        "Information Tech": ["ALGORITHM", "COMPILER", "POINTER", "ARRAY", "FUNCTION", "VARIABLE", "SYNTAX", "BINARY"],
        "Electronics": ["RESISTOR", "CAPACITOR", "VOLTAGE", "CURRENT", "DIODE", "TRANSISTOR", "OHM", "KIRCHHOFF"],
        "Mechanical": ["PHYSICS", "THERMAL", "FORCE", "MOTION", "NEWTON", "ENERGY", "WORK", "POWER"],
        "Civil": ["STATICS", "DYNAMICS", "FORCE", "VECTOR", "STRESS", "STRAIN", "MOMENT", "INERTIA"],
        "CSM": ["ALGORITHM", "COMPILER", "POINTER", "ARRAY", "FUNCTION", "VARIABLE", "SYNTAX", "BINARY"]
    },
    "2nd Year": {
        "Computer Science": ["OBJECT", "CLASS", "INHERITANCE", "POLYMORPHISM", "ENCAPSULATION", "LINKEDLIST", "STACK", "QUEUE"],
        "Information Tech": ["OBJECT", "CLASS", "INHERITANCE", "POLYMORPHISM", "ENCAPSULATION", "LINKEDLIST", "STACK", "QUEUE"],
        "Electronics": ["AMPLIFIER", "OSCILLATOR", "MODULATION", "OPAMP", "SIGNAL", "SYSTEM", "BOOLEAN", "LOGIC"],
        "Mechanical": ["KINEMATICS", "DYNAMICS", "THERMODYNAMICS", "FLUID", "ENTROPY", "ENTHALPY", "CARNOT", "VISCOSITY"],
        "Civil": ["FLUID", "MECHANICS", "SURVEYING", "LEVELING", "CONTOUR", "THEODOLITE", "STRESS", "DEFLECTION"],
        "CSM": ["PYTHON", "NUMPY", "PANDAS", "MATPLOTLIB", "PROBABILITY", "STATISTICS", "VECTORS", "MATRICES"]
    },
    "3rd Year": {
        "Computer Science": ["PROCESS", "THREAD", "DEADLOCK", "PAGING", "RELATIONAL", "NORMALIZATION", "TRANSACTION", "DATAGRAM"],
        "Information Tech": ["PROCESS", "THREAD", "DEADLOCK", "PAGING", "RELATIONAL", "NORMALIZATION", "TRANSACTION", "DATAGRAM"],
        "Electronics": ["MICROPROCESSOR", "MICROCONTROLLER", "ANTENNA", "WAVEGUIDE", "DSP", "VLSI", "CMOS", "EMBEDDED"],
        "Mechanical": ["HEAT", "TRANSFER", "CONDUCTION", "CONVECTION", "RADIATION", "MACHINING", "WELDING", "CASTING"],
        "Civil": ["CONCRETE", "STEEL", "STRUCTURE", "FOUNDATION", "SOIL", "BEARING", "REINFORCEMENT", "HIGHWAY"],
        "CSM": ["LEARNING", "NEURAL", "NETWORK", "REGRESSION", "CLASSIFIED", "CLUSTERING", "INFERENCE", "VALUATION"]
    },
    "4th Year": {
        // Fallback/Generic for 4th years if they play
        "Computer Science": ["CLOUD", "MACHINE", "LEARNING", "SECURITY", "NETWORK", "AGILE", "SCRUM", "DEVOPS"],
        "Information Tech": ["CLOUD", "MACHINE", "LEARNING", "SECURITY", "NETWORK", "AGILE", "SCRUM", "DEVOPS"],
        "Electronics": ["IOT", "WIRELESS", "OPTICAL", "SATELLITE", "RADAR", "NANOTECH", "ROBOTICS", "AUTOMATION"],
        "Mechanical": ["CAD", "CAM", "ROBOTICS", "AUTOMATION", "MECHATRONICS", "VIBRATION", "OPTIMIZATION", "RENEWABLE"],
        "Civil": ["ENVIRONMENT", "TRANSPORTATION", "RAILWAY", "AIRPORT", "BRIDGE", "DAM", "RESERVOIR", "IRRIGATION"],
        "CSM": ["DEEP", "VISION", "NATURAL", "LANGUAGE", "TENSORFLOW", "PYTORCH", "BIGDATA", "HADOOP"]
    }
};

export function getCrosswordWords(year: AcademicYear, dept: Department): string[] {
    const yrBank = L1_WORDS[year] || L1_WORDS["1st Year"];
    const deptBank = yrBank[dept] || yrBank["Computer Science"];
    return deptBank;
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
        "Computer Science": [
            { word: "COMPILER", hint: "Translates entire high-level source code into machine code." },
            { word: "ALGORITHM", hint: "Step-by-step instructions to solve a problem." },
            { word: "VARIABLE", hint: "A storage location paired with an associated symbolic name." },
            { word: "DEBUGGING", hint: "The process of identifying and removing errors." },
            { word: "FUNCTION", hint: "A block of organized, reusable code." }
        ],
        "Information Tech": [
            { word: "COMPILER", hint: "Translates entire high-level source code into machine code." },
            { word: "ALGORITHM", hint: "Step-by-step instructions to solve a problem." },
            { word: "VARIABLE", hint: "A storage location paired with an associated symbolic name." },
            { word: "DEBUGGING", hint: "The process of identifying and removing errors." },
            { word: "FUNCTION", hint: "A block of organized, reusable code." }
        ],
        "Electronics": [
            { word: "INDUCTOR", hint: "A passive two-terminal electrical component that stores energy." },
            { word: "RESISTOR", hint: "Implements electrical resistance as a circuit element." },
            { word: "VOLTAGE", hint: "Electric potential difference between two points." },
            { word: "CURRENT", hint: "A stream of charged particles moving through an electrical conductor." },
            { word: "CAPACITOR", hint: "A device that stores electrical energy in an electric field." }
        ],
        "Mechanical": [
            { word: "FRICTION", hint: "The force resisting the relative motion of solid surfaces." },
            { word: "VELOCITY", hint: "The rate of change of its position with respect to a frame of reference." },
            { word: "MOMENTUM", hint: "The product of the mass and velocity of an object." },
            { word: "INERTIA", hint: "The resistance of any physical object to any change in its velocity." },
            { word: "GRAVITY", hint: "A natural phenomenon by which all things with mass or energy are brought toward one another." }
        ],
        "Civil": [
            { word: "ELASTICITY", hint: "The ability of a deformed material to return to its original shape." },
            { word: "TENSION", hint: "The pulling force transmitted axially by the means of a string, cable, chain." },
            { word: "COMPRESSION", hint: "The application of balanced inward forces to different points." },
            { word: "STATICS", hint: "The branch of mechanics that is concerned with the analysis of loads." },
            { word: "DEFLECTION", hint: "The degree to which a structural element is displaced under a load." }
        ],
        "CSM": [
            { word: "PYTHON", hint: "A high-level general-purpose programming language often used in Data Science." },
            { word: "ALGORITHM", hint: "Step-by-step instructions to solve a problem." },
            { word: "VARIABLE", hint: "A storage location paired with an associated symbolic name." },
            { word: "DEBUGGING", hint: "The process of identifying and removing errors." },
            { word: "DATASET", hint: "A collection of data often used for training models." }
        ]
    },
    "2nd Year": {
        "Computer Science": [
            { word: "POLYMORPHISM", hint: "The provision of a single interface to entities of different types." },
            { word: "ENCAPSULATION", hint: "Binding data and functions into a single unit." },
            { word: "INHERITANCE", hint: "OOP concept where a class derives from another." },
            { word: "DATABASE", hint: "An organized collection of structured information." },
            { word: "INTERFACE", hint: "A shared boundary across which two components exchange information." }
        ],
        "Information Tech": [
            { word: "POLYMORPHISM", hint: "The provision of a single interface to entities of different types." },
            { word: "ENCAPSULATION", hint: "Binding data and functions into a single unit." },
            { word: "INHERITANCE", hint: "OOP concept where a class derives from another." },
            { word: "DATABASE", hint: "An organized collection of structured information." },
            { word: "INTERFACE", hint: "A shared boundary across which two components exchange information." }
        ],
        "Electronics": [
            { word: "MULTIPLEXER", hint: "A device that selects between several analog or digital input signals." },
            { word: "OSCILLATOR", hint: "An electronic circuit that produces a periodic, oscillating electronic signal." },
            { word: "AMPLIFIER", hint: "An electronic device that can increase the power of a signal." },
            { word: "MODULATION", hint: "The process of varying one or more properties of a periodic waveform." },
            { word: "TRANSISTOR", hint: "A semiconductor device used to amplify or switch electrical signals." }
        ],
        "Mechanical": [
            { word: "THERMODYNAMICS", hint: "The branch of physics that deals with heat, work, and temperature." },
            { word: "KINEMATICS", hint: "Describes the motion of points, bodies, and systems without considering forces." },
            { word: "ENTHALPY", hint: "A property of a thermodynamic system defined as internal energy plus pressure times volume." },
            { word: "ENTROPY", hint: "A measured representation of the unavailability of a system's thermal energy." },
            { word: "VISCOSITY", hint: "A measure of a fluid's resistance to deformation at a given rate." }
        ],
        "Civil": [
            { word: "THEODOLITE", hint: "A precision optical instrument for measuring angles." },
            { word: "CONTOUR", hint: "An outline representing or bounding the shape or form of something." },
            { word: "SURVEYING", hint: "The technique of determining the terrestrial position of points." },
            { word: "MECHANICS", hint: "The area of physics concerned with the motions of macroscopic objects." },
            { word: "LEVELING", hint: "A branch of surveying, the object of which is to find the elevation." }
        ],
        "CSM": [
            { word: "REGRESSION", hint: "A statistical method that attempts to determine the strength of relationship." },
            { word: "NUMPY", hint: "A library for the Python programming language, adding support for large, multi-dimensional arrays." },
            { word: "PANDAS", hint: "A software library written for the Python programming language for data manipulation." },
            { word: "STATISTICS", hint: "The discipline that concerns the collection and analysis of data." },
            { word: "PROBABILITY", hint: "The branch of mathematics concerning numerical descriptions of how likely an event is to occur." }
        ]
    },
    "3rd Year": {
        "Computer Science": [
            { word: "DEADLOCK", hint: "A state in an OS where each process is waiting for a resource." },
            { word: "NORMALIZATION", hint: "Structuring a relational database to reduce data redundancy." },
            { word: "PROCESS", "hint": "An instance of a computer program that is being executed." },
            { word: "THREAD", hint: "The smallest sequence of programmed instructions managed by a scheduler." },
            { word: "DATAGRAM", hint: "A basic transfer unit associated with a packet-switched network." }
        ],
        "Information Tech": [
            { word: "DEADLOCK", hint: "A state in an OS where each process is waiting for a resource." },
            { word: "NORMALIZATION", hint: "Structuring a relational database to reduce data redundancy." },
            { word: "PROCESS", hint: "An instance of a computer program that is being executed." },
            { word: "THREAD", hint: "The smallest sequence of programmed instructions managed by a scheduler." },
            { word: "DATAGRAM", hint: "A basic transfer unit associated with a packet-switched network." }
        ],
        "Electronics": [
            { word: "FLIPFLOP", hint: "A circuit that has two stable states and can be used to store state information." },
            { word: "MICROPROCESSOR", hint: "A computer processor where the data processing logic and control is included on a single integrated circuit." },
            { word: "ANTENNA", hint: "A device designed to transmit or receive electromagnetic waves." },
            { word: "WAVEGUIDE", hint: "A structure that guides waves, such as electromagnetic waves or sound." },
            { word: "CMOS", hint: "Complementary metal-oxide-semiconductor." }
        ],
        "Mechanical": [
            { word: "CONVECTION", hint: "The transfer of heat due to the bulk movement of molecules." },
            { word: "CONDUCTION", hint: "The process by which heat or electricity is directly transmitted." },
            { word: "RADIATION", hint: "The emission of energy as electromagnetic waves." },
            { word: "CASTING", hint: "A manufacturing process in which a liquid material is usually poured into a mold." },
            { word: "WELDING", hint: "A fabrication process that joins materials." }
        ],
        "Civil": [
            { word: "FOUNDATION", hint: "The lowest part of a civil structure that is in direct contact with the soil." },
            { word: "CONCRETE", hint: "A composite material composed of fine and coarse aggregate bonded together." },
            { word: "STRUCTURE", hint: "An arrangement and organization of interrelated elements in a material object." },
            { word: "BEARING", hint: "The capacity of soil to support the loads applied to the ground." },
            { word: "REINFORCEMENT", hint: "The action or process of strengthening." }
        ],
        "CSM": [
            { word: "NEURAL", hint: "Relating to a network of artificial neurons used in AI." },
            { word: "NETWORK", hint: "A interconnected system of components." },
            { word: "FEATURES", hint: "Individual measurable properties or characteristics of a phenomenon being observed." },
            { word: "INFERENCE", hint: "The process of using a trained model to make predictions on new data." },
            { word: "TENSOR", hint: "An algebraic object that describes a multilinear relationship." }
        ]
    },
    "4th Year": {
        "Computer Science": [
            { word: "HEURISTIC", hint: "An approach to problem-solving that is not guaranteed to be optimal." },
            { word: "CLOUD", hint: "The on-demand availability of computer system resources." },
            { word: "SECURITY", hint: "Protection of computer systems and networks from information disclosure." },
            { word: "AGILE", hint: "An iterative approach to project management and software development." },
            { word: "DEVOPS", hint: "A set of practices that combines software development and IT operations." }
        ],
        "Information Tech": [
            { word: "HEURISTIC", hint: "An approach to problem-solving that is not guaranteed to be optimal." },
            { word: "CLOUD", hint: "The on-demand availability of computer system resources." },
            { word: "SECURITY", hint: "Protection of computer systems and networks from information disclosure." },
            { word: "AGILE", hint: "An iterative approach to project management and software development." },
            { word: "DEVOPS", hint: "A set of practices that combines software development and IT operations." }
        ],
        "Electronics": [
            { word: "TRANSPONDER", hint: "A device that, upon receiving a signal, emits a different signal." },
            { word: "WIRELESS", hint: "Broadcasting, computer networking, or other communication using radio signals." },
            { word: "SATELLITE", hint: "An artificial object which has been intentionally placed into orbit." },
            { word: "RADAR", hint: "A detection system that uses radio waves to determine the range." },
            { word: "AUTOMATION", hint: "The use of largely automatic equipment in a system of manufacturing." }
        ],
        "Mechanical": [
            { word: "MECHATRONICS", hint: "A multidisciplinary branch of engineering combining electrical and mechanical." },
            { word: "ROBOTICS", hint: "An interdisciplinary branch of computer science and engineering." },
            { word: "OPTIMIZATION", hint: "The action of making the best or most effective use of a situation." },
            { word: "RENEWABLE", hint: "Energy from a source that is not depleted when used." },
            { word: "AUTOMATION", hint: "The use of largely automatic equipment in a system of manufacturing." }
        ],
        "Civil": [
            { word: "HYDROLOGY", hint: "The scientific study of the movement and management of water." },
            { word: "ENVIRONMENT", hint: "The surroundings or conditions in which a person, animal, or plant lives." },
            { word: "TRANSPORTATION", hint: "The movement of humans, animals, and goods from one location to another." },
            { word: "BRIDGE", hint: "A structure built to span a physical obstacle." },
            { word: "RESERVOIR", hint: "An enlarged natural or artificial lake created using a dam to store water." }
        ],
        "CSM": [
            { word: "KERAS", hint: "An open-source software library that provides a Python interface for neural networks." },
            { word: "PYTORCH", hint: "An open source machine learning framework based on the Torch library." },
            { word: "OPTIMIZER", hint: "An algorithm or method used to change the attributes of your neural network." },
            { word: "OVERFITTING", hint: "The production of an analysis that corresponds too closely or exactly to a particular set of data." },
            { word: "VALIDATION", hint: "The process of evaluating a trained model on a hold-out dataset." }
        ]
    }
};

export function getSemanticBlanks(year: AcademicYear, dept: Department): SemanticBlank[] {
    const yrBank = L2_BLANKS[year] || L2_BLANKS["1st Year"];
    return yrBank[dept] || yrBank["Computer Science"];
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
        "Computer Science": [
            { id: 1, question: "Which of the following is NOT a fundamental data type in C?", options: ["int", "float", "string", "char"], correct: 2, explanation: "C does not have a built-in 'string' type; arrays of char are used instead." },
            { id: 2, question: "What does the 'sizeof' operator evaluate?", options: ["The execution time of a function", "The memory size of a variable or data type in bytes", "The length of a string in characters", "The number of elements in an array"], correct: 1, explanation: "sizeof returns the memory footprint of a type." },
            { id: 3, question: "What is the physical significance of the gradient of a scalar field?", options: ["It gives the direction of maximum decrease.", "It gives the direction of maximum increase.", "It represents rotation.", "It represents divergence."], correct: 1, explanation: "Gradient points in the direction of steepest ascent." }
        ],
        // For brevity, defaulting IT to CS, and generating 3 general questions for others.
        "Information Tech": [
            { id: 1, question: "Which of the following is NOT a fundamental data type in C?", options: ["int", "float", "string", "char"], correct: 2, explanation: "C does not have a built-in 'string' type; arrays of char are used instead." },
            { id: 2, question: "What does the 'sizeof' operator evaluate?", options: ["The execution time of a function", "The memory size of a variable or data type in bytes", "The length of a string in characters", "The number of elements in an array"], correct: 1, explanation: "sizeof returns the memory footprint of a type." },
            { id: 3, question: "Which data structure operates on a Last In First Out (LIFO) principle?", options: ["Queue", "Tree", "Stack", "Graph"], correct: 2, explanation: "Stacks are LIFO." }
        ],
        "Electronics": [
            { id: 1, question: "Kirchhoff's Current Law (KCL) is based on the law of conservation of:", options: ["Energy", "Momentum", "Charge", "Mass"], correct: 2, explanation: "KCL mathematically states that charge cannot be created or destroyed at a node." },
            { id: 2, question: "An ideal voltmeter has:", options: ["Zero resistance", "Infinite resistance", "Finite small resistance", "Reactance only"], correct: 1, explanation: "Infinite resistance prevents current from flowing through the meter, giving an accurate reading." },
            { id: 3, question: "Which semiconductor material is most widely used?", options: ["Germanium", "Silicon", "Gallium Arsenide", "Carbon"], correct: 1, explanation: "Silicon is abundant and has favorable thermal properties." }
        ],
        "Mechanical": [
            { id: 1, question: "Newton's Second Law of motion relates force to:", options: ["Velocity and Time", "Mass and Acceleration", "Work and Distance", "Pressure and Area"], correct: 1, explanation: "F = ma." },
            { id: 2, question: "Hooke's Law holds good up to:", options: ["Yield point", "Limit of proportionality", "Breaking point", "Elastic limit"], correct: 1, explanation: "Stress is proportional to strain up to the limit of proportionality." },
            { id: 3, question: "Which of these is a scalar quantity?", options: ["Force", "Velocity", "Acceleration", "Work"], correct: 3, explanation: "Work is the dot product of two vectors, resulting in a scalar." }
        ],
        "Civil": [
            { id: 1, question: "The unit of force in the SI system is:", options: ["Dyne", "Newton", "Pound", "Joule"], correct: 1, explanation: "Newton is the standard SI unit." },
            { id: 2, question: "The moment of a force is the product of force and:", options: ["Parallel distance", "Perpendicular distance", "Velocity", "Time"], correct: 1, explanation: "Moment = Force x Perpendicular distance from the pivot." },
            { id: 3, question: "Friction always acts in a direction:", options: ["Parallel to motion", "Perpendicular to motion", "Opposite to motion", "At 45 degrees"], correct: 2, explanation: "Friction opposes relative motion." }
        ],
        "CSM": [
            { id: 1, question: "What is the primary library for data manipulation in Python?", options: ["Numpy", "Pandas", "Matplotlib", "Scikit-learn"], correct: 1, explanation: "Pandas is the core library for dataframes." },
            { id: 2, question: "In Python, which keyword is used to define a function?", options: ["func", "def", "lambda", "function"], correct: 1, explanation: "def is used for standard functions." },
            { id: 3, question: "Standard Mean is calculated by:", options: ["Summing all values", "Summing values and dividing by count", "Multiplying all values", "Finding the middle value"], correct: 1, explanation: "Mean = sum(x) / n." }
        ]
    },
    "2nd Year": {
        "Computer Science": [
            { id: 1, question: "In Java, standard classes are inherited from which base class?", options: ["System", "Class", "Object", "Main"], correct: 2, explanation: "Every class implicity extends java.lang.Object." },
            { id: 2, question: "Which data structure is optimal for implementing a priority queue?", options: ["Linked List", "Binary Search Tree", "Heap", "Hash Table"], correct: 2, explanation: "Heaps provide O(log n) insertions and extractions for priorities." },
            { id: 3, question: "What is the time complexity of a purely linear search?", options: ["O(log n)", "O(1)", "O(n^2)", "O(n)"], correct: 3, explanation: "Every element must be checked in the worst case." }
        ],
        "Information Tech": [
            { id: 1, question: "In Java, standard classes are inherited from which base class?", options: ["System", "Class", "Object", "Main"], correct: 2, explanation: "Every class implicity extends java.lang.Object." },
            { id: 2, question: "Which data structure is optimal for implementing a priority queue?", options: ["Linked List", "Binary Search Tree", "Heap", "Hash Table"], correct: 2, explanation: "Heaps provide O(log n) insertions and extractions for priorities." },
            { id: 3, question: "What is the time complexity of a purely linear search?", options: ["O(log n)", "O(1)", "O(n^2)", "O(n)"], correct: 3, explanation: "Every element must be checked in the worst case." }
        ],
        "Electronics": [
            { id: 1, question: "An operational amplifier ideally has:", options: ["Zero input impedance", "Infinite input impedance", "Infinite output impedance", "Unity gain"], correct: 1, explanation: "Infinite input impedance draws zero current from the source." },
            { id: 2, question: "In boolean algebra, A + A.B equals:", options: ["A", "B", "A.B", "1"], correct: 0, explanation: "A + A.B = A(1 + B) = A." },
            { id: 3, question: "What is the base of the hexadecimal number system?", options: ["2", "8", "10", "16"], correct: 3, explanation: "Hex uses 0-9 and A-F." }
        ],
        "Mechanical": [
            { id: 1, question: "The first law of thermodynamics is essentially the law of conservation of:", options: ["Momentum", "Mass", "Energy", "Entropy"], correct: 2, explanation: "Energy cannot be created or destroyed." },
            { id: 2, question: "In a reversible process, the entropy of the universe:", options: ["Increases", "Decreases", "Remains constant", "Cannot be determined"], correct: 2, explanation: "Only irreversible processes increase total entropy." },
            { id: 3, question: "Bernoulli's equation applies to:", options: ["Viscous flow", "Compressible flow", "Ideal, incompressible fluid flow", "Turbulent flow"], correct: 2, explanation: "Assumes inviscid, incompressible, and steady flow." }
        ],
        "Civil": [
            { id: 1, question: "The process of determining the relative heights of different points on or below the earth's surface is called:", options: ["Levelling", "Contouring", "Surveying", "Traversing"], correct: 0, explanation: "Levelling measures elevations." },
            { id: 2, question: "What is the purpose of a Theodolite?", options: ["Measuring distances", "Measuring angles", "Measuring flow rate", "Measuring pressure"], correct: 1, explanation: "Used to measure horizontal and vertical angles." },
            { id: 3, question: "The stress at which a material breaks is called:", options: ["Yield stress", "Ultimate stress", "Failure stress", "Working stress"], correct: 2, explanation: "Failure point marks physical fracture." }
        ],
        "CSM": [
            { id: 1, question: "Which algorithm is commonly used for Linear Regression?", options: ["Gradient Descent", "Backpropagation", "K-Means", "Dijkstra"], correct: 0, explanation: "Gradient descent minimizes the cost function." },
            { id: 2, question: "Standard Deviation measures:", options: ["Central tendency", "Dispersion of data", "Probability of events", "Linearity"], correct: 1, explanation: "It tells us how spread out the numbers are." },
            { id: 3, question: "Numpy stands for:", options: ["Number Python", "Numerical Python", "Null Python", "New Python"], correct: 1, explanation: "Numerical Python." }
        ]
    },
    "3rd Year": {
        "Computer Science": [
            { id: 1, question: "Which of the following conditions is NOT required for a deadlock to occur?", options: ["Mutual Exclusion", "Hold and Wait", "Preemption", "Circular Wait"], correct: 2, explanation: "It must be NO preemption for deadlock to hold." },
            { id: 2, question: "In a relational database, what does ACID stand for?", options: ["Atomicity, Consistency, Isolation, Durability", "Accuracy, Completeness, Integrity, Dependency", "Allocation, Concurrency, Iteration, Duration", "None of the above"], correct: 0, explanation: "ACID properties guarantee robust transactions." },
            { id: 3, question: "At which OSI layer does the IP protocol operate?", options: ["Data Link", "Network", "Transport", "Session"], correct: 1, explanation: "IP relies on Layer 3 (Network) for routing." }
        ],
        "Information Tech": [
            { id: 1, question: "Which of the following conditions is NOT required for a deadlock to occur?", options: ["Mutual Exclusion", "Hold and Wait", "Preemption", "Circular Wait"], correct: 2, explanation: "It must be NO preemption for deadlock to hold." },
            { id: 2, question: "In a relational database, what does ACID stand for?", options: ["Atomicity, Consistency, Isolation, Durability", "Accuracy, Completeness, Integrity, Dependency", "Allocation, Concurrency, Iteration, Duration", "None of the above"], correct: 0, explanation: "ACID properties guarantee robust transactions." },
            { id: 3, question: "At which OSI layer does the IP protocol operate?", options: ["Data Link", "Network", "Transport", "Session"], correct: 1, explanation: "IP relies on Layer 3 (Network) for routing." }
        ],
        "Electronics": [
            { id: 1, question: "The 8085 microprocessor is an ____ bit processor.", options: ["4", "8", "16", "32"], correct: 1, explanation: "It has an 8-bit data bus." },
            { id: 2, question: "In digital signal processing, aliasing occurs when:", options: ["Sampling rate > 2 * max frequency", "Sampling rate < 2 * max frequency", "Signal is amplified", "Signal is filtered"], correct: 1, explanation: "Nyquist criterion must be met to avoid aliasing." },
            { id: 3, question: "CMOS stands for:", options: ["Complementary Metal-Oxide Semiconductor", "Complex Metal-Oxide Silicon", "Capacitive Metal-Oxide System", "Current Mode Operating System"], correct: 0, explanation: "CMOS pairs p-type and n-type MOSFETs." }
        ],
        "Mechanical": [
            { id: 1, question: "Stefan-Boltzmann law is applicable to:", options: ["Conduction", "Convection", "Thermal Radiation", "Mass Transfer"], correct: 2, explanation: "It describes the power radiated from a black body." },
            { id: 2, question: "Which manufacturing process involves pouring molten metal into a mold cavity?", options: ["Forging", "Welding", "Machining", "Casting"], correct: 3, explanation: "Casting allows for complex shapes to be formed from liquid metal." },
            { id: 3, question: "In orthogonal cutting, the cutting edge is:", options: ["Parallel to the direction of tool motion", "Perpendicular to the direction of tool motion", "At an acute angle to tool motion", "At an obtuse angle"], correct: 1, explanation: "Orthogonal implies 90 degrees." }
        ],
        "Civil": [
            { id: 1, question: "What is the standard compressive strength of M20 grade concrete after 28 days?", options: ["10 MPa", "15 MPa", "20 MPa", "25 MPa"], correct: 2, explanation: "The number refers to its 28-day 15cm cube compressive strength in N/mm² (MPa)." },
            { id: 2, question: "The most commonly used reinforcement material in concrete is:", options: ["Aluminum", "Copper", "Steel", "Iron"], correct: 2, explanation: "Steel matches the thermal expansion of concrete well." },
            { id: 3, question: "Bearing capacity of soil refers to:", options: ["Its permeability", "Its ability to support loads without failure", "Its moisture content", "Its density"], correct: 1, explanation: "Crucial for foundation design." }
        ],
        "CSM": [
            { id: 1, question: "What is a 'Perceptron' in Neural Networks?", options: ["A hidden layer", "A single layer neural network", "An activation function", "A type of dataset"], correct: 1, explanation: "A perceptron is the simplest form of a neural network." },
            { id: 2, question: "Which activation function outputs values between 0 and 1?", options: ["ReLU", "Sigmoid", "Tanh", "Softmax"], correct: 1, explanation: "Sigmoid maps input to (0, 1)." },
            { id: 3, question: "What is Backpropagation used for?", options: ["Data cleaning", "Updating weights in neural networks", "Clustering data", "Visualizing results"], correct: 1, explanation: "It propagates the error backwards to update synapses." }
        ]
    },
    "4th Year": {
        "Computer Science": [
            { id: 1, question: "In Machine Learning, what is overfitting?", options: ["Model performs well on training data but poorly on unseen data", "Model performs poorly on both", "Model performs well on both", "Algorithm runs too fast"], correct: 0, explanation: "It memorizes the noise." }
        ],
        "Information Tech": [
            { id: 1, question: "In Machine Learning, what is overfitting?", options: ["Model performs well on training data but poorly on unseen data", "Model performs poorly on both", "Model performs well on both", "Algorithm runs too fast"], correct: 0, explanation: "It memorizes the noise." }
        ],
        "Electronics": [
            { id: 1, question: "What is a major advantage of Optical Fiber communication?", options: ["High attenuation", "High bandwidth", "Susceptibility to EMI", "Low cost and easy splicing"], correct: 1, explanation: "Light provides immense bandwidth." }
        ],
        "Mechanical": [
            { id: 1, question: "In CAD, what does B-rep stand for?", options: ["Boundary Representation", "Basic Representation", "Binary Replication", "Broken Resolution"], correct: 0, explanation: "Common solid modeling technique." }
        ],
        "Civil": [
            { id: 1, question: "BOD stands for:", options: ["Biological Oxygen Demand", "Biochemical Oxygen Demand", "Basic Oxygen Depletion", "Bacterial Oxide Distribution"], correct: 1, explanation: "Metric for water pollution." }
        ],
        "CSM": [
            { id: 1, question: "Convolutional Neural Networks (CNNs) are primarily used for:", options: ["Natural Language Processing", "Image Recognition", "Tabular Data", "Audio Synthesis"], correct: 1, explanation: "CNNs excel at detecting spatial features in images." }
        ]
    }
};

export function getMCQs(year: AcademicYear, dept: Department): MCQQuestion[] {
    const yrBank = L3_MCQS[year] || L3_MCQS["1st Year"];
    let qs = yrBank[dept];
    if (!qs || qs.length < 3) qs = yrBank["Computer Science"]; // Fallback to CS if not enough questions
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
        "Computer Science": [
            { id: "c1", language: "C", title: "Pointer Dereference", brokenCode: "int main() {\n  int x = 10;\n  int *p = &x;\n  printf(\"%d\", p); // Error\n}", initialCode: "int main() {\n  int x = 10;\n  int *p = &x;\n  printf(\"%d\", p); // Print the value pointed to by p\n  return 0;\n}", expectedSolutionSnippet: "printf(\"%d\", *p)", errorHint: "Use the dereference operator (*)." }
        ],
        "Information Tech": [
            { id: "c1", language: "C", title: "Pointer Dereference", brokenCode: "int main() {\n  int x = 10;\n  int *p = &x;\n  printf(\"%d\", p); // Error\n}", initialCode: "int main() {\n  int x = 10;\n  int *p = &x;\n  printf(\"%d\", p);\n  return 0;\n}", expectedSolutionSnippet: "*p", errorHint: "Use the dereference operator (*)." }
        ],
        "Electronics": [
            { id: "c1", language: "C", title: "Missing Semicolon", brokenCode: "int main() {\n  int x = 5\n  return 0;\n}", initialCode: "int main() {\n  int x = 5\n  return 0;\n}", expectedSolutionSnippet: "int x = 5;", errorHint: "Statements in C must end with a semicolon." }
        ],
        "Mechanical": [
            { id: "c1", language: "C", title: "Missing Semicolon", brokenCode: "int main() {\n  int x = 5\n  return 0;\n}", initialCode: "int main() {\n  int x = 5\n  return 0;\n}", expectedSolutionSnippet: "int x = 5;", errorHint: "Statements in C must end with a semicolon." }
        ],
        "Civil": [
            { id: "c1", language: "C", title: "Missing Semicolon", brokenCode: "int main() {\n  int x = 5\n  return 0;\n}", initialCode: "int main() {\n  int x = 5\n  return 0;\n}", expectedSolutionSnippet: "int x = 5;", errorHint: "Statements in C must end with a semicolon." }
        ],
        "CSM": [
            { id: "py1", language: "Python", title: "List Indexing", brokenCode: "l = [1, 2, 3]\nprint(l[3])", initialCode: "l = [1, 2, 3]\nprint(l[3])", expectedSolutionSnippet: ["l[2]", "l[0]", "l[1]"], errorHint: "Indices in Python are 0-based. The last element is at index 2." }
        ]
    },
    "2nd Year": {
        "Computer Science": [
            { id: "cs2", language: "Java", title: "Array Index out of bounds", brokenCode: "int[] arr = {1, 2, 3};\nfor(int i=0; i<=arr.length; i++) {\n  print(arr[i]);\n}", initialCode: "int[] arr = {1, 2, 3};\nfor(int i=0; i<=arr.length; i++) {\n  System.out.println(arr[i]);\n}", expectedSolutionSnippet: ["i<arr.length", "i < arr.length"], errorHint: "Array indices are 0-based. arr.length is out of bounds." }
        ],
        "Information Tech": [
            { id: "cs2", language: "Java", title: "Array Index out of bounds", brokenCode: "int[] arr = {1, 2, 3};\nfor(int i=0; i<=arr.length; i++) {\n  print(arr[i]);\n}", initialCode: "int[] arr = {1, 2, 3};\nfor(int i=0; i<=arr.length; i++) {\n  System.out.println(arr[i]);\n}", expectedSolutionSnippet: ["i<arr.length", "i < arr.length"], errorHint: "Array indices are 0-based. arr.length is out of bounds." }
        ],
        "Electronics": [
            { id: "c1", language: "C", title: "Logical Error", brokenCode: "if (a = 5) { // intent is comparison\n}", initialCode: "int a = 0;\nif (a = 5) {\n  printf(\"Equal\");\n}", expectedSolutionSnippet: "a == 5", errorHint: "Use == for comparison, not assignment." }
        ],
        "Mechanical": [
            { id: "logic1", language: "Logic (Civil/Mech)", title: "Pseudocode Formula", brokenCode: "Area = pi * r \n// intent is area of circle", initialCode: "Area = pi * r", expectedSolutionSnippet: ["r * r", "r^2", "r * r;"], errorHint: "Area of a circle is pi times the radius squared." }
        ],
        "Civil": [
            { id: "logic1", language: "Logic (Civil/Mech)", title: "Pseudocode Formula", brokenCode: "Area = pi * r \n// intent is area of circle", initialCode: "Area = pi * r", expectedSolutionSnippet: ["r * r", "r^2", "r * r;"], errorHint: "Area of a circle is pi times the radius squared." }
        ],
        "CSM": [
            { id: "py2", language: "Python", title: "Variable Scope", brokenCode: "def add():\n  x = 5\nadd()\nprint(x)", initialCode: "x = 0\ndef add():\n  global x\n  x = 5\nadd()\nprint(x)", expectedSolutionSnippet: "global x", errorHint: "To modify a variable outside a function, use the 'global' keyword." }
        ]
    },
    "3rd Year": {
        "Computer Science": [
            { id: "cs3", language: "Python", title: "Indentation Error", brokenCode: "def greet():\nprint(\"Hello\")", initialCode: "def greet():\nprint(\"Hello\")", expectedSolutionSnippet: "    print", errorHint: "Python relies on indentation to define blocks. Add spaces." }
        ],
        "Information Tech": [
            { id: "cs3", language: "Python", title: "Indentation Error", brokenCode: "def greet():\nprint(\"Hello\")", initialCode: "def greet():\nprint(\"Hello\")", expectedSolutionSnippet: "    print", errorHint: "Python relies on indentation to define blocks. Add spaces." }
        ],
        "Electronics": [
            { id: "c2", language: "C", title: "Missing Return Type", brokenCode: "main() {\n  return 0;\n}", initialCode: "main() {\n  return 0;\n}", expectedSolutionSnippet: "int main", errorHint: "Standard C requires an explicit return type for main()." }
        ],
        "Mechanical": [
            { id: "logic2", language: "Logic (Civil/Mech)", title: "Unit Conversion Logic", brokenCode: "meters = km / 1000", initialCode: "meters = km / 1000", expectedSolutionSnippet: "* 1000", errorHint: "To convert kilometers to meters, you multiply by 1000." }
        ],
        "Civil": [
            { id: "logic2", language: "Logic (Civil/Mech)", title: "Unit Conversion Logic", brokenCode: "meters = km / 1000", initialCode: "meters = km / 1000", expectedSolutionSnippet: "* 1000", errorHint: "To convert kilometers to meters, you multiply by 1000." }
        ],
        "CSM": [
            { id: "ml1", language: "Python", title: "Learning Rate Issue", brokenCode: "model.compile(optimizer=tf.keras.optimizers.Adam(lr=100))", initialCode: "model.compile(optimizer=tf.keras.optimizers.Adam(learning_rate=0.001))", expectedSolutionSnippet: ["0.001", "0.01", "0.0001"], errorHint: "A learning rate of 100 is too high. Try something like 0.001." }
        ]
    },
    "4th Year": {
        "Computer Science": [{ id: "cs3", language: "Python", title: "Indentation Error", brokenCode: "def greet():\nprint(\"Hello\")", initialCode: "def greet():\nprint(\"Hello\")", expectedSolutionSnippet: "    print", errorHint: "Python relies on indentation to define blocks. Add spaces." }],
        "Information Tech": [{ id: "cs3", language: "Python", title: "Indentation Error", brokenCode: "def greet():\nprint(\"Hello\")", initialCode: "def greet():\nprint(\"Hello\")", expectedSolutionSnippet: "    print", errorHint: "Python relies on indentation to define blocks. Add spaces." }],
        "Electronics": [{ id: "c2", language: "C", title: "Missing Return Type", brokenCode: "main() {\n  return 0;\n}", initialCode: "main() {\n  return 0;\n}", expectedSolutionSnippet: "int main", errorHint: "Standard C requires an explicit return type for main()." }],
        "Mechanical": [{ id: "logic2", language: "Logic (Civil/Mech)", title: "Unit Conversion Logic", brokenCode: "meters = km / 1000", initialCode: "meters = km / 1000", expectedSolutionSnippet: "* 1000", errorHint: "To convert kilometers to meters, you multiply by 1000." }],
        "Civil": [{ id: "logic2", language: "Logic (Civil/Mech)", title: "Unit Conversion Logic", brokenCode: "meters = km / 1000", initialCode: "meters = km / 1000", expectedSolutionSnippet: "* 1000", errorHint: "To convert kilometers to meters, you multiply by 1000." }],
        "CSM": [{ id: "ml1", language: "Python", title: "Learning Rate Issue", brokenCode: "model.compile(optimizer=tf.keras.optimizers.Adam(lr=100))", initialCode: "model.compile(optimizer=tf.keras.optimizers.Adam(learning_rate=0.001))", expectedSolutionSnippet: ["0.001", "0.01", "0.0001"], errorHint: "A learning rate of 100 is too high. Try something like 0.001." }]
    }
};

export function getDebuggingChallenge(year: AcademicYear, dept: Department): CodeChallenge {
    const yrBank = L4_POOL[year] || L4_POOL["1st Year"];
    const qs = yrBank[dept] || yrBank["Computer Science"];
    return qs[Math.floor(Math.random() * qs.length)] || qs[0];
}
