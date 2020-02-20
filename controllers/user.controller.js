/**
 * @file User controller module
 */
const db = require('../config/loki').getDatabase();
const usersDB = db.getCollection('users');

const UserController = {
  
  /**
   * Saves user data into DB
   * 
   * NOTE: Although the requirements do not specify unique properties of the user object, 
   * the controller treats username and email as unique properties.
   * 
   * NOTE: Ideally primary key (ID) would be auto set by the DB. We ignore ID field 
   * while inserting new user objects into DB. When user is retrieved we populated ID field 
   * with $loki field value. 
   * 
   * @param data Object Data object to save
   * @param meta Boolean Flag to preserve meta date of newly inserted object
   * @return { err, user } 
   */
  saveUser(data, meta = false) {
      ({name, username, email, address, phoneNumbers, website } = data);
      
      var err, user = this.lookupUser({email, username});
      
      if (user) {
        err = {
          status: 500, message: 'User already exists'
        }
      }
      if (!user) {
             
          // Save user in the database
          user = usersDB.insert({
              name,
              username,
              email,
              address,
              phoneNumbers,
              website
          });
          if (!user) { 
              err = {
                  status: 500, message: 'Error while saving data'
              }
          }
          user.id = user['$loki'];
          if (!meta) {
              delete user.meta;
              delete user['$loki'];
          }
      }
      
      return { err, user };
  },

  /**
   * Loads user by ID
   */
  loadUserByID() {
    return {id:-1};
  },

  /**
   * Very basic check or existing users
   * @param props
   * @return {null}
   */
  lookupUser(props = {}) {
        var user = null, res;   
        for (prop in props) {
            res = usersDB.where(obj => obj[prop] === props[prop]); 
            if (res.length > 0) {
                 user = res.pop();    
            }
        }
        return user;
    }
};

module.exports = UserController;