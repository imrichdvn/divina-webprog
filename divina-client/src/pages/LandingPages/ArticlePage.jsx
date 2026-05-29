import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../../components/Button';
import fallbackArticles from '../../data/article-content.js';
import { fetchArticles } from '../../services/ArticleService';
import { formatArticleForDisplay } from '../../utils/articleImages';

function ArticlePage() {
  const { name } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticle = async () => {
      try {
        const { data } = await fetchArticles();
        const match = (data.articles || []).find((item) => item.slug === name);
        setArticle(match ? formatArticleForDisplay(match) : null);
      } catch {
        const fallback = fallbackArticles.find((item) => item.name === name);
        setArticle(fallback || null);
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [name]);

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center text-neutral-500 sm:px-6 lg:px-8">
        Loading article…
      </div>
    );
  }

  if (!article) {
    return (
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <section className="rounded-[2rem] border-2 border-neutral-900 bg-white p-8">
          <h1 className="text-3xl font-black text-neutral-900">Article not found</h1>
          <Button to="/articles" className="mt-6">
            Back to Articles
          </Button>
        </section>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] border-2 border-neutral-900 bg-stone-50 p-8 sm:p-10">
        <Button to="/articles">Back to Articles</Button>
        <p className="mb-3 mt-6 text-[11px] font-bold uppercase tracking-[0.28em] text-orange-600">Article</p>
        <h1 className="text-3xl font-black leading-tight text-neutral-900 sm:text-4xl">{article.title}</h1>
      </section>

      <section className="mt-6 rounded-[2rem] border-2 border-neutral-900 bg-white p-8 sm:p-10">
        <div className="mb-8 aspect-[4/3] overflow-hidden rounded-3xl border-2 border-neutral-900 bg-orange-50">
          <img src={article.imageUrl} alt={article.title} className="h-full w-full object-cover" />
        </div>

        <div className="space-y-4 text-base leading-7 text-neutral-700">
          {article.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-8 border-t-2 border-neutral-900 pt-6">
          <Button to="/articles" variant="primary">
            Back to Articles
          </Button>
        </div>
      </section>
    </div>
  );
}

export default ArticlePage;
