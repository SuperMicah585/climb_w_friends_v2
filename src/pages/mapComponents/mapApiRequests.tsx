import { ClimbWithDependencies } from '../../types/interfaces';
const domain = import.meta.env.VITE_DOMAIN;
const createTag = async (TagName: string, mapId: number) => {
  try {
    const response = await fetch(`${domain}api/Tags`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        TagName,
      }),
    });

    if (response.ok) {
      const tagObject = await response.json(); // Safely parse JSON

      if (tagObject && mapId) {
        const mapToTag = await addTagToMap(tagObject.tagId, mapId);
        if (mapToTag) {
          ('success');
          return tagObject;
        }
      } else {
        console.error('Map object or user is not defined.');
        return false;
      }
    } else {
      const error = await response.text();
      console.error('Error creating the Tag:', error);
      return false;
    }
  } catch (err) {
    console.error('Network error:', err);
    return false;
  }
};

const addTagToMap = async (tagId: number, mapId: number) => {
  try {
    const response = await fetch(
      `${domain}api/Tags/${tagId}/ToMap/${mapId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (response.ok) {
      const data = await response.json(); // Safely parse JSON

      // Handle success case
      return data;
    } else {
      // If the response is not OK, try to log the reason
      const error = await response.json(); // Try parsing the error JSON
      console.warn('Response indicates failure:', error.message || error);
      return false;
    }
  } catch (err) {
    console.error('Network error:', err);
    return false;
  }
};

const addTagToClimb = async (tagId: number, climbId: number, mapId: number) => {
  try {
    const response = await fetch(
      `${domain}api/Tags/${tagId}/ToClimb/${climbId}/OnMap/${mapId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (response.ok) {
      return true;
    } else {
      const error = await response.json(); // Try parsing the error JSON
      console.warn('Failed to add tag:', error.message || error);
      return false;
    }
  } catch (err) {
    console.error('Network error:', err);
    return false;
  }
};

const removeTagFromClimb = async (tagId: number, climbId: number) => {
  try {
    const response = await fetch(
      `${domain}api/Tags/${tagId}/FromClimb/${climbId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (response.ok) {
      // Handle success case
      return true;
    } else {
      // If the response is not OK, try to log the reason
      const error = await response.json(); // Try parsing the error JSON
      console.warn('Response indicates failure:', error.message || error);
      return false;
    }
  } catch (err) {
    console.error('Network error:', err);
    return false;
  }
};

const removeTagFromMap = async (mapId: number, tagId: number) => {
  try {
    const response = await fetch(
      `${domain}api/Tags/${tagId}/Maps/${mapId}`,
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

const retrieveClimbs = async (
  searchString: string,
  State: string,
  type: string,
) => {
  const url = `${domain}api/Climbs/List/${searchString}/Within/${State}/IsType/${type}`;
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

const retrieveFeatures = async (mapId: number, auth0Id: string) => {
  const url = `${domain}api/Features/ByMap/${mapId}/ForUser/${auth0Id}`;
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

const retrieveClimbDependencies = async (climbId: number) => {
  const url = `${domain}api/Climbs/${climbId}/Dependencies`;
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

const retrieveFeatureDependencies = async (
  featureId: number,
  auth0Id: string,
) => {
  const url = `${domain}api/Features/${featureId}/Dependencies/UserId/${auth0Id}`;
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

const retrieveFeatureDependenciesByMap = async (
  mapId: number,
  auth0Id: string,
) => {
  const url = `${domain}api/Features/ByMapId/${mapId}/Dependencies/UserId/${auth0Id}`;
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

const retrieveFeatureAggregate = async (featureId: number, auth0Id: string) => {
  const url = `${domain}api/Features/${featureId}/Aggregate_climbs/ForUser/${auth0Id}`;
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

const addClimbsToMap = async (
  mapId: number,
  climbs: ClimbWithDependencies[],
) => {
  const climbingData = climbs.map((item) => ({
    Coordinates: item.climb.coordinates,
    ClimbId: item.climb.climbId,
  }));

  try {
    const response = await fetch(
      `${domain}api/Features/Climbs/ToMap/${mapId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(climbingData),
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    await response.json();
  } catch (error) {
    console.error('Error sending climbing data:', error);
    throw error;
  }
};

const addUserToClimb = async (
  climbId: number,
  userId: string,
  mapId: number,
) => {
  try {
    const response = await fetch(
      `${domain}api/Climbs/${climbId}/ToUser/${userId}/ToMap/${mapId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error sending climbing data:', error);
    throw error;
  }
};

const RemoveUserFromClimb = async (
  climbId: number,
  userId: string,
  mapId: number,
) => {
  try {
    const response = await fetch(
      `${domain}api/Climbs/${climbId}/FromUser/${userId}/FromMap/${mapId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error sending climbing data:', error);
    throw error;
  }
};

const AddAttemptToClimbToUserToMap = async (
  climbId: number,
  userId: string,
  mapId: number,
  notes: string,
  difficulty: string,
  attempts: string,
) => {
  try {
    const response = await fetch(
      `${domain}api/Attempts/ToMap/${mapId}/ToUser/${userId}/ToClimb/${climbId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Notes: notes,
          Difficulty: difficulty,
          Attempts: attempts,
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error sending climbing data:', error);
    throw error;
  }
};

const removeAttempt = async (attemptId: number) => {
  try {
    const response = await fetch(
      `${domain}api/Attempts/${attemptId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (response.ok) {
      // Handle success case
      return true;
    } else {
      // If the response is not OK, try to log the reason
      const error = await response.json(); // Try parsing the error JSON
      console.warn('Response indicates failure:', error.message || error);
      return false;
    }
  } catch (err) {
    console.error('Network error:', err);
    return false;
  }
};

const AddTickToClimbToUserToMap = async (
  climbId: number,
  userId: string,
  mapId: number,
  notes: string,
  difficulty: string,
  attempts: string,
) => {
  try {
    const response = await fetch(
      `${domain}api/Ticks/ToMap/${mapId}/ToUser/${userId}/ToClimb/${climbId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Notes: notes,
          Difficulty: difficulty,
          Attempts: attempts,
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`HTTP error! status: ${error}`);
  }
};

const removeTick = async (tickId: number) => {
  try {
    const response = await fetch(`${domain}api/Ticks/${tickId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      // Handle success case
      return true;
    } else {
      // If the response is not OK, try to log the reason
      const error = await response.json(); // Try parsing the error JSON
      console.warn('Response indicates failure:', error.message || error);
      return false;
    }
  } catch (err) {
    console.error('Network error:', err);
    return false;
  }
};

const AddChatToClimb = async (
  climbId: number,
  userId: string,
  mapId: number,
  message: string,
) => {
  try {
    const response = await fetch(
      `${domain}api/ClimbChats/ToMap/${mapId}/ToUser/${userId}/ToClimb/${climbId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Message: message,
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`HTTP error! status: ${error}`);
  }
};

const ListChatsForClimb = async (climbId: number, mapId: number) => {
  try {
    const response = await fetch(
      `${domain}api/ClimbChats/${climbId}/OnMap/${mapId}/List`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`HTTP error! status: ${error}`);
  }
};

const retrieveTagsOnMap = async (mapId: number) => {
  const url = `${domain}api/Tags/ByMap/${mapId}`;
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

const retrieveFiltersOnMap = async (mapId: number, auth0Id: string) => {
  const url = `${domain}api/Filters/OnMap/${mapId}/ForUser/${auth0Id}/List`;
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

const AddTagFilter = async (auth0Id: string, mapId: number, tagId: number) => {
  try {
    const response = await fetch(
      `${domain}api/Filters/Tag/${tagId}/ToMap/${mapId}/ForUser/${auth0Id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`HTTP error! status: ${error}`);
  }
};

const AddUserFilter = async (
  auth0IdToFilter: string,
  auth0Id: string,
  mapId: number,
) => {
  try {
    const response = await fetch(
      `${domain}api/Filters/User/${auth0IdToFilter}/ToMap/${mapId}/ForUser/${auth0Id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`HTTP error! status: ${error}`);
  }
};

const AddGradeRangeFilter = async (
  auth0Id: string,
  mapId: number,
  fromGrade: string,
  toGrade: string,
  type: string,
) => {
  try {
    const response = await fetch(
      `${domain}api/Filters/GradeRangeFilter/ToMap/${mapId}/ForUser/${auth0Id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          FromGrade: fromGrade,
          ToGrade: toGrade,
          Type: type,
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`HTTP error! status: ${error}`);
  }
};

const removeTagFilter = async (id: number) => {
  try {
    const response = await fetch(
      `${domain}api/Filters/Tag/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (response.ok) {
      // Handle success case
      return true;
    } else {
      // If the response is not OK, try to log the reason
      const error = await response.json(); // Try parsing the error JSON
      console.warn('Response indicates failure:', error.message || error);
      return false;
    }
  } catch (err) {
    console.error('Network error:', err);
    return false;
  }
};

const removeUserFilter = async (id: number) => {
  try {
    const response = await fetch(
      `${domain}api/Filters/User/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (response.ok) {
      // Handle success case
      return true;
    } else {
      // If the response is not OK, try to log the reason
      const error = await response.json(); // Try parsing the error JSON
      console.warn('Response indicates failure:', error.message || error);
      return false;
    }
  } catch (err) {
    console.error('Network error:', err);
    return false;
  }
};

const removeGradeRangeFilter = async (auth0Id: string, mapId: number) => {
  try {
    const response = await fetch(
      `${domain}api/Filters/GradeRange/FromMap/${mapId}/FromUser/${auth0Id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (response.ok) {
      // Handle success case
      return true;
    } else {
      // If the response is not OK, try to log the reason
      const error = await response.json(); // Try parsing the error JSON
      console.warn('Response indicates failure:', error.message || error);
      return false;
    }
  } catch (err) {
    console.error('Network error:', err);
    return false;
  }
};

const checkMapForClimb = async (climbId: number, mapId: number) => {
  try {
    const response = await fetch(
      `${domain}api/Climbs/${climbId}/OnMap/${mapId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`HTTP error! status: ${error}`);
  }
};

const eventLogDataFetch = async (mapId: number, timestamp?: string) => {
  // Construct the base URL
  let url = `${domain}api/ActivityLog?mapId=${mapId}`;

  // Append the timestamp if provided
  if (timestamp) {
    url += `&sinceTimestamp=${encodeURIComponent(timestamp)}`;
  }

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Check if the response is OK
    if (!response.ok) {
      // Extract and log error details if available
      const errorText = await response.text();
      console.error('Error Response:', errorText);
      throw new Error(
        `HTTP error! Status: ${response.status}, Message: ${errorText}`,
      );
    }

    // Parse and return the response data
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error('Fetch Error:', error);
    throw new Error(`Fetch failed: ${error.message || error}`);
  }
};

export {
  eventLogDataFetch,
  checkMapForClimb,
  removeGradeRangeFilter,
  removeUserFilter,
  removeTagFilter,
  AddGradeRangeFilter,
  AddUserFilter,
  AddTagFilter,
  retrieveFiltersOnMap,
  retrieveTagsOnMap,
  ListChatsForClimb,
  AddChatToClimb,
  AddTickToClimbToUserToMap,
  removeTick,
  removeAttempt,
  AddAttemptToClimbToUserToMap,
  RemoveUserFromClimb,
  addUserToClimb,
  retrieveClimbs,
  createTag,
  removeTagFromMap,
  retrieveFeatures,
  retrieveClimbDependencies,
  addTagToClimb,
  removeTagFromClimb,
  retrieveFeatureDependencies,
  retrieveFeatureDependenciesByMap,
  retrieveFeatureAggregate,
  addClimbsToMap,
};
