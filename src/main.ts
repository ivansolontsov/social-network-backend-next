import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "./pipes/validation.pipe";
import * as cors from 'cors';

async function start() {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule);

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