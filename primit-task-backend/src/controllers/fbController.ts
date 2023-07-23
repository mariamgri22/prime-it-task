import axios, { AxiosResponse } from "axios";
import { Request, Response } from "express";
import AccessTokenModel from "../models/AccessToken";

const getFacebookLoginURL = (req: Request, res: Response) => {
  const loginURL = `https://www.facebook.com/v6.0/dialog/oauth?client_id=${
    process.env.appId
  }&redirect_uri=${encodeURIComponent("http://localhost:3000/oauth-redirect")}`;
  res.json({ loginURL });
};

const OAuthRedirect = async (req: Request, res: Response) => {
  try {
    const authCode = req.query.code as string;

    const accessTokenUrl =
      "https://graph.facebook.com/v6.0/oauth/access_token?" +
      `client_id=${process.env.appId}&` +
      `client_secret=${process.env.appSecret}&` +
      `redirect_uri=${encodeURIComponent(
        "http://localhost:3000/oauth-redirect"
      )}&` +
      `code=${encodeURIComponent(authCode)}`;

    const accessToken: string = await axios
      .get(accessTokenUrl)
      .then((response: AxiosResponse) => response.data["access_token"]);

    await AccessTokenModel.create({ _id: accessToken });

   res.cookie("accessToken", accessToken, { maxAge: 900000, httpOnly: true });
    res.redirect(`http://localhost:5173/profile`);
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ message: err.response?.data || err.message });
  }
};

const getMe = async (req: Request, res: Response) => {
  try {
    const accessToken: string = String(req.cookies.accessToken);
    const tokenFromDb = await AccessTokenModel.findOne({
      where: { _id: accessToken },
    });
    if (!tokenFromDb) {
      throw new Error(`Invalid access token "${accessToken}"`);
    }

    const data = await axios
      .get(
        `https://graph.facebook.com/me?access_token=${encodeURIComponent(
          accessToken
        )}`
      )
      .then((response: AxiosResponse) => response.data);

    res.json({ name: data.name });
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ message: err.response?.data || err.message });
  }
};



export default {
  getFacebookLoginURL,
  OAuthRedirect,
  getMe,
};
