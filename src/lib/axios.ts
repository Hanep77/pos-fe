
import { dummyCustomers, dummyProducts, dummySales, dummyTransactions, dummyUsers } from "./dummyData";

// Mock delay helper
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock Response Helper
const mockResponse = (data: any, status = 200) => ({
  data,
  status,
  statusText: "OK",
  headers: {},
  config: {},
});

// Helper for pagination
const paginate = (items: any[], page: number, per_page: number) => {
  const start = (page - 1) * per_page;
  const end = start + per_page;
  const paginatedItems = items.slice(start, end);
  return {
    data: paginatedItems,
    pagination: {
      current_page: Number(page),
      per_page: Number(per_page),
      total_pages: Math.ceil(items.length / per_page) || 1,
    },
  };
};

class MockAxios {
  interceptors = {
    request: {
      use: (_onFulfilled: any, _onRejected: any) => {
        // No-op for mock
      },
    },
    response: {
      use: (_onFulfilled: any, _onRejected: any) => {
        // No-op for mock
      }
    }
  };

  async get(url: string, _config?: any) {
    await delay(300); // Simulate network latency

    const urlObj = new URL("http://mock" + url);
    const pathname = urlObj.pathname;
    const params = urlObj.searchParams;
    
    // Auth Check (Mock) - In a real app we'd check headers
    // if (!localStorage.getItem("ACCESS_TOKEN") && !url.includes("auth")) {
    //    return Promise.reject({ response: { status: 401 } });
    // }

    // --- Dashboard Counts ---
    if (pathname === "/products/count") {
      return mockResponse({ data: dummyProducts.length });
    }
    if (pathname === "/users/count") {
      return mockResponse({ data: dummyUsers.length });
    }
    if (pathname === "/customers/count") {
      return mockResponse({ data: dummyCustomers.length });
    }

    // --- Sales/Dashboard ---
    if (pathname === "/list-sales") {
       const formattedSales = dummySales.map(s => ({
           name: s.date,
           sales: s.total
       }));
       return mockResponse({ data: formattedSales });
    }

    // --- Products ---
    if (pathname === "/products") {
      const page = Number(params.get("page")) || 1;
      const search = params.get("search") || "";
      let filtered = dummyProducts;
      if (search) {
        filtered = filtered.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
      }
      return mockResponse(paginate(filtered, page, 10));
    }
    if (pathname === "/products-active") {
        return mockResponse({ data: dummyProducts.filter(p => p.is_active) });
    }
    if (pathname.match(/^\/products\/\w+$/)) {
      // Get single product
      const id = pathname.split("/")[2];
      const product = dummyProducts.find(p => p.id === id);
      if (product) return mockResponse({ data: product });
      return Promise.reject({ response: { status: 404 } });
    }

    // --- Users ---
    if (pathname === "/users") {
      const page = Number(params.get("page")) || 1;
      const search = params.get("search") || "";
      let filtered = dummyUsers;
      if (search) {
        filtered = filtered.filter(u => u.username.toLowerCase().includes(search.toLowerCase()));
      }
      return mockResponse(paginate(filtered, page, 10));
    }
    if (pathname.match(/^\/users\/\w+$/)) {
        const id = pathname.split("/")[2];
        const user = dummyUsers.find(u => u.id === id);
        if (user) return mockResponse({ data: user });
        return Promise.reject({ response: { status: 404 } });
    }

    // --- Customers ---
    if (pathname === "/customers") {
      const page = Number(params.get("page")) || 1;
      const search = params.get("search") || "";
      let filtered = dummyCustomers;
      if (search) {
        filtered = filtered.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
      }
      return mockResponse(paginate(filtered, page, 10));
    }
    if (pathname.match(/^\/customers\/\w+$/)) {
        const id = pathname.split("/")[2];
        const customer = dummyCustomers.find(c => c.id === id);
        if (customer) return mockResponse({ data: customer });
        return Promise.reject({ response: { status: 404 } });
    }

    // --- Transactions ---
    if (pathname.match(/\/transactions\/\w+\/details/)) {
         return mockResponse({ data: dummyTransactions[0] }); // Just return first one for now
    }


    console.warn(`Mock API: Unhandled GET request to ${url}`);
    return Promise.reject({ response: { status: 404 } });
  }

  async post(url: string, data?: any, _config?: any) {
    await delay(300);

    if (url === "/auth/login") {
      // Allow any login or check specific credentials
      if (data.username && data.password) {
        return mockResponse({
          status: 200,
          data: {
             id: "1",
             username: data.username,
             role: "admin"
          },
          credentials: "mock_token_" + Date.now()
        });
      }
      return Promise.reject({ status: 401 });
    }

    if (url === "/products") {
        const newProduct = { ...data, id: String(Date.now()), is_active: true };
        dummyProducts.push(newProduct);
        return mockResponse({ data: newProduct });
    }

    if (url === "/users") {
        const newUser = { ...data, id: String(Date.now()) };
        dummyUsers.push(newUser);
        return mockResponse({ data: newUser });
    }

    if (url === "/customers") {
        const newCustomer = { ...data, id: String(Date.now()) };
        dummyCustomers.push(newCustomer);
        return mockResponse({ data: newCustomer });
    }
    
    if (url === "/cashier/transactions") {
        return mockResponse({ message: "Transaction success" });
    }


    console.warn(`Mock API: Unhandled POST request to ${url}`);
    return mockResponse({ success: true });
  }

  async put(url: string, data?: any, _config?: any) {
     await delay(300);
     
     if (url.startsWith("/products/")) {
         const id = url.split("/")[2];
         const index = dummyProducts.findIndex(p => p.id === id);
         if (index !== -1) {
             dummyProducts[index] = { ...dummyProducts[index], ...data };
             return mockResponse({ data: dummyProducts[index] });
         }
     }
     
     if (url.startsWith("/users/")) {
         const id = url.split("/")[2];
         const index = dummyUsers.findIndex(u => u.id === id);
         if (index !== -1) {
             dummyUsers[index] = { ...dummyUsers[index], ...data };
             return mockResponse({ data: dummyUsers[index] });
         }
     }

     if (url.startsWith("/customers/")) {
         const id = url.split("/")[2];
         const index = dummyCustomers.findIndex(c => c.id === id);
         if (index !== -1) {
             dummyCustomers[index] = { ...dummyCustomers[index], ...data };
             return mockResponse({ data: dummyCustomers[index] });
         }
     }

     return mockResponse({ success: true });
  }

  async delete(url: string, _config?: any) {
    await delay(300);
    
    if (url.startsWith("/products/")) {
        const id = url.split("/")[2];
        const index = dummyProducts.findIndex(p => p.id === id);
        if (index !== -1) dummyProducts.splice(index, 1);
        return mockResponse({ success: true });
    }

    if (url.startsWith("/users/")) {
        const id = url.split("/")[2];
        const index = dummyUsers.findIndex(u => u.id === id);
        if (index !== -1) dummyUsers.splice(index, 1);
        return mockResponse({ success: true });
    }

    if (url.startsWith("/customers/")) {
        const id = url.split("/")[2];
        const index = dummyCustomers.findIndex(c => c.id === id);
        if (index !== -1) dummyCustomers.splice(index, 1);
        return mockResponse({ success: true });
    }

    return mockResponse({ success: true });
  }
}

export const axiosClient = new MockAxios();
export const axiosPrivate = new MockAxios();
