function handleErrors(res) {
  if (!res.ok) {
      throw new Error(res.statusText);
  }
  return res;
}

export {
  handleErrors
}