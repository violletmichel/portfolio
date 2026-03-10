document.addEventListener("DOMContentLoaded", function () {
  var scrollToTopButton = document.getElementById("scroll-to-top");

  window.addEventListener("scroll", function () {
    if (window.scrollY >= 300) {
      scrollToTopButton.style.display = "block";
    } else {
      scrollToTopButton.style.display = "none";
    }
  });

  scrollToTopButton.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
    const rows = document.querySelectorAll("table tr");
    const explanationRows = document.querySelectorAll(".explanation-row");

    let activeExplainRow = null; // Garder une trace de la ligne d'explication ouverte

    rows.forEach(function (row, index) {
        if (index % 2 === 0) {
            row.addEventListener("click", function () {
                const explanationCell = explanationRows[index / 2].querySelector(".explanation-cell");
                const explanationText = getExplanationText(row);

                if (activeExplainRow === explanationCell) {
                    // Si la même explication est déjà ouverte, la fermer
                    explanationCell.innerHTML = "";
                    activeExplainRow = null;
                } else {
                    // Sinon, masquer l'explication précédente et afficher la nouvelle
                    if (activeExplainRow) {
                        activeExplainRow.innerHTML = "";
                    }
                    explanationCell.innerHTML = explanationText;
                    activeExplainRow = explanationCell;
                }
            });
        }
    });

    function getExplanationText(row) {
        const demoExplanations = {
            "Période d'application en entreprise: Intégrateur Web ": "J'ai travaillé pour Formagraph Design afin d'améliorer leur site internet. J'ai travaillé en local afin que leur développeur web puisse appliquer les modifications sur le site en ligne si elles sont acceptées.",
            "Mise en rayon / Caissier ": "Pendant cette période, j'ai été responsable de la mise en rayon des produits du magasin DIA et j'ai aussi travaillé en caisse quand le besoin s'en faisait sentir.",
			"Période d'application en entreprise: Technicien de Maintenance Informatique ": "Durant cette période de stage en entreprise, j'ai pu accueillir des clients pour les conseillers/vendre du matériels informatique. J’ai été en déplacement chez des clients afin de diagnostiquer le problème et le résoudre.",
			"Technicien de Maintenance Informatique ": "Réceptions de matériel informatique à OSIATIS (Unité centrale, Imprimante, Ecran et Serveur), matériels souvent défectueux venant de grande banque afin de les remettre en état si possible, de les tester et de les réinitialiser pour de future utilisation.",
			"Militaire dans l'armée de l'air ": "Volontaire Assistant Surveillant des Installation de la base aérienne 217, mon travail consistait à contrôler toutes personnes entrantes et sortant de la base aérienne ainsi que de faire des patrouilles sur le périmètre de la base.",
			"Détoureur ": "Pour ce travaille, je devais enlever le surplus de matériaux sur les conteneurs destinés à l'armée.",
			"Ouvrier Biscuiterie pour Animaux ": "Ce travail que j'ai effectué à Vitakraft consistait à confectionner des biscuits pour des animaux.",
			"Manutentionnaire / Préparateur de commandes ": "J'ai préparé des commandes pour les magasins ATAC.",
			"Pépiniériste ": "Dans le cadre d'une formation en alternance, j'ai effectué ce travail dans une pépinière qui consistait à rempoter des plantes/des arbustes, faire des greffes, enlever les mauvaises herbes des pots.",
            "Immersion en formation (1 semaine) ": "J'ai passé une semaine à découvrir la formation de développeur web",
			"Dispositif en Amont de la Qualification 2.0 (DAQ 2.0) ": "- Monter en compétences<br>- Création de site web<br>- Stage en entreprise<br>- Mise en situation professionnelle",
			"Technicien Assistant Installation ": "- <font color=white>Module 1</font>: Intervenir sur un poste de travail informatique et auprès d'un utilisateur (Recherche d'info, planification et gestion interventions, normes de sécurité, assembler un pc, intégrer le système d'exploitation, personnalisation du poste de travail, installation et configuration des postes de travail (Diagnostique défaut matériel ou logiciel, sécurisation du poste de travail, raccordement réseau, assistance des utilisateurs bureautique))<br><br>- <font color=white>Module 2</font>: Intervenir en environnement de réseau informatique d'entreprise (Architecture réseau, installation d'une architecture réseau, installation d'un serveur 2000, installation d'un client, administration d'un serveur, appropriation d'un environnement serveur, accès services internet, diagnostique réseau, sécurisation réseau, assistance utilisateur bureautique)<br><br>- <font color=white>Module 3</font>: Intervenir à distance et au premier niveau en informatique (Utilisation de la téléinformatique, communication au téléphone, traitement appel help desk, résolution de problème à distance, facilitation fournitures équipement et services, interconnexion et routage, suivi de parc informatique, administration réseau)",
			"Agent de Maintenance en Equipements Bureautique (Option micro-informatique) ": "- <font color=white>Module 1</font>: Intégration, atelier (Assembler, configurer et mettre en service des équipements bureautiques)<br><br>- <font color=white>Module 2</font>: Installation environnement client (Déployer, modifier et mettre en service des équipements bureautiques)<br><br>- <font color=white>Module 3</font>: Maintenance des équipements bureautiques diagnostiqués et réparés",
            // ... Ajoutez des explications pour chaque métier
        };

        const jobTitle = row.querySelector("td:nth-child(2)").textContent;

        return demoExplanations[jobTitle] || "Aucune explication disponible pour ce métier.";
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const toggle = document.getElementById("toggle");
    const menu = document.querySelector(".menu");

    toggle.addEventListener("change", function() {
        if (this.checked) {
            menu.style.display = "flex";
        } else {
            menu.style.display = "none";
        }
    });
});