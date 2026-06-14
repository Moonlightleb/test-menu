/* ==========================================================
   MOONLIGHT — Menu Script  (powered by KSS_ENGINE)
   ========================================================== */

const DOM = {
  menuButtons: document.getElementById("btn-group"),
  menuBody: document.getElementById("menu-body"),
  header: document.getElementById("header"),
  content: document.getElementById("content"),
  progressBar: document.getElementById("progress-bar"),
  progress: document.getElementById("progress"),
  loaderLogo: document.getElementById("loader-logo"),
  upButton: document.getElementById("up-btn"),
  progressRingFill: document.querySelector("#up-btn .progress-ring-fill"),
};

const APPEAR_POINT = window.innerHeight * 0.1;
const PROGRESS_RING_RADIUS = 22.5;
const PROGRESS_RING_CIRCUMFERENCE = 2 * Math.PI * PROGRESS_RING_RADIUS;

const INLINE_ICONS = {
  location:
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-fill" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.3 1.3 0 0 0-.37.265.3.3 0 0 0-.057.09V14l.002.008.016.033a.6.6 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.6.6 0 0 0 .146-.15l.015-.033L12 14v-.004a.3.3 0 0 0-.057-.09 1.3 1.3 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465s-2.462-.172-3.34-.465c-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411"/></svg>',
  phone:
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telephone-fill" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/></svg>',
  instagram:
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-instagram" viewBox="0 0 16 16"><path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/></svg>',
  facebook:
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16"><path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/></svg>',
  whatsapp:
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-whatsapp" viewBox="0 0 16 16"><path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/></svg>',
};

KSS_ENGINE.init({
  serviceId: "6a17240f2d67f9047e7ccda4",
  type: "menu",
  filterEmpty: true,
  fallbackPath: "./data/menu.json",
  fallbackOnly: false,
});

KSS_ENGINE.error.subscribe(function (err) {
  if (!err) return;

  if (DOM.loaderLogo) {
    DOM.loaderLogo.textContent = "Failed to load menu. Please refresh.";
  }

  if (DOM.progress) {
    DOM.progress.style.display = "none";
  }
});

loader();
setFooterYear();

KSS_ENGINE.onReady(function (menuData) {
  const store = menuData.store;
  const subCategories = menuData.subCategories;

  KSS_ENGINE.setupPageMeta(store);
  setLoaderLogo(store.storeName);
  buildHeader(store);
  buildWhatsappButton(store);
  displayMenu(subCategories, store);

  KSS_ENGINE.waitForImages().then(function () {
    revealContent();
    setupIntersectionObserver();
    setupScrollLinks();

    if (typeof window.initFeatures === "function") {
      window.initFeatures();
    }
  });
});

function joinMarkup(parts) {
  return parts.filter(Boolean).join("");
}

function setLoaderLogo(storeName) {
  if (DOM.loaderLogo) {
    DOM.loaderLogo.textContent = storeName;
  }
}

function isSvgAssetPath(path) {
  return /\.svg(?:$|[?#])/i.test(path || "");
}

function renderDetailsLink(options) {
  if (!options.href) return "";

  var attributes = [
    'class="a-white"',
    'href="' + options.href + '"',
    options.targetBlank ? 'target="_blank" rel="noopener noreferrer"' : "",
    options.ariaLabel ? 'aria-label="' + options.ariaLabel + '"' : "",
  ]
    .filter(Boolean)
    .join(" ");

  return joinMarkup([
    '<div class="details ' + options.variant + '">',
    "<a " + attributes + ">",
    options.icon,
    options.wrapText === false
      ? options.text
      : "<span>" + options.text + "</span>",
    "</a>",
    "</div>",
  ]);
}

function renderHeaderMarkup(store) {
  var primaryLinks = joinMarkup([
    store.sm && store.sm.locationUrl
      ? renderDetailsLink({
          variant: "primary",
          href: store.sm.locationUrl,
          targetBlank: true,
          ariaLabel: "Open location in maps",
          icon: INLINE_ICONS.location,
          text: store.sm.location || "",
        })
      : "",
    store.phoneNumber
      ? renderDetailsLink({
          variant: "primary",
          href: "tel:" + store.phoneNumber,
          ariaLabel: "Call restaurant",
          icon: INLINE_ICONS.phone,
          text: store.displayedPhoneNumber || store.phoneNumber,
          wrapText: false,
        })
      : "",
  ]);

  var socialLinks = joinMarkup([
    store.sm && store.sm.instagramUrl
      ? renderDetailsLink({
          variant: "primary",
          href: store.sm.instagramUrl,
          targetBlank: true,
          ariaLabel: "Open Instagram",
          icon: INLINE_ICONS.instagram,
          text: "Instagram",
        })
      : "",
    store.sm && store.sm.facebookUrl
      ? renderDetailsLink({
          variant: "primary",
          href: store.sm.facebookUrl,
          targetBlank: true,
          ariaLabel: "Open Facebook",
          icon: INLINE_ICONS.facebook,
          text: "Facebook",
        })
      : "",
  ]);

  return joinMarkup([
    '<div class="brand-shell">',
    store.storeLogo
      ? '<div class="img-header"><img src="' +
        store.storeLogo +
        '" alt="' +
        store.storeName +
        '" class="bg-image" loading="eager" /></div>'
      : "",
    '<div class="brand-copy">',
    '<h1 class="brand-title">' + store.storeName + "</h1>",
    '<p class="brand-subtitle">' +
      (store.quote || "Snack Bar Since 1989") +
      "</p>",
    '<div class="contact-stack">',
    primaryLinks,
    '<div class="social-row">' + socialLinks + "</div>",
    "</div>",
    "</div>",
    "</div>",
  ]);
}

function renderCategoryButton(subCategory) {
  var categoryImage = (subCategory.img || "").trim();
  var thumbMarkup = categoryImage
    ? isSvgAssetPath(categoryImage)
      ? '<span class="category-thumb image-thumb" aria-hidden="true"><span class="category-thumb-image svg-thumb" style="--category-icon-src: url(\'' +
        categoryImage +
        "')\"></span></span>"
      : '<span class="category-thumb image-thumb" aria-hidden="true"><img src="' +
        categoryImage +
        '" alt="" class="category-thumb-image" loading="lazy" decoding="async" /></span>'
    : "";

  return joinMarkup([
    '<button type="button" aria-pressed="false" onclick="click_Tag(\'' +
      subCategory._id +
      '\')" aria-label="Jump to ' +
      subCategory.label +
      ' section">',
    '<a style="display: none" class="reference" href="#' +
      subCategory._id +
      '"></a>',
    '<div class="category-chip">',
    thumbMarkup,
    '<span class="category-label">' + subCategory.label + "</span>",
    "</div>",
    "</button>",
  ]);
}

function renderSectionHeader(subCategory) {
  var hasHeroImage = Boolean(subCategory.bgImg);
  var sectionDescription = (subCategory.description || "").trim();

  return joinMarkup([
    '<div class="section-header' +
      (hasHeroImage ? " has-hero-image" : "") +
      '">',
    '<div class="section-copy">',
    '<p id="' +
      subCategory._id +
      '-title" class="section-title">' +
      KSS_ENGINE.capitalizeFirstLetter(subCategory.label) +
      "</p>",
    sectionDescription
      ? '<p class="section-kicker">' + sectionDescription + "</p>"
      : "",
    "</div>",
    hasHeroImage
      ? '<div class="section-img-container"><img src="' +
        subCategory.bgImg +
        '" alt="' +
        subCategory.label +
        '" class="section-img-main" loading="lazy" /></div>'
      : "",
    "</div>",
  ]);
}

function renderItemBadges(item) {
  var badges = [];

  if (item.is_New) {
    badges.push('<span class="badge badge-new">New</span>');
  }

  if (item.is_Starred) {
    badges.push('<span class="badge badge-starred">⭐</span>');
  }

  return badges.length
    ? '<div class="item-badges">' + badges.join("") + "</div>"
    : "";
}

function renderItemImage(item) {
  if (!item.img) return "";

  return joinMarkup([
    '<div class="item-img-container" data-src="' + item.img + '">',
    '<div class="item-img-bg"></div>',
    '<img class="item-img-main" alt="' + item.label + '" loading="lazy" />',
    "</div>",
  ]);
}

function renderItem(item, store) {
  var price = KSS_ENGINE.formatPrice(item.price, store.currency);

  return joinMarkup([
    '<div class="item' + (item.img ? " has-image" : "") + '">',
    renderItemImage(item),
    '<div class="item-content">',
    '<div class="item-header">',
    '<div class="item-summary">',
    '<div class="item-title-row">',
    '<div class="item-name">' + item.label + "</div>",
    renderItemBadges(item),
    "</div>",
    item.calories
      ? '<span class="calories">' + item.calories + " cal</span>"
      : "",
    "</div>",
    '<div class="item-details">',
    '<div class="description">' + (item.description || "") + "</div>",
    "</div>",
    "</div>",
    price
      ? '<div class="price" aria-label="Price ' +
        price +
        '">' +
        price +
        "</div>"
      : "",
    "</div>",
  ]);
}

function buildHeader(store) {
  if (!DOM.header) return;
  DOM.header.innerHTML = renderHeaderMarkup(store);
}

function buildWhatsappButton(store) {
  if (!store.sm || !store.sm.whatsappUrl || !DOM.content) return;

  var wp = document.createElement("div");
  wp.id = "wp-btn";
  wp.setAttribute("role", "button");
  wp.setAttribute("tabindex", "0");
  wp.setAttribute("aria-label", "Open WhatsApp");
  wp.innerHTML =
    '<a href="' +
    store.sm.whatsappUrl +
    '" target="_blank" rel="noopener noreferrer" style="padding-top: 3px;" aria-hidden="true">' +
    INLINE_ICONS.whatsapp +
    "</a>";
  DOM.content.appendChild(wp);
}

function displayMenu(subCategories, store) {
  if (!DOM.menuButtons || !DOM.menuBody) return;

  DOM.menuButtons.innerHTML = "";
  DOM.menuBody.innerHTML = "";

  subCategories.forEach(function (subCategory) {
    var section = document.createElement("section");
    var article = document.createElement("article");

    DOM.menuButtons.insertAdjacentHTML(
      "beforeend",
      renderCategoryButton(subCategory),
    );

    section.id = subCategory._id;
    section.setAttribute("tabindex", "-1");
    section.setAttribute("aria-labelledby", subCategory._id + "-title");

    if (subCategory.bgImg) {
      section.classList.add("has-hero-image");
    }

    section.innerHTML = renderSectionHeader(subCategory);

    subCategory.items.forEach(function (item) {
      article.insertAdjacentHTML("beforeend", renderItem(item, store));
    });

    section.appendChild(article);
    DOM.menuBody.appendChild(section);
  });
}

function setupScrollLinks() {
  var scrollLinks = document.querySelectorAll(".reference");

  scrollLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();

      var id = event.currentTarget.getAttribute("href").slice(1);
      var element = document.getElementById(id);
      var navHeight = DOM.menuButtons
        ? DOM.menuButtons.getBoundingClientRect().height
        : 0;
      var position = element.offsetTop - navHeight - 7;

      window.scrollTo({ left: 0, top: position, behavior: "smooth" });
    });
  });
}

function revealContent() {
  if (!DOM.content || !DOM.progressBar) return;

  DOM.content.style.display = "block";
  DOM.progressBar.style.opacity = "0";

  setTimeout(function () {
    DOM.progressBar.style.display = "none";
  }, 300);
}

function setFooterYear() {
  var yearNode = document.getElementById("year");
  if (!yearNode) return;

  yearNode.innerHTML = "&copy; " + new Date().getFullYear();
}

function loader() {
  var progress = 0;

  function updateProgress(value) {
    progress = value;
    if (DOM.progress) {
      DOM.progress.style.setProperty("--progress", value + "%");
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    updateProgress(20);

    var interval = setInterval(function () {
      progress += 5;
      updateProgress(Math.min(progress, 80));
      if (progress >= 80) clearInterval(interval);
    }, 100);

    var slowInterval = setInterval(function () {
      progress += 1;
      updateProgress(Math.min(progress, 98));
      if (progress >= 98) clearInterval(slowInterval);
    }, 500);
  });
}

function setupIntersectionObserver() {
  const sections = document.querySelectorAll("section");
  const buttons = document.querySelectorAll("#btn-group button");
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  function setActiveButton(id) {
    buttons.forEach(function (button) {
      const isActive = !!button.querySelector('a[href="#' + id + '"]');
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));

      if (isActive) {
        button.setAttribute("aria-current", "true");
        button.scrollIntoView({
          behavior: prefersReducedMotion ? "auto" : "smooth",
          inline: "center",
          block: "nearest",
        });
      } else {
        button.removeAttribute("aria-current");
      }
    });
  }

  const categoryObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          setActiveButton(entry.target.id);
        }
      });
    },
    {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    },
  );

  const sectionObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.remove("scroll-hidden");
          entry.target.classList.add("scroll-visible");
        }
      });
    },
    {
      root: null,
      rootMargin: "0px 0px -20% 0px",
      threshold: 0,
    },
  );

  const itemObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.remove("scroll-hidden");
          entry.target.classList.add("scroll-visible");
          itemObserver.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      rootMargin: "0px 0px -15% 0px",
      threshold: 0,
    },
  );

  sections.forEach(function (section, index) {
    var items = section.querySelectorAll(".item");

    if (index === 0) {
      section.classList.add("scroll-visible");
      items.forEach(function (item) {
        item.classList.add("scroll-visible");
      });
    } else {
      section.classList.add("scroll-hidden");
      items.forEach(function (item) {
        item.classList.add("scroll-hidden");
        itemObserver.observe(item);
      });
    }

    categoryObserver.observe(section);
    sectionObserver.observe(section);
  });

  if (buttons.length > 0) {
    var firstReference = buttons[0].querySelector("a.reference");
    if (firstReference) {
      setActiveButton(firstReference.getAttribute("href").slice(1));
    }
  }
}

function click_Tag(id) {
  var link = document.querySelector('a[href="#' + id + '"]');
  if (link) {
    link.click();
  }
}

function updateScrollIndicator() {
  if (!DOM.progressRingFill) return;

  var documentHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  var scrollPercentage = Math.min(window.scrollY / documentHeight, 1);
  var offset = PROGRESS_RING_CIRCUMFERENCE * (1 - scrollPercentage);

  DOM.progressRingFill.style.strokeDashoffset = offset;
}

function updateStickyNavState() {
  if (!DOM.menuButtons) return;

  DOM.menuButtons.classList.toggle(
    "is-stuck",
    window.scrollY > 0 && DOM.menuButtons.getBoundingClientRect().top <= 0,
  );
}

window.addEventListener("scroll", function () {
  var wpButton = document.getElementById("wp-btn");

  updateStickyNavState();

  if (window.scrollY >= APPEAR_POINT) {
    if (wpButton) wpButton.style.display = "flex";
    if (DOM.upButton) DOM.upButton.style.display = "flex";
    updateScrollIndicator();
  } else {
    if (wpButton) wpButton.style.display = "flex";
    if (DOM.upButton) DOM.upButton.style.display = "none";
  }
});

window.addEventListener("resize", updateStickyNavState);
document.addEventListener("DOMContentLoaded", updateStickyNavState);

document.addEventListener("keydown", function (event) {
  var wpButton = document.getElementById("wp-btn");
  if (!wpButton) return;

  if (
    (event.key === "Enter" || event.key === " ") &&
    event.target === wpButton
  ) {
    event.preventDefault();
    var link = wpButton.querySelector("a");
    if (link) {
      link.click();
    }
  }
});
