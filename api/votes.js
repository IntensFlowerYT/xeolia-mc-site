// /api/votes.js
const BIN_ID = "69a172acae596e708f4ef256";
const API_KEY = "$2a$10$N5DlNsKsz3NWeCh56SQGgu.TY56MvBgsMxXLWE5puD1dnRLXdAnbq";

export default async function handler(req, res) {
    const url = `https://api.jsonbin.io/v3/b/${BIN_ID}/latest`;

    try {
        if(req.method === "GET") {
            const r = await fetch(url, { headers: { "X-Master-Key": API_KEY } });
            const data = await r.json();
            res.status(200).json({ votes: data.record.votes || [] });
        }
        else if(req.method === "POST") {
            const { pseudo } = req.body;
            if(!pseudo || pseudo.trim() === "") return res.status(400).json({ error: "Pseudo manquant" });

            const r = await fetch(url, { headers: { "X-Master-Key": API_KEY } });
            const data = await r.json();
            const votes = data.record.votes || [];

            votes.push(pseudo.trim());

            await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "X-Master-Key": API_KEY,
                    "X-Bin-Versioning": "false"
                },
                body: JSON.stringify({ votes })
            });

            res.status(200).json({ message: "Vote enregistré !" });
        }
        else {
            res.status(405).json({ error: "Méthode non autorisée" });
        }
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: "Erreur serveur" });
    }
}
