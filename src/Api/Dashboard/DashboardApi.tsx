export const primaryDashboard = async () => {
  const options = {
    method: "GET",
  };
  const url = `${import.meta.env.VITE_SERVER_URL}primarydashboard`;
  const response = await fetch(url, options);
  const responseData = await response.json();
  return { status: response.status, data: responseData.data };
};

export const secondaryDashboard = async () => {
  const options = {
    method: "GET",
  };
  const url = `${import.meta.env.VITE_SERVER_URL}secondarydashboard`;
  const response = await fetch(url, options);
  const responseData = await response.json();
  return { status: response.status, data: responseData.data };
};

export const posterMoviesCount = async () => {
  const options = {
    method: "GET",
  };
  const url = `${import.meta.env.VITE_SERVER_URL}moviescount`;
  const response = await fetch(url, options);
  const responseData = await response.json();
  return { status: response.status, data: responseData.data };
};
