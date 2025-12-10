import { defineStore } from "pinia";
import { useAdminAgentStore, useSystemStore } from ".";
const FETCH_URL = "https://api.spacetraders.io/v2/";
export const useNavigationStore = defineStore("navigation", () => {

    const agentStore = useAdminAgentStore();
    const systemStore = useSystemStore();
    async function dockUndockShip(ship, agentToken) {
        if (!(ship.nav.status === "DOCKED" || ship.nav.status === "IN_ORBIT"))
            return;
        const toDockOrOrbit = ship.nav.status === "DOCKED" ? 'orbit' : 'dock'
        const options = {
            method: "POST",
            headers: { Authorization: "Bearer " + agentToken },
        };
        try {
            let response = await fetch(`${FETCH_URL}my/ships/${ship.symbol}/${toDockOrOrbit}`, options);
            if (response.ok) {
                const json = await response.json();
                systemStore.getSystemData(agentToken);
            }
        } catch (error) {
            console.log(error);
        }
    }
    async function navigateToWaypoint(ship, waypoint, agentToken) {

        if (ship.nav.status !== "IN_ORBIT")
            return;
        const options = {
            method: "POST",
            headers: { 'Content-Type': 'application/json', Authorization: "Bearer " + agentToken },
            body: JSON.stringify({
                waypointSymbol: waypoint.symbol,
            })
        };
        try {
            let response = await fetch(`${FETCH_URL}my/ships/${ship.symbol}/navigate`, options);
            if (response.ok) {
                const json = await response.json();
                systemStore.getSystemData(agentToken);
            }
        } catch (error) {
            console.log(error);
        }
    }
    async function refuelShip(ship, agentToken) {
        console.log(ship)
        const options = {
            method: "POST",
            headers: { 'Content-Type': 'application/json', Authorization: "Bearer " + agentToken },
            body: JSON.stringify({
                units: (ship.fuel.capacity - ship.fuel.current),
                fromCargo: false
            })
        };
        try {
            let response = await fetch(`${FETCH_URL}my/ships/${ship.symbol}/refuel`, options);
            if (response.ok) {
                const json = await response.json();
                systemStore.getSystemData(agentToken);
            }
        } catch (error) {
            console.log(error);
        }
    }
    function getDistanceFromWaypoints(a, b) {
        return Math.round(Math.sqrt(Math.pow((a.x - b.x), 2) + Math.pow((a.y - b.y), 2)))
    }
    return {
        getDistanceFromWaypoints,
        navigateToWaypoint,
        dockUndockShip,
        refuelShip
    };
});