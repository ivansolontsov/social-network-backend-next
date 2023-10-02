import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "./pipes/validation.pipe";
import * as cors from "cors";
import * as fs from "fs";
import * as process from "process";

async function start() {
  const PORT = process.env.PORT || 5000;

  // const httpsOptions = {
  //   key:
  //     process.env.NODE_ENV == "production" &&
  //     fs.readFileSync(
  //       "/etc/letsencrypt/live/socialnetwork.gearboost.eu/privkey.pem"
  //     ),
  //   cert:
  //     process.env.NODE_ENV == "production" &&
  //     fs.readFileSync(
  //       "/etc/letsencrypt/live/socialnetwork.gearboost.eu/fullchain.pem"
  //     ),
  // };

  // console.log(process.env.NODE_ENV);

  const app = await NestFactory.create(AppModule);

  // Certificate is saved at: /etc/letsencrypt/live/socialnetwork.gearboost.eu/fullchain.pem
  // Key is saved at:         /etc/letsencrypt/live/socialnetwork.gearboost.eu/privkey.pem
  //

  app.enableCors({
    origin: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle("Social Network")
    .setDescription("Social Network")
    .setVersion("1.0.0")
    .addTag("@ivansolontsov")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/api/docs", app, document);

  // app.useGlobalGuards([JwtAuthGuard])
  // app.useGlobalPipes(new ValidationPipe())
  await app.listen(PORT, () => console.log("Server Started on port " + PORT));
}

start();
