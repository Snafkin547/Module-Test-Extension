window.registerModuleCallback(onloadScraper);

function onloadScraper() {
  window.onload = function () {
    rhfScraper();
    horizontalBannerScraper();
  };
}

/**
 * scraping recommended based on browsing history at the bottom (rhf-frame)
 */
function rhfScraper() {
  let bottomFrame = document.querySelector(".rhf-frame");
  console.log("RHF FRAME");
  console.log(bottomFrame);

  const observerCarousel = new MutationObserver(() => {
    console.log("CAROUSEL OBSERVER TRIGGERED");
    setTimeout(() => {
      const carouselList = document
        .querySelector(".rhf-frame")
        .querySelector("ol");

      if (
        !carouselList.getAttribute("aria-busy") ||
        carouselList.getAttribute("aria-busy") === "false"
      ) {
        console.log("LIST LOADED");
        console.log(carouselList.querySelectorAll("li"));
      }
    }, 1000);
  });

  let bottomFrameDetected = false;
  const observerBottomFrame = new MutationObserver(() => {
    console.log("OBSERVER TRIGGERED");
    setTimeout(() => {
      const sponsoredTag = bottomFrame.querySelector(
        "._sp-rhf-desktop-carousel_style_spSponsored__RRHY_"
      );

      if (bottomFrame.style.display === "block" && !bottomFrameDetected) {
        bottomFrameDetected = true;
        if (sponsoredTag) {
          console.log("HAS SPONSORED LIST");
          if (!bottomFrame.querySelector("ol").getAttribute("aria-busy")) {
            console.log(bottomFrame.querySelector("ol").querySelectorAll("li"));
          }
          observerCarousel.observe(bottomFrame.querySelector("ol"), {
            attributes: true,
          });
        }
      }
    }, 3000);
  });

  observerBottomFrame.observe(bottomFrame, {
    attributes: true,
    attributeFilter: ["style"],
  });
}

/**
 * scraping horizontal banners in the middle or at the bottom
 */
function horizontalBannerScraper() {
  const horizontalBanners = document.querySelectorAll(".sbv-product");
  console.log(`NODE LENGTH: ${horizontalBanners.length}`);
  if (horizontalBanners.length > 0) {
    for (const banner of horizontalBanners) {
      const img = banner.querySelector("img");
      const imgURL = img["src"];
      const video = banner.closest(".sg-row").querySelector("video");
      const videoURL = video["src"];
      const videoPreview = video["poster"];
      const productURL = banner.querySelector(".a-link-normal")["href"];
      const adsDescription =
        banner.querySelector("span.a-text-normal").textContent;

      const bannerAds = {
        content: "records_Ads",
        url: window.location.href,
        pageTitle: document.title,
        supplier: "",
        productURL,
        imgURL,
        adsDescription,
        imageHeight: img.height,
        imageWidth: img.width,
        imageSize: "",
        videoPreview,
        videoURL,
      };
      console.log(bannerAds);
      chrome.runtime.sendMessage(bannerAds);
    }
  }
}
