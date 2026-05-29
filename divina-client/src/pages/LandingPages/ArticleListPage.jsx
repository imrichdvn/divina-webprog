import { useEffect, useState } from 'react';
import Button from '../../components/Button';
import ArticleList from '../../components/ArticleList';
import fallbackArticles from '../../data/article-content.js';
import { fetchArticles } from '../../services/ArticleService';
import { formatArticleForDisplay } from '../../utils/articleImages';

const ArticleListPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const { data } = await fetchArticles();
        const mapped = (data.articles || []).map(formatArticleForDisplay);
        setArticles(mapped);
      } catch {
        setArticles(fallbackArticles);
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, []);

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] border-2 border-neutral-900 bg-neutral-900 p-8 text-white sm:p-12">
        <div className="max-w-2xl">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.3em] text-orange-400">
            The Dog Owner&apos;s Handbook
          </p>
          <h1 className="text-4xl font-black leading-tight sm:text-5xl">
            Guides, Tips & <span className="italic text-orange-400">Tail-Wagging</span> Advice
          </h1>
          <p className="mt-6 text-lg text-neutral-400">
            Whether you are a first-time puppy owner or a seasoned dog lover, our vetted guides cover
            everything from nutrition to behavioral training.
          </p>
          <div className="mt-10">
            <Button to="/" variant="secondary" className="border-none bg-orange-500 text-white hover:bg-orange-600">
              Back to Home
            </Button>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="mb-10 flex items-center justify-between border-b-2 border-neutral-900 pb-4">
          <h2 className="text-2xl font-black uppercase tracking-tighter text-neutral-900">Latest Articles</h2>
          <span className="text-[11px] font-bold uppercase tracking-widest text-neutral-400">
            {loading ? 'Loading…' : `${articles.length} Resources Available`}
          </span>
        </div>

        {loading ? (
          <p className="text-center text-neutral-500">Loading care guides…</p>
        ) : (
          <ArticleList articles={articles} />
        )}
      </section>
    </div>
  );
};

export default ArticleListPage;
