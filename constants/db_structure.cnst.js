/** ### Database Structure Constants */
const cnst_db_strings = () => {
  // ------ START ------ //

  const constant = {
    /**
     * ## User DB Structure
     * ```
     * coll: `users`
     * model: `User`
     * ```
     */
    user: {
      /** coll: `users` */
      coll: String('users'),
      /** model: `User` */
      model: String('User'),
    },

    /**
     * ## Note DB Structure
     * ```
     * coll: `notes`
     * model: `Note`
     * ```
     */
    note: {
      /** coll: `notes` */
      coll: String('notes'),
      /** model: `Note` */
      model: String('Note'),
    },
  };

  return constant;

  // ------ END ------ //
};

export const db_structure = cnst_db_strings();
