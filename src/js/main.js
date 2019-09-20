import axios from "axios";

export async function isUserAuthenticated () {
  
  const check = async () => {
    try {
      const result = await WavesKeeper.publicState();
      return result;
    } catch (err) {
      return false;
    }
  }

  const result = await check();

  if (!result) {
    window.isShowModalGuideWavesKeeper = true;
    return;
  }

  const route = window.location.origin + '/api/v1/users/' + result.account.address;

  const backendResponse = await axios.get(route);
  const { role } = backendResponse.data;

  window.isShowModalGuideWavesKeeper = role === "anonymous";
}
  
export default function main () { }