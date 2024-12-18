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
          console.log('success');
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
  console.log(tagId, mapId);
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
  console.log(mapId, tagId, 'Asdasd');
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

const retrieveClimbs = async (searchString: string) => {
  const url = `http://localhost:5074/api/Climbs/List/${searchString}`;
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

const retrieveFeatures = async (mapId: number) => {
  const url = `http://localhost:5074/api/Features/ByMap/${mapId}`;
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

const retrieveFeatureDependencies = async (featureId: number) => {
  const url = `http://localhost:5074/api/Features/${featureId}/Dependencies`;
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

const retrieveFeatureDependenciesByMap = async (mapId: number) => {
  const url = `http://localhost:5074/api/Features/ByMapId/${mapId}/Dependencies`;
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

const retrieveFeatureAggregate = async (featureId: number) => {
  const url = `http://localhost:5074/api/Features/${featureId}/Aggregate_climbs`;
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
};
