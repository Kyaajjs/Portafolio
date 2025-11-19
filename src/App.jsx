import React, { useRef, useEffect } from "react";
import "./App.css";

/* ==========================
   PROYECTOS DEL PORTAFOLIO
   ========================== */

const projects = [
  {
    id: 1,
    title: "TicTac — X y O",
    tags: ["React", "Juego"],
    description: "Juego de Tic Tac Toe con lógica, turnos, ganador y reinicio.",
    
    img: "/image.png", 
    repo: "https://github.com/Kyaajjs/TicTac",
    live: "https://kyaajjs.github.io/TicTac/",
  },
  {
    id: 2,
    title: "CRUD de Formulario",
    tags: ["React", "CRUD", "Form"],
    description: "Formulario con operaciones CRUD, validación y manejo de estado.",
  
    img: "/formulariocrud2.png", 
    repo: "https://github.com/Kyaajjs/CrudFormulario",
    live: "",
  },
  {
    id: 3,
    title: "Escapa de SoyPan",
    tags: ["JavaScript", "Canvas", "Juego"],
    description: "Arcade 2D hecho con JavaScript puro.",
  
    img: "/dos.png", 
    repo: "https://github.com/Kyaajjs/EscapaDeSoyPan",
    live: "https://kyaajjs.github.io/EscapaDeSoyPan/",
  },
  {
    id: 4,
    title: "Red Social",
    tags: ["React", "Firebase"],
    description: "Mini red social con creación de posts, autenticación y base de datos.",
   
    img: "/redsocial.png", 
    repo: "https://github.com/Kyaajjs/RedSocial",
    live: "https://kyaajjs.github.io/RedSocial/",
  },
  {
    id: 5,
    title: "Glosario Final",
    tags: ["React", "Educación"],
    description: "Glosario interactivo para conceptos de HTML, CSS y JS.",
    
    img: "/glosario.png", 
    repo: "https://github.com/Kyaajjs/GlosarioFinal",
    live: "https://kyaajjs.github.io/GlosarioFinal/",
  },
];

function TiltCard({ project }) {
  const elRef = useRef(null);
  const innerRef = useRef(null);
  const shineRef = useRef(null);

  useEffect(() => {
    const el = elRef.current;
    const inner = innerRef.current;
    const shine = shineRef.current;
    if (!el || !inner || !shine) return;

    function handleMove(e) {
      const rect = el.getBoundingClientRect();
      const clientX = e.clientX ?? (e.touches && e.touches[0].clientX);
      const clientY = e.clientY ?? (e.touches && e.touches[0].clientY);
      if (clientX == null || clientY == null) return;

      const px = (clientX - rect.left) / rect.width;
      const py = (clientY - rect.top) / rect.height;

      const rotateY = (px - 0.5) * 28;
      const rotateX = (0.5 - py) * 18;

      inner.style.transform = `
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateZ(26px)
      `;

      const angle = Math.atan2(py - 0.5, px - 0.5) * (180 / Math.PI) + 90;

      shine.style.transform = `rotate(${angle}deg)`;
      shine.style.opacity = "1";
    }

    function handleLeave() {
      inner.style.transform = `rotateX(0deg) rotateY(0deg) translateZ(0px)`;
      shine.style.opacity = "0";
    }

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    el.addEventListener("touchmove", handleMove, { passive: true });
    el.addEventListener("touchend", handleLeave);

    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
      el.removeEventListener("touchmove", handleMove);
      el.removeEventListener("touchend", handleLeave);
    };
  }, []);

  return (
    <div className="card-3d" ref={elRef}>
      <div className="card-inner" ref={innerRef}>
        <div
          className="card-media"
          style={{ backgroundImage: `url(${project.img})` }}
        />
        <div className="card-body">
          <div className="floating-badge">{project.tags[0]}</div>
          <div className="card-title">{project.title}</div>
          <div className="card-desc">{project.description}</div>

          <div className="tags">
            {project.tags.map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>

          <div className="links">
            {project.repo && (
              <a href={project.repo} target="_blank">
                Repositorio
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank">
                Demo
              </a>
            )}
        </div>
      </div>
        <div className="shine" ref={shineRef} />
      </div>
    </div>
  );
}

/* ==========================
   APP PRINCIPAL
   ========================== */

export default function App() {
  return (
    <div className="container">

      {/* HEADER */}
      <header className="header">
        <div className="brand">
          <h1>Ulises Zárate</h1>
          <p>Portafolio</p>
        </div>

        <nav>
          <a href="#projects">Proyectos</a>
          <a href="#about">Sobre mí</a>
          <a href="#contact">Contacto</a>
        </nav>
      </header>

      {/* HERO LANDING NUEVO */}
      <section className="hero">
        <div className="hero-left">
          <h1 className="hero-title-big">Ulises Zárate</h1>
          <h3 className="hero-role">Developer of madness</h3>

          <p className="hero-sub">
            Uso de REACT,JS, NODE, FLUTTER, JAVASCRIPT, entre otros lenguajes de programacion.  
            Orientado al desarrollo de apliaciones WEB.
          </p>

          <div className="cta">
            <a className="btn btn-primary" href="#projects">
              Ver Portafolio ↓
            </a>
          </div>
        </div>

        <img 
          className="avatar" 
          // RUTA CORREGIDA: Usa la raíz del sitio web desplegado
          src="/profile1.jpg" 
          alt="avatar" 
        />
      </section>

      {/* PROYECTOS */}
      <h3 id="projects" className="section-title">
        Proyectos recientes
      </h3>

      <div className="projects-grid">
        {projects.map((p, i) => (
          <div
            key={p.id}
            className="card-wrapper"
            style={{ animationDelay: `${i * 0.18}s` }}
          >
            <TiltCard project={p} />
          </div>
        ))}
      </div>

      {/* SOBRE MI */}
      <section id="about" style={{ marginTop: 36 }}>
        <div className="section-title">Sobre mí</div>

        <div className="about-box">
          <p>
            Soy estudiante de la UACAM (matrícula 66575). Me enfoco en
            interfaces limpias y dinámicas.  
            Me apasionan las paginas WEB, y la experiencia de usuario.
          </p>
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contact" style={{ marginTop: 28 }}>
        <div className="section-title">Contacto</div>

        <div className="contact-grid">
          <input placeholder="Tu nombre" />
          <input placeholder="Tu correo" />
          <textarea placeholder="Tu mensaje" rows={4} />
          <button className="send-btn">Enviar</button>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        © {new Date().getFullYear()} Ulises Zárate
      </footer>
    </div>
  );
}