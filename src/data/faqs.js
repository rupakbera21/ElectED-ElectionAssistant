// src/data/faqs.js

/**
 * @typedef {Object} FAQ
 * @property {number} id
 * @property {string} category
 * @property {string} question
 * @property {string} answer
 * @property {string[]} keywords
 */

/** @type {FAQ[]} */
export const OFFLINE_FAQS = [
  // --- SECTION: ELIGIBILITY & REGISTRATION ---
  {
    id: 1,
    category: "Registration",
    question: "Who is eligible to vote in the Indian Elections?",
    answer: "Any Indian citizen who is 18 years or older on the qualifying date (Jan 1, Apr 1, Jul 1, or Oct 1) and is an ordinary resident of the constituency is eligible.",
    keywords: ["eligible", "who can vote", "age", "citizen", "18", "voter id", "registration"]
  },
  {
    id: 2,
    category: "Registration",
    question: "Can I register if I turn 18 later this year?",
    answer: "Yes. The ECI now has four qualifying dates (Jan 1, Apr 1, Jul 1, Oct 1). You can pre-fill Form 6, and your registration will automatically activate on the next qualifying date after your birthday.",
    keywords: ["birthday", "turn 18", "upcoming", "future voter", "qualifying date"]
  },
  {
    id: 3,
    category: "Registration",
    question: "I have moved to a new city. Can I still vote?",
    answer: "You must register in your current place of residence using Form 6. It is illegal to be registered in two different constituencies at once; your old registration will be cancelled.",
    keywords: ["shifted", "moved", "new city", "transfer", "address change"]
  },

  // --- SECTION: DOCUMENTATION (EPIC CARD) ---
  {
    id: 4,
    category: "Documents",
    question: "Can I vote without a physical Voter ID (EPIC) card?",
    answer: "Yes, as long as your name is in the Electoral Roll. You can use 12 alternative photo IDs, including Aadhaar, PAN Card, Driving License, Passport, or MNREGA Job Card.",
    keywords: ["no card", "lost card", "without id", "aadhaar", "pan card", "passport", "voter id", "physical card"]
  },
  {
    id: 5,
    category: "Documents",
    question: "What should I do if my Voter ID has a typo or error?",
    answer: "You can still vote if your identity can be established. Use Form 8 on the ECI portal to request corrections for name, age, or photo after the election period.",
    keywords: ["typo", "mistake", "wrong name", "correction", "form 8", "voter id error"]
  },
  {
    id: 6,
    category: "Documents",
    question: "What is e-EPIC and is it valid?",
    answer: "e-EPIC is a secure PDF version of your Voter ID. It can be downloaded from the voters.eci.gov.in portal and is considered a valid identity document at the polling station.",
    keywords: ["digital id", "download", "pdf", "soft copy", "e-epic"]
  },

  // --- SECTION: POLLING DAY PROCESS ---
  {
    id: 7,
    category: "Polling",
    question: "How do I find my polling booth location?",
    answer: "You can find your booth using the Voter Helpline App, by sending an SMS 'ECI <EPIC Number>' to 1950, or by visiting electoralsearch.eci.gov.in.",
    keywords: ["booth", "where to vote", "polling station", "location", "find my booth"]
  },
  {
    id: 8,
    category: "Polling",
    question: "What is VVPAT and why is it used?",
    answer: "The Voter Verifiable Paper Audit Trail (VVPAT) is a machine connected to the EVM. It displays a paper slip for 7 seconds, allowing you to visually verify that your vote went to the correct candidate.",
    keywords: ["vvpat", "verify vote", "paper slip", "evm", "machine"]
  },
  {
    id: 9,
    category: "Polling",
    question: "Are mobile phones allowed inside the polling booth?",
    answer: "No. Mobile phones, cameras, and other electronic gadgets are strictly prohibited inside the voting compartment to ensure the secrecy of the ballot.",
    keywords: ["phone", "camera", "mobile", "electronics", "prohibited"]
  },

  // --- SECTION: FORMS ---
  {
    id: 10,
    category: "Forms",
    question: "Which form should I use for a new registration?",
    answer: "Use Form 6 for new registration as a general voter. For NRIs, use Form 6A.",
    keywords: ["new voter", "form 6", "registration form", "apply"]
  },
  {
    id: 11,
    category: "Forms",
    question: "How do I request a replacement for a lost Voter ID?",
    answer: "You should use Form EPIC-002 to apply for a replacement Voter ID card in case of loss, destruction, or defacement.",
    keywords: ["lost", "replacement", "new card", "epic-002", "stolen"]
  },
  {
    id: 12,
    category: "Registration",
    question: "Can an NRI (Non-Resident Indian) vote?",
    answer: "Yes, NRIs can vote. They must register as an 'Overseas Elector' using Form 6A. However, they must be physically present at their polling station in India with their original passport to cast their vote.",
    keywords: ["nri", "overseas", "abroad", "foreign", "6a"]
  },
  {
    id: 13,
    category: "Registration",
    question: "What is a 'Marked Copy' of the Electoral Roll?",
    answer: "It is the official list used by the Polling Officer on election day. If your name is 'marked,' it means a postal ballot was issued or you have already voted. Check this if you are wrongly denied a vote.",
    keywords: ["marked copy", "electoral roll", "list", "denied vote"]
  },

  // --- SECTION: DOCUMENTATION (EXPANDED) ---
  {
    id: 14,
    category: "Documents",
    question: "I lost my Aadhaar and Voter ID. Can I use a Bank Passbook?",
    answer: "Yes, a Passbook with a photograph issued by a Bank or Post Office is one of the 12 officially accepted alternative identity documents.",
    keywords: ["bank passbook", "passbook", "bank account", "alternative id"]
  },
  {
    id: 15,
    category: "Documents",
    question: "Is the 'Voter Information Slip' alone enough to vote?",
    answer: "No. The Voter Information Slip (VIS) is only to inform you of your booth and serial number. It is NOT accepted as proof of identity. You must carry your EPIC card or one of the 12 alternative photo IDs.",
    keywords: ["slip", "voter slip", "vis", "only slip"]
  },

  // --- SECTION: POLLING DAY & SPECIAL CASES (EXPANDED) ---
  {
    id: 16,
    category: "Polling",
    question: "What is 'Tendered Vote' and when can I use it?",
    answer: "If you find that someone else has already voted in your name, you can alert the Presiding Officer. After identity verification, you will be allowed to cast a 'Tendered Vote' on a paper ballot, which is kept in a separate sealed cover.",
    keywords: ["tendered vote", "someone else voted", "stolen vote", "identity theft"]
  },
  {
    id: 17,
    category: "Polling",
    question: "What is a 'Challenge Vote'?",
    answer: "If a polling agent challenges your identity, you must prove it to the Presiding Officer. Usually, a small deposit (₹2) is required for a formal challenge. If proven innocent, you can vote normally.",
    keywords: ["challenge", "polling agent", "fake voter", "verify identity"]
  },
  {
    id: 18,
    category: "Polling",
    question: "Can I vote if I am blind or physically disabled?",
    answer: "Yes. You are allowed to take an 'Assisted Voter' (a companion aged 18+) into the booth to help you. Additionally, EVMs have Braille signage, and polling stations must provide ramps and wheelchairs.",
    keywords: ["blind", "disabled", "handicapped", "wheelchair", "companion", "braille"]
  },
  {
    id: 19,
    category: "Polling",
    question: "What is NOTA and where is it on the EVM?",
    answer: "NOTA (None of the Above) is the last button on the EVM. It allows you to register that you do not support any of the candidates in your constituency.",
    keywords: ["nota", "reject", "last button", "none of the above"]
  },

  // --- SECTION: FORMS & GRIEVANCES (EXPANDED) ---
  {
    id: 20,
    category: "Forms",
    question: "How do I delete my name from the roll if I'm moving permanently?",
    answer: "Use **Form 7**. This is used for the deletion of names due to death, permanent shifting, or disqualification. Using this properly helps maintain a clean electoral roll.",
    keywords: ["delete", "remove name", "form 7", "cancel registration"]
  },
  {
    id: 21,
    category: "Forms",
    question: "How do I complain about a candidate violating the Model Code of Conduct?",
    answer: "You should use the **cVIGIL app**. It allows citizens to report violations (like bribery or illegal posters) with live photos/videos, and the ECI is mandated to respond within 100 minutes.",
    keywords: ["complain", "cvigil", "violation", "bribe", "illegal", "mcc"]
  }
];