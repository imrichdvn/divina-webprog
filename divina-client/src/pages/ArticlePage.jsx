import Button from "../components/Button";
import card1 from "../assets/cards/1.jpg";
import card2 from "../assets/cards/2.jpg";
import card3 from "../assets/cards/3.jpg";

const ArticlePage = () => {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <section className="border-y-2 border-neutral-900 bg-white px-4 py-6 sm:px-6 sm:py-8">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-neutral-500">
            Articles
          </p>
          <h1 className="mt-2 text-3xl font-bold leading-tight text-neutral-900 sm:text-4xl">
            Featured articles in a simple card grid
          </h1>
          <p className="mt-4 text-sm leading-7 text-neutral-600 sm:text-base">
            Use these cards to practice layout basics: consistent spacing, short
            descriptions, and clear actions per card.
          </p>

          <div className="mt-6">
            <Button to="/" variant="primary">
              Back Home
            </Button>
          </div>
        </div>
      </section>

      <section className="border-y-2 border-neutral-900 bg-white px-4 py-6 sm:px-6 sm:py-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-neutral-500">
          Featured Articles
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-neutral-900">
          Article cards
        </h2>

        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3 mx-auto max-w-5xl">
          {[
            {
              title: "Article One",
              body: "A simple placeholder for a featured article with image, title, and copy.",
              image: card1,
            },
            {
              title: "Article Two",
              body: "Build clean sections and text-leading to keep layout readable.",
              image: card2,
            },
            {
              title: "Article Three",
              body: "Using a shared pattern makes each card section easy to scan.",
              image: card3,
            },
          ].map((article) => (
            <article
              key={article.title}
              className="rounded-3xl border-2 border-neutral-900 bg-orange-50 p-5"
            >
              <div className="relative flex aspect-4/3 items-center justify-center overflow-hidden rounded-[1.25rem] bg-orange-100">
                <img
                  src={article.image}
                  alt={article.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-neutral-500">
                Featured
              </p>
              <h3 className="mt-2 text-lg font-semibold text-neutral-900">
                {article.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-neutral-600">
                {article.body}
              </p>
              <Button className="mt-4" variant="primary">
                Read More
              </Button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ArticlePage;
