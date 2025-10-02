import { execSync } from "child_process";

console.log("Subindo containers...");
execSync("docker compose up -d", { stdio: "inherit" });

console.log("Esperando MySQL iniciar...");
execSync("npx wait-port localhost:33306", { stdio: "inherit" });

console.log("Rodando migrações...");
execSync("npx prisma migrate dev", { stdio: "inherit" });

console.log("Subindo servidor...");
execSync("nodemon server.js", { stdio: "inherit" });
