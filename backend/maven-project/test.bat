curl -X POST "localhost:8081/autoit/shutdown"
call mvn package -Dmaven.test.skip=true
cd target
del slot.war
::pause
ren Slot-0.0.1-SNAPSHOT.war slot.war
copy slot.war C:\\Users\puqian\Programs\jetty2\webapps\ /Y

cd C:\\Users\puqian\Programs\jetty2
java -jar start.jar