const products = [];
const users = [];
let current_user = null;

const getItems = (items) => Promise.resolve(items);
const getItem = (items, id) => Promise.resolve(items.find((el) => el.id == id));
const createProduct = (name, description) => {
  const creator = current_user;
  if (!creator) return Promise.reject("Unable to get current user");

  const id = (products[products.length - 1]?.id || 0) + 1;
  const new_product = { id, ...{ name, description, creator } };
  if (products.find((p) => p.name === name && p.creator === creator))
    return Promise.reject("Already exists");
  products.push(new_product);
  return Promise.resolve(new_product);
};
const handleLogin = (email) => {
  current_user = users.find((el) => el.email == email);
  if (!current_user) return Promise.reject("User does not exist");
  return Promise.resolve(current_user);
};
const createUser = (names, email) => {
  names = [...names.matchAll(/^(\w{1,})\s(.{1,})/g)][0];
  if (users.find((u) => u.email == email))
    return Promise.reject("User already exists");
  const user = {
    id: (users[users.length - 1]?.id || 0) + 1,
    first_name: names[1],
    last_name: names[2],
    email,
    products: [],
  };
  users.push(user);
  return Promise.resolve(user);
};

module.exports = {
  Query: {
    products: async () => await getItems(products),
    product: async (parent, args, contextValue, info) =>
      await getItem(products, args.id),
    users: async () => await getItems(users),
    user: async (parent, args, contextValue, info) =>
      await getItem(users, args.id),
  },
  Mutation: {
    createUser: async (
      parent,
      { user: { names, email } },
      contextValue,
      info
    ) => await createUser(names, email),

    login: async (parent, { email }, contextValue, info) => handleLogin(email),
    createProduct: async (
      parent,
      { product: { name, description } },
      contextValue,
      info
    ) => createProduct(name, description),
  },
};
