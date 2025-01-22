const AppModel = require("../models/App");

const join = async (req, res) => {
  const { appName, origin, admin, appDescription } = req.body;

  //   console.log("Request Headers:", req.headers.origin);

  console.log(req.body);

  try {
    const appNameExists = await AppModel.findOne({ name: appName }).collation({
      locale: "en",
      strength: 1,
    });

    if (appNameExists) {
      return res.status(409).json({ message: "App name already exists", success: false });
    }

    const appModel = new AppModel({
      name: appName,
      origin,
      description: appDescription ? appDescription : "",
      admin,
    });
    await appModel.save();

    console.log("Joining app: ", appName);

    res.status(201).json({ message: "Successfully joined app", success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
    console.error(error);
  }
};

module.exports = {
  join,
};
