export const electionSteps = [
  {
    id: 1,
    title: "Registration",
    subtitle: "Your gateway to democracy",
    description: "Before you can cast your vote, you must be a registered voter in the electoral roll. In India, any citizen 18 years or older can register.",
    whatToDo: [
      "Check your eligibility (must be 18+ years on Jan 1st).",
      "Fill out Form 6 for new voter registration.",
      "Submit online via the Voter Helpline App or NVSP portal.",
      "Track your application status and receive your EPIC (Voter ID).",
    ],
    proTips: [
      "Register at least a few months before the election.",
      "You don't need a physical Voter ID to vote if your name is on the roll; use Aadhaar or PAN instead.",
      "Update your address using Form 8 if you've recently moved.",
    ],
    faqs: [
      {
        question: "How do I check if I'm registered?",
        keywords: ["check", "registered", "status", "verify", "nvsp"],
        answer: "You can search for your name on the electoral roll using the Voter Helpline App or by visiting the official ECI portal (electoralsearch.in) using your EPIC number.",
      },
      {
        question: "What documents do I need?",
        keywords: ["documents", "need", "bring", "id", "proof"],
        answer: "For Form 6, you need a passport-size photograph, proof of age (like Birth Certificate or PAN card), and proof of residence (like Aadhaar, Passport, or Electricity bill).",
      },
      {
        question: "What is Form 6?",
        keywords: ["form 6", "form", "application", "new voter"],
        answer: "Form 6 is the official application form used by the Election Commission of India for the inclusion of a new name in the electoral roll.",
      },
    ],
  },
  {
    id: 2,
    title: "Voting Day",
    subtitle: "Make your voice heard",
    description: "This is the day you exercise your democratic right. Polling booths are set up across constituencies using EVMs (Electronic Voting Machines).",
    whatToDo: [
      "Find your designated polling booth via the Voter Helpline app.",
      "Bring your Voter ID (EPIC) or another ECI-approved photo ID.",
      "Stand in line, verify your identity with the Polling Officer.",
      "Get your finger marked with indelible ink and sign the register.",
      "Press the blue button on the EVM next to your chosen candidate.",
    ],
    proTips: [
      "Go early in the morning to avoid long queues.",
      "Check the VVPAT slip through the glass for 7 seconds to verify your vote was recorded correctly.",
      "Phones and cameras are strictly not allowed inside the voting compartment.",
    ],
    faqs: [
      {
        question: "What is an EVM and VVPAT?",
        keywords: ["evm", "vvpat", "machine", "vote", "electronic"],
        answer: "An EVM is an Electronic Voting Machine used to cast votes securely. A VVPAT (Voter Verifiable Paper Audit Trail) is a printer attached to the EVM that generates a slip showing your vote, ensuring transparency.",
      },
      {
        question: "Can I vote without my Voter ID?",
        keywords: ["without", "voter id", "epic", "lost", "no id"],
        answer: "Yes! If your name is on the voter list, you can show alternative approved IDs like an Aadhaar Card, PAN Card, Passport, or Driving License to vote.",
      },
      {
        question: "What if I press the wrong button?",
        keywords: ["wrong", "mistake", "change", "button"],
        answer: "Once a button on the EVM is pressed and the beep sounds, your vote is recorded and cannot be changed. Take your time to be sure before pressing!",
      },
    ],
  },
  {
    id: 3,
    title: "Results",
    subtitle: "Democracy delivers",
    description: "After polling phases conclude across the state or country, EVMs are transported to strong rooms. On counting day, votes are tallied under tight security.",
    whatToDo: [
      "Watch the live counting trends on news channels or the ECI Results website.",
      "Wait for the Returning Officer to officially declare the winner for your constituency.",
      "Stay peaceful and respect the democratic mandate.",
    ],
    proTips: [
      "Early morning trends are often postal ballots; wait until midday for a clearer picture from EVMs.",
      "You can download the Voter Helpline app to track real-time counting data directly from the ECI.",
    ],
    faqs: [
      {
        question: "How are EVMs secured before counting?",
        keywords: ["secure", "safe", "tamper", "strong room", "before"],
        answer: "EVMs are sealed in the presence of political party representatives and kept in heavily guarded 'Strong Rooms' with 24/7 CCTV surveillance until counting day.",
      },
      {
        question: "What is NOTA?",
        keywords: ["nota", "none", "reject", "above"],
        answer: "NOTA stands for 'None Of The Above'. It is the last button on the EVM, allowing you to officially register your rejection of all candidates contesting in your constituency.",
      },
      {
        question: "Who declares the final result?",
        keywords: ["declare", "final", "winner", "result", "official"],
        answer: "The Returning Officer (RO) of the specific constituency officially compiles the data from all EVMs and VVPATs, and then officially declares the winning candidate.",
      },
    ],
  },
];
