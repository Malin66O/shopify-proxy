export default async function handler(req, res) {
  const response = await fetch("https://shop.taijithedog.com/admin/api/2024-04/products.json", {
    method: "GET",
    headers: {
      "X-Shopify-Access-Token": process.env.SHOPIFY_TOKEN,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(200).json(data);
}
