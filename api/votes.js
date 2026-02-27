import fs from 'fs';
import path from 'path';

const votesFile = path.join(process.cwd(), 'votes.json');

export default async function handler(req, res) {
  // Lire ou créer le fichier votes.json
  if (!fs.existsSync(votesFile)) fs.writeFileSync(votesFile, JSON.stringify([]));

  let votes = JSON.parse(fs.readFileSync(votesFile, 'utf8'));

  if (req.method === 'GET') {
    // Récupérer tous les votes
    res.status(200).json({ votes });
  } 
  else if (req.method === 'POST') {
    const { pseudo } = req.body;

    if (!pseudo || pseudo.trim() === "") {
      return res.status(400).json({ error: "Pseudo manquant" });
    }

    votes.push(pseudo.trim());
    fs.writeFileSync(votesFile, JSON.stringify(votes, null, 2));

    res.status(200).json({ message: "Vote enregistré !" });
  } 
  else {
    res.status(405).json({ error: "Méthode non autorisée" });
  }
}
