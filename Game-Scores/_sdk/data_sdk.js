window.dataSdk = (function () {
  let groups = [];
  let handlerRef = null;

  return {
    init(handler) {
      console.log("Data SDK initialized");
      handlerRef = handler;
      handler.onDataChanged(groups);
      return Promise.resolve({ isOk: true });
    },
    create(group) {
      group.__backendId = Date.now(); // unique ID
      groups.push(group);
      if (handlerRef) handlerRef.onDataChanged(groups);
      console.log("Group created:", group);
      return Promise.resolve({ isOk: true });
    },
    update(updatedGroup) {
      groups = groups.map((g) =>
        g.__backendId === updatedGroup.__backendId ? updatedGroup : g
      );
      if (handlerRef) handlerRef.onDataChanged(groups);
      console.log("Group updated:", updatedGroup);
      return Promise.resolve({ isOk: true });
    },
    delete(group) {
      groups = groups.filter((g) => g.__backendId !== group.__backendId);
      if (handlerRef) handlerRef.onDataChanged(groups);
      console.log("Group deleted:", group);
      return Promise.resolve({ isOk: true });
    },
  };
})();