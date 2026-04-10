import Button from "../components/Button";
import about from "../assets/about/about.png";
import card1 from "../assets/articles/11.jpg";
import card2 from "../assets/articles/22.jpg";
import card3 from "../assets/articles/33.jpg";
import card4 from "../assets/articles/44.jpg";

const AboutPage = () => {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <section className="border-y-2 border-neutral-900 bg-white px-4 py-6 sm:px-6 sm:py-8">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
          <div className="relative min-h-72 overflow-hidden rounded-3xl border-2 border-dashed border-orange-200 bg-orange-50">
            <img
              src={about}
              alt="Dogs playing"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-neutral-500">
              About Us
            </p>
            <h1 className="max-w-xl text-3xl font-bold leading-tight text-neutral-900 sm:text-4xl">
              Dedicated to Helping Dogs Find Loving Homes
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-neutral-600 sm:text-base">
              We are passionate about connecting dogs with caring families.
              Our mission is to promote adoption, responsible pet ownership,
              and provide helpful resources for every dog lover.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/" variant="primary">
                Back Home
              </Button>
              <Button to="/articles">Read Dog Articles</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y-2 border-neutral-900 bg-white px-4 py-6 sm:px-6 sm:py-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-neutral-500">
          Our Impact
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-neutral-900">
          Community Overview
        </h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Dogs Rescued", value: "120+" },
            { label: "Adoptions", value: "95" },
            { label: "Volunteers", value: "30" },
            { label: "Partner Shelters", value: "8" },
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

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          
          {/* Left side */}
          <div>
            <p className="text-[.11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Our Mission
            </p>

            <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
              What We Do for Dogs
            </h2>

            <div className="mt-6 space-y-4">
              
              <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                <h3 className="text-lg font-semibold text-zinc-900">
                  Rescue & Adoption
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  We help rescue abandoned dogs and connect them with loving
                  families ready to adopt.
                </p>
              </article>

              <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                <h3 className="text-lg font-semibold text-zinc-900">
                  Education & Training
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  Providing guidance on training, behavior, and responsible
                  pet ownership for all dog owners.
                </p>
              </article>

              <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                <h3 className="text-lg font-semibold text-zinc-900">
                  Health & Care
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  Sharing essential tips on dog health, nutrition, and overall
                  well-being.
                </p>
              </article>

            </div>
          </div>

          {/* Right side */}
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            
            <p className="text-[.11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Happy Dogs
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: "Buddy",
                  body: "Now happily adopted and living with a loving family.",
                  image: card1,
                },
                {
                  title: "Max",
                  body: "A playful dog who found his forever home.",
                  image: card2,
                },
                {
                  title: "Bella",
                  body: "Enjoying a peaceful and happy life with her owners.",
                  image: card3,
                },
                {
                  title: "Charlie",
                  body: "Rescued and now thriving in a caring environment.",
                  image: card4,
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="overflow-hidden rounded-[1.25rem] bg-zinc-200"
                >
                  <div className="relative aspect-square">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="p-3">
                    <h4 className="text-sm font-semibold text-zinc-900">
                      {item.title}
                    </h4>
                    <p className="mt-1 text-xs text-zinc-600">
                      {item.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button className="mt-5">View More Stories</button>
          </div>

        </div>
      </section>
    </div>
  );
};

export default AboutPage;