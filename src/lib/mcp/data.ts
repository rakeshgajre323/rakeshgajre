// Public portfolio content exposed over MCP. Nothing here is private:
// it mirrors what any visitor already sees on the site.

export const profile = {
  name: "Rakesh Gajre",
  role: "UI/UX Designer & CS Engineer",
  summary:
    "UI/UX designer and CS engineer designing intuitive digital experiences through research, interaction design, and user-centered thinking.",
  email: "rakeshgajre.work@gmail.com",
  website: "https://rakeshgajreportfolio.live",
  hireUrl: "https://rakeshgajreportfolio.live/hire",
  tools: ["Figma", "Adobe XD", "Canva", "Notion", "GitHub", "Vercel", "Lovable"],
  socials: [
    { label: "Instagram", url: "https://www.instagram.com/rakesh_gajre" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/rakesh-gajre-1bba71257/" },
    { label: "GitHub", url: "https://github.com/rakeshgajre323" },
  ],
} as const;

export const projects = [
  { id: "01", name: "OriginCerti — Blockchain Credentials", year: "2025", url: "https://origincerti.lovable.app" },
  { id: "02", name: "Student Tribe Internship Work", year: "2026", url: null },
  { id: "03", name: "Campus Dashboard Concept", year: "2025", url: null },
  { id: "04", name: "Wellness Mobile App", year: "2024", url: null },
  { id: "05", name: "Design System — Atlas UI", year: "2024", url: null },
  { id: "06", name: "Logo Marks & Identity Studies", year: "2023", url: null },
] as const;

export const certificationCategories = ["UI/UX", "Technology", "AI", "BANKING", "Marketing"] as const;

export const certifications = [
  { title: "Generative AI Foundations", issuer: "UpGrad × Microsoft", date: "2024", category: "AI", url: "https://certificates.upgrad.com/840ccdbb-9cf8-4562-a3c0-146af56e1caf-Gen-AI-jTMvFhyg8IYH4Qco.jpeg" },
  { title: "Prompt to Prototype", issuer: "Google Startup School", date: "2024", category: "AI", url: "https://drive.google.com/file/d/1ylFu9i7k0kzFECX0TtYvdRjq4-5BH4sg/view?usp=sharing" },
  { title: "Cybersecurity Certification", issuer: "Tech Mahindra", date: "2024", category: "Technology", url: "https://courses.skillindiadigital.gov.in/api/custom_api/view_certificate/e87d68c3b2dd4f0a870513d22dc72661" },
  { title: "Foundation Course in Finance", issuer: "Reliance Foundation", date: "2023", category: "BANKING", url: "https://drive.google.com/file/d/1J3G8AoqD0jBBmKXF_Xq1RSvQ_F_iLDI7/view" },
  { title: "Branch Banking Executive", issuer: "NSDC", date: "2023", category: "BANKING", url: "https://courses.skillindiadigital.gov.in/api/custom_api/view_certificate/c3840e379d104884b60013902352e937" },
  { title: "Microsoft Excel", issuer: "Coursera", date: "2023", category: "Technology", url: "https://www.coursera.org/account/accomplishments/certificate/NQW69DUGMRGD" },
  { title: "Fundamentals of Digital Marketing", issuer: "Google", date: "2023", category: "Marketing", url: "https://drive.google.com/file/d/1ClSCnYvReDnCZsgj7L_2OjDjRPtNDYAd/view" },
  { title: "Logo Design with Canva", issuer: "Coursera", date: "2023", category: "UI/UX", url: "https://www.coursera.org/account/accomplishments/verify/GPHT69EUFNEB" },
] as const;
