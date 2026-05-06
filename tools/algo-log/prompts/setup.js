import prompts from "prompts";
import { setupQuestions, SETUP_PROMPT_QUESTION } from "./questions/setup.js";

export const askUsername = () => prompts(setupQuestions.USERNAME);

export const askConfigFields = (defaults = {}) =>
  prompts(SETUP_PROMPT_QUESTION(defaults));

export const askUseExistingUser = (username) =>
  prompts(setupQuestions.USE_EXISTING_USER(username));
