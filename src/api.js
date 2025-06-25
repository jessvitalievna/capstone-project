export function fetchData(date) {
  // Return a Promise that simulates an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
      ]);
    }, 500);
  });
}

export async function submitAPI(formData) {
  return new Promise(resolve =>
    setTimeout(() => resolve(true), 500)
  );
}