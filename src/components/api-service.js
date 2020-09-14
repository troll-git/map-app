export class API {
  static getDzialki() {
    return fetch("http://localhost:8000/api/dzialki/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  }
}
