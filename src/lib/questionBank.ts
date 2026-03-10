// src/lib/questionBank.ts

export type AcademicYear = "1st Year" | "2nd Year" | "3rd Year" | "4th Year";
export type Department = "Computer Science" | "Information Tech" | "Electronics" | "Mechanical" | "Civil" | "CSM";

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
        "Computer Science": [
            { word: "ALGORITHM", clue: "A step-by-step procedure for solving a problem." },
            { word: "COMPILER", clue: "Translates high-level code into machine language." },
            { word: "POINTER", clue: "A variable that stores a memory address." },
            { word: "ARRAY", clue: "A collection of items stored at contiguous memory locations." },
            { word: "FUNCTION", clue: "A reusable block of code that performs a specific task." },
            { word: "VARIABLE", clue: "A named storage location in memory." },
            { word: "SYNTAX", clue: "The set of rules that defines the combinations of symbols." },
            { word: "BINARY", clue: "A numbering system that uses only 0 and 1." }
        ],
        "Information Tech": [
            { word: "ALGORITHM", clue: "A step-by-step procedure for solving a problem." },
            { word: "COMPILER", clue: "Translates high-level code into machine language." },
            { word: "POINTER", clue: "A variable that stores a memory address." },
            { word: "ARRAY", clue: "A collection of items stored at contiguous memory locations." },
            { word: "FUNCTION", clue: "A reusable block of code that performs a specific task." },
            { word: "VARIABLE", clue: "A named storage location in memory." },
            { word: "SYNTAX", clue: "The set of rules that defines the combinations of symbols." },
            { word: "BINARY", clue: "A numbering system that uses only 0 and 1." }
        ],
        "Electronics": [
            { word: "RESISTOR", clue: "Component that limits the flow of electric current." },
            { word: "CAPACITOR", clue: "Component that stores electrical energy in an electric field." },
            { word: "VOLTAGE", clue: "The difference in electric potential between two points." },
            { word: "CURRENT", clue: "The rate of flow of electric charge." },
            { word: "DIODE", clue: "A semiconductor device that allows current to flow in one direction." },
            { word: "TRANSISTOR", clue: "A semiconductor device used to amplify or switch signals." },
            { word: "OHM", clue: "The SI unit of electrical resistance." },
            { word: "KIRCHHOFF", clue: "Scientist famous for laws about current and voltage in circuits." }
        ],
        "Mechanical": [
            { word: "PHYSICS", clue: "The branch of science concerned with the nature and properties of matter." },
            { word: "THERMAL", clue: "Relating to heat." },
            { word: "FORCE", clue: "An interaction that, when unopposed, will change the motion of an object." },
            { word: "MOTION", clue: "The action or process of moving or being moved." },
            { word: "NEWTON", clue: "The SI unit of force." },
            { word: "ENERGY", clue: "The quantitative property that must be transferred to an object to perform work." },
            { word: "WORK", clue: "The product of force and displacement." },
            { word: "POWER", clue: "The rate of doing work." }
        ],
        "Civil": [
            { word: "STATICS", clue: "The branch of mechanics that is concerned with the analysis of loads." },
            { word: "DYNAMICS", clue: "The branch of mechanics concerned with the motion of bodies under action of forces." },
            { word: "FORCE", clue: "An interaction that will change the motion of an object." },
            { word: "VECTOR", clue: "A quantity having direction as well as magnitude." },
            { word: "STRESS", clue: "Force per unit area within materials." },
            { word: "STRAIN", clue: "The measure of deformation of a material." },
            { word: "MOMENT", clue: "A measure of the tendency of a force to cause an object to rotate." },
            { word: "INERTIA", clue: "The resistance of any physical object to any change in its velocity." }
        ],
        "CSM": [
            { word: "ALGORITHM", clue: "A step-by-step procedure for solving a problem." },
            { word: "COMPILER", clue: "Translates high-level code into machine language." },
            { word: "POINTER", clue: "A variable that stores a memory address." },
            { word: "ARRAY", clue: "A collection of items stored at contiguous memory locations." },
            { word: "FUNCTION", clue: "A reusable block of code that performs a specific task." },
            { word: "VARIABLE", clue: "A named storage location in memory." },
            { word: "SYNTAX", clue: "The set of rules that defines the combinations of symbols." },
            { word: "BINARY", clue: "A numbering system that uses only 0 and 1." }
        ]
    },
    "2nd Year": {
        "Computer Science": [
            { word: "OBJECT", clue: "An instance of a class." },
            { word: "CLASS", clue: "A blueprint for creating objects." },
            { word: "INHERITANCE", clue: "Mechanism where one class acquires the properties of another." },
            { word: "POLYMORPHISM", clue: "Ability of an object to take on many forms." },
            { word: "ENCAPSULATION", clue: "Wrapping of data and methods into a single unit." },
            { word: "LINKEDLIST", clue: "A linear data structure where elements are not stored at contiguous locations." },
            { word: "STACK", clue: "A linear data structure which follows LIFO (Last In First Out)." },
            { word: "QUEUE", clue: "A linear data structure which follows FIFO (First In First Out)." }
        ],
        "Information Tech": [
            { word: "OBJECT", clue: "An instance of a class." },
            { word: "CLASS", clue: "A blueprint for creating objects." },
            { word: "INHERITANCE", clue: "Mechanism where one class acquires the properties of another." },
            { word: "POLYMORPHISM", clue: "Ability of an object to take on many forms." },
            { word: "ENCAPSULATION", clue: "Wrapping of data and methods into a single unit." },
            { word: "LINKEDLIST", clue: "A linear data structure where elements are not stored at contiguous locations." },
            { word: "STACK", clue: "A linear data structure which follows LIFO (Last In First Out)." },
            { word: "QUEUE", clue: "A linear data structure which follows FIFO (First In First Out)." }
        ],
        "Electronics": [
            { word: "AMPLIFIER", clue: "A device that increases the power of a signal." },
            { word: "OSCILLATOR", clue: "An electronic circuit that produces a periodic, oscillating signal." },
            { word: "MODULATION", clue: "Process of varying properties of a periodic waveform." },
            { word: "OPAMP", clue: "Operational Amplifier." },
            { word: "SIGNAL", clue: "A physical quantity that varies with time, space, or any other variable." },
            { word: "SYSTEM", clue: "A combination of components that act together to perform a function." },
            { word: "BOOLEAN", clue: "A type of algebra used in digital logic." },
            { word: "LOGIC", clue: "The study of formal reasoning." }
        ],
        "Mechanical": [
            { word: "KINEMATICS", clue: "The branch of mechanics concerned with motion without forces." },
            { word: "DYNAMICS", clue: "Mechanics concerned with the motion of bodies under forces." },
            { word: "THERMODYNAMICS", clue: "Relationship between heat and other forms of energy." },
            { word: "FLUID", clue: "A substance that has no fixed shape and yields to external pressure." },
            { word: "ENTROPY", clue: "A measure of disorder or randomness in a system." },
            { word: "ENTHALPY", clue: "A property of a thermodynamic system equal to inner energy plus PV." },
            { word: "CARNOT", clue: "Scientist famous for the most efficient heat engine cycle." },
            { word: "VISCOSITY", clue: "A measure of a fluid's resistance to flow." }
        ],
        "Civil": [
            { word: "FLUID", clue: "A substance that flows." },
            { word: "MECHANICS", clue: "The branch of science concerned with the behavior of physical bodies." },
            { word: "SURVEYING", clue: "Technique of determining terrestrial position of points." },
            { word: "LEVELING", clue: "Finding the difference in elevation between points." },
            { word: "CONTOUR", clue: "An imaginary line on the ground joining points of equal elevation." },
            { word: "THEODOLITE", clue: "Precision optical instrument for measuring angles." },
            { word: "STRESS", clue: "Force per unit area." },
            { word: "DEFLECTION", clue: "The degree to which a structural element is displaced under a load." }
        ],
        "CSM": [
            { word: "PYTHON", clue: "Popular high-level programming language for AI/ML." },
            { word: "NUMPY", clue: "Library for numerical operations in Python." },
            { word: "PANDAS", clue: "Library for data manipulation and analysis." },
            { word: "MATPLOTLIB", clue: "Library for creating static, animated, and interactive visualizations." },
            { word: "PROBABILITY", clue: "The likelihood of an event occurring." },
            { word: "STATISTICS", clue: "Science of collecting and analyzing numerical data." },
            { word: "VECTORS", clue: "Quantities with both magnitude and direction." },
            { word: "MATRICES", clue: "Rectangular arrays of numbers." }
        ]
    },
    "3rd Year": {
        "Computer Science": [
            { word: "PROCESS", clue: "A program in execution." },
            { word: "THREAD", clue: "Smallest unit of execution within a process." },
            { word: "DEADLOCK", clue: "A situation where processes are blocked forever." },
            { word: "PAGING", clue: "Memory management scheme that eliminates the need for contiguous allocation." },
            { word: "RELATIONAL", clue: "Type of database based on the relational model." },
            { word: "NORMALIZATION", clue: "Process of organizing data in a database to reduce redundancy." },
            { word: "TRANSACTION", clue: "A sequence of database operations processed as a single unit." },
            { word: "DATAGRAM", clue: "A self-contained, independent entity of data." }
        ],
        "Information Tech": [
            { word: "PROCESS", clue: "A program in execution." },
            { word: "THREAD", clue: "Smallest unit of execution within a process." },
            { word: "DEADLOCK", clue: "A situation where processes are blocked forever." },
            { word: "PAGING", clue: "Memory management scheme that eliminates the need for contiguous allocation." },
            { word: "RELATIONAL", clue: "Type of database based on the relational model." },
            { word: "NORMALIZATION", clue: "Process of organizing data in a database to reduce redundancy." },
            { word: "TRANSACTION", clue: "A sequence of database operations processed as a single unit." },
            { word: "DATAGRAM", clue: "A self-contained, independent entity of data." }
        ],
        "Electronics": [
            { word: "MICROPROCESSOR", clue: "An IC that contains the functions of a CPU." },
            { word: "MICROCONTROLLER", clue: "A small computer on a single IC." },
            { word: "ANTENNA", clue: "Interface between radio waves and electric currents." },
            { word: "WAVEGUIDE", clue: "Structure that guides waves, such as EM waves." },
            { word: "DSP", clue: "Digital Signal Processing." },
            { word: "VLSI", clue: "Very Large Scale Integration." },
            { word: "CMOS", clue: "Complementary Metal-Oxide Semiconductor." },
            { word: "EMBEDDED", clue: "Computer system combined with hardware." }
        ],
        "Mechanical": [
            { word: "HEAT", clue: "Forms of energy transferred between systems due to temperature difference." },
            { word: "TRANSFER", clue: "Movement of something from one place to another." },
            { word: "CONDUCTION", clue: "Heat transfer between parts of a continuum." },
            { word: "CONVECTION", clue: "Heat transfer by mass motion of a fluid." },
            { word: "RADIATION", clue: "Emission of energy as EM waves." },
            { word: "MACHINING", clue: "Process of removing material to achieve a shape." },
            { word: "WELDING", clue: "Fabrication process that joins materials." },
            { word: "CASTING", clue: "Pouring liquid into a mold." }
        ],
        "Civil": [
            { word: "CONCRETE", clue: "Composite building material made from aggregate and cement." },
            { word: "STEEL", clue: "Alloy of iron and carbon." },
            { word: "STRUCTURE", clue: "System of connected parts used to support a load." },
            { word: "FOUNDATION", clue: "The element of a structure which connects it to the ground." },
            { word: "SOIL", clue: "Mixture of organic matter, minerals, gases, liquids, and organisms." },
            { word: "BEARING", clue: "Capacity of soil to support loads." },
            { word: "REINFORCEMENT", clue: "Strengthening of concrete." },
            { word: "HIGHWAY", clue: "Public road for heavy traffic." }
        ],
        "CSM": [
            { word: "LEARNING", clue: "The acquisition of knowledge or skills." },
            { word: "NEURAL", clue: "Relating to a network of artificial neurons." },
            { word: "NETWORK", clue: "A group of interconnected systems." },
            { word: "REGRESSION", clue: "A measure of the relation between the mean value of one variable and others." },
            { word: "CLASSIFIED", clue: "Categorizing objects into groups." },
            { word: "CLUSTERING", clue: "Grouping a set of objects such that objects in the same group are more similar." },
            { word: "INFERENCE", clue: "Conclusion reached on the basis of evidence and reasoning." },
            { word: "VALUATION", clue: "Estimation of something's worth." }
        ]
    },
    "4th Year": {
        "Computer Science": [
            { word: "CLOUD", clue: "On-demand availability of computer system resources." },
            { word: "MACHINE", clue: "A device that uses energy to perform some action." },
            { word: "LEARNING", clue: "A branch of AI focused on building systems that learn from data." },
            { word: "SECURITY", clue: "Protection of computer systems from information disclosure." },
            { word: "NETWORK", clue: "A set of computers sharing resources." },
            { word: "AGILE", clue: "Methods for software development based on iterative development." },
            { word: "SCRUM", clue: "Framework for project management." },
            { word: "DEVOPS", clue: "Set of practices that combine software development and IT operations." }
        ],
        "Information Tech": [
            { word: "CLOUD", clue: "On-demand availability of computer system resources." },
            { word: "MACHINE", clue: "A device that uses energy to perform some action." },
            { word: "LEARNING", clue: "A branch of AI focused on building systems that learn from data." },
            { word: "SECURITY", clue: "Protection of computer systems from information disclosure." },
            { word: "NETWORK", clue: "A set of computers sharing resources." },
            { word: "AGILE", clue: "Methods for software development based on iterative development." },
            { word: "SCRUM", clue: "Framework for project management." },
            { word: "DEVOPS", clue: "Set of practices that combine software development and IT operations." }
        ],
        "Electronics": [
            { word: "IOT", clue: "Internet of Things." },
            { word: "WIRELESS", clue: "Communication without wires." },
            { word: "OPTICAL", clue: "Relating to sight or light." },
            { word: "SATELLITE", clue: "An artificial body placed in orbit round the earth." },
            { word: "RADAR", clue: "System for detecting the presence, direction, distance, and speed of objects." },
            { word: "NANOTECH", clue: "Manipulation of matter on an atomic, molecular, and supramolecular scale." },
            { word: "ROBOTICS", clue: "Interdisciplinary branch of engineering and science." },
            { word: "AUTOMATION", clue: "Use of largely automatic equipment." }
        ],
        "Mechanical": [
            { word: "CAD", clue: "Computer Aided Design." },
            { word: "CAM", clue: "Computer Aided Manufacturing." },
            { word: "ROBOTICS", clue: "Interdisciplinary branch of engineering and science." },
            { word: "AUTOMATION", clue: "Use of largely automatic equipment." },
            { word: "MECHATRONICS", clue: "Multidisciplinary branch of engineering combining electronics and mechanics." },
            { word: "VIBRATION", clue: "A periodic motion of the particles of an elastic body." },
            { word: "OPTIMIZATION", clue: "The action of making the best or most effective use of a situation." },
            { word: "RENEWABLE", clue: "Energy from a source that is not depleted when used." }
        ],
        "Civil": [
            { word: "ENVIRONMENT", clue: "The surroundings or conditions in which a person lives." },
            { word: "TRANSPORTATION", clue: "Movement of humans, animals and goods from one location to another." },
            { word: "RAILWAY", clue: "A track or set of tracks made of steel rails." },
            { word: "AIRPORT", clue: "A complex of runways and buildings for flying." },
            { word: "BRIDGE", clue: "A structure built to span a physical obstacle." },
            { word: "DAM", clue: "A barrier that stops or restricts the flow of water." },
            { word: "RESERVOIR", clue: "Large natural or artificial lake used as a source of water supply." },
            { word: "IRRIGATION", clue: "The supply of water to land or crops to help growth." }
        ],
        "CSM": [
            { word: "DEEP", clue: "Type of learning based on artificial neural networks." },
            { word: "VISION", clue: "Branch of AI that enables computers to derive meaningful info from images." },
            { word: "NATURAL", clue: "Relating to language that has developed naturally in humans." },
            { word: "LANGUAGE", clue: "The method of human communication." },
            { word: "TENSORFLOW", clue: "Open-source library for machine learning." },
            { word: "PYTORCH", clue: "Open-source machine learning framework." },
            { word: "BIGDATA", clue: "Extremely large data sets." },
            { word: "HADOOP", clue: "Framework for distributed storage and processing." }
        ]
    }
};

export function getCrosswordWords(year: AcademicYear, dept: Department): L1Word[] {
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
            { id: 101, question: "Which of the following is NOT a fundamental data type in C?", options: ["int", "float", "string", "char"], correct: 2, explanation: "C does not have a built-in 'string' type; arrays of char are used instead." },
            { id: 102, question: "What does the 'sizeof' operator evaluate?", options: ["Execution time", "Memory size in bytes", "String length", "Array size"], correct: 1, explanation: "sizeof returns memory footprint." },
            { id: 103, question: "Which header file is required for printf()?", options: ["conio.h", "math.h", "stdio.h", "stdlib.h"], correct: 2, explanation: "stdio.h stands for Standard Input Output." },
            { id: 104, question: "What is the result of 5 / 2 in integer division in C?", options: ["2.5", "2", "3", "0"], correct: 1, explanation: "Integer division truncates decimals." },
            { id: 105, question: "Which of these is used for multi-line comments in C?", options: ["//", "/* */", "--", "#"], correct: 1, explanation: "/* */ is standard for multi-line." },
            { id: 106, question: "What is the escape sequence for a newline?", options: ["\\t", "\\r", "\\n", "\\b"], correct: 2, explanation: "\\n is newline." }
        ],
        "Information Tech": [
            { id: 111, question: "Which of the following is NOT a fundamental data type in C?", options: ["int", "float", "string", "char"], correct: 2, explanation: "C does not have built-in 'string'." },
            { id: 112, question: "Which data structure operates on LIFO?", options: ["Queue", "Tree", "Stack", "Graph"], correct: 2, explanation: "Stacks are LIFO." },
            { id: 113, question: "RAM stands for?", options: ["Read Access Memory", "Random Access Memory", "Ready Access Memory", "Real Access Memory"], correct: 1, explanation: "Random Access Memory." },
            { id: 114, question: "Which is a valid variable name in C?", options: ["2ndVar", "first_var", "float", "my-var"], correct: 1, explanation: "Variables can start with letters or underscore." },
            { id: 115, question: "Binary representation of 5 is?", options: ["101", "110", "111", "001"], correct: 0, explanation: "4 + 0 + 1 = 5." },
            { id: 116, question: "Who is known as the father of computers?", options: ["Alan Turing", "Charles Babbage", "Bill Gates", "Dennis Ritchie"], correct: 1, explanation: "Charles Babbage." }
        ],
        "Electronics": [
            { id: 121, question: "KCL is based on the law of conservation of:", options: ["Energy", "Momentum", "Charge", "Mass"], correct: 2, explanation: "KCL states charge cannot be created/destroyed at a node." },
            { id: 122, question: "An ideal voltmeter has:", options: ["Zero resistance", "Infinite resistance", "Finite small", "Reactance"], correct: 1, explanation: "Infinite resistance prevents current flow." },
            { id: 123, question: "Silicon is a:", options: ["Conductor", "Semiconductor", "Insulator", "Superconductor"], correct: 1, explanation: "Silicon is the base of electronics." },
            { id: 124, question: "What is the unit of Capacitance?", options: ["Ohm", "Henry", "Farad", "Volt"], correct: 2, explanation: "Farad (F)." },
            { id: 125, question: "PN junction diode allows current in:", options: ["Both directions", "One direction", "Neither", "Depends on heat"], correct: 1, explanation: "Diodes are unidirectional." },
            { id: 126, question: "Resistance of an ideal wire is:", options: ["Infinite", "Zero", "1 Ohm", "Variable"], correct: 1, explanation: "Ideal wires have no lost energy." }
        ],
        "Mechanical": [
            { id: 131, question: "Newton's Second Law relates force to:", options: ["Velocity/Time", "Mass/Acceleration", "Work/Distance", "Pressure/Area"], correct: 1, explanation: "F = ma." },
            { id: 132, question: "Hooke's Law holds good up to:", options: ["Yield point", "Proportionality limit", "Breaking point", "Elastic limit"], correct: 1, explanation: "Stress prop to Strain." },
            { id: 133, question: "Unit of Work is:", options: ["Watt", "Newton", "Joule", "Pascal"], correct: 2, explanation: "Joule (J)." },
            { id: 134, question: "Vector quantity among these is:", options: ["Mass", "Distance", "Velocity", "Temperature"], correct: 2, explanation: "Velocity has direction." },
            { id: 135, question: "Power is defined as:", options: ["Force x Time", "Work / Time", "Mass x Velocity", "Force / Area"], correct: 1, explanation: "Rate of doing work." },
            { id: 136, question: "Density is defined as:", options: ["Mass x Volume", "Volume / Mass", "Mass / Volume", "Weight / Area"], correct: 2, explanation: "m / V." }
        ],
        "Civil": [
            { id: 141, question: "Unit of force in SI system:", options: ["Dyne", "Newton", "Pound", "Joule"], correct: 1, explanation: "Newton." },
            { id: 142, question: "Moment of force is product of force and:", options: ["Parallel dist", "Perpendicular dist", "Velocity", "Time"], correct: 1, explanation: "M = F * d_perp." },
            { id: 143, question: "Friction always acts in direction:", options: ["Parallel", "Perpendicular", "Opposite to motion", "45 deg"], correct: 2, explanation: "Opposes motion." },
            { id: 144, question: "Stress is defined as:", options: ["Force / Area", "Force x Area", "Mass / Area", "Volume / Force"], correct: 0, explanation: "Standard definition." },
            { id: 145, question: "The SI unit of pressure is:", options: ["Newton", "Joule", "Pascal", "Watt"], correct: 2, explanation: "Pascal (N/m^2)." },
            { id: 146, question: "A body at rest is in:", options: ["Motion", "Static equilibrium", "Dynamic equilibrium", "Acceleration"], correct: 1, explanation: "Sum of forces = 0." }
        ],
        "CSM": [
            { id: 151, question: "Primary library for data manipulation in Python?", options: ["Numpy", "Pandas", "Matplotlib", "Scikit"], correct: 1, explanation: "Pandas for dataframes." },
            { id: 152, question: "Keyword to define a function in Python?", options: ["func", "def", "lambda", "function"], correct: 1, explanation: "def." },
            { id: 153, question: "Standard Mean is:", options: ["Sum", "Sum / Count", "Product", "Middle"], correct: 1, explanation: "Average." },
            { id: 154, question: "What is an Outlier?", options: ["Center value", "Extreme value", "Average value", "Most frequent"], correct: 1, explanation: "Data point significantly different from others." },
            { id: 155, question: "Median of [1, 3, 5] is?", options: ["1", "3", "5", "9"], correct: 1, explanation: "Middle value." },
            { id: 156, question: "Python is a ___ type language.", options: ["Compiled", "Interpreted", "Low level", "Hardware"], correct: 1, explanation: "Interpreted." }
        ]
    },
    "2nd Year": {
        "Computer Science": [
            { id: 201, question: "In Java, standard classes are inherited from:", options: ["System", "Class", "Object", "Main"], correct: 2, explanation: "java.lang.Object." },
            { id: 202, question: "Optimal DS for priority queue?", options: ["Linked List", "BST", "Heap", "Hash Table"], correct: 2, explanation: "Heaps for O(log n)." },
            { id: 203, question: "Time complexity of linear search?", options: ["O(log n)", "O(1)", "O(n^2)", "O(n)"], correct: 3, explanation: "Worst case n." },
            { id: 204, question: "Which is not an OOP concept?", options: ["Encapsulation", "Inheritance", "Compilation", "Polymorphism"], correct: 2, explanation: "Compilation is a process." },
            { id: 205, question: "Private members can be accessed by:", options: ["Child classes", "Same class", "Main method", "Public methods"], correct: 1, explanation: "Strict class scope." },
            { id: 206, question: "Java uses which for memory management?", options: ["Manual delete", "Garbage Collector", "Destructors", "Free()"], correct: 1, explanation: "Automatic GC." }
        ],
        "Information Tech": [
            { id: 211, question: "In Java, standard classes are inherited from:", options: ["System", "Class", "Object", "Main"], correct: 2, explanation: "java.lang.Object." },
            { id: 212, question: "Optimal DS for priority queue?", options: ["Linked List", "BST", "Heap", "Hash Table"], correct: 2, explanation: "Heaps for O(log n)." },
            { id: 213, question: "What is DBMS?", options: ["Database Mgmt System", "Data Block System", "Digital Backup", "Data Buffer"], correct: 0, explanation: "Managed data." },
            { id: 214, question: "SQL stands for?", options: ["Simple Query Lang", "Structured Query Lang", "System Query Lang", "Static Query Lang"], correct: 1, explanation: "Structured Query." },
            { id: 215, question: "Primary Key must be:", options: ["Null", "Unique and Not Null", "String", "Foreign"], correct: 1, explanation: "Unique identifier." },
            { id: 216, question: "Which is a NoSQL database?", options: ["MySQL", "PostgreSQL", "MongoDB", "Oracle"], correct: 2, explanation: "Document based." }
        ],
        "Electronics": [
            { id: 221, question: "Op-Amp ideally has:", options: ["Zero input imp", "Inf input imp", "Inf output imp", "Unity gain"], correct: 1, explanation: "Infinite input impedance." },
            { id: 222, question: "In boolean algebra, A + A.B equals:", options: ["A", "B", "A.B", "1"], correct: 0, explanation: "A(1+B) = A." },
            { id: 223, question: "Base of Hexadecimal?", options: ["2", "8", "10", "16"], correct: 3, explanation: "16." },
            { id: 224, question: "AND gate output is 1 if:", options: ["Any input 1", "No input 1", "All inputs 1", "Inputs different"], correct: 2, explanation: "Strict AND logic." },
            { id: 225, question: "Binary 1010 in decimal is?", options: ["8", "10", "12", "14"], correct: 1, explanation: "8+2." },
            { id: 226, question: "Zener diode is used for:", options: ["Amplification", "Rectification", "Voltage regulation", "Oscillation"], correct: 2, explanation: "Works in breakdown region." }
        ],
        "Mechanical": [
            { id: 231, question: "First law of thermodynamics is law of conservation of:", options: ["Momentum", "Mass", "Energy", "Entropy"], correct: 2, explanation: "Energy conserved." },
            { id: 232, question: "In reversible process, entropy of universe:", options: ["Increases", "Decreases", "Constant", "Unknown"], correct: 2, explanation: "Total entropy constant in ideal reversibility." },
            { id: 233, question: "Bernoulli equation applies to:", options: ["Viscous", "Compressible", "Ideal incompressible", "Turbulent"], correct: 2, explanation: "Inviscid/Incompressible." },
            { id: 234, question: "Viscosity of water compared to air is:", options: ["Higher", "Lower", "Same", "Zero"], correct: 0, explanation: "Water is more viscous." },
            { id: 235, question: "Centrifugal pump is a ___ machine.", options: ["Power absorbing", "Power producing", "Static", "Efficiency"], correct: 0, explanation: "Takes work to move fluid." },
            { id: 236, question: "Standard gravity (g) value in m/s^2:", options: ["8.9", "9.81", "10.5", "7.5"], correct: 1, explanation: "Constant." }
        ],
        "Civil": [
            { id: 241, question: "Determining heights of points is called:", options: ["Levelling", "Contouring", "Surveying", "Traversing"], correct: 0, explanation: "Levelling." },
            { id: 242, question: "Purpose of Theodolite?", options: ["Distances", "Angles", "Flow", "Pressure"], correct: 1, explanation: "Measuring angles." },
            { id: 243, question: "Stress at which material breaks:", options: ["Yield", "Ultimate", "Failure", "Working"], correct: 2, explanation: "Breaking point." },
            { id: 244, question: "Contours of equal elevation that close indicate a:", options: ["Valley", "Hill or Depression", "Cliff", "Road"], correct: 1, explanation: "Circular contours." },
            { id: 245, question: "Unit of Stress:", options: ["N", "N/m", "N/m^2", "m"], correct: 2, explanation: "Pascal." },
            { id: 246, question: "Concrete is strong in:", options: ["Tension", "Compression", "Torsion", "Bending"], correct: 1, explanation: "Brittle nature." }
        ],
        "CSM": [
            { id: 251, question: "Algorithm for Linear Regression?", options: ["Gradient Descent", "Backprop", "K-Means", "Dijkstra"], correct: 0, explanation: "Minimizes cost." },
            { id: 252, question: "Standard Deviation measures:", options: ["Central tendency", "Dispersion", "Probability", "Linearity"], correct: 1, explanation: "Spread of data." },
            { id: 253, question: "Numpy stands for:", options: ["Number Py", "Numerical Py", "Null Py", "New Py"], correct: 1, explanation: "Numerical Python." },
            { id: 254, question: "Normal Distribution is also called:", options: ["Bell curve", "S-Curve", "Step curve", "Log curve"], correct: 0, explanation: "Symmetric shape." },
            { id: 255, question: "Correlation coefficient range:", options: ["0 to 1", "-1 to 1", "-inf to inf", "0 to inf"], correct: 1, explanation: "Pearson r." },
            { id: 256, question: "Target variable in regression is:", options: ["Discrete", "Continuous", "Categorical", "Binary"], correct: 1, explanation: "Real numbers." }
        ]
    },
    "3rd Year": {
        "Computer Science": [
            { id: 301, question: "Property NOT required for deadlock?", options: ["Mutual Exclusion", "Hold and Wait", "Preemption", "Circular Wait"], correct: 2, explanation: "NO preemption required." },
            { id: 302, question: "In database, ACID stands for:", options: ["Atomicity...", "Accuracy...", "Allocation...", "None"], correct: 0, explanation: "A,C,I,D." },
            { id: 303, question: "OSI layer for IP protocol?", options: ["Data Link", "Network", "Transport", "Session"], correct: 1, explanation: "Layer 3." },
            { id: 304, question: "Which scheduling is non-preemptive?", options: ["Round Robin", "FCFS", "Priority", "SRTF"], correct: 1, explanation: "First Come First Served." },
            { id: 305, question: "HTTP port?", options: ["21", "25", "80", "443"], correct: 2, explanation: "Standard web port." },
            { id: 306, question: "What is a Trojan Horse?", options: ["Protocol", "Hardware", "Malware disguised as good", "Antivirus"], correct: 2, explanation: "Security threat." }
        ],
        "Information Tech": [
            { id: 311, question: "Property NOT required for deadlock?", options: ["Mutual Exclusion", "Hold and Wait", "Preemption", "Circular Wait"], correct: 2, explanation: "NO preemption required." },
            { id: 312, question: "In database, ACID stands for:", options: ["Atomicity...", "Accuracy...", "Allocation...", "None"], correct: 0, explanation: "A,C,I,D." },
            { id: 313, question: "OSI layer for IP protocol?", options: ["Data Link", "Network", "Transport", "Session"], correct: 1, explanation: "Layer 3." },
            { id: 314, question: "Cryptography deals with:", options: ["Hardware", "Secure Comm", "Database", "Networking"], correct: 1, explanation: "Encryption/Decryption." },
            { id: 315, question: "Complexity of QuickSort (Avg)?", options: ["O(n)", "O(n log n)", "O(n^2)", "O(log n)"], correct: 1, explanation: "Divide and Conquer." },
            { id: 316, question: "What is a Firewall?", options: ["Antivirus", "Network security device", "Hard drive", "CPU cooler"], correct: 1, explanation: "Filters traffic." }
        ],
        "Electronics": [
            { id: 321, question: "8085 is an ____ bit processor.", options: ["4", "8", "16", "32"], correct: 1, explanation: "8-bit data bus." },
            { id: 322, question: "Aliasing occurs when:", options: ["fs > 2f", "fs < 2f", "Amp increased", "Filtered"], correct: 1, explanation: "Nyquist fails." },
            { id: 323, question: "CMOS stands for:", options: ["Complementary Metal-Oxide...", "Complex...", "Capacitive...", "Current..."], correct: 0, explanation: "n-type + p-type." },
            { id: 324, question: "Modulation is done at:", options: ["Transmitter", "Receiver", "Channel", "Antenna"], correct: 0, explanation: "Encoding signal." },
            { id: 325, question: "Full Duplex means:", options: ["One way", "Two way alternate", "Two way simultaneous", "No way"], correct: 2, explanation: "Phone call type." },
            { id: 326, question: "Microprocessor 8086 has address bus of:", options: ["8 bit", "16 bit", "20 bit", "32 bit"], correct: 2, explanation: "1MB memory addressable." }
        ],
        "Mechanical": [
            { id: 331, question: "Stefan-Boltzmann law is for:", options: ["Conduction", "Convection", "Thermal Radiation", "Mass Transfer"], correct: 2, explanation: "Power radiated." },
            { id: 332, question: "Pouring molten metal into mold:", options: ["Forging", "Welding", "Machining", "Casting"], correct: 3, explanation: "Casting." },
            { id: 333, question: "In orthogonal cutting, edge is:", options: ["Parallel", "Perpendicular", "Acute", "Obtuse"], correct: 1, explanation: "90 deg." },
            { id: 334, question: "Heat engine converts heat into:", options: ["Work", "Mass", "Density", "Gravity"], correct: 0, explanation: "Energy conversion." },
            { id: 335, question: "COP is for:", options: ["Engines", "Refrigerators", "Pumps", "Motors"], correct: 1, explanation: "Coefficient of Performance." },
            { id: 336, question: "Latent heat is heat for:", options: ["Phase change", "Temp change", "Force change", "Mass change"], correct: 0, explanation: "Constant temp." }
        ],
        "Civil": [
            { id: 341, question: "Strength of M20 concrete at 28 days:", options: ["10 MPa", "15 MPa", "20 MPa", "25 MPa"], correct: 2, explanation: "N/mm^2 unit." },
            { id: 342, question: "Reinforcement material in concrete:", options: ["Aluminum", "Copper", "Steel", "Iron"], correct: 2, explanation: "Steel." },
            { id: 343, question: "Bearing capacity is:", options: ["Permeability", "Support loads", "Moisture", "Density"], correct: 1, explanation: "Soil strength." },
            { id: 344, question: "Piles are used in ___ foundation.", options: ["Shallow", "Deep", "Isolated", "Combined"], correct: 1, explanation: "Transfer load to deep strata." },
            { id: 345, question: "Slump test is for:", options: ["Strength", "Workability", "Durability", "Elasticity"], correct: 1, explanation: "Consistency of concrete." },
            { id: 346, question: "Cement setting time:", options: ["10 min", "30 min (Initial)", "10 hours (Final)", "Both B and C"], correct: 3, explanation: "Standard ASTM." }
        ],
        "CSM": [
            { id: 351, question: "What is a 'Perceptron'?", options: ["Hidden layer", "Single layer NN", "Activation", "Dataset"], correct: 1, explanation: "Simplest NN." },
            { id: 352, question: "Function outputs between 0 and 1?", options: ["ReLU", "Sigmoid", "Tanh", "Softmax"], correct: 1, explanation: "Sigmoid." },
            { id: 353, question: "Backpropagation is for:", options: ["Cleaning", "Updating weights", "Clustering", "Visualizing"], correct: 1, explanation: "Gradient calculation." },
            { id: 354, question: "Supervised learning requires:", options: ["Labels", "No labels", "Large CPU", "Internet"], correct: 0, explanation: "Matching inputs to targets." },
            { id: 355, question: "K-Means is for:", options: ["Classification", "Clustering", "Regression", "Cleaning"], correct: 1, explanation: "Unsupervised grouping." },
            { id: 356, question: "CNN stands for:", options: ["Computer Neural Net", "Convolutional Neural Net", "Circuit Neural Net", "Circular Neural Net"], correct: 1, explanation: "Image processing." }
        ]
    },
    // Adding 4th year for complete coverage
    "4th Year": {
        "Computer Science": [
            { id: 401, question: "In ML, what is overfitting?", options: ["Good on train, bad on test", "Bad on both", "Good on both", "Too fast"], correct: 0, explanation: "Memorizes noise." },
            { id: 402, question: "Cloud computing 'SaaS' stands for:", options: ["Software as a Service", "System as a Service", "Storage as a Service", "Service as a Software"], correct: 0, explanation: "Application via web." },
            { id: 403, question: "Cyber security 'Worm' differs from Virus by:", options: ["Size", "Self-replication without host", "Color", "Price"], correct: 1, explanation: "Active spread." }
        ],
        "Information Tech": [
            { id: 411, question: "In ML, what is overfitting?", options: ["Good on train, bad on test", "Bad on both", "Good on both", "Too fast"], correct: 0, explanation: "Memorizes noise." },
            { id: 412, question: "Big Data 'V's include:", options: ["Volume, Variety, Velocity", "Value, Vendor, version", "Volume, Video, Voice", "None"], correct: 0, explanation: "Core characteristics." },
            { id: 413, question: "Blockchain is a ___ ledger.", options: ["Centralized", "Distributed", "Temporary", "Secret"], correct: 1, explanation: "Decentralized trust." }
        ],
        "Electronics": [
            { id: 421, question: "Advantage of Optical Fiber:", options: ["Attenuation", "Bandwidth", "EMI susceptibility", "Cost"], correct: 1, explanation: "Immense channel capacity." },
            { id: 422, question: "GPS uses which frequency band?", options: ["HF", "VHF", "L-Band", "MF"], correct: 2, explanation: "Microwave region." },
            { id: 423, question: "Radar stands for:", options: ["Radio Detection and Ranging", "Rapid Delay and Range", "Radio Digital and Run", "None"], correct: 0, explanation: "Standard acronym." }
        ],
        "Mechanical": [
            { id: 431, question: "In CAD, B-rep stands for:", options: ["Boundary Rep", "Basic Rep", "Binary Repl", "Broken Res"], correct: 0, explanation: "Solid modeling." },
            { id: 432, question: "Robotics 'DOF' stands for:", options: ["Depth of Field", "Degrees of Freedom", "Data of Force", "Dual Operating Factor"], correct: 1, explanation: "Independent motions." },
            { id: 433, question: "CNC stands for:", options: ["Computer Numerical Control", "Central Network Code", "Circular Node Control", "None"], correct: 0, explanation: "Automated machining." }
        ],
        "Civil": [
            { id: 441, question: "BOD stands for:", options: ["Biological...", "Biochemical...", "Basic...", "Bacterial..."], correct: 1, explanation: "Oxygen metric." },
            { id: 442, question: "Railway 'Gauge' is distance between:", options: ["Outer rails", "Inner faces of rails", "Sleepers", "Signals"], correct: 1, explanation: "Standard definition." },
            { id: 443, question: "Traffic density is measured in:", options: ["km/hr", "vehicles/km", "tons/day", "liters"], correct: 1, explanation: "Road capacity metric." }
        ],
        "CSM": [
            { id: 451, question: "CNNs are primarily for:", options: ["NLP", "Image Recognition", "Tabular", "Audio"], correct: 1, explanation: "Spatial features." },
            { id: 452, question: "NLP 'Tokenization' is:", options: ["Encrypting", "Breaking text into words", "Combining sentences", "Deleting stop words"], correct: 1, explanation: "Preprocessing step." },
            { id: 453, question: "RNNs are good for:", options: ["Static images", "Sequential data", "Single values", "Colors"], correct: 1, explanation: "Time-series or text." }
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
    let qs = yrBank[dept];
    if (!qs || qs.length < 3) qs = yrBank["Computer Science"];

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
