// article-content.js
import img1 from './cards/1.jpg';
import img2 from './cards/2.jpg';
import img3 from './cards/3.jpg';
import img4 from './cards/4.jpg';
import img5 from './cards/5.jpg';

const articles = [
  {
    name: 'puppy-training-basics',
    title: 'Puppy Training 101: The First Week',
    imageUrl: img1,
    content: [
      'Bringing a new puppy home is exciting but can be overwhelming. The first week is crucial for setting boundaries and building trust.',
      'Start with simple commands like "sit" and "stay," and ensure you have a consistent potty schedule to avoid accidents.',
      'Positive reinforcement—using treats and praise—is the most effective way to encourage good behavior in young dogs.',
    ],
  },
  {
    name: 'nutrition-guide',
    title: 'Choosing the Right Diet for Your Dog',
    imageUrl: img2,
    content: [
      'Every dog has unique nutritional needs based on their age, breed, and activity level.',
      'High-quality protein should be the first ingredient in any dog food. Avoid fillers like corn and soy if your dog has a sensitive stomach.',
      'Consulting with your vet can help determine if a raw, wet, or dry kibble diet is best for your furry friend.',
    ],
  },
  {
    name: 'grooming-essentials',
    title: 'Essential Grooming Tips for All Breeds',
    imageUrl: img3,
    content: [
      'Regular grooming is about more than just looking good; it is essential for your dog’s health.',
      'Brushing helps distribute natural oils and removes loose fur, while regular nail trims prevent discomfort while walking.',
      'Don’t forget dental hygiene! Brushing your dog’s teeth regularly can prevent costly vet visits for dental disease.',
    ],
  },
  {
    name: 'exercise-and-health',
    title: 'The Importance of Daily Exercise',
    imageUrl: img4,
    content: [
      'A tired dog is a happy dog. Physical activity prevents obesity and reduces destructive behaviors caused by boredom.',
      'Different breeds require different levels of activity. While a Border Collie might need a long run, a Pug might be happy with a brisk walk.',
      'Mental exercise is just as important—try puzzle toys or hide-and-seek to keep their brains sharp.',
    ],
  },
  {
    name: 'adoption-benefits',
    title: 'Why Adoption is a Great Choice',
    imageUrl: img5,
    content: [
      'Adopting a dog saves lives and gives a second chance to animals in need.',
      'Shelter dogs are often already house-trained and their personalities are well-known by the staff.',
      'When you adopt, you aren’t just getting a pet; you’re becoming a hero to a dog that needs a home.',
    ],
  },
];

export default articles;