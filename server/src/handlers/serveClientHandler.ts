import path from "path";
import fs from "fs";
import express, {Request as ExpressRequest, Response as ExpressResponse, NextFunction} from "express";
import {createProxyMiddleware} from "http-proxy-middleware";
import {cfg} from "../cfg";

let clientDistDir = path.join(__dirname, '../../../client/dist');

if (!fs.existsSync(clientDistDir)) {
  clientDistDir = path.join(__dirname, '../../../../../client/dist')
}

export const staticClientFilesMiddleware = express.static(clientDistDir);

export const serveClientHandler = (req: ExpressRequest, res: ExpressResponse, next: NextFunction) => {
  if (req.url.includes('/api')) { //api-gateway
    return next();
  } else {
    res.sendFile(path.join(clientDistDir, '/index.html'));
  }
}

/**
 * currently broken...
 */
export const serveDevClientHandler = createProxyMiddleware({
  target: `${cfg.vite.baseUrl}:${cfg.vite.port}`,
  changeOrigin: true,
  router: {
    '/api/': `http://localhost:${cfg.server.port}`
  }
})