const fetchAPI = async (apiUrl) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

const getData = async (apiUrl) => {
  try {
    const data = await fetchAPI(apiUrl);
    // console.log("Data received:", data);
    return { status: "ok", data };
  } catch (error) {
    console.error("Fetch error:", error);
    return { status: "error", data: undefined };
  }
};

export { getData, fetchAPI };
