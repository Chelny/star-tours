const API_BASE_URL = 'https://swapi.dev/api/';

const ApiService = {
  get: async (endpoint: string, id?: string) => {
    let request = `${API_BASE_URL}${endpoint}`;
    if (id) request += `/${id}`;

    try {
      const response = await fetch(request, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (id) return await response.json();

      const { count, results } = await response.json();

      if (count === 0) return [];

      const pageSize = results.length;

      const pages = [
        results,
        ...await Promise.all([
          ...new Array(Math.ceil(count / pageSize) - 1).keys(),
        ]
          .map(async n => {
            const page = n + 2;
            const res = await fetch(`${request}?page=${page}`);
            return (await res.json()).results;
          }))
      ];

      return pages.flat();
    } catch (err: any) {
      console.error(err.message);
    }
  },
};

export default ApiService;
