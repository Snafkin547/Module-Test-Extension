window.registerModuleCallback(googleScraper);

function googleScraper() {
  if (document.location.host !== "www.google.com") return;

  window.onload = function () {
    allAdsWithoutPhoto();
    allAdsWithPhoto();
  };
}

/**
 * Google search at "all" tag: Scraping ads with no photo
 */
function allAdsWithoutPhoto() {
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
      const imgBASE64 = img?.src;

      const listAds = {
        content: "recores_Ads",
        url: window.document.href,
        pageTitle: document.title,
        supplier,
        productURL,
        currentPrice: null,
        originalPrice: null,
        imgURL: null,
        imgBASE64,
        adsDescription,
        imageHeight: img?.height,
        imageWidth: img?.width,
        imageSize: null,
        videoPreview: null,
        videoURL: null,
      };

      console.log(listAds);
    }
  }
}

/**
 * Google search at "all" tag: Scraping ads with images
 */
function allAdsWithPhoto() {
  const adsContainers = document.querySelectorAll("div.cu-container");

  for (const adsContainer of adsContainers) {
    const itemList = adsContainer.querySelectorAll("div.mnr-c.pla-unit");
    for (const item of itemList) {
      try {
        const adsDescription = item
          .querySelector("div.pla-unit-title")
          .querySelector("span").textContent;
        const productATag = item.querySelector("a.clickable-card");
        const supplier = productATag["ariaLabel"]
          .substring(productATag["ariaLabel"].lastIndexOf("from") + 4)
          .trim();
        const productURL = productATag["href"];
        const currentPrice = extractCurrentGooglePrice(item);
        const originalPrice = extractOriginalGooglePrice(item);
        const img = item.querySelector("img");
        const imgBASE64 = img["src"];

        const listAds = {
          content: "records_Ads",
          url: window.location.href,
          pageTitle: document.title,
          supplier,
          productURL,
          currentPrice,
          originalPrice,
          imgURL: null,
          imgBASE64,
          adsDescription,
          imageHeight: img.height,
          imageWidth: img.width,
          imageSize: null,
          videoPreview: null,
          videoURL: null,
        };

        console.log(listAds);
      } catch (error) {
        continue;
      }
    }
  }
}

function extractCurrentGooglePrice(node) {
  try {
    const priceNodes = node
      .querySelector("div.pla-unit-title")
      .nextSibling.querySelectorAll("span");
    const currentPrice = priceNodes[0].textContent;

    return Number(currentPrice.replace("$", "").replace(",", ""));
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

    return Number(orginalPrice.replace("$", "").replace(",", ""));
  } catch (error) {
    return null;
  }
}
