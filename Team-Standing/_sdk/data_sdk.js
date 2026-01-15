(function () {
  const STORAGE_KEY = "__data_sdk_participants__";

  let data = [];
  let handler = null;

  function load() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      data = stored ? JSON.parse(stored) : [];
    } catch {
      data = [];
    }
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function notify() {
    if (handler && typeof handler.onDataChanged === "function") {
      handler.onDataChanged([...data]);
    }
  }

  function generateId() {
    return crypto.randomUUID
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2);
  }

  // NEW: keep other tabs/windows in sync
  function onStorage(e) {
    if (e.key !== STORAGE_KEY) return;
    load();
    notify();
  }

  window.dataSdk = {
    async init(dataHandler) {
      handler = dataHandler;
      load();
      notify();

      // NEW: listen once per page load
      window.removeEventListener("storage", onStorage);
      window.addEventListener("storage", onStorage);

      return { isOk: true };
    },

    async create(item) {
      const record = {
        ...item,
        __backendId: generateId(),
      };
      data.push(record);
      save();
      notify();
      return { isOk: true, value: record };
    },

    async update(updatedItem) {
      const index = data.findIndex(
        (d) => d.__backendId === updatedItem.__backendId
      );
      if (index === -1) {
        return { isOk: false };
      }

      data[index] = { ...updatedItem };
      save();
      notify();
      return { isOk: true };
    },

    async delete(item) {
      const index = data.findIndex((d) => d.__backendId === item.__backendId);
      if (index === -1) {
        return { isOk: false };
      }

      data.splice(index, 1);
      save();
      notify();
      return { isOk: true };
    },
  };
})();
