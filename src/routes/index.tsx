import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight, Check, ChevronDown, Download, Heart, Leaf, LockKeyhole,
  Menu, ShieldCheck, Smartphone, Star, Tablet, Utensils, WheatOff, MilkOff, X,
  BookOpen, ShoppingBasket, CalendarDays, Printer, Laptop, Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "365 Receitas Leves Sem Açúcar | Coleção Digital" },
      { name: "description", content: "365 receitas doces e salgadas sem açúcar adicionado, sem glúten e sem lactose. Conheça a coleção digital e os materiais extras." },
      { property: "og:title", content: "365 Receitas Leves Sem Açúcar" },
      { property: "og:description", content: "Descubra um novo jeito de aproveitar cada receita!" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: SalesPage,
});

// CONFIGURE AQUI antes de anunciar:
// Cole os links reais de checkout e os IDs das ferramentas de análise.
const CHECKOUT_BASIC_URL = "";
const CHECKOUT_COMPLETE_URL = "";
const REFUND_POLICY_URL = "";
const PRIVACY_POLICY_URL = "";
const TERMS_URL = "";
const SUPPORT_URL = "";
const META_PIXEL_ID = "";
const GA_MEASUREMENT_ID = "";

const recipes = [
  { title: "Bolo de cenoura com cobertura", description: "Aquele bolo fofinho da tarde, com cobertura brilhante de chocolate.", image: "photo-1578985545062-69928b1d9587" },
  { title: "Pão caseiro sem glúten", description: "Cheirinho de pão saindo do forno, com casca crocante e miolo macio.", image: "photo-1509440159596-0249088772ff" },
  { title: "Panqueca de banana", description: "Um café da manhã gostoso e rápido, com frutas frescas por cima.", image: "photo-1528207776546-365bb710ee93" },
  { title: "Lasanha sem glúten", description: "Camadas generosas de legumes e molho caseiro para o almoço de domingo.", image: "photo-1476124369491-e7addenf7a5e" },
  { title: "Brigadeiro sem açúcar adicionado", description: "O docinho mais querido, em uma versão sem açúcar adicionado.", image: "photo-1548908226-7b9f7f2c1a2c" },
  { title: "Torta salgada de frango", description: "Massa dourada e recheio cremoso para reunir a família.", image: "photo-1601050690597-df0568f70950" },
  { title: "Brownie de chocolate", description: "Casquinha craquelada por fora e aquele centro úmido por dentro.", image: "photo-1606313564200-e75d5e30476c" },
  { title: "Cookies sem glúten", description: "Crocantes, com aveia e gotas de chocolate, para acompanhar o café.", image: "photo-1499636136210-6f4ee915583e" },
];

const categories = [
  { count: "45", title: "Café da manhã", icon: "☀️" },
  { count: "55", title: "Pães, bolos e massas", icon: "🍞" },
  { count: "55", title: "Almoços e jantares", icon: "🍽️" },
  { count: "45", title: "Lanches e salgados", icon: "🥪" },
  { count: "55", title: "Sobremesas", icon: "🍓" },
  { count: "35", title: "Receitas sem lactose", icon: "🥥" },
  { count: "35", title: "Molhos e acompanhamentos", icon: "🥣" },
  { count: "40", title: "Bebidas e preparações extras", icon: "🍹" },
];

const bonuses = [
  { number: "BÔNUS 1", title: "Lista de Compras Essenciais", text: "Uma lista organizada para facilitar suas compras e ajudar você a manter os ingredientes necessários sempre à mão.", icon: ShoppingBasket, cover: "LISTA DE COMPRAS" },
  { number: "BÔNUS 2", title: "Cardápio de 30 Dias", text: "Um planejamento de refeições para ajudar você a organizar seu mês e variar suas preparações.", icon: CalendarDays, cover: "CARDÁPIO 30 DIAS" },
  { number: "BÔNUS 3", title: "Guia de Substituições", text: "Conheça alternativas de ingredientes para adaptar suas receitas e descobrir novas combinações.", icon: BookOpen, cover: "GUIA DE TROCAS" },
];

const testimonials = [
  { name: "Juliana", initials: "JS", text: "Comprei por causa das sobremesas e já fiz brownie, brigadeiro e panqueca. Tudo simples e gostoso. Agora tenho opção quando bate vontade de doce.", recipe: "Receita preparada por Juliana", likes: "2" },
  { name: "Andressa", initials: "AR", text: "Minha filha não pode consumir lactose e eu nunca sabia o que preparar para ela. Hoje consigo fazer desde bolos e tortas até sobremesas cremosas que ela adora.", recipe: "Receita preparada por Andressa", likes: "" },
  { name: "Rosilene", initials: "RD", text: "As receitas são super fáceis de acompanhar e levam ingredientes simples, que encontro em qualquer mercado. Já fiz a torta salgada várias vezes e todo mundo aqui em casa adorou!", recipe: "Receita preparada por Rosilene", likes: "" },
  { name: "Renata", initials: "RB", text: "Gostei muito das receitas! São fáceis de fazer e usam ingredientes que a gente encontra sem dificuldade. Já fiz a torta salgada aqui em casa e todo mundo gostou. Com certeza vou fazer outras vezes!", recipe: "Receita preparada por Renata", likes: "" },
  { name: "Ana", initials: "AM", text: "Sempre achei que bolo sem açúcar não teria o mesmo gosto, mas me surpreendi com o de cenoura! Ficou bem fofinho e gostoso. Até o pessoal aqui de casa comeu e adorou!", recipe: "Receita preparada por Ana", likes: "" },
];

const faqs = [
  { q: "Como vou receber minha coleção?", a: "A coleção é disponibilizada digitalmente após a confirmação da compra, pelo canal de entrega informado no momento da compra. Confira as instruções apresentadas no checkout." },
  { q: "Em quais aparelhos posso acessar?", a: "Você pode consultar o material pelo celular, tablet ou computador, desde que o aparelho consiga abrir o formato disponibilizado." },
  { q: "Preciso ter experiência na cozinha?", a: "Não. A coleção foi pensada para quem gosta de cozinhar e também para quem está começando. Leia os ingredientes e o modo de preparo antes de iniciar cada receita." },
  { q: "Os ingredientes são fáceis de encontrar?", a: "As receitas priorizam ingredientes de uso culinário cotidiano. A disponibilidade pode variar conforme a região e a receita escolhida." },
  { q: "A coleção tem receitas doces e salgadas?", a: "Sim. Há ideias para café da manhã, pães, bolos, massas, refeições, lanches, salgados, sobremesas, molhos, acompanhamentos e bebidas." },
  { q: "Posso imprimir as receitas?", a: "Sim, se o arquivo disponibilizado permitir impressão. Você pode selecionar as páginas que deseja imprimir nas configurações do seu aparelho." },
  { q: "Por quanto tempo terei acesso?", a: "As condições e o prazo de acesso são informados na página de checkout antes da conclusão da compra. Confira essa informação no momento do pedido." },
  { q: "Como funciona a garantia?", a: "A oferta informa prazo de garantia de 15 dias, conforme as condições apresentadas no momento da compra. Consulte a política de reembolso para conhecer o procedimento." },
  { q: "A coleção é indicada para pessoas com doença celíaca?", a: "A coleção reúne receitas propostas sem glúten, mas isso não substitui a conferência de rótulos nem garante ausência de contaminação cruzada. Pessoas com doença celíaca devem verificar ingredientes, marcas e utensílios com cuidado." },
  { q: "Sem açúcar significa sem açúcares naturais?", a: "Não necessariamente. “Sem açúcar adicionado” significa que não há adição de açúcar à receita; alguns ingredientes, como frutas e leite, podem conter açúcares naturalmente presentes." },
];

function trackCheckout(value: number, plan: string) {
  const w = window as Window & { fbq?: (...args: unknown[]) => void; gtag?: (...args: unknown[]) => void };
  if (w.fbq && META_PIXEL_ID) w.fbq("track", "InitiateCheckout", { value, currency: "BRL", content_name: plan });
  if (w.gtag && GA_MEASUREMENT_ID) w.gtag("event", "begin_checkout", { value, currency: "BRL", item_name: plan });
}

function SalesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [notice, setNotice] = useState("");

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

  function checkout(plan: "basic" | "complete") {
    const url = plan === "basic" ? CHECKOUT_BASIC_URL : CHECKOUT_COMPLETE_URL;
    trackCheckout(plan === "basic" ? 14.9 : 24.9, plan === "basic" ? "365 Receitas - Versão Básica" : "365 Receitas + 3 Bônus");
    if (url) window.location.href = url;
    else setNotice("O link deste checkout ainda não foi configurado. Adicione a URL correspondente no início de src/routes/index.tsx.");
  }

  return (
    <main className="lp-page">
      <div className="lp-topbar">
        <span><WheatOff size={14} /> Sem açúcar adicionado</span><i />
        <span><WheatOff size={14} /> Sem glúten</span><i />
        <span><MilkOff size={14} /> Sem lactose</span><i />
        <span><Download size={14} /> Acesso digital</span>
      </div>

      <header className="lp-header">
        <a href="#inicio" className="lp-logo"><span className="lp-logo-icon"><Leaf size={19} /></span><span>365 <b>RECEITAS LEVES</b></span></a>
        <button className="lp-menu-button" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Abrir menu">{mobileMenu ? <X /> : <Menu />}</button>
        <nav className={mobileMenu ? "lp-nav lp-nav-open" : "lp-nav"}>
          <a href="#colecao" onClick={() => setMobileMenu(false)}>A coleção</a>
          <a href="#previa" onClick={() => setMobileMenu(false)}>Prévia</a>
          <a href="#oferta" onClick={() => setMobileMenu(false)}>Oferta</a>
          <a href="#duvidas" onClick={() => setMobileMenu(false)}>Dúvidas</a>
          <button onClick={() => checkout("complete")}>QUERO MINHAS RECEITAS <ArrowRight size={15} /></button>
        </nav>
      </header>

      <section className="lp-hero" id="inicio">
        <div className="lp-hero-copy">
          <span className="lp-kicker"><Sparkles size={15} /> MAIS SABOR, MAIS VARIEDADE</span>
          <h1>365 Receitas Leves <em>Sem Açúcar</em></h1>
          <h2>Descubra um novo jeito de aproveitar cada receita!</h2>
          <p>365 receitas para explorar novos sabores, preparar pratos deliciosos e deixar sua rotina na cozinha muito mais variada.</p>
          <p>Uma coleção digital repleta de ideias para cafés da manhã, refeições, lanches e sobremesas, com opções sem açúcar adicionado, sem glúten e sem lactose.</p>
          <button className="lp-button lp-button-primary" onClick={() => checkout("complete")}>QUERO MINHAS 365 RECEITAS! <ArrowRight size={18} /></button>
          <div className="lp-hero-assurances">
            <span><Download /> Acesso digital após a compra</span>
            <span><Smartphone /> Para celular e computador</span>
            <span><ShieldCheck /> Garantia de 15 dias*</span>
          </div>
          <small className="lp-footnote">*Conforme as condições informadas na oferta.</small>
        </div>
        <div className="lp-hero-art lp-hero-art-showcase">
          <div className="lp-hero-food"><img src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=90" alt="Mesa farta com receitas leves, frutas e preparações variadas" /></div>
          <div className="lp-book-mock"><div className="lp-book-leaf"><Leaf size={23} /></div><small>COLEÇÃO DIGITAL</small><strong>365</strong><b>RECEITAS<br/>LEVES</b><span>Sem açúcar adicionado</span><div className="lp-book-mini-img"><img src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=500&q=80" alt="Prato colorido com vegetais" /></div></div>
          <div className="lp-phone-mock"><div className="lp-phone-speaker"></div><div className="lp-phone-screen"><small>SUA COLEÇÃO</small><b>365 receitas</b><span>Escolha uma categoria</span><div><i>☀️</i>Café da manhã</div><div><i>🍓</i>Sobremesas</div><div><i>🥗</i>Refeições</div><div><i>🍞</i>Pães e bolos</div><div><i>🥥</i>Sem lactose</div></div></div>
          <div className="lp-hero-sticker"><b>365</b><span>receitas<br/>para inspirar</span></div>
          <div className="lp-hero-caption"><span>✦</span> DOCES E SALGADAS <span>✦</span></div>
        </div>
      </section>

      <section className="lp-intro-strip"><span>365 receitas</span><i /><span>Doces & salgadas</span><i /><span>Uma coleção digital</span></section>

      <section className="lp-section lp-why" id="colecao">
        <div className="lp-section-heading"><span className="lp-kicker">POR QUE VOCÊ VAI AMAR</span><h2>Mais variedade para sua rotina,<br/><em>mais sabor em cada preparação</em></h2><p>Chega de ficar sem ideias na hora de cozinhar! Tenha uma coleção completa de inspirações para descobrir novas combinações e preparar receitas para diferentes momentos do seu dia.</p></div>
        <div className="lp-feature-grid">
          {[
            ["☀️","Ideias para diferentes refeições"],["🍃","Opções sem açúcar adicionado"],["🌾","Preparações sem glúten"],
            ["🥥","Alternativas sem lactose"],["🍓","Receitas doces e salgadas"],["📖","Conteúdo organizado para facilitar sua consulta"],
          ].map(([icon,title]) => <div className="lp-feature" key={title}><span>{icon}</span><b>{title}</b></div>)}
        </div>
      </section>

      <section className="lp-section lp-preview" id="previa">
        <div className="lp-section-heading"><span className="lp-kicker">UMA PRÉVIA DA COLEÇÃO</span><h2>Qual delas você vai preparar <em>primeiro?</em></h2><p>Explore algumas das delícias que fazem parte da nossa coleção.</p></div>
        <div className="lp-recipe-grid">{recipes.map((recipe) => <article className="lp-recipe-card" key={recipe.title}><div className="lp-recipe-image"><img src={`https://images.unsplash.com/${recipe.image}?auto=format&fit=crop&w=700&q=85`} alt={recipe.title} loading="lazy" /></div><div className="lp-recipe-copy"><h3>{recipe.title}</h3><p>{recipe.description}</p></div></article>)}</div>
        <button className="lp-button lp-button-primary lp-center-button" onClick={() => checkout("complete")}>QUERO MINHAS 365 RECEITAS! <ArrowRight size={18} /></button>
      </section>

      <section className="lp-category-section">
        <div className="lp-section lp-category-inner"><div className="lp-section-heading"><span className="lp-kicker">O QUE TEM NA COLEÇÃO</span><h2>365 ideias para inspirar seus momentos <em>na cozinha</em></h2><p>Da primeira refeição do dia até aquela sobremesa especial, encontre inspirações para diferentes ocasiões.</p></div>
          <div className="lp-category-grid">{categories.map((item) => <article className="lp-category-card" key={item.title}><span>{item.icon}</span><div><strong>{item.count}</strong><small>receitas</small></div><b>{item.title}</b></article>)}</div>
          <div className="lp-total"><strong>365</strong><span>receitas no total</span></div>
        </div>
      </section>

      <section className="lp-section lp-audience">
        <div className="lp-audience-image"><img src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=85" alt="Mesa com diferentes preparações e ingredientes" loading="lazy" /><span>MUITAS POSSIBILIDADES À MESA</span></div>
        <div className="lp-audience-copy"><span className="lp-kicker">PARA QUEM É</span><h2>Encontre novas possibilidades <em>para sua cozinha</em></h2><p>Se você gosta de experimentar receitas diferentes, procura alternativas para determinados ingredientes ou simplesmente deseja variar seu cardápio, esta coleção foi pensada para trazer mais inspiração ao seu dia a dia.</p>
          <ul>{["Para quem deseja variar as refeições.","Para quem procura alternativas sem glúten.","Para quem procura preparações sem lactose.","Para quem deseja reduzir o consumo de açúcar adicionado.","Para quem está cansado de preparar sempre as mesmas receitas.","Para quem deseja encontrar opções práticas para toda a família.","Para quem gosta de cozinhar, mesmo sem muita experiência."].map(x => <li key={x}><Check size={17}/>{x}</li>)}</ul>
        </div>
      </section>

      <section className="lp-section lp-bonus">
        <div className="lp-section-heading"><span className="lp-kicker">MATERIAIS EXTRAS</span><h2>E sua coleção vem acompanhada de <em>materiais extras!</em></h2><p>Além das receitas, você terá recursos complementares para organizar suas refeições e aproveitar ainda mais sua experiência.</p></div>
        <div className="lp-bonus-grid">{bonuses.map((bonus) => <article className="lp-bonus-card" key={bonus.number}><span className="lp-bonus-number">{bonus.number}</span><div className="lp-bonus-cover"><div className="lp-cover-mark"><bonus.icon size={27}/></div><small>365 RECEITAS LEVES</small><b>{bonus.cover}</b><span>ORGANIZE • PLANEJE • EXPLORE</span></div><h3>{bonus.title}</h3><p>{bonus.text}</p></article>)}</div>
      </section>

      <section className="lp-offer" id="oferta">
        <div className="lp-offer-inner"><div className="lp-section-heading"><span className="lp-kicker">OFERTA</span><h2>Escolha a experiência <em>ideal para você</em></h2><p>Tenha mais inspiração e praticidade para descobrir novas receitas todos os dias.</p></div>
          <div className="lp-plans">
            <article className="lp-plan lp-plan-basic"><span className="lp-plan-label">VERSÃO BÁSICA</span><h3>365 Receitas Leves Sem Açúcar</h3><ul><li><Check/>365 receitas leves sem açúcar adicionado</li><li><Check/>Receitas doces e salgadas</li><li><Check/>Conteúdo organizado por categorias</li><li><Check/>Acesso digital ao e-book</li></ul><div className="lp-plan-price"><small>R$</small>14<sup>,90</sup></div><button className="lp-button lp-button-outline" onClick={() => checkout("basic")}>QUERO AS 365 RECEITAS! <ArrowRight size={17}/></button><div className="lp-plan-trust"><LockKeyhole size={14}/> Pagamento seguro</div></article>
            <article className="lp-plan lp-plan-complete"><div className="lp-best-value">MELHOR CUSTO-BENEFÍCIO</div><span className="lp-plan-label">PACOTE COMPLETO</span><h3>365 Receitas + 3 Bônus</h3><ul><li><Check/>Tudo da versão básica</li><li><Check/><b>BÔNUS 1:</b> Cardápio de 30 Dias</li><li><Check/><b>BÔNUS 2:</b> Lista de Compras Inteligente</li><li><Check/><b>BÔNUS 3:</b> Guia de Substituições</li></ul><div className="lp-digital-count">4 MATERIAIS DIGITAIS</div><p className="lp-plan-description">365 receitas + 3 materiais complementares</p><p className="lp-upsell-copy">Por apenas <b>R$ 10,00 a mais</b>, leve também os 3 materiais extras!</p><div className="lp-plan-price"><small>R$</small>24<sup>,90</sup></div><button className="lp-button lp-button-primary" onClick={() => checkout("complete")}>SIM! QUERO O PACOTE COMPLETO! <ArrowRight size={17}/></button><div className="lp-plan-trust"><LockKeyhole size={14}/> Pagamento seguro</div></article>
          </div>
          <div className="lp-payment-notes"><span><LockKeyhole/> Pagamento seguro</span><span><Download/> Acesso digital após aprovação do pagamento</span><span><Smartphone/> Compatível com celular e computador</span></div>
        </div>
      </section>

      <section className="lp-section lp-testimonials">
        <div className="lp-section-heading"><span className="lp-kicker">AVALIAÇÕES</span><h2>Uma nova forma de ter mais inspiração <em>na cozinha</em></h2><p>Conheça os benefícios de ter receitas e ferramentas práticas reunidas em um só lugar.</p></div>
        <div className="lp-testimonial-grid">{testimonials.map((item) => <article className="lp-testimonial" key={item.name}><small className="lp-recipe-by">{item.recipe}</small><div className="lp-stars" aria-label="5 estrelas"><Star/><Star/><Star/><Star/><Star/></div><p>{item.text}</p><div className="lp-reviewer"><span>{item.initials}</span><b>{item.name}</b><small>Compradora</small></div><div className="lp-like"><Heart size={14}/> Curtir {item.likes && <b>· {item.likes}</b>}</div></article>)}</div>
      </section>

      <section className="lp-section lp-practical">
        <div className="lp-section-heading"><span className="lp-kicker">NA PRÁTICA</span><h2>O que você vai encontrar <em>nessa coleção</em></h2></div>
        <div className="lp-practical-grid">
          <article><span>01</span><div><h3>Chega de repetir as mesmas receitas</h3><p>365 ideias doces e salgadas para variar o cardápio.</p></div></article>
          <article><span>02</span><div><h3>Mais praticidade no dia a dia</h3><p>Receitas com ingredientes, quantidades, preparo, tempo e rendimento.</p></div></article>
          <article><span>03</span><div><h3>Mais facilidade para se organizar</h3><p>O pacote completo inclui um cardápio de 30 dias e uma lista de compras inteligente.</p></div></article>
          <article><span>04</span><div><h3>Mais possibilidades na cozinha</h3><p>Um guia de substituições para ajudar a adaptar preparações conforme os ingredientes disponíveis.</p></div></article>
        </div>
      </section>

      <section className="lp-guarantee">
        <div className="lp-guarantee-seal"><ShieldCheck size={33}/><strong>15</strong><span>DIAS DE<br/>GARANTIA</span></div>
        <div><span className="lp-kicker">SUA COMPRA COM MAIS TRANQUILIDADE</span><h2>Você tem 15 dias de garantia.</h2><p>Você conta com um prazo de 15 dias de garantia, conforme as condições da oferta. Queremos que você tenha segurança para conhecer o material.</p><a href={REFUND_POLICY_URL || "#politicas"} onClick={(e) => { if (!REFUND_POLICY_URL) { e.preventDefault(); setNotice("Adicione o link da política de reembolso em REFUND_POLICY_URL."); } }}>Ver política de reembolso <ArrowRight size={15}/></a></div>
      </section>

      <section className="lp-section lp-delivery">
        <div className="lp-section-heading"><span className="lp-kicker">ENTREGA DIGITAL</span><h2>Sua coleção <em>sempre à mão</em></h2><p>Consulte suas receitas quando quiser, diretamente pelo celular, tablet ou computador. Tenha suas inspirações culinárias disponíveis em formato digital.</p></div>
        <div className="lp-device-grid">
          <article><Smartphone/><b>Celular</b><span>Consulte suas receitas pelo smartphone.</span></article>
          <article><Laptop/><b>Computador</b><span>Visualize o material em uma tela maior.</span></article>
          <article><Tablet/><b>Tablet</b><span>Tenha uma experiência confortável de leitura.</span></article>
          <article><Printer/><b>Impressão</b><span>Imprima as páginas que desejar.</span></article>
        </div>
        <p className="lp-delivery-note">A coleção é disponibilizada digitalmente após a confirmação da compra, pelo canal de entrega informado no momento da compra.</p>
      </section>

      <section className="lp-section lp-faq" id="duvidas">
        <div className="lp-section-heading"><span className="lp-kicker">DÚVIDAS</span><h2>Perguntas <em>frequentes</em></h2></div>
        <div className="lp-faq-list">{faqs.map((faq,i) => <article className="lp-faq-item" key={faq.q}><button onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i}><span>{faq.q}</span><ChevronDown className={openFaq === i ? "lp-chevron lp-chevron-open" : "lp-chevron"}/></button>{openFaq === i && <p>{faq.a}</p>}</article>)}</div>
      </section>

      <section className="lp-final"><span className="lp-kicker">365 NOVAS INSPIRAÇÕES PARA SUA COZINHA!</span><h2>Descubra receitas, experimente combinações e encontre novas maneiras de preparar seus pratos favoritos.</h2><button className="lp-button lp-button-light" onClick={() => checkout("complete")}>QUERO MINHA COLEÇÃO! <ArrowRight size={18}/></button><span>365 Receitas Leves Sem Açúcar</span></section>

      <footer className="lp-footer" id="politicas"><a href="#inicio" className="lp-logo"><span className="lp-logo-icon"><Leaf size={18}/></span><span>365 <b>RECEITAS LEVES</b></span></a><nav><a href={PRIVACY_POLICY_URL || "#politicas"} onClick={(e)=>{if(!PRIVACY_POLICY_URL){e.preventDefault();setNotice("Adicione o link da política de privacidade em PRIVACY_POLICY_URL.");}}}>Política de privacidade</a><a href={TERMS_URL || "#politicas"} onClick={(e)=>{if(!TERMS_URL){e.preventDefault();setNotice("Adicione o link dos termos de uso em TERMS_URL.");}}}>Termos de uso</a><a href={REFUND_POLICY_URL || "#politicas"} onClick={(e)=>{if(!REFUND_POLICY_URL){e.preventDefault();setNotice("Adicione o link da política de reembolso em REFUND_POLICY_URL.");}}}>Política de reembolso</a><a href={SUPPORT_URL || "#politicas"} onClick={(e)=>{if(!SUPPORT_URL){e.preventDefault();setNotice("Adicione o link do suporte em SUPPORT_URL.");}}}>Suporte</a></nav><p>© 2026 365 Receitas Leves Sem Açúcar. Todos os direitos reservados.</p><small>As informações da oferta, condições de acesso e política de reembolso devem ser conferidas antes da compra. Receitas sem açúcar adicionado não significam necessariamente ausência de açúcares naturalmente presentes.</small></footer>

      {notice && <div className="lp-notice" role="status"><span>{notice}</span><button onClick={() => setNotice("")} aria-label="Fechar aviso"><X size={17}/></button></div>}
      <div className="lp-mobile-bar"><div><small>COLEÇÃO COMPLETA</small><b>R$ 24,90</b></div><button onClick={() => checkout("complete")}>QUERO O PACOTE <ArrowRight size={16}/></button></div>
    </main>
  );
}
