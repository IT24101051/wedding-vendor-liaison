
#!/bin/bash

# Configuration
TOMCAT_HOME="${TOMCAT_HOME:-/path/to/tomcat}"  # Change this to your Tomcat installation directory
APP_NAME="wedding-vendor"
WAR_FILE="$APP_NAME.war"
BUILD_DIR="dist"
TEMP_DIR="temp_war"

# Check if Tomcat home is set correctly
if [ "$TOMCAT_HOME" = "/path/to/tomcat" ]; then
  echo "ERROR: Please set the TOMCAT_HOME variable to your actual Tomcat installation path."
  echo "You can do this by editing this script or by running:"
  echo "TOMCAT_HOME=/path/to/your/tomcat ./deploy-to-tomcat.sh"
  exit 1
fi

echo "===== Building frontend ====="
npm run build

echo "===== Creating WAR structure ====="
mkdir -p $TEMP_DIR/WEB-INF/classes
mkdir -p $TEMP_DIR/WEB-INF/lib

echo "===== Compiling Java classes ====="
# Create a classes directory
mkdir -p classes

# Find all Java files and compile them
find src/backend -name "*.java" > sources.txt
javac -d classes @sources.txt
rm sources.txt

# Copy compiled classes to WAR structure
cp -r classes/* $TEMP_DIR/WEB-INF/classes/

# Copy web.xml to WEB-INF
cp src/main/webapp/WEB-INF/web.xml $TEMP_DIR/WEB-INF/

# Copy frontend build to root of WAR
cp -r $BUILD_DIR/* $TEMP_DIR/

echo "===== Building WAR file ====="
cd $TEMP_DIR
jar -cvf ../$WAR_FILE .
cd ..

echo "===== Deploying to Tomcat ====="
# Stop Tomcat if it's running
if [ -f "$TOMCAT_HOME/bin/shutdown.sh" ]; then
  echo "Stopping Tomcat..."
  $TOMCAT_HOME/bin/shutdown.sh
  sleep 5
fi

# Remove existing deployment
if [ -d "$TOMCAT_HOME/webapps/$APP_NAME" ]; then
  echo "Removing existing deployment..."
  rm -rf $TOMCAT_HOME/webapps/$APP_NAME
fi
if [ -f "$TOMCAT_HOME/webapps/$APP_NAME.war" ]; then
  echo "Removing existing WAR file..."
  rm $TOMCAT_HOME/webapps/$APP_NAME.war
fi

# Copy new WAR file
cp $WAR_FILE $TOMCAT_HOME/webapps/

# Start Tomcat
if [ -f "$TOMCAT_HOME/bin/startup.sh" ]; then
  echo "Starting Tomcat..."
  $TOMCAT_HOME/bin/startup.sh
fi

echo "===== Cleaning up ====="
rm -rf $TEMP_DIR
rm $WAR_FILE
rm -rf classes

echo "===== Deployment complete! ====="
echo "Your application should be available at: http://localhost:8080/$APP_NAME"
echo ""
echo "IMPORTANT: Make sure you have these JAR files in Tomcat's lib directory:"
echo "- gson-2.8.9.jar (or newer) for JSON processing"
echo ""
echo "If you encounter CORS issues during development, verify the CORSFilter is properly configured."
