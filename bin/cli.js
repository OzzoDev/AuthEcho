#!/usr/bin/env node

import fs from "fs";
import path from "path";
import inquirer from "inquirer";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const boilerplateDir = path.join(__dirname, "../boilerplate");
const targetDir = process.cwd();

const clientDir = path.join(targetDir, "client");
const serverDir = path.join(targetDir, "server");

if (fs.existsSync(clientDir) || fs.existsSync(serverDir)) {
  console.log("\x1b[31m❌ AuthEcho-SKD is already installed!\x1b[0m");
  process.exit(1);
}

const copyFiles = (src, dest) => {
  if (!fs.existsSync(src)) {
    console.error("❌ Error: Boilerplate directory does not exist!", src);
    process.exit(1);
  }

  fs.readdirSync(src).forEach((file) => {
    if (file === ".git") return;

    const srcPath = path.join(src, file);
    let destPath = path.join(dest, file);

    destPath = destPath.replace(/boilerplate[\\/]/, "");

    const stats = fs.statSync(srcPath);

    if (stats.isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true });
      copyFiles(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
};

const updateEnvFiles = (answers) => {
  const envFiles = [
    {
      path: path.join(targetDir, "client", ".env"),
      variables: {
        APPNAME: answers.APPNAME,
        AUTHECHO_API_KEY: answers.AUTHECHO_API_KEY,
        PORT: answers.PORT,
        NODE_ENV: "development",
        API: "http://localhost:3004",
        AUTHECHO_SERVER: "https://authecho.onrender.com",
      },
    },
    {
      path: path.join(targetDir, "server", ".env"),
      variables: {
        MONGO_URI: answers.MONGO_URI,
        PORT: 3004,
        JWT_APP_SECRET: "as568bca28c6a25cad29yu0349294e3e72826fae5efgytwfrsh76cf9674ec5f8fed0",
        JWT_APP_TOKEN_KEY: "jwtAppToken",
      },
    },
  ];

  envFiles.forEach(({ path: envPath, variables }) => {
    let envContent = "";

    if (fs.existsSync(envPath)) {
      envContent = fs.readFileSync(envPath, "utf8");
    }

    for (const [key, value] of Object.entries(variables)) {
      const regex = new RegExp(`^${key}=.*`, "gm");
      const newLine = `${key}=${value}`;

      if (envContent.match(regex)) {
        envContent = envContent.replace(regex, newLine);
      } else {
        envContent += `\n${newLine}`;
      }
    }

    fs.writeFileSync(envPath, envContent.trim() + "\n", "utf8");
  });
};

const replaceAppNameInFiles = (dir, appName) => {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const fullPath = path.join(dir, file);

    if (fs.statSync(fullPath).isDirectory()) {
      replaceAppNameInFiles(fullPath, appName);
    } else {
      const fileContent = fs.readFileSync(fullPath, "utf8");
      const updatedContent = fileContent.replace(
        /const APP_NAME = ".*?";/g,
        `const APP_NAME = "${appName}";`
      );

      if (fileContent !== updatedContent) {
        fs.writeFileSync(fullPath, updatedContent, "utf8");
      }
    }
  });
};

const replaceReverseProxyUrlInFiles = (dir, port) => {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const fullPath = path.join(dir, file);

    if (fs.statSync(fullPath).isDirectory()) {
      replaceReverseProxyUrlInFiles(fullPath, port);
    } else {
      const fileContent = fs.readFileSync(fullPath, "utf8");
      const updatedContent = fileContent.replace(
        /export const REVERSE_PROXY_URL = ".*?";/g,
        `export const REVERSE_PROXY_URL = "http://localhost:${port}";`
      );

      if (fileContent !== updatedContent) {
        fs.writeFileSync(fullPath, updatedContent, "utf8");
      }
    }
  });
};

copyFiles(boilerplateDir, targetDir);

inquirer
  .prompt([
    {
      type: "input",
      name: "APPNAME",
      message: "Enter your application name:",
      default: "My App",
    },
    {
      type: "input",
      name: "AUTHECHO_API_KEY",
      message: "Enter your AuthEcho API key:",
      default: "",
    },
    {
      type: "input",
      name: "PORT",
      message: "Enter your the port number of you application:",
      default: "3002",
    },
    {
      type: "input",
      name: "MONGO_URI",
      message: "Optionally, enter your MongoDB URI:",
      default: "",
    },
  ])
  .then((answers) => {
    updateEnvFiles(answers);
    replaceAppNameInFiles(targetDir, answers.APPNAME);
    replaceReverseProxyUrlInFiles(targetDir, answers.PORT);

    console.log("✅ Instalation completed successfully!");
    console.log(
      "Please execute the following commands to complete the setup and start the project:"
    );
    console.log("\t\x1b[94mnpm run install:all\x1b[0m");
    console.log("\t\x1b[94mnpm start\x1b[0m");
  });
