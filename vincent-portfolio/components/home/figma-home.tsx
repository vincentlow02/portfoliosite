import Image from "next/image";
import Link from "next/link";
import { getProjects } from "@/content/projects";
import styles from "./figma-home.module.css";

const introLines = [
  "Product designer based in Japan.",
  "Focused on creating clear, intuitive experiences for everyday life.",
];

const navItems = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/projects" },
  { label: "Connect", href: "/contact" },
];

export function FigmaHome() {
  const projects = getProjects();

  return (
    <main className={styles.page}>
      <div className={styles.frame}>
        <section className={styles.intro}>
          <Image
            src="/images/home-portrait.png"
            alt="Portrait of Vincent Low Sik Ching"
            width={56}
            height={56}
            className={styles.portrait}
            priority
          />

          <div className={styles.copy}>
            <h1 className={styles.name}>Vincent Low Sik Ching</h1>

            <div className={styles.summary}>
              {introLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
        </section>

        <nav aria-label="Homepage" className={styles.nav}>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={styles.navLink}>
              {item.label}
            </Link>
          ))}
        </nav>

        <section aria-labelledby="selected-work" className={styles.workList}>
          <h2 id="selected-work" className={styles.srOnly}>
            Selected work
          </h2>

          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className={styles.workItem}
            >
              <span className={styles.workTitle}>{project.name}</span>
              <span className={styles.workMeta}>
                {project.year} . {project.category}
              </span>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
