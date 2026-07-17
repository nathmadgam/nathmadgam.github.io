import { ContactForm } from "@/components/ContactForm";
import { ContractViewer } from "@/components/ContractViewer";
import { GameGrid } from "@/components/GameGrid";
import { InteractiveShell } from "@/components/InteractiveShell";
import { NetworkGrid } from "@/components/NetworkGrid";
import { SkillGrid } from "@/components/SkillGrid";
import { SocialIcon } from "@/components/SocialIcon";
import { Testimonials } from "@/components/Testimonials";
import { VideoCollage } from "@/components/VideoCollage";
import { discordServers, games, process, projects, reviews, robloxGroups, skills } from "@/lib/data";
import { assetPath } from "@/lib/paths";

const links = [
  ["Work", "#work"],
  ["Games", "#games"],
  ["Skills", "#skills"],
  ["Feedback", "#reviews"],
  ["Agreement", "#agreement"],
  ["Contact", "#contact"],
] as const;

function Kicker({ number, children }: { number: string; children: React.ReactNode }) {
  return <div className="section-kicker"><span>{number}</span><span>{children}</span></div>;
}

export default function Home() {
  return (
    <>
      <InteractiveShell />
      <a href="#main" className="skip-link">Skip to content</a>
      <div className="ambient-grid" aria-hidden="true" />
      <div className="scanline" aria-hidden="true" />
      <div className="pointer-halo" aria-hidden="true" />

      <header className="site-header">
        <a href="#top" className="brand" aria-label="Cynex home"><span>CX</span><strong>CYNEX</strong></a>
        <nav aria-label="Primary navigation">{links.map(([label, href]) => <a href={href} key={href}>{label}</a>)}</nav>
        <a className="header-cta" href="mailto:nathanielmadridgaminde@proton.me">Start a project ↗</a>
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="hero-copy" data-reveal>
            <p className="eyebrow"><span>ROBLOX / LUAU</span><span>PROGRAMMER / SYSTEMS DEVELOPER</span></p>
            <h1><span>BUILDING</span><span>SYSTEMS</span><span>THAT HOLD.</span></h1>
            <p className="hero-intro">I build Roblox gameplay, backend services, persistent data, interfaces, moderation tools, and production systems that remain clear after launch.</p>
            <div className="hero-actions">
              <a href="#work" className="button-primary">Explore selected work <span>↘</span></a>
              <a href="#contact">Start a conversation <span>→</span></a>
              <a href="#agreement">View client agreement <span>↗</span></a>
            </div>
          </div>

          <div className="hero-visual" data-reveal>
            <div className="portrait-frame">
              <img src={assetPath("/images/avatar.webp")} alt="Portrait of Cynex" />
              <span className="portrait-scan" aria-hidden="true" />
              <span className="portrait-stamp">CX<br />08+</span>
            </div>
            <aside className="profile-console">
              <div><span>PROFILE.SYS</span><span className="availability"><i /> AVAILABLE</span></div>
              <dl>
                <div><dt>Focus</dt><dd>Gameplay and backend systems</dd></div>
                <div><dt>Experience</dt><dd>8+ years in Roblox Studio</dd></div>
                <div><dt>Location</dt><dd>Philippines · UTC+8</dd></div>
                <div><dt>Delivery</dt><dd>Remote collaboration</dd></div>
                <div><dt>Local time</dt><dd data-pht-clock>--:--:-- PHT</dd></div>
              </dl>
              <div className="signal-bars" aria-hidden="true">{Array.from({ length: 8 }, (_, index) => <span key={index} />)}</div>
            </aside>
          </div>
        </section>

        <aside className="live-rail">
          <p><i /> Currently accepting Roblox development inquiries</p>
          <div>
            <span><strong data-count="8">0</strong><small>years building</small></span>
            <span><strong data-count="6">0</strong><small>system demos</small></span>
            <span><strong data-count="3">0</strong><small>live experiences</small></span>
          </div>
          <div className="ticker"><div>GAMEPLAY PROGRAMMING • BACKEND LOGIC • DATA SYSTEMS • UI DEVELOPMENT • TESTING • ROBLOX LUAU • GAMEPLAY PROGRAMMING • BACKEND LOGIC • DATA SYSTEMS • UI DEVELOPMENT • TESTING • ROBLOX LUAU •</div></div>
        </aside>

        <section className="section about" id="about">
          <Kicker number="00">ABOUT THE WORK</Kicker>
          <div className="about-grid">
            <h2 data-reveal>Roblox systems built to stay clear, stable, and maintainable.</h2>
            <div data-reveal><p>I am Cynex, a Roblox programmer and systems developer studying computer science with a game-development focus. My work includes gameplay systems, DataStore architecture, responsive interfaces, moderation tools, NPC behaviour, economies, and internal tooling.</p><p>I organize projects around reusable Luau modules, server-side validation, predictable state, and clear configuration so the work remains practical for a team to extend.</p></div>
            <div className="stat-grid" data-reveal><span><strong data-count="16">0</strong><small>system demos</small></span><span><strong data-count="9">0</strong><small>client reviews</small></span><span><strong data-count="3">0</strong><small>published experiences</small></span></div>
          </div>
        </section>

        <section className="section" id="work">
          <div className="section-heading"><div><Kicker number="01">SELECTED SYSTEMS</Kicker><h2 data-reveal>Selected Roblox systems in motion.</h2></div><p data-reveal>Six compact demonstrations covering gameplay, persistent data, NPC behaviour, interfaces, economy systems, and reusable frameworks.</p></div>
          <VideoCollage projects={projects} />
        </section>

        <section className="section" id="games">
          <div className="section-heading"><div><Kicker number="02">LIVE EXPERIENCES</Kicker><h2 data-reveal>Published Roblox experiences.</h2></div><p data-reveal>Each project shows the game name, official creator, my role as Programmer, and the experience description.</p></div>
          <GameGrid games={games} />
        </section>

        <section className="section" id="skills">
          <Kicker number="03">PROFESSIONAL RANGE</Kicker>
          <div className="skills-layout">
            <div data-reveal><h2>A clear view of my programming proficiency.</h2><p>These percentages describe my current working confidence across the general areas used in professional software and Roblox game development.</p></div>
            <SkillGrid skills={skills} />
          </div>
        </section>

        <section className="section" id="process">
          <div className="section-heading"><div><Kicker number="04">DEVELOPMENT PROCESS</Kicker><h2 data-reveal>A practical workflow for Roblox development.</h2></div></div>
          <ol className="process-grid">{process.map((item, index) => <li key={item.title} data-reveal><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.description}</p></li>)}</ol>
        </section>

        <section className="section" id="network">
          <div className="section-heading"><div><Kicker number="05">STUDIOS AND SERVERS</Kicker><h2 data-reveal>Roblox groups and developer communities.</h2></div><p data-reveal>Studios, groups, and Discord communities connected to my Roblox development work.</p></div>
          <div className="network-columns"><NetworkGrid title="Roblox groups" items={robloxGroups} /><NetworkGrid title="Discord servers" items={discordServers} /></div>
        </section>

        <section className="section reviews" id="reviews">
          <div className="reviews-layout">
            <div data-reveal><Kicker number="06">CLIENT FEEDBACK</Kicker><h2>Feedback from Roblox development clients.</h2><p>Nine five-star Fiverr reviews from completed scripting orders, including repeat clients, delivery ranges, and project timelines.</p></div>
            <Testimonials reviews={reviews} />
          </div>
        </section>

        <section className="section" id="agreement">
          <div className="section-heading agreement-heading"><div><Kicker number="07">CONTRACT AGREEMENT FORM</Kicker><h2 data-reveal>Review the agreement before starting a project.</h2></div><p data-reveal>The five-page form records project scope, payments, revisions, ownership, confidentiality, cancellation terms, and signatures. Read it online or download the fillable PDF.</p></div>
          <ContractViewer />
        </section>

        <section className="section contact" id="contact">
          <div className="contact-grid">
            <div data-reveal><Kicker number="08">START A PROJECT</Kicker><h2>Have a Roblox system that needs to be built properly?</h2><p>Send the project scope, target deadline, expected deliverables, and any existing technical constraints.</p></div>
            <ContactForm />
          </div>
          <div className="social-grid">
            <a href="mailto:nathanielmadridgaminde@proton.me"><SocialIcon name="mail" /><span><small>Email</small><strong>nathanielmadridgaminde@proton.me</strong></span><i>↗</i></a>
            <a href="https://discord.gg/sAQtQyyS" target="_blank" rel="noreferrer"><SocialIcon name="discord" /><span><small>Discord</small><strong>Join the Cynex server</strong></span><i>↗</i></a>
            <a href="https://www.linkedin.com/in/nathaniel-madrid" target="_blank" rel="noreferrer"><SocialIcon name="linkedin" /><span><small>LinkedIn</small><strong>Nathaniel Madrid</strong></span><i>↗</i></a>
            <a href="https://x.com/cynexcodes" target="_blank" rel="noreferrer"><SocialIcon name="x" /><span><small>X</small><strong>@cynexcodes</strong></span><i>↗</i></a>
          </div>
        </section>
      </main>

      <footer><span>CYNEX © 2026</span><span>ROBLOX PROGRAMMER · PHILIPPINES</span><a href="#top">Back to top ↑</a></footer>
    </>
  );
}
