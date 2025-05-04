
#!/bin/bash

# Configuration
APP_NAME="wedding-vendor"
WAR_FILE="$APP_NAME.war"
BUILD_DIR="dist"
TEMP_DIR="temp_war"

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

echo "===== Cleaning up ====="
rm -rf $TEMP_DIR
rm -rf classes

echo "===== Build complete! ====="
echo "Your application WAR file is available at: $WAR_FILE"
echo ""
echo "IMPORTANT: Make sure you have these JAR files in your Java web server's lib directory:"
echo "- gson-2.8.9.jar (or newer) for JSON processing"
echo ""
echo "If you encounter CORS issues during development, verify the CORSFilter is properly configured."
