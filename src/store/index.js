import { defineStore } from "pinia";
import { ref, computed } from "vue";

// Import the base URL from the environment

export default defineStore("spatial", () => {
    const agent = ref({});
    function setAgent(Agent) { agent.value = Agent }

    const fetchUrl = "https://api.spacetraders.io/v2/";
    const TOKEN = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWVyIjoiY21pajUyZzJrMDAwcnRtMTd1aGhhcGt0aCIsInZlcnNpb24iOiJ2Mi4zLjAiLCJpYXQiOjE3NjQzNTExMjgsInN1YiI6ImFjY291bnQtdG9rZW4ifQ.QZJ2w56H7HYN4PkDmVVWNrVI7ONK75rQfj-OVk0kAwCoVmHwLtFuj2zxA32iRDGYnThZbxMo7TsDE8pw3PcBika1f7fpXHxk6-eCkz8HX4KCH0J2NrJMMY8oTqLAH30eClBCT5yvwi3lvQsBalCZYbfNpqG2UsvEK3xf0FiIOUw9v6XQUVDpAYyiwNomzpk_aK3ociMeHn7sc8HeW2Nayn489ycKszddXTD9nt1kHCF1AX1FKGAgY5DkqQmp_FAvq7Q_IZz7fyuZKeYzlJS-pm2Ijl1iXhc0ZOImzapJ4IxxKfFHe4pYNo-BHuwJF2B9SPXgxpzFwNVVjxVINzPghKHGummfog9sakUUa7eudTS8jF3-_VYBIcqjElVMICY4kYByYm1Kejcgtg-fPx2QiMxCr7WcOZRUhwRd-KSmX9bzotfn6Y8FBS5sR_HXb3oDgy3mv_m2fTFdYlo2xUKUamNeEQyvnjGluiV2bEIxVgdqtVwzc-cDrGn8CybajJ7SLDiin4yiKQgF8VNToMC9WKj1eq-j1C_Nn3x-lXW75o4M5lismp1mFmmKt76Rct0HBrYxgICu7zxQ5D0ohVDs6eGQpYF-dO4-LrRadti8ksPM9x6TB6NOsNM4aQvNeBW7tBSq_0NzVNj--vMo4RajWsSVXBXnrNFtLhoHIPy0Juo"
    const MAIL = "bontempsbastien@gmail.com";
    const SPIKE_TOKEN = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWVyIjoiNVBJS0VfNVBJRUdFTCIsInZlcnNpb24iOiJ2Mi4zLjAiLCJyZXNldF9kYXRlIjoiMjAyNS0xMS0zMCIsImlhdCI6MTc2NDUyNzI5Miwic3ViIjoiYWdlbnQtdG9rZW4ifQ.qLxp2tZGwXqs8Ae2nJhAvGbE9cdcED-mHEBrh4Lpfqdsw8HG0nSHKyW8XOwE15h1dFMtrl8n3SbdiYhjdhwfrRqkdkGxEr9B-qOIcGFHTpXVYJtUOlDWbNwtphjmkrfNqkuYNVToZiZAR-avjkITbZH4E84_Ae9UCozWDHmDgDzV_EqoTevNOjD3Io4SGGohDauKwoVHWxuEmZIqSqVJBQewxKi9ckoy71ejmJuET0fYj7z0hWjJ9aodJKHr9ifG8wVWixA9dBhpHrWfL-ZfBNNHMxS8aIrRzeaMmLjwjJJMsIMVYpSZbTt2fcJG-Acsg5jncDYVLsI7gi3_Q-PbHcJWoThw0KlAcz1Bx8mrGSnkp3zyLFZ8Kn0Bv_-mUFoWh5fa8agrFcmXh-vuKtfvI2NMRwtnOChh8Guncx8PddSB8JWE69uzBuy_K5Aycq6Gl7NXB0mQvfszzDeIMCgKt39m-Cj9ptE7YwW-iM0oWPdELZacYnXjnEYKLJoQHTk3vTxJHELD0AvdStw-AI23DYaldPf4EyIel3G8_KCLwPVgAmNSMSlOUB3jN2dOxlra3W1e9CLAQv3eMVOwSTNwWnvJk_6l_-6FGggSOg0X54OJ3KYy_tY_qVaz5rvso62MsMSmJLc4gQS9MEw3fIBDKdAdurGt_coAzOkDAYSy1ww"

    return {
        agent,
        setAgent,
        fetchUrl,
        TOKEN,
        MAIL,
        SPIKE_TOKEN
    };
});
/*const baseUrl = import.meta.env.VITE_API_URL || "";
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
  }*/