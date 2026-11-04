const dashboard = `<!DOCTYPE html>
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
.logout{background:#a83232;margin-top:12px}
@media(min-width:650px){.menu{grid-template-columns:repeat(4,1fr)}}
</style>
</head>
<body>
<header>
<h2>MOSEK MULTI SERVICES</h2>
<p>Gestion des opérations et de la caisse</p>
<button class="logout" onclick="logout()">Déconnexion</button>
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
<p>L'enregistrement des opérations sera ajouté dans une prochaine étape.</p>
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
document.querySelectorAll('.section').forEach(e=>e.classList.add('hidden'));
document.getElementById(id).classList.remove('hidden');
}
async function logout(){
await fetch('/api/logout',{method:'POST'});
location.reload();
}
</script>
</body>
</html>`;

const authPage = `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Connexion - MOSEK MULTI SERVICES</title>
<style>
body{margin:0;background:#f1f5fb;font-family:Arial,sans-serif;color:#172b4d}
main{max-width:420px;margin:8vh auto;padding:25px;background:white;border-radius:14px;box-shadow:0 2px 12px #ccd6e3}
h2{color:#123b70}
input{width:100%;padding:13px;margin:8px 0 16px;border:1px solid #ccd6e3;border-radius:7px;box-sizing:border-box;font-size:16px}
button{width:100%;padding:14px;background:#1764ae;color:white;border:0;border-radius:8px;font-weight:bold;font-size:16px}
#message{color:#a83232;white-space:pre-wrap}
small{color:#68788e}
</style>
</head>
<body>
<main>
<h2>MOSEK MULTI SERVICES</h2>
<p id="heading">Connexion administrateur</p>
<form id="login">
<label>Identifiant</label>
<input id="username" value="admin" autocomplete="username" required>
<label>Mot de passe</label>
<input id="password" type="password" autocomplete="current-password" required>
<button>Se connecter</button>
</form>
<form id="setup" hidden>
<p>Première configuration : création du compte administrateur.</p>
<label>Secret de configuration</label>
<input id="secret" type="password" autocomplete="off" required>
<label>Nom complet</label>
<input id="fullname" required>
<label>Créer votre mot de passe (12 caractères minimum)</label>
<input id="newpassword" type="password" minlength="12" autocomplete="new-password" required>
<label>Confirmer le mot de passe</label>
<input id="confirm" type="password" minlength="12" autocomplete="new-password" required>
<button>Créer le compte administrateur</button>
</form>
<p id="message"></p>
<small>Accès réservé aux utilisateurs autorisés.</small>
</main>
<script>
const msg=document.getElementById('message');
async function init(){
try{
const r=await fetch('/api/setup/status');
const d=await r.json();
if(d.setupRequired){
document.getElementById('login').hidden=true;
document.getElementById('setup').hidden=false;
document.getElementById('heading').textContent='Configuration initiale';
}
}catch(e){msg.textContent='Impossible de contacter le serveur.';}
}
document.getElementById('login').onsubmit=async e=>{
e.preventDefault();msg.textContent='Connexion en cours...';
try{
const r=await fetch('/api/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({username:document.getElementById('username').value,password:document.getElementById('password').value})});
const d=await r.json();
if(!r.ok)throw new Error(d.error||'Connexion refusée');
location.reload();
}catch(err){msg.textContent=err.message;}
};
document.getElementById('setup').onsubmit=async e=>{
e.preventDefault();
const p=document.getElementById('newpassword').value;
if(p!==document.getElementById('confirm').value){msg.textContent='Les mots de passe ne correspondent pas.';return;}
msg.textContent='Création du compte en cours...';
try{
const r=await fetch('/api/setup',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({secret:document.getElementById('secret').value,fullName:document.getElementById('fullname').value,password:p})});
const d=await r.json();
if(!r.ok)throw new Error(d.error||'Configuration refusée');
location.reload();
}catch(err){msg.textContent=err.message;}
};
init();
</script>
</body>
</html>`;

const encoder = new TextEncoder();
const SESSION_COOKIE = "__Host-mosek_session";
const SESSION_SECONDS = 8 * 60 * 60;

function json(data, status = 200, headers = {}) {
  return Response.json(data, { status, headers });
}

function bytesToBase64(bytes) {
  let s = "";
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64ToBytes(value) {
  const s = value.replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(s);
  return Uint8Array.from(raw, c => c.charCodeAt(0));
}

async function sha256(value) {
  const result = await crypto.subtle.digest("SHA-256", encoder.encode(value));
  return bytesToBase64(new Uint8Array(result));
}

async function hmac(value, secret) {
  const key = await crypto.subtle.importKey(
    "raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]
  );
  const result = await crypto.subtle.sign("HMAC", key, encoder.encode(value));
  return bytesToBase64(new Uint8Array(result));
}

async function passwordHash(password) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const key = await crypto.subtle.importKey(
    "raw", encoder.encode(password), "PBKDF2", false, ["deriveBits"]
  );
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt, iterations: 310000, hash: "SHA-256" }, key, 256
  );
  return "pbkdf2-sha256$310000$" + bytesToBase64(salt) + "$" +
    bytesToBase64(new Uint8Array(bits));
}

async function verifyPassword(password, stored) {
  try {
    const parts = stored.split("$");
    if (parts.length !== 4 || parts[0] !== "pbkdf2-sha256") return false;
    const iterations = Number(parts[1]);
    if (!Number.isInteger(iterations) || iterations < 100000 || iterations > 1000000) return false;
    const salt = base64ToBytes(parts[2]);
    const expected = base64ToBytes(parts[3]);
    const key = await crypto.subtle.importKey(
      "raw", encoder.encode(password), "PBKDF2", false, ["deriveBits"]
    );
    const bits = new Uint8Array(await crypto.subtle.deriveBits(
      { name: "PBKDF2", salt, iterations, hash: "SHA-256" }, key, 256
    ));
    if (bits.length !== expected.length) return false;
    let diff = 0;
    for (let i = 0; i < bits.length; i++) diff |= bits[i] ^ expected[i];
    return diff === 0;
  } catch {
    return false;
  }
}

function getCookie(request) {
  const header = request.headers.get("Cookie") || "";
  for (const item of header.split(";")) {
    const [name, ...rest] = item.trim().split("=");
    if (name === SESSION_COOKIE) return rest.join("=");
  }
  return null;
}

function cookieHeader(value, maxAge) {
  return SESSION_COOKIE + "=" + value +
    "; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=" + maxAge;
}

function checkOrigin(request) {
  const origin = request.headers.get("Origin");
  return !!origin && origin === new URL(request.url).origin;
}

async function currentUser(request, env) {
  const token = getCookie(request);
  if (!token) return null;
  const tokenHash = await sha256(token);
  const now = new Date().toISOString();
  return await env.DB.prepare(
    `SELECT u.id,u.username,u.full_name,u.role
     FROM user_sessions s
     JOIN app_users u ON u.id=s.user_id
     WHERE s.token_hash=? AND s.expires_at>? AND u.active=1`
  ).bind(tokenHash, now).first();
}

async function createSession(user, env) {
  const random = crypto.getRandomValues(new Uint8Array(32));
  const token = bytesToBase64(random);
  const tokenHash = await sha256(token);
  const now = new Date();
  const expires = new Date(now.getTime() + SESSION_SECONDS * 1000);
  await env.DB.prepare(
    `INSERT INTO user_sessions (id,user_id,token_hash,expires_at,created_at)
     VALUES (?,?,?,?,?)`
  ).bind(crypto.randomUUID(), user.id, tokenHash, expires.toISOString(), now.toISOString()).run();
  return cookieHeader(token, SESSION_SECONDS);
}

async function loginLimitKey(request, env) {
  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  return await hmac(ip, env.SETUP_SECRET);
}

async function checkLoginLimit(request, env) {
  const key = await loginLimitKey(request, env);
  const row = await env.DB.prepare(
    "SELECT attempts,window_started_at,blocked_until FROM login_attempts WHERE ip_hash=?"
  ).bind(key).first();
  const now = Math.floor(Date.now() / 1000);
  if (row && row.blocked_until && row.blocked_until > now) return { blocked: true, key, now };
  if (!row || now - row.window_started_at > 900) {
    await env.DB.prepare(
      `INSERT INTO login_attempts(ip_hash,attempts,window_started_at,blocked_until)
       VALUES(?,0,?,NULL)
       ON CONFLICT(ip_hash) DO UPDATE SET attempts=0,window_started_at=excluded.window_started_at,blocked_until=NULL`
    ).bind(key, now).run();
  }
  return { blocked: false, key, now };
}

async function failedLogin(limit, env) {
  const row = await env.DB.prepare(
    "SELECT attempts FROM login_attempts WHERE ip_hash=?"
  ).bind(limit.key).first();
  const attempts = (row?.attempts || 0) + 1;
  const blockedUntil = attempts >= 5 ? limit.now + 900 : null;
  await env.DB.prepare(
    `INSERT INTO login_attempts(ip_hash,attempts,window_started_at,blocked_until)
     VALUES(?,?,?,?)
     ON CONFLICT(ip_hash) DO UPDATE SET attempts=excluded.attempts,blocked_until=excluded.blocked_until`
  ).bind(limit.key, attempts, limit.now, blockedUntil).run();
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    try {
      if (!env.DB) return json({ error: "Base de données D1 non configurée." }, 500);

      if (method === "GET" && path === "/api/setup/status") {
        const row = await env.DB.prepare(
          "SELECT COUNT(*) AS total FROM app_users WHERE role='admin'"
        ).first();
        return json({ setupRequired: !row || row.total === 0 });
      }

      if (method === "POST" && ["/api/setup", "/api/login", "/api/logout"].includes(path)) {
        if (!checkOrigin(request)) return json({ error: "Origine non autorisée." }, 403);
      }

      if (method === "POST" && path === "/api/setup") {
        if (!env.SETUP_SECRET) return json({ error: "Secret de configuration absent du serveur." }, 500);
        const body = await request.json();
        if (typeof body.secret !== "string" || body.secret.length < 20 ||
            body.secret !== env.SETUP_SECRET) {
          return json({ error: "Secret de configuration incorrect." }, 403);
        }
        const existing = await env.DB.prepare(
          "SELECT COUNT(*) AS total FROM app_users WHERE role='admin'"
        ).first();
        if (existing && existing.total > 0) return json({ error: "Le compte administrateur existe déjà." }, 409);

        const fullName = String(body.fullName || "").trim();
        const password = String(body.password || "");
        if (fullName.length < 2 || fullName.length > 100) return json({ error: "Nom complet invalide." }, 400);
        if (password.length < 12 || password.length > 200) return json({ error: "Le mot de passe doit contenir au moins 12 caractères." }, 400);

        const hash = await passwordHash(password);
        const user = {
          id: crypto.randomUUID(),
          username: "admin",
          full_name: fullName,
          role: "admin"
        };
        await env.DB.prepare(
          `INSERT INTO app_users(id,full_name,role,active,created_at,username,password_hash,email)
           VALUES(?,?,?,1,?,?,?,NULL)`
        ).bind(user.id, user.full_name, user.role, new Date().toISOString(), user.username, hash).run();

        const cookie = await createSession(user, env);
        return json({ success: true }, 200, { "Set-Cookie": cookie });
      }

      if (method === "POST" && path === "/api/login") {
        if (!env.SETUP_SECRET) return json({ error: "Configuration serveur incomplète." }, 500);
        const limit = await checkLoginLimit(request, env);
        if (limit.blocked) return json({ error: "Trop de tentatives. Réessaie dans 15 minutes." }, 429);

        const body = await request.json();
        const username = String(body.username || "").trim();
        const password = String(body.password || "");
        const user = await env.DB.prepare(
          "SELECT id,username,full_name,role,password_hash,active FROM app_users WHERE username=?"
        ).bind(username).first();

        if (!user || user.active !== 1 || !await verifyPassword(password, user.password_hash || "")) {
          await failedLogin(limit, env);
          return json({ error: "Identifiant ou mot de passe incorrect." }, 401);
        }

        await env.DB.prepare("DELETE FROM login_attempts WHERE ip_hash=?").bind(limit.key).run();
        const cookie = await createSession(user, env);
        return json({ success: true }, 200, { "Set-Cookie": cookie });
      }

      if (method === "POST" && path === "/api/logout") {
        const token = getCookie(request);
        if (token) {
          const tokenHash = await sha256(token);
          await env.DB.prepare("DELETE FROM user_sessions WHERE token_hash=?").bind(tokenHash).run();
        }
        return json({ success: true }, 200, {
          "Set-Cookie": cookieHeader("", 0)
        });
      }

      if (method === "GET" && path === "/api/me") {
        const user = await currentUser(request, env);
        if (!user) return json({ error: "Non connecté." }, 401);
        return json({ user });
      }

      if (method === "GET" && path === "/api/health") {
        const user = await currentUser(request, env);
        if (!user || user.role !== "admin") return json({ error: "Accès refusé." }, 403);
        const result = await env.DB.prepare(
          "SELECT name FROM sqlite_schema WHERE type='table' ORDER BY name"
        ).all();
        return json({ status: "Connexion D1 réussie", tables: result.results });
      }

      if (method === "GET" && path === "/") {
        const user = await currentUser(request, env);
        return new Response(user ? dashboard : authPage, {
          headers: { "Content-Type": "text/html; charset=UTF-8", "Cache-Control": "no-store" }
        });
      }

      return json({ error: "Adresse introuvable." }, 404);
    } catch (error) {
      return json({ error: "Erreur du serveur. Vérifie la configuration et les tables D1." }, 500);
    }
  }
};
