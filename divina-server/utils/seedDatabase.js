const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Article = require('../models/Article');

const defaultArticles = [
  {
    slug: 'puppy-training-basics',
    title: 'Puppy Training 101: The First Week',
    imageKey: '1',
    content: [
      'Bringing a new puppy home is exciting but can be overwhelming. The first week is crucial for setting boundaries and building trust.',
      'Start with simple commands like "sit" and "stay," and ensure you have a consistent potty schedule to avoid accidents.',
      'Positive reinforcement—using treats and praise—is the most effective way to encourage good behavior in young dogs.',
    ],
  },
  {
    slug: 'nutrition-guide',
    title: 'Choosing the Right Diet for Your Dog',
    imageKey: '2',
    content: [
      'Every dog has unique nutritional needs based on their age, breed, and activity level.',
      'High-quality protein should be the first ingredient in any dog food. Avoid fillers like corn and soy if your dog has a sensitive stomach.',
      'Consulting with your vet can help determine if a raw, wet, or dry kibble diet is best for your furry friend.',
    ],
  },
  {
    slug: 'grooming-essentials',
    title: 'Essential Grooming Tips for All Breeds',
    imageKey: '3',
    content: [
      'Regular grooming is about more than just looking good; it is essential for your dog’s health.',
      'Brushing helps distribute natural oils and removes loose fur, while regular nail trims prevent discomfort while walking.',
      'Don’t forget dental hygiene! Brushing your dog’s teeth regularly can prevent costly vet visits for dental disease.',
    ],
  },
  {
    slug: 'exercise-and-health',
    title: 'The Importance of Daily Exercise',
    imageKey: '4',
    content: [
      'A tired dog is a happy dog. Physical activity prevents obesity and reduces destructive behaviors caused by boredom.',
      'Different breeds require different levels of activity. While a Border Collie might need a long run, a Pug might be happy with a brisk walk.',
      'Mental exercise is just as important—try puzzle toys or hide-and-seek to keep their brains sharp.',
    ],
  },
  {
    slug: 'adoption-benefits',
    title: 'Why Adoption is a Great Choice',
    imageKey: '5',
    content: [
      'Adopting a dog saves lives and gives a second chance to animals in need.',
      'Shelter dogs are often already house-trained and their personalities are well-known by the staff.',
      'When you adopt, you aren’t just getting a pet; you’re becoming a hero to a dog that needs a home.',
    ],
  },
];

const seedDatabase = async () => {
  try {
    const articleCount = await Article.countDocuments();
    if (articleCount === 0) {
      await Article.insertMany(
        defaultArticles.map((article) => ({
          ...article,
          preview: article.content[0],
          status: 'active',
        })),
      );
      console.log('Default articles seeded');
    }

    const userCount = await User.countDocuments();
    if (userCount === 0) {
      const hashedPassword = await bcrypt.hash('Sebastian123!', 10);
      await User.create({
        firstName: 'Sebastian',
        lastName: 'Divina',
        age: '22',
        gender: 'male',
        contactNumber: '09167589562',
        email: 'sebastian.divina@gmail.com',
        type: 'admin',
        username: 'sebastiandivina',
        password: hashedPassword,
        address: 'Tondo, Manila, Metro Manila',
        isActive: true,
      });
      console.log('Default admin user seeded');
    }
  } catch (error) {
    console.error('Seed error:', error.message);
  }
};

module.exports = seedDatabase;
