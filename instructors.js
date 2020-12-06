const fs = require("fs");
const data = require("./data.json");

exports.show = (req, res) => {
  const { id } = req.params;

  const foundInstructor = data.instructors.find((instructor) => {
    return instructor.id == id;
  });

  if (!foundInstructor) {
    return res.send("Instructor not found");
  }

  const instructor = {
    ...foundInstructor, //Espalhar os dados já conhecidos dentro das "", porém se colocarmos algo nas aspas ela sobrescreve o dado
    age: "",
    services: foundInstructor.services.split(","),
    created_at: "",
  };

  return res.render("instructors/show", { instructor: instructor });
};

exports.post = function (req, res) {
  const keys = Object.keys(req.body);

  for (key of keys) {
    //req.body.key == ""
    if (req.body[key] == "") {
      return res.send("Please, fill all fields!");
    }
  }

  let { avatar_url, birth, name, services, gender } = req.body;

  birth = Date.parse(birth);
  const created_at = Date.now();
  const id = Number(data.instructors.length + 1);

  data.instructors.push({
    id,
    avatar_url,
    name,
    birth,
    gender,
    services,
    created_at,
  });

  fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send("Write file error!");

    return res.redirect("/instructors");
  });

  // return res.send(req.body);
};
