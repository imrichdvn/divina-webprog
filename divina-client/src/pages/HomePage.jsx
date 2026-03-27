import Button from "../components/Button";
import heroLogo from "../assets/hero/hero.jpg";
import card1 from "../assets/cards/1.jpg";
import card2 from "../assets/cards/2.jpg";
import card3 from "../assets/cards/3.jpg";

const HomePage = () => {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <section className="border-y-2 border-neutral-900 bg-white px-4 py-6 sm:px-6 sm:py-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="space-y-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-neutral-500">
              Hero Section
            </p>
            <h1 className="max-w-xl text-3xl font-bold leading-tight text-neutral-900 sm:text-4xl">
              Welcome to Wireframe Studio Layout
            </h1>
            <p className="max-w-lg text-sm leading-7 text-neutral-600 sm:text-base">
              Discover the art of wireframing with a simple layout system for
              hero content, key numbers, and feature cards.
            </p>
            <div className="mt-6">
              <Button to="/about" variant="primary">
                Learn More
              </Button>
            </div>
          </div>

          <div className="relative min-h-64 overflow-hidden rounded-3xl border-2 border-dashed border-orange-200 bg-orange-50">
            <img
              src={heroLogo}
              alt="Orange logo"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="border-y-2 border-neutral-900 bg-white px-4 py-6 sm:px-6 sm:py-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-neutral-500">
          Quick overview blocks
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-neutral-900">
          Projects
        </h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Projects", value: "12" },
            { label: "Sections", value: "08" },
            { label: "Screens", value: "24" },
            { label: "Layouts", value: "04" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-3xl border-2 border-neutral-900 bg-orange-50 p-5"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-neutral-500">
                {item.label}
              </p>
              <p className="mt-2 text-2xl font-bold text-neutral-900">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y-2 border-neutral-900 bg-white px-4 py-6 sm:px-6 sm:py-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-neutral-500">
          Feature Cards
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-neutral-900">
          Simple wireframe cards
        </h2>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Feature Card One",
              body: "A clean placeholder for title, short copy, and action.",
              image: card1,
            },
            {
              title: "Feature Card Two",
              body: "Balanced spacing keeps the card layout easy to scan.",
              image: card2,
            },
            {
              title: "Feature Card Three",
              body: "Repeated blocks give the page a consistent wireframe rhythm.",
              image: card3,
            },
          ].map((card) => (
            <article
              key={card.title}
              className="rounded-3xl border-2 border-neutral-900 bg-orange-50 p-5"
            >
              <div className="relative flex aspect-4/3 items-center justify-center overflow-hidden rounded-[1.25rem] bg-orange-100">
                {card.image ? (
                  <img
                    src={card.image}
                    alt={card.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-12 w-12 border-2 border-orange-200 bg-white" />
                )}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-neutral-900">
                {card.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-neutral-600">
                {card.body}
              </p>
              <Button className="mt-4" variant="primary">
                View More
              </Button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
