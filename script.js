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

// --- 4. PRELOADER & TYPEWRITER SYNCHRONISÉS ---
const textToType = "Passionné par le développement, j'habite à Haguenau et je construis ce portfolio pour présenter mes compétences techniques.";
const typewriterElement = document.getElementById('typewriter');
let i = 0;
let typewriterStarted = false;

function typeWriter() {
    if (typewriterElement && i < textToType.length) {
        typewriterElement.textContent += textToType.charAt(i);
        i++;
        setTimeout(typeWriter, 30);
    }
}

// On attend que TOUT le site soit chargé
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    
    if (preloader) {
        // Petit délai de 500ms pour voir l'animation
        setTimeout(() => {
            preloader.classList.add('loader-hidden');
            
            // Une fois la disparition terminée...
            preloader.addEventListener('transitionend', () => {
                if (preloader.parentNode) {
                    preloader.parentNode.removeChild(preloader);
                }
                // ET on lance la machine à écrire maintenant
                if (!typewriterStarted) {
                    typeWriter();
                    typewriterStarted = true;
                }
            });
        }, 500);
    } else {
        // Fallback
        typeWriter();
    }
});

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

// --- 6. GESTION DES PROJETS (ADAPTÉE BTS SIO) ---
const mesProjets = [
    {
        id: "didiland-docs",
        titre: "Application 'didiland.docs'",
        categorie: "web",
        image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        tags: ["PHP (CodeIgniter 3)", "Architecture MVC", "MySQL", "DataTables JS"],
        description_courte: "Centralisation et sécurisation des documents et notices techniques du parc d'attractions.",
        description_longue: `
            <strong>1. Fiche d'identité :</strong> Réalisé en autonomie durant mon stage auprès de M. Roser (Responsable administration). Déployé localement sur Laragon avec configuration d'un Hôte Virtuel.<br><br>
            <strong>2. Problématique & Besoins :</strong> Centraliser les notices constructeurs, manuels de maintenance et consignes de sécurité éparpillés, avec recherche multicritères et restriction des accès applicatifs (Admin / Technicien).<br><br>
            <strong>3. Réalisations techniques (Preuves) :</strong> 
            • Base de données relationnelle normalisée (tables <code>DOCUMENT</code>, <code>ATTRACTION</code>, <code>TYPE_DOCUMENT</code>, <code>UTILISATEUR</code>). 
            • Module CRUD complet et intégration de DataTables JS pour un affichage asynchrone dynamique.
            • Sécurisation par code (requête <code>COUNT</code>) bloquant la suppression d'une attraction si des notices y sont encore liées afin d'éviter les données orphelines.<br><br>
            <strong>4. Sécurité & Cybersécurité :</strong> Authentification gérée avec la fonction native PHP <code>password_verify()</code> et mots de passe hachés en BCRYPT. Veille menée sur l'obsolescence de MD5/SHA-1 et prévision de migration vers Argon2id (recommandé par l'ANSSI).<br><br>
            <strong>5. Résolution d'incident :</strong> Correction d'un bug d'encodage sous Windows (caractères corrompus type 'Ã©' lors de l'export ZIP des notices) résolu de manière autonome via la fonction native <code>strtr()</code> pour remapper proprement les chaînes.
        `,
        lien: "#contact" 
    },
    {
        id: "jpo-data",
        titre: "Application 'JPO-Data'",
        categorie: "web",
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        tags: ["HTML5 / CSS3", "MySQL", "Modélisation 3NF", "Formspree API"],
        description_courte: "Informatisation de la collecte et de l'analyse des données visiteurs lors des Portes Ouvertes du lycée.",
        description_longue: `
            <strong>1. Fiche d'identité :</strong> Projet pédagogique de groupe réalisé au Lycée René Cassin (Strasbourg). Maquettage d'interface sur Penpot et intégration responsive complète.<br><br>
            <strong>2. Problématique & Besoins :</strong> Remplacer les fiches d'accueil papier pour suivre l'affluence en temps réel et analyser l'intérêt des profils (Générale, STI2D) vers les filières du BTS SIO.<br><br>
            <strong>3. Réalisations techniques (Preuves) :</strong> 
            • Conception d'un dictionnaire de 14 données, d'un GDF et d'un MLD validé en 3ème Forme Normale (3NF).
            • Script SQL complet (<code>jpo.sql</code>) structurant 3 tables imbriquées avec clés primaires/étrangères isolées hors-table via <code>ALTER TABLE</code>.
            • Requêtage décisionnel avancé (jointures complexes, <code>COUNT</code>, <code>GROUP BY</code>) pour générer les indicateurs d'affluence par filière et plage horaire.<br><br>
            <strong>4. Sécurité & RGPD (Conformité) :</strong> Flux chiffrés de bout en bout en HTTPS via l'API Formspree (protection contre les attaques Man-in-the-Middle). Intégration du Privacy by Design : bandeau d'information RGPD et case de consentement obligatoire (attribut <code>required</code>) avec durée de conservation limitée à 1 an.<br><br>
            <strong>5. Résolution d'incident :</strong> Résolution d'une erreur MySQL #1452 (Foreign key constraint fails). Diagnostic : la table parente <code>FORMATION</code> commençait à l'ID 3 (salles réelles), provoquant l'échec des tests unitaires ciblant les codes 1 et 2. Résolution : Alignement de l'intégrité référentielle en mettant à jour le script SQL pour insérer l'ensemble exhaustif des salles (1 à 221) avant les transactions de test.
        `,
        lien: "#contact" 
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

            const boutonHtml = `<button class="btn-details" onclick="ouvrirModale('${projet.id}')">En savoir plus</button>`;

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
             linkBtn.textContent = "Me contacter / Voir la fiche";
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

// --- 7. VEILLE & RSS ---
const rssContainer = document.getElementById('rss-feed-container');
if(rssContainer) {
    const rssUrl = 'https://www.journalduhacker.net/rss'; 
    fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`)
        .then(r => r.json())
        .then(data => {
            if(data.items) {
                data.items.slice(0, 3).forEach(item => {
                    const card = document.createElement('article');
                    card.className = 'veille-card';
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