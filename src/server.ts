import app from "./app.js";
import { ENV } from "./config/env.js";

app.listen(ENV.port, () => {
  console.log(`Backend Server is running on port ${ENV.port}`);
});
