JETTY_HOME="/Users/Ishmael/Programs/Jetty"
mvn package -Dmaven.test.skip=true
cd target
cp slot-0.0.1-SNAPSHOT.war $JETTY_HOME/webapps/slot.war
cd $JETTY_HOME
java -jar start.jar
