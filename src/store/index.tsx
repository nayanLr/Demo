import { init } from "@rematch/core";
import { Alert } from "react-native";

export interface Agent {
  companyName: string;
  name: string;
  mobileNo: string;
  landlineNo: string;
  licenceNo: string;
  emailAddress: string;
  secendryEmailAddress: string;
}

interface AgentRecordState {
  agents: Agent[];
}

export const agentRecord = {
  state: { agents: [] } as AgentRecordState,
  reducers: {
    addAgent: (state: AgentRecordState, payload: Agent) => {
      return { ...state, agents: [...state.agents, payload] };
    },
    removeAgentByMobile: (state: AgentRecordState, mobileNo: string) => {
      return {
        ...state,
        agents: state.agents.filter((agent) => agent.mobileNo !== mobileNo),
      };
    },
    updateAgent: (state: AgentRecordState, payload: Agent) => {
      const isValidMobile = state.agents.some(
        (agent) => agent.mobileNo === payload.mobileNo
      );
      if (!isValidMobile) {
        Alert.alert(
          "Invalid Mobile Number",
          "Please enter a valid mobile number for updating records.",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }]
        );
        return state;
      }

      return {
        ...state,
        agents: state.agents.map((agent) =>
          agent.mobileNo === payload.mobileNo ? { ...agent, ...payload } : agent
        ),
      };
    },
  },
};

const store = init({
  models: {
    agentRecord,
  },
});

store.subscribe(() => {
  console.log("Updated State ---", store.getState()?.agentRecord?.agents);
});

export default store;
