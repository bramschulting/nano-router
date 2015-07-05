export default class NanoRouter {

  /**
   * Constructor
   * @param  {Object} routes Object where key is the route, and value is the callback
   */
  constructor (routes = {}) {
    this._routes = routes;

    window.addEventListener('hashchange', ()=> {
      this._route();
    });

    this._route();
  }

  /**
   * Navigate to path
   * @param  {String} path Path
   */
  static navigate (path = '/') {
    window.location.hash = (path.substr(0, 1) !== '#' ? '#' : '') + path;
  }

  onBeforeRoute (callback) {
    this._onBeforeRoute = callback;
  }

  /**
   * Handle route change
   * @param  {String} path Optionally provide a path
   */
  _route (path = this._getCurrentPath()) {
    Object.keys(this._routes).forEach((route)=> {
      const match = this._match(route, path);

      if (match) {
        if (typeof this._onBeforeRoute === 'function') {
          this._onBeforeRoute(path);
        }

        this._routes[route].apply(route, match.args);
      }
    });
  }

  /**
   * Match a route with a path
   * @param  {String}       route Route to match
   * @param  {String}       path  Path to match
   * @return {bool|Object}        False if no match, an Object with args if match
   */
  _match (route, path) {
    let result = false;
    let routeParts = route.split('/');
    let pathParts = path.split('/');

    const argIndexes = this._getArgIndexes(routeParts);

    const matchableRoute = this._toMatchableString(routeParts, argIndexes);
    const matchablePath = this._toMatchableString(pathParts, argIndexes);

    if (matchableRoute === matchablePath) {
      result = {
        args: this._getArgs(pathParts, argIndexes)
      }
    }

    return result;
  }

  /**
   * Get the indexes of the route parts that are placeholders for arguments
   * @param  {Array}  parts Route parts
   * @return {Array}        Indexes of the parts that are placeholders for arguments
   */
  _getArgIndexes (parts = []) {
    let argIndexes = [];

    parts.forEach(function (part, index) {
      if (/:w*/.test(part)) {
        argIndexes.push(index);
      }
    });

    return argIndexes;
  }

  /**
   * Join the parts and replace the arg with a contant, so we can match them later
   * @param  {Array}  parts      Parts
   * @param  {Array}  argIndexes Indexes of the parts that should be replaced
   * @return {String}            Matchable string
   */
  _toMatchableString (parts = [], argIndexes = []) {
    // Don't modify the original array
    let _parts = parts.slice(0);

    _parts.forEach(function (part, index) {
      if (argIndexes.indexOf(index) !== -1) {
        _parts[index] = ':placeholder:';
      }
    });

    return _parts.join('/');
  }

  /**
   * Get the args from an array of parts
   * @param  {Array}  pathParts  Parts
   * @param  {Array}  argIndexes Indexes of the parts that are arguments
   * @return {Array}             Arguments
   */
  _getArgs (pathParts = [], argIndexes = []) {
    let args = [];

    pathParts.forEach((part, index)=> {
      if (argIndexes.indexOf(index) !== -1) {
        args.push(part);
      }
    });

    return args;
  }

  /**
   * Get the current part, with leading slash
   * @return {[type]} [description]
   */
  _getCurrentPath () {
    // Remove hash and leading /
    let page = window.location.hash.replace(/^[#]*[\/]*/, '');

    // Now we add the / again to make sure we only have it once
    return '/' + page;
  }

}
