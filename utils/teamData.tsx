export interface TeamMember {
  id: string;
  name: string;
  designation: string;
  image: string;
  handle?: string;
  borderColor?: string;
  gradient?: string;
  url?: string;
}

export const honourableMentions: TeamMember[] = [
  {
    id: "1",
    name: "Prof. Dipak Kumar Sahoo",
    designation: "Hon'ble Vice Chancellor, VSSUT",
    image: "https://i.pravatar.cc/300?img=69",
    handle: "@vcsahoo",
    borderColor: "#71717a",
    gradient: "linear-gradient(145deg, #0f0fa1ff, #3d3decff)",
    url: "https://vssut.ac.in"
  },
  {
    id: "2",
    name: "Prof. Rakesh Roshan Dash",
    designation: "Dean, Students' Welfare, VSSUT",
    image: "https://i.pinimg.com/236x/f5/6a/b9/f56ab94cf023b322876fbae61b602eb4.jpg",
    handle: "@rrdash",
    borderColor: "#64748b",
    gradient: "linear-gradient(180deg, #0a922cff, #0f2a14ff)",
    url: "https://vssut.ac.in"
  },
  {
    id: "3",
    name: "Dr. Sudhansu Ranjan Das",
    designation: "Vice President, Technical Society",
    image: "https://i.pravatar.cc/300?img=8",
    handle: "@srdas",
    borderColor: "#78716c",
    gradient: "linear-gradient(165deg, #f67a15ff, #bf5c1aff)",
    url: "https://vssut.ac.in"
  },
  {
    id: "4",
    name: "Dr. Padmanav Dash",
    designation: "Vice President, Cultural Society",
    image: "https://i.pravatar.cc/300?img=20",
    handle: "@pdash",
    borderColor: "#6b7280",
    gradient: "linear-gradient(225deg, #f125c8ff, #8f1a77ff)",
    url: "https://vssut.ac.in"
  },
];

export const studentBodies: TeamMember[] = [
  {
    id: "5",
    name: "Sandip Kumar Mohanty",
    designation: "Coordinator, Technical Society",
    image: "https://i.pravatar.cc/300?img=1",
    handle: "@sandipkm",
    borderColor: "#737373",
    gradient: "linear-gradient(195deg, #fdf506ff, #a4ae10ff)",
    url: "https://github.com/sandipkm"
  },
  {
    id: "6",
    name: "Priyambada Acharya",
    designation: "Coordinator, Technical Society",
    image: "https://i.pravatar.cc/300?img=11",
    handle: "@priyambada",
    borderColor: "#6b7280",
    gradient: "linear-gradient(135deg, #09f3e0ff, #16aea6ff)",
    url: "https://linkedin.com/in/priyambada"
  },
  {
    id: "7",
    name: "Arjun Patel",
    designation: "President, Cultural Society",
    image: "https://i.pravatar.cc/300?img=12",
    handle: "@arjunpatel",
    borderColor: "#71717a",
    gradient: "linear-gradient(210deg, #f20505ff, #832525ff)",
    url: "https://github.com/arjunpatel"
  },
  {
    id: "8",
    name: "Sneha Sharma",
    designation: "Secretary, Student Council",
    image: "https://i.pravatar.cc/300?img=44",
    handle: "@snehasharma",
    borderColor: "#64748b",
    gradient: "linear-gradient(150deg, #3e0a72ff, #5196f7ff)",
    url: "https://linkedin.com/in/snehasharma"
  },
  {
    id: "9",
    name: "Rohit Kumar",
    designation: "Head, Sports Committee",
    image: "https://i.pravatar.cc/300?img=33",
    handle: "@rohitkumar",
    borderColor: "#78716c",
    gradient: "linear-gradient(175deg, #83817fff, #f3efecff)",
    url: "https://github.com/rohitkumar"
  },
  {
    id: "10",
    name: "Ananya Singh",
    designation: "Lead, Event Management",
    image: "https://i.pravatar.cc/300?img=28",
    handle: "@ananyasingh",
    borderColor: "#6b7280",
    gradient: "linear-gradient(200deg, #09390dff, #3dcd23ff)",
    url: "https://linkedin.com/in/ananyasingh"
  }
];