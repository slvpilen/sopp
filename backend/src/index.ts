import 'reflect-metadata';
import cors from 'cors'; 
import dotenv from 'dotenv';
import { ObjectType, Field, Resolver, Query, buildSchema } from 'type-graphql';
import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import mushrooms from '../data/mushrooms';

function setEnv() {
  if (process.env.NODE_ENV === 'production') {
    dotenv.config({ path: '.env.production' });
  } else {
    dotenv.config({ path: '.env.development' });
  }
}

@ObjectType()
class Mushroom {
  @Field()
  name!: string;

  @Field()
  image!: string;

  @Field()
  description!: string;

  @Field()
  isPoisonous!: boolean;

  @Field()
  isFood!: boolean;

  @Field()
  needExtraHeat!: boolean;
}



@Resolver()
class MushroomResolver {
  @Query(() => [Mushroom])
  allMushrooms(): Mushroom[] {
    const baseURL = process.env.BASE_URL || 'http://localhost:0';
    return mushrooms.map(mushroom => ({
      ...mushroom,
      image: `${baseURL}${mushroom.image}`, 
    }));
  }
}

async function startServer() {
  const port = process.env.PORT || 5000;

  const schema = await buildSchema({
    resolvers: [MushroomResolver],
  });

  const app = express();

  const frontendURL = process.env.FRONTEND_URL || 'http://localhost:0';
  app.use(cors({
    origin: 'http://localhost:5173', // Frontend URL (adjust this as necessary)
  }));

  // Serve static images from the "public/quizPictures" folder
  app.use('/quizPictures', express.static('public/quizPictures'));

  app.use(
    '/graphql',
    createHandler({
      schema,
    })
  );


  // Start the server
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

setEnv();
startServer();
