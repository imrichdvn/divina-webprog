import Button from "../components/Button";
import heroLogo from "../assets/hero/hero.jpg";
import card1 from "../assets/cards/1.jpg";
import card2 from "../assets/cards/2.jpg";
import card3 from "../assets/cards/3.jpg";

const HomePage = () => {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="rounded-[2rem] border-2 border-neutral-900 bg-white p-6 sm:p-10 lg:p-12">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-orange-600">
              Welcome to Paws & Claws
            </p>
            <h1 className="text-4xl font-black leading-[1.1] text-neutral-900 sm:text-5xl lg:text-6xl">
              Find Your New <span className="text-orange-500 underline decoration-neutral-900 underline-offset-4">Best Friend</span>
            </h1>
            <p className="max-w-lg text-base leading-relaxed text-neutral-600 sm:text-lg">
              We connect loving dogs with caring families. Explore our current rescues, 
              learn essential care tips, and join a community dedicated to animal welfare.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button to="/articles" variant="primary" className="px-8 py-4">
                Explore Care Guides
              </Button>
              <Button to="/about" className="px-8 py-4">
                Our Mission
              </Button>
            </div>
          </div>

          <div className="relative aspect-square overflow-hidden rounded-3xl border-2 border-neutral-900 bg-orange-50 shadow-[12px_12px_0px_0px_rgba(255,145,77,0.2)]">
            <img
              src={heroLogo}
              alt="A happy, smiling dog"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Community Stats */}
      <section className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Dogs Rescued", value: "150+" },
          { label: "Successful Adoptions", value: "124" },
          { label: "Active Volunteers", value: "45" },
          { label: "Partner Shelters", value: "12" },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-3xl border-2 border-neutral-900 bg-white p-6 transition-transform hover:-translate-y-1"
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-neutral-400">
              {item.label}
            </p>
            <p className="mt-2 text-3xl font-black text-neutral-900">
              {item.value}
            </p>
          </div>
        ))}
      </section>

      {/* Featured Dogs Section */}
      <section className="mt-16 py-12">
        <div className="mb-10 flex flex-col items-center text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-orange-600">
            Adoptable Pups
          </p>
          <h2 className="mt-2 text-3xl font-black text-neutral-900 sm:text-4xl">
            Meet Our Residents
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              title: "Buddy",
              desc: "A golden ball of energy who loves fetch and long walks.",
              image: card1,
            },
            {
              title: "Max",
              desc: "Loyal, calm, and highly trained. The perfect family protector.",
              image: card2,
            },
            {
              title: "Bella",
              desc: "A sweet soul who enjoys quiet afternoons and belly rubs.",
              image: card3,
            },
          ].map((card) => (
            <article
              key={card.title}
              className="group rounded-3xl border-2 border-neutral-900 bg-white p-5 transition-all hover:shadow-[8px_8px_0px_0px_rgba(24,24,27,1)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border-2 border-neutral-900 bg-orange-50">
                <img
                  src={card.image}
                  alt={card.title}
                  className="h-full w-full object-cover grayscale transition-all group-hover:grayscale-0"
                />
              </div>
              <h3 className="mt-5 text-2xl font-bold text-neutral-900">
                {card.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                {card.desc}
              </p>
              <Button to="/about" className="mt-6 w-full" variant="primary">
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