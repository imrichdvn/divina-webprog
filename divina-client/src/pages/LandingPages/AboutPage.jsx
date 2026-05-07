import Button from "../components/Button";
import about from "../assets/about/about.png";
import card1 from "../assets/articles/11.jpg";
import card2 from "../assets/articles/22.jpg";
import card3 from "../assets/articles/33.jpg";
import card4 from "../assets/articles/44.jpg";

const AboutPage = () => {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Hero Section */}
      <section className="rounded-[2rem] border-2 border-neutral-900 bg-white p-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="order-2 lg:order-1">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.28em] text-orange-600">
              Our Heart & Soul
            </p>
            <h1 className="text-4xl font-black leading-tight text-neutral-900 sm:text-5xl">
              Dedicated to Every Paw in Need
            </h1>
            <p className="mt-6 text-base leading-relaxed text-neutral-600">
              Paws & Claws started with a simple belief: every dog deserves a warm bed and a loving family. 
              We operate as a bridge between high-kill shelters and permanent homes, providing 
              medical care, training, and socialization along the way.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button to="/" variant="primary">Return Home</Button>
              <Button to="/articles">Pet Care Resources</Button>
            </div>
          </div>
          <div className="order-1 lg:order-2 aspec-[4/3] overflow-hidden rounded-2xl border-2 border-neutral-900">
            <img src={about} alt="Dogs playing together" className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      {/* Grid: Mission & Stories */}
      <section className="grid gap-8 lg:grid-cols-3">
        {/* Mission Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-3xl border-2 border-neutral-900 bg-orange-50 p-8">
            <h2 className="text-2xl font-bold text-neutral-900">What We Stand For</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {[
                { title: "Rescue", body: "Saving abandoned dogs from high-risk environments." },
                { title: "Rehabilitation", body: "Providing professional training and medical care." },
                { title: "Education", body: "Teaching the community about responsible pet ownership." },
                { title: "Adoption", body: "Matching unique personalities with the perfect homes." },
              ].map((point) => (
                <div key={point.title} className="space-y-2">
                  <h4 className="font-bold text-neutral-900 border-b-2 border-neutral-900 inline-block">{point.title}</h4>
                  <p className="text-sm text-neutral-600">{point.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Success Stories Sidebar */}
        <div className="rounded-3xl border-2 border-neutral-900 bg-neutral-900 p-6 text-white">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-orange-400">Happy Endings</p>
          <h2 className="mt-2 text-2xl font-bold">Success Stories</h2>
          <div className="mt-6 grid gap-4">
            {[
              { name: "Buddy", img: card1 },
              { name: "Bella", img: card3 },
            ].map((story) => (
              <div key={story.name} className="group relative aspect-square overflow-hidden rounded-xl border border-white/20">
                <img src={story.img} alt={story.name} className="h-full w-full object-cover opacity-60 transition-all group-hover:opacity-100" />
                <div className="absolute bottom-3 left-3">
                  <p className="text-xs font-bold uppercase tracking-widest">{story.name} found a home!</p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-6 w-full rounded-full border border-white/20 py-3 text-[11px] font-bold uppercase tracking-widest hover:bg-white hover:text-neutral-900 transition-colors">
            View More Stories
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;