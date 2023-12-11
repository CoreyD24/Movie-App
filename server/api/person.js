const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

//Get and return all the persons from the person table in the db
router.get("/", async (req, res) => {
  const persons = await prisma.person.findMany();

  res.send(persons);
});

//Gets and returns a specified person
router.get("/:id", async (req, res) => {
  const personId = parseInt(req.params.id);

  const person = await prisma.person.findUnique({
    where: { id: personId },
  });
  res.send(person || {});
});

//creates new person in the database
//Route: "/api/person/"
//TODO: ONLY CREATE NEW PERSON IF REQUEST HAS A VALID TOKEN
router.post("/", async (req, res) => {
  const newPerson = req.body;

  if (!req.user) {
    res.sendStatus(401);
  } else {
    try {
      const result = await prisma.person.create({
        data: newPerson,
      });
      //console.log(result);
      res.send(result);
    } catch (error) {
      res.status(500).send(error);
    }
  }
});

module.exports = router;
