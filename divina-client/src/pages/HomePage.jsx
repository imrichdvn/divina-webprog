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
              Welcome
            </p>
            <h1 className="max-w-xl text-3xl font-bold leading-tight text-neutral-900 sm:text-4xl">
              Find Your Perfect Dog Companion
            </h1>
            <p className="max-w-lg text-sm leading-7 text-neutral-600 sm:text-base">
              Explore loving dogs ready for adoption, learn pet care tips, and
              discover everything you need to give your furry friend a happy life.
            </p>
            <div className="mt-6">
              <Button to="/about" variant="primary">
                Explore Dogs
              </Button>
            </div>
          </div>

          <div className="relative min-h-64 overflow-hidden rounded-3xl border-2 border-dashed border-orange-200 bg-orange-50">
            <img
              src={heroLogo}
              alt="Happy dog"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="border-y-2 border-neutral-900 bg-white px-4 py-6 sm:px-6 sm:py-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-neutral-500">
          Quick overview
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-neutral-900">
          Our Community
        </h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Dogs Available", value: "12" },
            { label: "Adoptions", value: "08" },
            { label: "Happy Owners", value: "24" },
            { label: "Rescue Centers", value: "04" },
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
          Featured Dogs
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-neutral-900">
          Meet Your New Best Friend
        </h2>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Buddy",
              body: "A playful and friendly dog who loves walks and cuddles.",
              image: card1,
            },
            {
              title: "Max",
              body: "Loyal and protective, perfect for families and homes.",
              image: card2,
            },
            {
              title: "Bella",
              body: "Gentle and sweet, she enjoys quiet time and affection.",
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
                View Profile
              </Button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;