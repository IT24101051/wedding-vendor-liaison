
#!/bin/bash

# Build the React frontend
echo "Building frontend..."
npm run build

# Create directories for static resources if they don't exist
mkdir -p src/main/resources/static

# Copy the built frontend to Spring Boot's static resources directory
echo "Copying frontend build to Spring Boot static resources..."
cp -r dist/* src/main/resources/static/

# Build the Spring Boot application
echo "Building Spring Boot application..."
./mvnw clean package

# Run the application
echo "Starting application..."
java -jar target/wedding-vendor-0.0.1-SNAPSHOT.jar
