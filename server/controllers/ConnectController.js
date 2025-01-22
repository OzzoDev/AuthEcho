const join = async (req, res) => {
  const { appName } = req.body;

  console.log("Joining app: ", appName);

  res.status(201).json({ message: "Successfully joined app", success: true });
};

module.exports = {
  join,
};
