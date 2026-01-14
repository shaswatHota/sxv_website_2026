import { Agriculture, Launch } from "@mui/icons-material";
import { Satellite, Dam } from "lucide-react";
import image from "next/image";

export interface Club {
  id: string;
  name: string;
  jpName: string;
  description: string;
  image: string;
  hanko: string;
  overlayChar: string;
}

export const clubs: Club[] = [
  {
    id: '1',
    name: 'ENIGMA',
    jpName: '謎の組織',
    description:
      'Enigma, the official web and coding club of VSSUT Burla, is a dynamic community of programmers, designers, and technology enthusiasts committed to nurturing innovation and problem solving skills. The club offers students practical exposure to diverse fields such as web and app development, game design, competitive programming, artificial intelligence, machine learning, cybersecurity, cloud computing and outreach domains.',
    image: '/clubs/enigma.png',
    hanko: '暗',
    overlayChar: '謎',
  },
  {
    id: '2',
    name: 'IEEE Society ',
    jpName: '電気工学',
    description:
      'The IEEE VSSUT Student Branch is a vibrant community of enthusiastic engineers, innovators, and leaders driven by technology and a shared passion for advancing humanity. Affiliated with the Institute of Electrical and Electronics Engineers (IEEE), the world’s largest technical professional organization, our branch at Veer Surendra Sai University of Technology (VSSUT), Burla fosters learning, collaboration, and innovation across diverse engineering domains. Through workshops, seminars, hackathons, and outreach programs, we empower students to develop technical expertise while nurturing teamwork and leadership qualities. With a strong focus on research, innovation, and professional growth, the IEEE VSSUT Student Branch serves as a platform where young minds can transform ideas into impactful solutions for society.',
    image: '/clubs/IEEE.jpeg',
    hanko: '流',
    overlayChar: '電',
  },
  {
    id: '3',
    name: 'EDP Society ',
    jpName: '起業道',
    description:
      'The Entrepreneurship Cell (E-Cell) is a nonprofit organization and techno-management club run by students of VSSUT, Odisha. We create awareness among the students about entrepreneurship through our various programs like workshops, speaker sessions, and other such events. We support the upcoming entrepreneurs by providing them necessary resources such as mentors, consultancy, seed funds, and networking.',
    image: '/clubs/Ecell.jpeg',
    hanko: '金',
    overlayChar: '商',
  },
  {
    id: '4',
    name: 'VSSUT ROBOTICS',
    jpName: '機械工学',
    description:
      'VSSUT Robotics is an interdisciplinary society dedicated to pushing the boundaries of automation, AI-driven systems, and embedded technology. As our motto says, VSSUT Robotics is exactly the place where imagination meets innovation. We focus on integrating robotics with environmental science, electrical engineering, and industrial applications. Our projects emphasize autonomous navigation, sustainable solutions, and real-world impact, making robotics more accessible and efficient. Whether designing intelligent watercraft, home automation systems, or real-time monitoring solutions, we aim to innovate, optimize, and implement advanced robotic technologies.',
    image: '/clubs/robotics.jpeg',
    hanko: '鉄',
    overlayChar: '機',
  },
  {
    id: '5',
    name: 'Quizzine (Cultural)',
    jpName: '知識門',
    description:
      'Quizzine is the official quiz club known for organizing diverse and high-impact quiz events across technical, business, sports, and general knowledge domains. It has successfully conducted multiple inter-college and intra-college competitions such as Quiz Gateway for Freshers, War of the Houses, Biz Tech, and Deal with the Devil. Quizzine members have also represented the club at prestigious external quizzes, securing podium finishes at events like NTPC Electron Quiz and Mindspark at NIT Rourkela.The club actively collaborates with other institutions through events like QROSSOVER, fostering competitive quizzing culture.Through consistent participation and organization, Quizzine has built a strong reputation for promoting analytical thinking and knowledge-driven competition.',
    image: '/clubs/Quizzine.jpeg',
    hanko: '知',
    overlayChar: '問',
  },
  {
    id: '6',
    name: 'Team AeroTech',
    jpName: '航空技術',
    description:
      'AeroTech Club is a student-led technical club dedicated to aviation and flight technologies. The club focuses on the design, fabrication, and testing of aircraft and drones, along with flight simulations and hands-on technical activities.',
    image: '/clubs/AeroTech.jpeg',
    hanko: '天',
    overlayChar: '空',
  },
  {
    id: '7',
    name: 'Team of Sustainability',
    jpName: '起業道',
    description:
      'Aligned with the UN’s 17 Sustainable Development Goals, our mission is to drive sustainable impact through innovation. We empower sustainability by undertaking purpose-driven projects, research, awareness campaigns, and collaborative action.',
    image: '/clubs/TOS.jpeg',
    hanko: '金',
    overlayChar: '商',
  },
  {
    id: '8',
    name: 'VIBRANZ ',
    jpName: '知識門',
    description:
      'VIBRANZ – The Dance Club of VSSUT.Vibranz is the official dance club of VSSUT, a dynamic platform where passion meets rhythm.The club brings together dancers of all styles to learn, create, and perform, promoting creativity, teamwork, and self-expression. From workshops and regular practice sessions to stage performances and competitions, Vibranz represents energy, dedication, and the vibrant dance culture of VSSUT.',
    image: '/clubs/Vibranz.jpeg',
    hanko: '知',
    overlayChar: '問',
  },
  {
    id: '9',
    name: 'SOULS-The Official Music Club ',
    jpName: '魂の舞',
    description:
      'SOULS - The Official Music Club Of VSSUT Burla, is more than just a campus organization, it is a close-knit family bound by a shared love for music. Through structured inductions, inspiring orientations, and performances at major academic, cultural, public, and national events, the club blends creativity, discipline, and teamwork. From welcoming new voices through warm inductions to lighting up auditoriums, conferences, and city streets with heartfelt performances, the club creates spaces where creativity, confidence, and connection grow together. Whether on campus or on external platforms, SOULS carries the spirit of VSSUT through melody, emotion, and collective passion, making music a lived and shared experience for everyone involved.',
    image: '/clubs/souls.jpeg',
    hanko: '魂',
    overlayChar: '舞',
  },
  {
    id: '10',
    name: 'VeerRacerss Electric',
    jpName: '速の侍',
    description:
      'VeerRacerss Electric is the official Formula Student team of VSSUT, Burla. Affiliated with SAE India, the team comprises undergraduate students who design, build and compete with electric formula-style race cars in national events like Formula Imperial, Supra SAE, Formula Bharat and FFS India.',
    image: '/clubs/VRE.jpeg',
    hanko: '速',
    overlayChar: '走',
  },
  {
    id: '11',
    name: 'The Literary Society',
    jpName: '文学協会',
    description:
      'The Literary Society promotes methodical and creative thinking among students that is presented through poems, essays, stories, monologues and reports by the members.',
    image: '/clubs/TLS.jpeg',
    hanko: '書',
    overlayChar: '文',
  },

  {
    id: '12',
    name: 'PIXELS- The Official Art and Photography Club',
    jpName: '芸術写真',
    description:
      'PIXELS is the official Art & Photography Club of VSSUT, Burla, dedicated to capturing creativity through lenses and strokes. The club serves as a vibrant platform for students to explore photography, cinematography, digital art, sketching, and visual storytelling. Through workshops, photowalks, exhibitions, competitions, and event coverage, PIXELS nurtures artistic expression and technical skills. United by a passion for visuals, the club documents campus life, celebrates moments, and transforms ideas into compelling art, making creativity a shared experience at VSSUT.',
    image: '/clubs/Pixels.png',
    hanko: '美',
    overlayChar: '写',
  },
  {
    id: '13',
    name: 'AVC- The Audio Visual Club',
    jpName: '謎の組織',
    description:
      'The Audio Visual Club is the creative hub of our college, capturing events and telling stories through videos, teasers, aftermovies, and short films. With dedicated teams for cinematography, videography, design, acting, editing, and content writing, we showcase campus life, collaborate with other clubs, host competitions, and produce our signature "Guptgu" series for freshers.',
    image: '/clubs/AVC.jpeg',
    hanko: '暗',
    overlayChar: '謎',
  },
  {
    id: '14',
    name: 'Idea innovation cell',
    jpName: '創意工夫',
    description:
      'Veer Surendra Sai University of Technology located near the iconic Hirakud Dam, has a rich history in technical education. Established as the University College of Engineering (UCE), it started with just two departments--Electrical and Mechanical and has since evolved into a leading Institution in Odisha and eastern India.. The Idea Innovation Cell (IIC) at the university is a vibrant community of tech enthusiasts and innovators. It focuses on developing products with socio-economic value and addressing challenges across diverse sectors such as Aerospace, Agriculture, Cybersecurity, and Healthcare. The IIC strives to offer indigenous, efficient and cost-effective solutions that benefit society and the world at large. Notably the IIC’s flagship project, the VSSUT Satellite Launch Vehicle (VSLV), stands out as India’s first student-built indigenous sounding rocket. The VSLV’s primary objective is to monitor slit deposit levels in the Hirakud Dam, demonstrating the university’s commitment to innovation and societal impact.',
    image: '/clubs/iic.jpeg',
    hanko: '創',
    overlayChar: '想',
  },
  {
    id: '15',
    name: 'EMOTICA',
    jpName: '感情劇',
    description: 'Mastering the art of dramatic expression.',
    image: '/clubs/Emotica.jpeg',
    hanko: '劇',
    overlayChar: '演',
  },
  {
    id: '16',
    name: 'VEERRACING',
    jpName: '競争心',
    description: 'Pushing the limits of mechanical endurance.',
    image: '/clubs/VeerssRacing.png',
    hanko: '競',
    overlayChar: '輪',
  },
]
