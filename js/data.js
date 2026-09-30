/* ==========================================================
   EDIT THIS FILE to change projects, students and skills.
   ========================================================== */

window.PROFILE = {
  name: "Aswin K Anil",
  email: "aswinkanil21@gmail.com",
  phone: "+91 77366 71519",
  github: "https://github.com/aswin77-lab",
  location: "Kerala, India",
  roles: [
    "Python Developer at Wistora IQ Solutions",
    "Django and REST API builder",
    "Teacher at Wistora",
    "Freelancer for students and clients",
    "Machine Learning learner"
  ]
};

/* kind: "fl" = freelance, "ac" = academic, "ml" = machine learning */
window.PROJECTS = [
  { kind:"fl", title:"Cloud-Based Multimedia Content Protection System",
    text:"Secure content access and management platform, built for a student client.",
    tags:["Django","Python","Security"] },
  { kind:"fl", title:"SSL Checker",
    text:"A Python tool that checks a website's SSL certificate and reports whether it is valid.",
    tags:["Python","SSL","Networking"] },
  { kind:"fl", title:"Food Delivery App",
    text:"Order management and delivery workflow for a food delivery service.",
    tags:["Django","MySQL","Bootstrap"] },
  { kind:"fl", title:"Train Food Delivery System",
    text:"Lets passengers order food and have it delivered on the train.",
    tags:["Django","REST API"] },
  { kind:"fl", title:"Tourism Management System",
    text:"Handles travel bookings and tourism-related services in one place.",
    tags:["Django","MySQL"] },
  { kind:"fl", title:"ERP Projects",
    text:"Full-stack ERP systems tailored to business needs to improve day-to-day operations.",
    tags:["Django","PostgreSQL","Bootstrap"] },
  { kind:"fl", title:"Hostel Management System",
    text:"Hostel administration and student management, from room allocation to records.",
    tags:["Django","SQLite"] },
  { kind:"ml", title:"Alzheimer's Guardian",
    text:"Uses machine learning to help patients with reminders and location tracking.",
    tags:["Machine Learning","Python","Django"] },
  { kind:"ac", title:"Disease-Based Food Recommendation System",
    text:"Analyses dietary needs with SVM and Random Forest models and recommends food based on a person's medical condition.",
    tags:["SVM","Random Forest","Scikit-learn"] },
  { kind:"ac", title:"Plant Disease Detection using CNN",
    text:"Deep learning model built on the ResNet architecture that detects plant disease and assesses its severity.",
    tags:["CNN","TensorFlow","PyTorch","OpenCV"] }
];

window.KIND_LABEL = { fl:"Freelance", ac:"Academic", ml:"Machine Learning" };

/* Skills shown on the 3D cube */
window.CUBE = {
  front:  ["Languages", "Python, JavaScript, Java, SQL, HTML, CSS"],
  right:  ["Backend", "Django, Flask, REST APIs"],
  back:   ["Databases", "MySQL, PostgreSQL, MongoDB, SQLite"],
  left:   ["ML and Data", "Scikit-learn, TensorFlow, PyTorch, OpenCV, NumPy, Pandas"],
  top:    ["Tools", "Git, GitHub, Agile and Scrum"],
  bottom: ["Frontend", "React.js, Bootstrap"]
};

/* ---------- TEACHING PAGE ----------
   Replace these sample entries with your real students.
   photo: optional path, e.g. "assets/students/riya.jpg"
   Remove the entries you do not need. */
window.STUDENTS = [
  { name:"Jithu Mon", course:"Python & Django Developer", note:"Developing with Python and Django.", photo:"assets/WhatsApp Image 2026-09-30 at 10.15.31 AM.jpeg" },
  { name:"Haseena KT", course:"Python & Django Developer", note:"Developing with Python and Django.", photo:"assets/WhatsApp Image 2026-09-30 at 10.15.32 AM.jpeg" }
];
