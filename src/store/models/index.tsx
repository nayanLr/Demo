const agentRecord: any[] = [];

export const addAgentRecord = {
  state: agentRecord,
  reducers: {
    addAgent: (state: any, payload: any) => {
      return state.concat(payload);
    },
  },
};

export const removeAgentRecord = {
  state: agentRecord,
  reducers: {
    removeAgent: (state: any, payload: any) => {
      return state.filter((agent: any) => agent.id !== payload);
    },
  },
};
