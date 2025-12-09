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
  const AGENT_TOKEN = undefined; //"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWVyIjoiNVBJS0VfNVBJRUdFTCIsInZlcnNpb24iOiJ2Mi4zLjAiLCJyZXNldF9kYXRlIjoiMjAyNS0xMS0zMCIsImlhdCI6MTc2NDUyNzI5Miwic3ViIjoiYWdlbnQtdG9rZW4ifQ.qLxp2tZGwXqs8Ae2nJhAvGbE9cdcED-mHEBrh4Lpfqdsw8HG0nSHKyW8XOwE15h1dFMtrl8n3SbdiYhjdhwfrRqkdkGxEr9B-qOIcGFHTpXVYJtUOlDWbNwtphjmkrfNqkuYNVToZiZAR-avjkITbZH4E84_Ae9UCozWDHmDgDzV_EqoTevNOjD3Io4SGGohDauKwoVHWxuEmZIqSqVJBQewxKi9ckoy71ejmJuET0fYj7z0hWjJ9aodJKHr9ifG8wVWixA9dBhpHrWfL-ZfBNNHMxS8aIrRzeaMmLjwjJJMsIMVYpSZbTt2fcJG-Acsg5jncDYVLsI7gi3_Q-PbHcJWoThw0KlAcz1Bx8mrGSnkp3zyLFZ8Kn0Bv_-mUFoWh5fa8agrFcmXh-vuKtfvI2NMRwtnOChh8Guncx8PddSB8JWE69uzBuy_K5Aycq6Gl7NXB0mQvfszzDeIMCgKt39m-Cj9ptE7YwW-iM0oWPdELZacYnXjnEYKLJoQHTk3vTxJHELD0AvdStw-AI23DYaldPf4EyIel3G8_KCLwPVgAmNSMSlOUB3jN2dOxlra3W1e9CLAQv3eMVOwSTNwWnvJk_6l_-6FGggSOg0X54OJ3KYy_tY_qVaz5rvso62MsMSmJLc4gQS9MEw3fIBDKdAdurGt_coAzOkDAYSy1ww"
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
  function getDistanceFromWaypoints(a, b) {
    return Math.round(Math.sqrt(Math.pow((a.x - b.x), 2) + Math.pow((a.y - b.y), 2)))
  }
  return {
    cell,
    canHover,
    newWayPointData,
    switchCanHover,
    cellHoverd,
    setNewWayPoint,
    getDistanceFromWaypoints
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
