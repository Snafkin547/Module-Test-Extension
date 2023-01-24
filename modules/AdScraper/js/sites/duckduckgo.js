window.registerModuleCallback(duckduckgoScraper);

function duckduckgoScraper() {
  if (document.location.host !== "duckduckgo.com") return;

  window.onload = function () {
    ddgAllTabsAdsWithoutPhoto();
    ddgAllTabsAdsWithPhoto();
    ddgAllTabsSideAds();
  };
}

/**
 * DuckDuckGo search at "all" tab: Scraping ads with no photo
 */
function ddgAllTabsAdsWithoutPhoto() {
  const adsArticles = document.querySelectorAll('article[data-testid="ad"]');
  for (const article of adsArticles) {
    const adsDescription = article
      .querySelector("a[data-testid=result-title-a]")
      .querySelector("span").textContent;
    const supplier = article
      .querySelector("a[data-testid=result-extras-url-link]")
      .querySelector("span").textContent;
    const productURL = article.querySelector("a")["href"];

    listenClickOnAd(article, productURL);

    const adsItem = {
      content: "records_ads",
      url: window.location.href,
      host: window.location.host,
      pageTitle: document.title,
      adsDescription,
      supplier,
      productURL,
      currentPrice: null,
      originalPrice: null,
      imgURL: null,
      imgBASE64: null,
      imageHeight: null,
      imageWidth: null,
      videoPreview: null,
      videoURL: null,
    };

    sendMsg(adsItem);
  }
}

/**
 * DuckDuckGo search at "all" tab: Scraping ads with images
 */
function ddgAllTabsAdsWithPhoto() {
  let adsContainers;
  try {
    adsContainers = document
      .querySelector("div#ads")
      .querySelector("div.js-carousel-module-items")
      .querySelectorAll("div.has-image");
  } catch (error) {
    return;
  }

  for (const adsContainer of adsContainers) {
    const adsDescription = adsContainer.querySelector(
      "a.js-carousel-item-title"
    ).textContent;
    const supplier = adsContainer
      .querySelector("div.module--carousel__footer")
      .querySelector("span").textContent;
    const productURL = adsContainer.querySelector("a")["href"];
    const currentPriceNode = adsContainer
      .querySelector("div.module--carousel__body__pricing")
      .querySelector("span.module--carousel__body__price")
      .textContent.replaceAll(/[^0-9^\.]/g, "");

    const originalPriceNode = adsContainer
      .querySelector("div.module--carousel__body__pricing")
      .querySelector("span.module--carousel__body__original-price")
      ?.textContent.replaceAll(/[^0-9^\.]/g, "");
    const imgURL = decodeURIComponent(
      adsContainer.querySelector("div.js-carousel-item-image").style
        .backgroundImage
    ).match(/http[^'"]*/g)[0];

    listenClickOnAd(adsContainer, productURL);

    const adsItem = {
      content: "records_ads",
      url: window.location.href,
      host: window.location.host,
      pageTitle: document.title,
      adsDescription,
      supplier,
      productURL,
      currentPrice: Number(currentPriceNode),
      originalPrice: originalPriceNode ? Number(originalPriceNode) : null,
      imgURL,
      imgBASE64: null,
      imageHeight: null,
      imageWidth: null,
      videoPreview: null,
      videoURL: null,
    };

    sendMsg(adsItem);
  }
}

/**
 * DuckDuckGo search at "all" tab: Scraping ads at the side of the page
 */
function ddgAllTabsSideAds() {
  const adsContainers = document
    .querySelector("div.js-sidebar-ads")
    .querySelectorAll("div.has-image");

  for (const adsContainer of adsContainers) {
    const adsDescription = adsContainer.querySelector(
      "a.js-carousel-item-title"
    ).textContent;
    const supplier = adsContainer
      .querySelector("div.module--carousel__footer")
      .querySelector("span").textContent;
    const productURL = adsContainer.querySelector("a")["href"];
    const currentPrice = Number(
      adsContainer
        .querySelector("div.module--carousel__body__pricing")
        .querySelector("span")
        .textContent.replaceAll(/[^0-9^\.]/g, "")
    );
    const imgURL = decodeURIComponent(
      adsContainer.querySelector("div.js-carousel-item-image").style
        .backgroundImage
    ).match(/http[^'"]*/g)[0];

    listenClickOnAd(adsContainer, productURL);

    const adsItem = {
      content: "records_ads",
      url: window.location.href,
      host: window.location.host,
      pageTitle: document.title,
      adsDescription,
      supplier,
      productURL,
      currentPrice,
      originalPrice: null,
      imgURL,
      imgBASE64: null,
      imageHeight: null,
      imageWidth: null,
      videoPreview: null,
      videoURL: null,
    };

    sendMsg(adsItem);
  }
}
