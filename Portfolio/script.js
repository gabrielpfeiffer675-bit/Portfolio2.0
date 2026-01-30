// --- 1. DARK MODE ---
const toggleBtn = document.getElementById('theme-toggle');
const body = document.documentElement;
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    body.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') toggleBtn.textContent = '☀️';
}
toggleBtn.addEventListener('click', () => {
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        toggleBtn.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        toggleBtn.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    }
});

// --- 2. MENU BURGER & NAVIGATION ---
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

if(burger){
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('nav-active');
        if(burger) burger.classList.remove('toggle');
    });
});

// --- 3. ACTIVE LINK ON SCROLL ---
const sections = document.querySelectorAll("section");
const navLi = document.querySelectorAll(".nav-links .nav-link");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute("id");
        }
    });

    navLi.forEach((li) => {
        li.classList.remove("active");
        if (li.getAttribute("href").includes(current)) {
            li.classList.add("active");
        }
    });
});

// --- 4. TYPEWRITER ---
const textToType = "Passionné par le développement, j'habite à Haguenau et je construis ce portfolio pour présenter mes compétences techniques.";
const typewriterElement = document.getElementById('typewriter');
let i = 0;
function typeWriter() {
    if (i < textToType.length) {
        typewriterElement.textContent += textToType.charAt(i);
        i++;
        setTimeout(typeWriter, 30);
    }
}
window.onload = typeWriter;

// --- 5. SCROLL REVEAL ---
const revealElements = document.querySelectorAll('.reveal');
const scrollTopBtn = document.getElementById("scrollToTopBtn");

const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); 
        }
    });
}, observerOptions);
revealElements.forEach(el => observer.observe(el));

window.addEventListener('scroll', () => {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        scrollTopBtn.style.display = "block";
    } else {
        scrollTopBtn.style.display = "none";
    }
});
scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// --- 6. GESTION DES PROJETS ---
const mesProjets = [
    {
        id: "freelance-web",
        titre: "Création Sites Web (Freelance)",
        categorie: "web", // Catégorie Web
        image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        tags: ["Micro-entreprise", "Wordpress", "SEO", "Relation Client"],
        description_courte: "Services de création web pour professionnels.",
        description_longue: "Lancement de ma micro-entreprise de développement web. J'accompagne des artisans et PME dans leur transition numérique : analyse des besoins, création de sites vitrines sur-mesure ou via CMS, et optimisation pour le référencement (SEO).",
        lien: "#contact" // Redirige vers ton formulaire de contact ou ton site pro si tu en as un
    },
    {
        id: "serre-iot",
        titre: "Serre Autonome Connectée",
        categorie: "app", // On le met dans "Logiciel/App" car c'est de la prog embarquée
        image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        tags: ["C++", "ESP32", "Raspberry Pi", "IoT"],
        description_courte: "Système de régulation automatique de luminosité.",
        description_longue: "Projet de Terminale STI2D (SIN). Conception d'une serre autonome. J'ai été chargé de la programmation C++ sur carte ESP32 : lecture des capteurs de luminosité en temps réel et pilotage automatique de l'éclairage artificiel. Transmission des données via Wi-Fi vers un Raspberry Pi centralisateur.",
        lien: "https://github.com/gabrielpfeiffer675-bit" // Mets le lien vers le code si tu l'as, sinon ton GitHub général
    },
    {
        id: "stock-web",
        titre: "Gestion de Stock",
        categorie: "web",
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        tags: ["PHP", "MVC", "MySQL"],
        description_courte: "Application web de gestion logistique complète.",
        description_longue: "Développement d'une solution complète pour la gestion des entrées/sorties de stock. Utilisation de l'architecture MVC pour séparer la logique métier de l'affichage. Base de données relationnelle MySQL avec gestion des clés étrangères.",
        lien: "projet-stock.html"
    },
    {
        id: "calc-csharp",
        titre: "Calculatrice Scientifique",
        categorie: "app",
        image: "https://images.unsplash.com/photo-1587145820266-a5951ee1f620?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        tags: ["C#", "WinForms", ".NET"],
        description_courte: "Calculatrice scientifique avec historique.",
        description_longue: "Application lourde Windows développée en C#. Implémentation de la notation polonaise inverse (RPN) pour la gestion des priorités de calcul. Sauvegarde de l'historique dans un fichier local.",
        lien: "https://github.com/gabrielpfeiffer675-bit"
    }
];

const gridContainer = document.getElementById('projets-grid');
const modal = document.getElementById("project-modal");

function afficherProjets(filtre = 'all') {
    gridContainer.innerHTML = ''; 
    mesProjets.forEach(projet => {
        if (filtre === 'all' || projet.categorie === filtre) {
            const card = document.createElement('div');
            card.className = 'projet-card';
            card.setAttribute('data-category', projet.categorie);
            card.style.animation = 'fadeIn 0.5s ease forwards';
            const tagsHtml = projet.tags.map(tag => `<li>${tag}</li>`).join('');

            card.innerHTML = `
                <div class="card-image"><img src="${projet.image}" alt="${projet.titre}" loading="lazy"></div>
                <h3>${projet.titre}</h3>
                <ul class="tech-tags">${tagsHtml}</ul>
                <p>${projet.description_courte}</p>
                <button class="btn-details" onclick="ouvrirModale('${projet.id}')">En savoir plus</button>
            `;
            gridContainer.appendChild(card);
        }
    });
}

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        afficherProjets(btn.getAttribute('data-filter'));
    });
});

window.ouvrirModale = (idProjet) => {
    const projet = mesProjets.find(p => p.id === idProjet);
    if (projet) {
        document.getElementById("modal-title").textContent = projet.titre;
        document.getElementById("modal-desc").textContent = projet.description_longue;
        document.getElementById("modal-link").href = projet.lien;
        modal.style.display = "block";
    }
};
document.querySelector(".close-modal").onclick = () => modal.style.display = "none";
window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; };

afficherProjets('all');

// --- 7. VEILLE & RSS ---
const rssContainer = document.getElementById('rss-feed-container');
const rssUrl = 'https://www.journalduhacker.net/rss'; 
fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`)
    .then(r => r.json())
    .then(data => {
        if(data.items) {
            data.items.slice(0, 2).forEach(item => {
                const card = document.createElement('article');
                card.className = 'veille-card';
                card.innerHTML = `
                    <h3>${item.title}</h3>
                    <div class="meta" style="color:var(--accent-color);font-size:0.9rem;margin-bottom:10px;">${new Date(item.pubDate).toLocaleDateString('fr-FR')}</div>
                    <p>${item.description.replace(/<[^>]*>?/gm, '').substring(0, 80)}...</p>
                    <a href="${item.link}" target="_blank" class="btn-details" style="margin-top:auto;">Lire l'article</a>`;
                rssContainer.appendChild(card);
            });
        }
    })
    .catch(console.error);

const historyContainer = document.getElementById('history-container');
fetch('selection_veille.json')
    .then(r => r.json())
    .then(data => {
        data.forEach(item => {
            const card = document.createElement('article');
            card.className = 'veille-card';
            const tags = item.tags.map(t => `<span style="background:var(--accent-color);color:#fff;padding:2px 8px;border-radius:10px;font-size:0.7rem;margin-right:5px;">${t}</span>`).join('');
            card.innerHTML = `
                <div style="margin-bottom:10px;">${tags}</div>
                <h3>${item.titre}</h3>
                <div class="meta" style="color:var(--accent-color);font-size:0.9rem;margin-bottom:10px;">${item.date}</div>
                <p>${item.description}</p>
                <a href="${item.lien}" target="_blank" class="btn-details" style="margin-top:auto;">Relire</a>`;
            historyContainer.appendChild(card);
        });
    })
    .catch(console.error);

document.getElementById('year').textContent = new Date().getFullYear();
const styleSheet = document.createElement("style");
styleSheet.innerText = `@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); }}`;
document.head.appendChild(styleSheet);


// --- 8. GESTION DU FORMULAIRE AJAX (NOUVEAU) ---
const form = document.getElementById("my-form");

async function handleSubmit(event) {
    event.preventDefault(); // Empêche le rechargement de la page
    const status = document.getElementById("my-form-status");
    const data = new FormData(event.target);

    // Fetch API pour envoyer les données sans quitter la page
    fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            status.innerHTML = "Merci ! Votre message a bien été envoyé.";
            status.style.color = "green";
            form.reset(); // Vide le formulaire
        } else {
            response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                } else {
                    status.innerHTML = "Oups ! Il y a eu un problème lors de l'envoi.";
                }
                status.style.color = "red";
            });
        }
    }).catch(error => {
        status.innerHTML = "Oups ! Il y a eu un problème lors de l'envoi.";
        status.style.color = "red";
    });
}
form.addEventListener("submit", handleSubmit);