import AsyncStorage from "@react-native-async-storage/async-storage";

export const removeCurrentUser = async () => {
  await AsyncStorage.removeItem("@user");
}

export const getCurrentUser = async () => {
  return JSON.parse(await AsyncStorage.getItem("@user"));
}

export const setCurrentUser = async (user) => {
  return await AsyncStorage.setItem("@user", JSON.stringify(user));
}

export const getUserList = async () => {
  return JSON.parse(await AsyncStorage.getItem("@userList"));
}

export const setUserList = async (userList) => {
  await AsyncStorage.setItem("@userList", JSON.stringify(userList))
}

export const getLeaderboardList = async () => {
  return JSON.parse(await AsyncStorage.getItem("@leaderboard"));
}

export const setLeaderboardList = async (leaderboardList) => {
  await AsyncStorage.setItem("@leaderboard", JSON.stringify(leaderboardList))
}

export const removeLocalStorage = () => {
  return AsyncStorage.clear();
}

export const updateUserList = async (user) => {
  const userList = await getUserList() ?? [];
  const index = userList?.findIndex((item) => item.username === user.username);
  userList[index] = user;
  await setUserList(userList);
}

function getRandomInt(n) {
  return Math.floor(Math.random() * n);
}
export function shuffle(s) {
  const arr = s.split('');
  const n = arr.length;

  for(let i=0 ; i<n-1 ; ++i) {
    const j = getRandomInt(n);

    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  s = arr.join('');
  return s;
}

