/* eslint-disable */
import chalk from "chalk";
import prompts from "prompts";
import fs from "fs/promises";
import { zip } from "./zip.js";
import { update } from "./update.js";
import { install } from "./install.js";
import { uninstall } from "./uninstall.js";
import open from "open";

const command = process.argv[2];

if (command === "configure") {
  console.log(chalk.blue("------------------------------"));
  console.log(chalk.blue("   Welcome to Minima!         "));
  console.log(chalk.blue("------------------------------"));

  const { value: RUNNING_RPC } = await prompts({
    type: "confirm",
    name: "value",
    message: "Are you running Minima RPC?",
    initial: true,
    active: "no",
    inactive: "yes",
  });

  if (RUNNING_RPC) {
    const { value: CONFIGURE_AUTOMATICALLY } = await prompts({
      type: "confirm",
      name: "value",
      message: "Would you like to configure .env automatically?",
      initial: true,
      active: "yes",
      inactive: "no",
    });

    if (!CONFIGURE_AUTOMATICALLY) {
      configureManually();
    } else {
      await zip();
      await install();
    }
  } else {
    configureManually();
  }
}

if (command === "zip") {
  await zip();
}

if (command === "install") {
  await install();
}

if (command === "update") {
  await update();
}

if (command === "uninstall") {
  await uninstall();
}

if (command === "open") {
  // to be added
  open("https://localhost:9005");
}

async function configureManually() {
  const { value: PORT } = await prompts({
    type: "number",
    name: "value",
    initial: 9005,
    message: "What port is MDS hub running on?",
  });

  const { value: APP_UID } = await prompts({
    type: "text",
    name: "value",
    initial: "abc",
    message: "What is the APP UID?",
  });

  const envFile = await fs.readFile(
    "./create-minima-app/.env.template",
    "utf-8",
  );
  await fs.writeFile(
    "./.env",
    envFile.replace("{{uid}}", APP_UID).replace("{{port}}", PORT),
  );
}
