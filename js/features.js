/**
 * Image Lightbox feature + Lazy Loading Item Images
 * - Tap to see full-size photo
 * - Back button closes lightbox instead of navigating away
 * - Item images load on demand (lazy loading)
 */

(function () {
  "use strict";

  let lightbox, lightboxImg, lightboxClose;
  let isLightboxOpen = false;
  let lastFocusedElement = null;

  /**
   * Initialize all features
   */
  function init() {
    createLightboxElements();
    attachLightboxListeners();
    setupItemImageLazyLoading();
  }

  /**
   * Create lightbox DOM elements
   */
  function createLightboxElements() {
    lightbox = document.createElement("div");
    lightbox.id = "lightbox";
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-modal", "true");
    lightbox.setAttribute("aria-hidden", "true");
    lightbox.innerHTML = `
      <div class="lightbox-backdrop"></div>
      <div class="lightbox-content">
        <button class="lightbox-close" aria-label="Close">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6 6 18"/>
            <path d="m6 6 12 12"/>
          </svg>
        </button>
        <img class="lightbox-img" src="" alt="Full size image" />
      </div>
    `;
    document.body.appendChild(lightbox);

    lightboxImg = lightbox.querySelector(".lightbox-img");
    lightboxClose = lightbox.querySelector(".lightbox-close");
  }

  /**
   * Attach event listeners for lightbox
   */
  function attachLightboxListeners() {
    // Close button
    lightboxClose.addEventListener("click", closeLightbox);

    // Click on backdrop to close
    lightbox
      .querySelector(".lightbox-backdrop")
      .addEventListener("click", closeLightbox);

    // Keyboard - Escape to close
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && isLightboxOpen) {
        closeLightbox();
      }
    });

    // Handle browser back button
    window.addEventListener("popstate", (e) => {
      if (isLightboxOpen) {
        e.preventDefault();
        closeLightbox(false); // Don't push state again
      }
    });

    // Make item images clickable
    document.addEventListener("click", (e) => {
      // Item images
      const itemImgContainer = e.target.closest(".item-img-container");
      if (itemImgContainer) {
        const src = itemImgContainer.dataset.src;
        const img = itemImgContainer.querySelector(".item-img-main");
        const alt = img?.alt || "Item image";
        if (src) {
          openLightbox(src, alt);
        }
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key !== "Enter" && e.key !== " ") return;

      const itemImgContainer = e.target.closest(".item-img-container");
      if (itemImgContainer) {
        e.preventDefault();
        const src = itemImgContainer.dataset.src;
        const img = itemImgContainer.querySelector(".item-img-main");
        const alt = img?.alt || "Item image";
        if (src) {
          openLightbox(src, alt);
        }
      }
    });
  }

  /**
   * Open lightbox with image
   */
  function openLightbox(src, alt) {
    lastFocusedElement = document.activeElement;
    lightboxImg.src = src;
    lightboxImg.alt = alt || "Full size image";
    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");
    isLightboxOpen = true;
    document.body.style.overflow = "hidden";
    lightboxClose.focus();

    // Push state so back button closes lightbox instead of navigating away
    history.pushState({ lightbox: true }, "");
  }

  /**
   * Close lightbox
   */
  function closeLightbox(goBack = true) {
    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");
    isLightboxOpen = false;
    document.body.style.overflow = "";
    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
      lastFocusedElement.focus();
    }

    // Go back in history if we pushed a state
    if (goBack && history.state?.lightbox) {
      history.back();
    }
  }

  /**
   * Setup lazy loading for item images
   */
  function setupItemImageLazyLoading() {
    const imageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const container = entry.target;
            const src = container.dataset.src;

            if (src) {
              loadItemImage(container, src);
            }

            imageObserver.unobserve(container);
          }
        });
      },
      {
        root: null,
        rootMargin: "100px 0px", // Start loading 100px before visible
        threshold: 0,
      },
    );

    // Observe all item image containers
    const imageContainers = document.querySelectorAll(".item-img-container");
    imageContainers.forEach((container) => {
      container.setAttribute("tabindex", "0");
      container.setAttribute("role", "button");
      container.setAttribute("aria-label", "View item image");
      imageObserver.observe(container);
    });
  }

  /**
   * Load an item image with blur background
   */
  function loadItemImage(container, src) {
    const bgEl = container.querySelector(".item-img-bg");
    const imgEl = container.querySelector(".item-img-main");

    if (!imgEl) return;

    imgEl.onload = () => {
      // Set the background blur (uses cached image, no extra request)
      if (bgEl) {
        bgEl.style.backgroundImage = `url('${src}')`;
        bgEl.classList.add("loaded");
      }

      imgEl.classList.add("loaded");
      container.classList.add("loaded");
    };

    imgEl.onerror = () => {
      container.style.display = "none";
    };

    // Single network request — the <img> element itself does the loading
    imgEl.src = src;
  }

  // Expose init globally for KSS_ENGINE.onReady to call
  window.initFeatures = init;
})();
