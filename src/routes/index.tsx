import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowDown, ArrowRight, Check, ChefHat, Clock3, Download, Heart,
  Leaf, LockKeyhole, Mail, Menu, ShieldCheck, Sparkles, Star, Utensils,
  WheatOff, MilkOff, X,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "365 Receitas Leves | Uma nova ideia para cada dia" },
      { name: "description", content: "Uma coleção digital com 365 receitas sem açúcar adicionado, sem glúten e sem lactose para variar suas refeições." },
      { property: "og:title", content: "365 Receitas Sem Açúcar, Sem Glúten e Sem Lactose" },
      { property: "og:description", content: "Receitas práticas para trazer mais variedade à sua rotina." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: SalesPage,
});

// Configure estes dados antes de publicar a campanha.
// Não há depoimentos, bônus ou garantia inventados: as seções opcionais só aparecem
// quando os dados reais forem preenchidos.
const CHECKOUT_URL = "";
const META_PIXEL_ID = "";
const GA_MEASUREMENT_ID = "";

const BONUSES: { title: string; description: string }[] = [];
const TESTIMONIALS: { name: string; text: string; detail?: string }[] = [];
const GUARANTEE = {
  title: "",
  days: "",
  description: "",
};

const highlights = [
  { icon: WheatOff, title: "Sem glúten", text: "Receitas elaboradas sem ingredientes com glúten." },
  { icon: MilkOff, title: "Sem lactose", text: "Opções preparadas sem leite e derivados com lactose." },
  { icon: Leaf, title: "Sem açúcar adicionado", text: "Receitas sem adição de açúcar." },
];

const categories = [
  { title: "Bolos e doces", text: "Para acompanhar o café ou fechar uma refeição.", image: "photo-1578985545062-69928b1d9587" },
  { title: "Pães e massas", text: "Alternativas para variar o café da manhã e o dia a dia.", image: "photo-1509440159596-0249088772ff" },
  { title: "Lanches", text: "Ideias práticas para pequenas pausas.", image: "photo-1540420773420-3366772f4999" },
  { title: "Refeições", text: "Preparos para montar pratos variados.", image: "photo-1547592180-85f173990554" },
];

const faqs = [
  { q: "O que é o 365 Receitas?", a: "É uma coleção digital com 365 receitas sem açúcar adicionado, sem glúten e sem lactose, reunindo ideias de bolos, pães, sobremesas, lanches e refeições." },
  { q: "As receitas levam açúcar?", a: "A proposta da coleção é reunir receitas sem adição de açúcar. Confira sempre os ingredientes de cada preparo e escolha os que fazem sentido para suas necessidades." },
  { q: "As receitas são sem glúten e sem lactose?", a: "Sim, essa é a proposta editorial da coleção. Se você tem alergia, doença celíaca ou precisa evitar traços, confira rótulos, procedência e risco de contaminação cruzada dos ingredientes." },
  { q: "Como recebo o material?", a: "O produto é digital. As instruções e o formato de entrega serão apresentados no checkout após a configuração do acesso." },
  { q: "Preciso saber cozinhar?", a: "Não é necessário ser especialista. A coleção foi pensada para inspirar preparos do cotidiano; leia os ingredientes e o modo de preparo antes de começar." },
];

function trackPurchaseIntent() {
  const w = window as Window & { fbq?: (...args: unknown[]) => void; gtag?: (...args: unknown[]) => void };
  if (w.fbq && META_PIXEL_ID) w.fbq("track", "InitiateCheckout");
  if (w.gtag && GA_MEASUREMENT_ID) w.gtag("event", "begin_checkout", { currency: "BRL", value: 19.9 });
}

function SalesPage() {
  const [notice, setNotice] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const w = window as Window & { fbq?: (...args: unknown[]) => void; gtag?: (...args: unknown[]) => void; dataLayer?: unknown[] };
    if (META_PIXEL_ID) {
      if (!w.fbq) {
        const fbq = (...args: unknown[]) => { (fbq as unknown as { queue: unknown[][] }).queue.push(args); };
        (fbq as unknown as { queue: unknown[][] }).queue = [];
        w.fbq = fbq;
        const script = document.createElement("script");
        script.async = true;
        script.src = "https://connect.facebook.net/en_US/fbevents.js";
        document.head.appendChild(script);
      }
      w.fbq("init", META_PIXEL_ID);
      w.fbq("track", "PageView");
    }
    if (GA_MEASUREMENT_ID) {
      w.dataLayer = w.dataLayer || [];
      w.gtag = (...args: unknown[]) => { w.dataLayer?.push(args); };
      const script = document.createElement("script");
      script.async = true;
      script.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_MEASUREMENT_ID;
      document.head.appendChild(script);
      w.gtag("js", new Date());
      w.gtag("config", GA_MEASUREMENT_ID);
    }
  }, []);

  function goToCheckout() {
    trackPurchaseIntent();
    if (CHECKOUT_URL) {
      window.location.href = CHECKOUT_URL;
      return;
    }
    setNotice("O link do checkout ainda não foi configurado. Adicione a URL em CHECKOUT_URL antes de publicar.");
  }

  return (
    <main className="sales-page">
      <div className="announcement"><Sparkles size={14} /> 365 ideias para deixar sua rotina mais variada</div>
      <header className="site-header">
        <a href="#inicio" className="brand" aria-label="365 Receitas - início"><span className="brand-mark"><Leaf size={20} /></span><span>365 <b>RECEITAS</b></span></a>
        <button className="menu-toggle" aria-label={mobileMenu ? "Fechar menu" : "Abrir menu"} onClick={() => setMobileMenu(!mobileMenu)}>{mobileMenu ? <X /> : <Menu />}</button>
        <nav className={mobileMenu ? "nav-links is-open" : "nav-links"}>
          <a href="#colecao" onClick={() => setMobileMenu(false)}>A coleção</a>
          <a href="#conteudo" onClick={() => setMobileMenu(false)}>O que você recebe</a>
          <a href="#duvidas" onClick={() => setMobileMenu(false)}>Dúvidas</a>
          <button className="nav-cta" onClick={goToCheckout}>Quero conhecer <ArrowRight size={16} /></button>
        </nav>
      </header>

      <section className="hero section-wrap" id="inicio">
        <div className="hero-copy">
          <span className="eyebrow"><span className="eyebrow-dot" /> COZINHA DO DIA A DIA, COM MAIS POSSIBILIDADES</span>
          <h1>365 receitas para redescobrir o prazer de <em>comer bem.</em></h1>
          <p className="hero-lead">Uma coleção digital de receitas sem açúcar adicionado, sem glúten e sem lactose — com ideias para diferentes momentos da sua rotina.</p>
          <div className="hero-checks">
            <span><Check size={16} /> 365 receitas</span>
            <span><Check size={16} /> Acesso digital</span>
            <span><Check size={16} /> Variedade para o dia a dia</span>
          </div>
          <div className="hero-actions">
            <button className="button button-primary" onClick={goToCheckout}>QUERO AS 365 RECEITAS <ArrowRight size={18} /></button>
            <a href="#colecao" className="text-link">Conhecer a coleção <ArrowDown size={15} /></a>
          </div>
          <div className="price-note"><span className="price-label">ACESSO À COLEÇÃO</span><strong>R$ 19,90</strong><span>Pagamento único, conforme condições do checkout.</span></div>
        </div>
        <div className="hero-visual">
          <div className="hero-photo-frame">
            <img src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1100&q=85" alt="Mesa com variedade de alimentos frescos e coloridos" />
          </div>
          <div className="floating-note note-top"><span className="note-icon"><Utensils size={18} /></span><span><b>Para vários momentos</b><small>Do café à refeição</small></span></div>
          <div className="floating-note note-bottom"><span className="note-number">365</span><span><b>receitas</b><small>em uma coleção digital</small></span></div>
          <div className="hero-leaf leaf-one"><Leaf /></div>
        </div>
      </section>

      <section className="promise-strip" aria-label="Características da coleção">
        <div><WheatOff /><span>Sem glúten</span></div><i />
        <div><MilkOff /><span>Sem lactose</span></div><i />
        <div><Leaf /><span>Sem açúcar adicionado</span></div><i />
        <div><Download /><span>Formato digital</span></div>
      </section>

      <section className="section section-benefits" id="colecao">
        <div className="section-heading centered">
          <span className="eyebrow">UMA COLEÇÃO, MUITAS POSSIBILIDADES</span>
          <h2>Comer de um jeito diferente não precisa ser complicado.</h2>
          <p>Ter boas ideias à mão ajuda a sair da repetição e descobrir novos preparos para a mesa.</p>
        </div>
        <div className="benefit-grid">
          {highlights.map((item) => <article className="benefit-card" key={item.title}><span className="benefit-icon"><item.icon size={23} /></span><h3>{item.title}</h3><p>{item.text}</p></article>)}
        </div>
      </section>

      <section className="section preview-section">
        <div className="preview-image"><img src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=85" alt="Prato colorido com vegetais e ingredientes frescos" /><span className="image-caption">IDEIAS PARA COLOCAR EM PRÁTICA</span></div>
        <div className="preview-copy"><span className="eyebrow">INSPIRAÇÃO PARA TODOS OS DIAS</span><h2>Chega de ficar pensando: “o que eu vou preparar hoje?”</h2><p>Com 365 receitas reunidas em um só lugar, você tem mais opções para planejar refeições, testar combinações e variar o cardápio ao longo do ano.</p><ul className="check-list"><li><Check /> Ideias para diferentes momentos do dia</li><li><Check /> Preparos doces e salgados</li><li><Check /> Uma coleção para consultar quando precisar</li></ul><button className="button button-outline" onClick={goToCheckout}>QUERO VER A COLEÇÃO <ArrowRight size={17} /></button></div>
      </section>

      <section className="section value-section">
        <div className="value-card"><div className="value-top"><span className="eyebrow">UM ANO DE IDEIAS À MÃO</span><span className="value-stamp"><ChefHat size={20} /> COLEÇÃO DIGITAL</span></div><div className="value-number">365</div><h2>receitas reunidas em uma coleção.</h2><p>Mais possibilidades para experimentar, adaptar e incluir novos sabores na rotina.</p><div className="value-bottom"><span><Check /> Bolos, pães e sobremesas</span><span><Check /> Lanches e refeições</span><span><Check /> Sem açúcar adicionado, glúten e lactose</span></div></div>
      </section>

      <section className="section content-section" id="conteudo">
        <div className="section-heading"><span className="eyebrow">UM POUCO DO QUE VOCÊ VAI ENCONTRAR</span><h2>Da primeira refeição ao momento da sobremesa.</h2><p>Uma seleção de categorias para ajudar você a encontrar inspiração em diferentes ocasiões.</p></div>
        <div className="category-grid">{categories.map((cat) => <article className="category-card" key={cat.title}><div className="category-image"><img src={`https://images.unsplash.com/${cat.image}?auto=format&fit=crop&w=700&q=80`} alt={cat.title} loading="lazy" /></div><div className="category-info"><span>NA COLEÇÃO</span><h3>{cat.title}</h3><p>{cat.text}</p></div></article>)}</div>
      </section>

      <section className="section audience-section">
        <div className="audience-copy"><span className="eyebrow">FEITA PARA A VIDA REAL</span><h2>Uma coleção para quem quer mais opções na cozinha.</h2><p>Não importa se você gosta de testar receitas no fim de semana ou precisa de ideias para a correria: a proposta é ter variedade para consultar no seu ritmo.</p></div>
        <div className="audience-list"><div><span>01</span><p>Quem busca receitas sem açúcar adicionado.</p></div><div><span>02</span><p>Quem evita glúten ou lactose na alimentação.</p></div><div><span>03</span><p>Quem quer variar o cardápio sem depender sempre das mesmas ideias.</p></div><div><span>04</span><p>Quem gosta de descobrir novos preparos e sabores.</p></div></div>
      </section>

      {BONUSES.length > 0 && <section className="section bonus-section"><div className="section-heading centered"><span className="eyebrow">CONTEÚDOS EXTRAS</span><h2>E tem mais para acompanhar sua coleção.</h2></div><div className="bonus-grid">{BONUSES.map((bonus) => <article className="bonus-card" key={bonus.title}><span><Sparkles /></span><h3>{bonus.title}</h3><p>{bonus.description}</p></article>)}</div></section>}

      <section className="offer-section" id="oferta"><div className="offer-inner"><div className="offer-copy"><span className="eyebrow">SUA PRÓXIMA IDEIA PODE ESTAR AQUI</span><h2>365 receitas. Mais variedade para a sua cozinha.</h2><p>Tenha a coleção digital completa por um valor acessível e consulte as ideias sempre que quiser.</p><div className="offer-includes"><span><Check /> 365 receitas</span><span><Check /> Sem açúcar adicionado</span><span><Check /> Sem glúten e sem lactose</span><span><Check /> Acesso digital</span></div></div><div className="price-card"><span className="price-card-label">ACESSO À COLEÇÃO COMPLETA</span><div className="price">R$ <strong>19</strong><sup>,90</sup></div><span className="payment-note">Pagamento único</span><button className="button button-primary button-full" onClick={goToCheckout}>QUERO AS 365 RECEITAS <ArrowRight size={18} /></button><div className="secure-note"><LockKeyhole size={14} /> Finalização segura pelo checkout</div></div></div></section>

      {TESTIMONIALS.length > 0 && <section className="section testimonials-section"><div className="section-heading centered"><span className="eyebrow">EXPERIÊNCIAS REAIS</span><h2>Quem já conhece a coleção.</h2></div><div className="testimonial-grid">{TESTIMONIALS.map((item) => <article className="testimonial-card" key={item.name}><div className="stars"><Star /><Star /><Star /><Star /><Star /></div><p>“{item.text}”</p><b>{item.name}</b>{item.detail && <small>{item.detail}</small>}</article>)}</div></section>}

      {GUARANTEE.title && GUARANTEE.days && GUARANTEE.description && <section className="section guarantee-section"><div className="guarantee-icon"><ShieldCheck size={30} /></div><div><span className="eyebrow">COMPRA COM TRANQUILIDADE</span><h2>{GUARANTEE.title}</h2><p>{GUARANTEE.days} dias. {GUARANTEE.description}</p></div></section>}

      <section className="section delivery-section"><div className="delivery-icon"><Download size={28} /></div><div className="delivery-copy"><span className="eyebrow">SIMPLES E DIGITAL</span><h2>Uma coleção digital para consultar no seu ritmo.</h2><p>Você não precisa esperar uma entrega física. As informações sobre liberação e acesso ao material serão exibidas durante a finalização da compra.</p></div><div className="delivery-side"><Mail size={22} /><b>Sem produto físico</b><span>Consulte os detalhes de acesso no checkout.</span></div></section>

      <section className="section faq-section" id="duvidas"><div className="section-heading centered"><span className="eyebrow">AINDA TEM DÚVIDAS?</span><h2>Respondemos o que você precisa saber.</h2></div><div className="faq-list">{faqs.map((faq, i) => <article className={openFaq === i ? "faq-item active" : "faq-item"} key={faq.q}><button onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i}><span>{faq.q}</span><span className="faq-plus">{openFaq === i ? "−" : "+"}</span></button>{openFaq === i && <p>{faq.a}</p>}</article>)}</div></section>

      <section className="final-cta"><span className="eyebrow">365 DIAS DE INSPIRAÇÃO NA COZINHA</span><h2>Abra espaço para novas receitas na sua rotina.</h2><p>Conheça a coleção 365 Receitas Sem Açúcar, Sem Glúten e Sem Lactose.</p><button className="button button-light" onClick={goToCheckout}>QUERO AS 365 RECEITAS <ArrowRight size={18} /></button><span className="final-price">Acesso à coleção por <b>R$ 19,90</b></span></section>

      <footer className="site-footer"><a href="#inicio" className="brand footer-brand"><span className="brand-mark"><Leaf size={18} /></span><span>365 <b>RECEITAS</b></span></a><p>Conteúdo digital informativo. Verifique sempre os rótulos dos ingredientes e as orientações adequadas às suas necessidades alimentares.</p><span>© {new Date().getFullYear()} 365 Receitas. Todos os direitos reservados.</span></footer>
      {notice && <div className="notice" role="status"><span>{notice}</span><button onClick={() => setNotice("")} aria-label="Fechar aviso"><X size={17} /></button></div>}
      <button className="mobile-buy" onClick={goToCheckout}><span><small>COLEÇÃO COMPLETA</small><b>R$ 19,90</b></span><span>QUERO AS RECEITAS <ArrowRight size={16} /></span></button>
    </main>
  );
}
