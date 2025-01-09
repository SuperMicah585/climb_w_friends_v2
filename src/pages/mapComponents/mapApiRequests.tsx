import { ClimbWithDependencies } from '../../types/interfaces';
const createTag = async (TagName: string, mapId: number) => {
  try {
    const response = await fetch(`http://localhost:5074/api/Tags`, {
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
      `http://localhost:5074/api/Tags/${tagId}/ToMap/${mapId}`,
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

const addTagToClimb = async (tagId: number, climbId: number) => {
  try {
    const response = await fetch(
      `http://localhost:5074/api/Tags/${tagId}/ToClimb/${climbId}`,
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
      `http://localhost:5074/api/Tags/${tagId}/FromClimb/${climbId}`,
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
      `http://localhost:5074/api/Tags/${tagId}/Maps/${mapId}`,
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
  const url = `http://localhost:5074/api/Climbs/List/${searchString}/Within/${State}/IsType/${type}`;
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
  const url = `http://localhost:5074/api/Features/ByMap/${mapId}/ForUser/${auth0Id}`;
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
  const url = `http://localhost:5074/api/Climbs/${climbId}/Dependencies`;
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
  const url = `http://localhost:5074/api/Features/${featureId}/Dependencies/UserId/${auth0Id}`;
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
  const url = `http://localhost:5074/api/Features/ByMapId/${mapId}/Dependencies/UserId/${auth0Id}`;
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
  const url = `http://localhost:5074/api/Features/${featureId}/Aggregate_climbs/ForUser/${auth0Id}`;
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
      `http://localhost:5074/api/Features/Climbs/ToMap/${mapId}`,
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

    const buckets = await response.json();
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
      `http://localhost:5074/api/Climbs/${climbId}/ToUser/${userId}/ToMap/${mapId}`,
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
      `http://localhost:5074/api/Climbs/${climbId}/FromUser/${userId}/FromMap/${mapId}`,
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
      `http://localhost:5074/api/Attempts/ToMap/${mapId}/ToUser/${userId}/ToClimb/${climbId}`,
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
      `http://localhost:5074/api/Attempts/${attemptId}`,
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
      `http://localhost:5074/api/Ticks/ToMap/${mapId}/ToUser/${userId}/ToClimb/${climbId}`,
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
    const response = await fetch(`http://localhost:5074/api/Ticks/${tickId}`, {
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
      `http://localhost:5074/api/ClimbChats/ToMap/${mapId}/ToUser/${userId}/ToClimb/${climbId}`,
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
      `http://localhost:5074/api/ClimbChats/${climbId}/OnMap/${mapId}/List`,
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
  const url = `http://localhost:5074/api/Tags/ByMap/${mapId}`;
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
  const url = `http://localhost:5074/api/Filters/OnMap/${mapId}/ForUser/${auth0Id}/List`;
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
      `http://localhost:5074/api/Filters/Tag/${tagId}/ToMap/${mapId}/ForUser/${auth0Id}`,
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
  console.log(auth0IdToFilter, auth0Id, mapId);
  try {
    const response = await fetch(
      `http://localhost:5074/api/Filters/User/${auth0IdToFilter}/ToMap/${mapId}/ForUser/${auth0Id}`,
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
      `http://localhost:5074/api/Filters/GradeRangeFilter/ToMap/${mapId}/ForUser/${auth0Id}`,
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
      `http://localhost:5074/api/Filters/Tag/${id}`,
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
      `http://localhost:5074/api/Filters/User/${id}`,
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
      `http://localhost:5074/api/Filters/GradeRange/FromMap/${mapId}/FromUser/${auth0Id}`,
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
      `http://localhost:5074/api/Climbs/${climbId}/OnMap/${mapId}`,
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

export {
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
