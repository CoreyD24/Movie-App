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
  res.send(person || {  });
});

module.exports = router;
