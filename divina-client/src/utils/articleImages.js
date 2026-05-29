import img1 from '../assets/cards/1.jpg';
import img2 from '../assets/cards/2.jpg';
import img3 from '../assets/cards/3.jpg';
import img4 from '../assets/cards/4.jpg';
import img5 from '../assets/cards/5.jpg';

const imageMap = {
  '1': img1,
  '2': img2,
  '3': img3,
  '4': img4,
  '5': img5,
};

export function resolveArticleImage(imageKey) {
  return imageMap[imageKey] || img1;
}

export function formatArticleForDisplay(article) {
  return {
    _id: article._id,
    name: article.slug,
    slug: article.slug,
    title: article.title,
    content: article.content || [],
    preview: article.preview || article.content?.[0] || '',
    imageUrl: resolveArticleImage(article.imageKey),
    imageKey: article.imageKey || '1',
    status: article.status || 'active',
  };
}
