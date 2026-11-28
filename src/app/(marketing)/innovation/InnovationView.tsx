"use client";
import { useLanguage } from "@/context/LanguageContext";
import { PageHero, PageSection, FeatureGrid, ProcessSteps, PageCTA } from "@/components/SiteSections";
export function InnovationView(){
 const {language}=useLanguage();const fr=language==="fr";
 const axes=fr?[
 {title:"IA appliquée",text:"Évaluer des méthodes de recherche, d’assistance et de traitement des données sur des cas d’usage définis."},
 {title:"Systèmes connectés",text:"Tester la collecte des mesures, les échanges de données et les interfaces de supervision."},
 {title:"Technologies embarquées",text:"Étudier l’intégration du logiciel et du matériel, avec des prototypes adaptés au contexte."},
 {title:"Produits propres",text:"Développer progressivement des technologies ENOV. Une expérimentation ne constitue pas une annonce de produit."},
 ]:[
 {title:"Applied AI",text:"Evaluate search, assistance and data-processing methods for defined use cases."},
 {title:"Connected systems",text:"Test measurement collection, data exchange and monitoring interfaces."},
 {title:"Embedded technology",text:"Study software and hardware integration through context-specific prototypes."},
 {title:"Our own products",text:"Gradually develop ENOV technology. An experiment is not a product announcement."},
 ];
 return <main id="main-content"><PageHero eyebrow="ENOV / INNOVATION LAB" title={fr?"La recherche commence":"Research starts"} highlight={fr?"par une question précise.":"with a specific question."} description={fr?"L’Innovation Lab structure notre démarche de recherche appliquée et de prototypage. Son rôle : tester une hypothèse, comprendre ses limites et décider de la suite.":"The Innovation Lab structures our applied research and prototyping approach: test a hypothesis, understand its limitations and decide what comes next."} action={{href:"/contact",label:fr?"Échanger sur un besoin technique":"Discuss a technical need"}} /><PageSection eyebrow={fr?"NOS AXES DE TRAVAIL":"RESEARCH AREAS"} title={fr?"Explorer sans annoncer prématurément.":"Explore before announcing."} description={fr?"Ces axes décrivent une démarche de R&D. Ils ne constituent ni un catalogue de produits disponibles, ni une promesse de résultat.":"These areas describe an R&D approach, not a catalogue of available products or a promise of results."}><FeatureGrid items={axes}/></PageSection><PageSection eyebrow={fr?"DE L’HYPOTHÈSE AU TEST":"FROM HYPOTHESIS TO TEST"} title={fr?"Une progression fondée sur les essais.":"Progress through testing."}><ProcessSteps items={fr?[
 {title:"Définir la question",text:"Préciser l’usage, les contraintes et ce que l’essai doit permettre de vérifier."},
 {title:"Prototyper",text:"Construire uniquement ce qui est nécessaire pour tester l’hypothèse."},
 {title:"Évaluer",text:"Documenter les résultats, les limites et les conditions d’une éventuelle suite."},
 ]:[{title:"Define the question",text:"Specify the use, constraints and what the trial needs to establish."},{title:"Prototype",text:"Build only what is needed to test the hypothesis."},{title:"Evaluate",text:"Document results, limitations and conditions for any next stage."}]}/></PageSection><PageCTA title={fr?"Une question de faisabilité ?":"A feasibility question?"} text={fr?"Décrivez le contexte et le problème technique à étudier.":"Describe the context and the technical problem to assess."} label={fr?"Nous contacter":"Contact us"}/></main>;
}
