export const successHandler = (response) => ({
  data: response.data,
  status: response.status,
  result: true,
});

export const errorHandler = (response) => ({
  data: response.data,
  status: response.status,
  result: false,
});
