window.registerModuleCallback(googleScraper);

function googleScraper() {
  if (document.location.host !== "www.google.com") return;

  window.onload = function () {
    console.log();
  };
}
