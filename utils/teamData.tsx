export interface TeamMember {
  id: string;
  name: string;
  designation: string;
  image: string;
  jpTitle?: string;
  linkedin?: string;
  email?: string;
}


export const honourableMentions: TeamMember[] = [
  {
    id: "1",
    name: "Prof. Dipak Kumar Sahoo",
    designation: "Hon'ble Vice Chancellor, VSSUT",
    jpTitle: "総長", 
    image: "/teams/vcSir.jpg",
    linkedin:"https://www.linkedin.com/in/aryan-rajguru-a1333230a/",
  },
  {
    id: "2",
    name: "Prof. Rakesh Roshan Dash",
    designation: "Dean, Students' Welfare, VSSUT",
    jpTitle: "学生部長",
    image: "/teams/rrdSir.jpg",
  },
  {
    id: "3",
    name: "Dr. Trupti Mahapatra",
    designation: "Vice President, Technical Society",
    jpTitle: "技術副会長",
    image: "/teams/truptiSir.jpg",
  },
  {
    id: "4",
    name: "Dr. Padmanav Mishra",
    designation: "Vice President, Cultural Society",
    jpTitle: "文化副会長",
    image: "https://res.cloudinary.com/dlm8mel1x/image/upload/v1739726578/sxv/heumbxcqmolex5i2b6yv.jpg",
  },
];

export const studentBodies: TeamMember[] = [
  {
    id: "5",
    name: "Aniket Palei",
    designation: "Coordinator, VASSAUNT",
    jpTitle: "調整役",
    image: "/teams/tech1.png",
    linkedin:"https://www.linkedin.com/in/aniket-palei-8a4919292?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    email: " aniketpalei77@gmail.com ",
  },
  {
    id: "6",
    name: "Aditi Kar",
    designation: "Coordinator, VASSAUNT",
    jpTitle: "調整役",
    image: "/teams/aditi.jpg",
    linkedin:"https://www.linkedin.com/in/aditi-kar-07468630a",
    email: "aditikar0205@gmail.com",
  },
 
  {
    id: "7",
    name: "anshul nanda",
    designation: "Coordinator, SAMAVESH",
    jpTitle: "調整役",
    image: "/teams/anshul.jpg",
    linkedin:"https://www.linkedin.com/in/ansul-nanda-96961b3a1",
    email:"ansulnanda3@gmail.com",
  },
   {
    id: "8",
    name: "suhani dash",
    designation: "Coordinator, SAMAVESH",
    jpTitle: "調整役",
    image: "/teams/suhani.jpg",
    linkedin:"https://www.linkedin.com/in/suhani-dash-78a071233",
    email:"suhanidash05@gmail.com",
  },
];