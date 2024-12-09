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
      console.error('Error creating the map:', error);
      return false;
    }
  } catch (err) {
    console.error('Network error:', err);
    return false;
  }
};

const addTagToMap = async (tagId: number, mapId: number) => {
  const payload = { MapId: mapId };

  try {
    const response = await fetch(`http://localhost:5074/api/Tags/${tagId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

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

export { createTag, removeTagFromMap };
