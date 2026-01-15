export default function FeatureGrid() {
    return (
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-12 pb-32">
        {[
          {
            title: "Probability & Statistics",
            desc: "Single-answer interview questions with precise evaluation.",
          },
          {
            title: "Quant Coding",
            desc: "Monte Carlo simulations, stochastic processes, logic-heavy coding.",
          },
          {
            title: "Leaderboards",
            desc: "Compete with students from top universities worldwide.",
          },
        ].map((f) => (
          <div
            key={f.title}
            className="border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition"
          >
            <h3 className="text-xl font-medium">{f.title}</h3>
            <p className="text-gray-400 mt-3">{f.desc}</p>
          </div>
        ))}
      </section>
    );
  }
  