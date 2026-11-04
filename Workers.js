const html = `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>MOSEK MULTI SERVICES</title>
<style>
*{box-sizing:border-box}
body{margin:0;font-family:Arial,sans-serif;background:#f1f5fb;color:#172b4d}
header{background:#123b70;color:white;padding:20px}
header h2{margin:0;font-size:21px}
header p{margin:6px 0 0;color:#d8e7fa}
.container{padding:18px;max-width:1100px;margin:auto}
h3{color:#123b70}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(145px,1fr));gap:12px}
.card{background:white;border-radius:12px;padding:18px;box-shadow:0 2px 8px #dce4ef}
.card strong{display:block;font-size:19px;margin-top:10px}
.menu{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-top:18px}
button{border:0;border-radius:9px;padding:15px;background:#1764ae;color:white;font-size:15px;font-weight:bold;cursor:pointer}
button:hover{background:#0c477f}
.section{background:white;padding:18px;border-radius:12px;margin-top:20px}
.hidden{display:none}
input,select{width:100%;padding:12px;margin:8px 0 14px;border:1px solid #ccd6e3;border-radius:7px;font-size:15px}
footer{text-align:center;color:#68788e;padding:25px;font-size:12px}
@media(min-width:650px){.menu{grid-template-columns:repeat(4,1fr)}}
</style>
</head>
<body>
<header>
<h2>MOSEK MULTI SERVICES</h2>
<p>Gestion des opérations et de la caisse</p>
</header>
<div class="container">
<h3>Tableau de bord</h3>
<div class="grid">
<div class="card">💵<p>Solde physique</p><strong>À calculer</strong></div>
<div class="card">📊<p>Transactions du jour</p><strong>0</strong></div>
<div class="card">💰<p>Entrées de caisse</p><strong>0 HTG</strong></div>
<div class="card">📤<p>Sorties de caisse</p><strong>0 HTG</strong></div>
</div>

<h3>Services</h3>
<div class="menu">
<button onclick="show('zelle')">Zelle</button>
<button onclick="show('natcash')">NatCash</button>
<button onclick="show('unitransfer')">UniTransfer</button>
<button onclick="show('cam')">CAM</button>
<button onclick="show('caisse')">Caisse</button>
<button onclick="show('journal')">Journal</button>
<button onclick="show('rapports')">Rapports</button>
<button onclick="show('parametres')">Paramètres</button>
</div>

<div id="accueil" class="section">
<h3>Bienvenue</h3>
<p>Sélectionnez un service pour accéder à son espace de travail.</p>
<p>Application de gestion de MOSEK MULTI SERVICES.</p>
</div>

<div id="zelle" class="section hidden">
<h3>Opération Zelle</h3>
<label>Date et heure</label><input type="datetime-local">
<label>Expéditeur</label><input placeholder="Nom de l'expéditeur">
<label>Bénéficiaire</label><input placeholder="Nom du bénéficiaire">
<label>Montant en dollars US</label><input type="number" placeholder="0.00">
<label>Taux de change</label><input type="number" placeholder="Taux">
<p>Enregistrement réel disponible dans une prochaine étape.</p>
</div>

<div id="natcash" class="section hidden">
<h3>Opération NatCash</h3>
<label>Numéro du client</label><input placeholder="Numéro de téléphone">
<label>Type d'opération</label>
<select><option>Dépôt</option><option>Retrait</option><option>Autre</option></select>
<label>Montant</label><input type="number" placeholder="Montant HTG">
<label>Commission</label><input type="number" placeholder="Commission HTG">
</div>

<div id="unitransfer" class="section hidden">
<h3>Opération UniTransfer</h3>
<label>Expéditeur</label><input placeholder="Nom de l'expéditeur">
<label>Bénéficiaire</label><input placeholder="Nom du bénéficiaire">
<label>Montant payé</label><input type="number" placeholder="Montant HTG">
<label>Montant remis en espèces</label><input type="number" placeholder="Montant HTG">
</div>

<div id="cam" class="section hidden">
<h3>Opération CAM</h3>
<label>Type d'opération</label><select><option>Entrée</option><option>Sortie</option></select>
<label>Nom du client</label><input placeholder="Nom du client">
<label>Montant</label><input type="number" placeholder="Montant">
</div>

<div id="caisse" class="section hidden">
<h3>Gestion de la caisse</h3>
<p>Suivi des entrées, sorties et du solde physique.</p>
<p>Les soldes seront calculés à partir des opérations enregistrées.</p>
</div>

<div id="journal" class="section hidden">
<h3>Journal des transactions</h3>
<p>Les opérations enregistrées apparaîtront ici.</p>
</div>

<div id="rapports" class="section hidden">
<h3>Rapports journaliers</h3>
<p>Les rapports seront générés à partir des transactions enregistrées.</p>
</div>

<div id="parametres" class="section hidden">
<h3>Paramètres</h3>
<p>Configuration de MOSEK MULTI SERVICES.</p>
</div>
</div>
<footer>MOSEK MULTI SERVICES — Gestion privée</footer>
<script>
function show(id){
document.querySelectorAll('.section').forEach(
e=>e.classList.add('hidden')
);
document.getElementById(id).classList.remove('hidden');
}
</script>
</body>
</html>`;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "GET" && url.pathname === "/") {
      return new Response(html, {
        headers: {"Content-Type": "text/html; charset=UTF-8"}
      });
    }

    if (request.method === "GET" && url.pathname === "/api/health") {
      try {
        const result = await env.DB.prepare(
          "SELECT name FROM sqlite_schema WHERE type = 'table' ORDER BY name"
        ).all();

        return Response.json({
          status: "Connexion D1 réussie",
          tables: result.results
        });
      } catch (error) {
        return Response.json({
          error: "Erreur de connexion à la base D1",
          details: error.message
        }, {status: 500});
      }
    }

    return Response.json({
      error: "Adresse introuvable"
    }, {status: 404});
  }
};
