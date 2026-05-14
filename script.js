export default {
  async fetch(request, env) {

    console.log("REQUEST RECEIVED:", request.method);
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "*"
        }
      });
    }
    
    if (request.method === "POST") {
      try {
        const formData = await request.formData();
        const file = formData.get("file");

        console.log("FILE:", file?.name);

        if (!file) {
          return new Response("No file", { status: 400 });
        }

        await env.MY_BUCKET.put(file.name, file.stream());

        console.log("UPLOAD SUCCESS");

        return new Response("Upload successful", {
          status: 200,
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
        });

      } catch (err) {
        console.log("ERROR:", err);

        return new Response("Worker error", {
          status: 500,
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
        });
      }
    }

    return new Response("Worker running", {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
}