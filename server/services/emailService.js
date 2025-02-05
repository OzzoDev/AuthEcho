const UserModel = require("../models/User");
const { sendEmail } = require("../middlewares/Auth");
const { hex8BitKey } = require("../utils/crypto");
const { getEmailText } = require("../utils/email");

const sendEmailCode = async (name) => {
  try {
    const user = await UserModel.findOne({ name }).collation({ locale: "en", strength: 1 });

    const verificationCode = user.verificationCode;

    await sendEmail(
      user.email,
      "Authecho",
      `${getEmailText("newEmail", user.name)}`,
      verificationCode
    );

    user.verificationCode = hex8BitKey();
    user.prevVerificationCode = verificationCode;
    await user.save();
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  sendEmailCode,
};
