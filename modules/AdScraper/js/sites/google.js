window.registerModuleCallback(googleScraper);

function googleScraper() {
  if (document.location.host !== "www.google.com") return;

  window.onload = function () {
    allTabAdsWithoutPhoto();
    allTabAdsWithPhoto();
    imageTabAds();
  };
}

/**
 * Google search at "all" tab: Scraping ads with no photo
 */
function allTabAdsWithoutPhoto() {
  const adsBanners = document.querySelectorAll("[aria-label=Ads]");
  for (const banner of adsBanners) {
    const adsContainers = banner.querySelectorAll('[data-text-ad="1"]');
    for (const adsContainer of adsContainers) {
      const adsDescription = adsContainer
        .querySelector("[role=heading]")
        .querySelector("span").textContent;
      const supplier = adsContainer
        .querySelector("a[data-pcu]")
        .getAttribute("data-pcu")
        .split(",")[0]
        .split("//")[1]
        .replaceAll("/", "");
      const productURL = adsContainer.querySelector("a[data-pcu]")["href"];
      const img = adsContainer.querySelector('img[alt]:not([alt=""])');

      const adsItem = {
        content: "recores_Ads",
        url: window.document.href,
        pageTitle: document.title,
        supplier,
        productURL,
        currentPrice: null,
        originalPrice: null,
        imgURL: null,
        imgBASE64: img?.src,
        adsDescription,
        imageHeight: img?.height,
        imageWidth: img?.width,
        imageSize: null,
        videoPreview: null,
        videoURL: null,
      };

      sendMsg(adsItem);
    }
  }
}

/**
 * Google search at "all" tab: Scraping ads with images
 */
function allTabAdsWithPhoto() {
  const adsContainers = document.querySelectorAll("div.cu-container");

  for (const adsContainer of adsContainers) {
    const itemList = adsContainer.querySelectorAll("div.mnr-c.pla-unit");
    for (const item of itemList) {
      try {
        const adsDescription = item
          .querySelector("div.pla-unit-title")
          .querySelector("span").textContent;
        const productATag = item.querySelectorAll("a.clickable-card")[1];
        const supplier = productATag["ariaLabel"]
          .substring(productATag["ariaLabel"].lastIndexOf("from") + 4)
          .trim();
        const productURL = productATag["href"];
        const currentPrice = extractCurrentGooglePrice(item);
        const originalPrice = extractOriginalGooglePrice(item);
        const img = item.querySelector("img");

        const adsItem = {
          content: "records_Ads",
          url: window.location.href,
          pageTitle: document.title,
          supplier,
          productURL,
          currentPrice,
          originalPrice,
          imgURL: null,
          imgBASE64: img["src"],
          adsDescription,
          imageHeight: img.height,
          imageWidth: img.width,
          imageSize: null,
          videoPreview: null,
          videoURL: null,
        };

        sendMsg(adsItem);
      } catch (error) {
        continue;
      }
    }
  }
}

/**
 * Google search at "image" tab: Scraping ads in carousel list
 */
function imageTabAds() {
  const adsContainers = document.querySelectorAll("[data-id^=CarouselPLA]");

  for (const adsContainer of adsContainers) {
    const itemList = adsContainer.querySelectorAll("div.pla-unit");
    for (const item of itemList) {
      const supplier = item.querySelector("span[aria-label]").textContent;
      const productURL = item.querySelectorAll("a.pla-link")[1]["href"];
      const infoContainer = item
        .querySelector("div[jsaction^=mouseenter]")
        .querySelector("div[style^=margin]").parentNode;
      const adsDescription =
        infoContainer.childNodes[0].querySelector("span").textContent;
      const currentPrice = Number(
        infoContainer.childNodes[1].textContent.split("$")[1].replace(",", "")
      );
      const originalPrice = infoContainer.childNodes[1]
        .querySelector("span")
        ?.textContent.split("$")[1]
        .replace(",", "");
      const img = item.querySelector("img");

      const adsItem = {
        content: "records_Ads",
        url: window.location.href,
        pageTitle: document.title,
        supplier,
        productURL,
        currentPrice,
        originalPrice: originalPrice ? Number(originalPrice) : null,
        imgURL: null,
        imgBASE64: img["src"],
        adsDescription,
        imageHeight: img.height,
        imageWidth: img.width,
        imageSize: null,
        videoPreview: null,
        videoURL: null,
      };

      sendMsg(adsItem);
    }
  }
}

// helper functions
function extractCurrentGooglePrice(node) {
  try {
    const priceNodes = node
      .querySelector("div.pla-unit-title")
      .nextSibling.querySelectorAll("span");
    const currentPrice = priceNodes[0].textContent;

    return Number(currentPrice.split("$")[1].replace(",", ""));
  } catch (error) {
    return null;
  }
}

function extractOriginalGooglePrice(node) {
  try {
    const priceNodes = node
      .querySelector("div.pla-unit-title")
      .nextSibling.querySelectorAll("span");
    const orginalPrice = priceNodes[1].textContent; // index out of bound when there is no original price

    return Number(orginalPrice.split("$")[1].replace(",", ""));
  } catch (error) {
    return null;
  }
}
