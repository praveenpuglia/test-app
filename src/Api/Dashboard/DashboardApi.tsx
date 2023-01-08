const serverUrl = "http://18.60.129.53/";

export const primaryDashboard = async () => {
  const options = {
    method: "GET",
  };
  const url = `${serverUrl}primarydashboard`;
  const response = await fetch(url, options);
  const responseData = await response.json();
  return { status: response.status, data: responseData.data };
};

export const secondaryDashboard = async () => {
  const options = {
    method: "GET",
  };
  const url = `${serverUrl}secondarydashboard`;
  const response = await fetch(url, options);
  const responseData = await response.json();
  return { status: response.status, data: responseData.data };
};

export const posterMoviesCount = async () => {
  const options = {
    method: "GET",
  };
  const url = `${serverUrl}moviescount`;
  const response = await fetch(url, options);
  const responseData = await response.json();
  return { status: response.status, data: responseData.data };
};
