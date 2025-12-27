import { defineStore } from "pinia";
import { ref } from "vue";
import { useAdminAgentStore } from ".";
const FETCH_URL = "https://api.spacetraders.io/v2/";
export const useSystemStore = defineStore("systemData", () => {
    const agentStore = useAdminAgentStore();
    const ships = ref({});
    const position = ref({});
    const astres = ref([]);
    const astresAgent= ref([]);
    const readyToFetchSystemData = ref(false);
    const readytoMap = ref(false);
    const notReadytoDisplayMap = ref(true);
    const displayWayPoints = ref(false);
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
    ];
    const coolDown = ref(0);
    async function setDisplayWayPoints(agentToken) {
        displayWayPoints.value = displayWayPoints.value ? false : true;
        if (astresAgent.value.length === 0) {
            const options = {
                method: "GET",
                headers: { Authorization: "Bearer " + agentToken.value },
            };
            try {
                let response = await fetch(
                    `${FETCH_URL}systems/${agentStore.getAgentSystemFromHQ()}`,
                    options
                );
                if (response.ok) {
                    const json = await response.json();
                    astresAgent.value = json.data.waypoints;
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
    async function getSystemData(agentToken) {
        const options = {
            method: "GET",
            headers: { Authorization: "Bearer " + agentToken.value },
        };
        try {
            let response = await fetch(FETCH_URL + "my/ships", options);
            if (response.ok) {
                const json = await response.json();
                ships.value = json.data;
                coolDown.value = ships.value[0].cooldown.remainingSeconds;
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
        astresAgent,
        readytoMap,
        notReadytoDisplayMap,
        mapDataMap,
        coolDown,
        displayWayPoints,
        readyToFetchSystemData,
        getSystemData,
        setDisplayWayPoints
    };
});
