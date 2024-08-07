/** ### Path Strings for API Endpoints */
const cnst_path_strings = () => {
  // ------ START ------ //

  const path = {
    /**
     * ## User Path Strings
     * ```
     * root: `/v1/users`
     * create: `/create`
     * login: `/login`
     * logout: `/logout`
     * username: `/:username`
     * ```
     */
    user: {
      /** root: `/v1/users` */
      root: String('/v1/users'),
      /** create: `/create` */
      create: String('/create'),
      /** login: `/login` */
      login: String('/login'),
      /** logout: `/logout` */
      logout: String('/logout'),
      /** username: `/:username` */
      username: String('/:username'),
    },

    /**
     * ## Notes Path Strings
     * ```
     * root: `/v1/notes`
     * self: `/`
     * ```
     */
    note: {
      /** root `/v1/notes` */
      root: String('/v1/notes'),
      /** self `/` */
      self: String('/'),
    },
  };

  return path;

  // ------ END ------ //
};

export const path_strings = cnst_path_strings();
