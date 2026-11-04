export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "GET" && url.pathname === "/") {
      return Response.json({
        application: "MOSEK MULTI SERVICES",
        status: "Serveur opérationnel"
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
        }, { status: 500 });
      }
    }

    return Response.json({
      error: "Adresse introuvable"
    }, { status: 404 });
  }
};
