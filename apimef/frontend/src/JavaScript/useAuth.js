import { ref } from "vue";

export function useAuth() {
  const utilisateur = ref(JSON.parse(localStorage.getItem("utilisateur")) || null);
  const isConnected = ref(!!utilisateur.value);

  const logout = () => {
    localStorage.removeItem("utilisateur");
    localStorage.removeItem("token");
    utilisateur.value = null;
    isConnected.value = false;
  };

  return { utilisateur, isConnected, logout };
}
