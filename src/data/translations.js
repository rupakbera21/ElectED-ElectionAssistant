export const translations = {
  en: {
    nav: {
      registration: "Registration",
      votingDay: "Voting Day",
      results: "Results",
    },
    hero: {
      tag: "Indian Democracy",
      title1: "Understand the",
      title2: "Electoral Process",
      para: "Empowering citizens through clarity. Navigate the essential milestones of the democratic process and discover how your vote shapes the future.",
      startExploring: "Start Exploring",
    },
    stats: {
      phases: "Key Phases",
      insights: "Voter Insights",
      assistant: "Smart Assistant",
    },
    timeline: {
      title: "The Electoral Journey",
      scrollHint: "Scroll to access data nodes",
    },
    chatbot: {
      promptTitle: "Still have questions?",
      promptPara: "Votey, your AI election assistant, is standing by to help clarify any doubts regarding the electoral process.",
      askVotey: "Ask Votey",
      welcome: "Namaste! I'm Votey. How can I help you with the Indian elections today?",
      onlineStatus: "Online & Ready",
      localFaqStatus: "Local FAQ Mode",
      networkError: "⚠️ Network Error: Switched to Local FAQ Mode. I can now answer basic questions from my offline database.",
      thinking: "Votey is thinking...",
      typePlaceholder: "Type your question...",
      suggestedQuestions: [
        "Am I eligible to vote?",
        "Which form to fill?",
        "Where is my booth?",
        "What is NOTA?",
      ],
    },
    footer: {
      missionControl: "Mission Control",
    }
  },
  hi: {
    nav: {
      registration: "पंजीकरण",
      votingDay: "मतदान दिवस",
      results: "परिणाम",
    },
    hero: {
      tag: "भारतीय लोकतंत्र",
      title1: "समझें",
      title2: "चुनावी प्रक्रिया",
      para: "स्पष्टता के माध्यम से नागरिकों को सशक्त बनाना। लोकतांत्रिक प्रक्रिया के आवश्यक मील के पत्थर खोजें और जानें कि आपका वोट भविष्य को कैसे आकार देता है।",
      startExploring: "अन्वेषण शुरू करें",
    },
    stats: {
      phases: "मुख्य चरण",
      insights: "मतदाता अंतर्दृष्टि",
      assistant: "स्मार्ट सहायक",
    },
    timeline: {
      title: "चुनावी यात्रा",
      scrollHint: "डेटा नोड्स तक पहुँचने के लिए स्क्रॉल करें",
    },
    chatbot: {
      promptTitle: "अभी भी प्रश्न हैं?",
      promptPara: "वोटी, आपका एआई चुनाव सहायक, चुनावी प्रक्रिया के बारे में किसी भी संदेह को दूर करने के लिए तैयार है।",
      askVotey: "वोटी से पूछें",
      welcome: "नमस्ते! मैं वोटी हूँ। आज मैं भारतीय चुनावों में आपकी कैसे मदद कर सकता हूँ?",
      onlineStatus: "ऑनलाइन और तैयार",
      localFaqStatus: "स्थानीय प्रश्नोत्तर मोड",
      networkError: "⚠️ नेटवर्क त्रुटि: स्थानीय प्रश्नोत्तर मोड पर स्विच किया गया। अब मैं अपने ऑफलाइन डेटाबेस से बुनियादी सवालों के जवाब दे सकता हूं।",
      thinking: "वोटी सोच रहा है...",
      typePlaceholder: "अपना प्रश्न टाइप करें...",
      suggestedQuestions: [
        "क्या मैं वोट देने के पात्र हूँ?",
        "कौन सा फॉर्म भरें?",
        "मेरा बूथ कहाँ है?",
        "नोटा (NOTA) क्या है?",
      ],
    },
    footer: {
      missionControl: "मिशन कंट्रोल",
    }
  }
};

export const getElectionSteps = (lang) => {
  const isHi = lang === "hi";
  return [
    {
      id: 1,
      title: isHi ? "पंजीकरण" : "Registration",
      subtitle: isHi ? "लोकतंत्र का आपका प्रवेश द्वार" : "Your gateway to democracy",
      description: isHi 
        ? "वोट डालने से पहले, आपको मतदाता सूची में एक पंजीकृत मतदाता होना चाहिए। भारत में, 18 वर्ष या उससे अधिक आयु का कोई भी नागरिक पंजीकरण कर सकता है।"
        : "Before you can cast your vote, you must be a registered voter in the electoral roll. In India, any citizen 18 years or older can register.",
      whatToDo: isHi ? [
        "अपनी पात्रता जांचें (1 जनवरी को 18+ वर्ष होनी चाहिए)।",
        "नए मतदाता पंजीकरण के लिए फॉर्म 6 भरें।",
        "वोटर हेल्पलाइन ऐप या NVSP पोर्टल के माध्यम से ऑनलाइन जमा करें।",
        "अपने आवेदन की स्थिति को ट्रैक करें और अपना EPIC (वोटर आईडी) प्राप्त करें।",
      ] : [
        "Check your eligibility (must be 18+ years on Jan 1st).",
        "Fill out Form 6 for new voter registration.",
        "Submit online via the Voter Helpline App or NVSP portal.",
        "Track your application status and receive your EPIC (Voter ID).",
      ],
      proTips: isHi ? [
        "चुनाव से कम से कम कुछ महीने पहले पंजीकरण करें।",
        "यदि आपका नाम सूची में है तो आपको वोट देने के लिए भौतिक वोटर आईडी की आवश्यकता नहीं है; इसके बजाय आधार या पैन का उपयोग करें।",
        "यदि आप हाल ही में कहीं और रहने चले गए हैं तो फॉर्म 8 का उपयोग करके अपना पता अपडेट करें।",
      ] : [
        "Register at least a few months before the election.",
        "You don't need a physical Voter ID to vote if your name is on the roll; use Aadhaar or PAN instead.",
        "Update your address using Form 8 if you've recently moved.",
      ],
      faqs: [
        {
          question: isHi ? "क्या मैं वोट देने का पात्र हूँ?" : "Am I eligible to vote?",
          keywords: ["eligible", "eligibility", "age", "citizen", "qualify", "पात्र", "पात्रता"],
          answer: isHi 
            ? "पात्रता मानदंड: 1. भारतीय नागरिक होना चाहिए। 2. अर्हता तिथि (1 जनवरी, 1 अप्रैल, 1 जुलाई, या 1 अक्टूबर) को 18 वर्ष या उससे अधिक आयु का होना चाहिए। 3. उस निर्वाचन क्षेत्र का साधारण निवासी होना चाहिए। 4. मानसिक रूप से अस्वस्थ या भ्रष्ट आचरण के लिए अयोग्य नहीं होना चाहिए।"
            : "Eligibility Criteria: 1. Must be a Citizen of India. 2. Must be 18+ years on the qualifying date (Jan 1st, April 1st, July 1st, or Oct 1st). 3. Must be an ordinary resident in the constituency. 4. Must not be disqualified due to unsound mind or corrupt practices.",
        },
        {
          question: isHi ? "मैं कैसे जांचूं कि मैं पंजीकृत हूं या नहीं?" : "How do I check if I'm registered?",
          keywords: ["check", "registered", "status", "verify", "nvsp", "जांचें", "पंजीकृत"],
          answer: isHi 
            ? "आप वोटर हेल्पलाइन ऐप का उपयोग करके या अपने EPIC नंबर का उपयोग करके आधिकारिक ECI पोर्टल (electoralsearch.in) पर जाकर मतदाता सूची में अपना नाम खोज सकते हैं।"
            : "Search your name on the electoral roll using the Voter Helpline App or by visiting the official ECI portal (electoralsearch.in) using your EPIC number or personal details.",
        },
        {
          question: isHi ? "मुझे किन दस्तावेजों की आवश्यकता है?" : "What documents do I need?",
          keywords: ["documents", "need", "bring", "id", "proof", "दस्तावेज", "आवश्यकता"],
          answer: isHi
            ? "पंजीकरण के लिए: 1. फोटो। 2. आयु प्रमाण (पैन, आधार, 10वीं प्रमाण पत्र)। 3. निवास प्रमाण (आधार, बिजली बिल, बैंक पासबुक)।"
            : "For registration: 1. Photograph. 2. Age Proof (PAN, Aadhaar, 10th Cert). 3. Residence Proof (Aadhaar, Electricity bill, Bank passbook).",
        },
        {
          question: isHi ? "फॉर्म 6 और फॉर्म 8 क्या हैं?" : "What are Form 6 and Form 8?",
          keywords: ["form 6", "form 8", "correction", "new voter", "फॉर्म"],
          answer: isHi
            ? "फॉर्म 6: नए मतदाताओं के लिए। फॉर्म 8: सुधार, स्थानांतरण या मतदाता सूची में विवरण अपडेट करने के लिए।"
            : "Form 6: For new voter registration. Form 8: For corrections, shifting of residence, or updating details in the electoral roll.",
        },
        {
          question: isHi ? "क्या अनिवासी भारतीय (NRI) वोट दे सकते हैं?" : "Can NRIs vote?",
          keywords: ["nri", "overseas", "abroad", "अनिवासी"],
          answer: isHi
            ? "हाँ, अनिवासी भारतीय 'प्रवासी मतदाता' के रूप में फॉर्म 6A का उपयोग करके पंजीकरण कर सकते हैं। उन्हें मतदान के दिन अपने पासपोर्ट के साथ मतदान केंद्र पर व्यक्तिगत रूप से उपस्थित होना होगा।"
            : "Yes, NRIs can register as 'Overseas Electors' using Form 6A. They must be present in person at the polling station with their original passport on voting day.",
        },
        {
          question: isHi ? "मेरा BLO कौन है?" : "Who is my BLO?",
          keywords: ["blo", "booth level officer", "बीएलओ"],
          answer: isHi
            ? "बीएलओ (बूथ लेवल ऑफिसर) एक स्थानीय अधिकारी है जो मतदाता सूची को अपडेट करने में मदद करता है। आप वोटर हेल्पलाइन ऐप पर 'Know Your Officers' के तहत अपना बीएलओ पा सकते हैं।"
            : "BLO (Booth Level Officer) is a local official who assists in updating voter rolls. Find yours via the Voter Helpline app under 'Know Your Officers'.",
        }
      ],
    },
    {
      id: 2,
      title: isHi ? "मतदान दिवस" : "Voting Day",
      subtitle: isHi ? "अपनी आवाज़ उठाएं" : "Make your voice heard",
      description: isHi
        ? "यह वह दिन है जब आप अपने लोकतांत्रिक अधिकार का प्रयोग करते हैं। ईवीएम (इलेक्ट्रॉनिक वोटिंग मशीन) का उपयोग करके निर्वाचन क्षेत्रों में मतदान केंद्र बनाए जाते हैं।"
        : "This is the day you exercise your democratic right. Polling booths are set up across constituencies using EVMs (Electronic Voting Machines).",
      whatToDo: isHi ? [
        "वोटर हेल्पलाइन ऐप के माध्यम से अपना निर्धारित मतदान केंद्र खोजें।",
        "अपना वोटर आईडी (EPIC) या कोई अन्य ECI-अनुमोदित फोटो आईडी लाएं।",
        "लाइन में लगें, मतदान अधिकारी के साथ अपनी पहचान सत्यापित करें।",
        "अपनी उंगली पर अमिट स्याही लगवाएं और रजिस्टर पर हस्ताक्षर करें।",
        "अपने पसंदीदा उम्मीदवार के सामने ईवीएम पर नीला बटन दबाएं।",
      ] : [
        "Find your designated polling booth via the Voter Helpline app.",
        "Bring your Voter ID (EPIC) or another ECI-approved photo ID.",
        "Stand in line, verify your identity with the Polling Officer.",
        "Get your finger marked with indelible ink and sign the register.",
        "Press the blue button on the EVM next to your chosen candidate.",
      ],
      proTips: isHi ? [
        "लंबी कतारों से बचने के लिए सुबह जल्दी जाएं।",
        "यह सत्यापित करने के लिए कि आपका वोट सही ढंग से दर्ज किया गया था, 7 सेकंड के लिए कांच के माध्यम से VVPAT पर्ची की जांच करें।",
        "मतदान कक्ष के भीतर फोन और कैमरों की सख्त मनाही है।",
      ] : [
        "Go early in the morning to avoid long queues.",
        "Check the VVPAT slip through the glass for 7 seconds to verify your vote was recorded correctly.",
        "Phones and cameras are strictly not allowed inside the voting compartment.",
      ],
      faqs: [
        {
          question: isHi ? "ईवीएम और वीवीपैट क्या है?" : "What is an EVM and VVPAT?",
          keywords: ["evm", "vvpat", "machine", "vote", "electronic", "ईवीएम", "वीवीपैट"],
          answer: isHi
            ? "ईवीएम एक इलेक्ट्रॉनिक मशीन है जो वोट रिकॉर्ड करती है। वीवीपैट एक पर्ची प्रिंट करता है जो 7 सेकंड के लिए दिखाई देती है, जिससे आप पुष्टि कर सकते हैं कि आपका वोट सही उम्मीदवार को गया है।"
            : "EVM records your vote electronically. VVPAT prints a slip (visible for 7 seconds) to confirm your vote was cast for the intended candidate.",
        },
        {
          question: isHi ? "क्या मैं अपनी वोटर आईडी के बिना वोट दे सकता हूं?" : "Can I vote without my Voter ID?",
          keywords: ["without", "voter id", "epic", "lost", "no id", "बिना", "वोटर आईडी"],
          answer: isHi
            ? "हाँ! यदि आपका नाम मतदाता सूची में है, तो आप आधार, पैन, पासपोर्ट, या ड्राइविंग लाइसेंस जैसे 12 अन्य वैकल्पिक दस्तावेजों का उपयोग करके वोट दे सकते हैं।"
            : "Yes! If your name is on the electoral roll, you can vote using any of the 12 alternative IDs like Aadhaar, PAN Card, Passport, or DL.",
        },
        {
          question: isHi ? "अगर मेरा नाम लिस्ट में नहीं है, लेकिन मेरे पास आईडी है तो क्या होगा?" : "What if my name is not on the list but I have an ID?",
          keywords: ["name not on list", "missing", "voter list", "नाम नहीं"],
          answer: isHi
            ? "यदि आपका नाम आधिकारिक मतदाता सूची में नहीं है, तो आप वोट नहीं दे सकते, भले ही आपके पास वोटर आईडी कार्ड हो। मतदान के लिए सूची में नाम होना अनिवार्य है।"
            : "If your name is not on the official electoral roll, you cannot vote, even if you possess a physical Voter ID card. Being on the list is mandatory.",
        },
        {
          question: isHi ? "मतदान का समय क्या है?" : "What are the voting hours?",
          keywords: ["time", "hours", "opening", "closing", "समय"],
          answer: isHi
            ? "आमतौर पर सुबह 7 बजे से शाम 6 बजे तक। हालांकि, यदि आप शाम 6 बजे लाइन में हैं, तो भी आपको वोट देने की अनुमति दी जाएगी।"
            : "Usually from 7:00 AM to 6:00 PM. However, if you are in the queue at closing time, you will still be allowed to cast your vote.",
        },
        {
          question: isHi ? "नोटा (NOTA) क्या है?" : "What is NOTA?",
          keywords: ["nota", "none", "reject", "above", "नोटा"],
          answer: isHi
            ? "नोटा का अर्थ है 'उपरोक्त में से कोई नहीं'। यह ईवीएम पर अंतिम विकल्प है, जो आपको निर्वाचन क्षेत्र के सभी उम्मीदवारों को अस्वीकार करने की अनुमति देता है।"
            : "NOTA stands for 'None Of The Above'. It allows you to officially register a vote of rejection against all candidates in your constituency.",
        },
        {
          question: isHi ? "दिव्यांग और वरिष्ठ नागरिकों के लिए क्या सुविधाएं हैं?" : "Facilities for disabled and senior citizens?",
          keywords: ["disabled", "senior", "home", "wheelchair", "बुजुर्ग"],
          answer: isHi
            ? "ईसीआई मतदान केंद्रों पर रैंप, व्हीलचेयर और ब्रेल की सुविधा प्रदान करता है। 85+ वर्ष के नागरिकों और 40%+ विकलांगता वाले लोगों के लिए 'घर से मतदान' की सुविधा भी उपलब्ध है।"
            : "ECI provides ramps, wheelchairs, and Braille at booths. 'Vote from Home' via postal ballot is available for 85+ seniors and persons with 40%+ disabilities.",
        }
      ],
    },
    {
      id: 3,
      title: isHi ? "परिणाम" : "Results",
      subtitle: isHi ? "लोकतंत्र का फल" : "Democracy delivers",
      description: isHi
        ? "राज्य या देश भर में मतदान के चरण समाप्त होने के बाद, ईवीएम को स्ट्रॉन्ग रूम में ले जाया जाता है। मतगणना के दिन, कड़ी सुरक्षा के बीच मतों की गिनती की जाती है।"
        : "After polling phases conclude across the state or country, EVMs are transported to strong rooms. On counting day, votes are tallied under tight security.",
      whatToDo: isHi ? [
        "समाचार चैनलों या ईसीआई परिणाम वेबसाइट पर लाइव मतगणना रुझान देखें।",
        "रिटर्निंग ऑफिसर द्वारा आधिकारिक तौर पर आपके निर्वाचन क्षेत्र के विजेता की घोषणा करने की प्रतीक्षा करें।",
        "शांति बनाए रखें और लोकतांत्रिक जनादेश का सम्मान करें।",
      ] : [
        "Watch the live counting trends on news channels or the ECI Results website.",
        "Wait for the Returning Officer to officially declare the winner for your constituency.",
        "Stay peaceful and respect the democratic mandate.",
      ],
      proTips: isHi ? [
        "सुबह के शुरुआती रुझान अक्सर पोस्टल बैलट होते हैं; ईवीएम से स्पष्ट तस्वीर के लिए दोपहर तक प्रतीक्षा करें।",
        "सीधे ईसीआई से वास्तविक समय मतगणना डेटा ट्रैक करने के लिए वोटर हेल्पलाइन ऐप डाउनलोड करें।",
      ] : [
        "Early morning trends are often postal ballots; wait until midday for a clearer picture from EVMs.",
        "You can download the Voter Helpline app to track real-time counting data directly from the ECI.",
      ],
      faqs: [
        {
          question: isHi ? "गिनती से पहले ईवीएम को कैसे सुरक्षित किया जाता है?" : "How are EVMs secured before counting?",
          keywords: ["secure", "safe", "tamper", "strong room", "before", "सुरक्षित", "स्ट्रॉन्ग रूम"],
          answer: isHi
            ? "ईवीएम को उम्मीदवारों के प्रतिनिधियों की मौजूदगी में सील किया जाता है और त्रिस्तरीय सुरक्षा के साथ 'स्ट्रॉन्ग रूम' में रखा जाता है। उम्मीदवारों के प्रतिनिधि कमरे के बाहर पहरा भी दे सकते हैं।"
            : "EVMs are sealed in the presence of candidates' agents and kept in 3-tier guarded 'Strong Rooms'. Agents can even camp outside to monitor the rooms.",
        },
        {
          question: isHi ? "अंतिम परिणाम की घोषणा कौन करता है?" : "Who declares the final result?",
          keywords: ["declare", "final", "winner", "result", "official", "घोषणा", "विजेता"],
          answer: isHi
            ? "निर्वाचन क्षेत्र का रिटर्निंग ऑफिसर (RO) आधिकारिक तौर पर परिणाम घोषित करता है और विजेता उम्मीदवार को निर्वाचन का प्रमाण पत्र प्रदान करता है।"
            : "The Returning Officer (RO) of the constituency officially declares the result and issues the 'Certificate of Election' to the winner.",
        },
        {
          question: isHi ? "मॉडल कोड ऑफ कंडक्ट (MCC) क्या है?" : "What is Model Code of Conduct (MCC)?",
          keywords: ["mcc", "code of conduct", "rules", "आचार संहिता"],
          answer: isHi
            ? "आचार संहिता चुनावों के दौरान राजनीतिक दलों और उम्मीदवारों के लिए दिशानिर्देशों का एक सेट है, जो स्वतंत्र और निष्पक्ष चुनाव सुनिश्चित करता है।"
            : "The Model Code of Conduct is a set of guidelines for political parties and candidates during elections to ensure free and fair polling.",
        },
        {
          question: isHi ? "मतदान गोपनीय कैसे रहता है?" : "How is voting kept secret?",
          keywords: ["secret", "privacy", "confidential", "गोपनीय"],
          answer: isHi
            ? "मतदान कक्ष में कोई कैमरा या फोन ले जाना मना है। ईवीएम को इस तरह रखा जाता है कि कोई यह न देख सके कि आपने किसे वोट दिया है।"
            : "No cameras or phones are allowed inside the booth. The EVM is placed in a compartment ensuring your vote remains strictly confidential.",
        },
        {
          question: isHi ? "वोटर हेल्पलाइन नंबर क्या है?" : "What is the Voter Helpline number?",
          keywords: ["helpline", "number", "1950", "contact", "हेल्पलाइन"],
          answer: isHi
            ? "आप किसी भी प्रश्न के लिए ईसीआई के राष्ट्रीय हेल्पलाइन नंबर 1950 पर कॉल कर सकते हैं।"
            : "You can call the ECI's national helpline number 1950 for any election-related queries.",
        }
      ],
    },
  ];
};

