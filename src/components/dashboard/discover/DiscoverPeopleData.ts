export interface PersonData {
  id: string;
  name: string;
  initials: string;
  role: string;
  bio: string;
  skills: string[];
  location: string;
  availability: string;
  compatibility: number;
}

export const discoverPeopleData: PersonData[] = [
  {
    id: "u1",
    name: "Sarah Mitchell",
    initials: "SM",
    role: "UI/UX Designer",
    bio: "Ex-agency designer looking to join a high-growth startup. Passionate about micro-interactions and accessibility.",
    skills: ["Figma", "Prototyping", "User Research"],
    location: "Remote (EST)",
    availability: "Full-time",
    compatibility: 97,
  },
  {
    id: "u2",
    name: "Jordan Lee",
    initials: "JL",
    role: "Backend Engineer",
    bio: "Building scalable distributed systems. Previously at Stripe. I love optimizing database queries.",
    skills: ["Go", "Kubernetes", "PostgreSQL"],
    location: "San Francisco, CA",
    availability: "Part-time",
    compatibility: 93,
  },
  {
    id: "u3",
    name: "Aiden Park",
    initials: "AP",
    role: "Full-Stack Developer",
    bio: "React and Node expert. Looking for a climate tech or edtech project to sink my teeth into.",
    skills: ["Next.js", "Python", "AWS"],
    location: "Remote (PST)",
    availability: "Full-time",
    compatibility: 89,
  },
  {
    id: "u4",
    name: "Elena Rodriguez",
    initials: "ER",
    role: "Product Manager",
    bio: "Data-driven PM with a technical background. I focus on bridging the gap between engineering and user needs.",
    skills: ["Strategy", "Analytics", "Agile"],
    location: "New York, NY",
    availability: "Full-time",
    compatibility: 86,
  },
  {
    id: "u5",
    name: "David Kim",
    initials: "DK",
    role: "Mobile Developer",
    bio: "iOS native and React Native developer. I build apps that feel like magic.",
    skills: ["Swift", "React Native", "CoreAnimation"],
    location: "London, UK",
    availability: "Contract",
    compatibility: 78,
  },
  {
    id: "u6",
    name: "Maya Patel",
    initials: "MP",
    role: "Data Scientist",
    bio: "Specializing in NLP and predictive modeling. Looking for a founding team tackling complex problems.",
    skills: ["Python", "PyTorch", "SQL"],
    location: "Remote (GMT)",
    availability: "Full-time",
    compatibility: 82,
  },
];
