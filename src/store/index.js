import { defineStore } from "pinia";
import { ref, computed, reactive } from "vue";
const FETCH_URL = "https://api.spacetraders.io/v2/";

export const useAdminAgentStore = defineStore("spatial", () => {
  const agent = reactive({
    accountId: "",
    symbol: "",
    headquarters: "",
    credits: "",
    startingFaction: "",
    shipCount: "",
  });
  const subscriptionFeedBack = ref([]);
  function setAgent(Agent) {
    agent.accountId = Agent.accountId;
    agent.symbol = Agent.symbol;
    agent.headquarters = Agent.headquarters;
    agent.credits = Agent.credits;
    agent.startingFaction = Agent.startingFaction;
    agent.shipCount = Agent.shipCount;
  }
  function getAgent() {
    return agent;
  }
  const TOKEN =
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWVyIjoiY21pajUyZzJrMDAwcnRtMTd1aGhhcGt0aCIsInZlcnNpb24iOiJ2Mi4zLjAiLCJpYXQiOjE3NjQzNTExMjgsInN1YiI6ImFjY291bnQtdG9rZW4ifQ.QZJ2w56H7HYN4PkDmVVWNrVI7ONK75rQfj-OVk0kAwCoVmHwLtFuj2zxA32iRDGYnThZbxMo7TsDE8pw3PcBika1f7fpXHxk6-eCkz8HX4KCH0J2NrJMMY8oTqLAH30eClBCT5yvwi3lvQsBalCZYbfNpqG2UsvEK3xf0FiIOUw9v6XQUVDpAYyiwNomzpk_aK3ociMeHn7sc8HeW2Nayn489ycKszddXTD9nt1kHCF1AX1FKGAgY5DkqQmp_FAvq7Q_IZz7fyuZKeYzlJS-pm2Ijl1iXhc0ZOImzapJ4IxxKfFHe4pYNo-BHuwJF2B9SPXgxpzFwNVVjxVINzPghKHGummfog9sakUUa7eudTS8jF3-_VYBIcqjElVMICY4kYByYm1Kejcgtg-fPx2QiMxCr7WcOZRUhwRd-KSmX9bzotfn6Y8FBS5sR_HXb3oDgy3mv_m2fTFdYlo2xUKUamNeEQyvnjGluiV2bEIxVgdqtVwzc-cDrGn8CybajJ7SLDiin4yiKQgF8VNToMC9WKj1eq-j1C_Nn3x-lXW75o4M5lismp1mFmmKt76Rct0HBrYxgICu7zxQ5D0ohVDs6eGQpYF-dO4-LrRadti8ksPM9x6TB6NOsNM4aQvNeBW7tBSq_0NzVNj--vMo4RajWsSVXBXnrNFtLhoHIPy0Juo";
  const MAIL = "bontempsbastien@gmail.com";
  const AGENT_TOKEN = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWVyIjoiSlVBTl9HVVkiLCJ2ZXJzaW9uIjoidjIuMy4wIiwicmVzZXRfZGF0ZSI6IjIwMjUtMTItMDciLCJpYXQiOjE3NjUxMzgwODIsInN1YiI6ImFnZW50LXRva2VuIn0.rmDlWozDP5BnGQfLJKJuOOVptEjgZXnioBhHG7BMIUmShT5XSm8afcFN7Z534oDUCZ3d2EU4TX0VTGoKgNzxwNh2gvBT8h8SKtC6v-HnqArxejml1jJj5hwKbCg3k6cLpXpJzbahM83Fi4ZBDetDUUth9bbOrWjCtnxg_U3wZdEor5qR7dpQqY2x25HEN94tqChtT7G4lk0q4lUP1QRF5sInUD0FVGl6q7IG12BUBljc16S7d9bRBWE3GiQlYjDCBMMeVXhdW3m-w2tiHBHz6Rc57yTVt889TJcS3QtCLG4J8TzdyUf_Eg81P2FJImbhUFrKgy4qc16QOpOhawfEibA7oMGpXkohUojK5NicgyxYoal0WxXPi-l9nUtf_7G0tmy2uItHsXB7HyZ0aX0H6yMrx2jKQG3PC0OY7AYN3-MAahYSHXdv7lj7sMnSB0qJtX7x01ZhrAEv_dMeIFIckl9ye-gmMdL-_EZN0VgL7O79l2wM6Fn1zqwjC0LAMWxYEpIXc6ErpMz_E89UOeY9ctUA569OahQAGVUxk9LCN6m-u8HTzSEmp0ZZOw7AZV11GI_W8284XaYZZP8R9z1ql_03q68m1VEZU8A9GW1qjixAfnQWDNOBLPSDcs_TMXxoHS87biLpJKuTTlR3hBeFEMJ3AY092bUhKwXqyi_LlTs";
  const localStorageToken = ref("");
  const fetchOptions = {
    method: "GET",
    headers: { Authorization: "Bearer " + localStorageToken.value },
  };
  const agentToken = computed(() => {
    return AGENT_TOKEN ?? localStorageToken.value;
  });

  function setLocalStorageToken(token) {
    localStorageToken.value = token;
  }
  function setSubscriptionFeedBack(feedBack) {
    subscriptionFeedBack.value.push(feedBack);
  }
  return {
    agent,
    subscriptionFeedBack,
    getAgent,
    setAgent,
    setSubscriptionFeedBack,
    setLocalStorageToken,
    FETCH_URL,
    TOKEN,
    MAIL,
    AGENT_TOKEN,
    localStorageToken,
    agentToken,
    fetchOptions
  };
});

export const useSystemStore = defineStore("systemData", () => {
  const ships = ref({});
  const position = ref({});
  const astres = ref([]);
  const readytoMap = ref(false);
  const mapDataMap = [
    ['MOON', 'bg-info-subtle'],
    ['ORBITAL_STATION', 'bg-warning-subtle'],
    ['ASTEROID', 'bg-dark'],
    ['FUEL_STATION', 'bg-warning'],
    ['PLANET', 'bg-primary'],
    ['JUMP_GATE', 'bg-success'],
    ['GAS_GIANT', 'bg-danger'],
    ['ENGINEERED_ASTEROID', 'bg-success-subtle'],
    ['ASTEROID_BASE', 'bg-dark-subtle'],
  ]

  async function getSystemData(agentToken) {
    const options = {
      method: "GET",
      headers: { Authorization: "Bearer " + agentToken },
    };
    try {
      let response = await fetch(FETCH_URL + "my/ships", options);
      if (response.ok) {
        const json = await response.json();
        ships.value = json.data;
      }
      let shipData = ships.value[0].nav;
      response = await fetch(
        FETCH_URL +
          `systems/${shipData.systemSymbol}/waypoints/${shipData.waypointSymbol}`,
        options
      );
      if (response.ok) {
        const json = await response.json();
        position.value = json.data;
      }
      response = await fetch(
        FETCH_URL + `systems/${shipData.systemSymbol}`,
        options
      );
      if (response.ok) {
        const json = await response.json();
        astres.value = json.data.waypoints;
        readytoMap.value = true;
      }
    } catch (error) {
      console.log(error);
    }
  }
  return {
    ships,
    position,
    astres,
    readytoMap,
    mapDataMap,
    getSystemData,
  };
});

export const useMapStore = defineStore("map", () => {

  const cell = ref({});
  const canHover = ref(true);

  const newWayPointData = ref({});

  function cellHoverd(aCell) {
    cell.value = aCell;
  }
  function setNewWayPoint(newData) {
    newWayPointData.value = newData;
  }
  async function switchCanHover() {
    canHover.value = canHover.value ? false : true;
    if (canHover.value)
      newWayPointData.value = {};
  }

  return {
    cell,
    canHover,
    newWayPointData,
    switchCanHover,
    cellHoverd,
    setNewWayPoint,

  };
});

export const useContratStore = defineStore("contrat", () => {
  const contrats = ref({});
  const contratInfo = ref({});

  async function getListContrats(agentToken) {
    const options = {
      method: "GET",
      headers: { Authorization: "Bearer " + agentToken },
    };
    try {
      let response = await fetch(FETCH_URL + "my/contracts", options);
      if (response.ok) {
        const json = await response.json();
        contrats.value = json.data;
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function getContratInfos(agentToken, contratId) {
    const options = {
      method: "GET",
      headers: { Authorization: "Bearer " + agentToken },
    };
    try {
      let response = await fetch(
        FETCH_URL + "my/contracts/" + contratId,
        options
      );
      if (response.ok) {
        const json = await response.json();
        contratInfo.value = json.data;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function acceptContrat(agentToken, contratId) {
    const options = {
      method: "POST",
      headers: { Authorization: "Bearer " + agentToken },
    };
    try {
      let response = await fetch(
        FETCH_URL + "my/contracts/" + contratId + "/accept",
        options
      );
      if (response.ok) {
        const json = await response.json();
        contratInfo.value = json.data.contract;
      }
    } catch (error) {
      console.log(error);
    }
  }

  return {
    contrats,
    contratInfo,
    getListContrats,
    getContratInfos,
    acceptContrat
  };
});
