import { MapObject, friendsObject } from '../../types/interfaces';

const retrieveUsersOnMap = async (url: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();

    // Update the specific object at the given index in the array
    return json;
  } catch (error: any) {
    console.error(error.message);
  }
};



const retrieveMapsAndUsers = async (mapsJson: MapObject[] | undefined) => {
  if (mapsJson) {
    // Create a new array to store updated maps
    const updatedMaps = [...mapsJson];

    for (const [index, item] of mapsJson.entries()) {
      const url = `http://localhost:5074/api/Maps/Userlist/${item.mapId}`;

      const usersOnMap = await retrieveUsersOnMap(url);

      updatedMaps[index] = { ...item, climbersOnMap: usersOnMap };
    }

    return updatedMaps;
  } else {
    return [];
  }
};

export { retrieveMapsAndUsers, retrieveUsersOnMap };