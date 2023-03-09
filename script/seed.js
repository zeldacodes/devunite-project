"use strict";

const {
  db,
  models: { User },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({
      username: "sapphire",
      password: "sapph123",
      email: "sapph@test.com",
      imageURL:
        "https://img.freepik.com/free-photo/lifestyle-people-emotions-casual-concept-confident-nice-smiling-asian-woman-cross-arms-chest-confident-ready-help-listening-coworkers-taking-part-conversation_1258-59335.jpg?w=1380&t=st=1678395053~exp=1678395653~hmac=b5953fc51cc7dde8f867bd45f19575a29f225587d60b8352344f142b476dd477",
    }),
    User.create({
      username: "diamond",
      password: "123diamy",
      email: "diamy10@test.com",
      imageURL:
        "https://img.freepik.com/free-photo/handsome-young-businessman-suit_273609-6513.jpg?size=626&ext=jpg&ga=GA1.1.496643273.1676575246",
    }),
    User.create({
      username: "jade",
      password: "jadegirl85",
      email: "jade85@test.com",
      imageURL:
        "https://img.freepik.com/premium-photo/smiling-black-woman-striped-shirt-with-arms-crossed_33839-10129.jpg?size=626&ext=jpg&ga=GA1.2.496643273.1676575246",
    }),
  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
