export function WhyEnov() {
  return (
    <section className="academy-benefits" aria-label="L’approche ENOV Academy">
      {[
        { title: "Apprendre en pratiquant", text: "Des exercices et des projets pour mettre les connaissances en application." },
        { title: "Choisir le bon parcours", text: "Objectifs, prérequis et programme accessibles avant votre inscription." },
        { title: "Retrouver vos ressources", text: "Un espace apprenant pour suivre vos sessions et accéder aux contenus disponibles." },
      ].map((item, index) => <div key={item.title}><span>0{index + 1}</span><h2>{item.title}</h2><p>{item.text}</p></div>)}
    </section>
  );
}
