export interface Coordinator {
  name: string;
  role: string;
  contact: string;
}

export interface FacultyAdvisor {
  name: string;
  designation?: string;
}

export interface ClubPeople {
  coordinators: Coordinator[];
  facultyAdvisors: FacultyAdvisor[];
}

export const clubCoordinators: Record<string, ClubPeople> = {

  "1": {
    coordinators: [
      { name: "Ayush Biswal", role: "coordinator", contact: "https://www.linkedin.com/in/ayush-biswal-07b24b29b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
      { name: "Swati swaroopa sahoo", role: "coordinator", contact: "https://www.linkedin.com/in/swati-swaroopa-sahoo-52423b304?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" }
    ],
    facultyAdvisors: [
      { name: "Prof. S. Mishra", designation: "Faculty Advisor" }
    ]
  },

  "2": {
    coordinators: [
      { name: "Sohan Kumar Nayak ", role: "coordinator", contact: "https://www.linkedin.com/in/sohan-kumar-nayak-8198292a7" },
      { name: "Sthyti Pragyan Sahu", role: "coordinator", contact: "https://www.linkedin.com/in/sthyti-pragyan-sahu?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" }
    ],
    facultyAdvisors: [
      { name: "Dr. Suvendu Narayan Mishra", designation: "Faculty Advisor" },
      { name: "Ms. Sharmila Garnaik ", designation: "Faculty Advisor" }
    ]
  },

  "3": {
    coordinators: [
      { name: "Dibya Prakash Subudhi", role: "coordinator", contact: "https://www.linkedin.com/in/dibya-prakash-subudhi/" },
      { name: "Lipika Ray", role: "coordinator", contact: "https://www.linkedin.com/in/lipika-ray-324995221/" }
    ],
    facultyAdvisors: [
      { name: "Mr. Anil Kumar murmu", designation: "Faculty Advisor" },
      { name: "Dr. Auro Kumar Sahoo ", designation: "Faculty Advisor" }
    ]
  },

  "4": {
    coordinators: [
      { name: "Prerana Priyadarsini Das ", role: "coordinator", contact: "https://www.linkedin.com/in/preranapriyadarsinidas/" },
      { name: "Gantyada Vasudev", role: "coordinator", contact: "https://www.linkedin.com/in/vasudev-gantyada-4ab91a292?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BKOC%2F6DLdTJ2z7UigHMxpwA%3D%3D" }
    ],
    facultyAdvisors: [
      { name: "Dr. Santi Behera", designation: "Faculty Advisor " },
      { name: "Ms.Lopamudra Ghadei ", designation: "Faculty Advisor " }
    ]
  },

  "5": {
    coordinators: [
      { name: "P. Padarabinda Dash ", role: "coordinator", contact: "https://www.linkedin.com/in/p-padarabinda-dash" },
      { name: "Ritika Mohapatra ", role: "coordinator", contact: "https://www.linkedin.com/in/ritika-mohapatra" },
      { name: "Sidharth Pattnaik ", role: "coordinator", contact: "https://www.linkedin.com/in/sidharth-pattnaik-478a3421a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
      { name: "Barsha Priyadarsini Rath ", role: "coordinator", contact: "https://www.linkedin.com/in/barsha-rath-9760ba22a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" }
    ],
    facultyAdvisors: [
      { name: "Dr. Madhusmita Pradhan ", designation: "Faculty Advisor " },
      { name: "Dr. Smita Padhan,Dept. of Production Engineering ", designation: "Faculty Advisor " },
      { name: "Dr. Lipsamayee Mishra ", designation: "Faculty Advisor " },
      { name: "Dr. Aruna Kumar Barick", designation: "Faculty Advisor " }
    ]
  },

  "6": {
    coordinators: [
      { name: "Chandan Kumar Panda", role: "coordinator", contact: "https://linkedin.com/in/chandan-kumar-panda-b85422364" },
      { name: "Swastika Patra ", role: "coordinator", contact: "https://www.linkedin.com/in/swastika-patra-796709272?utm_source=share_via&utm_content=profile&utm_medium=member_android" }
    ],
    facultyAdvisors: [
      { name: "Ms. Anisha Ekka", designation: "Faculty Advisor" }
    ]
  },

  "7": {
    coordinators: [
      { name: "Abhisek Bharadwaj", role: "coordinator", contact: "https://www.linkedin.com/in/abhisek-bharadwaj-6525642a1?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" }
    ],
    facultyAdvisors: [
      { name: "Dr. Sasmita Behera", designation: "Faculty Advisor " }
    ]
  },

  "8": {
    coordinators: [
      { name: "DEBIDATTA SAHOO", role: "coordinator", contact: "https://www.linkedin.com/in/debidatta-sahoo-bb9a42297?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
      { name: "AISHWARYA ", role: "coordinator", contact: "https://www.linkedin.com/in/aishwarya-228b9a28a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" }
    ],
    facultyAdvisors: [
      { name: "Ms. Jayanti Munda", designation: "Faculty Advisor" },
      { name: "Ms. Rupashree Ragini Sahoo", designation: "Faculty Advisor" }
    ]
  },

  "9": {
    coordinators: [
      { name: "Sai Priyadarshini Swain", role: "coordinator", contact: "https://www.linkedin.com/in/sai-priyadarshini-swain-18490a311?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
      { name: "Sai Priyadarshini Swain", role: "coordinator", contact: "https://www.linkedin.com/in/rudra-prasad-patra-bb8953307?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" }
    ],
    facultyAdvisors: [
      { name: "Dr. Bijay Kumar Sa", designation: "Faculty Advisor" },
      { name: "Dr. Sangeeta Sa", designation: "Faculty Advisor" }
    ]
  },

  "10": {
    coordinators: [
      { name: "Sai Sankar Patnaik", role: "coordinator", contact: "https://www.linkedin.com/in/sai-sankar-patnaik-7619b5277?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
      { name: "Subham Dash", role: "coordinator", contact: "https://www.linkedin.com/in/subham-dash-25787526a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" }
    ],
    facultyAdvisors: [
      { name: "Dr.Debasish Tripathy ", designation: "Faculty Advisor" }
    ]
  },

  "11": {
    coordinators: [
      { name: "Aadityavikas Goel", role: "coordinator", contact: "https://www.linkedin.com/in/aadityavikasgoel?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3Bjw0qknRITw2d7ZxKvHOD9A%3D%3D" },
      { name: "Kavita Kumari", role: "coordinator", contact: "https://www.linkedin.com/in/kavita-kumari-a10027324?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BFcOGhXBlTFiXm8XYMVhL6w%3D%3D" }
    ],
    facultyAdvisors: [
      { name: "Dr. Debasmita Mishra", designation: "Faculty Advisor" },
      { name: "Dr. Janaki Dehury", designation: "Faculty Advisor" }
    ]
  },
  "12": {
    coordinators: [
      { name: "Srinibas Das", role: "coordinator", contact: "ryota.inoue@vssut.ac.in" },
      { name: "Sonakshi Pradhan", role: "coordinator", contact: "kana.takagi@vssut.ac.in" }
    ],
    facultyAdvisors: [
      { name: "Dr. Gyanranjan Shial", designation: "Faculty Advisor" },
      { name: "Dr. Alina Dash", designation: "Faculty Advisor" }
    ]
  },

  "13": {
    coordinators: [
      { name: "Pradosh Kumar Rout", role: "coordinator", contact: "https://www.linkedin.com/in/pradosh-rout-2aa306314?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
      { name: "Shreyanshi Swain", role: "coordinator", contact: "https://www.linkedin.com/in/shreyanshi-swain-434b862a5?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" }
    ],
    facultyAdvisors: [
      { name: "Dr. Abhayaa Nayak", designation: "Faculty Advisor" },
      { name: "Mr. Atul Vikas Lakra", designation: "Faculty Advisor" }
    ]
  },

  "14": {
    coordinators: [
      { name: "Mahima Prasada Nayak", role: "coordinator", contact: "https://www.linkedin.com/in/mahima-prasada-nayak-177a21304?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
      { name: "Ipsita Nanda", role: "coordinator", contact: "https://www.linkedin.com/in/ipsita-22apr/" }
    ],
    facultyAdvisors: [
      { name: "Dr. Radhashyam Patra", designation: "Faculty Advisor " },
      { name: "Dr. Debidasi Mohanty", designation: "Faculty Advisor " }
    ]
  },
  "15": {
    coordinators: [
      { name: "Ryota Inoue", role: "coordinator", contact: "ryota.inoue@vssut.ac.in" },
      { name: "Kana Takagi", role: "coordinator", contact: "kana.takagi@vssut.ac.in" }
    ],
    facultyAdvisors: [
      { name: "Prof. A. Pradhan", designation: "Faculty Advisor" }
    ]
  },
  "16": {
    coordinators: [
      { name: "Ryota Inoue", role: "coordinator", contact: "ryota.inoue@vssut.ac.in" },
      { name: "Kana Takagi", role: "coordinator", contact: "kana.takagi@vssut.ac.in" }
    ],
    facultyAdvisors: [
      { name: "Prof. A. Pradhan", designation: "Faculty Advisor" }
    ]
  }

};
