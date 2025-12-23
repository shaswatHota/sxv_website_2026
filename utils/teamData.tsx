export interface TeamMember {
  id: string;
  name: string;
  designation: string;
  image: string;
  jpTitle?: string; // Optional: Adds Japanese flair to the designation
}

export const honourableMentions: TeamMember[] = [
  {
    id: "1",
    name: "Prof. Dipak Kumar Sahoo",
    designation: "Hon'ble Vice Chancellor, VSSUT",
    jpTitle: "総長", 
    image: "https://res.cloudinary.com/dlm8mel1x/image/upload/v1739726474/sxv/pxqyjgsihzbkrhdskehw.jpg",
  },
  {
    id: "2",
    name: "Prof. Rakesh Roshan Dash",
    designation: "Dean, Students' Welfare, VSSUT",
    jpTitle: "学生部長",
    image: "https://res.cloudinary.com/dlm8mel1x/image/upload/v1739726475/sxv/or6htanct1sfeocgqioh.jpg",
  },
  {
    id: "3",
    name: "Dr. Sudhansu Ranjan Das",
    designation: "Vice President, Technical Society",
    jpTitle: "技術副会長",
    image: "https://res.cloudinary.com/dlm8mel1x/image/upload/v1739726474/sxv/oh5sshajbzordyinenyo.jpg",
  },
  {
    id: "4",
    name: "Dr. Padmanav Dash",
    designation: "Vice President, Cultural Society",
    jpTitle: "文化副会長",
    image: "https://res.cloudinary.com/dlm8mel1x/image/upload/v1739726578/sxv/heumbxcqmolex5i2b6yv.jpg",
  },
];

export const studentBodies: TeamMember[] = [
  {
    id: "5",
    name: "Sandip Kumar Mohanty",
    designation: "Coordinator, Technical Society",
    jpTitle: "調整役",
    image: "https://res.cloudinary.com/dml2v8bov/image/upload/v1739783637/wgdnjwfsunf4hgg5nsp7.jpg",
  },
  {
    id: "6",
    name: "Priyambada Acharya",
    designation: "Coordinator, Technical Society",
    jpTitle: "調整役",
    image: "https://res.cloudinary.com/dml2v8bov/image/upload/v1739783638/gsfvyjeingu0z3wnggcp.jpg",
  },
];