window.registerModuleCallback(searchResultScraper);
window.registerModuleCallback(onloadScraper);

function onloadScraper() {
  window.onload = function () {
    rhfScraper();
    horizontalBannerScraper();
  };
}
/**
 * Scraping ads inside the search result
 */
function searchResultScraper() {
  // It did not contain supplier name itself, only description in title
  const searchResultCollection = new Set();

  const resultList = document.querySelectorAll('[alt^="Sponsored Ad"]');
  for (const resultImage of resultList) {
    let item = resultImage.closest(".s-result-item");

    const asin = item.getAttribute("data-asin");
    const currentPrice = extractCurrentPrice(item);
    const originalPrice = extractOriginalPrice(item);
    const imgURL = resultImage["src"];
    const productURL = item.querySelector("a.a-link-normal")["href"];
    const adsDescription = item.querySelector(
      "span.a-color-base.a-text-normal"
    ).textContent;

    const resultAds = {
      asin,
      content: "record_Ads",
      url: window.location.href,
      pageTitle: document.title,
      supplier: null,
      productURL,
      currentPrice,
      originalPrice,
      imgURL,
      imgBASE64: null,
      adsDescription,
      imageHeight: resultImage.height,
      imageWidth: resultImage.width,
      imageSize: null,
      videoPreview: null,
      videoURL: null,
    };

    detectDuplicateAndSendMsg(searchResultCollection, resultAds);
  }
}

/**
 * scraping recommended based on browsing history at the bottom (rhf-frame)
 */
function rhfScraper() {
  // For each search, the rhf-frame will only be loaded once when user scroll down
  // Clear the set when rhf-frame is changed to visible
  // Add items from the list to the set as user going through each pages
  // If item is already in the list, it won't be loaded
  const carouselSet = new Set(); // set for recording sent items

  let bottomFrame = document.querySelector(".rhf-frame");
  console.log("RHF FRAME");
  console.log(bottomFrame);

  // util functions for sending ads message to PDK and store it in the Set
  const sendMsgAndAddToSet = (node) => {
    const asin = extractAsinFromUrl(node.querySelector("a")["href"]);
    if (carouselSet.has(asin)) {
      return;
    }

    carouselSet.add(asin);
    console.log(asin);
    // TODO: add content
  };

  // define observer for monitoring the carousel list, fires when user move to another page
  const observerCarousel = new MutationObserver(() => {
    setTimeout(() => {
      const carouselList = document
        .querySelector(".rhf-frame")
        .querySelector("ol");

      if (
        !carouselList.getAttribute("aria-busy") ||
        carouselList.getAttribute("aria-busy") === "false"
      ) {
        console.log("LIST LOADED");
        const carouselItems = carouselList.querySelectorAll("li");
        for (const item of carouselItems) {
          sendMsgAndAddToSet(item);
        }
      }
    }, 1000);
  });

  let bottomFrameDetected = false;
  // define observer for monitoring the attribute change of the bottom rhf-frame
  const observerBottomFrame = new MutationObserver(() => {
    // clear the carousel list set
    carouselSet.clear();
    setTimeout(() => {
      const sponsoredTag = bottomFrame.querySelector(
        "._sp-rhf-desktop-carousel_style_spSponsored__RRHY_"
      );

      if (bottomFrame.style.display === "block" && !bottomFrameDetected) {
        bottomFrameDetected = true;
        if (sponsoredTag) {
          console.log("HAS SPONSORED LIST");
          if (!bottomFrame.querySelector("ol").getAttribute("aria-busy")) {
            const carouselItems = bottomFrame
              .querySelector("ol")
              .querySelectorAll("li");
            console.log(carouselItems);
            for (const item of carouselItems) {
              sendMsgAndAddToSet(item);
            }
          }
          observerCarousel.observe(bottomFrame.querySelector("ol"), {
            attributes: true,
            attributeOldValue: true,
          });
        }
      }
    }, 3000);
  });

  observerBottomFrame.observe(bottomFrame, {
    attributes: true,
    attributeFilter: ["style"],
    attributeOldValue: true,
  });
}

/**
 * scraping horizontal banners in the middle or at the bottom
 */
function horizontalBannerScraper() {
  const horizontalBannerCollection = new Set();

  const horizontalBanners = document.querySelectorAll(".sbv-product");
  console.log(`NODE LENGTH: ${horizontalBanners.length}`);
  if (horizontalBanners.length > 0) {
    for (const banner of horizontalBanners) {
      const asin = extractAsinFromUrl(banner.querySelector("a")["href"]);
      const currentPrice = extractCurrentPrice(banner);
      const originalPrice = extractOriginalPrice(banner);
      const img = banner.querySelector("img");
      const imgURL = img["src"];
      const video = banner.closest(".sg-row").querySelector("video");
      const videoURL = video["src"];
      const videoPreview = video["poster"];
      const productURL = banner.querySelector("a.a-link-normal")["href"];
      const adsDescription =
        banner.querySelector("span.a-text-normal").textContent;

      const bannerAds = {
        asin,
        content: "records_Ads",
        url: window.location.href,
        pageTitle: document.title,
        supplier: null,
        productURL,
        currentPrice,
        originalPrice,
        imgURL,
        imgBASE64: null,
        adsDescription,
        imageHeight: img.height,
        imageWidth: img.width,
        imageSize: null,
        videoPreview,
        videoURL,
      };

      detectDuplicateAndSendMsg(horizontalBannerCollection, bannerAds);
    }
  }
}

// helper functions
function detectDuplicateAndSendMsg(collection, item) {
  if (collection.has(item.asin)) return;

  collection.add(item.asin);
  console.log(item);
  // chrome.runtime.sendMessage(bannerAds);
}

function extractAsinFromUrl(url) {
  const regex = RegExp(
    "(http|https)://www.amazon..*(%2Fdp%2F|/dp/)([A-Z0-9]{10})"
  );

  return url.match(regex)[3];
}

function extractCurrentPrice(node) {
  try {
    const currentPrice = node
      .querySelector(
        ".a-size-base.a-link-normal.s-underline-text.s-underline-link-text"
      )
      .querySelector(".a-price:not(.a-text-price)");

    return currentPrice
      ? Number(
          currentPrice
            .querySelector(".a-offscreen")
            .textContent.replace("$", "")
        )
      : null;
  } catch (error) {
    return null;
  }
}

function extractOriginalPrice(node) {
  try {
    const originalPrice = node
      .querySelector(
        ".a-size-base.a-link-normal.s-underline-text.s-underline-link-text"
      )
      .querySelector(".a-price:not(.a-text-price)");

    return originalPrice
      ? Number(
          originalPrice
            .querySelector(".a-offscreen")
            .textContent.replace("$", "")
        )
      : null;
  } catch (error) {
    return null;
  }
}
