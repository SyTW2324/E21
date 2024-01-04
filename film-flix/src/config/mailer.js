import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    // should be replaced with real sender's account
    user: "sytw021@gmail.com",
    pass: "hmwp gydg fzyy zyub",
  },
});