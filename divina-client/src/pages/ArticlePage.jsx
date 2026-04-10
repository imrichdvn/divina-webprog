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
            Dog Articles
          </p>
          <h1 className="mt-2 text-3xl font-bold leading-tight text-neutral-900 sm:text-4xl">
            Tips, Guides & Stories for Dog Lovers
          </h1>
          <p className="mt-4 text-sm leading-7 text-neutral-600 sm:text-base">
            Learn how to care for your dog, discover training tips, and read
            heartwarming stories from fellow dog owners.
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
          Featured Guides
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-neutral-900">
          Latest Dog Articles
        </h2>

        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3 mx-auto max-w-5xl">
          {[
            {
              title: "How to Train Your Dog",
              body: "Simple and effective techniques to teach your dog basic commands and good behavior.",
              image: card1,
            },
            {
              title: "Dog Nutrition Basics",
              body: "Learn what to feed your dog to keep them healthy, active, and full of energy.",
              image: card2,
            },
            {
              title: "Caring for Puppies",
              body: "A beginner’s guide to raising a happy, healthy puppy from day one.",
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
                Dog Care
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