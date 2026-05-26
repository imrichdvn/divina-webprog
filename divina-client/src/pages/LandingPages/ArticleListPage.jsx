import Button from '../../components/Button';
import ArticleList from '../../components/ArticleList';
import articles from '../../data/article-content.js';

const ArticleListPage = () => {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header Section */}
      <section className="rounded-[2rem] border-2 border-neutral-900 bg-neutral-900 p-8 text-white sm:p-12">
        <div className="max-w-2xl">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.3em] text-orange-400">
            The Dog Owner's Handbook
          </p>
          <h1 className="text-4xl font-black leading-tight sm:text-5xl">
            Guides, Tips & <span className="italic text-orange-400">Tail-Wagging</span> Advice
          </h1>
          <p className="mt-6 text-lg text-neutral-400">
            Whether you are a first-time puppy owner or a seasoned dog lover, our 
            vetted guides cover everything from nutrition to behavioral training.
          </p>
          <div className="mt-10">
            <Button to="/" variant="secondary" className="border-none bg-orange-500 text-white hover:bg-orange-600">
              Back to Home
            </Button>
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="py-8">
        <div className="mb-10 flex items-center justify-between border-b-2 border-neutral-900 pb-4">
          <h2 className="text-2xl font-black text-neutral-900 uppercase tracking-tighter">
            Latest Articles
          </h2>
          <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">
            {articles.length} Resources Available
          </span>
        </div>

        {/* The component that maps through your dog-themed articles */}
        <ArticleList articles={articles} />
      </section>
    </div>
  );
};

export default ArticleListPage;