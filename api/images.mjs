export default async function handler(req, res) {
  const { handle } = req.query;

  try {
    const response = await fetch(
      `https://shop.taijithedog.com/admin/api/2024-04/products.json?handle=${handle}`,
      {
        method: "GET",
        headers: {
          "X-Shopify-Access-Token": process.env.SHOPIFY_TOKEN,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (!data.products || data.products.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    const product = data.products[0];
    const images = product.images.map((img) => img.src);

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json({ images });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
}
