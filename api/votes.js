async function confirmVote() {
    const name = document.getElementById("voteName").value.trim();
    const message = document.getElementById("voteMessage");

    if(!name) {
        message.textContent = "Veuillez entrer votre pseudo Minecraft !";
        return;
    }

    try {
        const res = await fetch('/api/votes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pseudo: name })
        });

        const data = await res.json();

        if(res.ok) {
            message.textContent = "Le vote a été envoyé ! Vous pouvez revoter dans 1 jour !";
            document.getElementById("voteName").value = "";
        } else {
            message.textContent = data.error || "Erreur lors de l'envoi du vote.";
        }
    } catch (err) {
        console.error(err);
        message.textContent = "Erreur lors de l'envoi du vote.";
    }
}
