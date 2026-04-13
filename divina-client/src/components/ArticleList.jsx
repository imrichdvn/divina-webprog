import { Link } from 'react-router-dom';
import Button from './Button';

const ArticleList = ({ articles }) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {articles.map((article, index) => (
        <article
          key={article.name}
          className="flex flex-col rounded-3xl border-2 border-neutral-900 bg-white p-5 transition-all duration-300 hover:bg-orange-50 hover:shadow-[8px_8px_0px_0px_rgba(24,24,27,1)]"
        >
          {/* Use article.imageUrl here to match your data file */}
          <div className="relative aspect-4/3 w-full overflow-hidden rounded-[1.25rem] border-2 border-neutral-900 bg-orange-50">
            {article.imageUrl ? (
              <img
                src={article.imageUrl}
                alt={article.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <div className="h-12 w-12 border-2 border-dashed border-orange-200 bg-white/50" />
              </div>
            )}
          </div>

          <div className="mt-5 flex flex-grow flex-col">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-neutral-400">
              Article {String(index + 1).padStart(2, '0')}
            </p>

            <h3 className="mt-2 text-xl font-bold leading-tight text-neutral-900">
              {article.title}
            </h3>

            <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-neutral-600">
              {article.content[0]}
            </p>
          </div>

          <div className="mt-6">
            <Link to={`/articles/${article.name}`} className="block w-full">
              <Button variant="primary" className="w-full">
                Read More
              </Button>
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
};

export default ArticleList;
