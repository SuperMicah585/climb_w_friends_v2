import { MapObject } from '../../types/interfaces';

const retrieveUsersOnMap = async (mapId: number) => {
  const url = `http://localhost:5074/api/Maps/Userlist/${mapId}`;
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
      mapsJson.map(async (item, index) => {
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
    const response = await fetch(`http://localhost:5074/api/Maps/${id}`, {
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
  const url = `http://localhost:5074/api/Climbs/ByMap/${mapId}/Count`;
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

const addUserToMap = async (mapId: number, userId: string, type: string) => {
  const payload = { UserId: userId };

  try {
    const response = await fetch(
      `http://localhost:5074/api/Maps/${mapId}/users`,
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

      /*tldr when user gets added to a map two things may happen

1) User will join a map without any users. 
When this happens we will take the map object and manuall create the key/array that contains the one climber for it on the frontend. This happens when createMap is called
OR
2) User will join an already created map. When this happens we must get the map objects and all of the users before the user is added. We will
then add the user to the map on the client side.

*/

      if (data.map) {
        if (type === 'mapCreate') {
          data.map['climbersOnMap'] = [
            {
              userId: userId,
              firstName: 'Micah',
              lastName: 'Phelps',
              email: 'micahphlps@gmail.com',
              userName: 'phelpsm4',
            },
          ]; //code here will change once we get user table
          //setMapObject((prev) => [...prev, data.map]); // Update state with new map
          return data;
        } else {
          return false;
        }

        //code here for when user gets added to an existing map
      } else {
        console.warn('Response does not contain "map" property:', data);
        return false;
      }
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
      `http://localhost:5074/api/Maps/${mapId}/users/${userId}`,
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
    const response = await fetch(`http://localhost:5074/api/Maps/`, {
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
        const mapData = await addUserToMap(
          mapObject.mapId,
          userID,
          'mapCreate',
        );
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

export {
  retrieveMapsAndUsers,
  retrieveUsersOnMap,
  editMap,
  addUserToMap,
  removeUserFromMap,
  createMap,
  retrieveClimbsOnMapCount,
};
