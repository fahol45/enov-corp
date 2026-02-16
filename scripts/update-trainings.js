const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

const TRAININGS_PATH = path.join(process.cwd(), "src", "lib", "trainings.ts");
const ENV_PATH = path.join(process.cwd(), ".env.local");

const loadEnvFile = () => {
  if (!fs.existsSync(ENV_PATH)) return;
  const content = fs.readFileSync(ENV_PATH, "utf8");
  content.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return;
    const idx = trimmed.indexOf("=");
    if (idx === -1) return;
    const key = trimmed.slice(0, idx).trim();
    const value = trimmed.slice(idx + 1).trim();
    if (key && !(key in process.env)) {
      process.env[key] = value;
    }
  });
};

const allowedStatuses = new Set(["available", "soon", "closed"]);

const normalizeText = (value) =>
  typeof value === "string" ? value.trim() : "";

const normalizeStringArray = (value) =>
  Array.isArray(value)
    ? value.map((item) => normalizeText(item)).filter(Boolean)
    : [];

const normalizeDetails = (value) => {
  const details = value && typeof value === "object" ? value : {};
  return {
    duration: normalizeText(details.duration),
    level: normalizeText(details.level),
    format: normalizeText(details.format),
    nextSession: normalizeText(details.nextSession),
    price: normalizeText(details.price),
    location: normalizeText(details.location),
  };
};

const normalizeStatus = (value) =>
  allowedStatuses.has(value) ? value : "soon";

const toTraining = (row) => ({
  slug: normalizeText(row.slug),
  title: normalizeText(row.title),
  category: normalizeText(row.category),
  status: normalizeStatus(row.status),
  summary: normalizeText(row.summary),
  description: normalizeText(row.description),
  outcomes: normalizeStringArray(row.outcomes),
  prerequisites: normalizeStringArray(row.prerequisites),
  details: normalizeDetails(row.details),
  coverImage: normalizeText(row.cover_image) || undefined,
  youtubeEmbed: normalizeText(row.youtube_embed) || undefined,
  pdfProgram: normalizeText(row.pdf_program) || undefined,
  registrationUrl: normalizeText(row.registration_url) || undefined,
});

const parseTrainings = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (payload && typeof payload === "object" && Array.isArray(payload.trainings)) {
    return payload.trainings;
  }
  return null;
};

const validateTrainings = (trainings) => {
  if (!Array.isArray(trainings) || trainings.length === 0) {
    throw new Error("Aucune formation trouvee.");
  }
  trainings.forEach((training, index) => {
    if (!training.slug || !training.title || !training.category) {
      throw new Error(`Formation invalide a l'index ${index}.`);
    }
  });
};

const findArrayBounds = (source, startIndex) => {
  const arrayStart = source.indexOf("[", startIndex);
  if (arrayStart === -1) return null;
  let depth = 0;
  let inString = false;
  let escape = false;
  for (let i = arrayStart; i < source.length; i += 1) {
    const char = source[i];
    if (inString) {
      if (escape) {
        escape = false;
      } else if (char === "\\") {
        escape = true;
      } else if (char === "\"") {
        inString = false;
      }
      continue;
    }
    if (char === "\"") {
      inString = true;
      continue;
    }
    if (char === "[") depth += 1;
    if (char === "]") {
      depth -= 1;
      if (depth === 0) {
        return { start: arrayStart, end: i };
      }
    }
  }
  return null;
};

const updateTrainingsFile = (trainings) => {
  const source = fs.readFileSync(TRAININGS_PATH, "utf8");
  const marker = "export const trainings: Training[]";
  const startIndex = source.indexOf(marker);
  if (startIndex === -1) {
    throw new Error("Bloc export const trainings introuvable.");
  }
  const bounds = findArrayBounds(source, startIndex);
  if (!bounds) {
    throw new Error("Impossible de detecter le tableau trainings.");
  }
  const endStatement = source.indexOf(";", bounds.end);
  if (endStatement === -1) {
    throw new Error("Fin de statement trainings introuvable.");
  }

  const formatted = JSON.stringify(trainings, null, 2);
  const replacement = `${marker} = ${formatted};`;
  const updated =
    source.slice(0, startIndex) + replacement + source.slice(endStatement + 1);
  fs.writeFileSync(TRAININGS_PATH, updated, "utf8");
};

const loadFromFile = (filePath) => {
  const absolute = path.isAbsolute(filePath)
    ? filePath
    : path.join(process.cwd(), filePath);
  const raw = fs.readFileSync(absolute, "utf8");
  const payload = JSON.parse(raw);
  const trainings = parseTrainings(payload);
  if (!trainings) {
    throw new Error("JSON invalide. Attendu un tableau ou { trainings }.");
  }
  return trainings;
};

const loadFromSupabase = async () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY requis."
    );
  }
  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });
  const { data, error } = await supabase
    .from("academy_trainings")
    .select("*")
    .order("category", { ascending: true })
    .order("title", { ascending: true });
  if (error) {
    throw new Error(`Supabase error: ${error.message}`);
  }
  return (data ?? []).map((row) => toTraining(row));
};

const printUsage = () => {
  console.log("Usage:");
  console.log("  node scripts/update-trainings.js path/to/trainings.json");
  console.log("  node scripts/update-trainings.js --from-supabase");
};

const main = async () => {
  loadEnvFile();
  const args = process.argv.slice(2);
  if (args.length === 0) {
    printUsage();
    process.exit(1);
  }

  let trainings;
  if (args.includes("--from-supabase")) {
    trainings = await loadFromSupabase();
  } else {
    trainings = loadFromFile(args[0]);
  }

  validateTrainings(trainings);
  updateTrainingsFile(trainings);
  console.log(`Trainings mis a jour dans ${TRAININGS_PATH}`);
};

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
