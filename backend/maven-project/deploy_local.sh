mvn package -Dmaven.test.skip=true
cd target
mv slot-0.0.1-SNAPSHOT.war slot.war
cp slot.war ~/Programs/Jetty/webapps/
cd ~/Programs/Jetty
java -jar start.jar
