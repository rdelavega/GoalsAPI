export default function logger(req, res, next) {
  console.log(`${req.method}/ ${req.url}, ${res.statusCode} Status`);
  if (req.method === "POST") {
    console.log(
      `${req.method}/ ${req.url}, ${res.statusCode}. Body: ${JSON.stringify(
        req.body
      )}`
    );
  }
  next();
}
