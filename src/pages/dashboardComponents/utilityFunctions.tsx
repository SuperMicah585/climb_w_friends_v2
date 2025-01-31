import { MapObject } from '../../types/interfaces';
const domain = import.meta.env.VITE_DOMAIN;
const retrieveUsersOnMap = async (mapId: number) => {
  const url = `${domain}api/Maps/Userlist/${mapId}`;
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

    const updatedMaps = await Promise.all(
      mapsJson.map(async (item) => {
        const [usersOnMap, climbCountOnMap] = await Promise.all([
          retrieveUsersOnMap(item.mapId),
          retrieveClimbsOnMapCount(item.mapId),
        ]);

        return {
          ...item,
          climbersOnMap: usersOnMap,
          climbCountOnMap: climbCountOnMap,
        };
      }),
    );

    return updatedMaps;
  } else {
    return [];
  }
};

//need to edit users on map in the future
const editMap = async (title: string, description: string, id: number) => {
  try {
    const response = await fetch(`${domain}api/Maps/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Description: description,
        MapName: title, // Ensure this matches backend expectations
      }),
    });

    if (response.ok) {
      return true;
    } else {
      const error = await response.text();
      console.error(':', error);
      return false;
    }
  } catch (err) {
    console.error('Network error:', err);
    return false;
  }
};

const retrieveClimbsOnMapCount = async (mapId: number) => {
  const url = `${domain}api/Climbs/ByMap/${mapId}/Count`;
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

const addUserToMap = async (mapId: number, userId: string) => {
  const payload = { UserId: userId };

  try {
    const response = await fetch(
      `${domain}api/Maps/${mapId}/users`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      },
    );

    if (response.ok) {
      const data = await response.json(); // Safely parse JSON

      if (data) {
        return data;
      } else {
        return false;
      }

      //code here for when user gets added to an existing map
    } else {
      const error = await response.text();
      console.error('Error joining the map:', error);
      return false;
    }
  } catch (err) {
    console.error('Network error:', err);
    return false;
  }
};

const removeUserFromMap = async (mapId: number, userId: string) => {
  try {
    const response = await fetch(
      `${domain}api/Maps/${mapId}/users/${userId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (response.ok) {
      return true;
    } else {
      const error = await response.text();
      console.error('Error adding user to map:', error);
      return false;
    }
  } catch (err) {
    console.error('Network error:', err);
    return false;
  }
};

const createMap = async (
  title: string,
  description: string,
  userID: string,
) => {
  try {
    const response = await fetch(`${domain}api/Maps/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description,
        mapName: title, // Ensure this matches backend expectations
      }),
    });

    if (response.ok) {
      const mapObject = await response.json(); // Safely parse JSON

      if (mapObject && userID) {
        const mapData = await addUserToMap(mapObject.mapId, userID);
        if (mapData) {
          return mapData;
        }
      } else {
        console.error('Map object or user is not defined.');
        return false;
      }
    } else {
      const error = await response.text();
      console.error(':', error);
      return false;
    }
  } catch (err) {
    console.error('Network error:', err);
    return false;
  }
};

const retrieveUserStats = async (auth0Id: string) => {
  const url = `${domain}api/User/${auth0Id}/GetStats`;
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

const retrieveAllUsers = async () => {
  const url = `${domain}api/User/List`;
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

export {
  retrieveAllUsers,
  retrieveUserStats,
  retrieveMapsAndUsers,
  retrieveUsersOnMap,
  editMap,
  addUserToMap,
  removeUserFromMap,
  createMap,
  retrieveClimbsOnMapCount,
};
