// @flow
// AUTH - API
// =============================================================================

export type Outcome = {
  status: "SUCCESS" | "MISTAKE" | "FAILURE",
  body: ?JSONType
};

export const login = (email: string, password: string): Promise<Outcome> => {
  if (!email) {
    throw new TypeError("email is required");
  }
  if (!password) {
    throw new TypeError("password is required");
  }

  let outcome: Outcome = { status: "MISTAKE", body: null };

  return fetch("https://reqres.in/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  })
    .then((response: Response) => {
      switch (response.status) {
        case 200:
          outcome.status = "SUCCESS";
          break;

        default:
          outcome.status = "FAILURE";
          break;
      }

      if (typeof response.json === "function") {
        return response.json();
      }

      return Promise.resolve(null);
    })
    .then((bodyData: ?JSONType) => {
      outcome.body = bodyData;

      return outcome;
    });
};
