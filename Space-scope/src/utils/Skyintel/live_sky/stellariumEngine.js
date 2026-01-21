/**
 * Stellarium Web Engine lifecycle + command interface
 * SAFE SCAFFOLD MODE
 */

let engineInstance = null;
let commandQueue = [];

function isRealEngineAvailable() {
  return (
    typeof window !== "undefined" &&
    window.Stellarium &&
    typeof window.Stellarium.create === "function"
  );
}

export function createEngine(mountNode) {
  if (!mountNode) {
    throw new Error("[StellariumEngine] mountNode is required");
  }

  if (engineInstance) {
    console.warn("[StellariumEngine] Engine already exists");
    return engineInstance;
  }

  console.warn(
    "[StellariumEngine] Stellarium engine not available. Running in scaffold mode."
  );

  engineInstance = {
    engine: null,
    mountNode,
    ready: false
  };

  // If a real engine ever appears later, we can upgrade
  if (isRealEngineAvailable()) {
    initializeRealEngine();
  }

  return engineInstance;
}

function initializeRealEngine() {
  if (!engineInstance || engineInstance.ready) return;

  console.log("[StellariumEngine] Initializing REAL engine");

  const engine = window.Stellarium.create({
    mount: engineInstance.mountNode,
    fov: 60,
    showConstellations: true,
    showAtmosphere: false,
    showGround: false
  });

  engineInstance.engine = engine;
  engineInstance.ready = true;

  // Flush queued commands
  commandQueue.forEach((fn) => fn(engine));
  commandQueue = [];
}

export function destroyEngine() {
  if (!engineInstance) return;

  console.log("[StellariumEngine] Destroying engine");

  try {
    if (engineInstance.engine?.destroy) {
      engineInstance.engine.destroy();
    }
  } catch (e) {
    console.warn("[StellariumEngine] Destroy error", e);
  }

  engineInstance = null;
  commandQueue = [];
}

function enqueueOrRun(fn) {
  if (!engineInstance) return;

  if (engineInstance.ready && engineInstance.engine) {
    fn(engineInstance.engine);
  } else {
    commandQueue.push(fn);
  }
}

/* =========================
   Command Interface (SAFE)
   ========================= */

export function setTarget(targetName) {
  console.log("[StellariumEngine] setTarget:", targetName);

  enqueueOrRun((engine) => {
    engine.setTargetByName(targetName);
  });
}

export function setFov(fovDegrees) {
  console.log("[StellariumEngine] setFov:", fovDegrees);

  enqueueOrRun((engine) => {
    engine.setFov(fovDegrees);
  });
}

export function setTime(date) {
  enqueueOrRun((engine) => {
    engine.setTime(date);
  });
}

export function setLocation(latitude, longitude) {
  enqueueOrRun((engine) => {
    engine.setObserverLocation(latitude, longitude);
  });
}
