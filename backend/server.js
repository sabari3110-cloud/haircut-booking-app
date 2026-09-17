const http = require("http");
const { MongoClient } = require("mongodb");

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

let db;

async function connectDatabase() {
  if (!MONGODB_URI) {
    console.log("MONGODB_URI is not set");
    return;
  }

  try {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();

    db = client.db("hairbook");
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
}

const server = http.createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.url === "/api/health" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });

    res.end(
      JSON.stringify({
        success: true,
        message: "HairBook backend is running!",
        database: db ? "MongoDB connected" : "MongoDB not connected"
      })
    );

    return;
  }

  res.writeHead(404, { "Content-Type": "application/json" });

  res.end(
    JSON.stringify({
      success: false,
      message: "Route not found"
    })
  );
});

connectDatabase().then(() => {
  server.listen(PORT, () => {
    console.log(`HairBook backend running on port ${PORT}`);
  });
});