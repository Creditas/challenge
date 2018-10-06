class User {
  constructor({ name = '', role = 'user' }) {
    this.id = new Date().valueOf();
    this.name = name;
    this.role = role;
  }

  get() {
    return {
      id: this.id,
      name: this.name,
      role: this.role
    };
  }

  set({ name, role }) {
    this.name = name;
    this.role = role;
  }
}

export default User;
