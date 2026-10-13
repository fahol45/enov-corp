export function WhyEnov() {
  return (
    <section className="academy-benefits" aria-label="L’approche ENOV Academy">
      {[
        { title: "Exercices et projets", text: "Chaque programme précise les compétences travaillées." },
        { title: "Avant de vous inscrire", text: "Consultez le niveau requis, le contenu et le tarif." },
        { title: "Votre espace", text: "Retrouvez vos sessions et les replays publiés." },
      ].map((item, index) => <div key={item.title}><span>0{index + 1}</span><h2>{item.title}</h2><p>{item.text}</p></div>)}
    </section>
  );
}
