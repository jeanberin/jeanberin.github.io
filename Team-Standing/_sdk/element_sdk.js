(function () {
  const STORAGE_KEY = "__element_sdk_config__";

  let currentConfig = {};
  let handlers = {
    onConfigChange: null,
  };

  function loadConfig(defaultConfig) {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored
        ? { ...defaultConfig, ...JSON.parse(stored) }
        : { ...defaultConfig };
    } catch {
      return { ...defaultConfig };
    }
  }

  function saveConfig(cfg) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg));
  }

  window.elementSdk = {
    init({
      defaultConfig,
      onConfigChange,
      mapToCapabilities,
      mapToEditPanelValues,
    }) {
      handlers.onConfigChange = onConfigChange;

      currentConfig = loadConfig(defaultConfig);

      // Initial callback
      if (handlers.onConfigChange) {
        handlers.onConfigChange(currentConfig);
      }

      // Expose helpers for host/editor environments if needed later
      this._capabilities = mapToCapabilities
        ? mapToCapabilities(currentConfig)
        : {};

      this._editPanelValues = mapToEditPanelValues
        ? mapToEditPanelValues(currentConfig)
        : new Map();
    },

    setConfig(partialConfig) {
      currentConfig = { ...currentConfig, ...partialConfig };
      saveConfig(currentConfig);

      if (handlers.onConfigChange) {
        handlers.onConfigChange(currentConfig);
      }
    },

    getConfig() {
      return { ...currentConfig };
    },
  };
})();
