import { defineStore } from "pinia";
import { ref, computed } from "vue";

// Import the base URL from the environment

export default defineStore("cart", () => {
  const baseUrl = import.meta.env.VITE_API_URL || "";
  const panier = ref([]);

  const prixTotal = computed(() => {
    return panier.value.reduce((prev, curr) => {
      return prev + curr.price;
    }, 0);
  });

  function ajouter(poutine) {
    panier.value.push(poutine);
  }

  function retirer(index) {
    panier.value.splice(index, 1);
  }

  function vider() {
    panier.value.splice(0);
  }

  // Exemple si on voulait récupérer des données depuis le backend depuis le store
  async function getDataFromBackend() {
    try {
      const response = await fetch(`${baseUrl}/data`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      throw error;
    }
  }

  // Exemple si on voulait enregistrer notre panier dans le backend depuis le store
  async function enregistrerPanier() {
    try {
      const response = await fetch(`${baseUrl}/data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(panier),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      throw error;
    }
  }

  return {
    panier,
    prixTotal,
    ajouter,
    retirer,
    vider,
    getDataFromBackend,
    enregistrerPanier,
  };
});
