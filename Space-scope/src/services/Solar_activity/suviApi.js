const PRODUCT_INDEX_URL =
  "/noaa/products/goes/solar-ultraviolet-imager.json";

export async function fetchLatestSUVIImages() {
  const response = await fetch(PRODUCT_INDEX_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch SUVI product index");
  }

  const products = await response.json();

  const wavelengths = [94, 131, 171, 195, 284, 304];
  const results = {};

  wavelengths.forEach((wave) => {
    const match = [...products]
      .reverse()
      .find(
        (item) =>
          item.product &&
          item.product.includes(`ci${wave}`) &&
          item.image
      );

    if (match) {
      results[wave] = {
        imageUrl: `https://services.swpc.noaa.gov${match.image}`,
        timestamp: match.time,
      };
    } else {
      results[wave] = {
        imageUrl: null,
        timestamp: null,
        error: true,
      };
    }
  });

  return results;
}
