import img1 from './cards/1.jpg';
import img2 from './cards/2.jpg';
import img3 from './cards/3.jpg';
import img4 from './cards/4.jpg'; // Fix: sidebar shows 4.png is in 'cards'
import img5 from './cards/5.jpg';

const articles = [
  {
    name: 'lab-act-3-overview',
    title: 'Building Lab Activity 3: A React Journey',
    imageUrl: img1,
    content: [
      'This project was developed as part of the Web Programming course to master React functional components and dynamic routing.',
      'Using the latest React features, we built a modular architecture that separates page views from reusable UI components.',
      'The core goal was to create a seamless Single Page Application (SPA) where content is managed through structured data objects.',
    ],
  },
  {
    name: 'styling-with-tailwind-css',
    title: 'Modern Styling with Tailwind CSS',
    imageUrl: img2,
    content: [
      'For this project, we moved away from traditional CSS and embraced Tailwind CSS, a utility-first framework.',
      'By using classes like "border-y-2", "bg-orange-50", and "grid-cols", we were able to build a consistent wireframe aesthetic without writing a single line of custom CSS.',
      'Responsive design was handled using Tailwind’s mobile-first breakpoints (sm:, md:, lg:), ensuring the lab project looks great on any screen size.',
    ],
  },
  {
    name: 'dynamic-routing-mastery',
    title: 'Mastering React Router DOM',
    imageUrl: img3,
    content: [
      'Navigation is handled by react-router-dom, specifically using the createBrowserRouter and RouterProvider patterns.',
      'We implemented dynamic segments (:name) to allow a single ArticlePage component to render different content based on the URL.',
      'This approach makes the application highly scalable; adding a new article is as simple as adding a new object to our data file.',
    ],
  },
  {
    name: 'component-architecture',
    title: 'Atomic Design & Components',
    imageUrl: img4,
    content: [
      'The folder structure follows an atomic-inspired design, splitting the app into /components (like Button and Footer) and /pages.',
      'Reusable components allow us to maintain a "Single Source of Truth," making global changes (like changing a button color) fast and efficient.',
      'Props are utilized to pass article data and styling variants throughout the application tree.',
    ],
  },
  {
    name: 'git-workflow-essentials',
    title: 'Version Control and Git Workflow',
    imageUrl: img5,
    content: [
      'Every major update in this lab activity was tracked using Git. Setting up user.email and user.name was the first step in establishing a professional workflow.',
      'Commands like git add, git commit, and git push became second nature while managing the code for this school project.',
      'Version control ensures that we can experiment with new UI designs while always having a stable point to return to.',
    ],
  },
];

export default articles;
