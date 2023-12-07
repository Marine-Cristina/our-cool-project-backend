## MVP:

1. npm install

2. Test sign up, log in and verify routes with Postman.

3. Test Token with Postman.

4. Test error handling with Postman.

5. Create models and routes:

   [X] Business.model.js
   [X] business.routes.js

   [X] Event.model.js
   [X] event.routes.js

6. Create 33 examples of users with Postman, export the data from MongoDB so that the other can import that file in her MongoDB.

7. Do the same with Business and Events.

## IMPROVEMENTS:

1. Check if the User Authentication middleware functions works properly.

2. Create middleware functions to check the owner of each business and the organizer of each event:
   [X] business.middleware.js
   [X] event.middleware.js

3. Add the previous middleware functions as callbacks in the routes so that:

- Everyone can read the list of all businesses and events.
- Only the users can read the details of each business and event and create one.
- Only the owner of the business can update or delete the post of the business.
- Only the organizer(business) of the event can update or delete the post of the event.

4. Add GeoJSON to locate businesses and events in the map:
   [X] npm install mongoose@latest
   [X] Add properties to business and event Schemas.

5. Enable user to apload a photo of them, their business or event.
   [ ] npm install multer/Cloudinary
   [ ] Update Schemas
   [ ] Update Routes files: set a multer storage, add a route to handle photo upload
