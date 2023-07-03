import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "./pipes/validation.pipe";
import * as cors from 'cors';
import * as fs from 'fs';



async function start() {
    const PORT = process.env.PORT || 5000;

    const httpsOptions = {
        key: process.env.NODE_ENV == "production" && fs.readFileSync('/etc/letsencrypt/live/vm687554.vps.masterhost.tech/privkey.pem'),
        cert: process.env.NODE_ENV == "production" && fs.readFileSync('/etc/letsencrypt/live/vm687554.vps.masterhost.tech/fullchain.pem'),
    };

    const app = await NestFactory.create(AppModule,
        process.env.NODE_ENV == 'production'
            ? { httpsOptions }
            : {}
    );


    // Certificate is saved at: /etc/letsencrypt/live/vm687554.vps.masterhost.tech/fullchain.pem
    // Key is saved at:         /etc/letsencrypt/live/vm687554.vps.masterhost.tech/privkey.pem


    app.enableCors({
        origin: ['http://localhost:3000', 'https://social-network-alpha-ten.vercel.app'],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    });

    const config = new DocumentBuilder()
        .setTitle('Social Network')
        .setDescription('Social Network')
        .setVersion('1.0.0')
        .addTag('@ivansolontsov')
        .build()

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);

    // app.useGlobalGuards([JwtAuthGuard])
    // app.useGlobalPipes(new ValidationPipe())
    await app.listen(PORT, () => console.log('Server Started on port ' + PORT))
}

start()