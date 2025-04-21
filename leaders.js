// Leader data
const leaders = {
  leader1: {
    name: "President Patient Joël NISHIMWE",
    image: "president.png",
    quote: "Let wisdom guide us and peace define us.",
    oath: "joel.m4a"
  },
  leader2: {
    name: "Vice President Olivier MUGISHA",
    image: "vice.png",
    quote: "Courage and compassion for every Fridonian.",
    oath: "studio.mp3"
  },
  leader3: {
    name: "Secretary General Hervè Seba MANZI",
    image: "secretary.png",
    quote: "With integrity as our anchor, no storm can shake us.",
    oath: "audio/oath2.mp3"
  }
};

document.querySelectorAll('.leader-card').forEach(card => {
  card.addEventListener('click', () => {
    const id = card.getAttribute('data-id');
    const leader = leaders[id];

    if (leader) {
      document.getElementById("popup-img").src = leader.image;
      document.getElementById("popup-name").textContent = leader.name;
      document.getElementById("popup-quote").textContent = leader.quote;
      document.getElementById("popup-audio").src = leader.oath;

      document.getElementById("popup").style.display = "flex";
    }
  });
});

function closePopup() {
  const audio = document.getElementById("popup-audio");
  audio.pause();
  audio.currentTime = 0;
  document.getElementById("popup").style.display = "none";
}