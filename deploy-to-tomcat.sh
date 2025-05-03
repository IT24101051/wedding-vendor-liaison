
#!/bin/bash

# Configuration
TOMCAT_HOME="/path/to/tomcat"  # Change this to your Tomcat installation directory
APP_NAME="wedding-vendor"
WAR_FILE="$APP_NAME.war"

echo "Building frontend..."
npm run build

echo "Creating directory structure for WAR..."
mkdir -p WEB-INF/classes
mkdir -p WEB-INF/lib

echo "Compiling Java classes..."
javac -d WEB-INF/classes src/backend/*.java

echo "Copying frontend build to root of WAR..."
cp -r dist/* .

echo "Building WAR file..."
jar -cvf $WAR_FILE WEB-INF dist index.html

echo "Deploying to Tomcat..."
cp $WAR_FILE $TOMCAT_HOME/webapps/

echo "Cleaning up..."
rm -rf WEB-INF
rm $WAR_FILE

echo "Deployment complete!"
echo "Your application should be available at: http://localhost:8080/$APP_NAME"
