import store from 'store';

let user = {
  setToken (token) {
    return store.set('user', {token: token});
  },
  getToken () {
    return store.get('user') && store.get('user')['token'];
  },
  clearToken () {
    return store.remove('user');
  }
}
let pageJump = {
  fromSet (key, router) {
    const params = {
      path: router.path, query: router.query
    };
    return store.set('from_' + key, params);
  },
  fromGet (key) {
    let router = store.get('from_' + key);
    return router;
  }
}
let recommendIssue = {
  set (obj) {
    return store.set('recommend_issue', obj);
  },
  get () {
    return store.get('recommend_issue');
  },
  clear () {
    return store.remove('recommend_issue');
  }
}
export {
  user, pageJump, recommendIssue
}
