# RecipeDB

The project is part of the semester work from the subject NNPIA.


## Running the application with Maven

The project is a standard Maven project. To run it from the command line,
type `mvnw`, then open http://localhost:8080 in your browser.

## Deploying to Production

To create a production build, call `mvnw clean package -Pproduction`.
This will build a JAR file with all the dependencies and front-end resources,
ready to be deployed. The file can be found in the `target` folder after the build completes.

Once the JAR file is built, you can run it using `java -jar target/nnpia-semestralka-1.0-SNAPSHOT.jar`.


## Video
![](doc/video.mp4)
