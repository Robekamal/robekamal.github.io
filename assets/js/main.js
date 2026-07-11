document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const siteHeader = document.querySelector(".site-header");
  const readingProgress = document.getElementById("readingProgress");

  const overlay =
    document.getElementById("pageOverlay") ||
    document.getElementById("overlay");

  const menuButton = document.getElementById("menuButton");
  const closeMenuButton = document.getElementById("closeMenuButton");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileMenuLinks = document.querySelectorAll(".mobile-nav a");

  const searchButton = document.getElementById("searchButton");
  const closeSearchButton = document.getElementById("closeSearchButton");
  const searchPanel = document.getElementById("searchPanel");
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");
  const searchMessage = document.getElementById("searchMessage");
  const searchTags = document.querySelectorAll(
    "[data-search-term], .search-tags button, .search-tags a"
  );

  const themeButton = document.getElementById("themeButton");
  const themeIcon = document.getElementById("themeIcon");

  const articleList = document.querySelector(".article-list");
  const loadMoreButton = document.getElementById("loadMoreButton");
  const filterButtons = document.querySelectorAll("[data-filter]");
  const articlesEmptyState =
    document.getElementById("articlesEmptyState");

  const backToTop = document.getElementById("backToTop");
  const currentYear = document.getElementById("currentYear");

  const normalizeText = (text = "") =>
    text
      .toLocaleLowerCase("fa")
      .replace(/[يى]/g, "ی")
      .replace(/ك/g, "ک")
      .replace(/\u200c/g, " ")
      .replace(/\s+/g, " ")
      .trim();

  const getArticles = () =>
    Array.from(
      document.querySelectorAll(
        "[data-article], .article-list .horizontal-card"
      )
    );

  const lockPageScroll = () => {
    const shouldLock =
      mobileMenu?.classList.contains("is-open") ||
      searchPanel?.classList.contains("is-open");

    body.classList.toggle("no-scroll", Boolean(shouldLock));
  };

  const setOverlayState = () => {
    const shouldShow = mobileMenu?.classList.contains("is-open");
    overlay?.classList.toggle("is-visible", Boolean(shouldShow));
  };

  const openMenu = () => {
    if (!mobileMenu) return;

    closeSearch(false);
    mobileMenu.classList.add("is-open");
    mobileMenu.setAttribute("aria-hidden", "false");
    menuButton?.setAttribute("aria-expanded", "true");

    setOverlayState();
    lockPageScroll();
    closeMenuButton?.focus();
  };

  const closeMenu = (restoreFocus = false) => {
    if (!mobileMenu) return;

    mobileMenu.classList.remove("is-open");
    mobileMenu.setAttribute("aria-hidden", "true");
    menuButton?.setAttribute("aria-expanded", "false");

    setOverlayState();
    lockPageScroll();

    if (restoreFocus) {
      menuButton?.focus();
    }
  };

  const openSearch = () => {
    if (!searchPanel) return;

    closeMenu(false);
    searchPanel.classList.add("is-open");
    searchPanel.setAttribute("aria-hidden", "false");
    searchButton?.setAttribute("aria-expanded", "true");

    lockPageScroll();

    window.setTimeout(() => {
      searchInput?.focus();
    }, 150);
  };

  const closeSearch = (restoreFocus = false) => {
    if (!searchPanel) return;

    searchPanel.classList.remove("is-open");
    searchPanel.setAttribute("aria-hidden", "true");
    searchButton?.setAttribute("aria-expanded", "false");

    if (searchMessage) {
      searchMessage.textContent = "";
    }

    lockPageScroll();

    if (restoreFocus) {
      searchButton?.focus();
    }
  };

  menuButton?.addEventListener("click", openMenu);
  closeMenuButton?.addEventListener("click", () => closeMenu(true));
  overlay?.addEventListener("click", () => closeMenu(false));

  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", () => closeMenu(false));
  });

  searchButton?.addEventListener("click", openSearch);
  closeSearchButton?.addEventListener("click", () => closeSearch(true));

  searchPanel?.addEventListener("click", (event) => {
    if (event.target === searchPanel) {
      closeSearch(true);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;

    if (searchPanel?.classList.contains("is-open")) {
      closeSearch(true);
      return;
    }

    if (mobileMenu?.classList.contains("is-open")) {
      closeMenu(true);
    }
  });

  const searchArticles = (rawQuery) => {
    const query = normalizeText(rawQuery);
    const articles = getArticles();
    let matchCount = 0;

    articles.forEach((article) => {
      const searchableText = normalizeText(
        article.dataset.searchable || article.textContent
      );

      const isMatch = !query || searchableText.includes(query);

      article.hidden = !isMatch;
      article.classList.toggle("is-search-hidden", !isMatch);

      if (isMatch) {
        matchCount += 1;
      }
    });

    if (searchMessage) {
      if (!query) {
        searchMessage.textContent = "";
      } else if (query.length < 2) {
        searchMessage.textContent =
          "لطفاً حداقل دو حرف برای جست‌وجو وارد کنید.";
      } else if (matchCount) {
        searchMessage.textContent =
          `${matchCount.toLocaleString("fa-IR")} مطلب مرتبط پیدا شد.`;
      } else {
        searchMessage.textContent =
          `نتیجه‌ای برای «${rawQuery.trim()}» پیدا نشد.`;
      }
    }

    return matchCount;
  };

  searchInput?.addEventListener("input", () => {
  const query = searchInput.value.trim();

  if (!query) {
    searchArticles("");
    return;
  }

  if (query.length < 2) {
    if (searchMessage) {
      searchMessage.textContent =
        "لطفاً حداقل دو حرف برای جست‌وجو وارد کنید.";
    }
    return;
  }

  searchArticles(query);
});


  searchForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    const query = searchInput?.value.trim() || "";

    if (query.length < 2) {
      if (searchMessage) {
        searchMessage.textContent =
          "لطفاً حداقل دو حرف برای جست‌وجو وارد کنید.";
      }

      searchInput?.focus();
      return;
    }

    searchArticles(query);
  });

  searchTags.forEach((tag) => {
    tag.addEventListener("click", (event) => {
      event.preventDefault();

      const term =
        tag.dataset.searchTerm ||
        tag.textContent.trim().replace(/^#/, "");

      if (!searchInput || !term) return;

      searchInput.value = term;
      searchArticles(term);
      searchInput.focus();
    });
  });

  const setTheme = (theme) => {
    const isDark = theme === "dark";

    body.classList.toggle("dark-theme", isDark);
    body.dataset.theme = isDark ? "dark" : "light";

    if (themeIcon) {
      themeIcon.textContent = isDark ? "☀" : "☾";
    }

    themeButton?.setAttribute(
      "aria-label",
      isDark ? "فعال‌کردن پوسته روشن" : "فعال‌کردن پوسته تاریک"
    );

    themeButton?.setAttribute(
      "title",
      isDark ? "پوسته روشن" : "پوسته تاریک"
    );
  };

  let savedTheme = null;

  try {
    savedTheme =
      localStorage.getItem("revayat-theme") ||
      localStorage.getItem("edge-theme");
  } catch {
    savedTheme = null;
  }

  const systemPrefersDark =
    window.matchMedia?.("(prefers-color-scheme: dark)").matches;

  setTheme(savedTheme || (systemPrefersDark ? "dark" : "light"));

  themeButton?.addEventListener("click", () => {
    const nextTheme = body.classList.contains("dark-theme")
      ? "light"
      : "dark";

    setTheme(nextTheme);

    try {
      localStorage.setItem("revayat-theme", nextTheme);
    } catch {
      // پوسته همچنان برای نشست فعلی اعمال می‌شود.
    }
  });

  const getArticleCategory = (article) =>
    normalizeText(
      article.dataset.category ||
      article.querySelector(".category")?.textContent ||
      ""
    );

  const filterArticles = (selectedFilter) => {
    const normalizedFilter = normalizeText(selectedFilter);
    const showAll =
      !normalizedFilter ||
      ["all", "همه", "همه مطالب"].includes(normalizedFilter);

    let visibleCount = 0;

    getArticles().forEach((article) => {
      const category = getArticleCategory(article);
      const isMatch =
        showAll ||
        category === normalizedFilter ||
        category.includes(normalizedFilter);

      article.hidden = !isMatch;
      article.classList.toggle("is-filtered-out", !isMatch);

      if (isMatch) {
        visibleCount += 1;
      }
    });

    filterButtons.forEach((button) => {
      const isActive =
        normalizeText(button.dataset.filter) === normalizedFilter;

      button.classList.toggle("active", isActive);
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    if (articlesEmptyState) {
      articlesEmptyState.hidden = visibleCount > 0;
    }
  };

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterArticles(button.dataset.filter || "all");
    });
  });

  loadMoreButton?.addEventListener("click", () => {
    const hiddenExtraArticles = Array.from(
      document.querySelectorAll(
        ".article-list .is-extra[hidden], [data-article].is-extra[hidden]"
      )
    );

    if (hiddenExtraArticles.length) {
      hiddenExtraArticles.forEach((article, index) => {
        article.hidden = false;
        article.style.animationDelay = `${index * 80}ms`;
        article.classList.add("is-revealed");
      });

      loadMoreButton.disabled = true;
      loadMoreButton.textContent = "همه مطالب نمایش داده شدند";
      return;
    }

    loadMoreButton.disabled = true;
    loadMoreButton.textContent = "همه مطالب نمایش داده شدند";
  });

  const updateScrollInterface = () => {
    const scrollTop =
      window.scrollY || document.documentElement.scrollTop;

    const scrollableHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    const progress =
      scrollableHeight > 0
        ? Math.min((scrollTop / scrollableHeight) * 100, 100)
        : 0;

    if (readingProgress) {
      readingProgress.style.width = `${progress}%`;
      readingProgress.setAttribute("aria-valuenow", String(Math.round(progress)));
    }

    siteHeader?.classList.toggle("is-scrolled", scrollTop > 12);
    backToTop?.classList.toggle("is-visible", scrollTop > 550);
  };

  window.addEventListener("scroll", updateScrollInterface, {
    passive: true
  });

  window.addEventListener("resize", () => {
    if (
      window.innerWidth > 1050 &&
      mobileMenu?.classList.contains("is-open")
    ) {
      closeMenu(false);
    }

    updateScrollInterface();
  });

  backToTop?.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  const navigationLinks = document.querySelectorAll(
    '.desktop-nav a[href^="#"], .main-menu a[href^="#"]'
  );

  const observedSections = Array.from(navigationLinks)
    .map((link) => {
      const selector = link.getAttribute("href");

      if (!selector || selector === "#") {
        return null;
      }

      try {
        return document.querySelector(selector);
      } catch {
        return null;
      }
    })
    .filter(Boolean);

  if ("IntersectionObserver" in window && observedSections.length) {
    const navigationObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          navigationLinks.forEach((link) => {
            const isActive =
              link.getAttribute("href") === `#${entry.target.id}`;

            link.classList.toggle("active", isActive);

            if (isActive) {
              link.setAttribute("aria-current", "page");
            } else {
              link.removeAttribute("aria-current");
            }
          });
        });
      },
      {
        rootMargin: "-25% 0px -65% 0px",
        threshold: 0
      }
    );

    observedSections.forEach((section) => {
      navigationObserver.observe(section);
    });
  }

  document.querySelectorAll('a[href="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
    });
  });

  if (currentYear) {
    currentYear.textContent = new Intl.DateTimeFormat("fa-IR", {
      year: "numeric"
    }).format(new Date());
  }

  updateScrollInterface();
});
