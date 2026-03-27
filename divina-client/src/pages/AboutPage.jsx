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
              alt="Orange logo"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-neutral-500">
              About Section
            </p>
            <h1 className="max-w-xl text-3xl font-bold leading-tight text-neutral-900 sm:text-4xl">
              A profile wireframe focused on layout, spacing, and content
              grouping.
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-neutral-600 sm:text-base">
              This page follows the same low-fidelity system as the homepage
              with a simple hero, overview blocks, and supporting sections for
              profile details.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/" variant="primary">
                Back Home
              </Button>
              <Button to="/articles">Open Articles</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y-2 border-neutral-900 bg-white px-4 py-6 sm:px-6 sm:py-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-neutral-500">
          Profile Overview
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-neutral-900">
          Quick summary blocks
        </h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Years", value: "6" },
            { label: "Projects", value: "16" },
            { label: "Clients", value: "21" },
            { label: "Focus Areas", value: "8" },
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
{/* after quick summary blocks */}

          
    <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
  <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
    
    {/* Left side */}
    <div>
      <p className="text-[.11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
        Section Flow
      </p>

      <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
        Stacked content wireframe/h2
      </h2>

      <div className="mt-6 space-y-4">
        
        <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
          <h3 className="text-lg font-semibold text-zinc-900">
            Intro Block/h3
          </h3>
          <p className="mt-3 text-sm leading-6 text-zinc-600">
            A simple opening area for biography, role, or supporting information.
          </p>
        </article>

        <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
          <h3 className="text-lg font-semibold text-zinc-900">
            Experience Block/h3
          </h3>
          <p className="mt-3 text-sm leading-6 text-zinc-600">
            Repeated section styling keeps the page readable and easy to extend.
          </p>
        </article>

        <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
          <h3 className="text-lg font-semibold text-zinc-900">
            Details Block/h3
          </h3>
          <p className="mt-3 text-sm leading-6 text-zinc-600">
            Another placeholder area for skills, notes, or references.
          </p>
        </article>

      </div>
    </div>

    {/* Right side */}
    {/* <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
      
      <p className="text-[.11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
        Visual Grid
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        
        <div className="flex aspect-square items-center justify-center rounded-[1.25rem] bg-zinc-200">
          
        </div>

        <div className="flex aspect-square items-center justify-center rounded-[1.25rem] bg-zinc-200">
          <div className="h-12 w-12 border-2 border-zinc-300 bg-zinc-100" />
        </div>

        <div className="flex aspect-square items-center justify-center rounded-[1.25rem] bg-zinc-200">
          <div className="h-12 w-12 border-2 border-zinc-300 bg-zinc-100" />
        </div>

        <div className="flex aspect-square items-center justify-center rounded-[1.25rem] bg-zinc-200">
          <div className="h-12 w-12 border-2 border-zinc-300 bg-zinc-100" />
        </div>

      </div>

      <button className="mt-5">View Section</button>
    </div> */}
    {/* Right side */}
<div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
  
  <p className="text-[.11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
    Visual Grid
  </p>

  <div className="mt-5 grid gap-4 sm:grid-cols-2">
    {[
      {
        title: "Article One",
        body: "A simple placeholder for a featured article.",
        image: card1,
      },
      {
        title: "Article Two",
        body: "Clean layout and readable structure.",
        image: card2,
      },
      {
        title: "Article Three",
        body: "Reusable patterns improve UI consistency.",
        image: card3,
      },
      {
        title: "Article Four",
        body: "Extra card to fill the grid layout.",
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

  <button className="mt-5">View Section</button>
</div>

  </div>
</section>
    </div>
    
  );
};

export default AboutPage;
