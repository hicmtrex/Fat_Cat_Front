export type ErrorType = {
  response?: {
    data?: {
      message: string;
    };
  };
  message?: string;
};

export const setError = (error: ErrorType) => {
  const message =
    (error.response && error.response.data && error.response.data.message) ||
    error.message ||
    error.toString();

  return message;
};
