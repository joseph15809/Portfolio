document.addEventListener("DOMContentLoaded", () => {
    const pinball = document.getElementById("pinball");
    const wardrobe = document.getElementById("wardrobe");
    const ic_circuit = document.getElementById("ic_circuit");
    const solarpunk = document.getElementById("solarpunk");
    const form = document.getElementById("contact_form");
    const success = document.getElementById("contact_success");

    pinball.style.cursor = "pointer";
    wardrobe.style.cursor = "pointer";
    solarpunk.style.cursor = "pointer";

    pinball.addEventListener('click', () =>{
        window.location.href = "pinball.html";
    });

    wardrobe.addEventListener('click', () =>{
        location.href = "https://github.com/joseph15809/final-project-JosephG-jonathanK";
    });

    solarpunk.addEventListener('click', () =>{
        location.href = "https://github.com/joseph15809/syn100_project";
    });

    if (!form) return;

    form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const res = await fetch("https://formspree.io/f/mreyogqk", {
        method: "POST",
        body: new FormData(form),
        headers: { "Accept": "application/json" },
    });

    if (res.ok) {
        form.reset();
        success.style.display = "block";
    }
    });
});