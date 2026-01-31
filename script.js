// --- 1. DARK MODE ---
const toggleBtn = document.getElementById('theme-toggle');
const body = document.documentElement;
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    body.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') toggleBtn.textContent = '☀️';
}
if(toggleBtn){
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
}

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
        if(nav) nav.classList.remove('nav-active');
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
        const href = li.getAttribute("href");
        if (href.includes("#") && href.includes(current)) {
            li.classList.add("active");
        }
    });
});

// --- 4. TYPEWRITER ---
const textToType = "Passionné par le développement, j'habite à Haguenau et je construis ce portfolio pour présenter mes compétences techniques.";
const typewriterElement = document.getElementById('typewriter');
let i = 0;
function typeWriter() {
    if (typewriterElement && i < textToType.length) {
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
    if (scrollTopBtn) {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            scrollTopBtn.style.display = "block";
        } else {
            scrollTopBtn.style.display = "none";
        }
    }
});
if(scrollTopBtn){
    scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// --- 6. GESTION DES PROJETS ---
const mesProjets = [
    {
        id: "freelance-web",
        titre: "Création Sites Web (Freelance)",
        categorie: "web",
        image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        tags: ["Micro-entreprise", "Wordpress", "SEO", "Relation Client"],
        description_courte: "Services de création web pour professionnels.",
        description_longue: "<strong>Statut :</strong> Micro-entrepreneur.<br>J'accompagne les artisans et PME dans leur transition numérique. <br>• Analyse des besoins client.<br>• Développement de sites vitrines (CMS ou sur-mesure).<br>• Optimisation SEO et formation à la prise en main.",
        lien: "#contact" 
    },
    {
        id: "serre-iot",
        titre: "Serre Autonome & IoT",
        categorie: "app",
        image: "https://images.unsplash.com/photo-1558449028-b53a39d100fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        tags: ["ESP32", "Node-RED", "MQTT", "C++", "Raspberry Pi"],
        description_courte: "Système de régulation automatique via MQTT et Node-RED.",
        description_longue: "Ce projet dispose d'une page dédiée.", 
        lien: "projet-serre.html" 
    },
    {
        id: "stock-web",
        titre: "Gestion de Stock",
        categorie: "web",
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        tags: ["PHP", "MVC", "MySQL"],
        description_courte: "Application web de gestion logistique complète.",
        description_longue: "Développement d'une solution complète pour la gestion des entrées/sorties de stock.<br>• Architecture MVC pour séparer la logique métier.<br>• Base de données MySQL relationnelle.<br>• Sécurisation des accès (Sessions PHP).",
        lien: "projet-stock.html" 
    },
    {
        id: "calc-csharp",
        titre: "Calculatrice Scientifique",
        categorie: "app",
        image: "https://images.unsplash.com/photo-1587145820266-a5951ee1f620?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        tags: ["C#", "WinForms", ".NET"],
        description_courte: "Calculatrice scientifique avec historique.",
        description_longue: "Application Windows développée en C# (WinForms).<br>• Gestion de la Notation Polonaise Inverse (RPN).<br>• Sauvegarde de l'historique des calculs dans un fichier local.<br>• Gestion des exceptions mathématiques.",
        lien: "https://github.com/gabrielpfeiffer675-bit"
    }
];

const gridContainer = document.getElementById('projets-grid');
const modal = document.getElementById("project-modal");

function afficherProjets(filtre = 'all') {
    if (!gridContainer) return;

    gridContainer.innerHTML = ''; 
    mesProjets.forEach(projet => {
        if (filtre === 'all' || projet.categorie === filtre) {
            const card = document.createElement('div');
            card.className = 'projet-card';
            card.setAttribute('data-category', projet.categorie);
            card.style.animation = 'fadeIn 0.5s ease forwards';
            const tagsHtml = projet.tags.map(tag => `<li>${tag}</li>`).join('');

            const boutonHtml = projet.lien && projet.lien.includes('.html') 
                ? `<a href="${projet.lien}" class="btn-details">Voir le détail</a>`
                : `<button class="btn-details" onclick="ouvrirModale('${projet.id}')">En savoir plus</button>`;

            card.innerHTML = `
                <div class="card-image"><img src="${projet.image}" alt="${projet.titre}" loading="lazy"></div>
                <h3>${projet.titre}</h3>
                <ul class="tech-tags">${tagsHtml}</ul>
                <p>${projet.description_courte}</p>
                ${boutonHtml}
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
        document.getElementById("modal-desc").innerHTML = projet.description_longue;
        
        const linkBtn = document.getElementById("modal-link");
        if(projet.lien && !projet.lien.includes('.html') && projet.lien !== "#contact") {
             linkBtn.href = projet.lien;
             linkBtn.style.display = "inline-block";
             linkBtn.textContent = "Voir le code / Site";
        } else if (projet.lien === "#contact") {
             linkBtn.href = "#contact";
             linkBtn.textContent = "Me contacter";
             linkBtn.onclick = () => { if(modal) modal.style.display = "none"; };
        } else {
             linkBtn.style.display = "none";
        }

        if(modal) modal.style.display = "block";
    }
};

if(document.querySelector(".close-modal")) {
    document.querySelector(".close-modal").onclick = () => modal.style.display = "none";
}
window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; };

afficherProjets('all');

// --- 7. VEILLE & RSS (MODIFIÉ POUR LE NOUVEAU DESIGN) ---
const rssContainer = document.getElementById('rss-feed-container');
if(rssContainer) {
    const rssUrl = 'https://www.journalduhacker.net/rss'; 
    fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`)
        .then(r => r.json())
        .then(data => {
            if(data.items) {
                data.items.slice(0, 3).forEach(item => { // On en affiche 3 maintenant
                    const card = document.createElement('article');
                    card.className = 'veille-card';
                    // Ajout d'une petite icône horloge pour la date
                    const dateStr = new Date(item.pubDate).toLocaleDateString('fr-FR');
                    card.innerHTML = `
                        <h3>${item.title}</h3>
                        <div class="meta" style="color:var(--accent-color);font-size:0.85rem;margin-bottom:15px; display:flex; align-items:center; gap:5px;">
                            <i class="far fa-clock"></i> ${dateStr}
                        </div>
                        <p>${item.description.replace(/<[^>]*>?/gm, '').substring(0, 100)}...</p>
                        <a href="${item.link}" target="_blank" class="btn-details" style="margin-top:auto;">Lire l'article</a>`;
                    rssContainer.appendChild(card);
                });
            }
        })
        .catch(console.error);
}

const historyContainer = document.getElementById('history-container');
if(historyContainer) {
    fetch('selection_veille.json')
        .then(r => r.json())
        .then(data => {
            data.forEach(item => {
                const card = document.createElement('article');
                card.className = 'veille-card';
                const tags = item.tags.map(t => `<span style="background:rgba(0,200,83,0.1);color:var(--accent-color);padding:2px 10px;border-radius:12px;font-size:0.75rem;margin-right:5px;font-weight:600;">${t}</span>`).join('');
                card.innerHTML = `
                    <div style="margin-bottom:15px;">${tags}</div>
                    <h3>${item.titre}</h3>
                    <p>${item.description}</p>
                    <a href="${item.lien}" target="_blank" class="btn-details" style="margin-top:auto;">Lire l'article</a>`;
                historyContainer.appendChild(card);
            });
        })
        .catch(console.error);
}

document.getElementById('year').textContent = new Date().getFullYear();
const styleSheet = document.createElement("style");
styleSheet.innerText = `@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); }}`;
document.head.appendChild(styleSheet);

// --- 8. GESTION DU FORMULAIRE AJAX ---
const form = document.getElementById("my-form");

async function handleSubmit(event) {
    event.preventDefault(); 
    const status = document.getElementById("my-form-status");
    const data = new FormData(event.target);

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
            form.reset(); 
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
if(form) {
    form.addEventListener("submit", handleSubmit);
}