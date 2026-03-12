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
            { word: "BINARY", clue: "Base-2 number system.", hint: "Zeros and ones." },
            { word: "LOOP", clue: "Repeat code block.", hint: "For or While." },
            { word: "CPLUS", clue: "OOP version of C.", hint: "C with classes." },
            { word: "INT", clue: "Whole number type.", hint: "Integer." },
            { word: "CHAR", clue: "Single character type.", hint: "Keyword char." },
            { word: "FLOAT", clue: "Decimal number type.", hint: "Real numbers." },
            { word: "RAM", clue: "Volatile memory.", hint: "Random Access Memory." },
            { word: "CPU", clue: "Brain of computer.", hint: "Processor." },
            { word: "HTML", clue: "Web page structure.", hint: "Hypertext Markup." },
            { word: "CSS", clue: "Web page styling.", hint: "Sheets." },
            { word: "STACK", clue: "LIFO structure.", hint: "Last-In First-Out." },
            { word: "QUEUE", clue: "FIFO structure.", hint: "First-In First-Out." },
            { word: "BIT", clue: "Smallest unit of data.", hint: "0 or 1." },
            { word: "BYTE", clue: "8 bits.", hint: "Small unit." },
            { word: "FILE", clue: "Data stored on disk.", hint: "Read/Write source." },
            { word: "INPUT", clue: "Data given to computer.", hint: "Keyboard/Mouse." },
            { word: "OUTPUT", clue: "Data from computer.", hint: "Monitor/Printer." },
            { word: "BUG", clue: "Error in code.", hint: "Needs fixed." },
            { word: "Logic", clue: "Boolean operations.", hint: "AND OR NOT." },
            { word: "TRUE", clue: "Boolean 1.", hint: "Not false." },
            { word: "FALSE", clue: "Boolean 0.", hint: "Not true." },
            { word: "NULL", clue: "Empty value.", hint: "Zero pointer." },
            { word: "VOID", clue: "No return type.", hint: "Return nothing." },
            { word: "MAIN", clue: "Entry point of code.", hint: "Starting function." },
            { word: "BREAK", clue: "Exit loop early.", hint: "Keyword." },
            { word: "CONST", clue: "Unchanging value.", hint: "Constant." },
            { word: "LINK", clue: "Reference to data.", hint: "Address." },
            { word: "DATA", clue: "Raw facts.", hint: "Information." },
            { word: "INFO", clue: "Processed data.", hint: "Meaning." },
            { word: "DISK", clue: "HDD or SSD.", hint: "Storage." },
            { word: "HARD", clue: "Physical parts.", hint: "Hardware." },
            { word: "SOFT", clue: "Programs/scripts.", hint: "Software." },
            { word: "WEB", clue: "World Wide Web.", hint: "Internet site." },
            { word: "NET", clue: "Connected computers.", hint: "Network." },
            { word: "GATE", clue: "AND, OR, NOT cell.", hint: "Logic Gate." },
            { word: "CHIP", clue: "Integrated circuit.", hint: "IC." },
            { word: "BIOS", clue: "Basic firmware.", hint: "Input Output." },
            { word: "OPER", clue: "Software managing hardware.", hint: "OS." },
            { word: "PRINT", clue: "Display to screen/paper.", hint: "Function." },
            { word: "SCAN", clue: "Read input.", hint: "Function name." },
            { word: "UNIT", clue: "Arithmetic Logic part.", hint: "ALU." },
            { word: "MEM", clue: "Data storage area.", hint: "Memory." },
            { word: "ROM", clue: "Non-volatile memory.", hint: "Read Only." }
        ],
        "ece": [
            { word: "RESISTOR", clue: "Limits electric current.", hint: "V = IR component." },
            { word: "VOLTAGE", clue: "Electric potential.", hint: "Measured in Volts." },
            { word: "CURRENT", clue: "Flow of charge.", hint: "Measured in Amperes." },
            { word: "DIODE", clue: "One-way current flow.", hint: "P-N Junction device." },
            { word: "CIRCUIT", clue: "Path for electricity.", hint: "A closed loop." },
            { word: "CHIP", clue: "Amplify or switch signals.", hint: "Integrated Circuit." },
            { word: "SENSOR", clue: "Detects physical input.", hint: "Transducer device." },
            { word: "BATTERY", clue: "Stores energy.", hint: "Chemical power source." },
            { word: "SIGNAL", clue: "Information carrier.", hint: "Carrier wave." },
            { word: "ANTENNA", clue: "Radio wave sender.", hint: "Aerial." },
            { word: "WIRE", clue: "Electric conductor.", hint: "Cable." },
            { word: "KNOB", clue: "Control dial.", hint: "Potentiometer." },
            { word: "PLUG", clue: "Connection end.", hint: "Inlet." },
            { word: "PORT", clue: "Connection hole.", hint: "Jack." },
            { word: "WAVE", clue: "Energy pattern.", hint: "Sine or Square." },
            { word: "PHASE", clue: "Wave timing.", hint: "Shift." },
            { word: "TRANS", clue: "Signal switch.", hint: "Transistor." },
            { word: "GATE", clue: "Logic unit.", hint: "AND OR NOT." },
            { word: "FLIP", clue: "Memory cell.", hint: "Flip-flop." },
            { word: "REG", clue: "Storage unit.", hint: "Register." },
            { word: "CPU", clue: "Main processor.", hint: "Control unit." },
            { word: "RAM", clue: "Working memory.", hint: "Random access." },
            { word: "ROM", clue: "Fixed memory.", hint: "Read only." },
            { word: "USB", clue: "Serial port.", hint: "Bus." },
            { word: "LED", clue: "Light sender.", hint: "Lamp." },
            { word: "LCD", clue: "Display tech.", hint: "Liquid crystal." },
            { word: "CORE", clue: "Center part.", hint: "Main logic." },
            { word: "AMP", clue: "Power booster.", hint: "Amplifier." },
            { word: "OPAMP", clue: "Math IC.", hint: "Operational." },
            { word: "BIT", clue: "Digital digit.", hint: "0 or 1." },
            { word: "BYTE", clue: "8 digital digits.", hint: "Set of bits." },
            { word: "MODEM", clue: "Network talker.", hint: "Dialer." },
            { word: "FIBER", clue: "Light wire.", hint: "Optical cable." },
            { word: "Laser", clue: "Strong light beam.", hint: "Laser." },
            { word: "Solar", clue: "Sun energy.", hint: "Sun power." },
            { word: "Radio", clue: "Wireless signal.", hint: "Hertz." },
            { word: "Sonic", clue: "Sound signal.", hint: "Audio." },
            { word: "Clock", clue: "Timing signal.", hint: "Pulse." },
            { word: "Bus", clue: "Data path.", hint: "Transit." },
            { word: "Pipe", clue: "Data line.", hint: "Channel." },
            { word: "Fuse", clue: "Safety break.", hint: "Protector." },
            { word: "Relay", clue: "Magnet switch.", hint: "Coil." },
            { word: "Motor", clue: "Turning power.", hint: "Engine." },
            { word: "Fan", clue: "Cooling unit.", hint: "Blower." },
            { word: "Sink", clue: "Heat remover.", hint: "Heat sink." },
            { word: "Path", clue: "Trace on board.", hint: "Track." },
            { word: "Sold", clue: "Metal glue.", hint: "Solder." },
            { word: "Flux", clue: "Solder helper.", hint: "Paste." },
            { word: "Vias", clue: "Board holes.", hint: "Through holes." },
            { word: "Hole", clue: "Board mount.", hint: "Mount." }
        ],
        "mech": [
            { word: "FORCE", clue: "Push or pull.", hint: "Newton's Second Law." },
            { word: "MOTION", clue: "Moving state.", hint: "Kinematics concept." },
            { word: "ENERGY", clue: "Ability to do work.", hint: "Measured in Joules." },
            { word: "ENGINE", clue: "Converts heat to work.", hint: "IC or Steam." },
            { word: "TORQUE", clue: "Twisting force.", hint: "Moment of a force." },
            { word: "GEAR", clue: "Toothed wheel.", hint: "Power transmission." },
            { word: "LEVER", clue: "Rigid bar for lifting.", hint: "Simple machine." },
            { word: "PISTON", clue: "Moving cylinder part.", hint: "Found in engines." },
            { word: "METAL", clue: "Hard shiny material.", hint: "Steel or Iron." },
            { word: "HEAT", clue: "Form of energy.", hint: "Thermal." },
            { word: "WORK", clue: "Force times distance.", hint: "Physics term." },
            { word: "WELD", clue: "Join metals.", hint: "Stick or TIG." },
            { word: "LATHE", clue: "Turning machine.", hint: "Workshop tool." },
            { word: "MILL", clue: "Cutting machine.", hint: "VMC or CNC." },
            { word: "DRILL", clue: "Boring machine.", hint: "Hole maker." },
            { word: "STEEL", clue: "Iron and carbon.", hint: "Alloy." },
            { word: "BOLT", clue: "Threaded fastener.", hint: "Screw." },
            { word: "NUT", clue: "Bolts mate.", hint: "Hexagon item." },
            { word: "WASH", clue: "Load spreader.", hint: "Flat ring." },
            { word: "TOOL", clue: "Device for work.", hint: "Instrument." },
            { word: "AXIS", clue: "Line of rotation.", hint: "Center line." },
            { word: "BEAR", clue: "Supports a shaft.", hint: "Bearing." },
            { word: "CAM", clue: "Sliding part.", hint: "Follower mate." },
            { word: "LINK", clue: "Join parts.", hint: "Mechanism unit." },
            { word: "CRANK", clue: "Rotation part.", hint: "Shaft mate." },
            { word: "CYL", clue: "Engine chamber.", hint: "Cylinder." },
            { word: "FUEL", clue: "Energy source.", hint: "Gas or Diesel." },
            { word: "TANK", clue: "Storage box.", hint: "Container." },
            { word: "PUMP", clue: "Fluid mover.", hint: "Suction device." },
            { word: "VALVE", clue: "Fluid controller.", hint: "Flow switch." },
            { word: "PIPE", clue: "Fluid path.", hint: "Tube." },
            { word: "HOSE", clue: "Bendable pipe.", hint: "Rubber tube." },
            { word: "BELT", clue: "Power trasmitter.", hint: "Pulley mate." },
            { word: "ROPE", clue: "Lifting cord.", hint: "Cable." },
            { word: "TIRE", clue: "Wheel part.", hint: "Rubber ring." },
            { word: "HUB", clue: "Center of wheel.", hint: "Core." },
            { word: "RAK", clue: "Linear gear.", hint: "Pinion mate." },
            { word: "FAN", clue: "Air mover.", hint: "Cooling blade." },
            { word: "DRUM", clue: "Brake part.", hint: "Cylinder shape." },
            { word: "DISC", clue: "Brake plate.", hint: "Flat circle." },
            { word: "COIL", clue: "Spring shape.", hint: "Spiral." },
            { word: "DAM", clue: "Shock absorber.", hint: "Damper." },
            { word: "SHAF", clue: "Turning bar.", hint: "Shaft." },
            { word: "KEY", clue: "Shaft fastener.", hint: "Lock item." },
            { word: "PIN", clue: "Safety connector.", hint: "Cotter or Split." },
            { word: "RIVET", clue: "Fixed fastener.", hint: "Joiner." },
            { word: "IRON", clue: "Base metal.", hint: "FE element." },
            { word: "CAST", clue: "Molding metal.", hint: "Foundry work." },
            { word: "DIE", clue: "Metal shaper.", hint: "Press tool." },
            { word: "JIG", clue: "Holding device.", hint: "Fixture." }
        ],
        "ce": [
            { word: "BRIDGE", clue: "Structure over gap.", hint: "Arch, Beam, or Cable." },
            { word: "CEMENT", clue: "Binding material.", hint: "Component of concrete." },
            { word: "SURVEY", clue: "Mapping land.", hint: "Theodolite work." },
            { word: "STRESS", clue: "Force on area.", hint: "Pa or N/m2." },
            { word: "COLUMN", clue: "Vertical support.", hint: "Compressive member." },
            { word: "STRUCT", clue: "Building frame.", hint: "Load-bearing skeleton." },
            { word: "DAM", clue: "Barrier for water.", hint: "Hydroelectric source." },
            { word: "SOIL", clue: "Earth material.", hint: "Geotechnical study." },
            { word: "ROAD", clue: "Vehicle path.", hint: "Highway." },
            { word: "BRICK", clue: "Wall unit.", hint: "Clay block." },
            { word: "SAND", clue: "Mix component.", hint: "Fine material." },
            { word: "ROCK", clue: "Large stone.", hint: "Hard earth." },
            { word: "PIPE", clue: "Water path.", hint: "Tube." },
            { word: "TILE", clue: "Floor unit.", hint: "Slate or Clay." },
            { word: "SLAB", clue: "Roof/Floor flat.", hint: "Concrete plate." },
            { word: "BEAM", clue: "Horizontal part.", hint: "Load carrier." },
            { word: "WALL", clue: "Room side.", hint: "Partiton." },
            { word: "ROOF", clue: "Building top.", hint: "Cover." },
            { word: "DOOR", clue: "Entry way.", hint: "Gate." },
            { word: "GATE", clue: "Outer entry.", hint: "Dam part." },
            { word: "STAIB", clue: "Level joiner.", hint: "Stairs." },
            { word: "LIME", clue: "Old binder.", hint: "White powder." },
            { word: "GRAV", clue: "Coarse stone.", hint: "Gravel." },
            { word: "FILL", clue: "Earth moving.", hint: "Dirt." },
            { word: "ARCH", clue: "Curved opening.", hint: "Old bridge style." },
            { word: "CONC", clue: "Hard mix.", hint: "Concrete." },
            { word: "STEEL", clue: "Strong metal.", hint: "TMT bar." },
            { word: "WOOD", clue: "Tree material.", hint: "Timber." },
            { word: "LEVEL", clue: "Equal height.", hint: "Flat." },
            { word: "SLOPE", clue: "Side angle.", hint: "Camber." },
            { word: "MAPS", clue: "Area layout.", hint: "Plan." },
            { word: "PLAN", clue: "Site layout.", hint: "Blueprints." },
            { word: "DRAW", clue: "Design work.", hint: "Drafting." },
            { word: "TOWN", clue: "Small city.", hint: "Urban area." },
            { word: "CITY", clue: "Large town.", hint: "Mega area." },
            { word: "PARK", clue: "Green space.", hint: "Garden." },
            { word: "WELL", clue: "Water hole.", hint: "Bore." },
            { word: "RAIN", clue: "Water source.", hint: "Storm." },
            { word: "FLOW", clue: "River speed.", hint: "Stream." },
            { word: "TANK", clue: "Water store.", hint: "Sump." },
            { word: "PIER", clue: "Bridge leg.", hint: "Base." },
            { word: "BASE", clue: "Bottom part.", hint: "Footing." },
            { word: "FOOT", clue: "Wall base.", hint: "Foundation." },
            { word: "PILE", clue: "Deep leg.", hint: "Foundation type." },
            { word: "LOAD", clue: "Weight on part.", hint: "Force." },
            { word: "WIND", clue: "Air force.", hint: "Breeze." },
            { word: "Pa", clue: "Stress unit.", hint: "Pascal." },
            { word: "Bar", clue: "Steel bar.", hint: "Rebar." },
            { word: "Mesh", clue: "Grid of wires.", hint: "Netting." },
            { word: "Form", clue: "Concrete mold.", hint: "Shuttering." }
        ],
        "csM": [
            { word: "PYTHON", clue: "AI coding language.", hint: "Primary language for ML." },
            { word: "NEURAL", clue: "Brain-like network.", hint: "Deep Learning base." },
            { word: "DATA", clue: "Set of information.", hint: "Nourishment for AI." },
            { word: "LEARN", clue: "Improve from data.", hint: "The 'L' in ML." },
            { word: "MODEL", clue: "AI representation.", hint: "Result of training." },
            { word: "LAYER", clue: "Part of a network.", hint: "Input, Hidden, Output." },
            { word: "WEIGHT", clue: "Signal strength.", hint: "Adjusted during training." },
            { word: "TRAIN", clue: "Teach an AI.", hint: "Processing datasets." },
            { word: "BIAS", clue: "Shift in data.", hint: "Math offset." },
            { word: "STAT", clue: "Study of data.", hint: "Short for Statistics." },
            { word: "PROB", clue: "Likelihood of event.", hint: "Short for Probability." },
            { word: "MEAN", clue: "Average value.", hint: "Sum/Count." },
            { word: "MATH", clue: "Foundation of AI.", hint: "Mathematics." },
            { word: "INPUT", clue: "Feeding the bot.", hint: "Features." },
            { word: "LABEL", clue: "Answer in data.", hint: "Target." },
            { word: "TEST", clue: "Check AI accuracy.", hint: "Validation set." },
            { word: "ROBOT", clue: "Mechanical AI.", hint: "Bot." },
            { word: "CHAT", clue: "Conversational bot.", hint: "NLP use." },
            { word: "IMAGE", clue: "AI vision input.", hint: "Pixels." },
            { word: "VOICE", clue: "Audio AI input.", hint: "Speech." },
            { word: "SMART", clue: "AI attribute.", hint: "Intelligent." },
            { word: "FAST", clue: "GPU advantage.", hint: "Speed." },
            { word: "CLOUD", clue: "AI hosting.", hint: "Remote server." },
            { word: "SEARCH", clue: "Find in data.", hint: "Query." },
            { word: "SOLVE", clue: "Hacker's goal.", hint: "Solution." },
            { word: "GRID", clue: "Data layout.", hint: "Matrix." },
            { word: "NODE", clue: "Connection point.", hint: "Graph part." },
            { word: "LINK", clue: "Connect nodes.", hint: "Edge." },
            { word: "GRAPH", clue: "Set of nodes.", hint: "Data structure." },
            { word: "TREE", clue: "Hierarchical bot.", hint: "Decision tree." },
            { word: "CLUSTER", clue: "Group similar data.", hint: "K-Means." },
            { word: "NORMAL", clue: "Bell curve.", hint: "Distribution." },
            { word: "VECTOR", clue: "List of numbers.", hint: "Array." },
            { word: "SCALAR", clue: "Single number.", hint: "Magnitude." },
            { word: "MATRIX", clue: "Array of arrays.", hint: "2D Grid." },
            { word: "CODER", clue: "AI builder.", hint: "Programmer." },
            { word: "FUTURE", clue: "Impact of AI.", hint: "Next gen." },
            { word: "MINING", clue: "Extract patterns.", hint: "Data mining." },
            { word: "BIG", clue: "Large data scale.", hint: "Big Data." },
            { word: "APPS", clue: "Mobile AI use.", hint: "Applications." },
            { word: "GAME", clue: "AI opponents.", hint: "Play mode." },
            { word: "BRAIN", clue: "Human net model.", hint: "Origin of AI." },
            { word: "VISION", clue: "AI sight tech.", hint: "CV." },
            { word: "AUTO", clue: "Self-running AI.", hint: "Automatic." },
            { word: "DRIVE", clue: "Self-driving cars.", hint: "Tesla tech." },
            { word: "ALGO", clue: "Heart of ML.", hint: "Algorithm." },
            { word: "RANDOM", clue: "Stochastic process.", hint: "Not fixed." },
            { word: "SEED", clue: "Random start.", hint: "Fixed start." },
            { word: "SENSE", clue: "Bot perception.", hint: "Sensors." },
            { word: "LIMIT", clue: "Math boundary.", hint: "Threshold." }
        ],
        "csd": [
            { word: "DESIGN", clue: "User experience plan.", hint: "UX." },
            { word: "LAYOUT", clue: "Visual arrangement.", hint: "Structure." },
            { word: "COLOR", clue: "Visual property.", hint: "Hue." },
            { word: "WEBSITE", clue: "Online page set.", hint: "URL site." },
            { word: "INTERFACE", clue: "How users interact.", hint: "UI." },
            { word: "BUTTON", clue: "Clickable item.", hint: "Control." },
            { word: "GRID", clue: "Alignment system.", hint: "Columns." },
            { word: "FONT", clue: "Text style.", hint: "Typeface." },
            { word: "STYLE", clue: "CSS purpose.", hint: "Look." },
            { word: "LOGO", clue: "Brand icon.", hint: "Symbol." },
            { word: "WEB", clue: "Online space.", hint: "Net." },
            { word: "UX", clue: "User Experience.", hint: "Feel." },
            { word: "UI", clue: "User Interface.", hint: "Look." },
            { word: "FRAME", clue: "Box around content.", hint: "Border." },
            { word: "ICON", clue: "Small image.", hint: "Glyph." },
            { word: "SHAPE", clue: "Square or Circle.", hint: "Form." },
            { word: "TEXT", clue: "Written words.", hint: "Content." },
            { word: "IMAGE", clue: "Visual file.", hint: "Photo." },
            { word: "VIBE", clue: "Design feel.", hint: "Atmosphere." },
            { word: "DARK", clue: "Night mode theme.", hint: "Not light." },
            { word: "LINK", clue: "Clickable path.", hint: "Anchor." },
            { word: "PAGE", clue: "Single screen.", hint: "Sheet." },
            { word: "SASS", clue: "Better CSS.", hint: "Nested styles." },
            { word: "FLEX", clue: "Box layout tool.", hint: "Flexbox." },
            { word: "WIDTH", clue: "Horizontal size.", hint: "Size X." },
            { word: "HEIGHT", clue: "Vertical size.", hint: "Size Y." },
            { word: "MARGIN", clue: "Outer space.", hint: "Gap." },
            { word: "BORDER", clue: "Edge line.", hint: "Outline." },
            { word: "SHADOW", clue: "Depth effect.", hint: "Drop effect." },
            { word: "ROUND", clue: "Corner style.", hint: "Radius." },
            { word: "BOLD", clue: "Thick text.", hint: "Weight." },
            { word: "LIGHT", clue: "Thin text.", hint: "Weight." },
            { word: "SCALE", clue: "Size change.", hint: "Ratio." },
            { word: "HOVER", clue: "Mouse over event.", hint: "State." },
            { word: "CLICK", clue: "Mouse press event.", hint: "Action." },
            { word: "SEARCH", clue: "Find tool.", hint: "Input." },
            { word: "HEADER", clue: "Top section.", hint: "Navbar area." },
            { word: "FOOTER", clue: "Bottom section.", hint: "Base area." },
            { word: "MENU", clue: "List of links.", hint: "Nav." },
            { word: "TAB", clue: "Browser window.", hint: "Panel." },
            { word: "CODE", clue: "Source text.", hint: "Script." },
            { word: "VUE", clue: "JS Framework.", hint: "Not React." },
            { word: "NEXT", clue: "React Framework.", hint: "SEO ready." },
            { word: "ANIM", clue: "Motion design.", hint: "Animation." },
            { word: "EASE", clue: "Transition timing.", hint: "Smooth." },
            { word: "SLOW", clue: "Low speed.", hint: "Not fast." },
            { word: "FAST", clue: "High speed.", hint: "Quick." },
            { word: "PIXEL", clue: "Smallest dot.", hint: "PX." },
            { word: "REMS", clue: "Relative size unit.", hint: "Base 16px." },
            { word: "EM", clue: "Font size unit.", hint: "Relative." }
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
            { word: "FIREWALL", hint: "Prevents unauthorized network access." },
            { word: "BROWSER", hint: "Application to access the web." },
            { word: "SERVER", hint: "Computer providing resources." },
            { word: "DATABASE", hint: "Structured set of data." },
            { word: "INTERNET", hint: "Global network of computers." },
            { word: "PROTOCOL", hint: "Rules for data exchange." },
            { word: "ETHERNET", hint: "Standard for local networks." },
            { word: "MEMORIES", hint: "Devices to store data." },
            { word: "KEYBOARD", hint: "Primary input device." },
            { word: "SOFTWARE", hint: "Instruction sets for hardware." },
            { word: "INTERFACE", hint: "Shared boundary of components." },
            { word: "PROCESSOR", hint: "Unit that executes instructions." },
            { word: "PROGRAM", hint: "Set of instructions for a task." },
            { word: "TERMINAL", hint: "Text-based user interface." },
            { word: "VERSION", hint: "Specific state of software." },
            { word: "SECURITY", hint: "System protection measures." },
            { word: "BACKUP", hint: "Copy of files for safety." },
            { word: "UPLOAD", hint: "Sending data to a server." },
            { word: "DOWNLOAD", hint: "Receiving data from a server." },
            { word: "ENCRYPT", hint: "Converting data to secret code." },
            { word: "DECRYPT", hint: "Converting code back to data." },
            { word: "BINARY", hint: "Numbered system with two digits." },
            { word: "HEXADEC", hint: "Base-16 number system." },
            { word: "NETWORK", hint: "Connected set of computers." },
            { word: "ROUTER", hint: "Directs data packets on a net." },
            { word: "SWITCH", hint: "Connects devices in a network." },
            { word: "WEBSITE", hint: "Collection of related web pages." },
            { word: "HTML5", hint: "Latest web structure standard." },
            { word: "PYTHON", hint: "General purpose coding language." },
            { word: "JAVA", hint: "Class-based OOP language." },
            { word: "JAVASCRIPT", hint: "Language for web interactivity." },
            { word: "WINDOWS", hint: "Common OS by Microsoft." },
            { word: "LINUX", hint: "Open source OS kernel." },
            { word: "MONITOR", hint: "Visual output device." },
            { word: "STORAGE", hint: "Place for long term data." },
            { word: "MODULE", hint: "Self-contained code component." },
            { word: "OBJECT", hint: "OOP data structure." },
            { word: "LIBRARY", hint: "Pre-written code collection." },
            { word: "FRAMEWORK", hint: "Platform for building apps." },
            { word: "SYNTAX", hint: "Grammar of a coding language." },
            { word: "NULLV", hint: "Value representing nothing." },
            { word: "POINTER", hint: "Variable holding memory address." },
            { word: "BOOLEAN", hint: "Data type with two values." },
            { word: "INTEGER", hint: "Whole number data type." }
        ],
        "ece": [
            { word: "DIODE", hint: "Allows current in one way." },
            { word: "RESISTOR", hint: "Limits electric current." },
            { word: "VOLTAGE", hint: "Electric potential difference." },
            { word: "CURRENT", hint: "Flow of electric charge." },
            { word: "CAPACITOR", hint: "Stores electrical energy." },
            { word: "INDUCTOR", hint: "Stores energy in a magnetic field." },
            { word: "SIGNAL", hint: "Information carrier in electronics." },
            { word: "FREQUENCY", hint: "Number of cycles per second." },
            { word: "AMPLIFIER", hint: "Increases the power of a signal." },
            { word: "MODULATOR", hint: "Varies a carrier wave property." },
            { word: "ANTENNA", hint: "Transmits/receives radio waves." },
            { word: "TRANSISTOR", hint: "Switches or amplifies signals." },
            { word: "RECTIFIER", hint: "Converts AC to DC current." },
            { word: "INVERTER", hint: "Converts DC to AC current." },
            { word: "OSCILLATOR", hint: "Produces a periodic waveform." },
            { word: "FILTER", hint: "Removes unwanted frequencies." },
            { word: "BANDWIDTH", hint: "Range of signal frequencies." },
            { word: "IMPEDANCE", hint: "Total resistance to AC flow." },
            { word: "REACTANCE", hint: "Opposition to AC by L or C." },
            { word: "RESONANCE", hint: "Circuit's natural frequency." },
            { word: "CONDUCTOR", hint: "Material allowing easy flow." },
            { word: "INSULATOR", hint: "Material resisting flow." },
            { word: "SEMICOND", hint: "Foundation of modern ICs." },
            { word: "JUNCTION", hint: "Connection of P and N types." },
            { word: "EMITTER", hint: "Transistor part that injects." },
            { word: "COLLECTOR", hint: "Transistor part that gathers." },
            { word: "BASEUNIT", hint: "Control terminal of BJT." },
            { word: "GATEUNIT", hint: "Control terminal of MOSFET." },
            { word: "SOURCE", hint: "Positive terminal of FET." },
            { word: "DRAIN", hint: "Output terminal of FET." },
            { word: "VALENCE", hint: "Outer electron shell." },
            { word: "DOPING", hint: "Adding impurities to crystal." },
            { word: "SILICON", hint: "Main semiconductor element." },
            { word: "GERMAN", hint: "Early semiconductor element." },
            { word: "LEDLITE", hint: "Light emitting diode." },
            { word: "PHOTOD", hint: "Light sensing diode." },
            { word: "ZENER", hint: "Voltage regulating diode." },
            { word: "VARACTOR", hint: "Tuning capacitor diode." },
            { word: "THYRIST", hint: "High power switch device." },
            { word: "TRIAC", hint: "AC switching component." },
            { word: "DIAC", hint: "Triggering device for Triac." },
            { word: "OPTOIS", hint: "Optical signal isolator." },
            { word: "CIRCUIT", hint: "Closed loop for current." },
            { word: "NETWORK", hint: "Interconnected components." },
            { word: "CHIPSET", hint: "Collection of logic chips." },
            { word: "MICRO", hint: "Small scale electronics." },
            { word: "NANO", hint: "Atomic scale electronics." },
            { word: "LOGIC", hint: "Boolean math hardware." },
            { word: "BINARY", hint: "Digital 0 and 1 base." },
            { word: "PULSE", hint: "Brief signal burst." }
        ],
        "mech": [
            { word: "FRICTION", hint: "Force resisting motion." },
            { word: "VELOCITY", hint: "Speed with direction." },
            { word: "MOMENTUM", hint: "Mass times velocity." },
            { word: "INERTIA", hint: "Resistance to change in motion." },
            { word: "GRAVITY", hint: "Force pulling items to earth." },
            { word: "SSTRESS", hint: "Internal resisting force." },
            { word: "SSTRAIN", hint: "Deformation per unit length." },
            { word: "WORKENG", hint: "Energy transfer by force." },
            { word: "POWERU", hint: "Rate of doing work." },
            { word: "TORQUE", hint: "Turning or twisting force." },
            { word: "DENSITY", hint: "Mass per unit volume." },
            { word: "VOLUME", hint: "Space occupied by matter." },
            { word: "STATICS", hint: "Physics of bodies at rest." },
            { word: "DYNAMICS", hint: "Physics of bodies in motion." },
            { word: "KINETIC", hint: "Energy of motion." },
            { word: "POTENT", hint: "Stored energy of position." },
            { word: "ELASTIC", hint: "Materials that bounce back." },
            { word: "PLASTIC", hint: "Materials that stay deformed." },
            { word: "BRITTLE", hint: "Materials that snap easily." },
            { word: "DUCTILE", hint: "Materials that stretch well." },
            { word: "Hardness", hint: "Resistance to scratching." },
            { word: "Strength", hint: "Load carrying capacity." },
            { word: "Pressure", hint: "Force per unit area." },
            { word: "Viscos", hint: "Fluid thickness or drag." },
            { word: "Thermal", hint: "Relating to heat energy." },
            { word: "Conduct", hint: "Heat transfer by touch." },
            { word: "Convect", hint: "Heat transfer by fluid flow." },
            { word: "Radiate", hint: "Heat transfer by waves." },
            { word: "Combust", hint: "Engine burning process." },
            { word: "Piston", hint: "Moving engine block." },
            { word: "Turbine", hint: "Spinning fluid engine." },
            { word: "Flywheel", hint: "Energy storage wheel." },
            { word: "Governor", hint: "Speed regulating device." },
            { word: "Bearing", hint: "Shaft support device." },
            { word: "Coupling", hint: "Shaft connecting device." },
            { word: "Clutch", hint: "Shaft engaging device." },
            { word: "Gearbox", hint: "Speed changing assembly." },
            { word: "Differential", hint: "Wheel speed balancer." },
            { word: "Brakes", hint: "Speed stopping device." },
            { word: "Engine", hint: "Heat to work converter." },
            { word: "Boiler", hint: "Steam making vessel." },
            { word: "Machine", hint: "Mechanical work device." },
            { word: "Mechanism", hint: "Linked set of parts." },
            { word: "Structure", hint: "Static load assembly." },
            { word: "Chassis", hint: "Vehicle frame base." },
            { word: "Suspense", hint: "Shock control system." },
            { word: "Linkage", hint: "Bar based assembly." },
            { word: "Valve", hint: "Fluid control gate." },
            { word: "Exhaust", hint: "Waste gas outlet." },
            { word: "Intake", hint: "Air fuel inlet." }
        ],
        "ce": [
            { word: "BEAM", hint: "Horizontal structural member." },
            { word: "TENSION", hint: "Pulling force." },
            { word: "STATICS", hint: "Analysis of loads." },
            { word: "SURVEY", hint: "Measuring land positions." },
            { word: "CEMENT", hint: "Binding material." },
            { word: "STRESS", hint: "Force per unit area." },
            { word: "STRAIN", hint: "Deformation per unit length." },
            { word: "MOMENT", hint: "Turning effect of force." },
            { word: "SHEAR", hint: "Force acting parallel to area." },
            { word: "TORSION", hint: "Twisting action on beam." },
            { word: "COLUMN", hint: "Vertical load carrier." },
            { word: "STRUT", hint: "Compressive member in truss." },
            { word: "TIEBAR", hint: "Tensile member in truss." },
            { word: "FOUND", hint: "Base of a building." },
            { word: "SLAB", hint: "Flat concrete platform." },
            { word: "TRUSS", hint: "Triangle based frame." },
            { word: "ARCH", hint: "Curved portal structure." },
            { word: "FRAME", hint: "System of beams and cols." },
            { word: "PILE", hint: "Deep column foundation." },
            { word: "RAFT", hint: "Mat foundation for loads." },
            { word: "LEVEL", hint: "Finding height difference." },
            { word: "BENCH", hint: "Elevation reference point." },
            { word: "DATUM", hint: "Standard reference level." },
            { word: "CLAY", hint: "Fine grain sticky soil." },
            { word: "SAND", hint: "Coarse grain loose soil." },
            { word: "SILT", hint: "Medium grain earth soil." },
            { word: "PEAT", hint: "Organic spongy soil." },
            { word: "ROCK", hint: "Hard mountain base." },
            { word: "Dam", hint: "Water storage structure." },
            { word: "Canal", hint: "Artificial water path." },
            { word: "Sluice", hint: "Water flow regulator." },
            { word: "Weir", hint: "River level regulator." },
            { word: "Basin", hint: "Water catchment area." },
            { word: "Sewer", hint: "Waste water pipe." },
            { word: "Filter", hint: "Water cleaning tank." },
            { word: "Brick", hint: "Fired clay block unit." },
            { word: "Mason", hint: "Wall building art." },
            { word: "Mortar", hint: "Brick binder paste." },
            { word: "Finish", hint: "Wall surface coating." },
            { word: "Plumb", hint: "Exact vertical line." },
            { word: "Gauge", hint: "Measurement instrument." },
            { word: "Slope", hint: "Angle of road side." },
            { word: "Camber", hint: "Road surface curve." },
            { word: "Bridge", hint: "Span over obstacles." },
            { word: "Culvert", hint: "Pipe under the road." },
            { word: "Tunnel", hint: "Path under earth." },
            { word: "Gravel", hint: "Stone based base layer." },
            { word: "Tar", hint: "Black road binder." },
            { word: "Pave", hint: "Road surface layer." },
            { word: "Highway", hint: "Major transit road." }
        ],
        "csM": [
            { word: "PYTHON", hint: "Language used for AI." },
            { word: "ALGORITHM", hint: "Steps to solve a problem." },
            { word: "VARIABLE", hint: "Named storage location." },
            { word: "DATASET", hint: "Collection of records." },
            { word: "NEURON", hint: "Basic unit of a neural network." },
            { word: "CLASSIFY", hint: "Assigning data to categories." },
            { word: "PREDICT", hint: "Estimate future values." },
            { word: "TRAINING", hint: "Process of teaching AI." },
            { word: "ACCURACY", hint: "Measure of correct results." },
            { word: "BIGDATA", hint: "Extremely large datasets." },
            { word: "INSIGHT", hint: "Meaning drawn from data." },
            { word: "AVERAGE", hint: "The mean of values." },
            { word: "OUTLIER", hint: "Value far from the mean." },
            { word: "CLUSTER", hint: "Group of similar points." },
            { word: "FEATURE", hint: "Individual data property." },
            { word: "WEIGHTS", hint: "Strength of net connections." },
            { word: "TENSOR", hint: "Multi-dimensional array." },
            { word: "PROBABIL", hint: "Chance of occurrence." },
            { word: "SAMPLING", hint: "Taking a subset of data." },
            { word: "ENCODER", hint: "Compressing data traits." },
            { word: "DECODER", hint: "Expanding data back." },
            { word: "OPTIMIZE", hint: "Finding the best solution." },
            { word: "LEARNING", hint: "Improving with experience." },
            { word: "GRADIENT", hint: "Direction of sleepest ascent." },
            { word: "LOSSVAL", hint: "Measurement of error." },
            { word: "EPOCH", hint: "One full pass of data." },
            { word: "BATCHS", hint: "Subsets of training data." },
            { word: "RANDOM", hint: "Without a defined pattern." },
            { word: "SCLIB", hint: "Python Science Library." },
            { word: "NUMPY", hint: "Numerical Python library." },
            { word: "PANDAS", hint: "Data analysis library." },
            { word: "MATPLOT", hint: "Data plotting library." },
            { word: "KAFKA", hint: "Stream processing tool." },
            { word: "HADOOP", hint: "Distributed storage tool." },
            { word: "MONGODB", hint: "NoSQL database." },
            { word: "VISION", hint: "Computer sight field." },
            { word: "NATURAL", hint: "Human-like language." },
            { word: "SYNAPSE", hint: "Connection in brain net." },
            { word: "BOTS", hint: "Automated AI programs." },
            { word: "AGENTS", hint: "Intelligent AI entities." },
            { word: "SEARCH", hint: "Looking for patterns." },
            { word: "SORTING", hint: "Arranging data in order." },
            { word: "REPLICA", hint: "Copy of a database." },
            { word: "LATENCY", hint: "Delay in data processing." },
            { word: "BIASV", hint: "Measurement of deviation." },
            { word: "VARIANCE", hint: "Spread of data points." },
            { word: "ENTROPY", hint: "Measure of data disorder." },
            { word: "SIGNAL", hint: "Meaningful data part." },
            { word: "NOISE", hint: "Useless data parts." },
            { word: "DOMAIN", hint: "Field of AI application." }
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
            { word: "PROTOCOL", hint: "Rules for data exchange." },
            { word: "NORMAL", hint: "DBMS process of reducing redundancy." },
            { word: "BPLUS", hint: "Tree structure used in databases." },
            { word: "DEADLOCK", hint: "OS state where processes wait indefinitely." },
            { word: "PAGING", hint: "OS memory management scheme without contiguous allocation." },
            { word: "VIRTUAL", hint: "Memory that appears larger than physical RAM." },
            { word: "THREAD", hint: "Lightweight process in OS." },
            { word: "QUERY", hint: "Request for data from a database." },
            { word: "INDEX", hint: "Speeds up data retrieval in DBMS." },
            { word: "RELATION", hint: "A table in an RDBMS." },
            { word: "FOREIGN", hint: "Key linking two tables in DBMS." },
            { word: "CACHE", hint: "High-speed memory in CPU." },
            { word: "PIPELINE", hint: "Instruction overlap technique in COA." },
            { word: "OPCODE", hint: "Part of machine instruction telling what to do." },
            { word: "REGISTER", hint: "Fastest memory inside the CPU." },
            { word: "MUX", hint: "Multiplexer: many inputs, one output." },
            { word: "FLIPFLOP", hint: "Basic 1-bit memory element." },
            { word: "KERNEL", hint: "Core component of an Operating System." },
            { word: "SCHEDUL", hint: "OS component that decides process execution order." },
            { word: "MUTEX", hint: "Lock used to prevent race conditions." },
            { word: "COMMIT", hint: "DBMS command to save transaction." }
        ],
        "ece": [
            { word: "MUX", hint: "Selects between input signals." },
            { word: "OSCILLATE", hint: "Produces periodic signals." },
            { word: "AMPLIFY", hint: "Increase signal power." },
            { word: "MODULATE", hint: "Varying waveform properties." },
            { word: "TRANSISTOR", hint: "Switches electrical signals." },
            { word: "RECTIFY", hint: "Converting AC to DC." },
            { word: "DIODE", hint: "Allows current in one direction." },
            { word: "CAPACITOR", hint: "Stores electrical energy in a field." },
            { word: "INDUCTOR", hint: "Stores energy in a magnetic field." },
            { word: "FREQUENCY", hint: "Number of cycles per second." }
        ],
        "mech": [
            { word: "THERMO", hint: "Deals with heat and work." },
            { word: "KINE", hint: "Motion without forces." },
            { word: "ENTHALPY", hint: "Internal energy plus PV." },
            { word: "ENTROPY", hint: "System disorder measure." },
            { word: "VISCOSITY", hint: "Fluid resistance to flow." },
            { word: "DYNAMICS", hint: "Physics of bodies in motion." },
            { word: "STATICS", hint: "Physics of bodies at rest." },
            { word: "FRICTION", hint: "Force resisting motion." },
            { word: "TORQUE", hint: "Turning or twisting force." },
            { word: "ENGINE", hint: "Heat to work converter." }
        ],
        "ce": [
            { word: "THEO", hint: "Instrument for measuring angles." },
            { word: "CONTOUR", hint: "Outline of a shape." },
            { word: "SURVEY", hint: "Determining earth positions." },
            { word: "MECHANIC", hint: "Concerned with motions." },
            { word: "LEVEL", hint: "Finding elevation points." },
            { word: "TRUSS", hint: "Triangle-based support structure." },
            { word: "CEMENT", hint: "Material mapping or binding." },
            { word: "BEAM", hint: "Horizontal structural member." },
            { word: "COLUMN", hint: "Vertical load carrier." },
            { word: "STRESS", hint: "Force per unit area." }
        ],
        "csM": [
            { word: "POINTER", hint: "Variable holding memory address in C." },
            { word: "COMPILER", hint: "Translates C code to machine language." },
            { word: "MALLOC", hint: "Dynamic memory allocation function in C." },
            { word: "STRUCT", hint: "User-defined data type grouping variables in C." },
            { word: "CLASS", hint: "Blueprint for creating objects in Java." },
            { word: "OBJECT", hint: "Instance of a class in Java." },
            { word: "INHERIT", hint: "Acquiring properties of another class." },
            { word: "POLYMORPH", hint: "One interface, multiple methods." },
            { word: "ENCAPSULE", hint: "Binding data and methods together." },
            { word: "ABSTRACT", hint: "Hiding implementation details in OOP." },
            { word: "EXCEPTION", hint: "Runtime error handling mechanism." },
            { word: "JVM", hint: "Virtual Machine that executes Java bytecode." },
            { word: "PROCESS", hint: "Program in execution in OS." },
            { word: "KERNEL", hint: "Core component of an Operating System." },
            { word: "DEADLOCK", hint: "OS state where processes wait indefinitely." },
            { word: "PAGING", hint: "Memory management scheme without contiguous allocation." },
            { word: "MUTEX", hint: "Lock used to prevent race conditions in OS." },
            { word: "SCHEDULER", hint: "OS component deciding process execution order." },
            { word: "VIRTUAL", hint: "Memory appearing larger than physical RAM." },
            { word: "SEMAPHORE", hint: "Signaling mechanism for thread synchronization." }
        ],
        "csd": [
            { word: "POINTER", hint: "Variable holding memory address in C." },
            { word: "COMPILER", hint: "Translates C code to machine language." },
            { word: "MALLOC", hint: "Dynamic memory allocation function in C." },
            { word: "STRUCT", hint: "User-defined data type grouping variables in C." },
            { word: "CLASS", hint: "Blueprint for creating objects in Java." },
            { word: "OBJECT", hint: "Instance of a class in Java." },
            { word: "INHERIT", hint: "Acquiring properties of another class." },
            { word: "POLYMORPH", hint: "One interface, multiple methods." },
            { word: "ENCAPSULE", hint: "Binding data and methods together." },
            { word: "ABSTRACT", hint: "Hiding implementation details in OOP." },
            { word: "EXCEPTION", hint: "Runtime error handling mechanism." },
            { word: "JVM", hint: "Virtual Machine that executes Java bytecode." },
            { word: "PROCESS", hint: "Program in execution in OS." },
            { word: "KERNEL", hint: "Core component of an Operating System." },
            { word: "DEADLOCK", hint: "OS state where processes wait indefinitely." },
            { word: "PAGING", hint: "Memory management scheme without contiguous allocation." },
            { word: "MUTEX", hint: "Lock used to prevent race conditions in OS." },
            { word: "SCHEDULER", hint: "OS component deciding process execution order." },
            { word: "VIRTUAL", hint: "Memory appearing larger than physical RAM." },
            { word: "SEMAPHORE", hint: "Signaling mechanism for thread synchronization." }
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
        { id: 25, question: "What is a 'Dirty Read' in database transactions?", options: ["Reading data that is being deleted", "Reading uncommitted data from another transaction", "Reading data twice", "Reading corrupted data"], correct: 1, explanation: "A transaction reads data that might be rolled back." },
        { id: 26, question: "What is the purpose of the 'head' tag in HTML?", options: ["To display the title on the page", "To contain meta-information about the document", "To create a header for the body", "To define the main content"], correct: 1, explanation: "The head tag contains metadata and links to styles/scripts." },
        { id: 27, question: "In Python, which keyword is used to define a function?", options: ["func", "define", "def", "function"], correct: 2, explanation: "The 'def' keyword starts a function definition." },
        { id: 28, question: "What is the default port for HTTP?", options: ["21", "22", "80", "443"], correct: 2, explanation: "Port 80 is the standard for unencrypted web traffic." },
        { id: 29, question: "Which of the following is a valid CSS unit?", options: ["px", "kg", "ml", "km"], correct: 0, explanation: "px (pixels) is a common unit for screen dimensions." },
        { id: 30, question: "In Java, which keyword is used to inherit a class?", options: ["implements", "inherits", "extends", "super"], correct: 2, explanation: "The 'extends' keyword is used for class inheritance." },
        { id: 31, question: "What is a 'Primary Key' in a database?", options: ["A key to lock the server", "A unique identifier for a record", "A common password", "The first column in a table"], correct: 1, explanation: "Primary keys uniquely identify rows in a table." },
        { id: 32, question: "Which of these is a JavaScript framework?", options: ["Django", "Laravel", "React", "Flask"], correct: 2, explanation: "React is a popular library for building UIs in JS." },
        { id: 33, question: "What does 'CPU' stand for?", options: ["Computer Processing Unit", "Central Power Unit", "Central Processing Unit", "Control Process Unit"], correct: 2, explanation: "The CPU is the primary component that performs calculations." },
        { id: 34, question: "What is an 'Array'?", options: ["A single variable", "A list of elements of the same type", "A type of loop", "A database table"], correct: 1, explanation: "Arrays store multiple items in a single variable name." },
        { id: 35, question: "Which symbol is used for comments in Python?", options: ["//", "/*", "#", "--"], correct: 2, explanation: "Python uses the '#' symbol for single-line comments." },
        { id: 36, question: "What is the result of 10 % 3 in C?", options: ["30", "3", "1", "0"], correct: 2, explanation: "The modulo operator (%) returns the remainder of division." },
        { id: 37, question: "Which of these is a non-volatile memory?", options: ["RAM", "Cache", "ROM", "Register"], correct: 2, explanation: "ROM retains data even when power is turned off." },
        { id: 38, question: "What is the purpose of the 'git clone' command?", options: ["To delete a repository", "To copy a repository to your local machine", "To merge two branches", "To create a new file"], correct: 1, explanation: "Clone creates a local copy of a remote repository." },
        { id: 39, question: "What does 'RAM' stand for?", options: ["Read Access Memory", "Random Access Memory", "Rapid Access Memory", "Real Access Memory"], correct: 1, explanation: "RAM is high-speed temporary storage for the CPU." },
        { id: 40, question: "In CSS, how do you select an element with id 'nav'?", options: [".nav", "#nav", "*nav", "nav"], correct: 1, explanation: "The '#' symbol is used for id selectors in CSS." },
        { id: 41, question: "Which gate is called a 'Universal Gate'?", options: ["AND", "OR", "NAND", "NOT"], correct: 2, explanation: "NAND and NOR gates can implement any other logic function." },
        { id: 42, question: "What is 'Software'?", options: ["The monitor and keyboard", "A set of instructions for the computer", "The plastic case of the CPU", "The electrical cables"], correct: 1, explanation: "Software consists of programs and data that run on hardware." },
        { id: 43, question: "What is the binary equivalent of decimal 5?", options: ["100", "101", "110", "111"], correct: 1, explanation: "5 in decimal is 1*(2^2) + 0*(2^1) + 1*(2^0) = 101." },
        { id: 44, question: "Which command lists files in a Linux directory?", options: ["dir", "list", "ls", "cd"], correct: 2, explanation: "The 'ls' command lists the contents of the current directory." },
        { id: 45, question: "What is a 'Cloud' in computing terms?", options: ["A weather phenomenon", "A remote server hosted on the internet", "A type of smoke", "A physical hard drive on your desk"], correct: 1, explanation: "Cloud refers to servers accessed over the internet." },
        { id: 46, question: "In SQL, which command is used to fetch data?", options: ["GET", "FETCH", "SELECT", "READ"], correct: 2, explanation: "SELECT is used to query data from database tables." },
        { id: 47, question: "What is 'Recursion'?", options: ["A loop that never ends", "A function calling itself", "A type of variable", "A database join"], correct: 1, explanation: "Recursion is when a function calls itself to solve smaller sub-problems." },
        { id: 48, question: "Which language is primarily used for Android development?", options: ["Swift", "C#", "Kotlin", "PHP"], correct: 2, explanation: "Kotlin is the preferred language for modern Android apps." },
        { id: 49, question: "What does 'API' stand for?", options: ["Application Programming Interface", "Auto Program Integration", "App Point Interface", "Access Program Info"], correct: 0, explanation: "APIs allow different software systems to communicate." },
        { id: 50, question: "Which of these is an example of an Operating System?", options: ["Google Chrome", "Microsoft Word", "Windows 11", "Adobe Photoshop"], correct: 2, explanation: "Windows 11 is an OS that manages hardware and software." }
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
        { id: 125, question: "Which coupling is typically used in audio amplifiers?", options: ["Direct Coupling", "Transformer Coupling", "RC Coupling", "Impedance Coupling"], correct: 2, explanation: "Resistance-Capacitance (RC) coupling is common for audio frequency range." },
        { id: 126, question: "What does 'PCB' stand for?", options: ["Primary Circuit Board", "Printed Circuit Board", "Plastic Circuit Board", "Power Circuit Board"], correct: 1, explanation: "PCBs are used to mechanically support and electrically connect components." },
        { id: 127, question: "Which instrument is used to view electrical signals as waveforms?", options: ["Multimeter", "Ammeter", "Oscilloscope", "Wattmeter"], correct: 2, explanation: "An oscilloscope plots voltage over time." },
        { id: 128, question: "What is the purpose of an 'Optocoupler'?", options: ["To amplify light", "To electrically isolate two circuits using light", "To convert DC to AC", "To measure distance"], correct: 1, explanation: "Optocouplers prevent high voltages from damaging logic circuits." },
        { id: 129, question: "Which of these is a trivalent impurity used in P-type semiconductors?", options: ["Phosphorus", "Arsenic", "Antimony", "Boron"], correct: 3, explanation: "Boron has 3 valence electrons and creates 'holes'." },
        { id: 130, question: "What is the power dissipated by a 10 ohm resistor with 2 amps of current?", options: ["20W", "40W", "5W", "100W"], correct: 1, explanation: "P = I^2 * R = 2^2 * 10 = 40 Watts." },
        { id: 131, question: "Which layer of the OSI model does a Hub operate on?", options: ["Physical Layer", "Data Link Layer", "Network Layer", "Transport Layer"], correct: 0, explanation: "Hubs are simple Layer 1 devices that repeat signals." },
        { id: 132, question: "What is the ripple frequency of a full-wave rectifier with 50Hz input?", options: ["25Hz", "50Hz", "100Hz", "200Hz"], correct: 2, explanation: "Full-wave rectifiers double the input frequency in the output." },
        { id: 133, question: "Which logic gate is equivalent to a serial connection of switches?", options: ["OR", "AND", "NOT", "NAND"], correct: 1, explanation: "Both switches must be closed (1) for the light to turn on." },
        { id: 134, question: "What is the unit of Inductance?", options: ["Farad", "Henry", "Tesla", "Weber"], correct: 1, explanation: "Inductance is measured in Henrys (H)." },
        { id: 135, question: "Which device is used for measuring electric current?", options: ["Voltmeter", "Ammeter", "Ohmmeter", "Galvanometer"], correct: 1, explanation: "Ammeters measure current in Amperes." },
        { id: 136, question: "What does 'CMOS' stand for?", options: ["Common Metal Oxide Semiconductor", "Complementary Metal Oxide Semiconductor", "Closed Metal Oxide Semiconductor", "Central Metal Oxide Semiconductor"], correct: 1, explanation: "CMOS uses pairs of P-type and N-type MOSFETs." },
        { id: 137, question: "In a transformer, which part is used to transfer energy from primary to secondary?", options: ["The wires", "The magnetic core", "The battery", "The resistor"], correct: 1, explanation: "Transfer occurs via mutual induction through the core." },
        { id: 138, question: "What is the color code for a 1k ohm resistor with 5% tolerance?", options: ["Brown-Black-Red-Gold", "Red-Black-Orange-Silver", "Brown-Red-Black-Gold", "Orange-Orange-Brown-Gold"], correct: 0, explanation: "1 (Brown) 0 (Black) * 10^2 (Red) = 1000 ohms." },
        { id: 139, question: "Which component is used to block DC while allowing AC signals?", options: ["Inductor", "Resistor", "Capacitor", "Transistor"], correct: 2, explanation: "Capacitors have high impedance for low frequency (DC)." },
        { id: 140, question: "What is the gain of a voltage follower (buffer)?", options: ["Zero", "One", "Infinity", "Depends on resistors"], correct: 1, explanation: "Voltage followers have unity gain (output = input)." },
        { id: 141, question: "What does 'ADC' stand for?", options: ["Analog to Digital Converter", "Auto Data Controller", "Advanced Digital Compiler", "Amperage Direct Current"], correct: 0, explanation: "ADCs convert continuous signals to discrete values." },
        { id: 142, question: "Which flip-flop changes state on every clock pulse if inputs are High?", options: ["D", "RS", "JK (with J=K=1)", "T"], correct: 2, explanation: "JK flip-flops in toggle mode switch states on the clock." },
        { id: 143, question: "What is the unit of Magnetic Flux?", options: ["Tesla", "Weber", "Henry", "Lux"], correct: 1, explanation: "Weber (Wb) is the SI unit of magnetic flux." },
        { id: 144, question: "Which modulation is used in standard WiFi?", options: ["OOK", "BASK", "QAM", "Morse"], correct: 2, explanation: "Quadrature Amplitude Modulation is widely used in high-speed wireless." },
        { id: 145, question: "What is the 'knee voltage' of a Silicon diode?", options: ["0.3V", "0.7V", "1.1V", "5V"], correct: 1, explanation: "Silicon diodes start conducting significantly at approx 0.7V." },
        { id: 146, question: "Which theorem is used for power calculations in AC circuits?", options: ["Norton", "Thevenin", "Maximum Power Transfer Theorem", "Kirchhoff"], correct: 2, explanation: "It defines conditions for load impedance to receive max power." },
        { id: 147, question: "What is the purpose of a 'Pull-up' resistor?", options: ["To increase current", "To ensure a default High logic level", "To block noise", "To protect against surges"], correct: 1, explanation: "Pull-ups keep floating pins at a stable 1 state." },
        { id: 148, question: "Which IC timer is famous for generating delays and pulses?", options: ["IC 741", "IC 555", "IC 7805", "IC 8051"], correct: 1, explanation: "The 555 timer is a standard for timing circuits." },
        { id: 149, question: "What does 'DSP' stand for?", options: ["Data Signal Processor", "Digital Signal Processing", "Direct Signal Port", "Digital Store Power"], correct: 1, explanation: "DSP refers to algorithms that process signals as numbers." },
        { id: 150, question: "In a Bipolar Junction Transistor, what does 'Bipolar' refer to?", options: ["Two poles of a magnet", "Flow of both electrons and holes", "Having two terminals", "Having positive and negative power"], correct: 1, explanation: "BJTs use both types of charge carriers for current flow." }
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
        { id: 225, question: "Which vibration has a frequency equal to the natural frequency?", options: ["Forced", "Damped", "Resonance", "Random"], correct: 2, explanation: "Resonance causes large amplitudes and potential failure." },
        { id: 226, question: "What is the main task of a carburettor?", options: ["To ignite fuel", "To mix air and fuel in correct ratio", "To cool the engine", "To oil the piston"], correct: 1, explanation: "Carburettors atomize fuel and mix it with air." },
        { id: 227, question: "Which mechanical property allows a material to be drawn into wires?", options: ["Elasticity", "Malleability", "Ductility", "Hardness"], correct: 2, explanation: "Ductility is the ability to undergo tensile deformation." },
        { id: 228, question: "What is the function of a 'Universal Joint'?", options: ["To join two static bars", "To transmit power between intersecting shafts", "To stop a machine", "To lubricate gears"], correct: 1, explanation: "Universal joints allow torque transmission between non-aligned shafts." },
        { id: 229, question: "Which of these is a permanent joining process?", options: ["Bolting", "Welding", "Clamping", "Screwing"], correct: 1, explanation: "Welding merges the base metals permanently." },
        { id: 230, question: "What is the unit of Force?", options: ["Pascal", "Joule", "Newton", "Watt"], correct: 2, explanation: "Newton (N) is the SI unit of force." },
        { id: 231, question: "In a refrigerant cycle, where does the cooling effect occur?", options: ["Compressor", "Condenser", "Evaporator", "Expansion Valve"], correct: 2, explanation: "The evaporator absorbs heat from the surroundings." },
        { id: 232, question: "What is 'Backlash' in gears?", options: ["Gear noise", "The clearance between mating gear teeth", "Gear breakage", "High speed vibration"], correct: 1, explanation: "Backlash prevents interference and jamming." },
        { id: 233, question: "Which energy is stored in a compressed spring?", options: ["Kinetic", "Chemical", "Elastic Potential", "Thermal"], correct: 2, explanation: "Compression stores energy due to deformation." },
        { id: 234, question: "What does 'CAD' stand for?", options: ["Complex Aircraft Design", "Computer Aided Design", "Calculated Auto Design", "Central Analog Design"], correct: 1, explanation: "CAD is the use of computers to aid in creation/modification of designs." },
        { id: 235, question: "Which metal has the highest thermal conductivity?", options: ["Iron", "Lead", "Silver", "Steel"], correct: 2, explanation: "Silver is the best conductor of both heat and electricity." },
        { id: 236, question: "In fluid mechanics, what does a Venturimeter measure?", options: ["Pressure", "Density", "Discharge (Flow Rate)", "Velocity"], correct: 2, explanation: "Venturimeters measure the rate of flow in a pipe." },
        { id: 237, question: "What is the purpose of 'Annealing'?", options: ["To increase hardness", "To soften the metal and relieve stress", "To color the surface", "To increase weight"], correct: 1, explanation: "Annealing involves heating and slow cooling to refine structure." },
        { id: 238, question: "Which part of a lathe holds the cutting tool?", options: ["Chuck", "Tailstock", "Tool Post", "Headstock"], correct: 2, explanation: "The tool post provides the mount and feed for the tool." },
        { id: 239, question: "What is a 'Factor of Safety'?", options: ["Actual stress / Allowable stress", "Ultimate stress / Working stress", "Working stress * 2", "Total load / Area"], correct: 1, explanation: "FoS ensures a design can handle more than the expected load." },
        { id: 240, question: "Which law defines the principle of a hydraulic press?", options: ["Ohm's Law", "Hooke's Law", "Pascal's Law", "Newton's Third Law"], correct: 2, explanation: "Pascal's law states pressure in fluid is transmitted undiminished." },
        { id: 241, question: "What does a 'Pitot Tube' measure?", options: ["Flow rate", "Static pressure", "Stagnation (Dynamic) pressure", "Viscosity"], correct: 2, explanation: "Used to determine fluid flow velocity." },
        { id: 242, question: "Which linkage has 4 links and 4 turning pairs?", options: ["Slider Crank", "Four Bar Chain", "Double Crank", "Toggle Joint"], correct: 1, explanation: "The four-bar chain is the simplest movable linkage." },
        { id: 243, question: "What is the main constituent of Cast Iron?", options: ["Iron and Copper", "Iron and Carbon (2% to 4%)", "Iron and Aluminum", "Iron and Lead"], correct: 1, explanation: "CI has higher carbon content than steel." },
        { id: 244, question: "Which governor uses a spring to control the balls?", options: ["Watt", "Porter", "Hartnell", "Proell"], correct: 2, explanation: "Hartnell is a spring-loaded centrifugal governor." },
        { id: 245, question: "What is 'Viscosity'?", options: ["Mass per volume", "Fluid resistance to flow", "Surface tension", "Thermal expansion"], correct: 1, explanation: "Highly viscous fluids (like honey) flow slowly." },
        { id: 246, question: "Which engine cycle uses two constant volume and two adiabatic processes?", options: ["Diesel", "Dual", "Otto", "Rankine"], correct: 2, explanation: "This is the theoretical cycle for petrol engines." },
        { id: 247, question: "What is the function of a 'Jig'?", options: ["To hold the work", "To guide the tool and hold the work", "To sharpen the tool", "To measure the work"], correct: 1, explanation: "Jigs simplify mass production by guiding the cutter." },
        { id: 248, question: "Which gear is used to connect non-intersecting and non-parallel shafts?", options: ["Bevel", "Spur", "Worm", "Helical"], correct: 2, explanation: "Worm gears provide high reduction at 90 degrees." },
        { id: 249, question: "What is 'Fatigue' in materials?", options: ["Rusting", "Failure under repeated cycles of stress", "Stretching", "Overheating"], correct: 1, explanation: "Fatigue occurs at stress levels below yield strength." },
        { id: 250, question: "Which device converts reciprocating motion to rotary motion?", options: ["Piston", "Connecting Rod and Crankshaft", "Gears", "Flywheel"], correct: 1, explanation: "The slider-crank mechanism is the heart of an IC engine." }
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
        { id: 325, question: "What is the main contributor to global warming among construction materials?", options: ["Timber", "Glass", "Carbon emissions from Cement production", "Steel"], correct: 2, explanation: "Cement manufacturing is highly energy-intensive and releases CO2." },
        { id: 326, question: "Which property of soil determines its ability to allow water to pass through?", options: ["Porosity", "Permeability", "Plasticity", "Void Ratio"], correct: 1, explanation: "Permeability is crucial for drainage and foundation design." },
        { id: 327, question: "What is the objective of 'Seasoning' of timber?", options: ["To make it tasty", "To reduce moisture content", "To change its color", "To increase its weight"], correct: 1, explanation: "Seasoning prevents decay and improves strength/stability." },
        { id: 328, question: "In building construction, what is the 'Plinth'?", options: ["The roof top", "The portion of the building between ground and floor level", "A decorative window", "The interior ceiling"], correct: 1, explanation: "The plinth protects the building from dampness and insects." },
        { id: 329, question: "Which type of cement is used for underwater construction?", options: ["Rapid Hardening Cement", "Quick Setting Cement", "Low Heat Cement", "White Cement"], correct: 1, explanation: "Quick setting cement starts setting within minutes." },
        { id: 330, question: "What does 'GPS' stand for in surveying?", options: ["General Positioning System", "Global Positioning System", "Geological Point Survey", "Grid Positioning System"], correct: 1, explanation: "GPS uses satellites to determine precise locations on Earth." },
        { id: 331, question: "Which structural member is designed to resist bending?", options: ["Tie", "Strut", "Beam", "Column"], correct: 2, explanation: "Beams are horizontal members subject to transverse loads." },
        { id: 332, question: "What is 'Slenderness Ratio' of a column?", options: ["Weight / Height", "Effective length / Least radius of gyration", "Width / Thickness", "Total Load / Area"], correct: 1, explanation: "It determines whether a column fails by crushing or buckling." },
        { id: 333, question: "Which mapping is used for determining boundaries of fields/plots?", options: ["Topographic", "Hydrographic", "Cadastral", "City"], correct: 2, explanation: "Cadastral surveys define property ownership lines." },
        { id: 334, question: "What is the primary purpose of an 'Escalator' in a building?", options: ["To provide ventilation", "For vertical movement of people", "As a fire exit", "To support the roof"], correct: 1, explanation: "Escalators are moving stairs for mass transit." },
        { id: 335, question: "Which of these is a 'Tension Member'?", options: ["Column", "Pier", "Tie", "Strut"], correct: 2, explanation: "Ties are members in a truss that resist pulling forces." },
        { id: 336, question: "In water supply systems, what is 'Hardness' caused by?", options: ["Sand and Silt", "Bacteria", "Dissolved Calcium and Magnesium", "Lack of Oxygen"], correct: 2, explanation: "Hard water does not lather well with soap." },
        { id: 337, question: "What is the unit of 'Stress' in SI?", options: ["Newtons", "Joules", "Pascal (N/m2)", "Watts"], correct: 2, explanation: "Stress is force per unit area." },
        { id: 338, question: "Which brick bond is considered the strongest?", options: ["Stretcher Bond", "Header Bond", "English Bond", "Flemish Bond"], correct: 2, explanation: "English bond uses alternating courses of headers and stretchers." },
        { id: 339, question: "What is 'Camber' in road design?", options: ["Road curvature in plan", "Transverse slope for drainage", "The height of the road", "The thickness of the tar"], correct: 1, explanation: "Camber ensures water flows off the road surface." },
        { id: 340, question: "Which instrument is used to measure rainfall?", options: ["Thermometer", "Barometer", "Rain Gauge", "Anemometer"], correct: 2, explanation: "Rain gauges collect and measure liquid precipitation." },
        { id: 341, question: "What is 'Dampness' in buildings?", options: ["Presence of moisture in walls/floors", "A type of modern paint", "High temperature", "Good ventilation"], correct: 0, explanation: "Dampness leads to unhygienic conditions and structural decay." },
        { id: 342, question: "Which cement is used for massive structures like dams?", options: ["Rapid Hardening", "Low Heat Cement", "High Alumina Cement", "Colored Cement"], correct: 1, explanation: "Low heat cement prevents cracking from heat of hydration." },
        { id: 343, question: "In a truss, what are the joints called?", options: ["Links", "Nodes", "Brackets", "Poles"], correct: 1, explanation: "Nodes are the points where truss members meet." },
        { id: 344, question: "What is the standard height of a building story?", options: ["1 meter", "3 meters", "10 meters", "50 cm"], correct: 1, explanation: "Typical residential story height is around 9-10 feet (3m)." },
        { id: 345, question: "Which valve is used to remove air from pipes?", options: ["Gate Valve", "Air Release Valve", "Reflux Valve", "Scour Valve"], correct: 1, explanation: "Air pockets can block flow and cause hammer effects." },
        { id: 346, question: "What is 'Bearing Capacity' of soil?", options: ["Water holding capacity", "Maximum load soil can carry without failure", "Depth of soil", "Color of soil"], correct: 1, explanation: "Vital for designing safe foundations." },
        { id: 347, question: "Which survey is done to find objects under the sea?", options: ["Mine Survey", "Marine (Hydrographic) Survey", "Aerial Survey", "Railway Survey"], correct: 1, explanation: "Hydrography maps the water bottom and shorelines." },
        { id: 348, question: "What is the use of 'Planimeter' in Civil Engineering?", options: ["To measure volume", "To measure area of irregular shapes", "To measure height", "To measure angle"], correct: 1, explanation: "Used on maps to calculate land areas." },
        { id: 349, question: "Which building material has high compressive strength but no tensile strength?", options: ["Steel", "Wood", "Concrete (Plain)", "Aluminum"], correct: 2, explanation: "This is why steel is added to make Reinforced Concrete." },
        { id: 350, question: "What is 'Super Elevation' on a curve?", options: ["Extra height of a building", "Raising the outer edge of the road", "Increasing the road width", "Extra speed allowed"], correct: 1, explanation: "Used to counteract centrifugal force on vehicles." }
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
// Completely simple set of basic syntax-error questions per language
const L4_SIMPLE_POOL: Record<"C" | "Java" | "Python", CodeChallenge[]> = {
    "C": [
        { id: "c1", language: "C", title: "Missing Semicolon", brokenCode: "", initialCode: "#include <stdio.h>\nint main() {\n  int x = 5\n  printf(\"%d\", x);\n  return 0;\n}", solutionCode: "#include <stdio.h>\nint main() {\n  int x = 5;\n  printf(\"%d\", x);\n  return 0;\n}", expectedOutput: "5", errorHint: "Every statement in C must end with a semicolon (;)." },
        { id: "c2", language: "C", title: "Missing Brace", brokenCode: "", initialCode: "#include <stdio.h>\nint main() {\n  printf(\"Hello\");\n  return 0;\n", solutionCode: "#include <stdio.h>\nint main() {\n  printf(\"Hello\");\n  return 0;\n}", expectedOutput: "Hello", errorHint: "Functions must be closed with a closing brace (})." },
        { id: "c3", language: "C", title: "Missing Parenthesis", brokenCode: "", initialCode: "#include <stdio.h>\nint main() {\n  if x == 5 {\n    printf(\"Yes\");\n  }\n  return 0;\n}", solutionCode: "#include <stdio.h>\nint main() {\n  int x = 5;\n  if (x == 5) {\n    printf(\"Yes\");\n  }\n  return 0;\n}", expectedOutput: "Yes", errorHint: "if conditions must be enclosed in parentheses." },
        { id: "c4", language: "C", title: "Print Typo", brokenCode: "", initialCode: "#include <stdio.h>\nint main() {\n  print(\"Hello World\");\n  return 0;\n}", solutionCode: "#include <stdio.h>\nint main() {\n  printf(\"Hello World\");\n  return 0;\n}", expectedOutput: "Hello World", errorHint: "Standard print function in C is printf, not print." },
        { id: "c5", language: "C", title: "Missing Include", brokenCode: "", initialCode: "int main() {\n  printf(\"Hello\");\n  return 0;\n}", solutionCode: "#include <stdio.h>\nint main() {\n  printf(\"Hello\");\n  return 0;\n}", expectedOutput: "Hello", errorHint: "You need to include the standard input/output library." },
        { id: "c6", language: "C", title: "Wrong Return", brokenCode: "", initialCode: "#include <stdio.h>\nint main() {\n  printf(\"Done\");\n  return;\n}", solutionCode: "#include <stdio.h>\nint main() {\n  printf(\"Done\");\n  return 0;\n}", expectedOutput: "Done", errorHint: "int main() must return an integer value, usually 0." },
        { id: "c7", language: "C", title: "Wrong Format", brokenCode: "", initialCode: "#include <stdio.h>\nint main() {\n  float f = 1.5;\n  printf(\"%d\", f);\n  return 0;\n}", solutionCode: "#include <stdio.h>\nint main() {\n  float f = 1.5;\n  printf(\"%f\", f);\n  return 0;\n}", expectedOutput: "1.500000", errorHint: "Use %f to print floats, not %d." },
        { id: "c8", language: "C", title: "Main Typo", brokenCode: "", initialCode: "#include <stdio.h>\nint MIAN() {\n  printf(\"Start\");\n  return 0;\n}", solutionCode: "#include <stdio.h>\nint main() {\n  printf(\"Start\");\n  return 0;\n}", expectedOutput: "Start", errorHint: "The entry point in C must be named 'main'." },
        { id: "c9", language: "C", title: "Assignment vs Equality", brokenCode: "", initialCode: "#include <stdio.h>\nint main() {\n  int x = 0;\n  if(x = 10) printf(\"Ten\");\n  return 0;\n}", solutionCode: "#include <stdio.h>\nint main() {\n  int x = 10;\n  if(x == 10) printf(\"Ten\");\n  return 0;\n}", expectedOutput: "Ten", errorHint: "Use == for comparison, = is for assignment." },
        { id: "c10", language: "C", title: "Char Quotes", brokenCode: "", initialCode: "#include <stdio.h>\nint main() {\n  char c = \"A\";\n  printf(\"%c\", c);\n  return 0;\n}", solutionCode: "#include <stdio.h>\nint main() {\n  char c = 'A';\n  printf(\"%c\", c);\n  return 0;\n}", expectedOutput: "A", errorHint: "Single characters use single quotes ('A')." }
    ],

    "Java": [
        { id: "j1", language: "Java", title: "Missing Semicolon", brokenCode: "", initialCode: "public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"Hello\")\n  }\n}", solutionCode: "public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"Hello\");\n  }\n}", expectedOutput: "Hello\n", errorHint: "Java statements must end with a semicolon." },
        { id: "j2", language: "Java", title: "System Typo", brokenCode: "", initialCode: "public class Main {\n  public static void main(String[] args) {\n    system.out.println(\"Hi\");\n  }\n}", solutionCode: "public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"Hi\");\n  }\n}", expectedOutput: "Hi\n", errorHint: "System is a class and must be capitalized." },
        { id: "j3", language: "Java", title: "String Quotes", brokenCode: "", initialCode: "public class Main {\n  public static void main(String[] args) {\n    String s = 'Hello';\n    System.out.println(s);\n  }\n}", solutionCode: "public class Main {\n  public static void main(String[] args) {\n    String s = \"Hello\";\n    System.out.println(s);\n  }\n}", expectedOutput: "Hello\n", errorHint: "Strings must be enclosed in double quotes (\")." },
        { id: "j4", language: "Java", title: "Missing Args", brokenCode: "", initialCode: "public class Main {\n  public static void main() {\n    System.out.println(\"Start\");\n  }\n}", solutionCode: "public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"Start\");\n  }\n}", expectedOutput: "Start\n", errorHint: "main method must accept String[] args." },
        { id: "j5", language: "Java", title: "Print Typo", brokenCode: "", initialCode: "public class Main {\n  public static void main(String[] args) {\n    System.out.printline(\"Wow\");\n  }\n}", solutionCode: "public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"Wow\");\n  }\n}", expectedOutput: "Wow\n", errorHint: "The method is println, not printline." },
        { id: "j6", language: "Java", title: "Missing Brace", brokenCode: "", initialCode: "public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"End\");\n  }\n", solutionCode: "public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"End\");\n  }\n}", expectedOutput: "End\n", errorHint: "Missing a closing brace } for the class." },
        { id: "j7", language: "Java", title: "Main Signature", brokenCode: "", initialCode: "public class Main {\n  public void main(String[] args) {\n    System.out.println(\"Run\");\n  }\n}", solutionCode: "public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"Run\");\n  }\n}", expectedOutput: "Run\n", errorHint: "main method must be static." },
        { id: "j8", language: "Java", title: "Boolean Typo", brokenCode: "", initialCode: "public class Main {\n  public static void main(String[] args) {\n    bool x = true;\n    System.out.println(x);\n  }\n}", solutionCode: "public class Main {\n  public static void main(String[] args) {\n    boolean x = true;\n    System.out.println(x);\n  }\n}", expectedOutput: "true\n", errorHint: "The keyword in Java is boolean, not bool." },
        { id: "j9", language: "Java", title: "Double Equals", brokenCode: "", initialCode: "public class Main {\n  public static void main(String[] args) {\n    int x = 5;\n    if(x = 5) System.out.println(\"Five\");\n  }\n}", solutionCode: "public class Main {\n  public static void main(String[] args) {\n    int x = 5;\n    if(x == 5) System.out.println(\"Five\");\n  }\n}", expectedOutput: "Five\n", errorHint: "Use == for conditions, not =." },
        { id: "j10", language: "Java", title: "Array Syntax", brokenCode: "", initialCode: "public class Main {\n  public static void main(String[] args) {\n    int arr[] = (1, 2, 3);\n    System.out.println(arr[0]);\n  }\n}", solutionCode: "public class Main {\n  public static void main(String[] args) {\n    int arr[] = {1, 2, 3};\n    System.out.println(arr[0]);\n  }\n}", expectedOutput: "1\n", errorHint: "Array initializers use braces {}, not parentheses." }
    ],

    "Python": [
        { id: "p1", language: "Python", title: "Missing Colon", brokenCode: "", initialCode: "def greet()\n    print(\"Hello\")\n\ngreet()", solutionCode: "def greet():\n    print(\"Hello\")\n\ngreet()", expectedOutput: "Hello\n", errorHint: "Functions, ifs, and loops must end with a colon (:)." },
        { id: "p2", language: "Python", title: "Print Parens", brokenCode: "", initialCode: "print \"Hello World\"", solutionCode: "print(\"Hello World\")", expectedOutput: "Hello World\n", errorHint: "In Python 3, print is a function and requires parentheses()." },
        { id: "p3", language: "Python", title: "Indentation", brokenCode: "", initialCode: "if True:\nprint(\"Yes\")", solutionCode: "if True:\n    print(\"Yes\")", expectedOutput: "Yes\n", errorHint: "Python uses indentation (spaces) to define blocks." },
        { id: "p4", language: "Python", title: "String Quotes", brokenCode: "", initialCode: "print('Hello\")", solutionCode: "print(\"Hello\")", expectedOutput: "Hello\n", errorHint: "String quotes must match (either both ' or both \")." },
        { id: "p5", language: "Python", title: "Elif Typo", brokenCode: "", initialCode: "x = 5\nif x==1:\n    print(\"one\")\nelse if x==5:\n    print(\"five\")", solutionCode: "x = 5\nif x==1:\n    print(\"one\")\nelif x==5:\n    print(\"five\")", expectedOutput: "five\n", errorHint: "Python uses 'elif' instead of 'else if'." },
        { id: "p6", language: "Python", title: "True Cap", brokenCode: "", initialCode: "x = true\nprint(x)", solutionCode: "x = True\nprint(x)", expectedOutput: "True\n", errorHint: "Booleans must be capitalized: True or False." },
        { id: "p7", language: "Python", title: "Equality", brokenCode: "", initialCode: "x = 5\nif x = 5:\n    print(\"Equal\")", solutionCode: "x = 5\nif x == 5:\n    print(\"Equal\")", expectedOutput: "Equal\n", errorHint: "Use == for comparison." },
        { id: "p8", language: "Python", title: "String Concat", brokenCode: "", initialCode: "age = 20\nprint(\"Age: \" + age)", solutionCode: "age = 20\nprint(\"Age: \" + str(age))", expectedOutput: "Age: 20\n", errorHint: "Cannot concatenate string and int. Use str(int)." },
        { id: "p9", language: "Python", title: "List Append", brokenCode: "", initialCode: "myList = [1, 2]\nmyList.add(3)\nprint(myList[2])", solutionCode: "myList = [1, 2]\nmyList.append(3)\nprint(myList[2])", expectedOutput: "3\n", errorHint: "Lists use .append(), not .add()." },
        { id: "p10", language: "Python", title: "Module Import", brokenCode: "", initialCode: "print(math.pi)", solutionCode: "import math\nprint(math.pi)", expectedOutput: "3.141592653589793\n", errorHint: "You must import a module before using it." }
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
