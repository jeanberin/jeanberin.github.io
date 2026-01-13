window.elementSdk = {
  init({
    defaultConfig,
    onConfigChange,
    mapToCapabilities,
    mapToEditPanelValues,
  }) {
    console.log("Element SDK initialized with config:", defaultConfig);
    return Promise.resolve({ isOk: true });
  },
  setConfig(newConfig) {
    console.log("Config updated:", newConfig);
  },
};