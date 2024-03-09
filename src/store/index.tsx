import { init } from "@rematch/core";
import { addAgentRecord, removeAgentRecord } from "./models";

const store = init({
    models: {
      addAgent: addAgentRecord,
      removeAgent: removeAgentRecord,
    },
  });

export default store;